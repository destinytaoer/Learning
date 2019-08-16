/**
 * LineReader 传入一个文件路径得到类的实例，然后可以监听它的 newline 事件，当这个行读取器每次读到一行时，就会触发 newline 事件，当读到结束时，就会触发 end 事件
 */
let util = require('util');
let EventEmitter = require('events');
let fs = require('fs');

const NEW_LINE = 0x0a; // \n
const RETURN = 0x0d; // \r

function LineReader(path, encoding) {
  EventEmitter.call(this);
  this.encoding = encoding || 'utf8';
  this._reader = fs.createReadStream(path);
  this.on('newListener', (type, listener) => {
    if (type === 'newLine') {
      let buffers = [];
      this._reader.on('readable', () => {
        let char;
        while (null != (char = this._reader.read(1))) {
          switch (char[0]) {
            case NEW_LINE:
              // 防止缓存区只读到 \r，\n 变成下一次回调的第一个字节
              if (buffers.length) {
                this.emit(
                  'newLine',
                  Buffer.from(buffers).toString(this.encoding)
                );
                buffers.length = 0; // 清空这行的 buffer
              }
              break;
            case RETURN:
              this.emit(
                'newLine',
                Buffer.from(buffers).toString(this.encoding)
              );
              buffers.length = 0;
              // 往后再读一个字节，判断是否是 \n
              let nChar = this._reader.read(1);
              if (nChar != null && nChar[0] !== NEW_LINE) {
                buffers.push(nChar[0]);
              }
              break;
            default:
              buffers.push(char[0]);
          }
        }
      });
      this._reader.on('end', () => {
        // 防止最后一行丢失，因为如果最后一行后面没有换行符，前面读取就不会向外发射 newLine 事件，就导致最后一行丢失
        if (buffers.length) {
          this.emit('newLine', Buffer.from(buffers).toString(this.encoding));
        }
        this.emit('end');
      });
    }
  });
}
util.inherits(LineReader, EventEmitter);
module.exports = LineReader;
