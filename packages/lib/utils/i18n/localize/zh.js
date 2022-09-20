// https://github.com/epoberezkin/ajv-i18n
export default function localizeEn(errors) {
    if (!(errors && errors.length)) return;
    for (let i = 0; i < errors.length; i += 1) {
        const e = errors[i];
        let out;
        let n;
        let cond;
        switch (e.keyword) {
            case '$ref':
                out = `Could not find ${e.params.ref}`;
                break;
            case 'additionalItems':
                out = '';
                n = e.params.limit;
                out += `Exceeds ${n} elements`;
                break;
            case 'additionalProperties':
                out = 'No extra attributes allowed';
                break;
            case 'anyOf':
                out = 'should be any of';
                break;
            case 'const':
                out = 'should be const';
                break;
            case 'contains':
                out = 'Should contain a valid value';
                break;
            case 'custom':
                out = `Should pass keyword: "${e.keyword}"`;
                break;
            case 'dependencies':
                out = '';
                n = e.params.depsCount;
                out += `Should have properties: ${e.params.property} of ${e.params.deps}`;
                break;
            case 'enum':
                out = 'Should match preset enum value';
                break;
            case 'exclusiveMaximum':
                out = '';
                cond = `${e.params.comparison} ${e.params.limit}`;
                out += `Should be ${cond}`;
                break;
            case 'exclusiveMinimum':
                out = '';
                cond = `${e.params.comparison} ${e.params.limit}`;
                out += `Should be ${cond}`;
                break;
            case 'false schema':
                out = 'Bool error';
                break;
            case 'format':
                out = `Should match format: "${e.params.format}"`;
                break;
            case 'formatExclusiveMaximum':
                out = 'formatExclusiveMaximum Should be bool';
                break;
            case 'formatExclusiveMinimum':
                out = 'formatExclusiveMinimum Should be bool';
                break;
            case 'formatMaximum':
                out = '';
                cond = `${e.params.comparison} ${e.params.limit}`;
                out += `Should be: ${cond}`;
                break;
            case 'formatMinimum':
                out = '';
                cond = `${e.params.comparison} ${e.params.limit}`;
                out += `Should be: ${cond}`;
                break;
            case 'if':
                out = `Should match pattern: "${e.params.failingKeyword}" `;
                break;
            case 'maximum':
                out = '';
                cond = `${e.params.comparison} ${e.params.limit}`;
                out += `Should be: ${cond}`;
                break;
            case 'maxItems':
                out = '';
                n = e.params.limit;
                out += `Should not exceed: ${n} elements`;
                break;
            case 'maxLength':
                out = '';
                n = e.params.limit;
                out += `Should not exceed ${n} characters`;
                break;
            case 'maxProperties':
                out = '';
                n = e.params.limit;
                out += `Shoudl not exceed ${n} attributes`;
                break;
            case 'minimum':
                out = '';
                cond = `${e.params.comparison} ${e.params.limit}`;
                out += `Should be: ${cond}`;
                break;
            case 'minItems':
                out = '';
                n = e.params.limit;
                out += `Should not be less than ${n} items`;
                break;
            case 'minLength':
                out = '';
                n = e.params.limit;
                out += `Should not be less than ${n} characters`;
                break;
            case 'minProperties':
                out = '';
                n = e.params.limit;
                out += `Should not be less than ${n} attributes`;
                break;
            case 'multipleOf':
                out = `Should be multiple of ${e.params.multipleOf}`;
                break;
            case 'not':
                out = 'Should "not" schema';
                break;
            case 'oneOf':
                out = 'Can only match "oneOf"';
                break;
            case 'pattern':
                out = `Should match pattern: "${e.params.pattern}"`;
                break;
            case 'patternRequired':
                out = `Should match pattern ${e.params.missingPattern}`;
                break;
            case 'propertyNames':
                out = `Property name: '${e.params.propertyName}' invalid`;
                break;
            case 'required':
                out = `Should have attribute: ${e.params.missingProperty}`;
                break;
            case 'switch':
                out = `${e.params.caseIndex} failed "switch" check, `;
                break;
            case 'type':
                out = `Should be of type ${e.params.type}`;
                break;
            case 'uniqueItems':
                out = `Should not contain duplicates ${e.params.j} and ${e.params.i})`;
                break;
            default:
                // eslint-disable-next-line no-continue
                continue;
        }
        e.message = out;
    }
}
