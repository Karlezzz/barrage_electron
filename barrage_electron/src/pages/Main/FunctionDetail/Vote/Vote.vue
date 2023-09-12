<template>
	<transition
		enter-active-class="animate__animated animate__flipInY "
		leave-active-class="animate__animated animate__flipOutY "
	>
		<div
			class="vote"
			v-if="isShowVote"
		>
			<div class="vote_head">
				<div
					class="twoVoteSelect"
					@click="selectVote(1)"
					:style="{
						'background-color': isShowCreateVote ? '#526af0' : '#232227',
					}"
				>
					Create
				</div>
				<div
					class="twoVoteSelect"
					@click="selectVote(2)"
					:style="{
						'background-color': isShowHistoryVote ? '#526af0' : '#232227',
					}"
				>
					History
				</div>
			</div>
			<div class="vote_body">
				<CreateVote
					:isShowCreateVote="isShowCreateVote"
					@onSubmitVote="onSubmitVote"
				></CreateVote>
				<HistoryVote :isShowHistoryVote="isShowHistoryVote"></HistoryVote>
			</div>
		</div>
	</transition>
</template>

<script>
import CreateVote from './CreateVote/CreateVote.vue'
import HistoryVote from './HistoryVote/HistoryVote.vue'
export default {
	name: 'Vote',
	props: ['isShowVote'],
	components: {
		CreateVote,
		HistoryVote,
	},
	data() {
		return {
			isShowCreateVote: true,
			isShowHistoryVote: false,
		}
	},
	methods: {
		selectVote(index) {
			this.isShowCreateVote = false
			this.isShowHistoryVote = false
			if (index == 1) this.isShowCreateVote = true
			if (index == 2) this.isShowHistoryVote = true
		},
		onSubmitVote({ vote }) {
			this.$emit('onSubmitVote', { vote })
		},
	},
}
</script>

<style scoped>
.vote {
	width: 96%;
	height: 96%;
	margin-top: 2%;
	margin-left: 2%;
	overflow: hidden;
}

.vote .vote_head {
	width: 100%;
	height: 15%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-bottom: 1px solid #e1e1e3;
}

.vote .vote_head .twoVoteSelect {
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
}

.vote .vote_head .twoVoteSelect:nth-child(2) {
	background-color: #232227;
}

.vote .vote_body {
	width: 98%;
	height: 90%;
	margin-left: 1%;
	margin-top: 3%;
}
</style>
