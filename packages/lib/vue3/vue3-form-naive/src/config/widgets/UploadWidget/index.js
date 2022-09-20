/**
 * Created by Liu.Jun on 2020/11/26 10:01 .
 */

import { h, ref, getCurrentInstance } from 'vue';
import { resolveComponent } from '@snema/vjsf-utils/vue3Utils';

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
                    id: String(index),
                    status: 'finished',
                    name: `${index + 1}`,
                    url: item
                }));
            }
            if (curModelValue) {
                return [{
                    id: '1',
                    status: 'finished',
                    name: '',
                    url: curModelValue
                }];
            }

            return [];
        })();

        // fileList
        const fileListRef = ref(defaultFileList);

        const getUrl = (eventTarget) => {
            let resJson = {};
            try {
                resJson = JSON.parse(eventTarget.response);
            } catch (e) {
                // nothing..
            }

            return ((props.responseFileUrl(resJson)) || resJson.url) || '';
        };

        const emitValue = (emitFileList) => {
            // v-model
            let curValue;

            if (isArrayValue) {
                curValue = emitFileList.length ? emitFileList.reduce((pre, item) => {
                    const url = item.url;
                    if (url) pre.push(url);
                    return pre;
                }, []) : [];
            } else {
                const fileItem = emitFileList[emitFileList.length - 1];
                const url = fileItem && fileItem.url;
                if (url) {
                    curValue = url;
                }
            }

            emit('update:modelValue', curValue);
        };

        const globalProperties = getCurrentInstance().appContext.config.globalProperties;

        return () => {
            // eslint-disable-next-line no-unused-vars
            const { 'onUpdate:modelValue': onUpdate, ...otherAttrs } = attrs;
            const data = {
                fileList: fileListRef.value,
                'on-error': () => {
                    if (globalProperties.$message) {
                        globalProperties.$message.error('');
                    }
                },
                ...otherAttrs,
                'onUpdate:fileList': (fileList) => {
                    emitValue(fileList);
                },
                'on-change': ({ fileList }) => {
                    fileListRef.value = fileList;
                },
                'on-finish': ({
                    file,
                    event
                }) => {
                    //  onSuccess
                    file.url = getUrl(event.target);
                    return file;
                }
            };

            if (!isArrayValue) data.max = 1;

            const childVNode = {
                default: () => h(
                    resolveComponent('n-button'),
                    {
                        type: 'primary'
                    },
                    {
                        default: () => props.btnText
                    }
                ),
                ...(props.slots || {}),
            };
            return h(resolveComponent('n-upload'), data, childVNode);
        };
    }
};
