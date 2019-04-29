// 引入工具
const lib_tool = require('./tool');
// 定义函数
function IsEqual(name,test,value){
	let type = lib_tool._typeof(test);
	let msg = {
		ok:`${name}相等性验证通过`,
		ko:`${name}相等性验证未通过`
	}
	let res = {code:'ko',msg:'默认信息'};
	if(type === 'string' || type === 'number'){
		value === test ? res.code = 'ok' : res.code = 'ko';
		res.msg = msg[res.code];
		return res;
	}
	if(type === 'array'){
		test.includes(value) ? res.code = 'ok' : res.code = 'ko';
		res.msg = msg[res.code];
		return res;
	}
}
module.exports = {
	IsEqual:IsEqual,
	IS:IsEqual,
	Is:IsEqual,
	is:IsEqual
}