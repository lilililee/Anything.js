# Anything.js

### Anything.js 简介
1. Anything.js 为仿照JQuery编写的js库，已封装的API使用方法基本和JQuery一致
2. Anything.js 包含功能有节点获取，节点属性和内容操作，DOM操作，事件，动画，Ajax以及常用的功能函数
3. Anything.js 兼容IE6+

### Anything.js 原理
1. Anything是一个继承Array的对象，拥有数组的所有方法
2. 通过使用$(args)方法返回一个Anything对象，args可以为css选择符，对象，函数
3. 所有获取到的节点保存在Anything对象中，可以通过下标访问每一个获取到的节点
4. Anything对象的所有方法保存在原型对象中

### Anythins.js API
#### 1. 节点获取
##### 1.1 css选择器
方法名称： $(selector1,selector2...)

说明： 通过css选择器来获取元素，支持css基本选择器和层次选择器

返回值： Anything

示例： $('#header .nav p'),$('.content>p'),$('.nav p,.content p')...

##### 1.2 传入对象
方法名称： $(object)

说明： 直接传入一个对象，包括window，document，单个节点，节点数组

返回值： Anything

示例： $(window), $(document), $(node), $(nodes)...
