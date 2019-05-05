/**
 * 使用案例
 * res返回值为true，则通过测试
 */
const Y = require('./yverify');
let res = Y.Verify([
	{
		name: '用户名',
		rules: {
			method: ['IsEqual'],
			assert: [
				Y.Assert.notEmpty
			]
		},
		value: 'chensuiyi'
	},
	{
		name: '密码',
		rules: {
			method: ['IsEqual'],
			assert: [
				Y.Assert.notEmpty
			]
		},
		value: 'chensuiyi'
	},
	{
		name: '邮箱',
		rules: {
			method: ['IsEqual'],
			assert: [
				Y.Assert.notEmpty
			]
		},
		value: 'bimostyle@qq.com'
	}
]);
console.dir(res);