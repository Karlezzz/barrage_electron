<template>
	<transition
		enter-active-class="animate__animated animate__flipInY "
		leave-active-class="animate__animated animate__flipOutY "
	>
		<div
			class="box"
			v-show="isShowShareRoom"
		>
			<div
				class="share"
				v-show="classRoom"
			>
				<div class="title">{{ roomName }}</div>
				<div class="message">
					<p>Class Room : {{ classRoomName }}</p>
					<p>
						Room code: <span class="__label">{{ roomCode }}</span>
					</p>
					<p>
						Room password: <span class="__label">{{ roomPassword }}</span>
					</p>
					<p>Room Url:</p>
					<p class="__url">{{ url }}</p>
				</div>
				<div
					class="qrCode"
					ref="qrCodeUrl"
				></div>
			</div>
			<div
				class="share --onClass"
				v-show="!classRoom"
			>
				Please create a classroom first !
			</div>
		</div>
	</transition>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
	name: 'ShareRoom',
	props: {
		clientUrl: { type: String, default: '' },
		isShowShareRoom: { type: Boolean, default: false },
	},
	data() {
		return {
			qrcode: null,
		}
	},
	computed: {
		url() {
			return `http://${this.clientUrl}:3000/#/barrage/${this.roomCode}`
		},
		room() {
			return this.$store.state.room.roomInfo
		},
		roomName() {
			return this.room ? this.room.name : ''
		},
		roomCode() {
			return this.room ? this.room.code : ''
		},
		roomPassword() {
			return this.room ? this.room.password : 'No password'
		},
		classRoom() {
			return this.$store.state.room.classRoomInfo
		},
		classRoomName() {
			return this.classRoom ? this.classRoom.name : ''
		},
	},
	methods: {
		createQrCode() {
			this.$nextTick(() => {
				setTimeout(() => {
					this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
						text: this.url,
						width: 150,
						height: 150,
						colorDark: '#1d1d1f',
						colorLight: '#e1e1e3',
						correctLevel: QRCode.CorrectLevel.H,
					})
				}, 1000)
			})
		},
	},
	mounted() {
		this.createQrCode()
	},
}
</script>

<style scoped>
.box {
	width: 100%;
	height: 100%;
}

.share {
	width: 100%;
	height: 70%;
	background-color: #323337;
	border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.--onClass {
	color: #e1e1e3;
}

.title {
	margin-left: 5%;
	width: 90%;
	height: 20%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	letter-spacing: 2px;
	color: #ea7724;
}

.message {
	width: 98%;
	height: 16%;
	margin-left: 1%;
	text-align: center;
}
.message .__url {
	font-size: 12px;
	user-select: all;
	color: #ea7724;
}
.message .__label {
	font-size: 16px;
	color: #ea7724;
}

.message p {
	font-size: 15px;
	color: #e1e1e3;
	padding-top: 5px;
}

.qrCode {
	margin-top: 80px;
	margin-bottom: 15%;
	width: 150px;
	height: 130px;
}
</style>
