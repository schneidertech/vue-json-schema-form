/**
 * Created by Liu.Jun on 2020/10/26 18:24.
 */

import { formatFormLabelWidth } from '../common/editorData';

function genBaseVal(type = 'string', isMultiSelect = false) {
    return {
        title: '',
        type: 'object',
        properties: {
            schemaOptions: {
                type: 'object',
                properties: {
                    title: {
                        title: '',
                        type: 'string',
                        'ui:placeholder': '',
                        'err:required': ''
                    },
                    description: {
                        title: '',
                        type: 'string',
                        'ui:options': {
                            placeholder: 'html',
                            type: 'textarea',
                            rows: 3,
                        }
                    },
                    ...!['array', 'object'].includes(type) ? {
                        default: {
                            title: '',
                            type,
                            'ui:placeholder': ''
                        },
                    } : {},
                    ...['array'].includes(type) ? {
                        minItems: {
                            title: '',
                            type: 'number'
                        },
                        maxItems: {
                            title: '',
                            type: 'number'
                        },
                        uniqueItems: {
                            type: 'boolean',
                            title: '',
                            description: ' true',
                            'ui:widget': 'el-switch',
                            default: false
                        }
                    } : {}
                }
            },
            uiOptions: {
                type: 'object',
                properties: {
                    ...!['array', 'object'].includes(type) || isMultiSelect ? {
                        width: {
                            title: '',
                            type: 'string',
                            description: 'style width <br /><strong style="font-weight: bold;">10%100px</strong>',
                            'ui:placeholder': 'FormItem'
                        },
                        labelWidth: {
                            title: '',
                            type: 'number',
                            'ui:widget': 'ElSlider',
                            'ui:options': {
                                formatTooltip(val) {
                                    return formatFormLabelWidth(val);
                                }
                            }
                        },
                        required: {
                            title: '',
                            type: 'boolean',
                            default: false
                        },
                        disabled: {
                            title: '',
                            type: 'boolean',
                            default: false
                        }
                    } : {
                        showTitle: {
                            title: '',
                            type: 'boolean',
                            default: true,
                            'ui:widget': 'el-switch'
                        },
                        showDescription: {
                            title: '',
                            type: 'boolean',
                            default: true,
                            'ui:widget': 'el-switch'
                        }
                    },
                }
            }
        }
    };
}

export default (schema, type, isMultiSelect) => ({
    type: 'object',
    required: ['property'],
    properties: {
        property: {
            title: '',
            type: 'string',
            'ui:placeholder': '',
            'err:required': ''
        },
        baseValue: genBaseVal(type, isMultiSelect),
        ...schema
    }
});
