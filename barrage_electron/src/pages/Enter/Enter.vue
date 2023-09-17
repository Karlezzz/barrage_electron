<template>
	<div class="box">
		<div
			class="container"
			ref="container"
		>
			<div class="forms-container">
				<div class="signin-signup">
					<section class="sign-in-form">
						<h2 class="title">Welcome Barrage</h2>
						<div class="input-filed moreRoomName">
							<i class="fa-solid fa-user"></i>
							<input
								type="text"
								placeholder="ROOMNAME"
								v-model="roomName"
							/>
							<div
								class="img"
								@click="showRoomNameList"
							>
								<img
									src="../Enter/image/下拉.png"
									alt=""
								/>
							</div>
							<div
								class="roomIdList"
								v-if="isShowRoomName"
							>
								<div
									class="listItem"
									v-for="(item, idx) in roomList"
									:key="idx"
									@click="selectRoom(item)"
								>
									{{ item.name }}
								</div>
							</div>
						</div>
						<!-- 房间id -->
						<div class="input-filed">
							<i class="fa-solid fa-user"></i>
							<input
								type="text"
								placeholder="ROOMCODE"
								v-model="roomCode"
							/>
						</div>
						<!-- 密码 -->
						<div class="input-filed">
							<i class="fa-solid fa-user"></i>
							<input
								type="password"
								placeholder="PASSWORD"
							/>
						</div>
						<div
							class="btn solid"
							@click="addBarrage"
						>
							ADD
						</div>
					</section>
					<section class="sign-up-form">
						<h2 class="title">Setting SEVER</h2>
						<div class="input-filed">
							<i class="fa-solid fa-lock"></i>
							<input
								type="text"
								placeholder="IPADRESS"
								v-model="ipAddress"
							/>
						</div>
						<div class="input-filed">
							<i class="fa-solid fa-envelope"></i>
							<input
								type="test"
								placeholder="PORT"
								v-model="port"
							/>
						</div>

						<button
							class="btn solid"
							@click="saveIP"
						>
							SAVE
						</button>
					</section>
				</div>
			</div>
			<div class="panels-container">
				<div class="panel left-panel">
					<div class="content">
						<h2>Having a meeting or class ?</h2>
						<p>Set the ip and port of sever first !</p>
						<button
							class="btn transparent"
							id="sign-up-btn"
							@click="goToSetting"
						>
							Setting
						</button>
					</div>
					<img
						src="./svg/undraw_maker_launch_re_rq81.svg"
						class="image"
						alt=""
					/>
				</div>
				<div class="panel right-panel">
					<div class="content">
						<h3>Ready?</h3>
						<p>Add the barrage room now !</p>
						<button
							class="btn transparent"
							id="sign-in-btn"
							@click="goToAdd"
						>
							Add
						</button>
					</div>
					<img
						src="./svg/undraw_on_the_office_re_cxds.svg"
						class="image"
						alt=""
					/>
				</div>
			</div>
			<Alert
				@onSubmitAlert="onSubmitAlert"
				:content="popUpContent"
			></Alert>
		</div>
	</div>
</template>

<script>
import { Room } from '../../../lib/models'
import { nanoid } from 'nanoid'
import Alert from '../../components/Popup/Alert.vue'
import { endpoint } from '@/api/endpoint'
import { ipcRenderer } from 'electron'
export default {
	name: 'Enter',
	components: {
		Alert,
	},
	data() {
		return {
			isShowRoomName: false,
			roomName: null,
			roomCode: null,
			roomPassword: null,
			popUpContent: null,
			ipAddress: null,
			port: null,
			selectedRoom: null,
		}
	},
	created() {
		ipcRenderer.on('sendIpInfo', (e, data) => {
			const { ip, port } = data
			this.ipAddress = ip
			this.port = port
			this.$store.commit('room/SETIPPORT', {
				ip: this.ipAddress,
				port: this.port,
			})
		})
	},
	computed: {
		roomList() {
			return this.$store.state.room.roomList || []
		},
	},
	methods: {
		getRoomList() {
			this.$store.dispatch('room/getRoomList', { endpoint: endpoint.room })
		},
		goToSetting() {
			this.$refs.container.classList.add('sign-up-mode')
			this.isShowRoomName = false
		},
		goToAdd() {
			this.$refs.container.classList.remove('sign-up-mode')
		},
		saveIP() {
			this.$refs.container.classList.remove('sign-up-mode')
			const ipInfo = {
				ip: this.ipAddress,
				port: this.port,
			}
			this.$store.commit('room/SETIPPORT', ipInfo)
			ipcRenderer.invoke('getIpInfo', ipInfo)
		},
		onSubmitAlert() {
			this.popUpContent = null
		},
		showRoomNameList() {
			this.getRoomList()
			this.isShowRoomName = !this.isShowRoomName
		},
		selectRoom(item) {
			this.isShowRoomName = false
			this.roomCode = item.code
			this.roomName = item.name
			this.selectedRoom = item
		},
		async addBarrage() {
			if (!!this.roomCode && !!this.roomName) {
				await this.$store.dispatch('room/enterRoom', {
					endpoint: endpoint.room,
					data: Room.init({
						...this.selectedRoom,
						name: this.roomName,
						code: this.roomCode,
					}),
				})
				if (this.$store.state.room.roomInfo) {
					this.$router.push('/main')
				} else {
					this.popUpContent = {
						content: 'Connect failed! Please contact admin!',
						button: 'OK',
					}
				}
			} else {
				this.popUpContent = {
					content: 'Room name and code are required!',
					button: 'OK',
				}
			}
		},
	},
}
</script>

<style scoped>
.box {
	height: 100%;
	width: 100%;
	border-radius: 50px;
}

.container {
	position: relative;
	width: 100%;
	min-height: 100vh;
	background-color: #1d1d1f;
	overflow: hidden;
	border-radius: 50px;
}

.container::before {
	content: '';
	position: absolute;
	width: 2000px;
	height: 2000px;
	border-radius: 50%;
	/* background: linear-gradient(-45deg, #4481eb, #04befe); */
	background-color: #ea7724;
	top: -10%;
	right: 48%;
	transform: translateY(-50%);
	z-index: 6;
	transition: 1.8s ease-in-out;
}

.forms-container {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}

.signin-signup {
	position: absolute;
	top: 50%;
	left: 75%;
	transform: translate(-50%, -50%);
	width: 50%;
	display: grid;
	grid-template-columns: 1fr;
	z-index: 5;
	transition: 1s 0.7s ease-in-out;
}

section {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	grid-column: 1/2;
	grid-row: 1/2;
	padding: 0 5rem;
	overflow: hidden;
	transition: 0.2s 0.7s ease-in-out;
}

section.sign-in-form {
	z-index: 2;
}

section.sign-up-form {
	z-index: 1;
	opacity: 0;
}

.title {
	font-size: 2.2rem;
	color: #ea7724;
	margin-bottom: 10px;
}

.input-filed {
	max-width: 380px;
	width: 100%;
	height: 55px;
	background-color: #f0f0f0;
	margin: 10px 0;
	border-radius: 50px;
	display: grid;
	grid-template-columns: 15% 85%;
	padding: 0 1.5rem;
}

.input-filed i {
	text-align: center;
	line-height: 55px;
	color: #acacac;
	font-size: 1.1rem;
}

.input-filed input {
	outline: none;
	border: none;
	background-color: #f0f0f0;
	color: #ea7724;
	line-height: 1;
	font-weight: 600;
	font-size: 1.1rem;
	letter-spacing: 1px;
}

.input-filed input::placeholder {
	/* color: #aaa; */
	color: #ea7724;
	font-weight: 550;
}

.btn {
	width: 150px;
	height: 49px;
	border: none;
	border-radius: 49px;
	cursor: pointer;
	background-color: #ea7724;
	color: #fff;
	text-transform: uppercase;
	font-size: 1.2rem;
	font-weight: 600;
	margin: 10px 5px;
	transition: 0.5s;
	display: flex;
	justify-content: center;
	align-items: center;
}

.btn:hover {
	background-color: #c86118;
}

.panels-container {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
}

.panel {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	text-align: center;
	z-index: 7;
}

.left-panel {
	padding: 3rem 17% 2rem 12%;
	pointer-events: all;
}

.right-panel {
	pointer-events: none;
	padding: 3rem 12% 2rem 17%;
}

.panel .content {
	color: #fff;
	transition: 0.9s 0.6s ease-in-out;
}

.panel h3 {
	font-weight: 600;
	line-height: 1;
	font-size: 1.5rem;
}

.panel p {
	font-size: 1rem;
	padding: 1rem 0;
}

.btn.transparent {
	background: none;
	border: 2px solid #fff;
	margin: 20px 90px;
	font-size: 1.1rem;
	width: 130px;
	height: 41px;
	font-weight: 400;
}

.image {
	width: 100%;
	transition: 0.9s 0.8s ease-in-out;
}

.right-panel .content,
.right-panel .image {
	transform: translateX(800px);
}

.container.sign-up-mode:before {
	transform: translate(100%, -49%);
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
	transform: translateX(-800px);
}

.container.sign-up-mode .right-panel .content,
.container.sign-up-mode .right-panel .image {
	transform: translateX(0px);
}

.container.sign-up-mode .right-panel {
	pointer-events: all;
}

.container.sign-up-mode .left-panel {
	pointer-events: none;
}

.container.sign-up-mode .signin-signup {
	left: 25%;
}

.container.sign-up-mode section.sign-in-form {
	opacity: 0;
	z-index: 1;
}

.container.sign-up-mode section.sign-up-form {
	z-index: 2;
	opacity: 1;
}

.moreRoomName {
	position: relative;
	/* background-color: red; */
}

.moreRoomName .img {
	display: inline-block;
	position: absolute;
	top: 10px;
	right: 10px;
	width: 35px;
	height: 35px;
	cursor: pointer;
}

.moreRoomName .img img {
	width: 100%;
	height: 100%;
}

.moreRoomName .img:hover {
	background-color: #e6e4e484;
	border-radius: 10px;
}

.roomIdList {
	/* display: none; */
	position: absolute;
	/* top: 159px; */
	top: 100%;
	left: 7%;
	width: 85%;
	background-color: white;
	border-bottom-left-radius: 50px;
	border-bottom-right-radius: 50px;
	/* background-color: red; */
	overflow: scroll;
	z-index: 999;
}

.roomIdList .listItem {
	height: 40px;
	width: 100%;

	background-color: #ea7724;
	display: flex;
	justify-content: center;
	align-items: center;
	/* color: #ea7724; */
	color: white;
	font-size: 1.1rem;
	font-weight: 600;
	border-bottom: 1px solid #c3c3c7c9;
	cursor: pointer;
}

.roomIdList .listItem:hover {
	background-color: #e96405;
	color: white;
}
</style>
