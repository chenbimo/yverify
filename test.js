const yverify = require('./yverify');
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
let res = yverify([
	{
		name:'名称',
		rules:{
			method:['Is'],
			test:[
				[1,2,6]
			]
		},
		value:6
	}
]);
console.dir(res);