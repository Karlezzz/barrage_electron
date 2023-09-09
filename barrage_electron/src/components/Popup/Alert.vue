<template>
	<div class="alert" v-if="content">
		<div class="__content">{{ $mainContent }}</div>
		<div class="__button" @click="onSubmitAlert">{{ $buttonContent }}</div>
	</div>
</template>

<script>
export default {
	name: 'Alert',
	props: {
		content: { type: Object, default: null },
	},
	computed: {
		$mainContent() {
			return this.content ? this.content.content : ''
		},
		$buttonContent() {
			return this.content ? this.content.button : ''
		},
	},
  methods: {
    onSubmitAlert() {
      this.$emit('onSubmitAlert')
    }
  }
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
	width: 100%;
	height: 50%;
	color: #e1e1e3;
	font-size: 17px;
	letter-spacing: 1px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.__button {
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

.__button:hover {
	background-color: #e78f50;
}
</style>
