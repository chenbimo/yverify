"use strict";

function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

var YVerify = {
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
    _typeOf: function _typeOf(obj) {
        if (obj == null) return String(obj);
        return _typeof(obj) === "object" || typeof obj === "function" ? YVerify._typeLists[YVerify._typeLists.toString.call(obj)] || "object" : _typeof(obj);
    },
    _ObjectKeys: function _ObjectKeys(obj) {
        var keys = [];

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                keys.push(prop);
            }
        }

        return keys;
    },
    RegExp: {
        isEmpty: function isEmpty(value) {
            // 纯空
            return /^\s+$/gi.test(value);
        },
        notEmpty: function notEmpty(value) {
            // 非空
            return !/^\s+$/gi.test(value);
        },
        inEmpty: function inEmpty(value) {
            // 存在空
            return /\s+/gi.test(value);
        },
        outEmpty: function outEmpty(value) {
            // 不存在空
            return !/\s+/gi.test(value);
        },
        isNumber: function isNumber(value) {
            // 纯数字
            return /^[0-9]+$/gi.test(value);
        },
        notNumber: function notNumber(value) {
            // 非数字
            return !/^[0-9]+$/gi.test(value);
        },
        inNumber: function inNumber(value) {
            // 包含数字
            return /[0-9]+/gi.test(value);
        },
        outNumber: function outNumber(value) {
            // 不包含数字
            return !/[0-9]+/gi.test(value);
        },
        isLetter: function isLetter(value) {
            // 纯字母
            return /^[a-zA-Z]+$/gi.test(value);
        },
        notLetter: function notLetter(value) {
            // 非字母
            return !/^[a-zA-Z]+$/gi.test(value);
        },
        inLetter: function inLetter(value) {
            // 含字母
            return /[a-zA-Z]+/gi.test(value);
        },
        outLetter: function outLetter(value) {
            // 不含字母
            return !/[a-zA-Z]+/gi.test(value);
        },
        isChinese: function isChinese(value) {
            // 纯汉字
            return /^[\u4e00-\u9fa5]+$/gi.test(value);
        },
        notChinese: function notChinese(value) {
            // 非汉字
            return !/^[\u4e00-\u9fa5]+$/gi.test(value);
        },
        inChinese: function inChinese(value) {
            // 含汉字
            return /[\u4e00-\u9fa5]+/gi.test(value);
        },
        outChinese: function outChinese(value) {
            // 不含汉字
            return !/[\u4e00-\u9fa5]+/gi.test(value);
        },
        isEmail: function isEmail(value) {
            // 纯邮箱
            return /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-z]{2,8}$/gi.test(value);
        },
        notEmail: function notEmail(value) {
            // 非邮箱
            return !/^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-z]{2,8}$/gi.test(value);
        },
        inEmail: function inEmail(value) {
            // 含邮箱
            return /[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-z]{2,8}/gi.test(value);
        },
        outEmail: function outEmail(value) {
            // 不含邮箱
            return !/[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-z]{2,8}/gi.test(value);
        },
        isZero: function isZero(value) {
            // 纯0
            return /^0+$/gi.test(value);
        },
        notZero: function notZero(value) {
            // 非0
            return !/^0+$/gi.test(value);
        },
        inZero: function inZero(value) {
            // 含0
            return /0+/gi.test(value);
        },
        outZero: function outZero(value) {
            // 不含0
            return !/0+/gi.test(value);
        }
    },
    _method: {
        // 通用私有结果判断返回函数
        _Res: function _Res(msg, bool, method, field) {
            // 默认结果
            var res = {
                code: "ko",
                data: field,
                msg: "默认失败信息"
            }; // 更新状态

            if (bool) {
                res.code = "ok";
            } else {
                res.code = "ko";
            } // 更新消息

            res.msg = msg[res.code]; // 返回结果

            return res;
        },
        //相等性验证函数
        IsEqual: function IsEqual(name, method, rules, value, field) {
            // 规则类型
            var rule = rules;
            if (rules.value) rule = rule.value;

            var type = YVerify._typeOf(rule); // 初始化消息

            var msg = {
                ok: rules.ok || "".concat(name, " \u76F8\u7B49\u9A8C\u8BC1\u901A\u8FC7"),
                ko: rules.ko || "".concat(name, " \u76F8\u7B49\u9A8C\u8BC1\u672A\u901A\u8FC7")
            }; // 默认初始化为失败状态

            var bool = false; // 如果是字符串类型

            if (type === "string") {
                bool = rule === value;
            } // 如果是数字类型

            if (type === "number") {
                bool = rule === value;
            } // 如果是数组类型

            if (type === "array") {
                bool = rule.some(function(v) {
                    return v === value;
                });
            } // 如果是内置函数

            if (type === "function") {
                bool = rule(value);
            } // 如果是正则表达式

            if (type === "regexp") {
                bool = rule.test(value);
            }

            return YVerify._method._Res(msg, bool, method, field);
        },
        // 不相等性验证函数
        NotEqual: function NotEqual(name, method, rules, value, field) {
            // 规则类型
            var rule = rules;
            if (rules.value) rule = rule.value;

            var type = YVerify._typeOf(rule); // 初始化消息

            var msg = {
                ok: rules.ok || "".concat(name, " \u4E0D\u76F8\u7B49\u9A8C\u8BC1\u901A\u8FC7"),
                ko: rules.ko || "".concat(name, " \u4E0D\u76F8\u7B49\u9A8C\u8BC1\u672A\u901A\u8FC7")
            }; // 默认初始化为失败状态

            var bool = false; // 如果是字符数据类型

            if (type === "string") {
                bool = !(rule === value);
            } // 如果是数字数据类型

            if (type === "number") {
                bool = !(rule === value);
            } // 如果是数组类型

            if (type === "array") {
                bool = !rule.some(function(v) {
                    return v === value;
                });
            } // 如果是内置函数

            if (type === "function") {
                bool = !rule(value);
            } // 如果是正则表达式

            if (type === "regexp") {
                bool = !rule.test(value);
            }

            return YVerify._method._Res(msg, bool, method, field);
        },
        // 包含验证函数
        Include: function Include(name, method, rules, value, field) {
            // 规则类型
            var rule = rules;
            if (rules.value) rule = rule.value;

            var type = YVerify._typeOf(rule); // 初始化消息

            var msg = {
                ok: rules.ok || "".concat(name, " \u5305\u542B\u9A8C\u8BC1\u901A\u8FC7"),
                ko: rules.ko || "".concat(name, " \u5305\u542B\u9A8C\u8BC1\u672A\u901A\u8FC7")
            }; // 默认初始化为失败状态

            var bool = false; // 如果是字符类型

            if (type === "string") {
                bool = rule.includes(value);
            } // 如果是数字类型

            if (type === "number") {
                bool = String(rule).includes(value);
            } // 如果是数组类型

            if (type === "array") {
                bool = rule.map(function(v) {
                    v.includes(value);
                });
            } // 如果是内置函数

            if (type === "function") {
                bool = rule(value);
            } // 如果是正则表达式

            if (type === "regexp") {
                bool = rule.test(value);
            }

            return YVerify._method._Res(msg, bool, method, field);
        },
        // 不包含验证函数
        Exclude: function Exclude(name, method, rules, value, field) {
            // 规则类型
            var rule = rules;
            if (rules.value) rule = rule.value;

            var type = YVerify._typeOf(rule); // 初始化消息

            var msg = {
                ok: rules.ok || "".concat(name, " \u4E0D\u5305\u542B\u9A8C\u8BC1\u901A\u8FC7"),
                ko: rules.ko || "".concat(name, " \u4E0D\u5305\u542B\u9A8C\u8BC1\u672A\u901A\u8FC7")
            }; // 默认初始化为失败状态

            var bool = false; // 如果是字符数据类型

            if (type === "string") {
                bool = !(rule === value);
            } // 如果是数字数据类型

            if (type === "number") {
                bool = !(rule === value);
            } // 如果是数组类型

            if (type === "array") {
                bool = !rule.includes(value);
            } // 如果是内置函数

            if (type === "function") {
                bool = !rule(value);
            } // 如果是正则表达式

            if (type === "regexp") {
                bool = !rule.test(value);
            }

            return YVerify._method._Res(msg, bool, method, field);
        },
        // 最小值验证函数
        MinNumber: function MinNumber(name, method, rules, value, field) {
            // 规则类型
            var rule = rules;
            if (rules.value) rule = rule.value;

            var type = YVerify._typeOf(rule); // 初始化消息

            var msg = {
                ok: rules.ok || "".concat(name, " \u6700\u5C0F\u503C\u9A8C\u8BC1\u901A\u8FC7"),
                ko: rules.ko || "".concat(name, " \u6700\u5C0F\u503C\u9A8C\u8BC1\u672A\u901A\u8FC7")
            }; // 默认初始化为失败状态

            var bool = false; // 如果是数字数据类型

            if (type === "number") {
                bool = value > rule;
            } // 如果是字符数据类型

            if (type === "string") {
                bool = value > rule.codePointAt(0);
            }

            return YVerify._method._Res(msg, bool, method, field);
        },
        // 最大值验证函数
        MaxNumber: function MaxNumber(name, method, rules, value, field) {
            // 规则类型
            var rule = rules;
            if (rules.value) rule = rule.value;

            var type = YVerify._typeOf(rule); // 初始化消息

            var msg = {
                ok: rules.ok || "".concat(name, " \u6700\u5927\u503C\u9A8C\u8BC1\u901A\u8FC7"),
                ko: rules.ko || "".concat(name, " \u6700\u5927\u503C\u9A8C\u8BC1\u672A\u901A\u8FC7")
            }; // 默认初始化为失败状态

            var bool = false; // 如果是数字数据类型

            if (type === "number") {
                bool = value < rule;
            } // 如果是字符数据类型

            if (type === "string") {
                bool = value < rule.codePointAt(0);
            }

            return YVerify._method._Res(msg, bool, method, field);
        },
        // 最小长度验证函数
        MinLength: function MinLength(name, method, rules, value, field) {
            // 规则类型
            var rule = rules;
            if (rules.value) rule = rule.value;

            var type = YVerify._typeOf(rule); // 值长度

            var lens = String(value).length; // 初始化消息

            var msg = {
                ok: rules.ok || "".concat(name, " \u6700\u5C0F\u957F\u5EA6\u9A8C\u8BC1\u901A\u8FC7"),
                ko: rules.ko || "".concat(name, " \u6700\u5C0F\u957F\u5EA6\u9A8C\u8BC1\u672A\u901A\u8FC7")
            }; // 默认初始化为失败状态

            var bool = false; // 如果是字符数据类型

            if (type === "number") {
                bool = lens > rule;
            }

            return YVerify._method._Res(msg, bool, method, field);
        },
        // 最大长度验证函数
        MaxLength: function MaxLength(name, method, rules, value, field) {
            // 规则类型
            var rule = rules;
            if (rules.value) rule = rule.value;

            var type = YVerify._typeOf(rule); // 值长度

            var lens = String(value).length; // 初始化消息

            var msg = {
                ok: rules.ok || "".concat(name, " \u6700\u5927\u957F\u5EA6\u9A8C\u8BC1\u901A\u8FC7"),
                ko: rules.ko || "".concat(name, " \u6700\u5927\u957F\u5EA6\u9A8C\u8BC1\u672A\u901A\u8FC7")
            }; // 默认初始化为失败状态

            var bool = false; // 如果是字符数据类型

            if (type === "number") {
                bool = lens < rule;
            }

            return YVerify._method._Res(msg, bool, method, field);
        }
    },
    Verify: function Verify(params) {
        // 验证数组长度
        var p_length = params.length; // 默认消息

        var result = {
            code: "ok",
            msg: "默认验证通过"
        }; // 循环所有验证字段

        for (var i = 0; i < p_length; i++) {
            if (result.code === "ko") break; // 当前字段

            var field = params[i]; // 当前字段名称

            var currentName = field.name;

            if (!currentName) {
                result.code = "ko";
                result.data = field;
                result.msg = "名称不合法";
                break;
            } // 当前需要验证的值

            var currentValue = field.value; // 当前字段的所有验证方法名称数组

            var fieldMethods = YVerify._ObjectKeys(field.rules); // 方法长度

            var m_length = fieldMethods.length; // 循环验证所有规则

            for (var j = 0; j < m_length; j++) {
                // 当前的验证方法名
                var currentMethod = fieldMethods[j]; // 判断方法名是否存在

                if (!YVerify._method[currentMethod]) {
                    result.code = "ko";
                    result.data = field;
                    result.msg = "".concat(currentMethod, " \u9A8C\u8BC1\u65B9\u6CD5\u4E0D\u5B58\u5728");
                    break;
                } // 当前的验证规则

                var currentRule = field.rules[currentMethod]; // 判断验证规则是否存在

                if (!currentRule) {
                    result.code = "ko";
                    result.data = field;
                    result.msg = "\u9A8C\u8BC1\u89C4\u5219\u4E0D\u5B58\u5728";
                    break;
                } // 根据验证函数得出结果

                result = YVerify._method[currentMethod](currentName, currentMethod, currentRule, currentValue, field);
                if (result.code === "ko") break;
            }
        }

        if (result.code === "ok") {
            result = {
                code: "ok",
                msg: "全部验证通过"
            };
        }

        return result;
    }
};
