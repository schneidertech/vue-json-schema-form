/**
 * Created by Liu.Jun on 2020/11/26 10:01 .
 */

import { h, ref, getCurrentInstance } from 'vue';
import { resolveComponent } from '@snema/vjsf-utils/vue3Utils';
import { openNewPage } from '@snema/vjsf-utils/utils';

// mock
// https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca

export default {
    name: 'UploadWidget',
    props: {
        modelValue: {
            default: null,
            type: [String, Array]
        },
        responseFileUrl: {
            default: () => res => (res ? (res.url || (res.data && res.data.url)) : ''),
            type: [Function]
        },
        btnText: {
            type: String,
            default: ''
        },
        //  VNode
        slots: {
            type: null,
            default: null
        }
    },
    setup(props, { attrs, emit }) {
        //  fileList
        const curModelValue = props.modelValue;
        const isArrayValue = Array.isArray(curModelValue);

        const defaultFileList = attrs.fileList || (() => {
            if (isArrayValue) {
                return curModelValue.map((item, index) => ({
                    name: `${index + 1}`,
                    url: item
                }));
            }
            if (curModelValue) {
                return [{
                    name: '',
                    url: curModelValue
                }];
            }

            return [];
        })();

        // fileList
        const fileListRef = ref(defaultFileList);

        const getUrl = fileItem => (
            fileItem
            && ((fileItem.response && props.responseFileUrl(fileItem.response)) || fileItem.url))
            || '';

        const emitValue = (emitFileList) => {
            // v-model
            let curValue;

            if (isArrayValue) {
                curValue = emitFileList.length ? emitFileList.reduce((pre, item) => {
                    const url = getUrl(item);
                    if (url) pre.push(url);
                    return pre;
                }, []) : [];
            } else {
                const fileItem = emitFileList[emitFileList.length - 1];
                curValue = getUrl(fileItem);
            }

            emit('update:modelValue', curValue);
        };

        const globalProperties = getCurrentInstance().appContext.config.globalProperties;

        return () => {
            const data = {
                fileList: fileListRef.value,
                'on-exceed': () => {
                    if (globalProperties.$message) {
                        globalProperties.$message.warning('');
                    }
                },
                'on-error': () => {
                    if (globalProperties.$message) {
                        globalProperties.$message.error('');
                    }
                },
                'on-preview': (file) => {
                    const url = getUrl(file);
                    if (url) openNewPage(url);
                },
                ...attrs,
                'on-remove': (file, fileList) => {
                    emitValue(fileList);
                    if (attrs['on-remove']) {
                        attrs['on-remove'](file, fileList);
                    }
                },
                'on-success': (response, file, fileList) => {
                    emitValue(fileList);
                    //  onSuccess
                    if (attrs['on-success']) {
                        attrs['on-success'](response, file, fileList);
                    }
                }
            };

            if (!isArrayValue) data.limit = 1;

            const childVNode = {
                default: () => h(
                    resolveComponent('el-button'),
                    {
                        type: 'primary'
                    },
                    {
                        default: () => props.btnText
                    }
                ),
                ...(props.slots || {}),
            };

            return h(resolveComponent('el-upload'), data, childVNode);
        };
    }
};
