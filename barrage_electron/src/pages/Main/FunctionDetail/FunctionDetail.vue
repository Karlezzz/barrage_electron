<template>
	<div class="functionDetail">
		<Member :isShowMember="functionStatusList.isShowMember"></Member>
		<Vote :isShowVote="functionStatusList.isShowVote"></Vote>
		<ShareRoom
			:isShowShareRoom="functionStatusList.isShowShareRoom"
			:clientUrl="clientUrl"
		></ShareRoom>
		<Screen :isShowScreen="functionStatusList.isShowScreen"></Screen>
		<ClassRoom
			:isShowClassRoom="functionStatusList.isShowClassRoom"
      @onSubmitClassRoom="onSubmitClassRoom"
		></ClassRoom>
	</div>
</template>

<script>
import Screen from './Screen/Screen.vue'
import ShareRoom from './ShareRoom/ShareRoom.vue'
import Vote from './Vote/Vote.vue'
import Member from './Member/Member.vue'
import ClassRoom from './ClassRoom/ClassRoom.vue'
export default {
	name: 'FunctionDetail',
	components: {
		Member,
		Vote,
		ShareRoom,
		Screen,
		ClassRoom,
	},
	props: {
		clientUrl: { type: String, default: '' },
	},
	data() {
		return {
			functionStatusList: {
				isShowMember: true,
				isShowVote: false,
				isShowScreen: false,
				isShowShareRoom: false,
				isShowClassRoom: false,
			},
		}
	},
	mounted() {
		//接收Function组件传来的功能状态值列表
		this.$bus.$on('getFunctionStatusList', value => {
			this.functionStatusList = value
		})
	},
  methods: {
    onSubmitClassRoom({classRoom}) {
      this.$emit('onSubmitClassRoom', {classRoom})
    }
  }
}
</script>

<style scoped>
.functionDetail {
	float: left;
	width: 23%;
	height: 100%;
	margin-top: 0.5%;
	border-radius: 10px;
	overflow: hidden;
	/* background-color: #fff; */
}
</style>
