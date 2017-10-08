'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ALL_TYPES = exports.MUTATION_TYPES = exports.QUERY_TYPES = exports.DELETE = exports.UPDATE = exports.CREATE = exports.GET_MANY_REFERENCE = exports.GET_MANY = exports.GET_ONE = exports.GET_LIST = undefined;

var _adminOnRest = require('admin-on-rest');

var GET_LIST = exports.GET_LIST = _adminOnRest.GET_LIST;
var GET_ONE = exports.GET_ONE = _adminOnRest.GET_ONE;
var GET_MANY = exports.GET_MANY = _adminOnRest.GET_MANY;
var GET_MANY_REFERENCE = exports.GET_MANY_REFERENCE = _adminOnRest.GET_MANY_REFERENCE;
var CREATE = exports.CREATE = _adminOnRest.CREATE;
var UPDATE = exports.UPDATE = _adminOnRest.UPDATE;
var DELETE = exports.DELETE = _adminOnRest.DELETE;

var QUERY_TYPES = exports.QUERY_TYPES = [GET_LIST, GET_MANY, GET_MANY_REFERENCE, GET_ONE];
var MUTATION_TYPES = exports.MUTATION_TYPES = [CREATE, UPDATE, DELETE];
var ALL_TYPES = exports.ALL_TYPES = QUERY_TYPES.concat(MUTATION_TYPES);