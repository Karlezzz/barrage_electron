<template>
	<div class="function">
		<div class="personInfo">
			<img
				src="../image/头像 (5).png"
				alt=""
			/>
			<div class="adminName">
				<span
					class="__content"
					v-if="!isEditName"
					>{{ adminName }}</span
				>
				<input
					type="text"
					class="__input"
					:value="adminName"
					v-if="isEditName"
					@blur="onSubmitName($event)"
					ref="editName"
				/>
			</div>
			<div
				class="edit"
				@click="editName"
			>
				<img
					src="../image/编辑.png"
					alt=""
				/>
			</div>
			<div class="line"></div>
			<div
				class="createNewRoom"
				@click="backToEnter"
			>
				Create a new barrage room
			</div>
		</div>
		<div class="functionList">
			<div
				class="functionItem"
				style="margin-top: 5px"
				@click="selectFunction(1)"
			>
				<div class="icon">
					<img
						src="../image/在线人数.png"
						alt=""
					/>
				</div>
				<div class="functionName">Online Members</div>
			</div>
			<div
				class="functionItem"
				@click="selectFunction(2)"
			>
				<div class="icon">
					<img
						src="../image/投票.png"
						alt=""
					/>
				</div>
				<div class="functionName">Vote</div>
			</div>
			<div
				class="functionItem"
				@click="selectFunction(4)"
			>
				<div class="icon">
					<img
						src="../image/share.png"
						alt=""
					/>
				</div>
				<div class="functionName">Room sharing</div>
			</div>
			<div
				class="functionItem"
				@click="selectFunction(5)"
			>
				<div class="icon">
					<img
						src="../image/classRoom.png"
						alt=""
					/>
				</div>
				<div
					class="functionName"
					:style="{ color: classRoomOnClass ? '#ea7724' : '#e1e1e3' }"
				>
					{{ $classRoomLabel }}
				</div>
			</div>
			<div
				class="functionItem"
				@click="selectFunction(6)"
			>
				<div class="icon">
					<img
						src="../image/feedback.png"
						alt=""
					/>
				</div>
				<div class="functionName">Feedback List</div>
			</div>
			<div
				class="openBarrageHistory functionItem"
				:class="{
					noBarrage: classRoom === null,
				}"
				@click="openMessageHistory"
			>
				<div class="icon">
					<img
						src="../image/弹幕数_32.png"
						alt=""
					/>
				</div>
				<div class="functionName">Message List</div>
			</div>
			<div
				class="openBarrage"
				:class="{
					noBarrage: classRoom === null,
				}"
				@click="startBarrage"
			>
				<div class="icon">
					<img
						src="../image/弹幕数_32.png"
						alt=""
					/>
				</div>
				<div class="word">
					{{ barStatus }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
	name: 'Function',
	data() {
		return {
			functionStatusList: {
				isShowMember: true,
				isShowVote: false,
				isShowScreen: false,
				isShowShareRoom: false,
				isShowClassRoom: false,
				isShowFeedbackList: false,
			},
			isOpenBarrage: false,
			isOpenMessageHistory: false,
			barrageStatus: null,
			isEditName: false,
			adminName: 'Teacher',
		}
	},
	props: {
		user: { type: Object, default: () => {} },
	},
	methods: {
		async backToEnter() {
			this.$emit('onBackToEnter')
		},
		editName() {
			this.isEditName = true
			setTimeout(() => {
				this.$refs.editName.focus()
			}, 10)
		},
		onSubmitName(e) {
			this.adminName = e.target.value
			this.user.setUserName(this.adminName)
			this.isEditName = false
			this.$emit('onSubmitName', this.user)
		},
		selectFunction(index) {
			for (let i in this.functionStatusList) {
				this.functionStatusList[i] = false
			}
			if (index == 1) this.functionStatusList.isShowMember = true
			if (index == 2) this.functionStatusList.isShowVote = true
			if (index == 3) this.functionStatusList.isShowScreen = true
			if (index == 4) this.functionStatusList.isShowShareRoom = true
			if (index == 5) this.functionStatusList.isShowClassRoom = true
			if (index === 6) this.functionStatusList.isShowFeedbackList = true

			this.$bus.$emit('getFunctionStatusList', this.functionStatusList)
		},
		startBarrage() {
			this.isOpenBarrage = !this.isOpenBarrage
			if (this.isOpenBarrage) {
				ipcRenderer.send('newWindow')
				this.barrageStatus = '关闭弹幕'
			} else if (!this.isOpenBarrage) {
				ipcRenderer.send('closeNewWindow')
				this.barrageStatus = '开启弹幕'
			}
		},
		openMessageHistory() {
			if (this.isOpenMessageHistory) return
			ipcRenderer.send('openMessageHistory', this.messageList)
		},
	},
	computed: {
		barStatus() {
			return this.classRoom
				? this.isOpenBarrage == false
					? 'Open barrage'
					: 'Close barrage'
				: 'No Class Room'
		},
		classRoom() {
			return this.$store.state.room.classRoomInfo
		},
		classRoomOnClass() {
			return this.classRoom ? this.classRoom.isOnClass : false
		},
		messageList() {
			return this.store.state.barrage.messageList || []
		},
		$classRoomLabel() {
			return this.classRoomOnClass ? 'In class' : 'Create classroom'
		},
	},
	mounted() {
		ipcRenderer.on('hasCloseBarrage', () => {
			this.isOpenBarrage = false
		})
		ipcRenderer.on('hasOpenBarrage', () => {
			this.isOpenBarrage = true
		})
		ipcRenderer.on('hasCloseMessageHistory', () => {
			this.isOpenMessageHistory = false
		})
	},
}
</script>

<style scoped>
.function {
	width: 20%;
	height: 90%;
	overflow: hidden;
	margin-left: 10px;
	float: left;
}

.function .personInfo {
	margin-top: 10px;
	margin-left: 3%;
	width: 94%;
	height: 100px;
	background-color: #323337;
	border-radius: 20px;
}

.function .personInfo img {
	display: inline-block;
	margin: 10px 0 0 20px;
	width: 50px;
	height: 50px;
	border-radius: 15px;
}

.function .personInfo .adminName {
	width: 80px;
	height: 20px;

	margin-top: -50px;
	margin-left: 80px;
}

.adminName .__input {
	width: 98%;
	border: none;
	border-bottom: 1px solid #ea7724;
	background-color: #ffffff00;
	margin-top: 1%;
	padding-left: 10px;
	font-size: 16px;
	color: #e1e1e3;
}

.adminName .__content {
	width: 98%;
	font-size: 14px;
	color: #e1e1e3;
}

.function .personInfo .edit {
	position: absolute;
	left: 17%;
	top: 19%;
	width: 25px;
	height: 25px;
}

.function .personInfo .edit img {
	margin-top: -1px;
	margin-left: -1px;
	width: 100%;
	height: 100%;
}

.function .personInfo .line {
	width: 96%;
	height: 1px;
	margin-left: 2%;
	margin-top: 35px;
	background-color: #494b4f;
}

.function .personInfo .createNewRoom {
	width: 90%;
	font-size: 12px;
	margin-left: 5%;
	margin-top: 5px;
	text-align: center;
	color: #e1e1e3;
	cursor: pointer;
}

.function .functionList {
	margin-top: 10px;
	margin-left: 10px;
	width: 94%;
	height: 80%;
	overflow: scroll;
	position: relative;
}

.function .functionList .functionItem {
	margin-left: 1%;
	margin-top: 5px;
	width: 99%;
	height: 50px;
	border-radius: 10px;
	overflow: hidden;
	cursor: pointer;
}

.function .functionList .functionItem .icon {
	float: left;
	width: 25px;
	height: 25px;
	margin-top: 13px;
	margin-left: 15px;
}

.function .functionList .functionItem .icon img {
	width: 100%;
	height: 100%;
}

.function .functionList .functionItem .functionName {
	float: left;
	width: 140px;
	height: 30px;
	color: #e1e1e3;
	letter-spacing: 1px;
	margin-top: 13px;
	margin-left: 20px;
	font-size: 14px;
}

.function .functionList .functionItem:hover {
	background-color: #303032;
}

.function .functionList .openBarrage {
	background-color: #526af0;
	width: 98%;
	height: 50px;
	border-radius: 10px;
	overflow: hidden;
	cursor: pointer;
	position: absolute;
	bottom: 8%;
	left: 1%;
}

.function .functionList .noBarrage {
	background-color: #232323;
	color: #706e6e;
	cursor: not-allowed;
}

.function .openBarrage .icon {
	float: left;
	width: 25px;
	height: 25px;
	margin-top: 13px;
	margin-left: 15px;
}

.function .openBarrage .icon img {
	width: 100%;
	height: 100%;
}

.function .openBarrage .word {
	float: left;
	width: 130px;
	height: 30px;
	color: #e1e1e3;
	letter-spacing: 1px;
	margin-top: 14px;
	margin-left: 20px;
	font-size: 15px;
}
</style>
