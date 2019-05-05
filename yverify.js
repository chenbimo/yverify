const lib_assert = require('./lib/assert');
const lib_method = require('./lib/method');

// 导出
module.exports = {
    Verify: params => {
        // 验证数组长度
        let p_length = params.length;
        // 默认消息
        let result = { code: 'ok', msg: '默认验证通过' };
        // 循环所有验证字段
        for (let i = 0; i < p_length; i++) {
            // 提前中断 未通过则直接中断后续过滤程序
            if (result.code === 'ko') break;
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
            let a_length = assert.length;
            // 方法数量和规则数量不匹配则中断
            if (m_length !== a_length) {
                result.code = 'ko';
                result.msg = '方法和规则数量不匹配';
                // 错误调试信息
                result.error = {
                    name: name,
                    value: value
                }
                break;
            }
            // 循环验证所有规则
            for (let j = 0; j < m_length; j++) {
                // 当前的验证方法
                let _method = method[j];
                // 当前的验证规则
                let _assert = assert[j];
                // 如果验证方法存在，则执行
                if (lib_method[_method]) {
                    result = lib_method[_method](name, _assert, value);
                    if (result.code === 'ko') {
                        // 错误调试信息
                        result.error = {
                            name: name,
                            value: value,
                            method: _method,
                            assert: _assert
                        }
                        break;
                    } else {
                        result.msg = '全部验证通过';
                    }
                    // 验证方法不存在，则中断
                } else {
                    result.code = 'ko';
                    result.msg = `${_method}: 验证方法不存在`;
                    // 错误调试信息
                    result.error = {
                        name: name,
                        value: value
                    }
                    break;
                }
            }
        }
        return result;
    },
    Assert: lib_assert
} 