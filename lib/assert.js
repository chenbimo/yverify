module.exports = {
	isEmpty:value => {
		// 纯空
		return /^\s+$/gi.test(value);
	},
	notEmpty:value => {
		// 非空
		return !/^\s+$/gi.test(value);
	},
	inEmpty:value => {
		// 存在空
		return /\s+/gi.test(value);
	},
    outEmpty:value => {
		// 不存在空
		return !/\s+/gi.test(value);
	},
	isNumber:value => {
		// 纯数字
        return /^[0-9]+$/gi.test(value);
	},
	notNumber:value => {
		// 非数字
		return !/^[0-9]+$/gi.test(value);
	},
    inNumber:value => {
        // 包含数字
        return /[0-9]+/gi.test(value);
    },
    outNumber:value => {
        // 不包含数字
        return !/[0-9]+/gi.test(value);
    },
	isLetter:value => {
		// 纯字母
        return /^[a-zA-Z]+$/gi.test(value);
	},
	notLetter:value => {
		// 非字母
        return !/^[a-zA-Z]+$/gi.test(value);
	},
    inLetter:value => {
		// 含字母
        return /[a-zA-Z]+/gi.test(value);
	},
    outLetter:value => {
		// 不含字母
        return !/[a-zA-Z]+/gi.test(value);
	},
	isChinese:value => {
		// 纯汉字
        return /^[\u4e00-\u9fa5]+$/gi.test(value);
	},
    notChinese:value => {
		// 非汉字
        return !/^[\u4e00-\u9fa5]+$/gi.test(value);
	},
    inChinese:value => {
		// 含汉字
        return /[\u4e00-\u9fa5]+/gi.test(value);
	},
    outChinese:value => {
		// 不含汉字
        return !/[\u4e00-\u9fa5]+/gi.test(value);
	},
	isEmail:value => {
		// 纯邮箱
        return /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-z]{2,8}$/gi.test(value);
	},
    notEmail:value => {
		// 非邮箱
        return !/^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-z]{2,8}$/gi.test(value);
	},
    inEmail:value => {
		// 含邮箱
        return /[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-z]{2,8}/gi.test(value);
	},
    outEmail:value => {
		// 不含邮箱
        return !/[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-z]{2,8}/gi.test(value);
	},
	isZero:value => {
		// 纯0
        return /^0+$/gi.test(value);
	},
    notZero:value => {
		// 非0
        return !/^0+$/gi.test(value);
	},
    inZero:value => {
		// 含0
        return /0+/gi.test(value);
	},
    outZero:value => {
		// 不含0
        return !/0+/gi.test(value);
	}
}