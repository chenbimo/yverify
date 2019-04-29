// 验证插件
// =====判断======
// IsEqual IS Is is 等于
// NoEqual NO No no 不等于
// Include IN In in 包含
// Exclude EX Ex ex 不包含
// =====比较======
// Miniumn MIN Min min 最小值
// Maxiumn MXN Mxn mxn 最大值
// ===============
// MinLeng MIL Mil mil 最小长度
// MaxLeng MXL Mxl mxl 最大长度
// ===============
// 使用方式
/*
Yverify([
	{
		name:'名称',
		rules:[
			method:['Is','In','Ex','Min','Mxn','Mxl'],
			test:[
				['1','2','3','_empty'],
				['2889'],
				[5,6],
				1,
				10,
				3
			]
		],
		value:6
	}
]);
*/
const lib_test = require('./lib/test');
const lib_method = require('./lib/method');
const lib_tool = require('./lib/tool');

// 导出
module.exports = params => {
	// 验证数组长度
	let p_length = params.length; 
	// 默认消息
	let result = {code:'ok',msg:'验证通过'};
	// 循环所有验证字段
	for(let i = 0;i < p_length;i++){
		// 提前中断 未通过则直接中断后续过滤程序
		if(result.code === 'ko')break; 
		// 验证名称
		let name = params[i].name;
		// 验证列表
		let rules = params[i].rules; 
		// 验证值
		let value = params[i].value;
		// 方法列表
		let method = rules.method;
		// 规则列表
		let test = rules.test;
		// 方法数量		
		let m_length = method.length; 
		// 规则数量
		let t_length = test.length;
		// 数量不匹配则中断
		if(m_length !== t_length){
			result.code = 'ko';
			result.msg = '方法和规则数量不匹配';
			break;
		}
		// 循环验证所有规则
		for(let j = 0;j < m_length;j++){
			// 当前的验证方法
			let _method = method[j];
			// 当前的验证规则
			let _test = test[j];
			// 如果验证方法存在，则执行
			if(lib_method[_method]){
				result = lib_method[_method](name,_test,value);
				if(result.code === 'ko')break;
			// 验证方法不存在，则中断
			}else{
				result.code = 'ko';
				result.msg = '方法不存在';
				break;
			}
		}
	}
	return result;
}