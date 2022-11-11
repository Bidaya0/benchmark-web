<template>
  <!--
        d3的使用
          npm install --save-dev d3
          npm install --save-dev @types/d3
      -->
  <div class="seeTree-page">
    <div id="treeRoot" />
  </div>
</template>
<script setup lang="ts">
import {
  onMounted, ref, reactive, computed,
} from 'vue'
import * as d3 from 'd3';
import { treeData } from './constants';// 数据源

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
//   //点击某个节点diagonal
const clickNode = (d:any, direction:any) => {
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
  update(d, direction);
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
const drawTsText = (id:any) => d3.select(`#${id} text`).append('tspan')
  .attr('fill', (d:any) => getTsTextColor(d.parent.data.name))
  .text((d:any) => d.data.value)

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
// 画箭头
const marker = (d:any, id:any, dirRight:any) => {
  const gMark = d3
    .select(`#${id}`)
    .append('g')
    .attr(
      'transform',
      dirRight > 0 ? 'translate(-10,0)' : 'translate(12,0)',
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
      node.depth !== 0 && clickNode(node, direction);// 根节点不执行点击事件
    });

  nodeEnter.each((d:any) => {
    if (d.depth > 0) { // 非根节点且无子节点
      drawText(`g${d.id}`, dirRight);// 画文本

      if (d.data.value) {
        drawTsText(`g${d.id}`);// 画子文本
        drawTsText1(`g${d.id}`, dirRight);// 画子文本
      }
      drawRect(`g${d.id}`, dirRight);// 画方框
      // drawFilter(`g${d.id}`);//画阴影
      // d3.select(`#g${d.id} rect`).attr('stroke-width', 15).attr('filter', `url(#fg${d.id})`);// 给rect绑定阴影
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
    // marker(d, `g${d.id}`, dirRight);
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
// 数据处理
const dealData = () => {
  d3Obj.direction.forEach((item:any) => {
    d3Obj.root[item] = d3.hierarchy(treeData[item]);
    d3Obj.root[item].x0 = d3Obj.centralPoint[0];// 根节点x坐标
    d3Obj.root[item].y0 = d3Obj.centralPoint[1];// 根节点Y坐标
    d3Obj.root[item].descendants().forEach((d:any) => {
      // eslint-disable-next-line no-underscore-dangle
      d._children = d.children;// 添加_children属性，用于实现点击收缩及展开功能
      d.id = item + uuid();// 绑定唯一标识ID
    });
    update(d3Obj.root[item], item);
  })
}
// 初始化缩放方法
const zoomFn = (event:any) => {
  const zoom = event.transform;
  return d3Obj.container.attr('transform', zoom);
}
const treeInit = () => {
  const margin = {
    top: 0, right: 0, bottom: 0, left: 0,
  };
  const treeWidth = document.body.clientWidth - margin.left - margin.right;// tree容器宽
  const treeHeight = document.body.clientHeight - margin.top - margin.bottom;// tree容器高
  const centralY = treeWidth / 2 + margin.left;
  const centralX = treeHeight / 2 + margin.top;
  d3Obj.centralPoint = [centralX, centralY];// 中心点坐标
  // 根节点字符所占宽度
  d3Obj.rootNodeLength = d3Obj.rootName[0].length * d3Obj.fontSize + 30;

  // svg标签
  const svg = d3.select('#treeRoot').append('svg')
    .attr('class', 'tree-svg')
    .attr('width', treeWidth)
    .attr('height', treeHeight)
    .attr('font-size', d3Obj.fontSize)
    .attr('fill', '#555');

  // g标签
  d3Obj.container = svg.append('g')
    .attr('class', 'container')
    .attr('transform', `translate(${margin.left},${margin.top}) scale(1)`);
  // 画出根节点
  drawRoot();

  // 指定缩放范围
  const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent(d3Obj.scaleRange).on('zoom', zoomFn);
  // 动画持续时间
  d3Obj.container.transition().duration(d3Obj.duration).call(zoom.transform, d3.zoomIdentity);
  svg.call(zoom);
  // 数据处理
  dealData();
}
onMounted(() => {
  setTimeout(() => {
    treeInit();
  }, 100);
})
</script>

<style scoped lang="scss">
  .seeTree-page {
    width: 100vh;
    height: 100vh;
    background-color: white;
  }
</style>
