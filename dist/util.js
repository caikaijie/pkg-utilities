'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileExists = exports.move = exports.remove = exports.readJson = exports.emptyDir = exports.mkdirp = exports.copy = exports.stat = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var fileExists = exports.fileExists = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(path) {
    var stats;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return stat(path);

          case 2:
            stats = _context.sent;
            return _context.abrupt('return', stats.isFile());

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function fileExists(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.spawn = spawn;
exports.packageNpmRun = packageNpmRun;

var _child_process = require('child_process');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _es6Promisify = require('es6-promisify');

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stat = exports.stat = (0, _es6Promisify2.default)(_fs2.default.stat);
var copy = exports.copy = (0, _es6Promisify2.default)(_fsExtra2.default.copy);
var mkdirp = exports.mkdirp = (0, _es6Promisify2.default)(_fsExtra2.default.mkdirp);
var emptyDir = exports.emptyDir = (0, _es6Promisify2.default)(_fsExtra2.default.emptyDir);
var readJson = exports.readJson = (0, _es6Promisify2.default)(_fsExtra2.default.readJson);
var remove = exports.remove = (0, _es6Promisify2.default)(_fsExtra2.default.remove);
var move = exports.move = (0, _es6Promisify2.default)(_fsExtra2.default.move);

function spawn(command, args, options) {
  var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

  var childProcess = (0, _child_process.spawn)(command, args, (0, _extends3.default)({
    env: process.env,
    stdio: 'inherit',
    detached: false
  }, options));
  childProcess.on('close', function (code) {
    if (code !== 0) {
      cb(new Error('Exit status ' + code));
    } else {
      cb();
    }
  });
  childProcess.on('error', cb);
  return childProcess;
}

function packageNpmRun(packageName, npmCommand, cb) {
  return spwan('npm', npmCommand.split(' '), { cwd: 'packages/' + packageName }, cb);
}