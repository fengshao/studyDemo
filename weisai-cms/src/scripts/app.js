import {Link} from 'react-router';
var App = React.createClass({
    render : function() {
        return (
            <div>
                <ul>
                    <li><Link to="/">App</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/users">Users</Link></li>
                    <li><Link to="/not_exist">404</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
});

module.exports = App;