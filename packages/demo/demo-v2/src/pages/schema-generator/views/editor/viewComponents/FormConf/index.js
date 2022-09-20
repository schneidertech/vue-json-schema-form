/**
 * Created by Liu.Jun on 2020/11/20 17:44.
 */

import { formatFormLabelWidth } from '../../common/editorData';


export default {
    type: 'object',
    required: [],
    properties: {
        formProps: {
            title: '',
            type: 'object',
            description: 'inlineElementUi form inline  Footer inline ',
            properties: {
                inline: {
                    type: 'boolean',
                    title: 'Inline',
                    default: false
                },
                inlineFooter: {
                    type: 'boolean',
                    title: 'Footer inline',
                    default: false
                },
                layoutColumn: {
                    title: '',
                    type: 'number',
                    default: 1,
                    enum: [
                        1,
                        2,
                        3
                    ],
                    enumNames: [
                        '',
                        '',
                        ''
                    ],
                    'ui:widget': 'SelectWidget'
                },
                labelPosition: {
                    title: '',
                    type: 'string',
                    default: 'top',
                    enum: [
                        'left',
                        'right',
                        'top'
                    ],
                    enumNames: [
                        'Left',
                        'Right',
                        'Top'
                    ],
                },
                labelWidth: {
                    title: '',
                    type: 'number',
                    default: 25, // 4
                    'ui:widget': 'ElSlider',
                    'ui:options': {
                        formatTooltip(val) {
                            return formatFormLabelWidth(val);
                        }
                    }
                },
                labelSuffix: {
                    title: '',
                    type: 'string',
                    default: ''
                }
            }
        },
        formFooter: {
            title: 'Footer',
            type: 'object',
            properties: {
                show: {
                    type: 'boolean',
                    title: '',
                    default: false
                },
                okBtn: {
                    type: 'string',
                    title: '',
                    default: ''
                },
                cancelBtn: {
                    type: 'string',
                    title: '',
                    default: ''
                }
            }
        }
    }
};
