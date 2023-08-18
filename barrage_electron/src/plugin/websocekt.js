class websocket {
    ws //websocket实例
    url //websocket地址
    isConnect //是否连接
    heartBeatTimer //心跳计时器
    heartBeatInterval //心跳频率
    isReConnect //是否重新连接
    reConnectInterval //重连频率
    reConnectCount //重连次数
    reConnectTimer //重连计时器
    reConnectCounted //已经重连次数

    constructor(url) {
        this.ws = null
        this.url = url
        this.isConnect = false
        this.heartBeatTimer = null
        this.heartBeatInterval = 5000
        this.isReConnect = false
        this.reConnectCount = 3
        this.reConnectCounted = 0
        this.reConnectInterval = 3000
        this.reConnectTimer = null
    }

    init = () => {

        //检测是否支持websocket
        if (!('WebSocket' in window)) {
            console.log('浏览器不支持websocket');
            return null
        }

        //检测是否已经有ws连接
        if (this.ws) return this.ws

        this.ws = new websocket(this.url)
        this.ws.onopen(() => {
            this.ws.send("client connect success")
        })

        this.heartBeat()
    }

    getMessage() {
        let result = this.ws.onmessage = (e) => {
            let data = JSON.parse(e.data)
            if (data.kind != 0) {
                console.log(`get sever data:${data}`);
                return data
            }
            if (data.kind == undefined) {
                console.log(`server data is null`);
                return null
            }
            return null
        }
        return result
    }

    sendMessage(value) {
        let data = JSON.stringify(value)
        this.ws.send(data)
    }

    heartBeat() {
        if (this.heartBeatTimer)
            clearInterval(this.heartBeatTimer)

        this.heartBeatTimer = setInterval(() => {
            const data = {
                type: 0, //0 心跳包
                content: 'client ping'
            }
            this.sendMessage(data)

        }, this.heartBeatInterval);
    }

    close() {
        this.isConnect = false
        this.isReConnect = false
        clearInterval(this.heartBeatTimer)
        clearInterval(this.reConnectTimer)
        this.ws.close()
    }

    reConnect(){
        console.log('Reconnect...');
        if(this.ws&&this.isConnect) this.close()
        this.init()
    }

    messageHandler(){
        //false为心跳包 true为数据包
        let data = this.getMessage()
        if(data.type === 0) return false
        else return true
    }
}
export default websocket