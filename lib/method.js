// 引入工具库
const lib_tool = require('./tool');
const lib_test = require('./assert');

// 通用私有结果判断返回函数
function _Res(msg, bool) {
	// 默认结果
	let res = { code: 'ko', msg: '默认失败信息' };
	// 更新状态
	bool ? res.code = 'ok' : res.code = 'ko';
	// 更新消息
	res.msg = msg[res.code];
	// 返回结果
	return res;
}

// =======================================================================
//相等性验证函数
function IsEqual(name, assert, value) {
	// 规则类型
	let type = lib_tool._typeof(assert);
	// 初始化消息
	let msg = {
		ok: `${name}相等性验证通过`,
		ko: `${name}相等性验证未通过`
	}
	// 默认初始化为失败状态
	let bool = false;
	// 如果是字符串类型
	if (type === 'string') {
		bool = assert === value;
		return _Res(msg, bool);
	}
	// 如果是数字类型
	if (type === 'number') {
		bool = assert === value;
		return _Res(msg, bool);
	}
	// 如果是数组类型
	if (type === 'array') {
		bool = assert.some(v => {
			return v === value;
		});
		return _Res(msg, bool);
	}
	// 如果是内置函数
	if (type === 'function') {
		bool = assert(value);
		return _Res(msg, bool);
	}
	// 如果是正则表达式
	if (type === 'regexp') {
		bool = assert.test(value);
		return _Res(msg, bool);
	}
	return _Res(msg, bool);
}

// =======================================================================
// 不相等性验证函数
function NotEqual(name, assert, value) {
	// 规则类型
	let type = lib_tool._typeof(assert);
	// 初始化消息
	let msg = {
		ok: `${name}不相等性验证通过`,
		ko: `${name}不相等性验证未通过`
	}
	// 默认初始化为失败状态
	let bool = false;
	// 如果是字符数据类型
	if (type === 'string') {
		bool = !(assert === value);
		return _Res(msg, bool);
	}
	// 如果是数字数据类型
	if (type === 'number') {
		bool = !(assert === value);
		return _Res(msg, bool);
	}
	// 如果是数组类型
	if (type === 'array') {
		bool = !assert.some(v => {
			return v === value;
		});;
		return _Res(msg, bool);
	}
	// 如果是内置函数
	if (type === 'function') {
		bool = !assert(value);
		return _Res(msg, bool);
	}
	// 如果是正则表达式
	if (type === 'regexp') {
		bool = !assert.test(value);
		return _Res(msg, bool);
	}
	return _Res(msg, bool);
}
// =======================================================================
// 包含验证函数
function Include(name, assert, value) {
	// 规则类型
	let type = lib_tool._typeof(assert);
	// 初始化消息
	let msg = {
		ok: `${name}包含验证通过`,
		ko: `${name}包含验证未通过`
	}
	// 默认初始化为失败状态
	let bool = false;

	// 如果是字符类型
	if (type === 'string') {
		bool = assert.includes(value);
		return _Res(msg, bool);
	}
	// 如果是数字类型
	if (type === 'number') {
		bool = String(assert).includes(value);
		return _Res(msg, bool);
	}
	// 如果是数组类型
	if (type === 'array') {
		bool = assert.map(v => {
			v.includes(value);
		});
		return _Res(msg, bool);
	}
	// 如果是内置函数
	if (type === 'function') {
		bool = assert(value);
		return _Res(msg, bool);
	}
	// 如果是正则表达式
	if (type === 'regexp') {
		bool = assert.test(value);
		return _Res(msg, bool);
	}
	return _Res(msg, bool);
}
// =======================================================================
// 不包含验证函数
function Exclude(name, assert, value) {
	// 规则类型
	let type = lib_tool._typeof(assert);
	// 初始化消息
	let msg = {
		ok: `${name}包含验证通过`,
		ko: `${name}包含验证未通过`
	}
	// 默认初始化为失败状态
	let bool = false;
	// 如果是字符数据类型
	if (type === 'string') {
		bool = !(assert === value);
		return _Res(msg, bool);
	}
	// 如果是数字数据类型
	if (type === 'number') {
		bool = !(assert === value);
		return _Res(msg, bool);
	}
	// 如果是数组类型
	if (type === 'array') {
		bool = !assert.includes(value);
		return _Res(msg, bool);
	}
	// 如果是内置函数
	if (type === 'function') {
		bool = !assert(value);
		return _Res(msg, bool);
	}
	// 如果是正则表达式
	if (type === 'regexp') {
		bool = !assert.test(value);
		return _Res(msg, bool);
	}
	return _Res(msg, bool);
}
// =======================================================================
// 最小值验证函数
function MinNumber(name, assert, value) {
	// 规则类型
	let type = lib_tool._typeof(assert);
	// 初始化消息
	let msg = {
		ok: `${name}包含验证通过`,
		ko: `${name}包含验证未通过`
	}
	// 默认初始化为失败状态
	let bool = false;
	// 如果是数字数据类型
	if (type === 'number') {
		bool = value > assert;
		return _Res(msg, bool);
	}
	// 如果是字符数据类型
	if (type === 'string') {
		bool = value > assert.codePointAt(0);
		return _Res(msg, bool);
	}
	return _Res(msg, bool);
}
// =======================================================================
// 最大值验证函数
function MaxNumber(name, assert, value) {
	// 规则类型
	let type = lib_tool._typeof(assert);
	// 初始化消息
	let msg = {
		ok: `${name}包含验证通过`,
		ko: `${name}包含验证未通过`
	}
	// 默认初始化为失败状态
	let bool = false;
	// 如果是数字数据类型
	if (type === 'number') {
		bool = value < assert;
		return _Res(msg, bool);
	}
	// 如果是字符数据类型
	if (type === 'string') {
		bool = value < assert.codePointAt(0);
		return _Res(msg, bool);
	}
	return _Res(msg, bool);
}
// =======================================================================
// 最小长度验证函数
function MinLength(name, assert, value) {
	// 规则类型
	let type = lib_tool._typeof(assert);
	// 值长度
	let lens = String(value).length;
	// 初始化消息
	let msg = {
		ok: `${name}包含验证通过`,
		ko: `${name}包含验证未通过`
	}
	// 默认初始化为失败状态
	let bool = false;
	// 如果是字符数据类型
	if (type === 'number') {
		bool = lens > assert;
		return _Res(msg, bool);
	}
	return _Res(msg, bool);
}
// =======================================================================
// 最大长度验证函数
function MaxLength(name, assert, value) {
	// 规则类型
	let type = lib_tool._typeof(assert);
	// 值长度
	let lens = String(value).length;
	// 初始化消息
	let msg = {
		ok: `${name}包含验证通过`,
		ko: `${name}包含验证未通过`
	}
	// 默认初始化为失败状态
	let bool = false;
	// 如果是字符数据类型
	if (type === 'number') {
		bool = lens < assert;
		return _Res(msg, bool);
	}
	return _Res(msg, bool);
}
// =======================================================================
module.exports = {
	// 相等性验证
	IsEqual: IsEqual,
	IS: IsEqual,
	Is: IsEqual,
	is: IsEqual,
	// 不相等性验证
	NotEqual: NotEqual,
	NOT: NotEqual,
	Not: NotEqual,
	not: NotEqual,
	// 包含验证
	Include: Include,
	IN: Include,
	In: Include,
	in: Include,
	// 不包含性验证
	Exclude: Exclude,
	EX: Exclude,
	Ex: Exclude,
	ex: Exclude,
	// 最小数字验证
	MinNumber: MinNumber,
	MINN: MinNumber,
	Minn: MinNumber,
	minn: MinNumber,
	// 最大数字验证
	MaxNumber: MaxNumber,
	MAXN: MaxNumber,
	Maxn: MaxNumber,
	maxn: MaxNumber,
	// 最小长度验证
	MinLength: MinLength,
	MINL: MinLength,
	Minl: MinLength,
	minl: MinLength,
	// 最大长度验证
	MaxLength: MaxLength,
	MAXL: MaxLength,
	Maxl: MaxLength,
	maxl: MaxLength
}