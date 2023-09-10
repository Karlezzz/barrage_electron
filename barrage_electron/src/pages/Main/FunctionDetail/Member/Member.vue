<template>
	<transition
		enter-active-class="animate__animated animate__flipInY "
		leave-active-class="animate__animated animate__flipOutY "
	>
		<div
			class="member"
			v-if="isShowMember"
		>
			<div class="member_head">
				<p>Online Members</p>
				<p>
					<img
						src="../../image/在线人数green.png"
						alt=""
					/>
					{{ userNumber }}
				</p>
			</div>
			<div
				class="member_body"
			>
				<div
					class="memberItem"
					v-for="(m, idx) in users"
					:key="idx"
				>
					<div class="memberName">{{ m.name }}</div>
					<div class="memberId">{{ m.id }}</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'Member',
	props: ['isShowMember'],
  data() {
    return {
      flag:this.isShowMember
    }
  },
	computed: {
		users() {
			return this.$store.state.barrage.users
		},
		userNumber() {
			return this.users.length
		},
	},
}
</script>

<style scoped>
.member {
	width: 96%;
	height: 96%;
	margin-top: 2%;
	margin-left: 2%;
	overflow: hidden;
}

.member .member_head {
	width: 98%;
	height: 14%;
	margin: 0 0 0 1%;
	border-bottom: 1px solid #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.member .member_head p:nth-child(1) {
	font-size: 20px;
	letter-spacing: 2px;
	color: #e1e1e3;
	padding-top: 10px;
	padding-left: 5px;
}

.member .member_head p:nth-child(2) {
	font-size: 15px;
	letter-spacing: 2px;
	color: #e1e1e3;
	padding-left: 130px;
	margin-top: 10px;
}

.member .member_head p:nth-child(2) img {
	width: 20px;
	height: 20px;
}

.member .member_body {
	width: 98%;
	height: 90%;
	margin-left: 1%;
	margin-top: 2%;
	overflow: scroll;
}

.member .member_body .memberItem {
	width: 98%;
	height: 60px;
	max-height: 20%;
	margin-left: 1%;
	border-radius: 10px;
	margin-top: 3px;
	cursor: pointer;
}

.member .member_body .memberItem:hover {
	background-color: #46474a;
}

.member .member_body .memberItem .memberName {
	width: 50%;
	height: 45%;
	margin-left: 5%;
	color: #ea7724;
	letter-spacing: 1px;
	padding-top: 10px;
	font-size: 15px;
}

.member .member_body .memberItem .memberId {
	width: 90%;
	height: 45%;
	margin-left: 5%;
	color: #e1e1e3;
	letter-spacing: 1px;
	padding-top: 2px;
	font-size: 15px;
}
</style>
