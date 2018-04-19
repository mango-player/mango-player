import Mango from 'mango/src';
import { isObject, isArray, deepAssign } from 'mango-helper';
import mangoControl from 'mango-plugin-controlbar/src';
import mangoAdPlugin from 'mango-plugin-ad/src';
import mangoCMS from 'mango-plugin-cms/src';
import mangoDanmu from 'mango-plugin-danmu/src';
import mangoControl from 'mango-plugin-controlbar/src';

import popupFactory from 'mango-plugin-popup/src';
import mangoContextmenu from 'mango-plugin-contextmenu/src';
import mangoLog from 'mango-plugin-log/src';
import mangoCenterState from 'mango-plugin-center-state/src';
import mangoKernelHls from 'mango-kernel-hls/src';
import mangoKernelFlv from 'mango-kernel-flv';
import './index.css';

// import 'babel-polyfill';
Mango.install(mangoAdPlugin);
Mango.install(mangoDanmu);
Mango.install(mangoControl);
Mango.install(mangoCenterState);
Mango.install(mangoContextmenu);
Mango.install(mangoLog);

class MangoPlayer extends Mango {
    constructor(config) {
        if (!isObject(config)) throw new TypeError('You must pass an Object as config when you new MangoPlayer');
        if (!config.video_id) throw new TypeError('You must pass an video_id property in config when you new MangoPlayer');

        // 添加UI插件
        config.plugin = config.plugin || config.plugins;
        if (!isArray(config.plugin)) config.plugin = [];
        const innerPlugins = [
            mangoAdPlugin.name,
            {
                name: mangoDanmu.name,
                mode: 'css',
                updateByVideo: true
            },
            mangoControl.name,
            mangoCenterState.name,
            mangoContextmenu.name,
            mangoLog.name,
        ];
        const configPluginNames = config.plugin.map(item => (isObject(item) ? item.name : item));
        innerPlugins.forEach(name => {
            if (configPluginNames.indexOf(name) > -1) return;
            config.plugin.push(name);
        });

        // 添加解码器
        config.kernels = deepAssign(config.kernels || {}, {
            hls: {
                handler: mangoKernelHls,
            },
            flv: {
                handler: mangoKernelFlv,
            },
        });
        
        super(config);

        this._config = config

        this.init();
    }

    init(){
        this.cms = new mangoCMS({vm: this});
        this.cms.getCMSData(this._config.video_id);
    }
}
// 暴露浮层工厂方法
MangoPlayer.popupFactory = popupFactory;

export default MangoPlayer;
