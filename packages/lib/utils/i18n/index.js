/**
 * Created by Liu.Jun on 2020/4/30 11:22.
 */

//  ajv-i18n
//
// https://github.com/epoberezkin/ajv-i18n/tree/master/localize

import localizeZh from './localize/zh';

export default {
    $$currentLocalizeFn: localizeZh,
    getCurrentLocalize() {
        return this.$$currentLocalizeFn;
    },
    useLocal(fn) {
        this.$$currentLocalizeFn = fn;
    }
};
