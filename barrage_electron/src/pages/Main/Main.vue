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
					<div class="name">体育课</div>
					<div class="id">id:12345</div>
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
				<FunctionDetail></FunctionDetail>
			</div>
		</div>
	</div>
</template>

<script>
import Function from './Function/Function.vue'
import Barrage from './Barrage/Barrage.vue'
import FunctionDetail from './FunctionDetail/FunctionDetail.vue'

import { nanoid } from 'nanoid'
import { _findOne, _updateOne } from '@/api'
import { io } from 'socket.io-client'
import { User, Message } from '../../../lib/models'
export default {
	name: 'Main',
	components: {
		Function,
		Barrage,
		FunctionDetail,
	},
	data() {
		return {
			endpoint: {
				socket: '/socket',
				user: '/user',
			},
			user: null,
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
		async onSubmitName(user) {
			try {
				const result = await _updateOne(this.endpoint.user, user)
				if (result) alert('Successfully!')
			} catch (error) {
				alert('Failed!')
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
	},
	mounted() {
		this.initSocket()
		this.initUser()
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
	/* width: 150px; */
	/* height: 90px; */
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
	top: 30px;
	left: 130px;
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
