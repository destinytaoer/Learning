/**
 * 实现一个 WriteStream 可写流
 */
let fs = require('fs');
let EventEmitter = require('events');
class WriteStream extends EventEmitter {
  constructor(path, opts) {
    super(path, opts);
    this.path = path;
    this.fd = opts.fd || null;
    this.flags = opts.flags || 'w';
    this.mode = opts.mode || 0o666;
    this.start = opts.start || 0;
    this.encoding = opts.encoding || 'utf8';
    this.autoClose = opts.autoClose || true;
    this.highWaterMark = opts.highWaterMark || 16 * 1024;

    this.pos = this.start; // 记录写入的位置

    this.writing = false;
    this.length = 0; // 缓存区数据的长度，字节数

    this.buffers = []; // 缓存区，实际是一个链表，这里用数组代替

    this.open();
  }
  open() {
    if (!this.fd) {
      fs.open(this.path, this.flags, this.mode, (err, fd) => {
        this.fd = fd;
        if (err) {
          this.autoClose && this.destory();
          return this.emit('err', err);
        }
        this.emit('open');
      });
    }
  }
  write(chunk, encoding, cb) {
    if (typeof encoding === 'function') {
      cb = encoding;
      encoding = 'utf8';
    }
    // 转化为 buffer
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding);
    this.length += chunk.length; // 缓存区的长度加上当前写入的长度
    // 判断是否超过最高水位线
    let ret = this.length < this.highWaterMark;
    // 如果底层正在写入数据，则必须把当前要写入的数据放入缓存区中
    if (this.writing) {
      this.buffers.push({
        chunk,
        encoding,
        cb
      });
    } else {
      // 直接调用底层方法进行写入
      // 在底层写完之后，要清空缓存区
      this.writing = true;
      this._write(chunk, encoding, () => {
        cb && cb();
        this.clearBuffer();
      });
    }
    return ret;
  }
  clearBuffer() {
    let data = this.buffers.shift();
    if (data) {
      this._write(data.chunk, data.encoding, () => {
        // TODO: 回调触发时机和 drain 触发时机
        data.cb && data.cb();
        this.clearBuffer();
      });
    } else {
      this.writing = false; // 必须先重置 writing
      this.emit('drain');
    }
  }
  _write(chunk, encoding, cb) {
    // 如果文件还没有打开就等待文件打开再执行
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this._write(chunk, encoding, cb));
    }
    fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, bytesWritten) => {
      if (err) {
        this.autoClose && this.destory();
        return this.emit('err', err);
      }
      this.pos += bytesWritten;
      this.length -= bytesWritten;
      cb && cb();
    });
  }
  end(chunk, encoding, cb) {
    if (typeof chunk === 'function') {
      cb = chunk;
      chunk = null;
    } else if (typeof encoding === 'function') {
      cb = encoding;
      encoding = 'utf8';
    }
    if (chunk) {
      this.write(chunk, encoding, () => {
        this._end(cb);
      });
    } else {
      if (this.writing) {
        this.on('drain', () => {
          this._end(cb);
        });
      } else {
        this._end(cb);
      }
    }
  }
  _end(cb) {
    cb();
    this.emit('finish');
    this.destory();
  }
  destory() {
    fs.close(this.fd, () => {
      this.emit('close');
    });
  }
}

module.exports = WriteStream;
