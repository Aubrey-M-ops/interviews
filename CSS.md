# CSS

## 盒子模型

- 标准盒模型 content宽高 box-sizing: content-box
- IE盒模型 margin以内宽高 box-sizing: border-box

## 脱离文档流

1. float

使用float脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在该元素的周围。

2. position: absolute

   父元素必须非static，当父级元素的position全是static的时候，absolute是相对于html来进行定位的。

   绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于<html>

3. Position: fixed

3. static static元素会忽略任何top,buttom,left,right声明



## 伪类、伪元素

## 伪类选择器

### 伪类选择器

**只有一个冒号**

作用是：用于向某些选择器添加一些特殊的效果，常见的有：

1. `a:link`，`a:hover`，`a:visited`，`a:active`
2. `:fist-child`，`last-child`，`nth-child()`

### 伪元素选择器

**两个冒号**

作用：表示元素中的一些特殊的位置，常见的有：

1. `first-line`，`fist-letter`
2. `before`，`after`
3. `placeholder`
4. `selection`：选中文本的样式

其核心就是需要创建通常不存在于文档中的元素



## 文字水平垂直居中

Text-align:center

Line-height:和height一样



## CSS隐藏元素

display：none

Visibility:hidden 

opacity:0



## BFC

- 根元素，即HTML元素
- 浮动元素：float值为left、right
- overflow值不为 visible，为 auto、scroll、hidden
- display的值为inline-block、inltable-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
- position的值为absolute或fixed



`BFC`实际就是页面一个独立的容器，里面的子元素不影响外面的元素

清除内部浮动

计算BFC高度时，浮动元素也算在内



## CSS优化

webpack资源压缩css代码

减少嵌套，id选择器不嵌套

减少使用昂贵属性如border-radius



## 水平垂直居中

已知元素大小200px 200px

绝对定位 + top50% left50% + margin-left:-100px margin-top:-100px

未知元素大小

1. 绝定+上下左右0+margin:auto
2. 绝定 + top50% left50% + translate:transform(-50%,-50%)
3. flex布局
4. table
5. grid



## 自适应方案

### 百分比

### @media

<img src="/Users/limohan/Library/Application Support/typora-user-images/image-20220207175119471.png" alt="image-20220207175119471" style="zoom:50%;" />

### rem

放弃px单位，使用rem作为单位，这样在不同尺寸的设备上，通过修改根节点的`font-size`大小，实现等比例缩放

比如给定的视觉稿为750px（物理像素），如果我们要将所有的布局单位都用rem来表示在css中我们还是用px来表示元素的大小，最后编写完css代码之后，将css文件中的所有px单位，转化成rem单位。

通过`webpack中使用postcss plugin`

<img src="/Users/limohan/Library/Application Support/typora-user-images/image-20220207174656895.png" alt="image-20220207174656895" style="zoom: 50%;" />



## em/px/rem/vh/vw

### px

绝对长度单位

### em

继承父级元素的字体大小，没设置的话浏览器默认字体为16px

整个页面内`1em`不是一个固定的值

### rem

相对于根元素字体大小 1rem = 根元素字体大小

### vh、vw

vw ，就是根据窗口的宽度，分成100等份，100vw就表示满宽，50vw就表示一半宽。（vw 始终是针对窗口的宽），同理，`vh`则为窗口的高度



## CSS权重

- !important;
- 行内样式;
- ID选择器, 权重:100;
- class,属性选择器和伪类选择器，权重:10;
- 标签选择器和伪元素选择器，权重:1;



## CSS样式隔离

1. Style scoped  指令定义作用域，通过编译为该作用域所有标签生成唯一的属性(data-v-xxxxx)。

2. css模块化 

   我们像 import js 一样去引入我们的 css 代码，生成html的类名就是`引入对象的属性+唯一的hash`

   css module 需要 webpack 配置 css-loader 或者 scss-loader , module 为 true。



## flex布局

容器属性

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content 多根轴线的对齐方式

元素属性

- `order` 数值越小，排列越靠前，默认为0。
- `flex-grow` 放大比例，默认为`0`，即如果存在剩余空间，也不放大。（所有项目为1，其中一个为2，后者占比前者多一倍）
- `flex-shrink` 默认为`1`，即如果空间不足，该项目将缩小。如果都为1，一个为0，后者不缩小
- `flex-basis` 项目占据的主轴空间（main size）,默认`auto`为项目本来大小
- `flex flex-grow`, `flex-shrink` 和 `flex-basis`的简写
- `align-self` 允许单个项目有与其他项目不一样的对齐方式，不然继承父元素的align-items

> Flex: 1就是flex：1 1 auto ,项目等比放大



## px转rem

为了计算方便，一般建议 `1rem = 100px`(设计稿px)

fontSize = 屏幕宽度 / 设计稿宽度 * 基本宽度(100px)



## 布局

空间居中布局

并列式布局（flex)

两栏式布局

三明治布局

```css
.container {
    display: grid;
    grid-template-rows: auto 1fr auto;
}
```

圣杯布局和双飞翼布局





## 清除浮动

父元素包不住子浮动元素的时候 父元素overflow:hidden包住子元素(BFC)



## 重排和重绘

**重绘不一定导致重排，但重排一定会导致重绘**。

- 重绘：某些元素的外观被改变，例如：元素的填充颜色
- 重排：重新生成布局，重新排列元素。

减少重排

1. 少在js改样式，提前预定义好class,改类名,这样只会引发一次重排重绘
2. 将多次改变样式属性的操作合并成一次操作
3. 需要重排的元素脱离文档流



> margin相对父元素宽度