/**
 * Created by Liu.Jun on 2020/5/19 15:41.
 */

export default {
    schema: {
        title: 'ui-schemaui:hidden',
        description: 'ali formRender, <br><b>rootFormData</b> <br><b>parentFormData</b>',
        type: 'object',
        properties: {
            case1: {
                title: '',
                type: 'object',
                properties: {
                    showMore: {
                        title: '',
                        type: 'boolean',
                        default: false
                    },
                    x1: {
                        title: '1',
                        type: 'string',
                        'ui:hidden': '{{rootFormData.case1.showMore === false}}'
                    },
                    x2: {
                        title: '2',
                        type: 'string',
                        'ui:hidden': '{{rootFormData.case1.showMore === false}}'
                    }
                }
            },
            case3: {
                title: '/',
                type: 'object',
                properties: {
                    ruleList: {
                        title: '',
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                attr: {
                                    title: '',
                                    type: 'string',
                                    enum: [
                                        'goal',
                                        'league'
                                    ],
                                    enumNames: [
                                        '',
                                        ''
                                    ],
                                    'ui:width': '40%'
                                },
                                relation: {
                                    title: '-',
                                    type: 'string',
                                    enum: [
                                        '>',
                                        '<',
                                        '='
                                    ],
                                    'ui:hidden': "{{parentFormData.attr === 'league'}}",
                                    'ui:width': '20%'
                                },
                                goal: {
                                    title: '',
                                    type: 'string',
                                    pattern: '^[0-9]+$',
                                    message: {
                                        pattern: ''
                                    },
                                    'ui:hidden': "{{parentFormData.attr !== 'goal'}}",
                                    'ui:width': '40%'
                                },
                                league: {
                                    title: '',
                                    type: 'string',
                                    enum: [
                                        'a',
                                        'b',
                                        'c'
                                    ],
                                    enumNames: [
                                        '',
                                        '',
                                        ''
                                    ],
                                    'ui:hidden': "{{parentFormData.attr !== 'league'}}",
                                    'ui:width': '40%'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
