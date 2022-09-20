/**
 * Created by Liu.Jun on 2019/11/29 11:25.
 */

import createVue2Core, { fieldProps, SchemaField } from '@snema/vue2-form-core';

import i18n from '@snema/vjsf-utils/i18n';
import * as vueUtils from '@snema/vjsf-utils/vueUtils';
import * as formUtils from '@snema/vjsf-utils/formUtils';
import * as schemaValidate from '@snema/vjsf-utils/schema/validate';
import getDefaultFormState from '@snema/vjsf-utils/schema/getDefaultFormState';

import WIDGET_MAP from './config/widgets/WIDGET_MAP.js';

import './style.css';

const globalOptions = Object.freeze({
    WIDGET_MAP: Object.freeze(WIDGET_MAP),
    COMPONENT_MAP: Object.freeze({
        form: 'el-form',
        formItem: 'el-form-item',
        button: 'el-button',
        popover: 'el-popover'
    }),
    HELPERS: {
        // mini description
        isMiniDes(formProps) {
            return formProps && ['left', 'right'].includes(formProps.labelPosition);
        }
    }
});

const JsonSchemaForm = createVue2Core(globalOptions);

// Vue  VueForm
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('VueForm', JsonSchemaForm);
}

export default JsonSchemaForm;

export {
    globalOptions,
    SchemaField,
    getDefaultFormState,
    fieldProps,
    vueUtils,
    formUtils,
    schemaValidate,
    i18n
};
