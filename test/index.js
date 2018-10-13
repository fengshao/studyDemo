/**
 * Created by fengs on 2017/3/7.
 */
var obj = {
	a: 1,
	b: function () {
		console.log(this.a)
	}
};
var a = 2;
var objb = obj.b;
obj.b();
objb();
obj.b.call(window);


var arr = [];
for(var i =0; i<10; i++){
	arr.push(function () {
		console.log(i);
	})
}

arr.forEach(function (list) {
	list();
});
