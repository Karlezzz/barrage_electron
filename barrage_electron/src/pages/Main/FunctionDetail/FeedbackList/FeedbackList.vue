<template>
	<transition
		enter-active-class="animate__animated animate__flipInY "
		leave-active-class="animate__animated animate__flipOutY "
	>
		<div
			class="feedback"
			v-if="isShowFeedbackList"
		>
			<div class="feedback__search">
				<div class="search__item search__item--room">
					<div class="search__label">Room Name</div>
					<div class="search__image">
						<img
							src="../../image/search.png"
							alt=""
						/>
					</div>
					<div class="search__input">
						<input
							type="text"
							v-model="inputRoomId"
						/>
					</div>
					<div
						class="search__dropdown"
						@click="showDropdown(1)"
					>
						<img
							src="../../../Enter/image/下拉.png"
							alt=""
						/>
					</div>
					<div
						class="search__dropdown-list"
						v-show="showDropdownRoom"
					>
						<div class="list-box">
							<div
								class="list-item"
								v-for="list in roomList"
								:key="list.id"
								@click="selectRoom(list)"
							>
								{{ list.name }}
							</div>
						</div>
					</div>
				</div>
				<div class="search__item search__item--classRoom">
					<div class="search__label">Classroom Name</div>
					<div class="search__image">
						<img
							src="../../image/search.png"
							alt=""
						/>
					</div>
					<div class="search__input">
						<input
							type="text"
							v-model="inputClassRoomId"
						/>
					</div>
					<div
						class="search__dropdown"
						@click="showDropdown(2)"
					>
						<img
							src="../../../Enter/image/下拉.png"
							alt=""
						/>
					</div>
					<div
						class="search__dropdown-list"
						v-show="showDropdownClass"
					>
						<div class="list-box">
							<div
								class="list-item"
								v-for="list in classRoomList"
								:key="list.id"
								@click="selectClassRoom(list)"
							>
								{{ list.name }}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="feedback_head">
				<div
					class="twoFeedbackSelect"
					@click="selectFeedback(1)"
					:style="{
						'background-color': isShowScore ? '#526af0' : '#232227',
					}"
				>
					Score
				</div>
				<div
					class="twoFeedbackSelect"
					@click="selectFeedback(2)"
					:style="{
						'background-color': isShowComment ? '#526af0' : '#232227',
					}"
				>
					Comment
				</div>
			</div>
			<div class="feedback_body">
				<FeedbackScore v-if="isShowScore"></FeedbackScore>
				<FeedbackComment v-if="isShowComment"></FeedbackComment>
			</div>
		</div>
	</transition>
</template>

<script>
import FeedbackScore from './FeedbackScore.vue'
import FeedbackComment from './FeedbackComment.vue'
export default {
	name: 'FeedbackList',
	props: ['isShowFeedbackList'],
	components: {
		FeedbackComment,
		FeedbackScore,
	},
	data() {
		return {
			isShowScore: true,
			isShowComment: false,
			showDropdownRoom: false,
			showDropdownClass: false,
			inputRoomId: null,
			inputClassRoomId: null,
			selectedClassRoom: null,
		}
	},
	methods: {
		selectFeedback(index) {
			this.isShowScore = false
			this.isShowComment = false
			switch (index) {
				case 1:
					this.isShowScore = true
					break
				case 2:
					this.isShowComment = true
					break
				default:
					break
			}
		},
		showDropdown(key) {
			if (key === 1) {
				this.showDropdownClass = false
				this.showDropdownRoom = !this.showDropdownRoom
			} else if (key === 2) {
				this.showDropdownRoom = false
				this.showDropdownClass = !this.showDropdownClass
			}
		},
		selectRoom(room) {
			const { id, name } = room
			this.inputRoomId = name
			this.$emit('onSelectRoomCode', { roomId: id })
			this.showDropdownRoom = false
			// if (this.classRoomList.length > 0) {
			// 	this.$nextTick(() => {
			// 		this.selectClassRoom(this.classRoomList[0])
			// 		this.onSearchScoreAndComment({
			// 			classRoomId: this.selectedClassRoom.id,
			// 		})
			// 	})
			// }
		},
		selectClassRoom(classRoom) {
			const { name, id } = classRoom
			this.inputClassRoomId = name
			// this.selectedClassRoom = classRoom
			this.showDropdownClass = false
			this.onSearchScoreAndComment({ classRoomId: id })
		},
		onSearchScoreAndComment({ classRoomId }) {
			this.$emit('onSearchScoreAndComment', { classRoomId })
		},
	},
	computed: {
		roomList() {
			return this.$store.state.room.roomList || []
		},
		classRoomList() {
			return this.$store.state.room.classRoomList || []
		},
	},
}
</script>

<style lang="less" scoped>
.feedback {
	width: 96%;
	height: 96%;
	margin-top: 2%;
	margin-left: 2%;
	overflow: hidden;

	&__search {
		width: 100%;
		height: 110px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		.search {
			&__item {
				width: 100%;
				height: 45px;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				border: 2px solid #ea7724;
				border-radius: 20px;
				margin-top: 10px;
				position: relative;
			}

			&__label {
				position: absolute;
				top: -10px;
				left: 30px;
				height: 20px;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 10px;
				color: #ea7724;
				background-color: #1d1d1f;
				font-size: 17px;
			}

			&__image {
				width: 30px;
				height: 30px;

				img {
					width: 30px;
					height: 30px;
				}
			}

			&__input {
				width: 71%;
				height: 25px;

				input {
					width: 100%;
					height: 100%;
					outline: none;
					border: none;
					background-color: transparent;
					color: #ea7724;
					font-size: 17px;
					padding-left: 10px;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}

			&__dropdown {
				width: 30px;
				height: 30px;
				cursor: pointer;

				img {
					width: 30px;
					height: 30px;
				}
			}

			&__dropdown-list {
				position: absolute;
				left: 1%;
				top: 50px;
				width: 98%;
				height: 200px;
				z-index: 1;
				background-color: #ea7724;
				border-radius: 20px;

				&::before {
					content: '';
					position: absolute;
					top: -7px;
					left: 30%;
					width: 0;
					height: 0;
					border-left: 5px solid transparent;
					border-right: 5px solid transparent;
					border-bottom: 7px solid #ea7724;
					background-color: transparent;
				}

				.list-box {
					height: 160px;
					margin: 15px 0;
					overflow-y: scroll;

					.list-item {
						width: 100%;
						height: 40px;
						display: flex;
						align-items: center;
						color: #fff;
						padding: 0 20px;
						cursor: pointer;

						&:hover {
							background-color: #e4813b;
						}
					}
				}
			}
		}
	}

	&_head {
		width: 100%;
		height: 15%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1px solid #e1e1e3;

		.twoFeedbackSelect {
			float: left;
			width: 100px;
			height: 50px;
			color: #e1e1e3;
			background-color: #526af0;
			font-size: 18px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 15px;
			cursor: pointer;

			&:nth-child(2) {
				background-color: #232227;
			}
		}
	}

	&_body {
		width: 98%;
		height: 90%;
		margin-left: 1%;
		margin-top: 3%;
	}
}
</style>
