/**
 * Created by Liu.Jun on 2020/7/22 13:21.
 */

const f = s => `0${s}`.substr(-2);

function formatDateStr(date, isDatetime) {
    if (!date) return '';

    const dateObj = new Date(date);

    if (isDatetime) return dateObj.toISOString();

    const { year, month, day } = {
        year: dateObj.getFullYear(),
        month: dateObj.getMonth() + 1,
        day: dateObj.getDate(),
    };
    return `${year}-${f(month)}-${f(day)}`;
}

const toDateObj = value => (Array.isArray(value) ? value.map(item => value && new Date(item)) : value && new Date(value));

function isEmptyValue(value) {
    return value === null || value === '' || (Array.isArray(value) && value.every(item => item === ''));
}

export default {
    name: 'DatePickerWidget',
    props: {
        value: {
            type: null
        },
        isNumberValue: {
            type: Boolean,
            default: false
        },
        isDatetime: {
            type: Boolean,
            default: false
        },
        isRange: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            originValue: toDateObj(this.value),
            formatValue: this.formatDate(this.value)
        };
    },
    watch: {
        value(newVal) {
            //  iview
            if (newVal === this.formatValue) {
                // date-picker
            } else {
                //
                this.originValue = toDateObj(newVal);
            }
        }
    },
    computed: {
        type() {
            return this.isDatetime
                ? (this.isRange ? 'datetimerange' : 'datetime')
                : (this.isRange ? 'daterange' : 'date');
        }
    },
    methods: {
        formatDate(val) {
            const { isRange, isNumberValue, isDatetime } = this.$props;

            let trueVal;
            if (isRange) {
                trueVal = isEmptyValue(val)
                    ? []
                    : val.map(
                        item => (isNumberValue ? (new Date(item)).valueOf() : formatDateStr(item, isDatetime))
                    );
            } else {
                trueVal = isEmptyValue(val)
                    ? undefined
                    : isNumberValue ? (new Date(val)).valueOf() : formatDateStr(val, isDatetime);
            }
            return trueVal;
        }
    },
    render(h) {
        const self = this;
        return h('date-picker', {
            attrs: {
                type: this.type,
                value: this.originValue,
                ...this.$attrs
            },
            on: {
                ...this.$listeners,
                input(val) {
                    self.originValue = val;
                    self.formatValue = self.formatDate(val);

                    self.$emit('input', self.formatValue);
                }
            }
        });
    }
};
