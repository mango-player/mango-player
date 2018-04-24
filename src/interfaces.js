/**
 * @desc MangoPlaer对外接口统一定义
 * @author genie88
 * 
 */ 

export default {
    /**
     * @desc 提供给页面的播放play事件回调
     * @param {Function} getPlayEvent
     */
    getPlayEvent(){
        if(H.MGTV_VIDEO_FUN && H.MGTV_VIDEO_FUN.getPlayEvent) {
            H.MGTV_VIDEO_FUN.getPlayEvent()
        } 
    }

    /**
     * @desc 提供给页面的Stop事件回调
     * @param {Function} getStopEvent
     */
    getStopEvent(){
        if(H.MGTV_VIDEO_FUN && H.MGTV_VIDEO_FUN.getStopEvent) {
            H.MGTV_VIDEO_FUN.getStopEvent()
        } 
    }
    
    /**
     * @desc 全局播放Seek事件回调
     * @param {Function} getSeekEvent
     */
    getSeekEvent(){
        if(H.MGTV_VIDEO_FUN && H.MGTV_VIDEO_FUN.getSeekEvent) {
            H.MGTV_VIDEO_FUN.getSeekEvent(time, duration)
        } 
    }

    /**
     * @desc 调用悬浮小视频窗接口
     * @param {Boolean} status 定义播放底层右侧浮动小窗口是否开启
     * @param {Function} setFloatingWindow
     */
    setFloatingWindow(status){
        window.FLASH_FLOATIONPLAYERWINDOW
        && window.FLASH_FLOATIONPLAYERWINDOW(status)
    }

    /**
     * @desc 通知悬浮小视频窗视频 播放/停止 状态的接口
     * @param {Boolean} status 1 播放 0 停止
     * @param {Function} setFloatingWindowStatus
     */
    setFloatingWindowStatus(status){
        window.clipStart && window.clipStart(status)
    }


    /**
     * @desc 初始化付费弹窗
     * @param {Function} initVipDialog
     */
    initVipDialog(option){
        if(H.vipDialog) {
            return new H.vipDialog(option)
        } else {
            return null
        }
    }

    /**
     * @desc 显示初始化蓝光弹窗
     * @param {String} title 弹窗标题 
     * @param {Function} showHDPayDialog
     */
    showHDPayDialog(title){
        window.FLASH_MGTV_VIDEOHD && window.FLASH_MGTV_VIDEOHD(title)
    }


    /**
     * @desc 播放器通知JS鉴权信息
     * @param {Object} user 用户信息鉴权
     * @param {Object} info 片源鉴权
     * @param {Function} OnGetPaymentInfo
     */
    getPaymentInfo(user, info){
        window.FLASH_showPayMovie && window.FLASH_showPayMovie(user, info)
    }

    // 主动查询下一集视频id信息
    getPlayerNextId(){
        if(window.FLASH_MGTV_FUN && window.FLASH_MGTV_FUN.getPlayerNextId) {
            return window.FLASH_MGTV_FUN.getPlayerNextId()
        }
    }

    // 获取下一集URL
    getNextPlayUrl(){
        if(window.FLASH_MGTV_FUN && FLASH_MGTV_FUN.getNextPlayUrl) {
            return FLASH_MGTV_FUN.getNextPlayUrl()
        }
    }

    // [点击下一集按钮，视频自然结束，后贴广告结束] 请求页面进行刷新
    requesetRefreshPage(){
        window.refreshPage && window.refreshPage()
    }

    // JS 通知播放器下一集视频id信息
    OnGetNextVideoInfo(nextid, isLast){
        this.cms.getNextVideoInfo(nextid, isLast)
    }
}