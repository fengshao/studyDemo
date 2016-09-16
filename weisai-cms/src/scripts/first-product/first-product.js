/**
 * Created by fengs on 2016/9/16.
 * 最鲜品
 */
var FirstProductStore = require("./store/first-product-store");
var FirstProductAction = require("./action/first-product-action");
var FirstProduct = React.createClass({
	render: function () {
		return (
			<div>我是最鲜品页面</div>
		);
	}
});

module.exports = FirstProduct;