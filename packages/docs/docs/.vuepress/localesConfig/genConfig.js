/**
 * Created by Liu.Jun on 2020/5/31 8:27 .
 */

//

// sidebar
// [
//     {
//         title: 'Group 1',   //
//         path: '/foo/',      // ,
//         collapsable: false, // ,  true,
//         sidebarDepth: 1,    // ,  1
//         children: [
//             '/',
//             ['/page-b', 'Explicit link text'] //
//         ]
//     },
//     {
//         title: 'Group 2',
//         children: [ /* ... */ ]
//     }
// ]

exports.getGuideSidebar = ([groupA = '', groupB = '', groupC = '', groupD = ''] = []) => {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                '',
                'basic-config',
                'components',
                'i18n',
                'polyfill',
                'faq',
                'demo',
            ]
        },
        {
            title: groupB,
            collapsable: false,
            children: [
                'layout-config',
                'datetime-config',
                'data-linkage',
                'validate',
            ]
        },
        {
            title: groupC,
            collapsable: false,
            children: [
                'adv-config',
                'design',
                'why',
            ]
        },
        {
            title: groupD,
            collapsable: false,
            children: [
                'todo',
            ]
        }
    ]
};

//
exports.getConfigSidebar = ([groupA = ''] = []) => {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                // 'basic-config',
            ]
        }
    ]
};

//
exports.getRulesSidebar = ([groupA = ''] = []) => {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                'string',
                'number',
                'boolean',
                'null',
                'object',
                'array',
                'combining',
            ]
        }
    ]
};
