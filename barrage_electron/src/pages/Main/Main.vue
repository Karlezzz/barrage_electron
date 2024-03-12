<template>
	<div class="box">
		<div class="main">
			<div class="head">
				<div class="logo">
					<!-- <img
						src="../../assets/dgut2.png"
						alt=""
					/> -->
				</div>
				<div class="roomName">
					<div class="name">{{ roomName }}</div>
					<div class="id">RoomCode:{{ roomCode }}</div>
				</div>
			</div>
			<div class="body">
				<Function
					:user="user"
					@onSubmitName="onSubmitName"
					@onBackToEnter="onBackToEnter"
				></Function>
				<Barrage @onSendMessage="onSendMessage"></Barrage>
				<FunctionDetail
					:clientUrl="clientUrl"
					@onSubmitClassRoom="onSubmitClassRoom"
					@onSubmitVote="onSubmitVote"
					@onSelectRoomCode="onSelectRoomCode"
					@onSearchScoreAndComment="onSearchScoreAndComment"
				>
				</FunctionDetail>
			</div>
			<Confirm
				:content="endClassContent"
				@onSubmitConfirm="onSubmitConfirm"
			></Confirm>
			<Alert
				:content="alertContent"
				@onSubmitAlert="onSubmitAlert"
			></Alert>
		</div>
	</div>
</template>

<script>
import Function from './Function/Function.vue'
import Barrage from './Barrage/Barrage.vue'
import FunctionDetail from './FunctionDetail/FunctionDetail.vue'
import Confirm from '../../components/Popup/Confirm.vue'
import Alert from '../../components/Popup/Alert.vue'

import { nanoid } from 'nanoid'
import { _findOne, _updateOne, _createOne, _findAll } from '@/api'
import { io } from 'socket.io-client'
import { User } from '../../../lib/models'
import { endpoint } from '@/api/endpoint'
import { mapGetters } from 'vuex'
export default {
	name: 'Main',
	components: {
		Alert,
		Barrage,
		Confirm,
		FunctionDetail,
		Function,
	},
	data() {
		return {
			alertContent: null,
			clientUrl: null,
			classRoom: null,
			classRoomCallback: null,
			endClassContent: null,
			socket: null,
			// user: null,
		}
	},
	computed: {
		roomCode() {
			return this.roomInfo ? this.roomInfo.code : ''
		},
		roomInfo() {
			return this.$store.state.room.roomInfo
		},
		roomName() {
			return this.roomInfo ? this.roomInfo.name : ''
		},
		...mapGetters('user', {
			user: 'user',
		}),
	},
	methods: {
		async clearStore(isBack) {
			if (isBack) {
				await this.$store.commit('room/SETROOMINFO', null)
				await this.$store.commit('room/SETROOMLIST', [])
			}
			await this.$store.commit('room/SETCLASSROOMINFO', null)
			await this.$store.commit('barrage/SETMESSAGE', [])
			await this.$store.commit('vote/SETVOTES', [])
			await this.$store.commit('barrage/SETUSERS', [])
		},
		async onBackToEnter() {
			if (this.socket) {
				this.socket.emit('closeSocket', false)
			}
			await this.clearStore(true)
			this.$router.push('/enter')
		},
		async init() {
			await this.initClientUrl()
		},
		async getSocketUrl() {
			try {
				const result = await _findOne(endpoint.socket)
				if (result) return result
			} catch (error) {
				console.log(error)
			}
		},
		async getClientUrl() {
			try {
				const result = await _findOne(endpoint.client)
				if (result) return result
			} catch (error) {
				return 'https://www.dgut.edu.cn/'
			}
		},
		async getClassRoomList({ roomId }) {
			await this.$store.dispatch('room/getClassRoomListFromRoom', {
				endpoint: endpoint.classRoom,
				data: { roomId },
			})
		},
		async getAllVotes() {
			await this.$store.dispatch('vote/getAllVotes')
		},
		async initClientUrl() {
			this.clientUrl = await this.getClientUrl()
		},
		async initSocket() {
			try {
				const { socketUrl } = await this.getSocketUrl()
				this.socket = io(socketUrl, {
					transports: ['websocket'],
				})
				// this.socket.emit('userLogin', {user:this.user})
				this.socket.removeAllListeners()

				this.socket.on('broadcast', data => {
					this.$store.commit('barrage/PUTMESSAGE', JSON.parse(data))
				})

				this.socket.on('sendOnlineUser', users => {
					this.$store.commit('barrage/SETUSERS', users)
				})

				this.socket.on('updateVote', data => {
					this.$store.commit('vote/UPDATEVOTE', data)
				})
			} catch (error) {
				console.log(error)
			}
		},
		async onSubmitVote({ vote }) {
			try {
				const result = await _createOne(endpoint.vote, vote)
				if (result) {
					console.log(result)
					this.$store.commit('vote/SETVOTES', [result])
					this.alertContent = {
						content: 'Create vote successfully!',
						button: 'OK',
					}
				}
			} catch (error) {
				this.alertContent = {
					content: 'Create vote failed!',
					button: 'OK',
				}
			}
		},
		async onSubmitConfirm(flag) {
			if (flag) {
				await this._submitClassRoom({
					classRoom: this.classRoom,
				})
				this.classRoomCallback()
				await this.clearStore(false)
				this.socket.emit('closeSocket', false)
				this.socket.disconnect()
				this.socket = null
			}
			this.endClassContent = null
		},
		async onSubmitClassRoom({ classRoom, callback }) {
			this.classRoom = classRoom
			this.classRoomCallback = callback
			const { isOnClass } = classRoom
			if (isOnClass) {
				this.endClassContent = {
					content: 'End the class?',
					button: {
						confirm: 'Confirm',
						cancel: 'Cancel',
					},
				}
				return
			}
			await this._submitClassRoom({
				classRoom,
			})
			await this.initSocket()
			await this.getAllVotes()
			this.classRoomCallback()
		},
		async onSubmitName(user) {
			try {
				const result = await _updateOne(endpoint.user, user)
				if (result) {
					this.$store.commit('user/SETUSER', result)
					this.alertContent = {
						content: 'Change name successfully!',
						button: 'OK',
					}
				}
			} catch (error) {
				this.alertContent = {
					content: 'Change name failed!',
					button: 'OK',
				}
			}
		},
		async _submitClassRoom({ classRoom }) {
			try {
				const result = await _createOne(endpoint.classRoom, classRoom)
				if (result) {
					this.$store.commit('room/SETCLASSROOMINFO', result)
					const { isOnClass } = this.$store.state.room.classRoomInfo
					const content = isOnClass ? 'Class begin!' : 'Class end!'
					this.alertContent = {
						content,
						button: 'OK',
					}
				}
			} catch (error) {
				this.alertContent = {
					content: 'Failed!',
					button: 'OK',
				}
			}
		},
		async onSelectRoomCode({ roomId }) {
			await this.getClassRoomList({
				roomId,
			})
		},
		onSendMessage(newMessage) {
			try {
				this.socket.emit('sendMsg', JSON.stringify(newMessage))
			} catch (error) {
				console.log(error)
			}
			this.newMessage = ''
		},
		onSubmitAlert() {
			this.alertContent = null
		},
		async onSearchScoreAndComment({ classRoomId }) {
			console.log(classRoomId)
			await this.$store.dispatch('score/getScoreByClassRoomId', {
				endpoint: endpoint.score,
				data: { classRoomId },
			})
			await this.$store.dispatch('comment/getCommentByClassRoomId', {
				endpoint: endpoint.comment,
				data: { classRoomId },
			})
		},
	},
	mounted() {
		this.init()
	},
}
</script>

<style scoped>
.box {
	height: 100vh;
	width: 100%;
	border-radius: 50px;
}

.main {
	position: relative;
	width: 100%;
	height: 100%;
	background-color: #1d1d1f;
	overflow: hidden;
	border-radius: 50px;
}

.head {
	width: 100%;
	height: 15%;
}

.head .logo {
	width: 200px;
	height: 100%;
	margin-left: 20px;
}

.head .logo img {
	height: 40px;
	margin-top: 25px;
	margin-left: 20px;
}

.head .roomName {
	position: absolute;
	top: 0;
	left: 250px;
	height: 15%;
	color: #e1e1e3;
	font-size: 30px;
	letter-spacing: 2px;
	text-align: center;
	padding: 0 20px 0 20px;
	line-height: 3;
	font-weight: 700;
}

.head .roomName .id {
	position: absolute;
	top: 55px;
	left: 0px;
	height: 50px;
	font-size: 14px;
}

.body {
	width: 100%;
	height: 90%;
}
</style>
