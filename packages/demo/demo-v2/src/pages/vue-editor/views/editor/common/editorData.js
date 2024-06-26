/**
 * Created by Liu.Jun on 2020/3/31 11:30 .
 */

import { getDefaultFormState } from '@snema/vue-json-schema-form';
import { genId } from 'demo-common/utils/id';

function isEmptyObject(obj) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}

// editor item
export function generateEditorItem(toolItem) {
    const currentComponentPack = toolItem.componentPack;

    const componentValue = (
        currentComponentPack.propsSchema
        && (!toolItem.componentValue || isEmptyObject(toolItem.componentValue))
    )
        ? getDefaultFormState(
            currentComponentPack.propsSchema,
            {}, //
            currentComponentPack.propsSchema
        )
        : toolItem.componentValue || {};

    return {
        ...toolItem,
        isEdit: false,
        toolBar: {
            moveDownDisabled: false,
            moveUpDisabled: false,
            copyDisabled: false,
            removeDisabled: false,
        },
        componentValue,
        componentViewName: currentComponentPack.componentViewName,
        componentFormName: currentComponentPack.componentFormName,
        // id: `${currentComponentPack.componentViewName}_${+new Date()}`,
        id: genId(),
    };
}
