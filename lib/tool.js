// 类 -> 类型
let class2type = {} ;
"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e,i){
	class2type[ "[object " + e + "]" ] = e.toLowerCase();
});
module.exports = {
	_typeof:function(obj){
		if ( obj == null ){
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ class2type.toString.call(obj) ] || "object" :
			typeof obj;
	}
}