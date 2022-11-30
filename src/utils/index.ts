import { ElMessage } from 'element-plus';
import moment from 'moment';

export const enformatDate = (time: number) => {
  const d = new Date(time);
  return moment(d).format('MM DD, YYYY')
};
export const enformatDate1 = (time: number) => {
  const d = new Date(time);
  return moment(d).format('MM-DD')
};
export const enformatTime = (time: number) => {
  const d = new Date(time);
  return moment(d).format('MMM DD, YYYY, H:mm:ss A')
};

export const formatDate = (time: number) => {
  const addZero = (m: number) => (m < 10 ? `0${m}` : m);
  if ((`${time}`).length === 10) {
    time *= 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  return (
    `${d.getFullYear()}.${addZero(d.getMonth() + 1)}.${addZero(d.getDate())}`
  );
};
export const format = (time: number) => {
  const day = Math.floor(time / (1000 * 60 * 60 * 24))
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((time / (1000 * 60)) % 60)
  const seconds = Math.floor((time / 1000) % 60)
  return `${day ? `${day}d` : ''}${hours ? `${hours}h` : ''}${minutes ? `${minutes}m` : ''}${seconds}s`
}
export const differenceTime = (time: any, nextTime?:any) => {
  let leftTime = new Date().getTime() - new Date(time).getTime(); // 计算剩余的毫秒数
  if (nextTime) {
    leftTime = new Date(nextTime).getTime() - new Date(time).getTime();
  }
  if (leftTime <= 0) leftTime = 0;
  const minutes = Math.floor(leftTime / 1000 / 60);// 计算剩余的分钟
  const seconds = Math.floor(leftTime / 1000 % 60);// 计算剩余的秒数
  return minutes ? `${minutes}m ${seconds}` : `${seconds}`
}

export const formatDate2 = (time: number) => {
  const addZero = (m: number) => (m < 10 ? `0${m}` : m);
  if ((`${time}`).length === 10) {
    time *= 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  return (
    `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(d.getDate())}`
  );
};

export function formatTime(time: number) {
  const addZero = (m: number) => (m < 10 ? `0${m}` : m);
  if ((`${time}`).length === 10) {
    time *= 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  return (
    `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(d.getDate())} ${addZero(d.getHours())}:${addZero(d.getMinutes())}:${addZero(d.getSeconds())}`
  );
}

export function formatMinute(time: number) {
  const addZero = (m: number) => (m < 10 ? `0${m}` : m);
  if ((`${time}`).length === 10) {
    time *= 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  return (
    `${d.getFullYear()}.${addZero(d.getMonth() + 1)}.${addZero(d.getDate())} ${addZero(d.getHours())}:${addZero(d.getMinutes())}`
  );
}

export const msgCopy = (value: string) => {
  if (!value) {
    ElMessage.error('No copy content');
    return;
  }
  // 动态创建 textarea 标签
  const textarea = document.createElement('textarea');
  // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
  textarea.readOnly = true;
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  // 将要 copy 的值赋给 textarea 标签的 value 属性
  textarea.value = value;
  // 将 textarea 插入到 body 中
  document.body.appendChild(textarea);
  // 选中值并复制
  textarea.select();
  // textarea.setSelectionRange(0, textarea.value.length);
  const result = document.execCommand('Copy');
  if (result) {
    ElMessage.success('Copy succeeded');
  }
  document.body.removeChild(textarea);
};

// 数字转换成单位数 120000 => 10万 120001 => 10万+
export const transformNum = (value: number): string => {
  if (isNaN(value)) {
    return '';
  }
  const val = value;
  if (val < 1000) {
    return val.toString();
  }
  let fr = 1000;
  let num = 4;
  let unit = '千';
  while (val / fr >= 1) {
    if (val / fr < 10) {
      break;
    }
    fr *= 10;
    num += 1;
  }
  switch (num) {
    case 4:
      unit = '千';
      break;
    case 5:
      unit = '万';
      break;
    case 6:
      unit = '0万';
      break;
    case 7:
      unit = '00万';
      break;
    case 8:
      unit = '000万';
      break;
    case 9:
      unit = '亿';
      break;
    case 10:
      unit = '0亿';
      break;
    case 11:
      unit = '00亿';
      break;
    case 12:
      unit = '000亿';
      break;
    default:
      break;
  }
  return `${Math.floor(val / fr)}${unit}${val % fr > 0 ? '' : ''}`;
};

// 处理字符串中的html标签，用于v-html高亮过滤
export const escapeHtml = (str:string) => {
  const temp = document.createElement('div');
  (temp.textContent != null) ? (temp.textContent = str) : (temp.innerText = str)
  const output = temp.innerHTML
  // temp = null
  return output
    .replace(/@huoqi-highlighted-field@/g, '<em class="asr-highlight-em">')
    .replace(/@\/huoqi-highlighted-field@/g, '</em>') || ''
}

// 首字母大写
export const titleCase = (str:any) => {
  const strArr = str.split(' ');
  for (let i = 0; i < strArr.length; i++) {
    strArr[i] = strArr[i].substring(0, 1).toUpperCase() + strArr[i].toLowerCase().substring(1)
  }
  return strArr.join(' ');
}

// 邮箱校验
export const emailCheck = (emailStr:string) => {
  // const emailPat = /^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  const emailPat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,})+$/;
  const matchArray = emailPat.test(emailStr);
  return matchArray;
}

// 根据字母返回颜色
export const bgcolor = (str:string) => {
  const colorList = ['#F77234', '#0FC6C2', '#F7BA1E', '#3491FA', '#FADC19', '#D91AD9', '#9FDB1D', '#CB1E83']
  // const a = str.charCodeAt(0)
  const b = Math.floor(str.charCodeAt(0) % colorList.length)
  return colorList[b]
}
// 动态传参params 导致路径错误的处理
export const getAssetsFile = (url: string) => new URL(`../assets/images/${url}`, import.meta.url).href
