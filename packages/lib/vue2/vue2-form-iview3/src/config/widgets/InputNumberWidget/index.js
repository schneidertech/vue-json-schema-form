/**
 * Created by Liu.Jun on 2021/1/2 10:56 .
 */

export default {
    name: 'SwitchWidget',
    functional: true,
    render(h, context) {
        // iview3 input number undefined  1

        //  undefined jsonSchema
        //  iview  nulliview3
        if (context.data.attrs.value === undefined) context.data.attrs.value = null;

        return h('input-number', context.data, context.children);
    }
};
