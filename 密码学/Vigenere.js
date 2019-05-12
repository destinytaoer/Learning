// 维吉尼亚密码，也是一种移位密码，只是移位不是固定的

/**
 * vigenere: 维吉尼亚密码加解密
 *
 * @parameter
 *   m [String] 明文或密文
 *   k [String] 密钥
 *   flag [Boolean] 加密或解密的标志位，默认 false，加密
 *
 * @return
 *   [String]: 密文或明文
 *
 * by destiny on 2018.12.03
 */
function vigenere(m, k, flag=false) {
  const K = 'abcdefghijklmnopqrstuvwsyz', // 明密文空间
    Len = K.length

  k = k.repeat(m.length)

  let result = ''
  for (let i in m) {
    let m_i = K.indexOf(m[i])
    let k_i = K.indexOf(k[i])
    let code = flag ? (m_i - k_i) % Len : (m_i + k_i) % Len
    result += K[code]
  }
  return result
}

let str = 'sdlfgkusdogohda'
let k = 'dfg'
let c = vigenere(str, k)
let m = vigenere(c, k, true)

console.log(str);
console.log(c);
console.log(m);