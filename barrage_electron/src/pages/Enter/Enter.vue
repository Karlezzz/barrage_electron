<template>
	<div class="box">
		<div
			class="container"
			ref="container"
		>
			<div class="forms-container">
				<div class="signin-signup">
					<div
						action="#"
						class="sign-in-form"
					>
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
							<!-- 房间信息列表 -->
							<!-- <div
								class="roomIdList"
								v-if="isShowRoomName"
							>
								<div
									class="listItem"
									v-for="item in roomInfoList"
									:key="item.roomId"
									@click="selectRoomName(item)"
								>
									{{ item.roomName }}
								</div>
							</div> -->
						</div>
						<!-- 房间id -->
						<div class="input-filed moreRoomName">
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
					</div>
				</div>
			</div>
			<div class="panels-container">
				<div class="panel left-panel">
					<div class="content">
						<h2>Having a meeting or class ?</h2>
						<p>Help you solve the live chat !</p>
					</div>
					<img
						src="./svg/undraw_maker_launch_re_rq81.svg"
						class="image"
						alt=""
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Room } from '../../../lib/models'
import { nanoid } from 'nanoid'
export default {
	name: 'Enter',
	data() {
		return {
			isShowRoomName: false,
			roomName: null,
			roomCode: null,
			roomPassword: null,
			// roomInfoList: this. $store.state.enter.roomInfoList,
			// roomInfoList: [],
			endpoint: {
				room: '/room',
			},
		}
	},
	methods: {
		showRoomNameList() {
			this.isShowRoomName = !this.isShowRoomName
		},
		selectRoomName(item) {
			this.isShowRoomName = false
			this.roomId = item.roomId
			this.roomName = item.roomName
		},
		async addBarrage() {
			if (!!this.roomCode && !!this.roomName) {
				await this.$store
					.dispatch('room/enterRoom', {
						endpoint: this.endpoint.room,
						data: this.initRoom(),
					})
					.then(() => {
						this.$router.push('/main')
					})
			} else {
				alert('Room code and room name are required!')
			}
		},
		initRoom() {
			return Room.init({
				id: nanoid(),
				name: this.roomName,
				code: this.roomCode,
				password: this.roomPassword,
			})
		},
	},
	created() {
		// this.$store.dispatch('getRoomInfoList');
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

.sign-in-form {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	grid-column: 1/2;
	grid-row: 1/2;
	padding: 0 5rem;
	overflow: hidden;
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
	margin: 0;
	font-size: 1.1rem;
	width: 130px;
	height: 41px;
	font-weight: 400;
}

.image {
	width: 100%;
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
	height: 160px;
	width: 292px;
	background-color: #ea7724;
	border-bottom-left-radius: 50px;
	border-bottom-right-radius: 50px;
	/* background-color: red; */
	overflow: scroll;
	z-index: 999;
}

.roomIdList .listItem {
	/* margin-bottom: 5px; */
	height: 40px;
	width: 100%;

	background-color: #f0f0f0;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ea7724;
	font-size: 1.1rem;
	font-weight: 600;
	border-bottom: 1px solid #c3c3c7c9;
	cursor: pointer;
}

.roomIdList .listItem:hover {
	background-color: #ea7724;
	color: white;
}
</style>
