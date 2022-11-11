import { ElMessage } from 'element-plus';

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
    ElMessage.error('无复制内容');
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
    ElMessage.success('复制成功');
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
