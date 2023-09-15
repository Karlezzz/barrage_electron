<template>
	<div
		id="app"
		class="app"
	>
		<div
			class="textArea"
			ref="textArea"
		>
			<div
				class="text"
				v-for="(item, index) in barrageList"
				:key="index"
				ref="text"
			>
				{{ item.content }}
			</div>
		</div>
	</div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
	name: 'BarrageApp',
	data() {
		return {
			barrageList: [],
		}
	},
	methods: {
		handlerBarrage() {
			this.$nextTick(() => {
				setTimeout(() => {
					let childNode =
						this.$refs.textArea.childNodes[
							this.$refs.textArea.childNodes.length - 1
						]
					let documentWidth = window.screen.width
					let textWidth = childNode.clientWidth
					let random = Math.floor(Math.random() * 5 + 1)
					let donghua = `@keyframes move{
            from{
              transform: translateX(${documentWidth}px)
            }
            to{
              transform: translateX(${-(documentWidth + textWidth)}px)
            }
          }`
					let sheet = document.styleSheets[0]
					childNode.style.display = 'inline-block'
					childNode.style.top = random * 10 + '%'
					// childNode.style.left = documentWidth+'px'
					sheet.insertRule(donghua, 0)
					childNode.style.animation = 'move 20s ease-out'
					childNode.style.animationFillMode = 'forwards'
				}, 2000)
				setTimeout(() => {
					this.barrageList.shift()
				}, 30000)
			})
		},
	},
	created() {
		ipcRenderer.on('getVuexMsg', (e, data) => {
			this.barrageList.push(data)
			this.handlerBarrage()
		})
	},
}
</script>

<style>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	user-select: none;
	/* overflow: hidden; */
}

*::-webkit-scrollbar {
	display: none;
}

.app {
	width: 100%;
	height: 100vh;
	background-color: #ffffff00;
}

.textArea {
	margin-top: 10px;
	width: 100%;
	height: 90%;
	/* background-color: rgba(3, 3, 3, 0.385); */
	background-color: rgba(3, 3, 3, 0);
	border-radius: 20px;
}

.app .text {
	position: absolute;
	top: 80%;
	width: 100%;
	z-index: 999;
	font-size: 25px;
	font-weight: 700;
	color: #fb3037;
	white-space: nowrap;
	display: none;
}
</style>
