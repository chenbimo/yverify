/**
 * 使用案例
 * res返回值为true，则通过测试
 */
const Y = require("./yverify");
let res = Y.Verify([
    {
        name: "用户名",
        rules: {
            IsEqual: Y.RegExp.notEmpty
        },
        value: "chensuiyi",
        other: {}
    },
    {
        name: "密码",
        rules: {
            IsEqual: Y.RegExp.notEmpty,
            MinLength: 6,
            MaxLength: 16
        },
        value: "123456789",
        other: {}
    },
    {
        name: "邮箱",
        rules: {
            IsEqual: Y.RegExp.isEmail,
            MinLength: 1,
            MaxLength: 32
        },
        value: "bimostyle@qq.com",
        other: {}
    }
]);
console.dir(res);
