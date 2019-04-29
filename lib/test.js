module.exports = {
	_Empty:(hash) => {
		// 都为空
		if(/^\s+$/gi.test(value)){
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '必须全为空字符'};
		}
	},
	NotEmpty:(name,rule,value) => {
		// 都不为空
		if(!/^\s+$/gi.test(value)){
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '必须为非空字符'};
		}
	},
	HasEmpty:(name,rule,value) => {
		// 存在空
		if(/\s+/gi.test(value)){ 
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '必须存在空字符'};
		}
	},
	AllNumber:(name,rule,value) => {
		// 纯数字
		if(/^[0-9]+$/gi.test(value)){
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '必须全为数字'};
		}
	},
	NotNumber:(name,rule,value) => {
		// 纯数字
		if(!/^[0-9]+$/gi.test(value)){
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '必须为非数字'};
		}
	},
	AllLetter:(name,rule,value) => {
		// 纯字母
		if(/^[a-zA-Z]+$/gi.test(value)){
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '必须全为字母'};
		}
	},
	NotLetter:(name,rule,value) => {
		// 非字母
		if(!/^[a-zA-Z]+$/gi.test(value)){
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '必须为非字母'};
		}
	},
	AllChinese:(name,rule,value) => {
		// 纯汉字
		if(/^[\u4e00-\u9fa5]+$/gi.test(value)){
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '必须全为汉字'};
		}
	},
	AllEmail:(name,rule,value) => {
		// 纯邮箱
		if(/^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-z]{2,8}$/gi.test(value)){
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '格式错误'};
		}
	},
	Zero:(name,rule,value) => {
		// 0值判定
		value = +value;
		if(value === 0){
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '必须等于0'};
		}
	},
	MinLen:(name,rule,value) => {
		// 最小长度
		value = '' + value;
		if(value.length >= rule.length){
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '长度必须大于等于' + rule.length}
		}
	},
	MaxLen:(name,rule,value) => {
		// 最大长度
		value = '' + value;
		if(value.length <= rule.length){
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '长度必须小于等于' + rule.length}
		}
	},
	FixLen:(name,rule,value) => {
		// 固定长度
		value = '' + value;
		if(value.length === rule.length){
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '长度必须等于' + rule.length}
		}
	},
	MinNum:(name,rule,value) => {
		// 最小数字
		value = +value;
		if(value >= +rule.number){
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '必须大于等于' + rule.number}
		}
	},
	MaxNum:(name,rule,value) => {
		// 最大长度
		value = +value;
		if(value <= +rule.number){
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '必须小于等于' + rule.number}
		}
	},
	FixNum:(name,rule,value) => {
		// 固定长度
		value = +value;
		if(value === +rule.number){
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '必须等于' + rule.number}
		}
	},
	Include:(name,rule,value) => {
		// 包含
		if(rule.arrs.includes('' + value)){
			return {code:'ok',msg:name + '验证正确'};
		}else{
			return {code:'ko',msg:name + '必须等于' + $T.Stringify(rule.arrs)}
		}
	}
}