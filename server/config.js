const CONF = {
  port: '5757',
  rootPathname: '',
  qcloudAppId: '1258955082',
  qcloudSecretId: 'AKIDVpxxCHh6hdT5RclNvIQRCm6AybtvlP3y',
  qcloudSecretKey: 'laBWdUKNK5ex0nNhrqfFbjjV2Qis55vX',

  // 微信小程序 App ID
  appId: 'wx0d8e253cdaa9e8b9',

  // 微信小程序 App Secret
  appSecret: 'a6713b4dc9967c8b35c42215d949ab46',

  // 是否使用腾讯云代理登录小程序
  useQcloudLogin: true,

  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'cAuth',
    pass: 'wx0d8e253cdaa9e8b9',
    char: 'utf8mb4'
  },

  cos: {
    /**
     * 地区简称
     * @查看 https://cloud.tencent.com/document/product/436/6224
     */
    region: 'ap-guangzhou',
    // Bucket 名称
    fileBucket: 'qcloudtest',
    // 文件夹
    uploadFolder: ''
  },

  // 微信登录态有效期
  wxLoginExpires: 7200,
  wxMessageToken: 'abcdefgh'
}

module.exports = CONF
