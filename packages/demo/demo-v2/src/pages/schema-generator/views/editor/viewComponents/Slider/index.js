/**
 * Created by Liu.Jun on 2020/10/30 16:25.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'slider',
    type: 'number',
    'ui:widget': 'ElSlider'
};

export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: '',
            required: [],
            properties: {
                schemaOptions: {
                    type: 'object',
                    properties: {
                        multipleOf: {
                            title: '',
                            type: 'number',
                            default: 1
                        },
                    }
                },
                uiOptions: {
                    type: 'object',
                    properties: {
                        showInput: {
                            title: '',
                            type: 'boolean',
                            default: false
                        },
                        showInputControls: {
                            title: '',
                            type: 'boolean',
                            default: true
                        },
                        showStops: {
                            title: '',
                            type: 'boolean',
                            default: false
                        },
                        showTooltip: {
                            title: 'Tooltip',
                            type: 'boolean',
                            default: true
                        },
                        debounce: {
                            title: 'ms',
                            type: 'number',
                            default: 300
                        }
                    }
                },
            }
        },
        rules: {
            type: 'object',
            title: '',
            required: [],
            properties: {
                schemaOptions: {
                    type: 'object',
                    properties: {
                        minimum: {
                            title: '',
                            type: 'number'
                        },
                        maximum: {
                            title: '',
                            type: 'number'
                        },
                    }
                }
            }
        }
    }, 'number')
};
