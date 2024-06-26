<template>
    <div
        v-loading="loading"
        :class="{
            [$style.previewBox]: isPreview
        }"
    >
        <transition name="el-zoom-in-top">
            <EditorHeader
                v-if="!isPreview"
                v-model="scale"
                @onUpdateScale="fixComponentFormPosition"
                @onPreview="(scale = 100) && (isPreview = true)"
                @onSave="handleSave"
                @onPublish="handlePublish"
            ></EditorHeader>
            <el-button
                v-else
                type="primary"
                style="position: fixed;right: 20px;top: 20px;z-index: 5;"
                @click="isPreview = false"
            >

            </el-button>
        </transition>

        <div :class="[$style.container, showToolBar ? $style.hasTools : '']">
            <span
                :class="$style.leftCaret"
                @click="showToolBar = !showToolBar"
            >
                <i class="el-icon-caret-right"></i>
            </span>
            <div
                v-show="showToolBar"
                :class="$style.toolsBar"
            >
                <EditorToolBar
                    :current-use-component-num="currentUseComponentNum"
                    :drag-group="dragOptions.group"
                    :config-tools="configTools"
                    @onFilter="$message.error('')"
                >
                </EditorToolBar>
            </div>

            <div :class="$style.contentWrap">
                <div :class="[$style.contentBox]">
                    <div
                        ref="domScrollWrap"
                        :class="$style.dragAreaWrap"
                        :style="{transform: `scale(${scale/100})`}"
                    >
                        <draggable
                            ref="draggable"
                            v-model="editComponentList"
                            v-bind="dragOptions"
                            :class="[$style.dragArea]"
                            @change="handleDragChange"
                            @start="handlerStart"
                        >
                            <div
                                v-for="item in trueComponentList"
                                :key="item.id"
                                :slot="item.$$slot || 'default' "
                                :class="{
                                    draggableSlot: item.$$slot,
                                    draggableItem: !item.$$slot,
                                    [`draggableSlot_${item.$$slot}`]: item.$$slot
                                }"
                            >
                                <ViewComponentWrap
                                    :editor-item="item"
                                    :is-preview="isPreview"
                                    @onOperate="handleItemOperate"
                                >
                                    <!-- formform -->
                                    <component
                                        :is="item.componentFormName"
                                        v-if="item.componentFormName"
                                        slot="componentForm"
                                        :value="item.componentValue"
                                        @on-change="handleDataChange"
                                        @on-cancel="item.isEdit = false"
                                        @on-submit="handleSaveForm($event, item)"
                                    >
                                    </component>

                                    <!-- schemaform -->
                                    <VueElementForm
                                        v-else
                                        slot="componentForm"
                                        :schema="item.componentPack.propsSchema"
                                        :ui-schema="item.componentPack.uiSchema"
                                        :error-schema="item.componentPack.errorSchema"
                                        :custom-rule="item.componentPack.customRule"
                                        :value="item.componentValue"
                                        @on-change="handleDataChange"
                                        @on-cancel="item.isEdit = false"
                                        @on-submit="handleSaveForm($event, item)"
                                    >
                                    </VueElementForm>
                                    <component
                                        :is="item.componentViewName"
                                        slot="componentView"
                                        :form-data="item.componentValue"
                                    >
                                    </component>
                                </ViewComponentWrap>
                            </div>
                        </draggable>
                        <div
                            v-if="trueComponentList.length === 0"
                            :class="$style.tipBox"
                        >
                            <img
                                src="./assets/img/empty-tip.png"
                                alt="empty-img"
                            >
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Draggable from 'vuedraggable';
import VueElementForm, { schemaValidate } from '@snema/vue-json-schema-form';

import * as arrayMethods from 'demo-common/utils/array';
import componentWithDialog from 'demo-common/components/component-with-dialog';
import JsonPerttyPrint from 'demo-common/components/JsonPerttyPrint.vue';

import EditorToolBar from './EditorToolBar.vue';
import EditorHeader from './EditorHeader.vue';
import ViewComponentWrap from './components/ViewComponentWrap.vue';

import { vm2Api, api2VmToolItem } from './data';

import configTools from './config/mTools';
import configDefaultItems from './config/mDefaultItems';

import { getComponentsAndInitToolsConfig } from './common/utils';

import { generateEditorItem } from './common/editorData';
import './common/registerExtraElementComponent';

//
const components = getComponentsAndInitToolsConfig(configTools);

export default {
    name: 'Editor',
    components: {
        ...components,
        VueElementForm,
        Draggable,
        EditorToolBar,
        EditorHeader,
        ViewComponentWrap
    },
    data() {
        return {
            loading: false,
            isPreview: false,
            configTools,
            scale: 100,
            editComponentList: [],
            editHeaderComponentList: [], // header slot
            editFooterComponentList: [], // footer slot
            showToolBar: true,
        };
    },

    computed: {
        dragOptions() {
            return {
                animation: 300,
                group: 'listComponentsGroup',
                disabled: this.isPreview,
                ghostClass: this.$style.ghost,
                filter: this.$style.disabled,
                draggable: '.draggableItem',
                tag: 'div',
                swapThreshold: 0.3,
                // forceFallback: true
                // fallbackTolerance: 0
            };
        },
        // list
        componentListGroup() {
            return [this.editHeaderComponentList, this.editComponentList, this.editFooterComponentList];
        },

        //  -
        trueComponentList() {
            return [].concat(...this.componentListGroup);
        },

        //
        currentUseComponentNum() {
            return this.trueComponentList.reduce((preVal, curVal) => {
                preVal[curVal.componentViewName] = preVal[curVal.componentViewName]
                    ? (preVal[curVal.componentViewName] + 1)
                    : 1;
                return preVal;
            }, {});
        }
    },
    watch: {
        trueComponentList() {
            this.computedComponentToolBarStatus();

            // form
            this.fixComponentFormPosition();
        }
    },
    mounted() {
        window.document.body.classList.add('page-decorate-design');
    },
    destroyed() {
        window.document.body.classList.remove('page-decorate-design');
    },
    created() {
        this.initEditorData();
    },
    methods: {
        validateDataList(validateData = false) {
            if (this.trueComponentList.length <= 0) {
                this.$message.warning('');
                return false;
            }

            //
            if (!validateData) return true;

            //
            for (let i = 0; i < this.trueComponentList.length; i += 1) {
                const item = this.trueComponentList[i];

                let hasError = false;

                // schema
                if (item.componentPack.propsSchema) {
                    //
                    hasError = !schemaValidate.isValid(item.componentPack.propsSchema, item.componentValue);
                } else {
                    // pack
                    // schema
                    this.$message.warning('schema !');
                }

                if (hasError) {
                    //
                    document.querySelectorAll('.js_viewComponentBox')[i].click();
                    this.$message.error('!');
                    return false;
                }
            }
            return true;
        },
        async initEditorData() {
            //
            const dataList = api2VmToolItem(configTools, configDefaultItems);

            //
            dataList.forEach((toolItemData) => {
                if (!toolItemData.componentPack) {
                    console.warn('');
                    console.log(dataList);
                    return;
                }
                const editorData = generateEditorItem(toolItemData);
                //
                this.editComponentList.push(editorData);
                if (editorData.additional) {
                    //
                    this.additionalStrategy(editorData.additional, editorData);
                }
            });
        },
        handleSave(validData) {
            if (!this.validateDataList(validData)) return;

            componentWithDialog({
                VueComponent: JsonPerttyPrint,
                dialogProps: {
                    title: '',
                },
                componentProps: {
                    jsonString: vm2Api(this.trueComponentList)
                }
            });
        },
        handlePublish() {
            this.handleSave(true);
        },
        //
        computedComponentToolBarStatus() {
            this.componentListGroup.forEach((componentList) => {
                componentList.forEach((component, componentIndex) => {
                    Object.assign(component.toolBar, {
                        moveUpDisabled: componentIndex === 0, //
                        moveDownDisabled: componentIndex === componentList.length - 1, //
                        copyDisabled: (this.currentUseComponentNum[component.componentViewName] || 0) >= component.maxNum, // copy
                        removeDisabled: component.additional && component.additional.unRemove //
                    });
                });
            });
        },

        // item list
        getCurrentListByItem(item) {
            for (const value of this.componentListGroup) {
                if (value.includes(item)) return value;
            }

            return [];
        },

        // form
        fixComponentFormPosition() {
            // Popper  scroll window resize
            // https://github.com/ElemeFE/element/blob/dev/src/utils/popper.js#L464
            setTimeout(() => {
                const evt = window.document.createEvent('UIEvents');
                evt.initUIEvent('scroll', true, false, window, 0);
                this.$refs.domScrollWrap.dispatchEvent(evt);

                // const curLeft = this.$refs.domScrollWrap.scrollLeft;
                // this.$refs.domScrollWrap.scrollLeft = curLeft - 1;
                // this.$refs.domScrollWrap.scrollLeft = curLeft;
            }, 10);
        },

        //
        handleDataChange() {
            this.fixComponentFormPosition();
        },

        //
        handleItemOperate({ item, command }) {
            const strategyMap = {
                moveUp(target, arrayItem) {
                    return arrayMethods.moveUp(target, arrayItem);
                },
                moveDown(target, arrayItem) {
                    return arrayMethods.moveDown(target, arrayItem);
                },
                copy(target, arrayItem) {
                    // copy
                    // eslint-disable-next-line no-unused-vars
                    const { componentValue, ...emptyPack } = arrayItem;

                    return target.splice(target.indexOf(arrayItem) + 1, 0, generateEditorItem(emptyPack));
                },
                remove(target, arrayItem) {
                    return arrayMethods.remove(target, arrayItem);
                }
            };

            const curStrategy = strategyMap[command];

            if (curStrategy) {
                curStrategy.apply(this, [this.getCurrentListByItem(item), item]);
            } else {
                this.$message.error(` - [${command}]`);
            }
        },

        //
        handleSaveForm(data, item) {
            Object.assign(item, {
                componentValue: data,
                isEdit: false
            });
        },

        /**
         *
         * @param element
         * @param position  0 / 1
         */
        moveToBothEnds(element, position) {
            const curIndex = this.editComponentList.indexOf(element);
            if (curIndex >= 0) {
                // list
                (position === 0 ? this.editHeaderComponentList : this.editFooterComponentList)
                    .push(this.editComponentList.splice(curIndex, 1)[0]);
            }
        },

        /**
         *  -
         * @param additional
         * @param element
         */
        additionalStrategy(additional, element) {
            const Strategy = {
                topDisplay() {
                    element.$$slot = 'header';
                    this.moveToBothEnds(element, 0);
                },
                bottomDisplay() {
                    element.$$slot = 'footer';
                    this.moveToBothEnds(element, 1);
                }
            };

            Object.entries(additional).forEach(([key, value]) => {
                if (Strategy[key]) {
                    Strategy[key].apply(this, [].concat(value));
                }
            });
        },

        handlerStart(evt) {
            //
            // evt.originalEvent.dataTransfer.setDragImage(document.querySelector('H1'), 50, 50);
        },
        // DragChange -
        handleDragChange(evt) {
            if (evt.added && evt.added.element.additional) {
                //
                this.additionalStrategy(evt.added.element.additional, evt.added.element);
            }
        }
    }
};
</script>

<style>
    body.page-decorate-design{
        overflow: hidden;
    }
    .flip-list-move {
        transition: transform 0.3s;
    }
    .no-move {
        transition: transform 0s;
    }
</style>
<style module>
    @import 'demo-common/css/variable.css';
    :root {
        --site-top-height: 80px;
        --tool-bar-width: 260px;
        --drag-area-width: 375px;
        --drag-area-height: 630px;
    }
    /* */
    .previewBox {
        .toolsBar,.leftCaret {
            display: none;
        }
        .container {
            height: 100vh;
            padding-left: 0;
        }
        .dragAreaWrap{
            overflow-x: hidden;
        }
        :global {
            .vueEditor_viewComponentBox {
                margin-left: 50%;
                transform: translate(-50%, 0);
                cursor: auto;
                box-shadow: none;
                &:after {
                    display: none;
                    content: none;
                }
            }
        }
    }
    .container {
        position: relative;
        box-sizing: border-box;
        padding-left: 0;
        padding-top: 10px;
        height: calc(100vh - var(--site-top-height));
        transition: 0.2s ease;
    }
    .hasTools {
        padding-left: var(--tool-bar-width);
        :global .el-icon-caret-right {
            transform: rotate(180deg);
        }
    }
    /*tools*/
    .leftCaret {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: absolute;
        width: 18px;
        height: 50px;
        background: var(--color-white);
        top: 50%;
        margin-top: -25px;
        box-shadow: 0 0 4px 0 color(var(--color-black) a(0.1));
        transition: all ease 0.3s;
        border-radius: 0 10px 10px 0;
        z-index: 9;
        &:hover {
            box-shadow: 0 0 4px 0 color(var(--color-black) a(0.2));
            opacity: 1;
        }
    }
    .toolsBar {
        position: absolute;
        left: 0;
        top: 2px;
        bottom: 0;
        background: var(--color-white);
        width: var(--tool-bar-width);
        overflow: auto;
        box-shadow: 0 0 4px 0 color(var(--color-black) a(0.2));
        z-index: 2;
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }

    /*content area*/
    .dragAreaWrap {
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
        &::-webkit-scrollbar-track {
            background-color: var(--background-color-base);
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: var(--color-text-placeholder);
        }
    }
    .contentWrap {
        position: relative;
        height: 100%;
        width: 100%;
    }
    .contentBox {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: auto;
        min-height: 100%;
    }
    .dragAreaWrap {
        transform-origin: top center;
        width: var(--drag-area-width);
        height: var(--drag-area-height);
        overflow-x: hidden;
        box-shadow: 0 0 10px 1px rgba(0,0,0,0.3);
    }
    .tipBox{
        pointer-events: none;
        top: 20px;
        position: absolute;
        left: 0;
        width: 100%;
        text-align: center;
        margin: 30vh 0;
        p {
            margin: 20px 0;
            font-size: 16px;
        }
    }
    .dragArea {
        height: 100%;
        background-color: #ffffff;
        :global {
            .draggableToolItem {
                width: 100%;
                max-width: 100%;
                &:local {
                    &.ghost {
                        background-color: color(var(--color-primary) a(0.4)) !important;
                        box-shadow: 0 3px 14px 3px color(var(--color-primary) a(0.6)), 0 10px 10px 1px color(var(--color-primary) a(0.5));
                        height: 120px !important;
                        padding: 20px;
                        &>div {
                            width: 100%;
                            height: 100%;
                            background-color: var(--color-white);
                        }
                        p {
                            font-size: 16px;
                            line-height: 24px;
                        }
                    }
                }
            }
            .emptyBox {
                min-height: 350px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .viewEmpty_IconBox {
                color: color(var(--checkbox-color) a(0.7));
                font-size: 50px;
                text-align: center;
            }
            .el-image {
                vertical-align: top;
            }
        }
    }
    .ghost {
        opacity: 0.5;
    }
</style>
