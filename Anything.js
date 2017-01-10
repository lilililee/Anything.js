console.log('Welcome to use Anything.js!');
function $(args){
	return new Base(args);
};
function Base(args) {
	this.elements = [];

	if(typeof args == 'string'){
		if(document.querySelectorAll  === 'dddddddddddddddddddddd'){	//IE8+
			this.elements = document.querySelectorAll(args);
		}else{
			if(args.indexOf(' ') == -1){	//当只有一个参数时,下面的多层次选择符也能实现，但这个效率更高
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
				var parents = [document],				//父节点初始为document
					childs = [];						//临时存储查找到的节点
				var arr_args = args.split(' ');			//把选择符分成一个数组
				//console.log(arr_args)
				for(var i=0,len=arr_args.length; i<len; i++){
					if(arr_args[i] === '') continue;	//保证在不小心输入多个空格时也能正确获取
					switch(arr_args[i].charAt(0)){
						case '#':
							childs = [];
							childs = this.getById(arr_args[i].slice(1));
							parents = childs;
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
		if(typeof args.length == 'number' && args != window){
			for(var i=0; i<args.length; i++){
				this.elements.push(args[i]);
			}
		}else{
				this.elements[0] = args;
		}	
	}else if(typeof args == 'function'){
		documentReady(args);
	}
	else{
		errorArgs();
	}

}

//***********************************获取元素*****************************************
//根据id获取
Base.prototype.getById = function(id) {
	if(typeof id != 'string') errorArgs();			//参数检测

	var result = document.getElementById(id);
	return result == null? []:[result];				//无匹配id时会返回null
};

//根据tag获取
Base.prototype.getByTagName = function(tag_name,parent_node){
	if(typeof tag_name != 'string') errorArgs();    //参数检测

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
	if(typeof class_name != 'string') errorArgs();  //参数检测

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

	if(value === undefined){				//当参数只有一个时表示获取属性
			return this.elements[0].getAttribute(name);		
	}else{									//当参数有两个时表示设置属性
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
	if(typeof attr != 'string') errorArgs(); //参数检测

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
	if(typeof class_name != 'string') errorArgs();  //参数检测

	for(var i=0; i<this.elements.length; i++){
		var temp = this.elements[i].className.split(' ');
		var flag = false;							//表示未包含当前类名
		for(var j=0; j<temp.length; j++){			//进行类名检查
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
	if(typeof class_name != 'string') errorArgs();  //参数检测

	for(var i=0; i<this.elements.length; i++){
		var temp = this.elements[i].className.split(' ');
		for(var j=0; j<temp.length; j++){			//进行类名检查
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
	if(typeof class_name != 'string') errorArgs();  //参数检测

	for(var i=0; i<this.elements.length; i++){
		var temp = this.elements[i].className.split(' ');
		var flag = false;							//表示未包含当前类名
		for(var j=0; j<temp.length; j++){			//进行类名检查
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
	//offsetHeight包括边框在内，所有浏览器都支持，所以基于该值来计算
	var outerWidth = this.elements[0].offsetWidth;	
	//border距离
	var border_left = parseFloat(getStyle(this.elements[0],'border-left'));
	var border_right = parseFloat(getStyle(this.elements[0],'border-right'));
	var border = border_left + border_right;
	var innerWidth = outerWidth - border;
	if(arguments.length == 0){
		return innerWidth;
	}else if(typeof arguments[0] == 'number'){
		//padding距离
		var padding_left = parseFloat(getStyle(this.elements[0],'padding-left'));	
		var padding_right = parseFloat(getStyle(this.elements[0],'padding-right'));	
		var padding = padding_left + padding_right;
		if(value > padding){
			this.css('width',value-padding+'px');
		}else{
			this.css('width','0px');
		}		
	}else{
		errorArgs();
	}
	return this;
}

//获取和设置元素outerWidth (width+padding+border)
Base.prototype.outerWidth = function(value){
	//offsetHeight包括边框在内，所有浏览器都支持，所以基于该值来计算
	var outerWidth = this.elements[0].offsetWidth;		
	if(arguments.length == 0){
		return outerWidth;
	}else if(typeof arguments[0] == 'number'){	
		//padding距离
		var padding_left = parseFloat(getStyle(this.elements[0],'padding-left'));	
		var padding_right = parseFloat(getStyle(this.elements[0],'padding-right'));	
		var padding = padding_left + padding_right;
		//border距离
		var border_left = parseFloat(getStyle(this.elements[0],'border-left'));
		var border_right = parseFloat(getStyle(this.elements[0],'border-right'));
		var border = border_left + border_right;

		//通过设置Width来控制outerWidth大小，不会改变padding和border大小
		if(value > padding+border){	
			this.css('width',value-padding-border+'px');
		}else{
			this.css('width','0px');
		}		
	}else{
		errorArgs();
	}
	return this;
}



//获取和设置元素height
Base.prototype.height = function(value){
	var height = parseFloat(getStyle(this.elements[0],'height'));	//将px值转化为number
	if(arguments.length == 1){
		this.css('height',value+'px');
	}else{
		return height;
	}
	return this;
}

//获取和设置元素innerHeight (height+padding)
Base.prototype.innerHeight = function(value){
	//offsetHeight包括边框在内，所有浏览器都支持，所以基于该值来计算
	var outerHeight = this.elements[0].offsetHeight;	
	//border距离
	var border_top = parseFloat(getStyle(this.elements[0],'border-top'));
	var border_bottom = parseFloat(getStyle(this.elements[0],'border-bottom'));
	var border = border_top + border_bottom;
	var innerHeight = outerHeight - border;
	if(arguments.length == 0){
		return innerHeight;
	}else if(typeof arguments[0] == 'number'){
		//padding距离
		var padding_top = parseFloat(getStyle(this.elements[0],'padding-top'));	
		var padding_bottom = parseFloat(getStyle(this.elements[0],'padding-bottom'));	
		var padding = padding_top + padding_bottom;
		if(value > padding){
			this.css('height',value-padding+'px');
		}else{
			this.css('height','0px');
		}		
	}else{
		errorArgs();
	}
	return this;
}

//获取和设置元素outerHeight (height+padding+border)
Base.prototype.outerHeight = function(value){
	//offsetHeight包括边框在内，所有浏览器都支持，所以基于该值来计算
	var outerHeight = this.elements[0].offsetHeight;		
	if(arguments.length == 0){
		return outerHeight;
	}else if(typeof arguments[0] == 'number'){	
		//padding距离
		var padding_top = parseFloat(getStyle(this.elements[0],'padding-top'));	
		var padding_bottom = parseFloat(getStyle(this.elements[0],'padding-bottom'));	
		var padding = padding_top + padding_bottom;
		//border距离
		var border_top = parseFloat(getStyle(this.elements[0],'border-top'));
		var border_bottom = parseFloat(getStyle(this.elements[0],'border-bottom'));
		var border = border_top + border_bottom;

		//通过设置height来控制outerHeight大小，不会改变padding和border大小
		if(value > padding+border){	
			this.css('height',value-padding-border+'px');
		}else{
			this.css('height','0px');
		}		
	}else{
		errorArgs();
	}
	return this;
}


//***********************************位置操作*****************************************
//offset(),表示元素在文档中的位置(根据边框左上角外层的点计算)
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
		left : parseFloat(this.elements[0].offsetLeft),
		top : parseFloat(this.elements[0].offsetTop)
	}
}
//------------------------------------------------------------------------------------
//----------------------------------- DOM操作 ----------------------------------------
//------------------------------------------------------------------------------------

//***********************************插入节点*****************************************
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
//删除所有选中的节点(自身节点和后代节点)，并返回一个删除的节点数组
Base.prototype.remove = function(){
	for(var i=0; i<this.elements.length; i++){
		this.elements[i].parentNode.removeChild(this.elements[i]);		
	}
	return this.elements;
}

//删除选中节点的后代节点（不包括自身）
Base.prototype.empty = function(){
	for(var i=0; i<this.elements.length; i++){
		console.log(this.elements[i].outerHTML)
		console.log(this.elements[i].innerHTML)
		this.elements[i].outerHTML = this.elements[i].outerHTML.replace(this.elements[i].innerHTML,'');		
	}
	return this;
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
	if(temp.length != 2)  errorArgs();  	  //参数检测

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

//***********************************遍历节点*****************************************
//callback的第一个参数表示节点数组index
//callback中this指向当前节点
Base.prototype.each = function(callback){
	for(var i=0; i<this.elements.length; i++){
		this.elements[i].fn = callback;
		this.elements[i].fn(i);
		this.elements[i].fn = null;
	}
}


//------------------------------------------------------------------------------------
//-----------------------------------事    件-----------------------------------------
//------------------------------------------------------------------------------------

//所有事件都可以在callback中同过this访问当前绑定事件的对象！！！

//***********************************载入事件*****************************************
//在JQuery中采用$(document).ready(fn)的格式
//传入document时只需等dom元素加载完成，而传入window时需要等外部图片加载
//采用JQuery的写法，document加载后即执行
//示例1：
// $(document).ready(function(){
// 	alert('document')
// });
//实例2：
// $(function(){
// 	alert('document');
// });
//$()中传入document和函数时在document加载后即可运行，其他都是window加载后再运行
Base.prototype.ready = function(callback){	
	if(this.elements[0] == document){
		documentReady(callback);
	}else{
		addEvent(window,'load',callback);
	}	
}

//窗口大小变化
Base.prototype.resize = function(callback){
	addEvent(window,'resize',callback);
	return this;
}

//***********************************鼠标事件*****************************************
//注意！！！用addEvent绑定事件，在IE8-中this不是指定当前绑定事件的节点，callback函数中有this会导致出错
//可以按需求来调整addEvent的函数内容（在addEvent中已去除attachEvent方法）
//单击
Base.prototype.click = function(callback){
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'click',callback);
	}
	return this;
}

//双击，js本身没有双击事件，根据两次click事件的时间间距来实现
Base.prototype.dbclick = function(callback){
	var start = 0;
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'click',function(){
			if(new Date - start < 500){
				callback.call(this);	//此处是闭包，导致callback中this指向全局，应指向绑定事件的对象
				start = 0;
			}else{
				start = new Date;
			}		
		});
	}
	return this;
}

//移入(子节点有移入事件也会触发)
Base.prototype.mouseover = function(callback){
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'mouseover',callback);
	}
	return this;
}

//移出(子节点有移出事件也会触发)
Base.prototype.mouseout = function(callback){
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'mouseout',callback);
	}
	return this;
}

//移入(子节点有移入事件不会触发)
//方案1：js原生onmouseenter  IE8-也支持，但是最新火狐中表现为onmouseover一样
//方案2：判断鼠标从元素A->B（目标对象）,如果B包含A证明是子节点冒泡触发事件，不做任何操作（推荐！）
//方案3：也可对目标节点的所有子节点绑定mouseover事件，然后阻止冒泡，需要绑定较多事件
Base.prototype.mouseenter = function(callback){
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'mouseover',function(event){
			if(!contains(this, getFromElement(event))){	//判断绑定事件的节点是否包含鼠标来着的元素
				callback.call(this);	//此处是闭包，导致callback中this指向全局，应指向绑定事件的对象			
			}
		});
	}
	return this;
}

//移出(子节点有移入事件不会触发) 同上
Base.prototype.mouseleave = function(callback){
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'mouseout',function(event){
			if(!contains(this, getToElement(event))){	//判断绑定事件的节点是否包含鼠标来着的元素
				callback.call(this);	//此处是闭包，导致callback中this指向全局，应指向绑定事件的对象			
			}
		});
	}
	return this;
}

//按下
//click只能靠鼠标左键触发，但是mousedown和mouseup能靠鼠标的左中右键触发
//可以通过事件对象中的button属性来确定按下了哪个键
Base.prototype.mousedown = function(callback){
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'mousedown',callback);
	}
	return this;
}

//弹起
Base.prototype.mouseup = function(callback){
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'mouseup',callback);
	}
	return this;
}

//右击
//监听全局使用document
Base.prototype.contextmenu = function(callback){
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'contextmenu',callback);
	}
	return this;
}

//滚动
//也可用document来监听onscroll事件，但IE8-不支持，推荐使用window
Base.prototype.scroll = function(callback){
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'scroll',callback);
	}
	return this;
}

//***********************************键盘事件*****************************************
//详细说明：http://www.lvyestudy.com/jquery/jq_7.4.aspx
//String.fromCharCode(event.which) 可以用该方法输出按下的字符键，功能键不可以
//keydown，所有键（字符键+功能键）按下均会触发
Base.prototype.keydown = function(callback){
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'keydown',callback);
	}
	return this;
}

//keypress，按下后到松开前时触发，（字符键）按下才会触发，alt，ctrl，f1-f12等均检测不到
Base.prototype.keypress = function(callback){
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'keypress',callback);
	}
	return this;
}

//keyup，所有键（字符键+功能键）按下均会触发
Base.prototype.keyup = function(callback){
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'keyup',callback);
	}
	return this;
}

//***********************************表单事件*****************************************
//获得焦点
Base.prototype.focus = function(callback){
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'focus',callback);
	}
	return this;
}

//失去焦点
Base.prototype.blur = function(callback){
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'blur',callback);
	}
	return this;
}

//内容改变，在失去焦点时才会检测
//text,textarea,下拉菜单  可以触发change事件
Base.prototype.change = function(callback){
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'change',callback);
	}
	return this;
}

//内容选中，在选中文本后松开鼠标后才触发(在IE8-中每选中一个字符就会触发一次)
//text,textarea 可以触发select事件，下拉菜单不会触发
Base.prototype.select = function(callback){
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],'select',callback);
	}
	return this;
}

//***********************************绑定事件*****************************************
//表现结果和上面的绑定方法一样
Base.prototype.on = function(type,callback){
	this[type](callback);
	return this;
}

//***********************************解除事件*****************************************
//无法解除dbclick，mouseenter，mouseleave
//因为这三个事件是通过绑定click，mouseover，mouseout来实现的，应该解除这3个事件
Base.prototype.off = function(type,callback){
	for(var i=0; i<this.elements.length; i++){
		removeEvent(this.elements[i],type,callback);
	}
	return this;
}

//***********************************合成事件*****************************************
//传入移入和移出的回调函数，用mouseenter和mouseleave来实现
Base.prototype.hover = function(callback1,callback2){
	this.mouseenter(callback1);
	this.mouseleave(callback2);
	return this;
}

//***********************************一次事件*****************************************
//使用DOM0级绑定方法
//缺点：1.dbclick无效；2.mouseenter，mouseleave在Firefox下表现和mouseover，mouseout一样
Base.prototype.one = function(type,callback){
	for(var i=0; i<this.elements.length; i++){
		this.elements[i]['on'+type] = function(){
			callback.call(this);
			this['on'+type] = null;
		}
	}
	return this;
}

//------------------------------------------------------------------------------------
//-----------------------------------动    画-----------------------------------------
//------------------------------------------------------------------------------------

//***********************************显示和隐藏***************************************
//$('img').hide();					直接设置display为none
//$('img').hide(1000);				在1000ms内逐渐减小宽度，高度和不透明度
//$('img').hide(1000,callback);		动画执行完后执行回调函数
//$('img').hide(callback);			动画执行完后执行回调函数，此时动画执行时间默认为500
//实现原理，将当前元素的opacity,width，height，margin，padding都设置为0
//callback不能使用alert，否则hide最后一步设置display为none会一直等待alert的执行
//同JQuery，是先执行减小宽高->callback->设置display
Base.prototype.hide = function(time , callback){
	//对不同格式的参数进行调整
	if(!time && !callback){
		time = 1;
	}else if(typeof time == 'function'){			
		callback = time;
		time = 500;
	}

	//用数组保存hide需要获取的属性
	var attr_list = ['opacity','width','height','padding-top','padding-right','padding-bottom','padding-left',
					 'margin-top','margin-right','margin-bottom','margin-left'];
	
	for(var i=0; i<this.elements.length; i++){
		//如果该节点处于隐藏状态，则不执行该节点hide动画
		//if(getStyle(this.elements[i],'display') == 'none')	continue;

		if(!this.elements[i].old_style){
			this.elements[i].old_style = {};
			for(var j=0; j<attr_list.length; j++){
				var value = getStyle(this.elements[i],attr_list[j]);	//获取当前属性
				if(parseFloat(value) != 0){
					this.elements[i].old_style[attr_list[j]] = value;
					//obj_attr[attr_list[j]] = '0';
				}	
			}
		}

		//保存当前属性，为show做准备
		var obj_attr = {};						//生成一个animate方法的参数对象，为启动animate做准备
		for(var attr in this.elements[i].old_style){
			if(attr != 'display' && attr != 'overflow'){
					obj_attr[attr] = '0';
				}
			//obj_attr[attr] = '0';			
		}
		if(this.elements[i].animate_args){
			if(this.elements[i].animate_args.queue[this.elements[i].animate_args.queue.length-1].type == 'hide'){
				return this;
			}
		}
		//获取当前的display和overflow属性
		this.elements[i].old_style['display'] = getStyle(this.elements[i],'display');	
	//	console.log(this.elements[i].old_style['display'] )
		this.elements[i].old_style['overflow'] = getStyle(this.elements[i],'overflow');
		//设置当前overflow，避免出现在元素缩小时出现文字溢出现象
		this.elements[i].style['overflow'] = 'hidden';
		//设置动画类型
		if(!this.elements[i].animate_args){
			this.elements[i].animate_args = new animateArgs();
		}
		//this.elements.animate_args.type = 'hide';
		//启动动画
		//修改callback函数，this指向当前节点
		$(this.elements[i]).animate(obj_attr,time,function(){
			//先确认是否传入了callback函数，再执行
			if(typeof callback == 'function'){
				callback.call(this);
			}	
			this.style['display'] = 'none';
		},'hide');			
	}
	// var that = this;
	// setTimeout(function(){
	// 	for(var i=0; i<that.elements.length; i++){
	// 		that.elements[i].style['display'] = 'none';			
	// 	}
	// },time);		//等动画执行完后将元素display设置为none
	return this;
}

Base.prototype.show = function(time, callback){
	//对不同格式的参数进行调整
	if(!time && !callback){
		time = 1;
	}else if(typeof time == 'function'){			
		callback = time;
		time = 500;
	}

	for(var i=0; i<this.elements.length; i++){
		//如果该节点处于隐藏状态，则不执行该节点hide动画
		//if(getStyle(this.elements[i],'display') != 'none' )	continue;

		if(!this.elements[i].old_style){		//先判断是否已执行过一次hide，直接使用show无效，因为没有可设置的参数
			return this;						//原来参数不存在时直接退出
		}else{
			//显示动画
			//this.elements[i].style['display'] = this.elements[i].old_style['display'];
			var obj_attr = {};
			//生成一个animate方法的参数对象，为启动animate做准备
			for(attr in this.elements[i].old_style){
				if(attr != 'display' && attr != 'overflow'){
					obj_attr[attr] = this.elements[i].old_style[attr];
				}
			}
			//如果正在执行动画，给当前的动画的回调函数后设置当前节点的display属性
			if(this.elements[i].animate_args){
				if(this.elements[i].animate_args.queue[this.elements[i].animate_args.queue.length-1].type == 'show'){
					return this;
				}
				//获取当前动画的回调函数
				//console.log(this.elements[i].animate_args.queue[0].callback)
				var cur_callback = this.elements[i].animate_args.queue[this.elements[i].animate_args.queue.length-1].callback;
				//修改当前动画的回调函数
				this.elements[i].animate_args.queue[this.elements[i].animate_args.queue.length-1].callback = function(){
					//此时this指向当前节点
					//先确认是否传入了callback函数，再执行
					
					if(typeof cur_callback == 'function'){
						cur_callback.call(this);
					}
					this.style['display'] = this.old_style['display'];
					//alert(this.old_style['display'])
					
				}
				
			}else{
				//alert(1111)
				this.elements[i].style['display'] = this.elements[i].old_style['display'];
			}
			//设置动画类型
			if(!this.elements[i].animate_args){
				this.elements[i].animate_args = new animateArgs();
			}
			//this.elements.animate_args.type = 'show';
			$(this.elements[i]).animate(obj_attr,time,function(){
				this.style['overflow'] = this.old_style['overflow'];
				//先确认是否传入了callback函数，再执行
				if(typeof callback == 'function'){
					callback.call(this);
				}
				//this.old_style = null;
			},'show');
		}

	}
	return this;
}

Base.prototype.toggle = function(time, callback){
	for(var i=0; i<this.elements.length; i++){
		if(!this.elements[i].animate_args){
			if( getStyle(this.elements[i],'display') != 'none'){
				$(this.elements[i]).hide(time, callback);
			}else{
				$(this.elements[i]).show(time, callback);
			}			
		}else{
			if(this.elements[i].animate_args.queue[this.elements[i].animate_args.queue.length-1].type == 'show'){
				$(this.elements[i]).hide(time, callback);
			}else{
				$(this.elements[i]).show(time, callback);
			}
		}
	}
	return this;
}


//通用动画函数
Base.prototype.animate = function(obj_attr, time, callback, type){
	//参数判断
	if(typeof time == 'undefined'){				//$('.ul1').animate({'width' : '10px'}),默认时间为500ms
		time = 500;
	}else if(typeof time == 'function'){		//$('.ul1').animate({'width' : '10px'},function(){alert(11)}),默认时间为500ms
		callback = time;
		time = 500;
	}else if(typeof time == 'number' && time<=0){	//如果传入动画时间小于或等于0，则不执行此次动画
		return this;
	}
	//1. 添加动画队列，通过is_animate来判断，is_animate在20ms后才会为true
	for(var i=0; i<this.elements.length; i++){
		//当前节点不存在动画参数对象时，先添加一个
		var temp = this.elements[i];
		if(!temp.animate_args){		
			temp.animate_args = new animateArgs();	//通过构造函数生成
		}
		
		temp.animate_args.queue.push({
			obj_attr : obj_attr,
			time : time,
			callback : callback,
			delay : 0,					//是否延时
			type : type
		});
		//console.log(temp.animate_args.queue)
		//2. 启动第一次动画，后续动画将在doAnimate中回调执行
		if(!temp.animate_args.start_first){
			temp.animate_args.start_first = true;
			//console.log(temp.animate_args.queue)
			doAnimate(temp, temp.animate_args.queue[0].obj_attr, temp.animate_args.queue[0].time,
			   			    temp.animate_args.queue[0].callback, temp.animate_args.queue[0].delay);
		}
		//console.log(this.elements[i].animate_args.queue)
	}
	
	
	return this;	
}

Base.prototype.stop = function(flag1 , flag2){
	for(var i=0; i<this.elements.length; i++){
		var node = this.elements[i];
		//判断该节点是否处于动画中			
		if(node.animate_args){	
			//1. stop(),等价于stop(false,false)，仅仅停止“当前执行”这段动画，后面的动画还可以继续执行	
			if(!flag1 && !flag2){					
				//a. 停止当前动画
				if(node.animate_args.interval_id){
					clearInterval(node.animate_args.interval_id);
					clearTimeout(node.animate_args.interval_id);
				}
				//b. 队列重置为后续动画
				node.animate_args.queue = node.animate_args.queue.slice(node.animate_args.finished+1);								
				if(node.animate_args.queue.length >0 ){
					//如果停止当前动画后，后面还有动画，重新启动一次动画
					node.animate_args.finished = 0;
					//启动新一次动画
					doAnimate(node, node.animate_args.queue[0].obj_attr, node.animate_args.queue[0].time,
								    node.animate_args.queue[0].callback, node.animate_args.queue[0].delay);
				}else{
					node.animate_args = null;
				}				
			}		
			//2. stop(true),等价于stop(true,false)，停止所有动画，包括当前执行的动画
			else if(flag1 && !flag2){
				if(node.animate_args.interval_id){
					clearInterval(node.animate_args.interval_id);
					clearTimeout(node.animate_args.interval_id);
				}
				node.animate_args = null;			
			}
			//3. stop(true,true),停止所有动画，但是允许执行当前动画
			else if(flag1 && flag2){
				//去除队列里面后续的动画
				node.animate_args.queue = node.animate_args.queue.slice(0,node.animate_args.finished+1);	
			}
			//4. stop(false,true),停止“当前执行”这段动画，然后调到最后一个动画，并且执行最后一个动画
			else if(!flag1 && flag2){
				//a. 停止当前动画
				if(node.animate_args.interval_id){
					clearInterval(node.animate_args.interval_id);
					clearTimeout(node.animate_args.interval_id);
				}
				//b. 如果当前动画不为最后一个动画，就把最后一个动画放到队列中
				if(node.animate_args.finished+1 < node.animate_args.queue.length){
					node.animate_args.queue = [node.animate_args.queue[node.animate_args.queue.length-1]];								
					//重新启动一次动画
					node.animate_args.finished = 0;
					//启动新一次动画
					doAnimate(node, node.animate_args.queue[0].obj_attr, node.animate_args.queue[0].time,
									node.animate_args.queue[0].callback, node.animate_args.queue[0].delay);
						
				}else{
					node.animate_args = null;
				}
				
			}
			//5. 参数错误
			else{
				errorArgs();
			}
		}
	}
}

//判断当前元素数组是否有至少一个元素满足匹配选择器，即返回true
//$('ul').is(':animated')    	伪类选择器
//$('ul').is('  #content p')    常规选择器
Base.prototype.is = function(select){
	//1. 去参数前后的空格，trim() IE8-不支持
	var str = select.replace(/^\s+|\s+$/g,'');
	for(var i=0; i<this.elements.length; i++){
		//只要找到一个匹配元素就直接退出函数
		//判断选择器是伪类选择器还是常规选择器
		if(str.charAt(0) == ':'){
			switch(str){
				case ':animated' :		//是否处于动画
					if(this.elements[i].animate_args) return true;
					break;	
				default :				
					errorArgs();		
			}
		}else{
			//根据常规选择器获取元素
			var elements = $(str).elements;
			for(var j=0; j<elements.length; j++){
				if(this.elements[i] == elements[j]) return true;	
			}
		}
	}
	return false;
}

//delay会在动画队列尾部加入加入一个延时动画
Base.prototype.delay = function(time){
	if(typeof time == 'number'){
		for(var i=0; i<this.elements.length; i++){
			if(!this.elements[i].animate_args){		
				this.elements[i].animate_args = new animateArgs();	//通过构造函数生成
			}
			this.elements[i].animate_args.queue.push({	//将延时动画插入队列中
				obj_attr : null,
				time : null,
				callback : null,
				delay : time					//延时时间，小于或等于0表示不延时
			});
		}
	}
	return this;
}



//动画参数构造函数
function animateArgs(){
	//每个节点在执行动画的时候都会保存一个动画参数对象，完成所有队列动画后就销毁
	this.interval_id = null;			//动画的interval id,队列中每一个动画都会生成一个
	this.queue = [];					//需要执行的动画队列，会随时动态加入新的动画进来
	this.finished = 0;					//当前已完成的队列动画个数
	this.start_first = false;			//是否已启动动画
}

//传入要执行动画的节点，执行该节点的下一个动画
function turnNetxAnimate(node){
	//完成动画数目+1
	var temp = ++node.animate_args.finished;	
	//如果队列中还有动画，执行下一动画，否则解除该节点的动画				
	if(node.animate_args.finished < node.animate_args.queue.length){				
		doAnimate(node, node.animate_args.queue[temp].obj_attr, node.animate_args.queue[temp].time, 
						node.animate_args.queue[temp].callback, node.animate_args.queue[temp].delay);
	}else{
		node.animate_args = null;		
	}
}



//动画执行函数
//每执行一次doAnimate表示完成了当前节点队列中的一个动画
//延时也看作一个动画
//obj_attr中必须均为带数字的属性，display，position等不行
function doAnimate(node, obj_attr, time, callback, delay){
	//判断此次动画是否为延时动画
	if(typeof delay == 'number' && delay > 0){		
		node.animate_args.interval_id = setTimeout(function(){	
			turnNetxAnimate(node);	
		},delay);
		return;
	}/*else if(typeof type == 'string'){
		switch(type){
			case 'hide':
				node.style['overflow'] = 'hidden';	
				break;
			case 'show':
				//node.style
		}
		
	}else if(type)*/
	var n = Math.floor(time/20);				//20ms移动一次，计算此次动画的移动次数
	//var elements = obj_base.elements;			//用一个数组保存要操作的节点
	//var len = elements.length;
	var count = 0;								//当前已执行的动画次数
	var all_attr = [];							//当前节点需要执行动画的属性
	var all_attr_end = [];						//当前节点属性最终值
	var	all_attr_start = [];					//当前节点属性初始值
	var	all_attr_now = [];						//当前节点属性当前值
	var	all_attr_dis = [];						//当前节点属性每次动画的增加值
	for(var attr in obj_attr){
		var cur_start = parseFloat(getStyle(node ,attr));	//当前属性的初始值，以数值形式保存，去除单位，方便计算
		var cur_end = parseFloat(obj_attr[attr]);			//当前属性的结束值，以数值形式保存，去除单位，方便计算
		all_attr.push(attr);	
		all_attr_end.push(cur_end);	   
		all_attr_start.push(cur_start);
		all_attr_now.push(cur_start);
		all_attr_dis.push((cur_end-cur_start)/n);//保存节点的当前属性每次动画的增加值
	}	
	
	//5. 准备执行动画
	node.animate_args.interval_id = setInterval(function(){
		//animate_args.is_animate = true;		
		//6. 开始同时操作所有节点的所有属性，每20ms执行一次	
		if(count<n-1){	
			for(var i=0;i<all_attr.length;i++){		//遍历需要执行动画的属性						
				all_attr_now[i] += all_attr_dis[i];
				switch(all_attr[i]){
					case 'opacity':					
						node.style['filter'] = 'alpha(opacity='+all_attr_now[i]*100+')';
						node.style['zoom'] = 1;
						node.style['opacity'] = all_attr_now[i];
						break;
					default :	
						//console.log(all_attr[i])
						node.style[all_attr[i]] = all_attr_now[i]+'px';
				}
				
			}	
			count++;
		}
		
		//7. 此次动画执行完毕
		else{		
			//8. 清空动画，最后一次设置最终的属性值
			if(node.animate_args.interval_id){
				//最后一次，把属性设为最终值，保证结果与最初设置的值一样，也可省略该步，因为结果误差很小。
				clearInterval(node.animate_args.interval_id);
				for(var i=0;i<all_attr.length;i++){		//遍历需要执行动画的属性						
				//all_attr_now[i] += all_attr_dis[i];
					switch(all_attr[i]){
						case 'opacity':					
							node.style['filter'] = 'alpha(opacity='+all_attr_end[i]*100+')';
							node.style['zoom'] = 1;
							node.style['opacity'] = all_attr_end[i];
							break;
						default :	

							node.style[all_attr[i]] = all_attr_end[i]+'px';
					}
					
				}	
			}	
			//9. 动画执行完后执行回调函数
			//获取实时回调函数，在show中可能会修改当前执行动画的回调函数
			var cur_callback = node.animate_args.queue[node.animate_args.finished].callback;
			if(typeof cur_callback == 'function'){				
				cur_callback.call(node);
				
			}

			// switch(type){
			// 	case 'hide' :
			// 		node.style['display'] : none;
			// }
			//10. 准备执行下一个动画
			turnNetxAnimate(node);
			// var temp = ++node.animate_args.finished;			//完成动画数目+1
			// //console.log
			// if(node.animate_args.finished < node.animate_args.queue.length){						
			// 	doAnimate(node, node.animate_args.queue[temp].obj_attr, node.animate_args.queue[temp].time, node.animate_args.queue[temp].callback, node.animate_args.queue[temp].delay);
			// }
			// //11. 此时所有动画已执行完毕，恢复默认参数，为下一次队列动画做准备
			// else{	
			// 	node.animate_args = null;				
			// }
		}	
	},20);
}

//------------------------------------------------------------------------------------
//-----------------------------------功能函数-----------------------------------------
//------------------------------------------------------------------------------------

//***********************************程序函数*****************************************
//参数不合法报错
function errorArgs(){
	throw new Error('参数不合法！');
}

//通用能力检测函数，判断一个对象是否有某个函数
//例子：console.log(isHostMethod(window,'attachEvent'))
function isHostMethod(obj, property){
	var t = typeof obj[property];
	return t == 'function' || (!!(t=='object'&&obj[property])) || t=='unknow'
}

//***********************************dom节点函数***************************************
//获取节点计算样式
//该函数始终返回的是一个带单位的字符串，如果要进行数值处理的话需要用parseFloat处理一下！！
//getStyle($('.ul1').elements[0],'margin'),padding和margin在Firefox中一直返回0，应用padding-left等带方位的单位获取
function getStyle(element,attr) {
	var style = null;
	if(window.getComputedStyle){	//W3C
		style = window.getComputedStyle(element,null);
	}else if(element.currentStyle){			//IE
		style = element.currentStyle;
	}else{
		throw new Error('Get style failed！')
	}
	var result = style[attr];
	//在IE8-中
	//未设置width和height返回auto
	//未设置opacity返回undefined
	//在Firefox中获取不到返回空字符串
	if(!result || result == 'auto'){
		//基于element.offsetWidth，border和padding来计算
		switch(attr){			
			case 'width':
				return element.offsetWidth - parseFloat(getStyle(element,'border-left')) - parseFloat(getStyle(element,'border-right'))
				 						   - parseFloat(getStyle(element,'padding-left')) - parseFloat(getStyle(element,'padding-right'))
				 						   + 'px';
			case 'height':
				return element.offsetHeight - parseFloat(getStyle(element,'border-top')) - parseFloat(getStyle(element,'border-bottom'))
				 						    - parseFloat(getStyle(element,'padding-top')) - parseFloat(getStyle(element,'padding-bottom'))
				 						    + 'px';
			case 'opacity':
				return '1';
			//IE,Firefox：获取boder属性需这样获取
			//在IE8-，如果某一边的boder未设置，会返回'medium'，为了避免后面的计算出错，统一转化为标准格式'0px'
			//讲解：http://tieba.baidu.com/p/2222283768
			case 'border-top':
				return style['borderTopWidth'] != 'medium'? style['borderTopWidth'] : '0px';
			case 'border-bottom':
				return style['borderBottomWidth'] != 'medium'? style['borderBottomWidth'] : '0px';
			case 'border-left':
				return style['borderLeftWidth'] != 'medium'? style['borderLeftWidth'] : '0px';
			case 'border-right':
				return style['borderRightWidth'] != 'medium'? style['borderRightWidth'] : '0px';
			default :
				return '0';     //其他情况默认返回0，比如padding，margin，获取不到时返回0
		}
	}else{
		//console.log(style[attr])
		return result;
	}
	
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

//判断一个节点是否包含另外一个节点
//如果是自身，看作自身包含自身
//讲解：http://blog.csdn.net/huajian2008/article/details/3960343
function contains(parent_node,child_node){
	if(parent_node.contains){	//均支持（网上说Firefox不支持，验证后支持，可能为低版本不支持）
		return parent_node == child_node || parent_node.contains(child_node);
	} else {	//compareDocumentPosition是一个dom3级别的方法，很强大，IE9+支持
		return !!(parent_node.compareDocumentPosition(child_node) & 16);
	}
} 



//***********************************窗口函数*****************************************
//获取浏览器窗口大小
//讲解：http://www.css88.com/archives/1767
//document对象有个属性compatMode ,它有两个值
//BackCompat 对应quirks mode (又叫怪异模式，混杂模式)
//CSS1Compat 对应strict mode (标准模式)
//混杂模式主要在IE中不声明DOCTYPE时出现
function getViewport(){
　　if (document.compatMode == "BackCompat"){	//兼容IE中的混杂模式
　　　　return {
	　　　　　width: document.body.clientWidth,
　　　　　　　height: document.body.clientHeight
　　　　}
　　} else {alert('zzzzzzzz')
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
　　　　　　　width: Math.max(document.body.scrollWidth, document.body.clientWidth),
　　　　　　　height: Math.max(document.body.scrollHeight, document.body.clientHeight)
			}
　　　} else {
　　　　　return {
　　　　　　　width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
　　　　　　　height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
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


//document加载后即执行callback函数
function documentReady(callback) {   
    if (document.addEventListener) {  //W3C
        document.addEventListener('DOMContentLoaded', function () {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            callback();
        }, false);
     } else if (document.attachEvent) {	//IE
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState == "complete") { 
                document.detachEvent("onreadystatechange", arguments.callee);
                callback();
            }
        });
    }
    /* else if (document.lastChild == document.body) {callback();} */  //此写法在IE下无法正确触发
    else {		//兼容所有浏览器
    	document.onreadystatechange = function(){
    		if(document.readyState == 'complete'){
    			callback();
    		}
    	}
    }
}


//***********************************事件函数*****************************************
//添加事件
//this在事件中使用较多，而绑定多个事件使用较少，权衡利弊，决定不采用attachEvent方法
function addEvent(obj, type, callback){
	if(obj.addEventListener){
		obj.addEventListener(type, callback, false);
	}/*else if(obj.attachEvent){				
		obj.attachEvent('on'+type, callback);	//attachEvent未实现this指向绑定事件的节点,this指向window
	}*/else{
		obj['on'+type] = callback;			//同类型事件只能绑定一个
	}
}


//移除事件
//移除事件时不能使用匿名函数，因为移除和绑定的事件必须统一
//或者可以像上面documentReady中使用arguments.calee
function removeEvent(obj,type,callback){	
	if(obj.removeEventListener){
		obj.removeEventListener(type, callback,false);
	}/*else if(obj.detachEvent){
		obj.detachEvent('on'+type, callback);
	}*/else{
		obj['on'+type] = null;
	}
}

//获取事件
function getEvent(event){
	return event || window.event;		//window.event为IE中获取事件对象的方法
}

//获取目标对象
//即触发事件的对象，可能为某绑定了事件的节点的子节点
function getTarget(event){
	var e = event || window.event;
	return e.target? e.target : e.srcElement;
}

//获取mouseover事件触发时鼠标来自的元素
function getFromElement(event){
	var e = event || window.event;
	return e.relatedTarget? e.relatedTarget : e.fromElement;
}

//获取mouseout事件触发时鼠标去往的元素
function getToElement(event){
	var e = event || window.event;
	return e.relatedTarget? e.relatedTarget : e.toElement;
}

//阻止默认事件，比如a的跳转，submit的提交，鼠标右击显示菜单等
function preventDefault(event){
	var e = event || window.event;
	if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue = false;
	}
}

//禁止冒泡
function stopPropagation(event){
	var e = event || window.event;
	if(e.stopPropagation){
		e.stopPropagation();
	}else{
		e.cancelBubble = true;
	}
}


//跨浏览器获取键码
//在keypress事件中，字母a在IE中为65（字符码），在Firefox中为97键码
//尽量不使用keypress事件获取值，不同浏览器有误差
//监控全局的按键事件时最好用document绑定事件，用window在IE8-检测不到！！！！
//例子1：   通过字符编码来输出将键盘上A-Z，0-9（无法正确输出其他键）
//addEvent(document,'keyup',function(e){
//	alert(String.fromCharCode(getCharCode(e)))
//})
//例子2：	判断组合键
// addEvent(document,'keydown',function(e){
// 	if(getEvent(e).ctrlKey && getCharCode(e) == 13){	//按住ctrl再按enter（13）才会触发
// 		alert(111)
// 	}
// })
function getCharCode(event){
	var e = event || window.event;
	if(typeof e.charCode == 'number' && e.charCode > 0){
		return e.charCode;
	}else{
		return e.keyCode;
	}
}

//在mousedown和mousedowm事件中检测按下了哪个键
//该函数返回0表示左键，1表示中间滚轮键，2表示右键
//在高级程序设计中p374有详细介绍
function getButton(event){
	var e = event || window.event;
	//由于都有button属性，所以不使用能力检测
	if(document.implementation.hasFeature('MouseEvent','2.0')){
		return e.button;
	}else{
		switch(e.button){
			case 0:
			case 1:
			case 3:
			case 5:
			case 7:
				return 0;
			case 2:
			case 6:
				return 2;
			case 4:
				return 1;
		}
	}
}

//获取触发事件时鼠标的位置（在click，contextmenu，mousedown，mouseup中使用）
//1. 获取鼠标在浏览器窗口的位置
function getClientPosition(event){
	var e = event || window.event;
	return {
		left : e.clientX,
		top : e.clientY
	}
}

//2. 获取鼠标在页面内容的位置
//在IE8-中没有pageX和pageY属性
//高级程序设计P371
function getPagePosition(event){
	var e = event || window.event;
	return {
		left : e.pageX || e.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft),
		top : e.pageY || e.clientY + (document.body.scrollTop || document.documentElement.scrollTop)
	}
}

//3. 获取鼠标在整个屏幕的位置
function getScreenPosition(event){
	var e = event || window.event;
	return {
		left : e.screenX,
		top : e.screenY
	}
}
