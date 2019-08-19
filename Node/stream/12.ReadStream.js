/**
 * 实现 ReadStream
 */
let fs = require('fs');
let EventEmitter = require('events');

class ReadStream extends EventEmitter {
  constructor(path, opts) {
    super(path, opts);
    this.path = path;
    this.fd = opts.fd || null;
    this.flags = opts.flags || 'r';
    this.mode = opts.mode || 0o666;
    this.start = opts.start || 0;
    this.end = opts.end;
    this.encoding = opts.encoding;
    this.autoClose = opts.autoClose || true;
    this.highWaterMark = opts.highWaterMark || 64 * 1024;

    this.pos = this.start; // 记录读取的位置

    this.flowing = null; // 模式的标记，true 为流动模式，false 为暂停模式

    this.length = 0; // 缓存区数据的长度，字节数
    this.buffer = Buffer.alloc(this.highWaterMark); // 并不是缓存区，只是每次读取的固定 Buffer 数

    this.buffers = []; // 这才是真正的缓存区
    this.length = 0;

    this.open(); // 创建流时，立即打开文件
    // 当给实例添加了任意的监听函数时，会触发这个事件
    this.on('newListener', (type, listener) => {
      if (type === 'data') {
        // 监听了 data 之后，如果 flowing 还是初始值，就会变成流动模式，然后开始读文件
        if (this.flowing === null) {
          this.flowing = true;
          this._read();
        }
      }
      if (type === 'readable') {
        this.flowing = false;
        this._read();
      }
    });
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
  read(n) {
    n = n == null ? this.length : n > this.length ? this.length : n;
    if (n < 0) return null;
    let ret = Buffer.alloc(n);
    let index = 0;
    let b;
    // 每次取出缓存区链表的第一个节点
    while (index !== n && null != (b = this.buffers.shift())) {
      for (let i = 0; i < b.length; i++) {
        // 遍历，一个个放入结果中
        ret[index++] = b[i];
        this.length--;
        // 如果已经到达了 n，就退出
        if (index === n) {
          // 如果 b 还有剩余，就放回缓存区中
          b = b.slice(i);
          b.length && this.buffers.unshift(b);
          break;
        }
      }
    }
    if (this.length < this.highWaterMark) {
      this._read();
    }
    return this.encoding ? ret.toString(this.encoding) : ret;
  }
  _read() {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this._read());
    }
    // 还有多少需要读取
    let howMuchToRead = this.end
      ? Math.min(this.end - this.pos + 1, this.highWaterMark)
      : this.highWaterMark;
    fs.read(this.fd, this.buffer, 0, howMuchToRead, this.pos, (err, bytes) => {
      if (err) {
        this.autoClose && this.destory();
        return this.emit('error', err);
      }
      if (bytes) {
        // 截取获取到的 buffer
        let data = this.buffer.slice(0, bytes);
        this.pos += bytes; // 移动位置
        if (!this.flowing) {
          this.buffers.push(data);
          this.length += bytes;
          this.emit('readable');
        }
        data = this.encoding ? data.toString(this.encoding) : data;
        this.emit('data', data);
        if (this.end && this.pos > this.end) {
          // 当前位置已经超过指定的 end 位置了，就结束
          this.endFn();
        } else {
          // 否则是流动模式时就继续读
          if (this.flowing) this._read();
        }
      } else {
        // 没有读取到字节说明已经结束
        this.endFn();
      }
    });
  }
  endFn() {
    this.emit('end');
    this.destory();
  }
  destory() {
    fs.close(this.fd, () => {
      this.emit('close');
    });
  }
  pipe(ws) {
    this.on('data', data => {
      let flag = ws.write(data);
      if (!flag) {
        this.pause();
      }
    });
    ws.on('drain', () => {
      this.resume();
    });
    this.on('end', function() {
      ws.end();
    });
  }
  // 暂停，进入暂停模式
  pause() {
    this.flowing = false;
  }
  // 恢复，进入流动模式，并继续读取
  resume() {
    this.flowing = true;
    this._read();
  }
}

module.exports = ReadStream;
