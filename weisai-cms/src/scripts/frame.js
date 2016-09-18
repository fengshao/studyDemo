import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import App from 'scripts/app';
import BrandSetting from 'scripts/brand-setting/brand-setting';
import MainActivity from 'scripts/main-activity/main-activity';
import WorthBuying from 'scripts/worth-buying/worth-buying';
import FirstProduct from 'scripts/first-product/first-product';
import Special from 'scripts/special/special';
import NoMatch from 'scripts/nomatch';

let Frame = React.createClass({
	render: function () {
		return (
			<div>
				<Router history={hashHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={BrandSetting}/>
						<Route path="brand_setting" component={BrandSetting}/>
						<Route path="main_activity" component={MainActivity}/>
						<Route path="worth_buying" component={WorthBuying}/>
						<Route path="first_product" component={FirstProduct}/>
						<Route path="special" component={Special}/>
						<Route path="*" component={NoMatch}/>
					</Route>
				</Router>
			</div>
		);
	}
});

module.exports = Frame;
