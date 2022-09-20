/**
 * Created by Liu.Jun on 2020/5/30 10:42 .
 */

module.exports = {
    config: {
        //
        //  '/'
        lang: 'en-US',
        title: 'Vue JSON Schema Form',
        description: 'Quickly build a form with complete verification based on Vue and JSON Schema'
    },
    themeConfig: {
        //
        selectText: 'Languages',
        //
        label: 'English',
        ariaLabel: 'Languages',
        //
        editLinkText: 'Edit this page on GitHub',
        logo: '/logo.png', // logo
        lastUpdated: 'lastUpdated', // string | boolean
        serviceWorker: {
            updatePopup: {
                message: "New content is available.",
                buttonText: "Refresh"
            }
        },
        //
        nav: [
            // {
            //     text: 'Guide',
            //     ariaLabel: 'Guide',
            //     link: '/en/guide/'
            // },
            // {
            //     text: 'Type rules',
            //     ariaLabel: 'Type rules',
            //     items: [
            //         { text: 'string', link: '/en/rules/string.md' },
            //         { text: 'number', link: '/en/rules/number.md' },
            //         { text: 'boolean', link: '/en/rules/boolean.md' },
            //         { text: 'null', link: '/en/rules/null.md' },
            //         { text: 'object', link: '/en/rules/object.md' },
            //         { text: 'array', link: '/en/rules/array.md' },
            //         { text: 'combining', link: '/en/rules/combining.md' },
            //     ]
            // },
            { text: 'Playground', link: 'https://form.lljj.me' },
            { text: 'Github', link: 'https://github.com/lljj-x/vue-json-schema-form' },
        ],

        //
        //  .md  /  */README.md
        sidebar: {
            // '/en/guide/': require('./genConfig').getGuideSidebar([
            //     'Guide',
            //     'Configuration',
            //     'Principle',
            //     'Update plan'
            // ]),
            // '/en/config/': require('./genConfig').getConfigSidebar(),
            // '/en/rules/': require('./genConfig').getRulesSidebar(),
        }
    }
}
