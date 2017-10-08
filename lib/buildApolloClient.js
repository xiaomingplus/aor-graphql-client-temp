'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _apolloClient = require('apollo-client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
    if (!options) {
        return new _apolloClient.ApolloClient();
    }

    var uri = options.uri,
        otherOptions = (0, _objectWithoutProperties3.default)(options, ['uri']);


    if (uri) {
        return new _apolloClient.ApolloClient((0, _extends3.default)({}, otherOptions, {
            networkInterface: (0, _apolloClient.createNetworkInterface)({ uri: uri })
        }));
    }

    return new _apolloClient.ApolloClient(options);
};