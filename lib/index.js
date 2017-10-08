'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _operationNames;

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.get');

var _lodash4 = _interopRequireDefault(_lodash3);

var _apolloClient = require('apollo-client');

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _buildApolloClient = require('./buildApolloClient');

var _buildApolloClient2 = _interopRequireDefault(_buildApolloClient);

var _constants = require('./constants');

var _introspection = require('./introspection');

var _introspection2 = _interopRequireDefault(_introspection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
    resolveIntrospection: _introspection2.default,
    introspection: {
        operationNames: (_operationNames = {}, (0, _defineProperty3.default)(_operationNames, _constants.GET_LIST, function (resource) {
            return 'all' + (0, _pluralize2.default)(resource.name);
        }), (0, _defineProperty3.default)(_operationNames, _constants.GET_ONE, function (resource) {
            return '' + resource.name;
        }), (0, _defineProperty3.default)(_operationNames, _constants.GET_MANY, function (resource) {
            return 'all' + (0, _pluralize2.default)(resource.name);
        }), (0, _defineProperty3.default)(_operationNames, _constants.GET_MANY_REFERENCE, function (resource) {
            return 'all' + (0, _pluralize2.default)(resource.name);
        }), (0, _defineProperty3.default)(_operationNames, _constants.CREATE, function (resource) {
            return 'create' + resource.name;
        }), (0, _defineProperty3.default)(_operationNames, _constants.UPDATE, function (resource) {
            return 'update' + resource.name;
        }), (0, _defineProperty3.default)(_operationNames, _constants.DELETE, function (resource) {
            return 'delete' + resource.name;
        }), _operationNames),
        exclude: undefined,
        include: undefined
    }
};

var getOptions = function getOptions(options, aorFetchType, resource) {
    if (typeof options === 'function') {
        return options(resource, aorFetchType);
    }

    return options;
};

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(options) {
        var _merge, clientOptions, introspection, resolveIntrospection, buildQueryFactory, _merge$override, override, otherOptions, client, introspectionResults, buildQuery, aorClient;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _merge = (0, _lodash2.default)({}, defaultOptions, options), clientOptions = _merge.client, introspection = _merge.introspection, resolveIntrospection = _merge.resolveIntrospection, buildQueryFactory = _merge.buildQuery, _merge$override = _merge.override, override = _merge$override === undefined ? {} : _merge$override, otherOptions = (0, _objectWithoutProperties3.default)(_merge, ['client', 'introspection', 'resolveIntrospection', 'buildQuery', 'override']);
                        client = clientOptions && clientOptions instanceof _apolloClient.ApolloClient ? clientOptions : (0, _buildApolloClient2.default)(clientOptions);
                        introspectionResults = void 0;

                        if (!introspection) {
                            _context.next = 7;
                            break;
                        }

                        _context.next = 6;
                        return resolveIntrospection(client, introspection);

                    case 6:
                        introspectionResults = _context.sent;

                    case 7:
                        buildQuery = buildQueryFactory(introspectionResults, otherOptions);

                        aorClient = function aorClient(aorFetchType, resource, params) {
                            var overridedbuildQuery = (0, _lodash4.default)(override, resource + '.' + aorFetchType);

                            var _ref2 = overridedbuildQuery ? (0, _extends3.default)({}, buildQuery(aorFetchType, resource, params), overridedbuildQuery(params)) : buildQuery(aorFetchType, resource, params),
                                parseResponse = _ref2.parseResponse,
                                query = (0, _objectWithoutProperties3.default)(_ref2, ['parseResponse']);

                            if (_constants.QUERY_TYPES.includes(aorFetchType)) {
                                var _apolloQuery = (0, _extends3.default)({}, query, getOptions(otherOptions.query, aorFetchType, resource));

                                return client.query(_apolloQuery).then(parseResponse);
                            }

                            var apolloQuery = (0, _extends3.default)({
                                mutation: query.query,
                                variables: query.variables
                            }, getOptions(otherOptions.mutation, aorFetchType, resource));

                            return client.mutate(apolloQuery).then(parseResponse);
                        };

                        aorClient.observeRequest = function (aorFetchType, resource, params) {
                            var _buildQuery = buildQuery(aorFetchType, resource, params),
                                parseResponse = _buildQuery.parseResponse,
                                query = (0, _objectWithoutProperties3.default)(_buildQuery, ['parseResponse']);

                            var apolloQuery = (0, _extends3.default)({}, query, getOptions(otherOptions.watchQuery, aorFetchType, resource));

                            return client.watchQuery(apolloQuery).then(parseResponse);
                        };

                        aorClient.saga = function () {};

                        return _context.abrupt('return', aorClient);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}();