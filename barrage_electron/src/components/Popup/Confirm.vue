<template>
	<div class="alert" v-if="!!content">
		<div class="__content">{{ $mainContent }}</div>
		<div class="__button">
			<div
				class="__first-button"
				@click="onSubmitConfirm(true)"
			>
				{{ $confirm }}
			</div>
			<div
				class="__second-button"
				@click="onSubmitConfirm(false)"
			>
				{{ $cancel }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'alert',
	props: {
		content: { type: Object, default: null },
	},
	computed: {
		$mainContent() {
			return this.content ? this.content.content : ''
		},
		$button() {
			return this.content ? this.content.button : ''
		},
		$confirm() {
			return this.$button ? this.$button.confirm : ''
		},
		$cancel() {
			return this.$button ? this.$button.cancel : ''
		},
	},
	methods: {
		onSubmitConfirm(flag) {
			this.$emit('onSubmitConfirm', flag)
		},
	},
}
</script>

<style scoped>
.alert {
	position: absolute;
	top: 30%;
	left: 30%;
	width: 40%;
	height: 40%;
	background-color: #414146;
	border-radius: 30px;
	z-index: 999;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.__content {
	margin-top: 5%;
	width: 100%;
	height: 50%;
	color: #e1e1e3;
	font-size: 20px;
	letter-spacing: 1px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.__button {
	margin-top: -5%;
	width: 70%;
	height: 50%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: row;
}

.__button div {
	width: 150px;
	height: 45px;
	border: none;
	border-radius: 30px;
	background-color: #ea7724;
	color: #e1e1e3;
	font-size: 17px;
	letter-spacing: 1px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
