/**
 * Created by Liu.Jun on 2020/4/24 16:47.
 */

import {
    IconCaretUp, IconCaretDown, IconClose, IconPlus
} from '@snema/vjsf-utils/icons';
import { h, computed } from 'vue';

//
export default {
    name: 'ArrayOrderList',
    emits: ['arrayOperate'],
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
    setup(props, { emit }) {
        //
        const canAdd = computed(() => {
            const { addable, maxItems, vNodeList } = props;
            //
            if (!addable) return false;

            //
            if (maxItems !== undefined) {
                return vNodeList.length < maxItems;
            }
            return true;
        });

        //
        const canRemove = computed(() => {
            const { removable, minItems, vNodeList } = props;
            //
            if (!removable) return false;

            if (minItems !== undefined) {
                return vNodeList.length > minItems;
            }

            return true;
        });

        return () => {
            //
            if (props.vNodeList.length <= 0 && !props.addable) return null;

            //
            return h(
                'div',
                {
                    class: {
                        arrayOrderList: true
                    }
                },
                props.vNodeList.map(({ key, vNode: VNodeItem }, index) => {
                    const trueIndex = props.tupleItemsLength + index;
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
                            props.showIndexNumber ? h('div', {
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
                                                ...(!props.sortable ? {
                                                    display: 'none'
                                                } : {})
                                            },
                                            class: {
                                                arrayListItem_btn: true,
                                                'arrayListItem_orderBtn-top': true
                                            },
                                            type: 'button',
                                            disabled: !props.sortable || index === 0,
                                            onClick: () => {
                                                emit('arrayOperate', {
                                                    command: 'moveUp',
                                                    data: {
                                                        index: trueIndex
                                                    }
                                                });
                                            }
                                        },
                                        [h(IconCaretUp)]
                                    ),
                                    h(
                                        'button',
                                        {
                                            //
                                            style: {
                                                ...(!props.sortable ? {
                                                    display: 'none'
                                                } : {})
                                            },
                                            class: {
                                                arrayListItem_btn: true,
                                                'arrayListItem_orderBtn-bottom': true
                                            },

                                            type: 'button',
                                            disabled: !props.sortable || index === props.vNodeList.length - 1,
                                            onClick: () => {
                                                emit('arrayOperate', {
                                                    command: 'moveDown',
                                                    data: {
                                                        index: trueIndex
                                                    }
                                                });
                                            }
                                        },
                                        [h(IconCaretDown)]
                                    ),
                                    h(
                                        'button',
                                        {
                                            //
                                            style: {
                                                ...(!props.removable ? {
                                                    display: 'none'
                                                } : {})
                                            },
                                            class: {
                                                arrayListItem_btn: true,
                                                'arrayListItem_btn-delete': true
                                            },
                                            type: 'button',
                                            disabled: !canRemove.value,
                                            onClick: () => {
                                                emit('arrayOperate', {
                                                    command: 'remove',
                                                    data: {
                                                        index: trueIndex
                                                    }
                                                });
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
                                [VNodeItem]
                            )
                        ]
                    );
                }).concat([
                    h(
                        'p',
                        {
                            style: {
                                ...(!canAdd.value ? {
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
                                    class: {
                                        bottomAddBtn: true,
                                        'is-plain': true,
                                        genFormBtn: true
                                    },
                                    type: 'button',
                                    onClick: () => {
                                        emit('arrayOperate', {
                                            command: 'add'
                                        });
                                    }
                                },
                                [
                                    h(IconPlus, {
                                        style: { marginRight: '5px' }
                                    }),
                                    props.maxItems ? `( ${props.vNodeList.length} / ${props.maxItems} )` : ''
                                ]
                            ),
                        ]
                    ),
                ])
            );
        };

    }
};
