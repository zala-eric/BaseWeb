/**
 * 自定义JS
 */
/**
 * GUID生成工具
 * 
 * @type UUID
 * @class UUID
 */
var UUID = {
	S4 : function() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	},
	/**
	 * 生成32位GUID,速度慢
	 * 
	 * @return {}
	 */
	randomUUID : function() {

		return (UUID.S4() + UUID.S4() + "-" + UUID.S4() + "-" + UUID.S4() + "-"
				+ UUID.S4() + "-" + UUID.S4() + UUID.S4() + UUID.S4());
	},
	d : new Date().getTime() + "_" + Math.random().toString().replace('.', '_')
			+ "_",
	c : 0,
	/**
	 * 生成客户端唯一ID,速度快
	 * 
	 * @return {}
	 */
	cID : function() {
		++UUID.c;
		return 'cid_' + UUID.d + UUID.c;
	}
};

/**
 * 字符处理对象
 * 
 * @class StringBuffer
 */
function StringBuffer() {
	this._strings_ = [];
}
/**
 * 添加string
 * 
 * @param {string}
 *            str
 */
StringBuffer.prototype.append = function(str) {
	this._strings_.push(str);
}
/**
 * 返回字符处理结果
 * 
 * @return {string} 字符
 */
StringBuffer.prototype.toString = function(split) {
	if (split == null)
		split = '';
	return this._strings_.join(split);
}
/**
 * @return {}
 */
String.prototype.Trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * @param {}
 *            rename
 * @param {}
 *            edname
 * @return {}
 */
String.prototype.replaceall = function(rename, edname) {
	var ret = this;
	if (edname == null)
		edname = '';
	ret = ret.replace(rename, edname);

	while (ret.indexOf(rename) >= 0) {
		ret = ret.replace(rename, edname);
	}
	return ret;
}

/**
 * hashtable 哈希表
 * 
 * @class hashtable
 */
var hashtable = function() {
	this.keys = {};
}
/**
 * 检验是否包含指定key
 * 
 * @param {object}
 *            key
 * @return {Boolean} 检验结果
 */
hashtable.prototype.contains = function(key) {
	if (this.count == 0)
		return false;
	return this.keys.hasOwnProperty(key);
}
/**
 * 包含的key value对数量
 * 
 * @type Number
 */
hashtable.prototype.count = 0;
/**
 * 添加一个key value对
 * 
 * @param {}
 *            key
 * @param {}
 *            value
 */
hashtable.prototype.add = function(key, value) {
	if (this.contains(key))
		return;
	this.keys[key] = value;
	this.count++;
}

/**
 * 根据key获取value
 * 
 * @param {}
 *            key
 * @return {}
 */
hashtable.prototype.getvalue = function(key) {
	return this.keys[key];
}

/**
 * 根据key替换指定的value
 * 
 * @param {}
 *            key
 * @param {}
 *            newvalue
 */
hashtable.prototype.replace = function(key, newvalue) {
	if (this.contains(key))
		this.keys[key] = newvalue;
}

/**
 * 根据key删除key value对
 * 
 * @param {}
 *            key
 */
hashtable.prototype.remove = function(key) {
	this.keys[key] = null;
	delete this.keys[key];
	this.count--;
}

/**
 * 清除所有项
 */
hashtable.prototype.clear = function() {
	this.keys = null;
	this.keys = {};
	this.count = 0;
}
/**
 * 复制
 * 
 * @return {} hashtable对象
 */
hashtable.prototype.clone = function() {
	var _keys = this.keys;
	var ret = new hashtable();
	for (var k in _keys) {
		ret.add(k, this.getvalue(k));
	}
	return ret;
}

var Dic = new Object();
/**
 * Dic注册事件
 * 
 * @param {}
 *            element 事件对象
 * @param {}
 *            type 事件类型
 * @param {}
 *            fun 调用方法
 * @param {}
 *            args 参数集合
 * @param {}
 *            domain 作用域
 */
Dic.addEvent = function(element, type, fun, args, domain) {
	if (!domain)
		domain = null;
	element.bind(type, function(arg) {
				eval(fun.call(domain, arg, args));
			});
}

Dic.getData = function(pageObj) {
	var pageData = pageObj.serializeArray();
	var obj = new Object();
	for (var index = 0; index < pageData.length; index++) {
		var p = pageData[index];
		obj[p["name"]] = p["value"];
	}
	return obj;
}

/**
 * 异步提交表单时，获取表单数据（适合含有table数据） 多个相同的变量名不同值的区分
 * 
 * @param {}
 *            element 事件对象
 * @param {}
 *            splitType 区分分隔符
 */
Dic.getTableData = function(pageObj, splitType) {
	var pageData = pageObj.serializeArray();
	var obj = new Object();
	for (var index = 0; index < pageData.length; index++) {
		var p = pageData[index];
		if (null == obj[p["name"]] || 'undefined' == obj[p["name"]]) {
			obj[p["name"]] = p["value"];
		} else {
			obj[p["name"]] = obj[p["name"]] + splitType + p["value"];
		}
	}
	return obj;
}

Dic.Url = {};
Dic.Url.getpar = function() {
	var url = location.href;
	return url.substring(url.indexOf("?") + 1, url.length);
}
Dic.Url.getParams = function(paras) {
	var paraString = Dic.Url.getpar().split("&");
	var paraObj = {}
	for (i = 0; j = paraString[i]; i++) {
		paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j
						.indexOf("=")
						+ 1, j.length);
	}
	if (paras == null)
		return paraObj;
	var returnValue = paraObj[paras.toLowerCase()];
	if (typeof(returnValue) == "undefined") {
		return "";
	} else {
		return returnValue.replace(/#/g, "");
	}
}

/**
 * 处理form所有text文本框中字符串的前后空格；
 * frm是应该是JS对象，如果是jquery则需要转换
 */
Dic.trim = function(frm) {
	var els = frm.elements;
	for (var i = 0; i < els.length; i++) {
		if (els[i].type == 'text') {
			els[i].value = els[i].value.replace(/(^\s*)|(\s*$)/g, '');
		}
	}
}

Dic.Ajax = {};
Dic.Ajax.request = function(ops) {
	var dataObj = null;
	$.ajax({
		url : ops["url"],
		type : 'POST',
		async : false,
		cache : false,
		data : ops["data"],
		dataType : 'json',
		timeout : 60000,
		success : function(result) {
			dataObj = result;
		}
	});
	return dataObj;

}
Dic.Ajax.requestToString = function(ops) {
	var dataObj = null;
	$.ajax({
		url : ops["url"],
		type : 'POST',
		async : false,
		cache : false,
		data : ops["data"],
		dataType : 'text',
		timeout : 60000,
		success : function(result) {
			dataObj = result;
		}
	});
	return dataObj;
}

/**
 * 获取Object的数据长度
 */
Dic.getObjectCount = function(o) {   
   var n, count = 0;   
   for(n in o){   
      if(o.hasOwnProperty(n)){   
         count++;   
      }   
   }   
   return count;   
} 

/** 
 * bin
 * 删除数组元素指定值
 */
Array.prototype.indexOf = function(val) { 
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);            
	}
};

/**删除数组重复项*/          
var toObject = function(a) { 
	var o = {}; 
	for (var i=0, j=a.length; i<j; i=i+1) {
		o[a[i]] = true; 
	}
	return o; 
};
var keys = function(o) { 
	var a=[], i; 
	for (i in o) { 
		if (o.hasOwnProperty(i)) {
			a.push(i); 
		}
	}
	return a;
}; 
var uniq = function(a) { 
	return keys(toObject(a)); 
}; 

/**
 * 日期格式化
 * 2013-04-19
 */
// 根据传入的日期进行格式化
Dic.dateFormat = function(day) {
	var Year = 0;
	var Month = 0;
	var Day = 0;
	var CurrentDate = "";
	//初始化时间
	//Year       = day.getYear();//有火狐下2008年显示108的bug
	Year       = day.getFullYear();//ie火狐下都可以
	Month      = day.getMonth()+1;
	Day        = day.getDate();
	CurrentDate += Year + "-";
	if (Month >= 10 ) {
		CurrentDate += Month + "-";
	} else {
		CurrentDate += "0" + Month + "-";
	}
	if (Day >= 10 ) {
		CurrentDate += Day ;
	} else {
		CurrentDate += "0" + Day ;
	}
	return CurrentDate;
}
// 根据当天的日期格式化
Dic.nowDateFormat = function() {
	var day = new Date();
	return Dic.dateFormat(day);
}

/**
 * 处理空对象
 */
Dic.processNULL = function(val) {
	if('undefined' == val || null == val || 'null' == val) {
		return '';
	} else {
		return val;
	}
}

/**
 * 是否是一个整数
 */
Dic.isInteger = function(str) {
    return (/^-?\d+$/.test(str));
}

/**
 * 身份证验证
 */
Dic.isIdCardNo = function(idNumber) {
	if("" == idNumber) {
		return false;
	}
	// 身份证长度不正确
	if(idNumber.length != 15 && idNumber.length != 18) {
		return false; 
	}
	if(idNumber.length == 15) {
		if(!Dic.isInteger(idNumber)) {
			return false; 
		}
	} else {
		str1 = idNumber.substring(0,17); 
		str2 = idNumber.substring(17,18); 
		alpha = "X0123456789"; 
		if(!Dic.isInteger(str1) || alpha.indexOf(str2) == -1) { 
			return false; 
		}
	}
	return true; 
}

/**
 * 验证非法字符(只能是0-9之间的字符串) str:将要验证的字符串
 */
Dic.validateNumChar = function(str) {
	var reg = /^[0-9]{1,}$/; 
	return reg.test(str);
}

/**
* 验证特殊字符
*/
Dic.validateSpecialChar = function(str){	
	var reg = /^[a-zA-z0-9\u4E00-\u9FA5]+$/gi;
	return reg.test(str);
}

/**
 * 验证非法字符(只能是0-9，a-z，A-Z之间的字符串)
 */
Dic.validateIllegalCharacter = function(str){
	var reg = /^[a-zA-Z0-9_\s]{1,}$/; 
    return reg.test(str)
}

/**
 * 验证非空字符
 */
Dic.validateNullCharacter = function(str){
	var fstr = str.trim();
	if('undefined' == fstr || null == fstr || '' == fstr) {
		return true;
	} else {
		return false;
	}
}

/**
 * 是否是一个浮点数
 * str:要检测的字符串

 */
Dic.isFloat = function (str){
	var patrn = /^(-?\d+)(\.\d+)?$/;
	return patrn.test(str);
}

/**
 * 验证IP非空字符
 */
Dic.checkIpArea = function(cStaticIpBegin , cStaticIpEnd){
	if('' != cStaticIpBegin && '' != cStaticIpEnd ) {
  		var startips = cStaticIpBegin.split('.');
  		var endips = cStaticIpEnd.split('.');
  		if((startips.length == 4 && endips.length == 4) 
  			|| (startips.length == 6 && endips.length == 6) ) {
	  		for(var ipIndex = 0 ;ipIndex < startips.length ; ipIndex++ ) {
	  			if(!Dic.isInteger(startips[ipIndex]) || !Dic.isInteger(endips[ipIndex]) ) {
	  				return false;
	  			} else {
		  			if( startips[ipIndex] < 0 || startips[ipIndex] > 255 ) {
		  				return false;
		  			}
		  			if( endips[ipIndex] - startips[ipIndex] < 0 ) {
		  				return false;
		  			}
	  			}
	  		}
	  		return true;
  		} else {
			return false;
  		}
  	} else {
		return false;
  	}
}