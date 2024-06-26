<template>
    <el-card
        shadow="hover"
        body-style="padding: 0;"
        :class="$style.card"
        :style="{
            width
        }"
    >
        <template #header>
            <div class="clearfix">
                <span>{{ title }}</span>
            </div>
        </template>

        <div
            ref="monacoEditor"
            class="container"
            :style="{
                width,
                height
            }"
        ></div>
    </el-card>
</template>

<script>
export default {
    name: 'CodeEditor',
    props: {
        lazy: {
            type: Boolean, //
            default: false
        },
        title: {
            type: String,
            default: 'Javascript'
        },
        value: {
            type: String,
            default: '{}'
        },
        width: {
            type: String,
            default: 'auto'
        },
        height: {
            type: String,
            default: '520px'
        },
        language: {
            type: String,
            default: 'json'
        },
        theme: {
            type: String,
            default: 'vs-dark',
            // default: 'vs-dark'
        },
        options: {
            type: Object,
            default: () => ({})
        }
    },
    watch: {
        value(value) {
            //
            if (!this.editor) return;
            const model = this.editor.getModel();
            if (value != null && value !== model.getValue()) {
                this.editor.pushUndoStop();
                model.pushEditOperations(
                    [],
                    [
                        {
                            range: model.getFullModelRange(),
                            text: value,
                        },
                    ]
                );
                this.editor.pushUndoStop();
            }
        },
        language(language) {
            if (!this.editor) return;
            const model = this.editor.getModel();
            window.monaco.editor.setModelLanguage(model, language);
        },
        theme(theme) {
            if (!this.editor) return;
            window.monaco.editor.setTheme(theme);
        },
        width() {
            if (!this.editor) return;
            this.editor.layout();
        },
        height() {
            if (!this.editor) return;
            this.editor.layout();
        },
        options(options) {
            if (!this.editor) return;
            this.editor.updateOptions(options);
        }
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        if (this.editor) {
            this.editor.dispose();
            const model = this.editor.getModel();
            if (model) {
                model.dispose();
            }
        }
    },
    methods: {
        editorDidChange(editor) {
            // onDidBlurEditorText
            // onDidBlurEditorWidget
            // onMouseLeave
            // onDidChangeModelContent

            const eventName = this.lazy ? 'onDidBlurEditorText' : 'onDidChangeModelContent';

            editor[eventName](() => {
                const newValue = editor.getValue();
                //
                if (newValue !== this.value) {
                    this.$emit('input', newValue);
                    this.$emit('onChange', newValue);
                }
            });
        },
        init() {
            window.require(['vs/editor/editor.main'], () => {
                const {
                    value, language, theme, height, options, width
                } = this.$props;

                this.editor = window.monaco.editor.create(
                    this.$refs.monacoEditor,
                    {
                        lineNumbers: 'on',
                        readOnly: false,
                        automaticLayout: true,
                        minimap: {
                            enabled: false
                        },
                        ...options,
                        value,
                        language,
                        height,
                        width,
                        ...(theme ? { theme } : {}),
                    },
                );
                this.editorDidChange(this.editor);
            });
        }
    }
};
</script>

<style module>
    .card {
        :global {
            .el-card__header {
                padding: 10px 20px;
                font-size: 14px;
                font-weight: bold;
            }
        }
    }
</style>
