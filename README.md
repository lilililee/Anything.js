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
方法名称： $(slelector1).each(function)

说明： 遍历匹配元素，传入一个函数进行操作，该函数第一个参数默认为元素下标

返回值： Anything

示例： $('p').each(function(){ alert(this.tagName) })...
```





























































