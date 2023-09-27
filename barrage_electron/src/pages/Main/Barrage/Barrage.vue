<template>
	<div class="barrage">
		<div class="chatArea">
			<div class="message">
				<div
					v-for="(item, index) in messageList"
					:key="index"
					:class="{
						leftMessage: messageUserId(item) !== userId,
						rightMessage: messageUserId(item) === userId,
					}"
				>
					<div class="messageAuthor">{{ messageUserName(item) }}</div>
					<div class="messageWord">{{ messageContent(item) }}</div>
				</div>
			</div>
			<div class="input">
				<input
					type="text"
					v-model="newMessage"
					@keyup.enter="sendMessage"
				/>
				<div
					class="emoji"
					@click="showEmojiList"
				>
					<img
						src="../image/emoji.png"
						alt=""
					/>
				</div>
				<div
					class="send"
					@click="onSendMessage"
				>
					<img
						src="../image/Send.png"
						alt=""
					/>
				</div>
			</div>
			<VEmojiPicker
				v-show="isShowEmojiList"
				@select="selectEmoji"
				:showSearch="false"
				:dark="true"
				:emojiSize="30"
				class="__emoji"
			/>
		</div>
	</div>
</template>

<script>
import { nanoid } from 'nanoid'
import { Message } from '../../../../lib/models'
import { VEmojiPicker } from 'v-emoji-picker'
import { mapGetters } from 'vuex'
export default {
	name: 'Barrage',
	components: {
		VEmojiPicker,
	},
	data() {
		return {
			myName: 'admin',
			myId: nanoid(),
			newMessage: '',
			socket: null,
			isShowEmojiList: false,
		}
	},
	computed: {
		userName() {
			return this.user ? this.user.name : ''
		},
		userId() {
			return this.user ? this.user.id : ''
		},
		messageList() {
			return this.$store.state.barrage.messageList
		},
    ...mapGetters('user', {
			user: 'user',
		}),
	},
	methods: {
		showEmojiList() {
			this.isShowEmojiList = !this.isShowEmojiList
		},
		selectEmoji(emoji) {
			const { data } = emoji
			this.newMessage = data
			this.isShowEmojiList = false
		},
		messageContent(message) {
			const { content } = message
			return content
		},
		messageUserName(message) {
			const { userName } = message
			return userName
		},
		messageUserId(message) {
			const { userId } = message
			return userId
		},
		onSendMessage() {
      if(this.newMessage.length === 0 || this.newMessage.trim().length === 0) return
			const msgInstance = Message.init({
				userId: this.userId,
        userName: this.userName,
				content: this.newMessage,
				type: 'chat',
			})
			this.$emit('onSendMessage', msgInstance)
			this.newMessage = ''
		},
		initScroll() {
			let div = document.querySelector('.message')
			div.scrollTop = div.scrollHeight
		},
	},
	mounted() {
		this.initScroll()
	},
	watch: {
		messageList() {
			this.$nextTick(() => {
				let div = document.querySelector('.message')
				div.scrollTop = div.scrollHeight
			})
		},
	},
}
</script>

<style scoped>
* {
	user-select: text;
}

.barrage {
	float: left;
	width: 55%;
	height: 90%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.barrage .chatArea {
	position: relative;
	width: 98%;
	height: 98%;
	background-color: #222325;
	border-radius: 10px;
}

.barrage .chatArea .message {
	width: 98%;
	margin-left: 1%;
	height: 88%;
	overflow: scroll;
	margin-top: 10px;
}

.barrage .chatArea .message .leftMessage {
	width: 50%;
	margin: 5px 0 10px 10px;
	word-break: break-all;
	white-space: pre-line;
	margin-top: 10px;
}

.barrage .chatArea .message .leftMessage .messageAuthor {
	font-size: 90%;
	color: #e1e1e3;
	font-weight: 500;
	letter-spacing: 1px;
}

.barrage .chatArea .message .leftMessage .messageWord {
	margin-top: 5px;
	background-color: #494b4f;
	border-radius: 20px;
	padding: 10px 15px 10px 15px;
	color: #e1e1e3;
	font-size: 100%;
	/* border: 1px solid rgba(152, 152, 152, 0.092); */
	display: inline-block;
}

.barrage .chatArea .message .rightMessage {
	width: 50%;
	text-align: right;
	margin: 0 10px 5px auto;
	word-break: break-all;
	white-space: pre-line;
}

.barrage .chatArea .message .rightMessage .messageAuthor {
	text-align: right;
	margin-right: 5px;
	font-size: 90%;
	color: #e1e1e3;
	font-weight: 500;
	letter-spacing: 1px;
}

.barrage .chatArea .message .rightMessage .messageWord {
	margin-top: 10px;
	background-color: #ea7724;
	border-radius: 20px;
	padding: 10px 15px 10px 15px;
	color: #e1e1e3;
	font-size: 100%;
	text-align: left;
	/* border: 1px solid rgba(152, 152, 152, 0.092); */
	display: inline-block;
}

.barrage .chatArea .input {
	width: 98%;
	height: 9%;
	display: flex;
	align-items: center;
	margin-left: 1%;
}

.barrage .chatArea .input input {
	width: 80%;
	height: 80%;
	margin-left: 2%;
	border: none;
	border-bottom: 1px solid #ea7724;
	background-color: #ffffff00;
	color: #e1e1e3;
	font-size: 17px;
	letter-spacing: 1px;
	padding-left: 20px;
}

.barrage .chatArea .input input:focus {
	border-bottom: 2px solid #ea7724;
}

.barrage .chatArea .emoji {
	margin-left: 1%;
	width: 8%;
	height: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	background-color: #323337;
	border-radius: 10px;
}

.barrage .chatArea .emoji img {
	width: 30px;
	height: 30px;
}

.barrage .chatArea .send {
	width: 8%;
	height: 80%;
	margin-left: 1%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	background-color: #323337;
	border-radius: 10px;
}

.barrage .chatArea .send img {
	width: 30px;
	height: 30px;
}

.__emoji {
	position: absolute;
	width: 20%;
	height: 40%;
	bottom: 10%;
	right: 10%;
}
</style>
