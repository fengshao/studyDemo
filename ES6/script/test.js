/**
 * Created by jinfeng on 2015/10/28.
 */
for(let i = 0; i < 10; i++){
	console.log("i:" + i);
}
console.log(typeof b);
let b = 2;
console.log(typeof x); // ReferenceError
let x;
var a;
console.log(typeof x);
console.log(typeof a);



function testFun(){
	//var test = "test";
	//test = "ceshi";
	let test = "aa";
	console.log("test");
}

testFun();

function f() { console.log('I am outside!'); }
(function () {
	if(false) {
		// 重复声明一次函数f
		function f() { console.log('I am inside!'); }
	}

	f();
}());


let test;
test = function() {
	console.log("test let");
}

test();
