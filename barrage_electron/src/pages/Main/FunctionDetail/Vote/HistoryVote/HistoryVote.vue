<template>
	<transition
		enter-active-class="animate__animated animate__flipInY "
		leave-active-class="animate__animated animate__flipOutY "
	>
		<div
			class="historyVoteCard"
			style="width: 100%; height: 100%"
			v-show="isShowHistoryVote"
		>
			<div
				class="itemArea"
				v-show="!isShowDetail"
			>
				<div
					class="historyVoteItem"
					v-for="(item, index) in historyVoteList"
					:key="index"
					@click="showHistoryVoteDetail(item)"
				>
					<a
						href="#"
						:title="item.content"
						>{{ item.content }}</a
					>
				</div>
			</div>
			<div
				class="HistoryVoteDetailBG"
				v-show="isShowDetail"
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
export default {
	name: 'HistoryVote',
	props: ['isShowHistoryVote'],
	data() {
		return {
			historyVoteList: [
				{
					id: 1,
					content: '今晚吃什么',
				},
				{
					id: 2,
					content: '几点下课',
				},
				{
					id: 3,
					content: '有没有作业',
				},
			],
			isShowDetail: false,
			detailInfo: '',
		}
	},
	methods: {
		showHistoryVoteDetail(item) {
			this.isShowDetail = true
			this.charts()
			//将id发请求，得到回应数据绑定给detailInfo,detailInfo传入子组件进行展示
		},
		getBackDetail(value) {
			this.isShowDetail = false
		},
		//配置echarts
		charts() {
			let np = new Promise((resolve, reject) => {
				resolve()
			})
			np.then(() => {
				this.myEcharts = this.echarts.init(document.getElementById('cartsArea'))
				let option = {
					title: {
						show: true,
						x: '10%',
						y: '10%',
						text: 'TestTestTestTestTest',
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
							// fontSize:14
						},
					},
					series: [
						{
							name: 'Test',
							type: 'pie',
							center: ['50%', '50%'],
							radius: ['40', '80'],
							avoidLabelOverlap: false,
							label: {
								show: false,
								position: 'center',
							},
							data: [
								{
									value: 1048,
									name: '吃饭',
								},
								{
									value: 735,
									name: '睡觉',
								},
								{
									value: 580,
									name: '上课',
								},
								{
									value: 484,
									name: '健身',
								},
								{
									value: 300,
									name: '约会',
								},
								{
									value: 100,
									name: '洗澡',
								},
								{
									value: 300,
									name: '做作业',
								},
							],
						},
					],
				}
				this.myEcharts.setOption(option)
			})
		},
		getBack() {
			this.myEcharts.dispose()

			this.isShowDetail = false
		},
	},
	computed: {
		isShow() {
			if (this.isShowHistoryVote == true) {
				if (this.isShowDetail == true) return false
				else if (this.isShowDetail == false) return true
			} else if (this.isShowHistoryVote == false) return false
			return false
		},
	},
	mounted() {},
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
