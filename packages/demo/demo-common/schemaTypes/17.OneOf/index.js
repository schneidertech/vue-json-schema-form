/**
 * Created by Liu.Jun on 2020/5/19 15:00.
 */


// setTimeout(() => {
//     const fnList = [
//         () => 1,
//         p => Promise.resolve(p + 1),
//         p => p + 2,
//         p => Promise.resolve(p + 3),
//         p => Promise.resolve(p + 4),
//         p => p + 5,
//         p => p
//     ];
//
//     let preResult;
//     while (fnList.length > 0) {
//         const curFn = fnList.shift();
//         if (preResult) {
//             preResult = preResult.then((res) => {
//                 console.log(res);
//                 return Promise.resolve(curFn(res));
//             });
//         } else {
//             //
//             preResult = Promise.resolve(curFn());
//         }
//     }
// }, 1000);


export default {
    schema: {
        type: 'object',
        required: [
            'age'
        ],
        properties: {
            // age: {
            //     title: ' oneOf',
            //     oneOf: [
            //         {
            //             title: ' oneOf 5',
            //             type: 'integer',
            //             multipleOf: 5
            //         },
            //         {
            //             title: ' oneOf 3',
            //             type: 'integer',
            //             multipleOf: 3
            //         }
            //     ]
            // },
            // test: {
            //     title: ' const OneOf',
            //     type: 'string',
            //     oneOf: [
            //         {
            //             const: '111'
            //         },
            //         {
            //             const: '222'
            //         }
            //     ]
            // },
            items: {
                title: 'OneOf Array Items',
                type: 'array',
                items: {
                    type: 'object',
                    oneOf: [
                        {
                            properties: {
                                foo: {
                                    type: 'string'
                                }
                            }
                        },
                        {
                            properties: {
                                bar: {
                                    type: 'string'
                                }
                            }
                        }
                    ]
                }
            }
        },
        // oneOf: [
        //     {
        //         title: 'First method of identification',
        //         required: [
        //             'firstName'
        //         ],
        //         properties: {
        //             firstName: {
        //                 type: 'string',
        //                 title: 'First name',
        //                 default: 'Chuck'
        //             },
        //             lastName: {
        //                 type: 'string',
        //                 title: 'Last name'
        //             }
        //         }
        //     },
        //     {
        //         title: 'Second method of identification',
        //         required: [
        //             'idCode'
        //         ],
        //         properties: {
        //             idCode: {
        //                 type: 'string',
        //                 title: 'ID code',
        //                 default: 'Default id'
        //             }
        //         }
        //     }
        // ]
    },
    // uiSchema: {
    //     oneOfSelect: {
    //         'ui:title': 'anyOf ',
    //         'ui:widget': 'RadioWidget'
    //     },
    //     oneOf: {
    //         'ui:widget': 'RadioWidget',
    //         'ui:title': ' OneOf object',
    //         'ui:options': {
    //             style: {
    //                 // width: '300px',
    //             }
    //         }
    //     },
    //     age: {
    //         'ui:options': {
    //             // widget: 'el-slider',
    //         },
    //         oneOfSelect: {
    //             'ui:title': ' (uiSchema -> oneOfSelect)',
    //             'ui:widget': 'RadioWidget',
    //             'ui:options': {
    //                 style: {
    //                     width: '100%'
    //                 }
    //             }
    //         },
    //         oneOf: [
    //             {
    //                 'ui:title': '5 (uiSchema)',
    //                 'ui:widget': 'el-slider',
    //             },
    //             {
    //                 'ui:title': '3 (uiSchema)'
    //             }
    //         ]
    //     },
    //     test: {
    //         'ui:widget': 'RadioWidget',
    //     }
    // },
    formData: {
        age: 27,
        test: '222',
        firstName: '11',
        lastName: '11',
        items: [
            {
                foo: '11111'
            },
            {
                bar: '222222222'
            }
        ]
    },
    errorSchema: {
    }
};
