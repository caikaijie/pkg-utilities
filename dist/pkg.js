'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _tar = require('tar');

var _tar2 = _interopRequireDefault(_tar);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pkg = function () {
  function Pkg() {
    (0, _classCallCheck3.default)(this, Pkg);

    throw new Error('cannot initialize Pkg instance');
  }

  (0, _createClass3.default)(Pkg, null, [{
    key: 'getPkgJson',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(pkgDir) {
        var pkgJsonFile, pkgJson;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pkgJsonFile = _path2.default.resolve(pkgDir, './package.json');
                // TODO: readJson failed?

                _context.next = 3;
                return (0, _util.readJson)(pkgJsonFile);

              case 3:
                pkgJson = _context.sent;

                if (pkgJson.name) {
                  _context.next = 6;
                  break;
                }

                throw new Error('Invalid package.json (name not found): ' + pkgJsonFile);

              case 6:
                return _context.abrupt('return', pkgJson);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getPkgJson(_x) {
        return _ref.apply(this, arguments);
      }

      return getPkgJson;
    }()

    //TODO: https://github.com/npm/npm/wiki/Files-and-Ignores

  }, {
    key: 'copyFiles',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(files, pkgDir, destDir) {
        var _ref3 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
            logger = _ref3.logger;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', _promise2.default.all(files.map(function (item) {
                  return {
                    src: _path2.default.resolve(pkgDir, item),
                    dest: _path2.default.resolve(destDir, item)
                  };
                }).map(function (t) {
                  if (logger) {
                    logger.info('copying ' + t.src + ' to ' + t.dest);
                  }
                  return t;
                }).map(function (_ref4) {
                  var src = _ref4.src,
                      dest = _ref4.dest;
                  return (0, _util.copy)(src, dest, { errorOnExist: true });
                })));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function copyFiles(_x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return copyFiles;
    }()
  }, {
    key: 'removeFiles',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(destDir, files, _ref6) {
        var logger = _ref6.logger;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', _promise2.default.all(files.map(function (item) {
                  return _path2.default.resolve(destDir, item);
                }).map(function (item) {
                  if (logger) {
                    logger.info('removing ' + item);
                  }
                  return item;
                }).map(function (item) {
                  return (0, _util.remove)(item);
                })));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function removeFiles(_x6, _x7, _x8) {
        return _ref5.apply(this, arguments);
      }

      return removeFiles;
    }()
  }, {
    key: 'moveToDir',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(dir, item, destDir) {
        var _ref8 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
            logger = _ref8.logger;

        var src, dest;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                src = _path2.default.resolve(dir, item);
                dest = _path2.default.resolve(dir, destDir, _path2.default.basename(item));

                if (logger) {
                  logger.info('moving ' + src + ' to ' + dest);
                }
                return _context4.abrupt('return', (0, _util.move)(src, dest));

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function moveToDir(_x9, _x10, _x11) {
        return _ref7.apply(this, arguments);
      }

      return moveToDir;
    }()
  }, {
    key: 'fileExists',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(path) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', (0, _util.fileExists)(path));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function fileExists(_x13) {
        return _ref9.apply(this, arguments);
      }

      return fileExists;
    }()
  }, {
    key: 'archiveDir',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(dir) {
        var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref11$removeWhenSucc = _ref11.removeWhenSuccess,
            removeWhenSuccess = _ref11$removeWhenSucc === undefined ? false : _ref11$removeWhenSucc;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _tar2.default.c({
                  gzip: true,
                  file: dir + '.tgz'
                }, [dir]);

              case 2:
                if (!removeWhenSuccess) {
                  _context6.next = 5;
                  break;
                }

                _context6.next = 5;
                return (0, _util.remove)(dir);

              case 5:
                return _context6.abrupt('return');

              case 6:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function archiveDir(_x14) {
        return _ref10.apply(this, arguments);
      }

      return archiveDir;
    }()
  }, {
    key: 'runCommad',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(command, cwd) {
        var parts, _parts, c, args;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                parts = command.split(' ');

                if (!(parts.length < 1 || !parts[0])) {
                  _context7.next = 3;
                  break;
                }

                throw new Error('Invalid command: ' + command);

              case 3:
                _parts = (0, _toArray3.default)(parts), c = _parts[0], args = _parts.slice(1);
                return _context7.abrupt('return', new _promise2.default(function (resolve, reject) {
                  (0, _util.spwan)(c, args, { cwd: cwd }, function (err) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve();
                    }
                  });
                }));

              case 5:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function runCommad(_x16, _x17) {
        return _ref12.apply(this, arguments);
      }

      return runCommad;
    }()
  }, {
    key: 'start',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(_ref14, ctx) {
        var pkgDir = _ref14.pkgDir,
            destDir = _ref14.destDir,
            actions = _ref14.actions,
            _ref14$archive = _ref14.archive,
            archive = _ref14$archive === undefined ? true : _ref14$archive,
            _ref14$deleteWhenSucc = _ref14.deleteWhenSuccessArchive,
            deleteWhenSuccessArchive = _ref14$deleteWhenSucc === undefined ? true : _ref14$deleteWhenSucc;

        var pkgJson, prefix, abPkgDir, abDestDir, logger, pkgCtx, cwd, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, action;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return Pkg.getPkgJson(pkgDir);

              case 2:
                pkgJson = _context8.sent;
                prefix = '[Pkg(' + pkgJson.name + ')]';
                abPkgDir = _path2.default.resolve('./', pkgDir);
                abDestDir = _path2.default.resolve('./', destDir);
                logger = {
                  info: function info(msg) {
                    console.log(prefix, msg);
                  }
                };
                pkgCtx = {
                  pkgDir: abPkgDir,
                  workDir: _path2.default.resolve(abDestDir, pkgJson.name),
                  logger: logger
                };
                _context8.next = 10;
                return (0, _util.remove)(pkgCtx.workDir);

              case 10:
                _context8.next = 12;
                return (0, _util.mkdirp)(pkgCtx.workDir);

              case 12:
                cwd = process.cwd();

                logger.info(cwd);
                _context8.prev = 14;

                logger.info('start packaging: ' + pkgCtx.pkgDir + ' ===> ' + pkgCtx.workDir);
                logger.info('entering working directory: ' + pkgCtx.workDir);
                process.chdir(pkgCtx.workDir);
                logger.info('starting package actions');
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context8.prev = 22;
                _iterator = (0, _getIterator3.default)(actions);

              case 24:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context8.next = 35;
                  break;
                }

                action = _step.value;

                if (!(typeof action === 'function')) {
                  _context8.next = 31;
                  break;
                }

                _context8.next = 29;
                return action(pkgCtx, ctx);

              case 29:
                _context8.next = 32;
                break;

              case 31:
                throw new Error('Invalid action: ' + action);

              case 32:
                _iteratorNormalCompletion = true;
                _context8.next = 24;
                break;

              case 35:
                _context8.next = 41;
                break;

              case 37:
                _context8.prev = 37;
                _context8.t0 = _context8['catch'](22);
                _didIteratorError = true;
                _iteratorError = _context8.t0;

              case 41:
                _context8.prev = 41;
                _context8.prev = 42;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 44:
                _context8.prev = 44;

                if (!_didIteratorError) {
                  _context8.next = 47;
                  break;
                }

                throw _iteratorError;

              case 47:
                return _context8.finish(44);

              case 48:
                return _context8.finish(41);

              case 49:
                if (!archive) {
                  _context8.next = 54;
                  break;
                }

                logger.info('start archiving');
                process.chdir(abDestDir);
                _context8.next = 54;
                return Pkg.archiveDir(pkgJson.name, { removeWhenSuccess: deleteWhenSuccessArchive });

              case 54:
                _context8.prev = 54;

                logger.info('leaving working directory: ' + pkgCtx.workDir);
                process.chdir(cwd);
                return _context8.finish(54);

              case 58:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[14,, 54, 58], [22, 37, 41, 49], [42,, 44, 48]]);
      }));

      function start(_x18, _x19) {
        return _ref13.apply(this, arguments);
      }

      return start;
    }()
  }]);
  return Pkg;
}();

exports.default = Pkg;