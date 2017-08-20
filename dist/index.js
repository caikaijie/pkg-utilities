'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spawn = exports.Pkg = undefined;

var _util = require('./util');

Object.defineProperty(exports, 'spawn', {
  enumerable: true,
  get: function get() {
    return _util.spawn;
  }
});

var _pkg = require('./pkg');

var _pkg2 = _interopRequireDefault(_pkg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Pkg = _pkg2.default;