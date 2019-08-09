const YVerify = {
    // 类型列表
    _typeLists: {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Object]": "object",
        "[object Error]": "error"
    },
    // 类型检测
    _typeOf: function(obj) {
        if (obj == null) return String(obj);
        return typeof obj === "object" || typeof obj === "function" ? YVerify._typeLists[YVerify._typeLists.toString.call(obj)] || "object" : typeof obj;
    },
    _ObjectKeys: function(obj) {
        let keys = [];
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                keys.push(prop);
            }
        }
        return keys;
    },
    RegExp: {
        isEmpty: value => {
            // 纯空
            return /^\s+$/gi.test(value);
        },
        notEmpty: value => {
            // 非空
            return !/^\s+$/gi.test(value);
        },
        inEmpty: value => {
            // 存在空
            return /\s+/gi.test(value);
        },
        outEmpty: value => {
            // 不存在空
            return !/\s+/gi.test(value);
        },
        isNumber: value => {
            // 纯数字
            return /^[0-9]+$/gi.test(value);
        },
        notNumber: value => {
            // 非数字
            return !/^[0-9]+$/gi.test(value);
        },
        inNumber: value => {
            // 包含数字
            return /[0-9]+/gi.test(value);
        },
        outNumber: value => {
            // 不包含数字
            return !/[0-9]+/gi.test(value);
        },
        isLetter: value => {
            // 纯字母
            return /^[a-zA-Z]+$/gi.test(value);
        },
        notLetter: value => {
            // 非字母
            return !/^[a-zA-Z]+$/gi.test(value);
        },
        inLetter: value => {
            // 含字母
            return /[a-zA-Z]+/gi.test(value);
        },
        outLetter: value => {
            // 不含字母
            return !/[a-zA-Z]+/gi.test(value);
        },
        isChinese: value => {
            // 纯汉字
            return /^[\u4e00-\u9fa5]+$/gi.test(value);
        },
        notChinese: value => {
            // 非汉字
            return !/^[\u4e00-\u9fa5]+$/gi.test(value);
        },
        inChinese: value => {
            // 含汉字
            return /[\u4e00-\u9fa5]+/gi.test(value);
        },
        outChinese: value => {
            // 不含汉字
            return !/[\u4e00-\u9fa5]+/gi.test(value);
        },
        isEmail: value => {
            // 纯邮箱
            return /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-z]{2,8}$/gi.test(value);
        },
        notEmail: value => {
            // 非邮箱
            return !/^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-z]{2,8}$/gi.test(value);
        },
        inEmail: value => {
            // 含邮箱
            return /[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-z]{2,8}/gi.test(value);
        },
        outEmail: value => {
            // 不含邮箱
            return !/[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-z]{2,8}/gi.test(value);
        },
        isZero: value => {
            // 纯0
            return /^0+$/gi.test(value);
        },
        notZero: value => {
            // 非0
            return !/^0+$/gi.test(value);
        },
        inZero: value => {
            // 含0
            return /0+/gi.test(value);
        },
        outZero: value => {
            // 不含0
            return !/0+/gi.test(value);
        }
    },
    _method: {
        // 通用私有结果判断返回函数
        _Res: function _Res(msg, bool, method, field) {
            // 默认结果
            let res = { code: "ko", data: field, msg: "默认失败信息" };
            // 更新状态
            if (bool) {
                res.code = "ok";
            } else {
                res.code = "ko";
            }
            // 更新消息
            res.msg = msg[res.code];
            // 返回结果
            return res;
        },
        //相等性验证函数
        IsEqual: function IsEqual(name, method, rules, value, field) {
            // 规则类型
            let rule = rules;
            if (rules.value) rule = rule.value;
            let type = YVerify._typeOf(rule);
            // 初始化消息
            let msg = {
                ok: rules.ok || `${name} 相等验证通过`,
                ko: rules.ko || `${name} 相等验证未通过`
            };
            // 默认初始化为失败状态
            let bool = false;
            // 如果是字符串类型
            if (type === "string") {
                bool = rule === value;
            }
            // 如果是数字类型
            if (type === "number") {
                bool = rule === value;
            }
            // 如果是数组类型
            if (type === "array") {
                bool = rule.some(v => {
                    return v === value;
                });
            }
            // 如果是内置函数
            if (type === "function") {
                bool = rule(value);
            }
            // 如果是正则表达式
            if (type === "regexp") {
                bool = rule.test(value);
            }
            return YVerify._method._Res(msg, bool, method, field);
        },
        // 不相等性验证函数
        NotEqual: function NotEqual(name, method, rules, value, field) {
            // 规则类型
            let rule = rules;
            if (rules.value) rule = rule.value;
            let type = YVerify._typeOf(rule);
            // 初始化消息
            let msg = {
                ok: rules.ok || `${name} 不相等验证通过`,
                ko: rules.ko || `${name} 不相等验证未通过`
            };
            // 默认初始化为失败状态
            let bool = false;
            // 如果是字符数据类型
            if (type === "string") {
                bool = !(rule === value);
            }
            // 如果是数字数据类型
            if (type === "number") {
                bool = !(rule === value);
            }
            // 如果是数组类型
            if (type === "array") {
                bool = !rule.some(v => {
                    return v === value;
                });
            }
            // 如果是内置函数
            if (type === "function") {
                bool = !rule(value);
            }
            // 如果是正则表达式
            if (type === "regexp") {
                bool = !rule.test(value);
            }
            return YVerify._method._Res(msg, bool, method, field);
        },
        // 包含验证函数
        Include: function Include(name, method, rules, value, field) {
            // 规则类型
            let rule = rules;
            if (rules.value) rule = rule.value;
            let type = YVerify._typeOf(rule);
            // 初始化消息
            let msg = {
                ok: rules.ok || `${name} 包含验证通过`,
                ko: rules.ko || `${name} 包含验证未通过`
            };
            // 默认初始化为失败状态
            let bool = false;

            // 如果是字符类型
            if (type === "string") {
                bool = rule.includes(value);
            }
            // 如果是数字类型
            if (type === "number") {
                bool = String(rule).includes(value);
            }
            // 如果是数组类型
            if (type === "array") {
                bool = rule.map(v => {
                    v.includes(value);
                });
            }
            // 如果是内置函数
            if (type === "function") {
                bool = rule(value);
            }
            // 如果是正则表达式
            if (type === "regexp") {
                bool = rule.test(value);
            }
            return YVerify._method._Res(msg, bool, method, field);
        },
        // 不包含验证函数
        Exclude: function Exclude(name, method, rules, value, field) {
            // 规则类型
            let rule = rules;
            if (rules.value) rule = rule.value;
            let type = YVerify._typeOf(rule);
            // 初始化消息
            let msg = {
                ok: rules.ok || `${name} 不包含验证通过`,
                ko: rules.ko || `${name} 不包含验证未通过`
            };
            // 默认初始化为失败状态
            let bool = false;
            // 如果是字符数据类型
            if (type === "string") {
                bool = !(rule === value);
            }
            // 如果是数字数据类型
            if (type === "number") {
                bool = !(rule === value);
            }
            // 如果是数组类型
            if (type === "array") {
                bool = !rule.includes(value);
            }
            // 如果是内置函数
            if (type === "function") {
                bool = !rule(value);
            }
            // 如果是正则表达式
            if (type === "regexp") {
                bool = !rule.test(value);
            }
            return YVerify._method._Res(msg, bool, method, field);
        },
        // 最小值验证函数
        MinNumber: function MinNumber(name, method, rules, value, field) {
            // 规则类型
            let rule = rules;
            if (rules.value) rule = rule.value;
            let type = YVerify._typeOf(rule);
            // 初始化消息
            let msg = {
                ok: rules.ok || `${name} 最小值验证通过`,
                ko: rules.ko || `${name} 最小值验证未通过`
            };
            // 默认初始化为失败状态
            let bool = false;
            // 如果是数字数据类型
            if (type === "number") {
                bool = value > rule;
            }
            // 如果是字符数据类型
            if (type === "string") {
                bool = value > rule.codePointAt(0);
            }
            return YVerify._method._Res(msg, bool, method, field);
        },
        // 最大值验证函数
        MaxNumber: function MaxNumber(name, method, rules, value, field) {
            // 规则类型
            let rule = rules;
            if (rules.value) rule = rule.value;
            let type = YVerify._typeOf(rule);
            // 初始化消息
            let msg = {
                ok: rules.ok || `${name} 最大值验证通过`,
                ko: rules.ko || `${name} 最大值验证未通过`
            };
            // 默认初始化为失败状态
            let bool = false;
            // 如果是数字数据类型
            if (type === "number") {
                bool = value < rule;
            }
            // 如果是字符数据类型
            if (type === "string") {
                bool = value < rule.codePointAt(0);
            }
            return YVerify._method._Res(msg, bool, method, field);
        },
        // 最小长度验证函数
        MinLength: function MinLength(name, method, rules, value, field) {
            // 规则类型
            let rule = rules;
            if (rules.value) rule = rule.value;
            let type = YVerify._typeOf(rule);
            // 值长度
            let lens = String(value).length;
            // 初始化消息
            let msg = {
                ok: rules.ok || `${name} 最小长度验证通过`,
                ko: rules.ko || `${name} 最小长度验证未通过`
            };
            // 默认初始化为失败状态
            let bool = false;
            // 如果是字符数据类型
            if (type === "number") {
                bool = lens > rule;
            }
            return YVerify._method._Res(msg, bool, method, field);
        },
        // 最大长度验证函数
        MaxLength: function MaxLength(name, method, rules, value, field) {
            // 规则类型
            let rule = rules;
            if (rules.value) rule = rule.value;
            let type = YVerify._typeOf(rule);
            // 值长度
            let lens = String(value).length;
            // 初始化消息
            let msg = {
                ok: rules.ok || `${name} 最大长度验证通过`,
                ko: rules.ko || `${name} 最大长度验证未通过`
            };
            // 默认初始化为失败状态
            let bool = false;
            // 如果是字符数据类型
            if (type === "number") {
                bool = lens < rule;
            }
            return YVerify._method._Res(msg, bool, method, field);
        }
    },
    Verify: function Verify(params) {
        // 验证数组长度
        let p_length = params.length;
        // 默认消息
        let result = { code: "ok", msg: "默认验证通过" };
        // 循环所有验证字段
        for (let i = 0; i < p_length; i++) {
            if (result.code === "ko") break;
            // 当前字段
            let field = params[i];
            // 当前字段名称
            let currentName = field.name;
            if (!currentName) {
                result.code = "ko";
                result.data = field;
                result.msg = "名称不合法";
                break;
            }
            // 当前需要验证的值
            let currentValue = field.value;
            // 当前字段的所有验证方法名称数组
            let fieldMethods = YVerify._ObjectKeys(field.rules);
            // 方法长度
            let m_length = fieldMethods.length;
            // 循环验证所有规则
            for (let j = 0; j < m_length; j++) {
                // 当前的验证方法名
                let currentMethod = fieldMethods[j];
                // 判断方法名是否存在
                if (!YVerify._method[currentMethod]) {
                    result.code = "ko";
                    result.data = field;
                    result.msg = `${currentMethod} 验证方法不存在`;
                    break;
                }
                // 当前的验证规则
                let currentRule = field.rules[currentMethod];
                // 判断验证规则是否存在
                if (!currentRule) {
                    result.code = "ko";
                    result.data = field;
                    result.msg = `验证规则不存在`;
                    break;
                }
                // 根据验证函数得出结果
                result = YVerify._method[currentMethod](currentName, currentMethod, currentRule, currentValue, field);
                if (result.code === "ko") break;
            }
        }
        if (result.code === "ok") {
            result = { code: "ok", msg: "全部验证通过" };
        }
        return result;
    }
};
module.exports = YVerify;
