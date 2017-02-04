# Anything.js

## Anything.js 简介
1. Anything.js 为仿照JQuery编写的js库，已封装的API使用方法基本和JQuery一致
2. Anything.js 包含功能有节点获取，节点属性和内容操作，DOM操作，事件，动画，Ajax以及常用的功能函数
3. Anything.js 兼容IE6+

## Anything.js 原理
1. Anything是一个继承Array的对象，拥有数组的所有方法
2. 通过使用$(args)方法返回一个Anything对象，args可以为css选择符，对象，函数
3. 所有获取到的节点保存在Anything对象中，可以通过下标访问每一个获取到的节点
4. Anything对象的所有方法保存在原型对象中

## Anythins.js API
### 1. 节点获取
#### 1.1 css选择器
```
方法名称： $(selector1,selector2...)

说明： 通过css选择器来获取元素，支持css基本选择器和层次选择器

返回值： Anything

示例： $('#header .nav p'), $('.content>p'), $('.nav p,.content p')...
```
#### 1.2 传入对象
```
方法名称： $(object)

说明： 直接传入一个对象，包括window，document，单个节点，节点数组

返回值： Anything

示例： $(window), $(document), $(node), $(nodes)...
```

### 2. 节点过滤
#### 2.1 选取指定下标节点
```
方法名称： $(slelector).eq(index)

说明： 从匹配元素中取得一个指定下标的元素，index从0开始

返回值： Anything

示例： $('p').eq(2)...
```
#### 2.2 选取第一个节点
```
方法名称： $(slelector).first()

说明： 从匹配元素中取得第一个元素，等同于eq(0)

返回值： Anything

示例： $('p').first()
```
#### 2.3 选取最后一个节点
```
方法名称： $(slelector).last()

说明： 从匹配元素中取得最后一个元素，等同于eq(-1)

返回值： Anything

示例： $('p').last()
```
#### 2.4 反向选取
```
方法名称： $(slelector1).not(slelector2)

说明： 从匹配元素中删除与指定表达式匹配的元素

返回值： Anything

示例： $('p').not('.cla')...
```
#### 2.5 包含选取
```
方法名称： $(slelector1).has(slelector2)

说明： 保留匹配元素中与指定表达式匹配的元素，其他删除

返回值： Anything

示例： $('p').has('span')...
```
#### 2.6 条件选取
```
方法名称： $(slelector1).filter(slelector2|fn)

说明： 保留匹配元素中与指定表达式匹配或满足判断函数的元素，其他删除，可以看作是has的加强版

返回值： Anything

示例： $('p').filter('span'), $('p').filter( function(){ return this.className == 'cla' })...
```
#### 2.7 类名判断
```
方法名称： $(slelector1).hasClass(class_name)

说明： 判断匹配元素中是否至少有一个元素包含指定类名

返回值： Boolean

示例： $('p').hasClass('.cla')...
```
#### 2.8 表达式判断
```
方法名称： $(slelector1).is(slelector2)

说明： 判断匹配元素中是否至少有一个元素符合表达式，表达式可以为css选择符或元素状态

返回值： Boolean

示例： $('p').is('.cla'), $('div').is(':animated')...
```
### 3. 节点查找
#### 3.1 查找父节点
```
方法名称： $(slelector1).parent([slelector2])

说明： 查找匹配元素的父节点，可传入css选择符进行过滤

返回值： Anything

示例： $('p').parent(), $('p').parent('#title')...
```
#### 3.2 查找祖先节点
```
方法名称： $(slelector1).parents([slelector2])

说明： 查找匹配元素的祖先节点，可传入css选择符进行过滤

返回值： Anything

示例： $('p').parents(), $('p').parents('#title')...
```
#### 3.3 查找子节点
```
方法名称： $(slelector1).children([slelector2])

说明： 查找匹配元素的子节点，可传入css选择符进行过滤

返回值： Anything

示例： $('div').children(), $('div').children('p')...
```
#### 3.4 查找后代节点
```
方法名称： $(slelector1).find([slelector2])

说明： 查找匹配元素的后代节点，可传入css选择符进行过滤

返回值： Anything

示例： $('div').find(), $('div').find('p')...
```
#### 3.5 查找上一兄弟节点
```
方法名称： $(slelector1).prev([slelector2])

说明： 查找匹配元素的上一兄弟节点，可传入css选择符进行过滤

返回值： Anything

示例： $('li').prev(), $('li').prev('.red')...
```
#### 3.6 查找前面所有兄弟节点
```
方法名称： $(slelector1).prevAll([slelector2])

说明： 查找匹配元素的前面所有兄弟节点，可传入css选择符进行过滤

返回值： Anything

示例： $('li').prevAll(), $('li').prevAll('.red')...
```
#### 3.7 查找下一兄弟节点
```
方法名称： $(slelector1).next([slelector2])

说明： 查找匹配元素的下一兄弟节点，可传入css选择符进行过滤

返回值： Anything

示例： $('li').next(), $('li').next('.red')...
```
#### 3.8 查找后面所有兄弟节点
```
方法名称： $(slelector1).nextAll([slelector2])

说明： 查找匹配元素的后面所有兄弟节点，可传入css选择符进行过滤

返回值： Anything

示例： $('li').nextAll(), $('li').nextAll('.red')...
```
#### 3.9 查找所有兄弟节点
```
方法名称： $(slelector1).siblings([slelector2])

说明： 查找匹配元素的所有兄弟节点，可传入css选择符进行过滤

返回值： Anything

示例： $('li').siblings(), $('li').siblings('.red')...
```
### 4. 节点属性和内容
#### 4.1 获取和设置属性
```
方法名称： $(slelector1).attr(name, [value])

说明： 获取第一个匹配元素的属性或设置所有匹配元素的属性

返回值： String | Anything

示例： $('#link').attr('title'), $('#link').attr('title', 'a link')...
```
#### 4.2 移除属性
```
方法名称： $(slelector1).removeAttr(name)

说明： 移除所有匹配元素的指定属性

返回值： Anything

示例： $('#link').removeAttr('title')...
```
#### 4.3 获取和设置innerHTML内容
```
方法名称： $(slelector1).html([content])

说明： 获取第一个匹配元素的innerHTML内容或设置所有匹配元素的innerHTML内容

返回值： String | Anything

示例： $('p').html(), $('p').html('this is innerHTML')...
```
#### 4.4 获取和设置innerText内容
```
方法名称： $(slelector1).text([content])

说明： 获取或设置所有匹配元素的innerTextL内容

返回值： String | Anything

示例： $('p').text(), $('p').text('this is innerText')...
```
#### 4.5 获取和设置表单value内容
```
方法名称： $(slelector1).val([value])

说明： 获取第一个匹配元素的innerText内容或设置所有匹配元素的innerTextL内容

返回值： String | Anything

示例： $('input').val(), $('input').val('this is value')...
```
### 5. 样式操作
#### 5.1 获取和设置css
```
方法名称： $(slelector1).css(property, [value])

说明： 获取第一个匹配元素的对应css属性或设置所有匹配元素的对应css属性

返回值： String | Anything

示例： $('p').css('color'), $('p').css('color', 'red')...
```
#### 5.2 添加class
```
方法名称： $(slelector1).addClass(class_name)

说明： 为所有匹配元素添加一个指定class名，如果已存在，不重复添加

返回值： Anything

示例： $('p').addClass('intro')...
```
#### 5.3 移除class
```
方法名称： $(slelector1).removeClass(class_name)

说明： 为所有匹配元素移除一个指定class名

返回值： Anything

示例： $('p').removeClass('intro')...
```
#### 5.4 切换class
```
方法名称： $(slelector1).toggleClass(class_name)

说明： 为所有匹配元素切换一个指定class名

返回值： Anything

示例： $('p').toggleClass('intro')...
```
#### 5.5 获取和设置width
```
方法名称： $(slelector1).width([value])

说明： 获取第一个匹配元素width属性或设置所有匹配元素width属性

返回值： Number | Anything

示例： $('div').width(), $('div').width(200)...
```
#### 5.6 获取和设置innerWidth
```
方法名称： $(slelector1).innerWidth([value])

说明： 获取第一个匹配元素innerWidth属性或设置所有匹配元素innerWidth属性

返回值： Number | Anything

示例： $('div').innerWidth(), $('div').innerWidth(200)...
```
#### 5.7 获取和设置outerWidth
```
方法名称： $(slelector1).outerWidth([value])

说明： 获取第一个匹配元素outerWidth属性或设置所有匹配元素outerWidth属性

返回值： Number | Anything

示例： $('div').outerWidth(), $('div').outerWidth(200)...
```
#### 5.8 获取和设置width
```
方法名称： $(slelector1).width([value])

说明： 获取第一个匹配元素width属性或设置所有匹配元素width属性

返回值： Number | Anything

示例： $('div').width(), $('div').width(200)...
```
#### 5.9 获取和设置innerWidth
```
方法名称： $(slelector1).innerWidth([value])

说明： 获取第一个匹配元素innerWidth属性或设置所有匹配元素innerWidth属性

返回值： Number | Anything

示例： $('div').innerWidth(), $('div').innerWidth(200)...
```
#### 5.10 获取和设置outerWidth
```
方法名称： $(slelector1).outerWidth([value])

说明： 获取第一个匹配元素outerWidth属性或设置所有匹配元素outerWidth属性

返回值： Number | Anything

示例： $('div').outerWidth(), $('div').outerWidth(200)...
```
#### 5.11 获取offset
```
方法名称： $(slelector1).offset()

说明： 获取第一个匹配元素offset属性,即在文档中的位置

返回值： Object

示例： $('span').offset().left, $('span').offset().top...
```
#### 5.12 获取position
```
方法名称： $(slelector1).position()

说明： 获取第一个匹配元素position属性,即在最近定位元素中的位置

返回值： Object

示例： $('span').position().left, $('span').position().top...
```
#### 5.13 获取和设置scrollTop
```
方法名称： $(slelector1).scrollTop()

说明： 获取第一个匹配元素scrollTop属性,即上下滚动条的位置（左右滚动条使用较少）

返回值： Number | Anything

示例： $(window).scrollTop(), $(window).scrollTop(300)...
```
### 6. DOM操作
#### 6.1 内部后面插入节点
```
方法名称： $(slelector1).append(str|node)

说明： 所有匹配元素内部的最后面插入节点

返回值： Anything

示例： $('ul').append('<li>append a li</li>'), $('ul').append(node)...
```
#### 6.2 内部前面插入节点
```
方法名称： $(slelector1).prepend(str|node)

说明： 所有匹配元素内部的最前面插入节点

返回值： Anything

示例： $('ul').prepend('<li>prepend a li</li>'), $('ul').prepend(node)...
```
#### 6.3 外部后面插入节点
```
方法名称： $(slelector1).after(str|node)

说明： 所有匹配元素外部的后面插入节点

返回值： Anything

示例： $('ul').after('<ul>after a ul</ul>'), $('ul').after(node)...
```
#### 6.4 外部前面插入节点
```
方法名称： $(slelector1).before(str|node)

说明： 所有匹配元素外部的前面插入节点

返回值： Anything

示例： $('ul').before('<ul>before a ul</ul>'), $('ul').before(node)...
```
#### 6.5 删除节点
```
方法名称： $(slelector1).remove()

说明： 删除所有匹配元素

返回值： Anything

示例： $('ul').remove()...
```
#### 6.6 清空节点
```
方法名称： $(slelector1).empty()

说明： 清空所有匹配元素

返回值： Anything

示例： $('ul').empty()...
```
#### 6.7 克隆节点
```
方法名称： $(slelector1).clone(flag)

说明： 克隆第一个匹配元素，true表示深克隆，会复制子节点，false则不会，默认为true    

返回值： Object

示例： $('ul').clone(), $('ul').clone(true), $('ul').clone(false)
```
#### 6.8 替换节点
```
方法名称： $(slelector1).replaceWith(str|node)

说明： 替换所有匹配元素   

返回值： Anything

示例： $('p').replaceWith('<div>replaceWith a div</div>'), $('ul').replaceWith(node)...
```

#### 6.9 单独包裹节点
```
方法名称： $(slelector1).wrap(str)

说明： 单独包裹所有匹配元素

返回值： Anything

示例： $('p').wrap('<div></div>')...
```

#### 6.10 整体包裹节点
```
方法名称： $(slelector1).wrapAll(str)

说明： 整体包裹所有匹配元素，如果匹配元素不连续，会移动位置放在一起

返回值： Anything

示例： $('p').wrapAll('<div></div>')...
```

#### 6.11 整体包裹内部节点
```
方法名称： $(slelector1).wrapInner(str)

说明： 整体包裹所有匹配元素内部元素

返回值： Anything

示例： $('p').wrapInner('<p></p>')...
```

#### 6.12 遍历节点
```
方法名称： $(slelector1).each(callback)

说明： 遍历匹配元素，传入一个函数进行操作，该函数第一个参数默认为元素下标

返回值： Anything

示例： $('p').each(function(){ alert(this.tagName) })...
```

### 7. 事件
#### 7.1 加载事件
```
方法名称： $(window|document).ready(callback)

说明： window或document加载完成后运行回调函数，建议使用document，运行速度更快

返回值： Anything

示例： $(document).ready(function(){ alert('document is ready') })...
```

#### 7.2 窗口大小改变事件
```
方法名称： $(window).resize(callback)

说明： 浏览器窗口大小改变触发该事件，window才能检测到

返回值： Anything

示例： $(window).resize(function(){ alert('window is resize') })...
```

#### 7.3 鼠标单击事件
```
方法名称： $(slelector1).click(callback)

说明： 鼠标在单击匹配元素后执行回调函数

返回值： Anything

示例： $('#clicktest').click(function(){ alert('a click') })...
```

#### 7.4 鼠标双击事件
```
方法名称： $(slelector1).dbclick(callback)

说明： 鼠标在双击匹配元素后执行回调函数，经测试IE，Chrome，Firefox均无法触发dbclick事件，遂采取click事件来实现

返回值： Anything

示例： $('#dbclicktest').dbclick(function(){ alert('a dbclick') })...
```

#### 7.5 鼠标移入事件
```
方法名称： $(slelector1).mouseover(callback)

说明： 鼠标移入匹配元素后执行回调函数，子节点有移入事件也会触发

返回值： Anything

示例： $('#mouseovertest').mouseover(function(){ alert('a mouseover') })...
```

#### 7.6 鼠标移出事件
```
方法名称： $(slelector1).mouseout(callback)

说明： 鼠标移出匹配元素后执行回调函数，子节点有移出事件也会触发

返回值： Anything

示例： $('#mouseouttest').mouseout(function(){ alert('a mouseout') })...
```

#### 7.7 鼠标移入事件
```
方法名称： $(slelector1).mouseenter(callback)

说明： 鼠标移入匹配元素后执行回调函数，子节点有移入事件不会触发

返回值： Anything

示例： $('#mouseentertest').mouseenter(function(){ alert('a mouseenter') })...
```

#### 7.8 鼠标移出事件
```
方法名称： $(slelector1).mouseleave(callback)

说明： 鼠标移出匹配元素后执行回调函数，子节点有移出事件不会触发

返回值： Anything

示例： $('#mouseleavetest').mouseleave(function(){ alert('a mouseleave') })...
```

#### 7.9 鼠标按下事件
```
方法名称： $(slelector1).mousedown(callback)

说明： 鼠标在匹配元素上按下任意鼠标键后执行回调函数

返回值： Anything

示例： $('#mousedowntest').mousedown(function(){ alert('a mousedown') })...
```

#### 7.10 鼠标弹起事件
```
方法名称： $(slelector1).mouseup(callback)

说明： 鼠标在匹配元素上弹起任意鼠标键后执行回调函数

返回值： Anything

示例： $('#mouseuptest').mouseup(function(){ alert('a mouseup') })...
```

#### 7.11 鼠标右击事件
```
方法名称： $(slelector1).contextmenu(callback)

说明： 鼠标在匹配元素上右击后执行回调函数，监控全局使用document

返回值： Anything

示例： $('#contextmenutest').contextmenu(function(){ alert('a contextmenu') })...
```

#### 7.12 鼠标滚动事件
```
方法名称： $(slelector1).scroll(callback)

说明： 鼠标在匹配元素上滚动后执行回调函数，监控全局使用window

返回值： Anything

示例： $('#scrolltest').scroll(function(){ alert('a scroll') })...
```

#### 7.13 键盘按下事件
```
方法名称： $(slelector1).keydown(callback)

说明： 键盘在匹配元素上按下后执行回调函数，在全局和表单元素有效，监控全局使用document，可以监控字符键和功能键

返回值： Anything

示例： $('#keydowntest').keydown(function(){ alert('a keydown') })...
```

#### 7.14 键盘按住事件
```
方法名称： $(slelector1).keypress(callback)

说明： 键盘在匹配元素上按住后执行回调函数，在全局和表单元素有效，监控全局使用document，只可以监控字符键

返回值： Anything

示例： $('#keypresstest').keypress(function(){ alert('a keypress') })...
```

#### 7.15 键盘弹起事件
```
方法名称： $(slelector1).keyup(callback)

说明： 键盘在匹配元素上弹起后执行回调函数，在全局和表单元素有效，监控全局使用document，可以监控字符键和功能键

返回值： Anything

示例： $('#keyuptest').keyup(function(){ alert('a keyup') })...
```

#### 7.16 表单获得焦点事件
```
方法名称： $(slelector1).focus(callback)

说明： 匹配元素获得焦点后执行回调函数，对表单元素有效

返回值： Anything

示例： $('#focustest').focus(function(){ alert('a focus') })...
```

#### 7.17 表单失去焦点事件
```
方法名称： $(slelector1).blur(callback)

说明： 匹配元素失去焦点后执行回调函数，对表单元素有效

返回值： Anything

示例： $('#blurtest').blur(function(){ alert('a blur') })...
```

#### 7.18 表单内容改变事件
```
方法名称： $(slelector1).change(callback)

说明： 匹配元素内容选择后执行回调函数，对text，textarea，slelect，radio，checkbox表单有效，失去焦点后才会检测触发，注意下拉菜单（select）改变会触发该事件

返回值： Anything

示例： $('#changetest').change(function(){ alert('a change') })...
```

#### 7.19 表单内容选择事件
```
方法名称： $(slelector1).select(callback)

说明： 匹配元素内容选择后执行回调函数，对text，textarea表单有效，在IE8-中每选中一个字符就会触发一次，注意下拉菜单（select）改变不触发该事件

返回值： Anything

示例： $('#selecttest').select(function(){ alert('a select') })...
```

#### 7.20 通用绑定事件
```
方法名称： $(slelector1).on(type, callback)

说明： 为匹配元素绑定指定事件

返回值： Anything

示例： $('#ontest').on('click', function(){ alert('a on') })...
```

#### 7.21 通用解除事件
```
方法名称： $(slelector1).off(type, callback)

说明： 为匹配元素解除指定事件，注意dbclick，mouseenter，mouseleave由click，mouseover，mouseout间接实现，需要解除间接实现的对应事件

返回值： Anything

示例： $('#offtest').off('click', function(){ alert('a off') })...
```

#### 7.22 合成事件
```
方法名称： $(slelector1).hover(callback1, callback2)

说明： 为匹配元素添加合成事件，即添加mouseover和mouseout事件

返回值： Anything

示例： $('#hovertest').hover(function(){ alert('a hover over') , function(){ alert('a hover out') })...
```

#### 7.23 一次事件
```
方法名称： $(slelector1).one(callback)

说明： 为匹配元素添加只执行一次的事件

返回值： Anything

示例： $('#onetest').one( function(){ alert('a one') })...
```

### 8. 动画
#### 8.1 显示
```
方法名称： $(slelector1).show([time], [callback])

说明： 为匹配元素执行显示动画，通过增大宽度，高度和透明度实现

返回值： Anything   

示例： $('#showtest').show(), $('#showtest').show(1000), $('#showtest').show(1000, function(){ alert('a show'))...
```

#### 8.2 隐藏
```
方法名称： $(slelector1).hide([time], [callback])

说明： 为匹配元素执行隐藏动画，通过减小宽度，高度和透明度实现

返回值： Anything   

示例： $('#hidetest').hide(), $('#hidetest').hide(1000), $('#hidetest').hide(1000, function(){ alert('a hide'))...
```

#### 8.3 显示和隐藏切换
```
方法名称： $(slelector1).toggle([time], [callback])

说明： 为匹配元素执行显示和隐藏切换动画，通过修改宽度，高度和透明度实现

返回值： Anything   

示例： $('#toggletest').toggle(), $('#toggletest').toggle(1000), $('#toggletest').toggle(1000, function(){ alert('a toggle'))...
```

#### 8.4 淡入
```
方法名称： $(slelector1).fadeIn([time], [callback])

说明： 为匹配元素执行淡入动画，通过透明度增大到1实现

返回值： Anything   

示例： $('#fadeIntest').fadeIn(), $('#fadeIntest').fadeIn(1000), $('#fadeIntest').fadeIn(1000, function(){ alert('a fadeIn'))...
```

#### 8.5 淡出
```
方法名称： $(slelector1).fadeOut([time], [callback])

说明： 为匹配元素执行淡入动画，通过透明度减小到0实现

返回值： Anything   

示例： $('#fadeOuttest').fadeOut(), $('#fadeOuttest').fadeOut(1000), $('#fadeOuttest').fadeOut(1000, function(){ alert('a fadeOut'))...
```

#### 8.6 淡入淡出到指定透明度
```
方法名称： $(slelector1).fadeTo(time, opacity, [callback])

说明： 为匹配元素执行淡入或淡出动画，通过修改透明度到指定值实现

返回值： Anything   

示例： $('#fadeTotest').fadeTo(1000, 0.2), $('#fadeTotest').fadeTo(1000, 0.2, function(){ alert('a fadeTo'))...
```

#### 8.7 淡入或淡出切换
```
方法名称： $(slelector1).fadeToggle([time], [callback])

说明： 为匹配元素执行淡入动画，通过透明度增大或减小实现

返回值： Anything   

示例： $('#fadeToggletest').fadeToggle(), $('#fadeToggletest').fadeToggle(1000), $('#fadeToggletest').fadeToggle(1000, function(){ alert('a fadeToggle'))...
```

#### 8.8 滑下
```
方法名称： $(slelector1).slideDown([time], [callback])

说明： 为匹配元素执行滑下动画，通过增大高度实现

返回值： Anything   

示例： $('#slideDowntest').slideDown(), $('#slideDowntest').slideDown(1000), $('#slideDowntest').slideDown(1000, function(){ alert('a slideDown'))...
```

#### 8.9 滑上
```
方法名称： $(slelector1).slideUp([time], [callback])

说明： 为匹配元素执行滑上动画，通过减小高度实现

返回值： Anything   

示例： $('#slideUptest').slideUp(), $('#slideUptest').slideUp(1000), $('#slideUptest').slideUp(1000, function(){ alert('a slideUp'))...
```

#### 8.10 滑下和滑上切换
```
方法名称： $(slelector1).slidetoggle([time], [callback])

说明： 为匹配元素执行滑上动画，通过减小高度实现

返回值： Anything   

示例： $('#slidetoggletest').slidetoggle(), $('#slidetoggletest').slidetoggle(1000), $('#slidetoggletest').slidetoggle(1000, function(){ alert('a slidetoggle'))...
```

#### 8.11 通用动画
```
方法名称： $(slelector1).animate(obj_attr, [time], [callback])

说明： 为匹配元素执行动画到达参数obj_attr指定属性，time为动画完成时间，callback在动画完成后执行，前面的常用动画后台调用了该方法，时间参数默认500ms，所有动画均可以队列形式来按顺序执行

返回值： Anything   

示例： $('#slidetoggletest').animate({width:400px,height:200px;}, 1000), $('#slidetoggletest').animate({width:400px,height:200px;}, 1000, function(){ alert('a slidetoggle'))...
```

#### 8.12 停止动画
```
方法名称： $(slelector1).stop([flag1], [flag2])

说明： 停止匹配元素的当前动画，具体执行由参数确定:a, stop(),等价于stop(false,false)，仅仅停止“当前执行”这段动画，后面的动画还可以继续执行;  b, stop(true),等价于stop(true,false)，停止所有动画，包括当前执行的动画;  c,  stop(true,true),停止所有动画，但是允许执行当前动画;  d, stop(false,true),停止“当前执行”这段动画，然后调到最后一个动画，并且执行最后一个动画

返回值： Anything   

示例： $('#stoptest').stop(), $('#stoptest').stop(true),$('#stoptest').stop(true,true), $('#stoptest').stop(false,true)
```

#### 8.13 延时动画
```
方法名称： $(slelector1).delay(time)

说明： 为匹配元素执行延时动画，后续动画需等待指定时间方可执行

返回值： Anything   

示例： $('#delaytest').delay(1000)...
```

### 9. Ajax方法
```
方法名称： $.ajax(ajax)

说明： 动态请求数据，传入一个参数对象：a. type : 请求方式，get或post，默认为get; b. url : 发送请求的地址; c. data : 发送的数据，为数组格式; d. success : 请求成功后的回调函数

返回值： undefined   

示例： $('ajaxtest').click(event){ $.ajax({ type : 'post', url : 'http://127.0.0.1/ajaxTest/data.php?rand='+Math.random(), data : [{ name : 'lee', age : '23' }], success : function(data){ alert(data);}}); }...
```

### 10. 常用函数
#### 10.1 阻止默认事件
```
方法名称： $.preventDefault(event)

说明： 阻止默认事件，比如a的跳转，submit的提交，鼠标右击显示菜单等

返回值： undefined   

示例： $(a).click(event){ $.preventDefault(event) }...
```

#### 10.2 阻止冒泡
```
方法名称： $.stopPropagation(event)

说明： 阻止冒泡，当前节点触发的事件不会冒泡到父级节点

返回值： undefined   

示例： $(a).click(event){ $.stopPropagation(event) }...
```

#### 10.3 获取键码
```
方法名称： $.getCharCode(event)

说明： 获取当前按键的键码，可用String.fromCharCode方法将键码转化为按键，尽量不使用keypress事件获取值，不同浏览器有误差，应使用keydown或keyup事件，可输出键盘上A-Z，0-9（无法正确输出其他键）

返回值： undefined   

示例： $(document).keydown( function(event){ alert(String.fromCharCode($.getCharCode(event))) })...
```

#### 10.4 获取鼠标按键
```
方法名称： $.getButton(event)

说明： 在mousedown和mouseup事件中检测按下了哪个键，0表示左键，1表示中间滚轮键，2表示右键

返回值： Number   

示例： $(document).mousedown( function(event){ alert($.getButton(event)) })...
```

#### 10.4 获取鼠标在浏览器窗口的位置
```
方法名称： $.getClientPosition(event)

说明： 获取鼠标在浏览器窗口的位置（在click，contextmenu，mousedown，mouseup中使用）

返回值： Object   

示例： $(document).click( function(event){ var position = $.getClientPosition(event); alert('X:' + positon. left+'px, Y:' + position.top + 'px') })...
```

#### 10.5 获取鼠标在页面内容的位置
```
方法名称： $.getPagePosition(event)

说明： 获取鼠标在页面内容的位置（在click，contextmenu，mousedown，mouseup中使用）

返回值： Object   

示例： $(document).click( function(event){ var position = $.getPagePosition(event); alert('X:' + position. left+'px, Y:' + position.top + 'px') })...
```

#### 10.6 获取鼠标在整个屏幕的位置
```
方法名称： $.getScreenPosition(event)

说明： 获取鼠标在页面内容的位置（在click，contextmenu，mousedown，mouseup中使用）

返回值： Object   

示例： $(document).click( function(event){ var position = $.getScreenPosition(event); alert('X:' + position. left+'px, Y:' + position.top + 'px') })...
```

































































