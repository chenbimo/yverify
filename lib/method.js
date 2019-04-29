// 引入工具库
const lib_tool = require('./tool');
const lib_test = require('./assert');

// 通用私有结果判断返回函数
function _Res(msg,bool){
	// 默认结果
	let res = {code:'ko',msg:'默认失败信息'};
	// 更新状态
	bool ? res.code = 'ok' : res.code = 'ko';
	// 更新消息
	res.msg = msg[res.code];
	// 返回结果
	return res;
}

// =======================================================================
//相等性验证函数
function IsEqual(name,assert,value){
	// 规则类型
	let type = lib_tool._typeof(assert);
	// 初始化消息
	let msg = {
		ok:`${name}相等性验证通过`,
		ko:`${name}相等性验证未通过`
	}
	// 默认初始化为失败状态
	let bool = false;
	// 如果是简单数据类型
	if(type === 'string' || type === 'number'){
		bool = assert === value;
		return _Res(msg,bool);
	}
	// 如果是数组类型
	if(type === 'array'){
		bool = assert.includes(value);
		return _Res(msg,bool);
	}
    // 如果是内置函数
	if(type === 'function'){
		bool = assert(value);
		return _Res(msg,bool);
	}
    // 如果是正则表达式
	if(type === 'regexp'){
		bool = assert.test(value);
		return _Res(msg,bool);
	}
}

// =======================================================================
// 不相等性验证函数
function NotEqual(name,assert,value){
    // 规则类型
	let type = lib_tool._typeof(assert);
	// 初始化消息
	let msg = {
		ok:`${name}不相等性验证通过`,
		ko:`${name}不相等性验证未通过`
	}
	// 默认初始化为失败状态
	let bool = false;
	// 如果是简单数据类型
	if(type === 'string' || type === 'number'){
		bool = !(assert === value);
		return _Res(msg,bool);
	}
	// 如果是数组类型
	if(type === 'array'){
		bool = !assert.includes(value);
		return _Res(msg,bool);
	}
    // 如果是内置函数
	if(type === 'function'){
		bool = !assert(value);
		return _Res(msg,bool);
	}
    // 如果是正则表达式
	if(type === 'regexp'){
		bool = !assert.test(value);
		return _Res(msg,bool);
	}
}
// =======================================================================
// 包含验证函数
function Include(name,assert,value){
    // 规则类型
	let type = lib_tool._typeof(assert);
	// 初始化消息
	let msg = {
		ok:`${name}包含验证通过`,
		ko:`${name}包含验证未通过`
	}
	// 默认初始化为失败状态
	let bool = false;
	// 如果是简单数据类型
	if(type === 'string' || type === 'number'){
		bool = String(assert).includes(value);
		return _Res(msg,bool);
	}
	// 如果是数组类型
	if(type === 'array'){
		bool = assert.map(v => {
            v.includes(value);
        });
		return _Res(msg,bool);
	}
    // 如果是内置函数
	if(type === 'function'){
		bool = assert(value);
		return _Res(msg,bool);
	}
    // 如果是正则表达式
	if(type === 'regexp'){
		bool = assert.test(value);
		return _Res(msg,bool);
	}
    return _Res(msg,bool);
}
// =======================================================================
// 不包含验证函数
function Exclude(name,assert,value){
    // 规则类型
	let type = lib_tool._typeof(assert);
	// 初始化消息
	let msg = {
		ok:`${name}包含验证通过`,
		ko:`${name}包含验证未通过`
	}
	// 默认初始化为失败状态
	let bool = false;
	// 如果是简单数据类型
	if(type === 'string' || type === 'number'){
		bool = !(assert === value);
		return _Res(msg,bool);
	}
	// 如果是数组类型
	if(type === 'array'){
		bool = !assert.includes(value);
		return _Res(msg,bool);
	}
    // 如果是内置函数
	if(type === 'function'){
		bool = !assert(value);
		return _Res(msg,bool);
	}
    // 如果是正则表达式
	if(type === 'regexp'){
		bool = !assert.test(value);
		return _Res(msg,bool);
	}
}
// =======================================================================
module.exports = {
	IsEqual:IsEqual,
	IS:IsEqual,
	Is:IsEqual,
	is:IsEqual,
    NotEqual:NotEqual,
    NOT:NotEqual,
    Not:NotEqual,
    not:NotEqual,
    Include:Include,
    INC:Include,
    Inc:Include,
    inc:Include,
    Exclude:Exclude,
    EX:Exclude,
    Ex:Exclude,
    ex:Exclude
}