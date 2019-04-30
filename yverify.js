// yverify 验证插件
// ==相等性======================
// IsEqual IS Is is 等于
// NotEqual NOT Not not 不等于
// ==包含性验证==================
// Include IN In in 包含
// Exclude EX Ex ex 不包含
// ==比较大小====================
// Miniumn MIN Min min 最小值
// Maxiumn MXN Mxn mxn 最大值
// ==比较长度====================
// MinLeng MIL Mil mil 最小长度
// MaxLeng MXL Mxl mxl 最大长度
// ==============================
// 使用方式
/*
Yverify([
	{
		name:'名称',
		rules:[
			method:['Is','In','Ex','Min','Mxn','Mxl'],
			assert:[
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
const lib_assert = require('./lib/assert');
const lib_method = require('./lib/method');
const lib_tool = require('./lib/tool');

// 导出
module.exports = {
    Verify:params => {
        // 验证数组长度
        let p_length = params.length;
        // 默认消息
        let result = {code:'ok',msg:'默认验证通过'};
        // 循环所有验证字段
        for(let i = 0;i < p_length;i++){
            // 提前中断 未通过则直接中断后续过滤程序
            if(result.code === 'ko')break;
            // 验证名称字段
            let name = params[i].name;
            // 验证规则字段
            let rules = params[i].rules;
            // 验证值字段
            let value = params[i].value;
            // 方法列表
            let method = rules.method;
            // 规则列表
            let assert = rules.assert;
            // 方法数量
            let m_length = method.length;
            // 规则数量
            let t_length = assert.length;
            // 方法数量和规则数量不匹配则中断
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
                let _assert = assert[j];
                // 如果验证方法存在，则执行
                if(lib_method[_method]){
                    result = lib_method[_method](name,_assert,value);
                    if(result.code === 'ko'){
                        // 错误调试信息
                        result.error = {
                            name:name,
                            value:value,
                            method:_method,
                            assert:_assert
                        }
                        break;
                    }
                // 验证方法不存在，则中断
                }else{
                    result.code = 'ko';
                    result.msg = `${_method}: 验证方法不存在`;
                    break;
                }
            }
        }
        return result;
    },
    Assert:lib_assert
} 