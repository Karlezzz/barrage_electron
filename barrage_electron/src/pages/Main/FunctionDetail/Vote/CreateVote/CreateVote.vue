<template>
    <transition enter-active-class="animate__animated animate__flipInY "
        leave-active-class="animate__animated animate__flipOutY ">
        <div class="createVoteCard" v-show="isShowCreateVote">
            <div class="topic">
                <input type="text" placeholder="输入投票问题" v-model="voteTitle">
            </div>
            <div class="select">
                <div class="selectItem" v-for="(item,index) in selectList" :key="index" ref="selectItem">
                    <span v-if="!item.isEdit" ref="one" @click="changeSelect(item,index)">{{item.content}}</span>
                    <input v-if="item.isEdit" type="text" @blur="confirmSelect(item,$event)" :value="item.content"
                        ref="selectInput">
                </div>
                <button @click="addNewSelect">+</button>
            </div>
            <div class="time">
                <div class="input">
                    <input type="text" placeholder="选择投票时限" v-model="voteTime" disabled>
                    <img src="@/pages/Enter/image/下拉.png" alt="" @click="showTimeList">
                </div>
                <div class="timeList" v-if="isShowTimeList">
                    <div class="timeListItem" v-for="(item,index) in voteTimeList" :key="index"
                        @click="selectTime(item)">
                        {{ item.content }}</div>
                </div>
            </div>
            <div class="sendVote" @click="postVote">
                <button>发起投票</button>
            </div>
        </div>
    </transition>

</template>

<script>
    export default {
        name: 'CreateVote',
        props: ['isShowCreateVote'],
        data() {
            return {
                voteTitle: '',
                isShowTimeList: false,
                selectList: [{
                    id: '001',
                    content: '选项一',
                    isEdit: false
                }, ],
                newSelect: '',
                isEdit: false,
                voteTimeList: [{
                    id: 1,
                    content: '一分钟'
                }, {
                    id: 2,
                    content: '五分钟'
                }, {
                    id: 3,
                    content: '十分钟'
                }, {
                    id: 4,
                    content: '半小时'
                }, {
                    id: 5,
                    content: '一小时'
                }],
                voteTime: ''
            }
        },
        methods: {
            showTimeList() {
                this.isShowTimeList = !this.isShowTimeList
            },
            addNewSelect(value) {
                this.selectList.push({
                    id: '',
                    content: '',
                    isEdit: true
                })
                setTimeout(() => {
                    let selectInput = this.$refs.selectItem[this.$refs.selectItem.length - 1].children[0]
                    selectInput.focus()
                }, 10);
            },
            confirmSelect(item, e) {
                item.isEdit = false
                item.content = e.target.value
            },
            changeSelect(item, index) {
                item.isEdit = true

                setTimeout(() => {
                    this.$refs.selectItem[index].children[0].focus()
                }, 10);
            },
            selectTime(item) {
                this.voteTime = item.content
                this.isShowTimeList = false
            },
            postVote() {
                const voteInfo = {
                    voteTitle: this.voteTitle,
                    selectList: this.selectList,
                    voteTime: this.voteTime,
                }
                //发送请求，将对象发出
            }
        },
    }
</script>

<style scoped>
    .createVoteCard {
        width: 100%;
        height: 100%;
    }

    .createVoteCard .topic {
        width: 100%;
        height: 10%;
    }

    .createVoteCard .topic input {
        height: 80%;
        width: 80%;
        border: none;
        border-bottom: 1px solid #ea7724;
        background-color: #ffffff00;
        margin-top: 1%;
        margin-left: 10px;
        padding-left: 10px;
        font-size: 16px;
        color: #e1e1e3;
    }

    .createVoteCard .select {
        width: 100%;
        /* height: 40%; */
        max-height: 30%;
        margin-top: 10px;
        overflow: scroll;
    }

    .createVoteCard .selectItem {
        width: 90%;
        height: 30px;
    }

    .createVoteCard .selectItem input {
        height: 25px;
        width: 80%;
        border: none;
        border-bottom: 1px solid #ea7724;
        background-color: #ffffff00;
        margin-top: 1%;
        margin-left: 10px;
        padding-left: 10px;
        font-size: 16px;
        color: #e1e1e3;
    }

    .createVoteCard .select span {
        display: inline-block;
        height: 25px;
        width: 80%;
        border-bottom: 1px solid #ea7724;
        background-color: #ffffff00;
        margin-top: 1%;
        margin-left: 10px;
        padding-left: 10px;
        padding-top: 1px;
        font-size: 16px;
        color: #e1e1e3;
    }

    .createVoteCard .select button {
        height: 25px;
        width: 50px;
        background-color: #ffffff00;
        border: 1px solid #ea7724;
        border-radius: 10px;
        color: #e1e1e3;
        margin: 10px 0 10px 10px;
        font-size: 16px;
        cursor: pointer;
    }

    .createVoteCard .time {
        width: 100%;
        height: 30%;
        margin-top: 10px;
        /* margin-left: -10px; */
    }

    .createVoteCard .time .input {
        margin-left: 10px;
        width: 80%;
        height: 30px;
        background-color: #ccc;
        border: none;
        border-bottom: 1px solid #ea7724;
        background-color: #ffffff00;
        margin-top: 1%;
        padding-left: 10px;
        font-size: 16px;
        color: #e1e1e3;

    }

    .createVoteCard .time .input input {
        float: left;
        height: 20px;
        margin-top: 5px;
        width: 85%;
        border: none;
        background-color: #ffffff00;
        color: #e1e1e3;
    }

    .createVoteCard .time .input img {
        float: left;
        height: 20px;
        width: 20px;
        margin-top: 5px;
        cursor: pointer;
    }

    .createVoteCard .time .timeList {
        width: 80%;
        height: 81px;
        margin-left: 10px;
        overflow: scroll;
        /* border: 1px solid #ea7724; */
        border-top: none;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    .createVoteCard .time .timeList .timeListItem {
        width: 100%;
        height: 20px;
        /* border-bottom: #ea7724 1px solid; */
        color: #e1e1e3;
        text-align: center;
        font-size: 15px;
        cursor: pointer;
    }

    .createVoteCard .time .timeList .timeListItem:hover {
        background-color: #ea7724;
    }

    .createVoteCard .time .timeList .timeListItem:nth-child(4) {
        border-bottom: none;
    }

    .createVoteCard .sendVote {
        width: 90%;
        margin-left: 5%;
        text-align: center;
    }

    .createVoteCard .sendVote button {
        width: 180px;
        height: 40px;
        border: none;
        color: #e1e1e3;
        font-size: 17px;
        text-align: center;
        background-color: #526af0;
        border-radius: 15px;
        cursor: pointer;
    }
</style>