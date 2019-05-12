function rc4(data, key) {
  var N = 256; // 密钥空间大小 
  var S = []; // 大密钥空间
  var das = []; // 明文/密文的序列，字符串 -> 数字
  var k = []; // 源密钥序列，由 key 重复组成 256 长度的密钥序列

  var i = 0,
    j = 0;
  // 初始化 S 和获取密钥序列
  for (i = 0; i < N; i++) {
    S[i] = i; // 初始 S

    k[i] = key.charCodeAt(i % key.length)
  }

  // S 被密钥 key 搅乱
  for (i = 0; i < N; i++) {
    // 通过 i 遍历 S，通过 j 随机搅乱 S，完成对 S 的随机搅乱
    j = (j + S[i] + k[i]) % N;
    var temp = S[i];
    S[i] = S[j];
    S[j] = temp;
  }

  // 获取明文/密文序列，字符串 -> 数字
  for (i = 0; i < data.length; i++) {
    das[i] = data.charCodeAt(i)
  }
  i = 0;
  j = 0;
  // 遍历明文/密文序列，进行每一位对应一个密钥的加密
  for (var x = 0; x < das.length; x++) {

    // 不同的 S 在经过伪随机子密码生成算法的处理后可以得到不同的子密钥
    i = (i + 1) % N;
    j = (j + S[i]) % N;
    var temp = S[i];
    S[i] = S[j];
    S[j] = temp;

    var index = (S[i] + S[j]) % N;

    // 加密/解密操作，使用的密钥是 S[k]，通过数字的异或来完成
    das[x] = String.fromCharCode(das[x] ^ S[index]) // 由数字变为字符串
  }

  return das.join('');// 返回字符串明文/密文
}

var data = 'ShenzhenUniversity',
  key = 'abcde';

var c = rc4(data, key)

var m = rc4(c, key)

console.log(c, m, data);
