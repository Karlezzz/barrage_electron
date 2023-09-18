<template>
	<transition
		enter-active-class="animate__animated animate__flipInY "
		leave-active-class="animate__animated animate__flipOutY "
	>
		<div
			class="historyVoteCard"
			style="width: 100%; height: 100%"
		>
			<div
				class="itemArea"
				v-if="!isShowDetail"
			>
				<div
					class="historyVoteItem"
					v-for="(item, index) in historyVoteList"
					:key="index"
					@click="showHistoryVoteDetail(item)"
				>
					<a href="#">{{ item.question }}</a>
				</div>
			</div>
			<div
				class="HistoryVoteDetailBG"
				v-if="isShowDetail"
			>
				<div
					class="showArea"
					id="cartsArea"
					style="width: 98%; height: 72%"
				></div>
				<div class="getBack">
					<button @click="getBack">Go back</button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'HistoryVote',
	data() {
		return {
			isShowDetail: false,
			selectedVote: null,
		}
	},
	computed: {
		...mapGetters('vote', {
			historyVoteList: 'votes',
		}),
	},
	methods: {
		showHistoryVoteDetail(vote) {
			this.isShowDetail = true
			this.selectedVote = vote
			this.charts(this.convert(this.selectedVote))
		},
		getBackDetail() {
			this.isShowDetail = false
		},
		charts(option) {
			const ch = new Promise((resolve, reject) => {
				resolve()
			})
			ch.then(() => {
				this.myEcharts = this.echarts.init(document.getElementById('cartsArea'))
				this.myEcharts.setOption(option)
			})
		},
		getBack() {
			this.myEcharts.dispose()
			this.isShowDetail = false
		},
		convert(vote) {
			let { question, voteOptions } = vote
			voteOptions = voteOptions.map(vo => {
				return {
					...vo,
					name: vo.optionValue,
					value: vo.selectMembersId.length,
				}
			})
			const option = {
				title: {
					show: true,
					x: '10%',
					y: '10%',
					text: question,
					textStyle: {
						fontSize: '15px',
						color: '#e1e1e3',
					},
				},
				tooltip: {
					trigger: 'item',
				},
				legend: {
					orient: 'horizontal',
					x: 'right',
					y: 'bottom',
					selectedMode: false,
					type: 'scroll',
					textStyle: {
						color: '#e1e1e3',
					},
				},
				series: [
					{
						type: 'pie',
						radius: ['50%'],
						data: voteOptions,
					},
				],
			}
			return option
		},
	},
	watch: {
		historyVoteList: {
			deep: true,
			handler(newV, oldV) {
				if (newV.length !== oldV.length) return
				if (!this.isShowDetail) return
				if (!this.selectedVote) return

				const { id } = this.selectedVote
				this.selectedVote = this.historyVoteList.find(v => {
					return v.id === id
				})
				if (this.myEcharts) this.myEcharts.dispose()
				if (this.selectedVote) {
					this.charts(this.convert(this.selectedVote))
				}
			},
		},
	},
}
</script>

<style scoped>
.historyVoteCard {
	width: 100%;
	height: 100%;
	overflow: scroll;
}

.historyVoteCard .historyVoteItem {
	margin-top: 15px;
	width: 90%;
	margin-left: 5%;
	height: 50px;
	border-radius: 20px;
	cursor: pointer;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	background-color: #494b4f;
}

.historyVoteCard .historyVoteItem:hover {
	background-color: #606367;
}

.historyVoteCard .historyVoteItem a {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	color: #e1e1e3;
	/* color: #ea7724; */
	text-decoration: none;
	font-size: 18px;
}

.HistoryVoteDetailBG {
	width: 100%;
	height: 90%;
}

.showArea {
	margin-left: 1%;
	width: 98%;
	height: 72%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.getBack {
	margin-left: 1%;
	width: 98%;
	height: 20%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.getBack button {
	width: 70%;
	height: 50px;
	border: none;
	border-radius: 15px;
	background-color: #526af0;
	font-size: 18px;
	color: #e1e1e3;
	letter-spacing: 1px;
	cursor: pointer;
}
</style>
