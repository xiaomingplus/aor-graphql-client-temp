import { introspectionQuery } from 'graphql';
import gql from 'graphql-tag';

import { GET_LIST, GET_ONE, ALL_TYPES } from './constants';

export const filterTypesByIncludeExclude = ({ include, exclude }) => {
    if (include) {
        if (Array.isArray(include)) {
            return type => include.includes(type.name);
        }

        if (typeof include === 'function') {
            return type => include(type);
        }
    }

    if (exclude) {
        if (Array.isArray(exclude)) {
            return type => !exclude.includes(type.name);
        }

        if (typeof exclude === 'function') {
            return type => !exclude(type);
        }
    }

    return () => true;
};

/**
 * @param {ApolloClient} client The Apollo client
 * @param {Object} options The introspection options
 */
export default async (client, options) => {
    const schema = options.schema
        ? options.schema
        : await client.query({ query: gql`${introspectionQuery}` }).then(({ data: { __schema } }) => __schema);

    const queries = schema.types.reduce((acc, type) => {
        if (type.name !== 'Query' && type.name !== 'Mutation') return acc;

        return [...acc, ...type.fields];
    }, []);

    const types = schema.types.filter(type => type.name !== 'Query' && type.name !== 'Mutation');
    // console.log('options',options.operationNames);
    const isResource = type =>{
        return  queries.some(query => {
            // console.log('query', query.name,options.operationNames[GET_LIST](type));
            // console.log('query',options.operationNames[GET_ONE](type));
            return query.name === options.operationNames[GET_LIST](type);
        }) &&
        queries.some(query => query.name === options.operationNames[GET_ONE](type));
    }
       

    const buildResource = type =>
        ALL_TYPES.reduce(
            (acc, aorFetchType) => ({
                ...acc,
                [aorFetchType]: queries.find(query => query.name == options.operationNames[aorFetchType](type)),
            }),
            { type },
        );
    // console.log('types',types)
    const potentialResources = types.filter(isResource);
    // console.log('potentialResources',potentialResources);
    const filteredResources = potentialResources.filter(filterTypesByIncludeExclude(options));
    const resources = filteredResources.map(buildResource);
        // console.log('resources',resources)
    return {
        types,
        queries,
        resources,
    };
};
