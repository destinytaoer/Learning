const fs = require('fs');
const path = require('path');
const util = require('util');
const mkdirp = require('mkdirp');
module.exports = function(session) {
  let Store = session.Store;
  function FileStore(opts) {
    Store.call(this);
    let {
      root // 存放 session 文件的根目录
    } = opts;
    this.root = root;
    mkdirp.sync(root); // 递归创建目录
  }
  util.inherits(FileStore, Store);

  FileStore.prototype.resolve = function(sid) {
    return path.join(this.root, sid + '.json');
  };
  FileStore.prototype.set = function(sid, session, callback) {
    fs.writeFile(this.resolve(sid), JSON.stringify(session), callback);
  };
  FileStore.prototype.get = function(sid, callback) {
    fs.readFile(this.resolve(sid), 'utf8', function(err, data) {
      if (err) callback(err);
      data = JSON.parse(data);
      callback(null, data);
    });
  };
  FileStore.prototype.destory = function(sid, callback) {
    fs.unlink(this.resolve(sid), callback);
  };
  return FileStore;
};
