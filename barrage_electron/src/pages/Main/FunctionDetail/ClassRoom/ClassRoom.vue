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
					/>
				</div>
				<div class="__form-item">
					<div class="__label">Begin Time:</div>
					<input
						type="text"
						class="__input"
					/>
				</div>
				<div class="__form-item">
					<div class="__label">End Time:</div>
					<input
						type="text"
						class="__input"
					/>
				</div>
			</div>
			<div class="__submit">Class Begin</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'ClassRoom',
	props: {
		isShowClassRoom: { type: Boolean, default: false },
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

.__form-item .__label{
  margin-left: -30%;
}

.__form-item input{
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

.__submit{
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
