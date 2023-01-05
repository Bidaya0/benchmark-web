import { ElMessage } from 'element-plus';
import moment from 'moment';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

export const enformatDate = (time: number) => {
  if ((`${time}`).length === 10) {
    time *= 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  return moment(d).format('YYYY MM DD')
};
export const enformatDate1 = (time: number) => {
  if ((`${time}`).length === 10) {
    time *= 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  return moment(d).format('m[m]:s[s]')
};
export const enformatTime = (time: number) => {
  const d = new Date(time);
  return moment(d).format('MMM DD, YYYY, H:mm:ss A')
};
export const handlePrint = (id: any, isPrint: any) => {
  const dom: HTMLElement | null = document.getElementById(id);
  // let targetDom: any = pdfs.current;
  // 获取节点高度，后面为克隆节点设置高度。
  // let height = targetDom?.height;
  // // 克隆节点，默认为false，不复制方法属性，为true是全部复制。
  // let cloneDom = targetDom?.cloneNode(true);
  // // 设置克隆节点的css属性，因为之前的层级为0，我们只需要比被克隆的节点层级低即可。
  // cloneDom.style.backgroundColor = 'red';
  // cloneDom.style.position = 'absolute';
  // cloneDom.style.top = '0px';
  // cloneDom.style.index = '-1';
  // cloneDom.style.height = height;
  // // 将克隆节点动态追加到body后面。
  // document.getElementById('pdf-con')?.appendChild(cloneDom);
  // 插件生成base64img图片。
  html2canvas(dom as HTMLElement, {
    useCORS: true,
    // 画布开始渲染的y坐标位置
    y: 0,
  }).then((canvas:any) => {
    // console.log('canvas', canvas);
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;
    // 一页pdf显示html页面生成的canvas高度;
    const pageHeight = (contentWidth / 700) * 841.89;
    // 未生成pdf的html页面高度
    let leftHeight = contentHeight;
    // 页面偏移
    let position = 0;
    // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    const imgWidth = 700;
    const imgHeight = (700 / contentWidth) * contentHeight;
    const pageData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new JsPDF(undefined, 'pt', 'a4');
    // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    // 当内容未超过pdf一页显示的范围，无需分页
    console.log(pageHeight, leftHeight, imgWidth, imgHeight, 'less')
    if (leftHeight < pageHeight) {
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
    } else {
      while (leftHeight > 0) {
        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        // 避免添加空白页
        position -= 841.89;
        if (leftHeight > 0) {
          pdf.addPage();
        }
      }
    }
    const nowDate = moment(new Date()).format('YYYY-MM-DD');
    if (isPrint) {
      // 打印
      pdf.autoPrint();
      pdf.output('dataurlnewwindow');
    } else {
      // 下载
      pdf.save(`发货单-${nowDate}.pdf`);
    }
  });
};

/**
 * @param  ele          要生成 pdf 的DOM元素（容器）
 * @param  padfName     PDF文件生成后的文件名字
 * */

export const downloadPDF = (ele:any, pdfName:any) => {
  window.scrollTo(0, 0);
  const eleW = ele.offsetWidth; // 获得该容器的宽
  const eleH = ele.offsetHeight; // 获得该容器的高
  const eleOffsetTop = ele.offsetTop; // 获得该容器到文档顶部的距离
  const eleOffsetLeft = ele.offsetLeft; // 获得该容器到文档最左的距离

  const canvas = document.createElement('canvas');
  let abs = 0;

  const win_in = document.documentElement.clientWidth || document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
  const win_out = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）

  if (win_out > win_in) {
    // abs = (win_o - win_i)/2;    // 获得滚动条长度的一半
    abs = (win_out - win_in) / 2; // 获得滚动条宽度的一半
  }
  canvas.width = eleW * 2; // 将画布宽&&高放大两倍
  canvas.height = eleH * 2;

  const context = canvas.getContext('2d');
  (context as any).scale(2, 2);
  (context as any).translate(-eleOffsetLeft - abs, -eleOffsetTop);
  // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
  // translate 的时候，要把这个差值去掉

  html2canvas(ele, {
    dpi: 400,
    scale: 4,
    allowTaint: true, // 允许 canvas 污染， allowTaint参数要去掉，否则是无法通过toDataURL导出canvas数据的
    useCORS: true, // 允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
  } as any).then((canvas:any) => {
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;
    // 一页pdf显示html页面生成的canvas高度;
    const pageHeight = (contentWidth / 595.28) * 841.89;
    // 未生成pdf的html页面高度
    let leftHeight = contentHeight;
    // 页面偏移
    let position = 0;
    // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    const imgWidth = 595.28;
    const imgHeight = (595.28 / contentWidth) * contentHeight;
    const pageData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new JsPDF(undefined, 'pt', 'a4');
    // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    // 当内容未超过pdf一页显示的范围，无需分页

    if (leftHeight < pageHeight) {
      // 在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
      pdf.addImage(pageData, 'JPEG', 10, 10, imgWidth, imgHeight);
    } else {
      // 分页
      while (leftHeight > 10) {
        // console.log(leftHeight)
        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89;
        // 避免添加空白页
        if (leftHeight > 10) {
          pdf.addPage();
        }
      }
    }
    // 可动态生成
    pdf.save(pdfName);
  });
}
export const downloadPDF1 = (ele:any, pdfName:any) => {
  const dom = ele;
  html2canvas(dom, {
    useCORS: true, // 解决网络图片跨域问题
    width: dom.width,
    height: dom.height,
    windowWidth: dom.scrollWidth,
    dpi: window.devicePixelRatio * 4, // 将分辨率提高到特定的DPI 提高四倍
    scale: 4, // 按比例增加分辨率
  }).then((canvas:any) => {
    // eslint-disable-next-line new-cap
    const pdf = new JsPDF('p', 'mm', 'a4'); // A4纸，纵向
    const ctx = canvas.getContext('2d');
    const a4w = 170; const a4h = 257; // A4大小，210mm x 297mm，四边各保留20mm的边距，显示区域170x257
    const imgHeight = Math.floor(a4h * canvas.width / a4w); // 按A4显示比例换算一页图像的像素高度
    let renderedHeight = 0;

    while (renderedHeight < canvas.height) {
      const page = document.createElement('canvas');
      page.width = canvas.width;
      page.height = Math.min(imgHeight, canvas.height - renderedHeight);// 可能内容不足一页

      // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
      (page as any).getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0);
      pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 20, 20, a4w, Math.min(a4h, a4w * page.height / page.width)); // 添加图像到页面，保留10mm边距

      renderedHeight += imgHeight;
      if (renderedHeight < canvas.height) {
        pdf.addPage();// 如果后面还有内容，添加一个空页
      }
      // 预览pdf(这里我用的是事件总线把canvas传递过去展示，达到模拟pdf预览的效果，有用但效果不是很好，有需要的可以自行修改)
      // this.$EventBus.$emit('open-pdf', canvas);
    }
    // 保存文件
    pdf.save(`${pdfName}.pdf`);
  });
}

// import { message } from 'ant-design-vue';
const A4_WIDTH = 592.28;
const A4_HEIGHT = 841.89;
// 将元素转化为canvas元素
// 通过 放大 提高清晰度
// width为内容宽度
async function toCanvas(element:any, width:any) {
  // canvas元素
  const canvas = await html2canvas(element, {
    // allowTaint: true, // 允许渲染跨域图片
    scale: window.devicePixelRatio * 2, // 增加清晰度
    useCORS: true, // 允许跨域
    onrendered(canvas:any) {
      document.body.appendChild(canvas);
    },
  });
  // 获取canavs转化后的宽度
  const canvasWidth = canvas.width;
  // 获取canvas转化后的高度
  const canvasHeight = canvas.height;
  // 高度转化为PDF的高度
  const height = (width / canvasWidth) * canvasHeight;
  // 转化成图片Data
  const canvasData = canvas.toDataURL('image/jpeg', 1.0);
  // console.log(canvasData)
  return { width, height, data: canvasData };
}
/**
 * 生成pdf(A4多页pdf截断问题， 包括页眉、页脚 和 上下左右留空的护理)
 * @param {Object} param
 * @param {HTMLElement} param.element - 需要转换的dom根节点
 * @param {number} [param.contentWidth=550] - 一页pdf的内容宽度，0-592.28
 * @param {string} [param.filename='document.pdf'] - pdf文件名
 * @param {HTMLElement} param.header - 页眉dom元素
 * @param {HTMLElement} param.footer - 页脚dom元素
 */
export async function outputPDF({
  element, contentWidth = 550,
  footer, header, filename = '测试A4分页.pdf',
}:any) {
  if (!(element instanceof HTMLElement)) {
    return;
  }
  // jsPDFs实例
  const pdf = new JsPDF({
    unit: 'pt',
    format: 'a4',
    orientation: 'p',
  });

  // 一页的高度， 转换宽度为一页元素的宽度
  const { width, height, data } = await toCanvas(element, contentWidth);

  // 添加页脚
  async function addHeader(header:any, pdf:any, contentWidth:any) {
    const { height: headerHeight, data: headerData, width: hWidth } = await toCanvas(header, contentWidth);
    pdf.addImage(headerData, 'JPEG', 0, 0, contentWidth, headerHeight);
  }

  // 添加页眉
  async function addFooter(pageNum:any, now:any, footer:any, pdf:any, contentWidth:any) {
    const newFooter = footer.cloneNode(true);
    newFooter.querySelector('.pdf-footer-page').innerText = now;
    newFooter.querySelector('.pdf-footer-page-count').innerText = pageNum;
    document.documentElement.append(newFooter);
    const { height: footerHeight, data: footerData, width: fWidth } = await toCanvas(newFooter, contentWidth);
    pdf.addImage(footerData, 'JPEG', 0, A4_HEIGHT - footerHeight, contentWidth, footerHeight)
  }

  // 添加
  function addImage(_x:any, _y:any, pdf:any, data:any, width:any, height:any) {
    pdf.addImage(data, 'JPEG', _x, _y, width, height);
  }

  // 增加空白遮挡
  function addBlank(x:any, y:any, width:any, height:any, pdf:any) {
    pdf.setFillColor(255, 255, 255);
    pdf.rect(x, y, Math.ceil(width), Math.ceil(height), 'F');
  }

  // 页脚元素 经过转换后在PDF页面的高度
  const { height: tfooterHeight } = await toCanvas(footer, contentWidth)

  // 页眉元素 经过转换后在PDF的高度
  const { height: theaderHeight } = await toCanvas(header, contentWidth);

  // 距离PDF左边的距离，/ 2 表示居中
  const baseX = (A4_WIDTH - contentWidth) / 2; // 预留空间给左边
  // 距离PDF 页眉和页脚的间距， 留白留空
  const baseY = 15;

  // 出去页头、页眉、还有内容与两者之间的间距后 每页内容的实际高度
  const originalPageHeight = (A4_HEIGHT - tfooterHeight - theaderHeight - 2 * baseY);

  // 元素在网页页面的宽度
  const elementWidth = element.offsetWidth;

  // PDF内容宽度 和 在HTML中宽度 的比， 用于将 元素在网页的高度 转化为 PDF内容内的高度， 将 元素距离网页顶部的高度  转化为 距离Canvas顶部的高度
  const rate = contentWidth / elementWidth

  // 每一页的分页坐标， PDF高度， 初始值为根元素距离顶部的距离
  const pages = [rate * getElementTop(element)];

  // 获取元素距离网页顶部的距离
  // 通过遍历offsetParant获取距离顶端元素的高度值
  function getElementTop(element:any) {
    let actualTop = element.offsetTop;
    let current = element.offsetParent;

    while (current && current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  }

  // 遍历正常的元素节点
  function traversingNodes(nodes:any) {
    for (let i = 0; i < nodes.length; ++i) {
      const one = nodes[i];
      // 需要判断跨页且内部存在跨页的元素
      const isDivideInside = one.classList && one.classList.contains('divide-inside');
      // 图片元素不需要继续深入，作为深度终点
      const isIMG = one.tagName === 'IMG';
      // table的每一行元素也是深度终点
      const isTableCol = one.classList && ((one.classList.contains('ant-table-row')));
      // 特殊的富文本元素
      const isEditor = one.classList && (one.classList.contains('editor'));
      // 对需要处理分页的元素，计算是否跨界，若跨界，则直接将顶部位置作为分页位置，进行分页，且子元素不需要再进行判断
      const { offsetHeight } = one;
      // 计算出最终高度
      const offsetTop = getElementTop(one);

      // dom转换后距离顶部的高度
      // 转换成canvas高度
      const top = rate * (offsetTop)

      // 对于需要进行分页且内部存在需要分页（即不属于深度终点）的元素进行处理
      if (isDivideInside) {
        // 执行位置更新操作
        updatePos(rate * offsetHeight, top, one);
        // 执行深度遍历操作
        traversingNodes(one.childNodes);
      } else if (isTableCol || isIMG) {
        // 对于深度终点元素进行处理
        // dom高度转换成生成pdf的实际高度
        // 代码不考虑dom定位、边距、边框等因素，需在dom里自行考虑，如将box-sizing设置为border-box
        updatePos(rate * offsetHeight, top, one);
      } else if (isEditor) {
        // 执行位置更新操作
        updatePos(rate * offsetHeight, top, one);
        // 遍历富文本节点
        traversingEditor(one.childNodes)
      } else {
        // 对于普通元素，则判断是否高度超过分页值，并且深入
        // 执行位置更新操作
        updateNomalElPos(top)
        // 遍历子节点
        traversingNodes(one.childNodes);
      }
    }
  }

  // 对于富文本元素，观察所得段落之间都是以<p> / <img> 元素相隔，因此不需要进行深度遍历 (仅针对个人遇到的情况)
  function traversingEditor(nodes:any) {
    // 遍历子节点
    for (let i = 0; i < nodes.length; ++i) {
      const one = nodes[i];
      const { offsetHeight } = one;
      const offsetTop = getElementTop(one);
      const top = contentWidth / elementWidth * (offsetTop)
      updatePos(contentWidth / elementWidth * offsetHeight, top, one);
    }
  }

  // 普通元素更新位置的方法
  // 普通元素只需要考虑到是否到达了分页点，即当前距离顶部高度 - 上一个分页点的高度 大于 正常一页的高度，则需要载入分页点
  function updateNomalElPos(top:any) {
    if (top - (pages.length > 0 ? pages[pages.length - 1] : 0) > originalPageHeight) {
      pages.push((pages.length > 0 ? pages[pages.length - 1] : 0) + originalPageHeight);
    }
  }

  // 可能跨页元素位置更新的方法
  // 需要考虑分页元素，则需要考虑两种情况
  // 1. 普通达顶情况，如上
  // 2. 当前距离顶部高度加上元素自身高度 大于 整页高度，则需要载入一个分页点
  const updatePos = async (eheight:any, top:any, one:any) => {
    // 如果高度已经超过当前页，则证明可以分页了
    console.log('one', one)
    if (top - (pages.length > 0 ? pages[pages.length - 1] : 0) >= originalPageHeight) {
      pages.push((pages.length > 0 ? pages[pages.length - 1] : 0) + originalPageHeight);
    } else if ((top + eheight - (pages.length > 0 ? pages[pages.length - 1] : 0) > originalPageHeight) && (top != (pages.length > 0 ? pages[pages.length - 1] : 0))) {
      // 若 距离当前页顶部的高度 加上元素自身的高度 大于 一页内容的高度, 则证明元素跨页，将当前高度作为分页位置
      pages.push(top);
    }
  }

  // 深度遍历节点的方法
  traversingNodes(element.childNodes);
  // 可能会存在遍历到底部元素为深度节点，可能存在最后一页位置未截取到的情况
  if (pages[pages.length - 1] + originalPageHeight < height) {
    pages.push(pages[pages.length - 1] + originalPageHeight);
  }
  // console.log({ pages, contentWidth, width,height })
  // 根据分页位置 开始分页
  for (let i = 0; i < pages.length; ++i) {
    // message.success(`共${pages.length}页， 生成第${i + 1}页`)
    // 根据分页位置新增图片
    addImage(baseX, baseY + theaderHeight - pages[i], pdf, data, width, height);
    // 将 内容 与 页眉之间留空留白的部分进行遮白处理
    addBlank(0, theaderHeight, A4_WIDTH, baseY, pdf);
    // 将 内容 与 页脚之间留空留白的部分进行遮白处理
    addBlank(0, A4_HEIGHT - baseY - tfooterHeight, A4_WIDTH, baseY, pdf);
    // 对于除最后一页外，对 内容 的多余部分进行遮白处理
    if (i < pages.length - 1) {
      // 获取当前页面需要的内容部分高度
      const imageHeight = pages[i + 1] - pages[i];
      // 对多余的内容部分进行遮白
      addBlank(0, baseY + imageHeight + theaderHeight, A4_WIDTH, A4_HEIGHT - (imageHeight), pdf);
    }
    // 添加页眉
    addHeader(header, pdf, A4_WIDTH)
    // 添加页脚
    addFooter(pages.length, i + 1, footer, pdf, A4_WIDTH);

    // 若不是最后一页，则分页
    if (i !== pages.length - 1) {
      // 增加分页
      pdf.addPage();
    }
  }
  return pdf.save(filename)
}

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
