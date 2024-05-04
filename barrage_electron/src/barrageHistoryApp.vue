<template>
	<div class="container">
		<div class="headBar">
			<div class="movable"></div>
			<div
				class="close"
				@click="onCloseHistoryPage"
			>
				<img
					src="./static/image/关闭.png"
					alt=""
				/>
			</div>
		</div>

		<div class="content">
			<div
				class="message"
				v-for="(i, idx) in barrageList"
				:key="idx"
			>
				{{ i?.content }}
			</div>
		</div>
	</div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
	data() {
		return {
			barrageList: [],
		}
	},
	methods: {
		onCloseHistoryPage() {
			ipcRenderer.send('closeMessageHistory')
		},
		initScroll() {
			let div = document.querySelector('.content')
			div.scrollTop = div.scrollHeight
		},
	},

	created() {
		ipcRenderer.on('getAllVuexMsg', (e, data) => {
			this.barrageList = [...this.barrageList, ...data]
		})
		ipcRenderer.on('getVuexMsg', (e, data) => {
			this.barrageList = [...this.barrageList, data]
		})
	},
	mounted() {
		ipcRenderer.send('messageHistoryComplete')
		this.initScroll()
	},
	watch: {
		barrageList() {
			this.$nextTick(() => {
				let div = document.querySelector('.content')
				div.scrollTop = div.scrollHeight
			})
		},
	},
}
</script>

<style lang="less" scoped>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

*::-webkit-scrollbar {
	display: none;
}

/* 禁止图片被保存 */
img {
	pointer-events: auto;
	-webkit-user-drag: none;
}

input:focus {
	outline: none;
}

input::-webkit-input-placeholder {
	color: #ffffff;
}

input::-moz-placeholder {
	/* Mozilla Firefox 19+ */
	color: #ffffff;
}

input:-moz-placeholder {
	/* Mozilla Firefox 4 to 18 */
	color: #ffffff;
}

input:-ms-input-placeholder {
	/* Internet Explorer 10-11 */
	color: #ffffff;
}
.container {
	width: 100%;
	height: 94vh;
	background-color: #cccccc;
	color: rgb(252, 63, 63);
	border-radius: 20px;
	opacity: 0.6;
	&:hover {
		opacity: 1;
	}
	.headBar {
		width: 100%;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		.movable {
			width: 80%;
			height: 30px;
			-webkit-app-region: drag;
		}
		.close {
			width: 20%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			//user-select: none;
			cursor: pointer;
			img {
				width: 70%;
			}
		}
	}
	.content {
		width: 100%;
		height: calc(100% - 40px);
		overflow: scroll;
		.message {
			margin-bottom: 10px;
			word-wrap: break-word;
			background-color: #f9a53f;
			width: 90%;
			margin-left: 5%;
			border-radius: 5px;
			padding: 5px;
		}
	}
}
</style>
