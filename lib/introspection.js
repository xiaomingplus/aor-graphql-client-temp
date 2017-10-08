'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filterTypesByIncludeExclude = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['', ''], ['', '']);

var _graphql = require('graphql');

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterTypesByIncludeExclude = exports.filterTypesByIncludeExclude = function filterTypesByIncludeExclude(_ref) {
    var include = _ref.include,
        exclude = _ref.exclude;

    if (include) {
        if (Array.isArray(include)) {
            return function (type) {
                return include.includes(type.name);
            };
        }

        if (typeof include === 'function') {
            return function (type) {
                return include(type);
            };
        }
    }

    if (exclude) {
        if (Array.isArray(exclude)) {
            return function (type) {
                return !exclude.includes(type.name);
            };
        }

        if (typeof exclude === 'function') {
            return function (type) {
                return !exclude(type);
            };
        }
    }

    return function () {
        return true;
    };
};

/**
 * @param {ApolloClient} client The Apollo client
 * @param {Object} options The introspection options
 */

exports.default = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(client, options) {
        var schema, queries, types, isResource, buildResource, potentialResources, filteredResources, resources;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!options.schema) {
                            _context.next = 4;
                            break;
                        }

                        _context.t0 = options.schema;
                        _context.next = 7;
                        break;

                    case 4:
                        _context.next = 6;
                        return client.query({ query: (0, _graphqlTag2.default)(_templateObject, _graphql.introspectionQuery) }).then(function (_ref3) {
                            var __schema = _ref3.data.__schema;
                            return __schema;
                        });

                    case 6:
                        _context.t0 = _context.sent;

                    case 7:
                        schema = _context.t0;
                        queries = schema.types.reduce(function (acc, type) {
                            if (type.name !== 'Query' && type.name !== 'Mutation') return acc;

                            return [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(type.fields));
                        }, []);
                        types = schema.types.filter(function (type) {
                            return type.name !== 'Query' && type.name !== 'Mutation';
                        });
                        // console.log('options',options.operationNames);

                        isResource = function isResource(type) {
                            return queries.some(function (query) {
                                // console.log('query', query.name,options.operationNames[GET_LIST](type));
                                // console.log('query',options.operationNames[GET_ONE](type));
                                return query.name === options.operationNames[_constants.GET_LIST](type);
                            }) && queries.some(function (query) {
                                return query.name === options.operationNames[_constants.GET_ONE](type);
                            });
                        };

                        buildResource = function buildResource(type) {
                            return _constants.ALL_TYPES.reduce(function (acc, aorFetchType) {
                                return (0, _extends4.default)({}, acc, (0, _defineProperty3.default)({}, aorFetchType, queries.find(function (query) {
                                    return query.name == options.operationNames[aorFetchType](type);
                                })));
                            }, { type: type });
                        };
                        // console.log('types',types)


                        potentialResources = types.filter(isResource);
                        // console.log('potentialResources',potentialResources);

                        filteredResources = potentialResources.filter(filterTypesByIncludeExclude(options));
                        resources = filteredResources.map(buildResource);
                        // console.log('resources',resources)

                        return _context.abrupt('return', {
                            types: types,
                            queries: queries,
                            resources: resources
                        });

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref2.apply(this, arguments);
    };
}();