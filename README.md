# barrage_electron 开发日志



> 遗留问题
>
> 5.投票功能
>
> 6.在线客户端展示
>
> 7.白天模式和黑夜模式
>
> 10.websocket心跳机制和重连机制
>
> 11.emoji内容

### 2023.2.28

1.完成脚手架和electron配置

2.路由配置，默认路径进入enter组件

3.主进程配置，设置窗口大小，主体不可移动，不可改变窗口大小，关闭electron窗口

4.HeadBar组件，用来移动窗口

5.ActionBar组件，窗口最小化，最大化，关闭功能

6.Enter静态页面



### 2023.3.1

1.完成窗口最小化，最大化，关闭的功能

2.完成roomid下拉列表选择和roomid输入框输入



### 2023.3.2

1.完成Main组件 Head部分，function部分的静态页面



### 2023.3.3

1.修复全屏Main组件页面大小适配

2.chat部分完成，弹幕发送，屏幕滚动总是在底端

3.在线人员展示部分

4.投票部分，大致完成，样式需要改变，明天继续完善



### 2023.3.4

1.拆分组件

2.完善Vote组件



### 2023.3.5

1.通过全局事件总线，Function组件控制FunctionDetail组件的展现

2.配置vue开发者工具session.defaultSession.loadExtension(path)

3.添加投票选项 修改投票选项（todoList案例）

​	用:value代替v-model   用e.target.value来改变数据（用一个变量，v-model绑定，会让多个input框内容一致）

​	在数组中添加isEdit来判断选项状态

4.createVote完成

5.historyVote完成，引入echart图标展示投票结果



### 2023.3.6

1.调整histroyVote组件结构，解决echart被压缩问题

2.完成qrCode界面

3.functionList加上过渡动画

4.开启弹幕，打开子窗口，关闭弹幕关闭子窗口（background.js中 窗口实例放在window对象中）



2023.3.8

1.重构background.js文件

2.进行多页面入口改造，配置两个"main.js" 和 "App.vue"，在vou.config.js中配置

3.构建弹幕区域组件，使用vue-baberrage插件完成弹幕效果，样式还未设定



### 2023.3.13

1.建立建简易websocket服务器

2.连接websocket，实现建议通信。获取服务器数据存入vuex中，消息遍历的数据从vuex中获取



### 2023.3.14

1.建立心跳机制，完善websocket通信

2.尝试解决多窗口vuex数据共享，vuex-electron 暂未实现（实在实现不了就让弹幕组件也连接websocket）



### 2023.3.15

1.添加关闭应用选项框，仿网易云

2.新版electron关闭窗口方法为destroy(),修复子窗口无法关闭问题

3.设置引用图标，设置tray及其图标和目录





### 2023.3.16

1.进行进程间通信传递数据，barrag接收到新消息，存入仓库并发送到主进程，主进程在发给弹幕进程

2.弹幕v0.0.1 实现小窗口 内容垂直滚动，从底部到顶部最后消失



### 2023.3.17

1.弹幕v0.1.0 实现横向弹幕，解决弹幕动画和x轴位置 

> 遗留 
>
> 解决y轴位置，将其随机出现在不同轨道

2.解决窗口永远处于z-index：999

3.实现弹幕随机高度滚动



### 2023.4.19

1.使用express搭建建议服务器

2.配置axios

3.调用Enter界面roomid下拉列表接口，获取服务器数据

4.完善Enter界面内容
