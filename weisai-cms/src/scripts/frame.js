import { Router, Route, hashHistory } from 'react-router';

import App from 'scripts/app';
import About from 'scripts/about';
import Users from 'scripts/users';
import NoMatch from 'scripts/nomatch';

let Frame = React.createClass({
    render : function() {
        return (

            <div>
                <Router history={hashHistory}>
                    <Route path="/" component={App}>
                        <Route path="about" component={About}/>
                        <Route path="users" component={Users} />
                        <Route path="*" component={NoMatch}/>
                    </Route>
                </Router>
            </div>


        );
    }
});

module.exports = Frame;
