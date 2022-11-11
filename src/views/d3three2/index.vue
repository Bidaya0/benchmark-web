<template>
  <!--
        d3的使用
          npm install --save-dev d3
          npm install --save-dev @types/d3
      -->
  <div class="tree04">
    <div id="treeRoot" />
  </div>
</template>
<script setup lang="ts">
import {
  onMounted, ref, reactive, computed,
} from 'vue'
import * as d3 from 'd3';
import { companyJson } from './constants';
// 数据源
const svg = ref<any>();
let dirRight;
const forUpward = ref<any>();
let leng;

const toggle = true;
let circlewidth1;
let circlewidth2;
let circlewidth3;
const margin1 = {
  top: 50, right: 20, bottom: -20, left: 0,
};
const d3Obj = reactive<any>({
  container: null, // 容器svg>g
  duration: 750, // 动画持续时间
  scaleRange: [0.2, 4], // container缩放范围
  direction: ['r', 'l'], // 分为左右2个方向
  centralPoint: [0, 0], // 画布中心点坐标x,y
  root: { r: {}, l: {} }, // 左右2块数据源
  rootNodeLength: 0, // 根节点名称长度
  rootName: ['上海天正实业有限', '公司'], // 根节点名称
  textSpace: 15, // 多行文字间距
  themeColor: '#2196F3', // 主色
  nodeSize: [50, 100], // 节点间距(高/水平)
  fontSize: 12, // 字体大小，也是单字所占宽高
  rectMinWidth: 50, // 节点方框默认最小，
  textPadding: 5, // 文字与方框间距,注：固定值5
  circleR: 5, // 圆圈半径
  dirRight: '',
  companyJson: [],
})
const treeMap = computed(() => d3.tree().nodeSize(d3Obj.nodeSize).separation((a, b) => {
  let result = a.parent === b.parent && !a.children && !b.children ? 1 : 2;
  if (result > 1) {
    let length = 0;
    length = a.children ? (length + a.children.length) : length;
    length = b.children ? (length + b.children.length) : length;
    result = length / 2 + 0.5;
  }
  return result;
}));

// 随机数，用于绑定id
const uuid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return (
    `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
  )
}
// 画根节点
const drawRoot = () => {
  const title = d3Obj.container.append('g')
    .attr('id', 'rootTitle')
    .attr('transform', `translate(${d3Obj.centralPoint[1]},${d3Obj.centralPoint[0]})`);
  title.append('svg:rect')
    .attr('class', 'rootTitle')
    .attr('y', 0)
    .attr('x', -d3Obj.rootNodeLength / 2)
    .attr('width', d3Obj.rootNodeLength)
    .attr('height', 0)
    .attr('rx', 5) // 圆角
    .style('fill', d3Obj.themeColor);
  d3Obj.rootName.forEach((name:any, index:any) => {
    title.append('text').attr('fill', 'white')
      .attr('y', index * d3Obj.textSpace - 2)
      .attr('text-anchor', 'middle')
      .text(name);

    const lineHeight = (index + 2) * d3Obj.textSpace;
    // 修改rootTitle rect 的高度
    d3.select('#rootTitle rect').attr('height', lineHeight).attr('y', -lineHeight / 2);
  });
}
const collapse = (d:any, direction:any, obj:any) => {
  if (d.children) {
    // eslint-disable-next-line no-underscore-dangle
    d._children = d.children;
    d.children = null;
  }
  if (obj === 1) {
    update(d, direction);
  }
}
// 数据重组
const DataReor = (d:any, direction:any, source:any, appendData:any) => {
  const setDepth = (node:any, num:any, appendLeaf:any) => {
    // 重新设置depth
    node.depth = num;
    if (node.children && node.children.length) {
      // 遍历children
      node.children.forEach((item:any) => {
        setDepth(item, num + 1, appendLeaf);
      });
    } else {
      appendLeaf.push(node);
    }
  };

  const setHeight = (arr:any, num:any) => {
    // 重新设置height
    const parent:any = [];
    arr.forEach((node:any) => {
      node.height = Math.max(num, node.height);
      if (node.parent && parent.indexOf(node.parent) === -1) {
        parent.push(node.parent);
      }
    });
    if (parent.length) {
      setHeight(parent, num + 1);
    }
  };

  const appendLeaf:any = []; // 增加的叶子节点

  if (appendData.children.length) {
    d.children = [];
    appendData.children.forEach((item:any, index:any) => {
      const newNode = d3.hierarchy(item);
      newNode.parent = d;
      // newNode.height = -1;
      setDepth(newNode, d.depth + 1, appendLeaf);
      d.children.push(newNode);
    });
  }

  if (appendLeaf.length) {
    setHeight(appendLeaf, 0);
  }
  if (source.data.name === '更多') {
    source.parent.descendants().forEach((d) => {
      // eslint-disable-next-line no-underscore-dangle
      d._children = d.children;
      d.id = direction + uuid();
    });
  } else {
    source.descendants().forEach((d) => {
      // eslint-disable-next-line no-underscore-dangle
      d._children = d.children;
      d.id = direction + uuid();
    });
  }
  update(d, direction);
}
const getNode = (d:any, direction:any, source:any, type?:any) => {
  let mynodes;
  // 注释ly---start
  // if (!d.data.isNextNode && d.data.type != -1) {
  //   return;
  // }
  // 注释ly---end
  // console.log("重组数据");
  if (d.data.name === '更多') {
    const num = d.data.val / 5;
    let arr:any;
    if (num <= 5) {
      arr = d.data.childrend;
    } else {
      arr = d.data.childrend.slice(0, d.parent.children.length + 4);
      arr[d.parent.children.length + 4] = {
        nodeName: '更多',
        type: -1,
        val: d.data.childrend.length - d.parent.children.length + 4,
        childrend: d.data.childrend,
      };
    }
    const appendData = {
      children: arr,
    };
    DataReor(d.parent, direction, source, appendData);
  } else if (type === 1) {
    const appendData = {
      children: [],
    };
    DataReor(d, direction, source, appendData);
  } else {
    // 请求数据
    // console.log(d.data, "请求数据参数 update");

    let data:any = [];
    mynodes = data;
    if (data.length > 10) {
      data = data.slice(0, 10);
      data[11] = {
        name: '更多',
        type: -1,
        val: mynodes.length - 10,
        childrend: mynodes.slice(0, mynodes.length),
      };
    }
    const appendData = {
      children: data,
    };
    DataReor(d, direction, source, appendData);
  }
}
const expand = (d:any, direction:any, source:any) => {
  if (d.data.name === '更多') {
    getNode(d, direction, source);
    return;
  }
  // eslint-disable-next-line no-underscore-dangle
  if (d._children) {
    // eslint-disable-next-line no-underscore-dangle
    d.children = d._children;

    // eslint-disable-next-line no-underscore-dangle
    d._children = null;
    update(d, direction);
  }
}
// 点击某个节点ly
const clickNode1 = (d:any, direction:any, source:any) => {
  if (d.children || d.children) {
    collapse(d, direction, 1);
  } else {
    expand(d, direction, source);
  }
}
//   //点击某个节点diagonal
const clickNode = (d:any, direction:any, source:any) => {
  // eslint-disable-next-line no-underscore-dangle
//   if (!d._children && !d.children) { // 无子节点
//     return;
//   }
  // 根据当前节点是否有children来判断是展开还是收缩，true收缩，false展开
  // tree会根据节点内是否有children来向下扩展
  // eslint-disable-next-line no-underscore-dangle
  d.children = d.children ? null : d._children;
  d3.select(`#g${d.id} .node-circle .node-circle-vertical`)
    .transition().duration(d3Obj.duration)
    .attr('stroke-width', d.children ? 0 : 1);// 控制节点伸缩时的标识圆圈

  return clickNode1(d, direction, source);

  // update(d, direction);
}
//   //画文本
const drawText = (id:any, dirRight:any) => {
  dirRight = dirRight > 0;// 右为1，左为-1
  return d3.select(`#${id}`).append('text')
    .attr('y', d3Obj.textPadding)
    .attr('x', (d) => (dirRight ? d3Obj.textPadding : -d3Obj.textPadding))
    .attr('text-anchor', dirRight ? 'start' : 'end')
    .style('font-size', d3Obj.fontSize)
    .text((d:any) => d.data.name);
}
// 子文本颜色配置
const getTsTextColor = (name:any) => {
  switch (name) {
    case '股东':
      return 'darkgray';
    case '供应商':
      return '#FF9800';
    case '合伙人':
      return 'green';
    default:
      return 'black';
  }
}
//   //画子文本
const drawTsText = (id:any, dirRight?:any) => d3.select(`#${id} text`).append('tspan')
  .attr('fill', (d:any) => (d.data.name ? '#fff' : '#999'))
  .attr('y', (d:any) => { if (d.data.ratio) { return d3Obj.textPadding + 8; } })
  .attr('x', (d:any) => {
    if (dirRight > 0) {
      return d3Obj.textPadding;
    }
    return -5;
  })
  .style('font-size', '11px')
  .text((d:any) => d.data.ratio)

const drawTsText1 = (id:any, dirRight:any) => {
  const realw = (document.getElementById(id) as any).getBBox().width + 10;
  return d3.select(`#${id} text`).append('tspan')
    .attr('fill', (d:any) => getTsTextColor(d.parent.data.name))
    .attr('x', dirRight > 0 ? 0 : -realw)
    .attr('y', -d3Obj.textSpace + d3Obj.textPadding - 5)
    .text((d:any) => d.data.value)
}

//   //末 节点 边框颜色
const getRectStorke = (name:any) => {
  switch (name) {
    case '股东':
      return 'green';
    case '供应商':
      return 'skyblue';
    case '合伙人':
      return '#FF9800';
    default:
      return 'gray';
  }
}
// 画方框
const drawRect = (id:any, dirRight:any) => {
  const realw = (document.getElementById(id) as any).getBBox().width + 10;// 获取g实际宽度后，设置rect宽度
  return d3.select(`#${id}`).insert('rect', 'text')
    .attr('x', dirRight > 0 ? 0 : -realw)
    .attr('y', -d3Obj.textSpace + d3Obj.textPadding)
    .attr('width', realw)
    .attr('height', d3Obj.textSpace + d3Obj.textPadding)
    .attr('rx', 2) // 圆角
    .style('stroke', (d:any) => getRectStorke(d.parent.data.name))
    .style('fill', '#ffffff');
}
//   //画连接线
const diagonal = ({ source, target }:any) => {
  const s = source;
  const d = target;
  return `M ${s.y} ${s.x}
        L ${(s.y + d.y) / 2} ${s.x},
        L ${(s.y + d.y) / 2} ${d.x},
        ${d.y} ${d.x}`
}
// 画circle
const drawCircle = (id:any) => {
  const gMark = d3.select(`#${id}`).append('g')
    .attr('class', 'node-circle')
    .attr('stroke', '#ffa500')
    .attr('stroke-width', 1);

  gMark.append('circle')
    .attr('fill', 'none')
    .attr('r', (d:any) => (d.depth === 0 ? 0 : d3Obj.circleR))// 根节点不设置圆圈
    .attr('fill', '#ffffff');
  const padding = d3Obj.circleR - 2;
  gMark.append('path').attr('d', `m -${padding} 0 l ${2 * padding} 0`);// 横线

  gMark.append('path')// 竖线，根据展开/收缩动态控制显示
    .attr('d', `m 0 -${padding} l 0 ${2 * padding}`)
    .attr('stroke-width', 0)
    .attr('class', 'node-circle-vertical');
  return gMark
}
// 画股票代码
const drawCodeText = (d:any, id:any, dirRight:any) => {
  const width = Math.min(d.data.name.length * 14, d3Obj.rectMinWidth);
  return d3
    .select(`#${id} text`)
    .append('tspan')
    .attr('fill', (d) => '#fff')
    .attr('y', (d:any) => {
      if (d.data.ratio) {
        return d3Obj.textPadding + 8;
      }
    })
    .style('font-size', '11px')
    .attr('x', (d:any) => {
      if (dirRight > 0) {
        return d3Obj.textPadding;
      }
      return -5;
    })
    .text((d:any) => `${d.data.name} `)

    .attr('width', width)
}
// marker
// 画箭头
const marker = (d:any, id:any, dirRight:any) => {
  const gMark = d3
    .select(`#${id}`)
    .append('g')
    .attr(
      'transform',
      dirRight > 0 ? 'translate(-20,0)' : 'translate(12,0)',
    );
  return gMark
    .insert('path', 'text')
    .attr('d', () => {
      if (d.data.nodeType === 0 && dirRight > 0) {
        return ('M0,0L0,3L9,0L0,-3Z') as string;
      } if (d.data.nodeType === 0 && dirRight < 0) {
        return ('M0,0L9,-3L9,3Z') as string;
      }
      return ''
    })
    .style('fill', (d:any) => getRectStorke(d.data.name));
}
// 开始绘图
const update = (source:any, direction:any) => {
  const dirRight = direction === 'r' ? 1 : -1;// 方向为右/左
  forUpward.value = direction === 'r';
  const className = `${direction}gNode`;
  const tree = treeMap.value(d3Obj.root[direction]);
  const nodes = tree.descendants();// 返回后代节点数组，第一个节点为自身，然后依次为所有子节点的拓扑排序
  const links = tree.links();// 返回当前 node 的 links 数组, 其中每个 link 定义了 source父节点, target 子节点属性。
  nodes.forEach((d:any) => {
    // 左右2部分，设置以中心点为圆点(默认左上角为远点)
    d.y = dirRight * (d.y + d3Obj.rootNodeLength / 2) + d3Obj.centralPoint[1];
    d.x += d3Obj.centralPoint[0];
  });

  // 根据class名称获取左或者右的g节点，达到分块更新
  const node = d3Obj.container.selectAll(`g.${className}`).data(nodes, (d:any) => d.id);

  // 新增节点，tree会根据数据内的children扩展相关节点
  const nodeEnter = node.enter().append('g')
    .attr('id', (d:any) => `g${d.id}`)
    .attr('class', className)
    .attr('transform', (d:any) => `translate(${source.y0},${source.x0})`)
    .attr('fill-opacity', 0)
    .attr('stroke-opacity', 0)
    .on('click', (event:any, node:any) => {
      node.depth !== 0 && clickNode(node, direction, source);// 根节点不执行点击事件
    });

  nodeEnter.each((d:any) => {
    if (d.depth > 0) { // 非根节点且无子节点
      drawText(`g${d.id}`, dirRight);// 画文本
      if (d.data.name) {
        // drawCodeText(d, `g${d.id}`, dirRight);
      }
      if (d.data.ratio) {
        // drawTsText(`g${d.id}`, dirRight);
        // drawTsText(`g${d.id}`);// 画子文本
        // drawTsText1(`g${d.id}`, dirRight);// 画子文本
      }
      drawRect(`g${d.id}`, dirRight);// 画方框
      marker(d, `g${d.id}`, dirRight);
      // this.drawFilter(`g${d.id}`);//画阴影
      // d3.select(`#g${d.id} rect`).attr('stroke-width',15).attr('filter',`url(#fg${d.id})`);//给rect绑定阴影
    }
    // eslint-disable-next-line no-underscore-dangle
    if (d.depth > 0 && d._children) { // 非根节点且有子节点
      const width = Math.min(d.data.name.length * 14, d3Obj.rectMinWidth);
      const right = dirRight > 0;// 右为1，左为-1
      const xDistance = right ? width : -width;
      d3.select(`#g${d.id} rect`)
        .attr('width', width)
        .attr('x', right ? 0 : -width)
        .style('fill', '#ffffff')
        .style('stroke', '#ffffff');// 修改rect属性

      d3.select(`#g${d.id} text`)
        .attr('text-anchor', right ? 'end' : 'start')
        .attr('x', right ? xDistance - d3Obj.circleR : xDistance + d3Obj.circleR);// 修改文本属性
      drawCircle(`g${d.id}`);// 画圆圈
      d3.select(`#g${d.id} g`).attr('transform', `translate(${xDistance},0)`);// 修改圆圈属性
    }
  });

  // 更新节点：节点enter和exit时都会触发tree更新
  const nodeUpdate = node.merge(nodeEnter).transition().duration(d3Obj.duration)
    .attr('transform', (d:any) => `translate(${d.y - dirRight * d3Obj.rectMinWidth / 2},${d.x})`)
    .attr('fill-opacity', 1)
    .attr('stroke-opacity', 1);

  // 移除节点:tree移除掉数据内不包含的节点(即，children = false)
  const nodeExit = node.exit().transition().duration(d3Obj.duration).remove()
    .attr('transform', (d:any) => `translate(${source.y},${source.x})`)
    .attr('fill-opacity', 0)
    .attr('stroke-opacity', 0);

  // Update the links 根据 className来实现分块更新
  const link = d3Obj.container.selectAll(`path.${className}`).data(links, (d:any) => d.target.id);

  // Enter any new links at the parent's previous position.
  // insert是在g标签前面插入，防止连接线挡住G节点内容
  const linkEnter = link.enter().insert('path', 'g')
    .attr('class', className)
    .attr('d', (d:any) => {
      const o = { x: source.x0, y: source.y0 };
      return diagonal({ source: o, target: o });
    })
    .attr('fill', 'none')
    .attr('stroke-width', 1)
    .attr('stroke', '#dddddd');

  // Transition links to their new position.
  link.merge(linkEnter).transition().duration(d3Obj.duration).attr('d', diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition().duration(d3Obj.duration).remove()
    .attr('d', (d:any) => {
      const o = { x: source.x, y: source.y };
      return diagonal({ source: o, target: o });
    });

  // Stash the old positions for transition.
  d3Obj.root[direction].eachBefore((d:any) => {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}
// 遍历
const porData = (obj:any, item:any) => {
  obj.descendants().forEach((d:any) => {
    // eslint-disable-next-line no-underscore-dangle
    d._children = d.children;
    d.id = item + uuid();
  });
  update(obj, item);
}
// 数据处理
const dealData = (data:any) => {
  d3Obj.direction.forEach((item:any) => {
    d3Obj.root[item] = d3.hierarchy(data[item]);
    d3Obj.root[item].x0 = d3Obj.centralPoint[0];// 根节点x坐标
    d3Obj.root[item].y0 = d3Obj.centralPoint[1];// 根节点Y坐标
    // d3Obj.root[item].descendants().forEach((d:any) => {
    //   // eslint-disable-next-line no-underscore-dangle
    //   d._children = d.children;// 添加_children属性，用于实现点击收缩及展开功能
    //   d.id = item + uuid();// 绑定唯一标识ID
    // });
    // update(d3Obj.root[item], item);
    porData(d3Obj.root[item], item);
  })
}
// 初始化缩放方法
const zoomFn = (event:any) => {
  const zoom = event.transform;
  return d3Obj.container.attr('transform', zoom);
}
const treeInit = (data:any) => {
  const margin = {
    top: 0, right: 0, bottom: 0, left: 0,
  };
  // console.log(d3.select('#treeRoot'), (d3.select('#treeRoot') as any)._parents[0])
  // eslint-disable-next-line no-underscore-dangle
  // const treeWidth = (d3.select('#treeRoot') as any)._parents[0].clientWidth;// tree容器宽
  // eslint-disable-next-line no-underscore-dangle
  // const treeHeight = (d3.select('#treeRoot') as any)._parents[0].clientHeight;// tree容器高
  const treeWidth = document.body.clientWidth - margin.left - margin.right;
  const treeHeight = document.body.clientHeight - margin.top - margin.bottom;
  const centralY = treeWidth / 2 + margin.left;
  const centralX = treeHeight / 2 + margin.top;
  d3Obj.centralPoint = [centralX, centralY];// 中心点坐标
  // 根节点字符所占宽度
  d3Obj.rootNodeLength = d3Obj.rootName[0].length * d3Obj.fontSize + 30;

  // svg标签
  svg.value = d3.select('#treeRoot').append('svg')
    .attr('class', 'tree-svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('width', treeWidth)
    .attr('height', treeHeight)
    .attr('font-size', d3Obj.fontSize)
    .attr('fill', '#555');

  // g标签
  d3Obj.container = svg.value.append('g')
    .attr('class', 'container')
    .attr('transform', `translate(${margin.left},${margin.top}) scale(1)`);
  // 画出根节点
  drawRoot();

  // 指定缩放范围
  const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent(d3Obj.scaleRange).on('zoom', zoomFn);
  // 动画持续时间
  d3Obj.container.transition().duration(d3Obj.duration).call(zoom.transform, d3.zoomIdentity);
  svg.value.call(zoom);
  // 数据处理
  dealData(data);
}
const init = () => {
  d3Obj.rootName = [companyJson.data.rootName];
  const data = companyJson.data;
  const left:any = data.l;
  const right:any = data.r;
  let mynodes;
  for (let i = 0; i < left.children.length; i++) {
    if (left.children[i].children.length > 2) {
      mynodes = left.children[i].children;
      left.children[i].children = left.children[i].children.slice(0, 2);
      left.children[i].children[2] = {
        name: '更多',
        type: -1,
        val: mynodes.length - 2,
        childrend: mynodes.slice(0, mynodes.length),
      };
    }
  }
  for (let i = 0; i < right.children.length; i++) {
    if (right.children[i].children.length > 2) {
      mynodes = right.children[i].children;
      right.children[i].children = right.children[i].children.slice(0, 2);
      right.children[i].children[2] = {
        name: '更多',
        type: -1,
        val: mynodes.length - 2,
        childrend: mynodes.slice(0, mynodes.length),
      };
    }
  }
  treeInit(data);
}
onMounted(() => {
  setTimeout(() => {
    init();
  }, 100);
})
</script>

<style scoped lang="scss">
  .tree04 {
  background: #fff;
  touch-action: none;
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vh;
  font-family: "PingFangSC-Regular", "PingFangSC-Light", "PingFang SC",
    sans-serif, "Microsoft YaHei";
}
</style>
