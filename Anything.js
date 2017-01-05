//console.log('Welcome to use Anything.js!');
function $(args){
	return new Base(args);
};
function Base(args) {
	this.elements = [];

	if(typeof args == 'string'){
		if(document.querySelectorAll  === 'dddddddddddddddddddddd'){	//IE8+
			this.elements = document.querySelectorAll(args);
		}else{
			if(args.indexOf(' ') == -1){	//当只有一个参数时
				switch(args.charAt(0)){
					case '#':
						this.elements = this.getById(args.slice(1));
						break;
					case '.':
						this.elements = this.getByClassName(args.slice(1));
						break;
					default:
						this.elements = this.getByTagName(args);
				}
			}else{		//当有多层次选择符时
				//.id .class p
				var parents = [document],		//父节点初始为document
					childs = [];				//临时存储查找到的节点
				var arr_args = args.split(' ');		//把选择符分成一个数组
				//console.log(arr_args)
				for(var i=0,len=arr_args.length; i<len; i++){
					if(arr_args[i] === '') continue;	//保证在不小心输入多个空格时也能正确获取
					//if(parents.length == 0) parents.push(document);
					switch(arr_args[i].charAt(0)){
						case '#':
							childs = [];
							childs = this.getById(arr_args[i].slice(1));
							parents = childs;
							//console.log(childs)
							break;

						case '.':
							childs = [];
							for(var j = 0; j < parents.length; j++){
								var temp = this.getByClassName(arr_args[i].slice(1),parents[j]);	
								for(var k = 0; k < temp.length; k++){
									childs.push(temp[k]);
								}						
							}
							parents = childs;
							break;

						default:
							childs = [];
							for(var j = 0; j < parents.length; j++){
								var temp = this.getByTagName(arr_args[i],parents[j]);
								for(var k = 0; k < temp.length; k++){
									childs.push(temp[k]);
								}	
							}
							parents = childs;
							break;
					}
				}
				this.elements = childs;
			}
		}
	}else if(typeof args == 'object'){
		this.elements[0] = args;
	}else{
		errorArgs();
	}

}

//***********************************获取元素*****************************************
//根据id获取
Base.prototype.getById = function(id) {
	if(typeof id != 'string') errorArgs();	//参数检测

	var result = document.getElementById(id);
	return result == null? []:[result];	//无匹配id时会返回null
};

//根据tag获取
Base.prototype.getByTagName = function(tag_name,parent_node){
	if(typeof tag_name != 'string') errorArgs(); //参数检测

	var node = parent_node == undefined? document : parent_node;
	var result = [];
	var tags = node.getElementsByTagName(tag_name);
	for(var i=0; i<tags.length; i++){
		result.push(tags[i]);
	}
	return result;
}
//根据class获取
Base.prototype.getByClassName = function(class_name,parent_node){
	if(typeof class_name != 'string') errorArgs(); //参数检测

	var node = parent_node == undefined? document : parent_node;
	var result = [];
	if(document.getElementsByClassName){	//W3C   IE9+ 
		var clas = node.getElementsByClassName(class_name);
		for(var i=0; i<clas.length; i++){
			result.push(clas[i]);
		}
	}else{				//IE6,7,8
		var all = node.getElementsByTagName('*');
		for(var i=0,len=all.length;i<len;i++){
			var arr_class = all[i].className.split(' ');
			for(var j=0,len2=arr_class.length;j<len2;j++){
				if(arr_class[j]==class_name){
					result.push(all[i]);
					break;
				}
			}
		}
	}
	return result;
}

//根据下标获取
//示例：$('div p').eq(2)
Base.prototype.eq = function(index){
	if(typeof eq != 'number') errorArgs(); //参数检测

	var temp = this.elements[index];
	this.elements = [];
	this.elements.push(temp);
	return this;
}

//***********************************属性操作*****************************************
//获取和设置属性
//示例：$('div p').attr('title')
Base.prototype.attr = function(name,value){
	if(typeof name != 'string') errorArgs(); //参数检测

	if(value === undefined){	//当参数只有一个时表示获取属性
			return this.elements[0].getAttribute(name);		
	}else{				//当参数有两个时表示设置属性
		for(var i=0; i<this.elements.length; i++){
			this.elements[i].setAttribute(name,value);
		}		
		return this;
	}
}

//删除属性
Base.prototype.removeAttr = function(name){
	if(typeof name != 'string') errorArgs(); //参数检测

	for(var i=0; i<this.elements.length; i++){
		this.elements[i].removeAttribute(name);
	}		
	return this;
}

//***********************************内容操作*****************************************
//获取和设置innerHTML内容
Base.prototype.html = function(content){
	if(typeof content != 'string') errorArgs(); //参数检测

	if(arguments.length == 0){
		return this.elements[0].innerHTML;
	}else{
		for(var i=0; i<this.elements.length; i++){
			this.elements[i].innerHTML = content;
		}		
		return this;
	}
}

//获取和设置文本内容
Base.prototype.text = function(content){
	if(typeof content != 'string') errorArgs(); //参数检测

	if(arguments.length == 0){
		var result = '';
		for(var i=0; i<this.elements.length; i++){
			result += this.elements[i].innerText;
		}
	}else{
		for(var i=0; i<this.elements.length; i++){
			this.elements[i].innerText = content;
		}		
		return this;
	}
}

//获取和设置表单内容
Base.prototype.val = function(value){

	if(arguments.length == 0){
		return this.elements[0].value;
	}else{
		for(var i=0; i<this.elements.length; i++){
			this.elements[i].value = value;
		}		
		return this;
	}
}

//***********************************样式操作*****************************************
//在获取颜色时格式会有差异，ie是原本值，其他是计算后的rgb
//不支持同时设置多个属性，可用连缀来实现
Base.prototype.css = function(attr,value){
	if(typeof attr != 'string' && typeof value != 'string') errorArgs(); //参数检测

	if(arguments.length == 1){
		return getStyle(this.elements[0],attr);
	}else{
		for(var i=0; i<this.elements.length; i++){
			this.elements[i].style[attr] = value;
		}
		return this;
	}
}

//***********************************类名操作*****************************************
//添加类名
Base.prototype.addClass = function(class_name){
	if(typeof class_name != 'string') errorArgs(); //参数检测

	for(var i=0; i<this.elements.length; i++){
		var temp = this.elements[i].className.split(' ');
		var flag = false;	//表示未包含当前类名
		for(var j=0; j<temp.length; j++){	//进行类名检查
			if(temp[j] == class_name){
				flag = true;
				break;
			}
		}
		if(flag == false){
			temp.push(class_name);
			this.elements[i].className = temp.join(' ');
		}
	}
	return this;
}

//删除类名
Base.prototype.removeClass = function(class_name){
	if(typeof class_name != 'string') errorArgs(); //参数检测

	for(var i=0; i<this.elements.length; i++){
		var temp = this.elements[i].className.split(' ');
		for(var j=0; j<temp.length; j++){	//进行类名检查
			if(temp[j] == class_name){
				temp[j] = '';
			}
		}
		this.elements[i].className = temp.join(' ');
	}
	return this;
}

//切换类名
Base.prototype.toggleClass = function(class_name){
	if(typeof class_name != 'string') errorArgs(); //参数检测

	for(var i=0; i<this.elements.length; i++){
		var temp = this.elements[i].className.split(' ');
		var flag = false;	//表示未包含当前类名
		for(var j=0; j<temp.length; j++){	//进行类名检查
			if(temp[j] == class_name){
				temp[j] = '';
				flag = true;
			}
		}
		if(flag == false){
			temp.push(class_name);			
		}
		this.elements[i].className = temp.join(' ');
	}
	return this;
}

//***********************************大小操作*****************************************
//获取和设置元素width
Base.prototype.width = function(value){
	var width = parseInt(getStyle(this.elements[0],'width'));	//将px值转化为number
	if(arguments.length == 1){
		this.css('width',value+'px');
	}else{
		return width;
	}
	return this;
}

//获取和设置元素innerWidth (width+padding)
Base.prototype.innerWidth = function(value){
	var width = parseInt(getStyle(this.elements[0],'width'));	//将px值转化为number
	var padding_left = parseInt(getStyle(this.elements[0],'padding-left'));	//将px值转化为number
	var padding_right = parseInt(getStyle(this.elements[0],'padding-right'));	//将px值转化为number
	var padding = padding_left + padding_right;
	var innerWidth = width+padding;
	
	if(arguments.length == 1){
		if(value > padding){
			this.css('width',value-padding+'px');
		}else{
			this.css('width','0px');
		}
		
	}else{
		return innerWidth;
	}
	return this;
}

//获取和设置元素outerWidth (width+padding+border)
Base.prototype.outerWidth = function(value){
	var width = parseInt(getStyle(this.elements[0],'width'));	//将px值转化为number
	//padding距离
	var padding_left = parseInt(getStyle(this.elements[0],'padding-left'));	
	var padding_right = parseInt(getStyle(this.elements[0],'padding-right'));	
	var padding = padding_left + padding_right;
	//border距离
	var border_left = parseInt(getStyle(this.elements[0],'border-left'));
	var border_right = parseInt(getStyle(this.elements[0],'border-right'));
	var border = border_left + border_right;

	var outerWidth = width + padding + border;
	
	if(arguments.length == 1){
		if(value > padding+border){
			this.css('width',value-padding-border+'px');
		}else{
			this.css('width','0px');
		}
		
	}else{
		return outerWidth;
	}
	return this;
}



//获取和设置元素height
Base.prototype.height = function(value){
	var height = parseInt(getStyle(this.elements[0],'height'));	//将px值转化为number
	if(arguments.length == 1){
		this.css('height',value+'px');
	}else{
		return height;
	}
	return this;
}

//获取和设置元素innerHeight (height+padding)
Base.prototype.innerHeight = function(value){
	var height = parseInt(getStyle(this.elements[0],'height'));	//将px值转化为number
	var padding_top = parseInt(getStyle(this.elements[0],'padding-top'));	//将px值转化为number
	var padding_bottom = parseInt(getStyle(this.elements[0],'padding-bottom'));	//将px值转化为number
	var padding = padding_top + padding_bottom;
	var innerHeight = height+padding;
	
	if(arguments.length == 1){
		if(value > padding){
			this.css('height',value-padding+'px');
		}else{
			this.css('height','0px');
		}
		
	}else{
		return innerHeight;
	}
	return this;
}

//获取和设置元素outerHeight (height+padding+border)
Base.prototype.outerHeight = function(value){
	var height = parseInt(getStyle(this.elements[0],'height'));	//将px值转化为number
	//padding距离
	var padding_top = parseInt(getStyle(this.elements[0],'padding-top'));	
	var padding_bottom = parseInt(getStyle(this.elements[0],'padding-bottom'));	
	var padding = padding_top + padding_bottom;
	//border距离
	var border_top = parseInt(getStyle(this.elements[0],'border-top'));
	var border_bottom = parseInt(getStyle(this.elements[0],'border-bottom'));
	var border = border_top + border_bottom;

	var outerHeight = height + padding + border;
	
	if(arguments.length == 1){
		if(value > padding+border){
			this.css('height',value-padding-border+'px');
		}else{
			this.css('height','0px');
		}
		
	}else{
		return outerHeight;
	}
	return this;
}


//***********************************位置操作*****************************************
//offset(),表示元素在文档中的位置
Base.prototype.offset = function(){
	var parent = this.elements[0].offsetParent;
	var result = {};	
	result.left = this.elements[0].offsetLeft;
	result.top = this.elements[0].offsetTop;
	//console.log(parent)
	while(parent !== null){
		result.left += parent.offsetLeft;
		result.top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return result;
}

//相对于定位元素的位置
Base.prototype.position = function(){
	return {
		left : parseInt(this.elements[0].offsetLeft),
		top : parseInt(this.elements[0].offsetTop)
	}
}


//***********************************DOM操作*****************************************
//***********************************插入节点****************************************
//内部后面插入节点
//示例：$('ul').append('<li>haha</li>');
//在IE8-中添加非法便签格式便无效，例如<p><li>zz</li></p>
Base.prototype.append = function(str){
	if(typeof str.nodeType == 'number'){		//如果传入一个元素节点转化成字符串
		str = str.outerHTML;
	}
	for(var i=0; i<this.elements.length; i++){
		var html = this.elements[i].innerHTML;
		html += str;	
		this.elements[i].innerHTML = html;	
	}
	return this;
}

//内部前面插入节点
//示例：$('ul').prepend('<li>haha</li>');
//在IE8-中添加非法便签格式便无效，例如<p><li>zz</li></p>
Base.prototype.prepend = function(str){
	if(typeof str.nodeType == 'number'){
		str = str.outerHTML;
	}
	for(var i=0; i<this.elements.length; i++){
		var html = this.elements[i].innerHTML;
		html = str+html;	
		this.elements[i].innerHTML = html;			
	}
	return this;
}

//外部后面插入节点
//示例：$('ul').prepend('<li>haha</li>');
//在IE8-中添加非法便签格式便无效，例如<p><li>zz</li></p>
Base.prototype.after = function(str){
	if(typeof str.nodeType == 'number'){
		str = str.outerHTML;
	}
	for(var i=0; i<this.elements.length; i++){
		var html = this.elements[i].outerHTML;
		html += str;	
		this.elements[i].outerHTML = html;			
	}
	return this;
}

//外部前面插入节点
//示例：$('ul').prepend('<li>haha</li>');
//在IE8-中添加非法便签格式便无效，例如<p><li>zz</li></p>
Base.prototype.before = function(str){
	if(typeof str.nodeType == 'number'){
		str = str.outerHTML;
	}
	for(var i=0; i<this.elements.length; i++){
		var html = this.elements[i].outerHTML;
		html = str + html;	
		this.elements[i].outerHTML = html;			
	}
	return this;
}

//***********************************删除节点*****************************************
//删除所有选中的节点，并返回一个删除的节点数组
Base.prototype.remove = function(){
	for(var i=0; i<this.elements.length; i++){
		this.elements[i].parentNode.removeChild(this.elements[i]);		
	}
	return this.elements;
}

//***********************************克隆节点*****************************************
//true表示深克隆，会复制子节点，false则不会,默认为true
//只能克隆节点，未实现JQuery的复制事件
Base.prototype.clone = function(flag){
	return flag === false? this.elements[0].cloneNode(false) : this.elements[0].cloneNode(true);
}

//***********************************替换节点*****************************************
Base.prototype.replaceWith = function(str){
	if(typeof str.nodeType == 'number'){
		str = str.outerHTML;
	}
	for(var i=0; i<this.elements.length; i++){
		this.elements[i].outerHTML = str;
	}
}

//***********************************包裹节点*****************************************
//只能传入字符串，例如：'<div></div>'，只能有一个节点
//单独包裹每个节点
Base.prototype.wrap = function(str){
	if(typeof str != 'string')	errorArgs();  //参数检测	
	var temp = str.split('></');
	if(temp.length != 2)  errorArgs();  //参数检测

	for(var i=0; i<this.elements.length; i++){
		var html = this.elements[i].outerHTML;
		html = temp[0] + '>' + html + '</' + temp[1]; 
		this.elements[i].outerHTML = html;
	}
}

//整体包裹
//只包裹第一组连续的节点
Base.prototype.wrapAll = function(str){
	if(typeof str != 'string')	errorArgs();  //参数检测	
	var temp = str.split('></');
	if(temp.length != 2)  errorArgs();  //参数检测
	//找到第一组连续的节点
	var html = this.elements[0].outerHTML;
	for(var i=1; i<this.elements.length; i++){	
		//根据上一兄弟节点是否为数值上一元素来判断是否连续
		if(getPreviousSibling(this.elements[i]) == this.elements[i-1]){
			html += this.elements[i].outerHTML;
		}else{
			break;
		}
	}
	//把连续节点的outerHTML拼接起来，统一作为this.elements[0]的outerHTML,后面的节点删除
	for(var j=1; j<i; j++){
		this.elements[j].parentNode.removeChild(this.elements[j]);
	}
	this.elements[0].outerHTML = temp[0] + '>' + html + '</' + temp[1];
}

//包裹内部元素
Base.prototype.wrapInner = function(str){
	if(typeof str != 'string')	errorArgs();  //参数检测	
	var temp = str.split('></');
	if(temp.length != 2)  errorArgs();  //参数检测

	for(var i=0; i<this.elements.length; i++){	
		this.elements[i].innerHTML = temp[0] + '>' + this.elements[i].innerHTML + '</' + temp[1];
	}

}



















//参数不合法报错
function errorArgs(){
	throw new Error('参数不合法！');
}





//获取计算样式
function getStyle(element,attr) {
	var style = null;
	if(window.getComputedStyle){	//W3C
		style = window.getComputedStyle(element,null);
	}else if(element.currentStyle){			//IE
		style = element.currentStyle;
	}
	return style[attr];
}

//获取浏览器窗口大小
function getViewport(){
　　if (document.compatMode == "BackCompat"){	//兼容IE6
　　　　return {
	　　　　　width: document.body.clientWidth,
　　　　　　　height: document.body.clientHeight
　　　　}
　　} else {
　　　　return {
　　　　　　　width: document.documentElement.clientWidth,
　　　　　　　height: document.documentElement.clientHeight
　　　　}
　　}
}

//获取页面内容大小
function getPagearea(){
　　　if (document.compatMode == "BackCompat"){
　　　　　return {
　　　　　　　width: Math.max(document.body.scrollWidth,
　　　　　　　　　　　　　　　document.body.clientWidth),
　　　　　　　height: Math.max(document.body.scrollHeight,
　　　　　　　　　　　　　　　document.body.clientHeight)
			}
　　　} else {
　　　　　return {
　　　　　　　width: Math.max(document.documentElement.scrollWidth,
　　　　　　　　　　　　　　　document.documentElement.clientWidth),
　　　　　　　height: Math.max(document.documentElement.scrollHeight,
　　　　　　　　　　　　　　　document.documentElement.clientHeight)
　　　    }
      }
}

//获取滚动条位置（Chrome依赖事件触发才能正确获取）
function getScrollTop(){
	// return {			//可获取scrollLeft
	// 	left : document.documentElement.scrollLeft || document.body.scrollLeft,
	// 	top : document.documentElement.scrollTop || document.body.scrollTop
	// }
	return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
}

//设置滚动条位置（Chrome依赖事件触发才能正确获取）
function setScrollTop(scroll_top) {
	document.documentElement.scrollTop = scroll_top;
	window.pageYOffset = scroll_top;
	document.body.scrollTop = scroll_top;
}

//获取上一个兄弟节点，过滤掉空格和回车生成的文本节点
function getPreviousSibling(node){
	var result = node.previousSibling;
	var reg = /^\s+$/;		// \s匹配空格和换行符
	//当某个节点没有上一个兄弟节点时会返回null或undefined，导致test方法报错
	while(result != null && reg.test(result.nodeValue)){	
		result = result.previousSibling;		
	}
	return result;
}

 
