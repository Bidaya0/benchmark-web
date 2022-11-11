export default (isRegister = false, href = window.location.href, registerCode = '') => {
  let origin = '';
  switch (window.location.origin) {
    case 'https://dev-asr.huoxian.cn':
      origin = 'https://sso-test.huoxian.cn';
      break;
    case 'https://pre-asr.huoxian.cn':
      origin = 'https://sso-pre.huoxian.cn';
      break;
    case 'http://pre-asr.huoxian.cn':
      origin = 'https://sso-pre.huoxian.cn';
      break;
    case 'https://asr.huoxian.cn':
      origin = 'https://sso.huoxian.cn';
      break;
    case 'https://cloud.huoxian.cn':
      origin = 'https://sso.huoxian.cn';
      break;
    case 'http://cloud.huoxian.cn':
      origin = 'https://sso.huoxian.cn';
      break;
    default:
      location.replace(window.location.origin);
      return;
  }
  const url = encodeURIComponent(href);
  window.location.href = `${origin}/login?client_id=mb3hxMurPRcucctWBLAoBn${isRegister ? '&isRegister=1' : ''}${registerCode ? `&registerCode=${registerCode}` : ''}&redirect_url=${url}`;
};
