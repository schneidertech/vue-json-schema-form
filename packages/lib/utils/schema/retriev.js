/**
 * @param schema
 * @param rootSchema
 * @param formData
 * @returns {{properties: *}|{}|{properties: *}|{}|{properties: *}|{additionalProperties}|*|{}|{allOf}}
 * react-jsonschema-form
 *
 * allOfallOfjson-schema-merge-allof
 * lodash json-schema-merge-allofjsonpointer
 * https://github.com/rjsf-team/react-jsonschema-form/blob/master/packages/core/src/utils.js#L621
 */

import findSchemaDefinition from './findSchemaDefinition';
import { intersection } from '../arrayUtils';

import {
    /* guessType,  mergeSchemas, */ isObject, scm
} from '../utils';

// import { getMatchingOption, isValid } from './validate';

//

// export const ADDITIONAL_PROPERTY_FLAG = '__additional_property';

// resolve Schema - dependencies
// https://json-schema.org/understanding-json-schema/reference/object.html#dependencies
/*
export function resolveDependencies(schema, rootSchema, formData) {
    //
    const { dependencies = {} } = schema;
    let { ...resolvedSchema } = schema;
    if ('oneOf' in resolvedSchema) {
        resolvedSchema = resolvedSchema.oneOf[
            getMatchingOption(formData, resolvedSchema.oneOf, rootSchema)
        ];
    } else if ('anyOf' in resolvedSchema) {
        resolvedSchema = resolvedSchema.anyOf[
            getMatchingOption(formData, resolvedSchema.anyOf, rootSchema)
        ];
    }
    return processDependencies(
        dependencies,
        resolvedSchema,
        rootSchema,
        formData
    );
}
*/

//  dependencies
// https://json-schema.org/understanding-json-schema/reference/object.html#dependencies
/*

function processDependencies(
    dependencies,
    resolvedSchema,
    rootSchema,
    formData
) {
    // Process dependencies updating the local schema properties as appropriate.
    for (const dependencyKey in dependencies) {
        // Skip this dependency if its trigger property is not present.
        if (formData[dependencyKey] === undefined) {
            // eslint-disable-next-line no-continue
            continue;
        }
        // Skip this dependency if it is not included in the schema (such as when dependencyKey is itself a hidden dependency.)
        if (
            resolvedSchema.properties
            && !(dependencyKey in resolvedSchema.properties)
        ) {
            // eslint-disable-next-line no-continue
            continue;
        }
        const {
            [dependencyKey]: dependencyValue,
            ...remainingDependencies
        } = dependencies;
        if (Array.isArray(dependencyValue)) {
            resolvedSchema = withDependentProperties(resolvedSchema, dependencyValue);
        } else if (isObject(dependencyValue)) {
            resolvedSchema = withDependentSchema(
                resolvedSchema,
                rootSchema,
                formData,
                dependencyKey,
                dependencyValue
            );
        }
        return processDependencies(
            remainingDependencies,
            resolvedSchema,
            rootSchema,
            formData
        );
    }
    return resolvedSchema;
}
*/

//
// https://json-schema.org/understanding-json-schema/reference/object.html#property-dependencies

/*
function withDependentProperties(schema, additionallyRequired) {
    if (!additionallyRequired) {
        return schema;
    }
    const required = Array.isArray(schema.required)
        ? Array.from(new Set([...schema.required, ...additionallyRequired]))
        : additionallyRequired;
    return { ...schema, required };
}
*/

// schema
// https://json-schema.org/understanding-json-schema/reference/object.html#schema-dependencies
/*
function withDependentSchema(
    schema,
    rootSchema,
    formData,
    dependencyKey,
    dependencyValue
) {
    const { oneOf, ...dependentSchema } = retrieveSchema(
        dependencyValue,
        rootSchema,
        formData
    );
    schema = mergeSchemas(schema, dependentSchema);
    // Since it does not contain oneOf, we return the original schema.
    if (oneOf === undefined) {
        return schema;
    } if (!Array.isArray(oneOf)) {
        throw new Error(`invalid: it is some ${typeof oneOf} instead of an array`);
    }
    // Resolve $refs inside oneOf.
    const resolvedOneOf = oneOf.map(subschema => (subschema.hasOwnProperty('$ref')
        ? resolveReference(subschema, rootSchema, formData)
        : subschema));
    return withExactlyOneSubschema(
        schema,
        rootSchema,
        formData,
        dependencyKey,
        resolvedOneOf
    );
}

function withExactlyOneSubschema(
    schema,
    rootSchema,
    formData,
    dependencyKey,
    oneOf
) {
    // eslint-disable-next-line array-callback-return,consistent-return
    const validSubschemas = oneOf.filter((subschema) => {
        if (!subschema.properties) {
            return false;
        }
        const { [dependencyKey]: conditionPropertySchema } = subschema.properties;
        if (conditionPropertySchema) {
            const conditionSchema = {
                type: 'object',
                properties: {
                    [dependencyKey]: conditionPropertySchema,
                },
            };

            return isValid(conditionSchema, formData);
        }
    });
    if (validSubschemas.length !== 1) {
        console.warn(
            "ignoring oneOf in dependencies because there isn't exactly one subschema that is valid"
        );
        return schema;
    }
    const subschema = validSubschemas[0];
    const {
        // eslint-disable-next-line no-unused-vars
        [dependencyKey]: conditionPropertySchema,
        ...dependentSubschema
    } = subschema.properties;
    const dependentSchema = { ...subschema, properties: dependentSubschema };
    return mergeSchemas(
        schema,
        retrieveSchema(dependentSchema, rootSchema, formData)
    );
}
*/

// resolve Schema - $ref
// https://json-schema.org/understanding-json-schema/structuring.html#using-id-with-ref
function resolveReference(schema, rootSchema, formData) {
    // Retrieve the referenced schema definition.
    const $refSchema = findSchemaDefinition(schema.$ref, rootSchema);
    // Drop the $ref property of the source schema.
    // eslint-disable-next-line no-unused-vars
    const { $ref, ...localSchema } = schema;
    // Update referenced schema definition with local schema properties.
    return retrieveSchema(
        { ...$refSchema, ...localSchema },
        rootSchema,
        formData
    );
}


//  allOf2
function mergeSchemaAllOf(...args) {
    if (args.length < 2) return args[0];

    let preVal = {};
    const copyArgs = [...args];
    while (copyArgs.length >= 2) {
        const obj1 = isObject(copyArgs[0]) ? copyArgs[0] : {};
        const obj2 = isObject(copyArgs[1]) ? copyArgs[1] : {};

        preVal = Object.assign({}, obj1);
        Object.keys(obj2).reduce((acc, key) => {
            const left = obj1[key];
            const right = obj2[key];

            // object
            if (isObject(left) || isObject(right)) {

                // object
                if (isObject(left) && isObject(right)) {
                    acc[key] = mergeSchemaAllOf(left, right);
                } else {
                    //  object
                    const [objTypeData, baseTypeData] = isObject(left) ? [left, right] : [right, left];

                    if (key === 'additionalProperties') {
                        //  true false
                        // {
                        //     additionalProperties: {
                        //         type: 'string',
                        //     },
                        //     additionalProperties: false
                        // }
                        acc[key] = baseTypeData === true ? objTypeData : false; // default false
                    } else {
                        acc[key] = objTypeData;
                    }
                }
                // array
            } else if (Array.isArray(left) || Array.isArray(right)) {

                //
                if (Array.isArray(left) && Array.isArray(right)) {

                    //
                    if (isObject(left[0]) || isObject(right[0])) {
                        throw new Error('');
                    }

                    //
                    const intersectionArray = intersection([].concat(left), [].concat(right));

                    //
                    if (intersectionArray.length <= 0) {
                        throw new Error('');
                    }

                    if (intersectionArray.length === 0 && key === 'type') {
                        //
                        acc[key] = intersectionArray[0];
                    } else {
                        acc[key] = intersectionArray;
                    }
                } else {
                    //  Array
                    //
                    const [arrayTypeData, baseTypeData] = Array.isArray(left) ? [left, right] : [right, left];
                    //
                    if (baseTypeData === undefined) {
                        acc[key] = arrayTypeData;
                    } else {
                        if (!arrayTypeData.includes(baseTypeData)) {
                            throw new Error('');
                        }
                        acc[key] = baseTypeData;
                    }
                }
            } else if (left !== undefined && right !== undefined) {
                //  undefined -  string number boolean...
                if (key === 'maxLength' || key === 'maximum' || key === 'maxItems' || key === 'exclusiveMaximum' || key === 'maxProperties') {
                    acc[key] = Math.min(left, right);
                } else if (key === 'minLength' || key === 'minimum' || key === 'minItems' || key === 'exclusiveMinimum' || key === 'minProperties') {
                    acc[key] = Math.max(left, right);
                } else if (key === 'multipleOf') {
                    //
                    acc[key] = scm(left, right);
                } else {
                    // if (left !== right) {
                    //     throw new Error('');
                    // }
                    acc[key] = left;
                }
            } else {
                // undefined
                acc[key] = left === undefined ? right : left;
            }
            return acc;
        }, preVal);

        //
        copyArgs.splice(0, 2, preVal);
    }

    return preVal;
}

// resolve Schema - allOf
export function resolveAllOf(schema, rootSchema, formData) {
    // allOf item $ref
    const resolvedAllOfRefSchema = {
        ...schema,
        allOf: schema.allOf.map(allOfItem => retrieveSchema(allOfItem, rootSchema, formData)),
    };

    try {
        const { allOf, ...originProperties } = resolvedAllOfRefSchema;
        return mergeSchemaAllOf(originProperties, ...allOf);
    } catch (e) {
        console.error(`allOfallOf: \n${e}`);
        // eslint-disable-next-line no-unused-vars
        const { allOf: errAllOf, ...resolvedSchemaWithoutAllOf } = resolvedAllOfRefSchema;
        return resolvedSchemaWithoutAllOf;
    }
}

// resolve Schema
function resolveSchema(schema, rootSchema = {}, formData = {}) {
    // allOf $refdependencies

    // allOf
    if (schema.hasOwnProperty('allOf')) {
        schema = resolveAllOf(schema, rootSchema, formData);
    }

    // $ref
    if (schema.hasOwnProperty('$ref')) {
        schema = resolveReference(schema, rootSchema, formData);
    }

    // dependencies
    /*
    if (schema.hasOwnProperty('dependencies')) {
        const resolvedSchema = resolveDependencies(schema, rootSchema, formData);
        schema = retrieveSchema(resolvedSchema, rootSchema, formData);
    }
    */

    // additionalProperties
    /*
    const hasAdditionalProperties = schema.hasOwnProperty('additionalProperties') && schema.additionalProperties !== false;
    if (hasAdditionalProperties) {
        return stubExistingAdditionalProperties(
            schema,
            rootSchema,
            formData
        );
    }
    */

    return schema;
}

// formData
// properties[key]
/* function stubExistingAdditionalProperties(
    schema,
    rootSchema = {},
    formData = {}
) {
    // clone the schema so we don't ruin the consumer's original
    schema = {
        ...schema,
        properties: { ...schema.properties },
    };

    Object.keys(formData).forEach((key) => {
        if (schema.properties.hasOwnProperty(key)) {
            // No need to stub, our schema already has the property
            return;
        }

        let additionalProperties;
        if (schema.additionalProperties.hasOwnProperty('$ref')) {
            additionalProperties = retrieveSchema(
                { $ref: schema.additionalProperties.$ref },
                rootSchema,
                formData
            );
        } else if (schema.additionalProperties.hasOwnProperty('type')) {
            additionalProperties = { ...schema.additionalProperties };
        } else {
            additionalProperties = { type: guessType(formData[key]) };
        }

        // The type of our new key should match the additionalProperties value;
        //  schema
        schema.properties[key] = additionalProperties;
        // Set our additional property flag so we know it was dynamically added
        schema.properties[key][ADDITIONAL_PROPERTY_FLAG] = true;
    });

    return schema;
} */

//
export default function retrieveSchema(schema, rootSchema = {}, formData = {}) {
    if (!isObject(schema)) {
        return {};
    }

    return resolveSchema(schema, rootSchema, formData);
}
