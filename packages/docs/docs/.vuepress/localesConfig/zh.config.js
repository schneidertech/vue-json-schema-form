/**
 * Created by Liu.Jun on 2020/5/30 10:42 .
 */

module.exports = {
    config: {
        //
        //  '/'
        lang: 'zh-CN',
        title: 'Vue JSON Schema Form',
        description: ' Vue JSON Schemaform'
    },
    themeConfig: {
        //
        selectText: '',
        //
        label: '',
        //
        editLinkText: ' GitHub ',
        logo: '/logo.png', // logo
        lastUpdated: '', // string | boolean
        serviceWorker: {
            updatePopup: {
                message: ".",
                buttonText: ""
            }
        },
        //
        nav: [
            {
                text: '',
                ariaLabel: '',
                link: '/zh/guide/'
            },
            {
                text: '',
                ariaLabel: '',
                items: [
                    { text: 'string', link: '/zh/rules/string.md' },
                    { text: 'number', link: '/zh/rules/number.md' },
                    { text: 'boolean', link: '/zh/rules/boolean.md' },
                    { text: 'null', link: '/zh/rules/null.md' },
                    { text: 'object', link: '/zh/rules/object.md' },
                    { text: 'array', link: '/zh/rules/array.md' },
                    { text: 'combining', link: '/zh/rules/combining.md' },
                ]
            },
            { text: 'Playground', link: 'https://form.lljj.me' },
            { text: 'Schema', link: 'https://form.lljj.me/schema-generator.html' },
            { text: '', link: 'https://form.lljj.me/vue-editor.html#/editor' },
            { text: 'Github', link: 'https://github.com/lljj-x/vue-json-schema-form' },
        ],

        //
        //  .md  /  */README.md
        sidebar: {
            '/zh/guide/': require('./genConfig').getGuideSidebar(),
            '/zh/config/': require('./genConfig').getConfigSidebar(),
            '/zh/rules/': require('./genConfig').getRulesSidebar(),
        }
    }
}
