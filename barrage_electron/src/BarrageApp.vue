<template>
	<div
		id="app"
		class="app"
	>
		<div
			class="textArea"
			ref="textArea"
		></div>
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
		handlerBarrage(barrage) {
			const barrageArea = document.querySelector('.textArea')
			const newBarrage = document.createElement('div')
			newBarrage.innerHTML = barrage.content
			const textWidth = newBarrage.clientWidth
			const documentWidth = window.screen.width
			let random = Math.floor(Math.random() * 5 + 1)
			let donghua = `@keyframes move{
            from{
              transform: translateX(${Number(documentWidth)}px)
            }
            to{
              transform: translateX(${-(
								Number(documentWidth) + Number(textWidth)
							)}px)
            }
          }`
			let sheet = document.styleSheets[0]
			newBarrage.style.display = 'inline-block'
			newBarrage.style.top = random * 10 + '%'
			sheet.insertRule(donghua, 0)
			newBarrage.style.animation = 'move 20s ease-out'
			newBarrage.style.animationFillMode = 'forwards'
			newBarrage.className = 'text'
			barrageArea.appendChild(newBarrage)

			setTimeout(() => {
				barrageArea.removeChild(newBarrage)
			}, 20000)

			// this.$nextTick(() => {
			// 	let childNode =
			// 		this.$refs.textArea.childNodes[
			// 			this.$refs.textArea.childNodes.length - 1
			// 		]
			// 	let documentWidth = window.screen.width
			// 	let textWidth = childNode.clientWidth
			// 	let random = Math.floor(Math.random() * 5 + 1)
			// 	let donghua = `@keyframes move{
			//       from{
			//         transform: translateX(${documentWidth}px)
			//       }
			//       to{
			//         transform: translateX(${-(documentWidth + textWidth)}px)
			//       }
			//     }`
			// 	let sheet = document.styleSheets[0]
			// 	childNode.style.display = 'inline-block'
			// 	childNode.style.top = random * 10 + '%'
			// 	sheet.insertRule(donghua, 0)
			// 	childNode.style.animation = 'move 20s ease-out'
			// 	childNode.style.animationFillMode = 'forwards'
			// 	setTimeout(() => {
			// 		this.barrageList.shift()
			// 	}, 30000)
			// })
		},
	},
	created() {
		ipcRenderer.on('getVuexMsg', (e, data) => {
			this.barrageList.push(data)
			this.handlerBarrage(data)
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

	z-index: 999;
	font-size: 27px;
	font-weight: 700;
	color: red;
	white-space: nowrap;
	display: none;
	-webkit-text-stroke: 1px #000000;
}
</style>
