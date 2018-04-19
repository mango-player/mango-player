import Mango from 'mango/src';
import { isObject, isArray, deepAssign } from 'mango-helper/src';
import mangoControl from 'mango-plugin-controlbar/src';
import popupFactory from 'mango-plugin-popup/src';
import mangoContextmenu from 'mango-plugin-contextmenu/src';
import mangoLog from 'mango-plugin-log/src';
import mangoCenterState from 'mango-plugin-center-state/src';
import mangoKernelHls from 'mango-kernel-hls';
import mangoKernelFlv from 'mango-kernel-flv';
import './index.css';

// import 'babel-polyfill';

Mango.install(mangoControl);
Mango.install(mangoCenterState);
Mango.install(mangoContextmenu);
Mango.install(mangoLog);

class MangoPlayer extends Mango {
  constructor(config) {
    if (!isObject(config)) throw new TypeError('You must pass an Object as config when you new MangoPlayer');

    // 添加UI插件
    config.plugin = config.plugin || config.plugins;
    if (!isArray(config.plugin)) config.plugin = [];
    const innerPlugins = [
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
  }
}
// 暴露浮层工厂方法
MangoPlayer.popupFactory = popupFactory;

export default MangoPlayer;
