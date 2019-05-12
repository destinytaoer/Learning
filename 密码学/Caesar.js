// 凯撒密码，移位密码
// 这里只针对字母，可以往明密文空间里增加字段

/**
 * caesar: 凯撒密码加解密
 *
 * @parameter
 *   m [String] 明文或密文
 *   flag [Boolean] 加密或解密的标志位，默认 false，加密
 *
 * @return
 *   [String]: 密文或明文
 *
 * by destiny on 2018.12.03
 */
function caesar(m, flag=false) {
  const K = 'abcdefghijklmnopqrstuvwsyz', // 明密文空间
    Len = K.length
  
  let result = ''
  for (let char of m) {
    let index = K.indexOf(char)
    let code = flag ? (index - 3) % Len : (index + 3) % Len
    result += K[code]
  }
  return result
}

// let str = 'sdlfgkusdogohda'
// let c = caesar(str)
// let m = caesar(c, true)

// console.log(str);
// console.log(c);
// console.log(m);