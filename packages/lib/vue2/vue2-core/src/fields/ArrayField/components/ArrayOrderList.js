/**
 * Created by Liu.Jun on 2020/4/24 16:47.
 */

//

import {
    IconCaretUp, IconCaretDown, IconClose, IconPlus
} from '@lljj/vjsf-utils/icons';

export default {
    name: 'ArrayOrderList',
    props: {
        // VNode list
        vNodeList: {
            type: Array,
            default: []
        },
        // tuple
        tupleItemsLength: {
            type: Number,
            default: 0
        },
        addable: {
            //
            type: Boolean,
            default: true
        },
        showIndexNumber: {
            //
            type: Boolean,
            default: false
        },
        sortable: {
            //
            type: Boolean,
            default: true
        },
        removable: {
            //
            type: Boolean,
            default: true
        },
        maxItems: {
            //
        },
        minItems: {
            //
        },
        globalOptions: null
    },
    computed: {
        canAdd() {
            const { addable, maxItems, vNodeList } = this.$props;
            //
            if (!addable) return false;

            //
            if (maxItems !== undefined) {
                return vNodeList.length < maxItems;
            }
            return true;
        },
        canRemove() {
            const { removable, minItems, vNodeList } = this.$props;
            //
            if (!removable) return false;

            if (minItems !== undefined) {
                return vNodeList.length > minItems;
            }

            return true;
        }
    },
    render(h) {
        //
        if (this.vNodeList.length <= 0 && !this.addable) return null;

        //
        return h(
            'div',
            {
                class: {
                    arrayOrderList: true
                }
            },
            this.vNodeList.map(({ key, vNode: VnodeItem }, index) => {
                const trueIndex = this.tupleItemsLength + index;
                const indexNumber = index + 1;
                return h(
                    'div',
                    {
                        key,
                        class: {
                            arrayOrderList_item: true
                        }
                    },
                    [
                        this.showIndexNumber ? h('div', {
                            class: {
                                arrayListItem_index: true
                            }
                        }, indexNumber) : null,
                        h(
                            'div',
                            {
                                class: {
                                    arrayListItem_operateTool: true
                                }
                            },
                            [
                                h(
                                    'button',
                                    {
                                        //
                                        style: {
                                            ...(!this.sortable ? {
                                                display: 'none'
                                            } : {})
                                        },
                                        attrs: {
                                            type: 'button',
                                            disabled: !this.sortable || index === 0
                                        },
                                        class: {
                                            arrayListItem_btn: true,
                                            'arrayListItem_orderBtn-top': true
                                        },
                                        on: {
                                            click: () => {
                                                this.$emit('onArrayOperate', {
                                                    command: 'moveUp',
                                                    data: {
                                                        index: trueIndex
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    [h(IconCaretUp)]
                                ),
                                h(
                                    'button',
                                    {
                                        //
                                        style: {
                                            ...(!this.sortable ? {
                                                display: 'none'
                                            } : {})
                                        },
                                        attrs: {
                                            type: 'button',
                                            disabled: !this.sortable || index === this.vNodeList.length - 1
                                        },
                                        class: {
                                            arrayListItem_btn: true,
                                            'arrayListItem_orderBtn-bottom': true
                                        },
                                        on: {
                                            click: () => {
                                                this.$emit('onArrayOperate', {
                                                    command: 'moveDown',
                                                    data: {
                                                        index: trueIndex
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    [h(IconCaretDown)]
                                ),
                                h(
                                    'button',
                                    {
                                        //
                                        style: {
                                            ...(!this.removable ? {
                                                display: 'none'
                                            } : {})
                                        },
                                        attrs: {
                                            type: 'button',
                                            disabled: !this.canRemove
                                        },
                                        class: {
                                            arrayListItem_btn: true,
                                            'arrayListItem_btn-delete': true
                                        },
                                        on: {
                                            click: () => {
                                                this.$emit('onArrayOperate', {
                                                    command: 'remove',
                                                    data: {
                                                        index: trueIndex
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    [h(IconClose)]
                                )
                            ]
                        ),
                        h(
                            'div',
                            {
                                class: {
                                    arrayListItem_content: true
                                }
                            },
                            [VnodeItem]
                        )
                    ]
                );
            }).concat([
                h(
                    'p',
                    {
                        style: {
                            ...(!this.canAdd ? {
                                display: 'none'
                            } : {})
                        },
                        class: {
                            arrayOrderList_bottomAddBtn: true,
                        }
                    },
                    [
                        h(
                            'button',
                            {
                                attrs: {
                                    type: 'button'
                                },
                                class: {
                                    bottomAddBtn: true,
                                    'is-plain': true,
                                    genFormBtn: true
                                },
                                on: {
                                    click: () => {
                                        this.$emit('onArrayOperate', {
                                            command: 'add'
                                        });
                                    }
                                }
                            },
                            [
                                h(IconPlus, {
                                    style: { marginRight: '5px' }
                                }),
                                this.maxItems ? `( ${this.vNodeList.length} / ${this.maxItems} )` : ''
                            ]
                        ),
                    ]
                ),
            ])
        );
    }
};
