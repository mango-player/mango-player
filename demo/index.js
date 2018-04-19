Mango.install(mangoPluginControlbar);
Mango.install(mangoPluginAd);
Mango.install(mangoPluginDanmu);

const player = new Mango({
  // 业务标识
  business_id:'livecloud',

  // 视频id
  // video_id: "4208002", 
  video_id: "4247448",
  // video_id: "4282278",
  // 播放地址
  // src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  // 直播:live 点播：vod
  isLive: false,
  // 编解码容器
  box: 'native',
  // dom容器
  wrapper: '#wrapper',
  plugin: [
    mangoPluginControlbar.name,
    mangoPluginAd.name,
    {
      name: mangoPluginDanmu.name,
      mode: 'css',
      updateByVideo: true
    }, 
  ],
  kernels: {
    hls: window.mangoKernelHls,
  },
  // video
  autoplay: true,
  controls: true
});

console.log(player)
video_id = player.__dispatcher.videoConfig.video_id;
const cms = new mangoPluginCms({vm: player});
cms.getCMSData(video_id).then(function(json) {
  // player.emit('cmsDataComplete', json.data)
})
