<template>
	<transition
		enter-active-class="animate__animated animate__flipInY "
		leave-active-class="animate__animated animate__flipOutY "
	>
		<div
			class="class-room"
			v-if="isShowClassRoom"
		>
			<div class="__title">Class Room</div>
			<div class="__form">
				<div class="__form-item">
					<div class="__label">Class Name:</div>
					<input
						type="text"
						class="__input"
						v-model="className"
					/>
				</div>
				<div class="__form-item">
					<div class="__label">
						Begin Time:<span class="__label--content">{{ $beginTime }}</span>
					</div>

					<!-- <input
						type="text"
						class="__input"
						v-model="beginTime"
					/> -->
				</div>
				<div class="__form-item">
					<div class="__label">
						End Time:<span class="__label--content">{{ $endTime }}</span>
					</div>
					<!-- <input
						type="text"
						class="__input"
						v-model="endTime"
					/> -->
				</div>
			</div>
			<div
				class="__submit"
				@click="onSubmitClassRoom"
			>
				{{ $label }}
			</div>
		</div>
	</transition>
</template>

<script>
import { nanoid } from 'nanoid'
import { ClassRoom } from '../../../../../lib/models'
export default {
	name: 'ClassRoom',
	props: {
		isShowClassRoom: { type: Boolean, default: false },
	},
	data() {
		return {
			className: '',
			beginTime: new Date().valueOf(),
			endTime: '',
			beginTimer: null,
			endTimer: null,
		}
	},
	computed: {
		$label() {
			return this.$isOnClass ? 'Class End' : 'Class Begin'
		},
		$isOnClass() {
			return this.classRoom ? this.classRoom.isOnClass : false
		},
		room() {
			return this.$store.state.room.roomInfo
		},
		roomCode() {
			return this.room ? this.room.code : null
		},
		classRoom() {
			return this.$store.state.room.classRoomInfo
		},
		$beginTime() {
			return new Date(this.beginTime).toLocaleTimeString()
		},
		$endTime() {
			// return this.classRoom && this.classRoom.endTime
			// 	? new Date(this.classRoom.endTime).toLocaleTimeString()
			// 	: '-- : -- : --'
			return typeof this.endTime === 'string'
				? this.endTime
				: new Date(this.endTime).toLocaleTimeString()
		},
	},
	methods: {
		onSubmitClassRoom() {
			const classRoom = ClassRoom.init({
				name: this.name,
				ownerRoomCode: this.roomCode,
				id: nanoid(),
			})
			const _classRoom = this.classRoom ? this.classRoom : classRoom
			clearInterval(this.beginTimer)
			clearInterval(this.endTimer)
			this.$emit('onSubmitClassRoom', {
				classRoom: _classRoom,
			})
			if (!this.$isOnClass) {
				this.endTimer = setInterval(() => {
					this.endTime = new Date().valueOf()
				})
			} else {
				this.endTime = '-- : -- : --'
			}
		},
	},
	mounted() {
		if (!this.$isOnClass) {
			this.beginTimer = setInterval(() => {
				this.beginTime = new Date().valueOf()
				this.endTime = '-- : -- : --'
			})
		} else {
			this.beginTime = this.classRoom.beginTime
			this.endTimer = setInterval(() => {
				this.endTime = new Date().valueOf()
			})
		}
	},
	beforeDestroy() {
		clearInterval(this.beginTimer)
		clearInterval(this.endTimer)
	},
}
</script>

<style scoped>
.class-room {
	display: flex;
	text-align: center;
	flex-direction: column;
	width: 96%;
	height: 80%;
	margin-top: 2%;
	margin-left: 5%;
	overflow: hidden;
}

.__title {
	/* background-color: lightcoral; */
	width: 98%;
	height: 14%;
	text-align: center;
	margin-top: 5%;
	font-size: 20px;
	letter-spacing: 2px;
	color: #e1e1e3;
}

.__form {
	width: 98%;
	height: 60%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.__form-item {
	width: 90%;
	height: 30%;
	margin-top: 10px;
	color: #e1e1e3;
}

.__label--content {
	margin-left: 5%;
	color: #ea7724;
}

.__form-item input {
	height: 25px;
	width: 80%;
	border: none;
	border-bottom: 1px solid #ea7724;
	background-color: #ffffff00;
	margin-top: 1%;
	padding-left: 10px;
	font-size: 16px;
	color: #e1e1e3;
}

.__submit {
	width: 80%;
	height: 40px;
	border: none;
	margin-top: 10%;
	margin-left: 10%;
	color: #e1e1e3;
	font-size: 17px;
	text-align: center;
	background-color: #526af0;
	border-radius: 15px;
	cursor: pointer;
	line-height: 200%;
}
</style>
