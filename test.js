const Y = require('./yverify');
/* let res = yverify([
	{
		name:'名称',
		rules:{
			method:['Is','In','Ex','Min','Mxn','Mxl'],
			test:[
				['1','2','3','_empty'],
				['2889'],
				//6,
				1,
				10,
				3
			]
		},
		value:6
	}
]); */
let res = Y.Verify([
	{
		name:'名称',
		rules:{
			method:['IS','NOT'],
			assert:[
				Y.Assert.inEmpty,
                Y.Assert.inNumber
			]
		},
		value:' ddd'
	}
]);
console.dir(res);