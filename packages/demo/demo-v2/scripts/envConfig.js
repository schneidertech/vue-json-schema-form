/**
 * Created by Liu.Jun on 2018/5/31.
 */

// envConfig  1 2 npm_config 1
//  initConfig

const argv = require('yargs').argv;

const manifestAlias = {
    lgb: 'log',
    dgb: 'dir',
    rgb: 'report',
};

exports.getConfig = () => {
    try {
        return JSON.parse(process.env.npm_config_argv).original.slice(2).reduce((preVal, item) => {
            const param = item.replace(/^--/, '');
            const [key, value] = param.split('=');
            preVal[key] = value || !0;

            //
            if (manifestAlias[key]) {
                preVal[manifestAlias[key]] = preVal[key];
            }
            return preVal;
        }, argv);
    } catch (e) {
        //
        console.warn('JSON parse "process.env.npm_config_argv" fail !');
    }
    return {};
};
