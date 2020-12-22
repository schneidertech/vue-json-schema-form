/**
 * Created by Liu.Jun on 2020/11/26 10:01 下午.
 */

// mock
// https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca

export default {
    name: 'UploadWidget',
    props: {
        value: {
            default: null,
            type: [String, Array]
        },
        responseFileUrl: {
            default: res => (res ? (res.url || (res.data && res.data.url)) : ''),
            type: [Function]
        },
        btnText: {
            type: String,
            default: '点击上传'
        },
        // 传入 VNode
        slots: {
            type: null,
            default: null
        }
    },
    data() {
        // 设置默认 fileList
        const value = this.value;
        const isArrayValue = Array.isArray(value);

        let fileList = this.$attrs.fileList || [];

        if (isArrayValue) {
            fileList = value.map((item, index) => ({
                name: `已上传文件（${index + 1}）`,
                url: item
            }));
        } else if (value) {
            fileList.push({
                name: '已上传文件',
                url: value
            });
        }

        return {
            isArrayValue,
            fileList
        };
    },
    methods: {
        emitValue(fileList) {
            // v-model
            let value;

            const geUrl = fileItem => (
                fileItem
                && ((fileItem.response && this.responseFileUrl(fileItem.response)) || fileItem.url))
                || '';

            if (this.isArrayValue) {
                value = fileList.length ? fileList.reduce((pre, item) => {
                    const url = geUrl(item);
                    if (url) pre.push(url);
                    return pre;
                }, []) : [];
            } else {
                const fileItem = fileList[fileList.length - 1];
                value = geUrl(fileItem);
            }

            debugger;
            this.$emit('input', value);
        }
    },
    render() {
        const h = this.$createElement;
        const attrs = this.$attrs;

        const {
            slots,
        } = this.$props;

        const data = {
            attrs: {
                fileList: this.fileList,
                'on-exceed': () => {
                    if (this.$message) {
                        this.$message.warning('超出文件上传数');
                    }
                },
                'on-error': () => {
                    if (this.$message) {
                        this.$message.error('文件上传失败');
                    }
                },
                ...attrs,
                'on-remove': (file, fileList) => {
                    this.emitValue(fileList);

                    if (attrs['on-remove']) {
                        attrs['on-remove'](file, fileList);
                    }
                },
                'on-success': (response, file, fileList) => {
                    this.emitValue(fileList);

                    // 用户注册的 onSuccess
                    if (attrs['on-success']) {
                        attrs['on-success'](response, file, fileList);
                    }
                }
            }
        };

        if (!this.isArrayValue) data.attrs.limit = 1;

        const childVNode = [];

        if (slots && slots.default) {
            childVNode.push(h('template', {
                slot: 'default',
            }, [slots.default]));
        } else {
            childVNode.push(h('el-button', {
                props: {
                    type: 'primary'
                },
            }, [this.btnText]));
        }

        if (slots && slots.tip) {
            childVNode.push(h('template', {
                slot: 'tip',
            }, [slots.tip]));
        }

        return h('el-upload', data, childVNode);
    }
};
