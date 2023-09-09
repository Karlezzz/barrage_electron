<template>
	<div class="box">
		<div class="main">
			<div class="head">
				<div class="logo">
					<img
						src="../../assets/dgut2.png"
						alt=""
					/>
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
				></Function>
				<Barrage
					:user="user"
					@onSendMessage="onSendMessage"
				></Barrage>
				<FunctionDetail
					:clientUrl="clientUrl"
					@onSubmitClassRoom="onSubmitClassRoom"
					@onSubmitVote="onSubmitVote"
				></FunctionDetail>
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
import { _findOne, _updateOne, _createOne } from '@/api'
import { io } from 'socket.io-client'
import { User } from '../../../lib/models'
export default {
	name: 'Main',
	components: {
		Function,
		Barrage,
		FunctionDetail,
		Confirm,
		Alert,
	},
	data() {
		return {
			endpoint: {
				socket: '/socket',
				user: '/user',
				client: '/client',
				classRoom: '/classRoom',
				vote: '/vote',
			},
			user: null,
			clientUrl: null,
			endClassContent: null,
			classRoom: null,
			classRoomCallback: null,
			alertContent: null,
		}
	},
	computed: {
		roomInfo() {
			return this.$store.state.room.roomInfo
		},
		roomName() {
			return this.roomInfo ? this.roomInfo.name : ''
		},
		roomCode() {
			return this.roomInfo ? this.roomInfo.code : ''
		},
	},
	methods: {
		onSubmitAlert() {
			this.alertContent = null
		},
		async onSubmitVote({ vote }) {
			try {
				const result = await _createOne(this.endpoint.vote, vote)
				if (result) {
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
				await this._submitClassRoom({ classRoom: this.classRoom })
				this.classRoomCallback()
				await this.$store.commit('room/SETCLASSROOMINFO', null)
				this.socket.disconnect()
			}
			this.endClassContent = null
		},
		async _submitClassRoom({ classRoom }) {
			try {
				const result = await _createOne(this.endpoint.classRoom, classRoom)
				if (result) {
					this.$store.commit('room/SETCLASSROOMINFO', result)
					const { isOnClass } = this.$store.state.room.classRoomInfo
					const content = isOnClass ? 'CLass begin !' : 'Class end !'
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
		async onSubmitClassRoom({ classRoom, callback }) {
			this.classRoom = classRoom
			this.classRoomCallback = callback
			const { isOnClass } = classRoom
			if (isOnClass) {
				this.endClassContent = {
					content: 'Confirm the end of class?',
					button: {
						confirm: 'Confirm',
						cancel: 'Cancel',
					},
				}
				return
			}
			await this._submitClassRoom({ classRoom })
			await this.initSocket()
			this.classRoomCallback()
		},
		async onSubmitName(user) {
			try {
				const result = await _updateOne(this.endpoint.user, user)
				if (result) {
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
		onSendMessage(newMessage) {
			try {
				this.socket.emit('sendMsg', JSON.stringify(newMessage))
			} catch (error) {
				console.log(error)
			}
			this.newMessage = ''
		},
		async initSocket() {
			try {
				const { socketUrl } = await this.getSocketUrl()
				this.socket = io(socketUrl, {
					transports: ['websocket'],
				})
				this.socket.removeAllListeners()
				this.socket.on('broadcast', data => {
					this.$store.dispatch('saveMessage', JSON.parse(data))
				})
			} catch (error) {
				console.log(error)
			}
		},
		async getSocketUrl() {
			try {
				const result = await _findOne(this.endpoint.socket)
				if (result) return result
			} catch (error) {
				console.log(error)
			}
		},
		initUser() {
			this.user = User.init({
				id: nanoid(),
				name: 'Teacher',
			})
		},
		async getClientUrl() {
			try {
				const result = await _findOne(this.endpoint.client)
				if (result) return result
			} catch (error) {
				return 'https://www.dgut.edu.cn/'
			}
		},
		async initClientUrl() {
			this.clientUrl = await this.getClientUrl()
		},
		async init() {
			await this.initUser()
			await this.initClientUrl()
		},
	},
	mounted() {
		this.init()
	},
}
</script>

<style scoped>
.box {
	/* height: 100%; */
	height: 100vh;
	width: 100%;
	border-radius: 50px;
}

.main {
	position: relative;
	width: 100%;
	height: 100%;
	/* min-height: 100vh; */
	background-color: #1d1d1f;
	overflow: hidden;
	border-radius: 50px;
}

.head {
	width: 100%;
	/* height: 90px; */
	height: 15%;
	/* background-color: #ff0000; */
}

.head .logo {
	width: 200px;
	height: 100%;
	margin-left: 20px;
	/* background-color: red; */
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
	/* background-color: red; */
	height: 50px;
	font-size: 14px;
}

.body {
	/* background-color: rgb(255, 255, 255); */
	width: 100%;
	/* height: 510px; */
	height: 90%;
}
</style>
