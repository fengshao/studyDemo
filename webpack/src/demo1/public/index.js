/**
 * Created by fengs on 2016/6/24.
 */
require('../../../public/index');

var React = require('react');
var ReactDOM = require('react-dom');

var MyStore = require('./store/store');
var MyAction = require('./action/action');
var MyComponent = React.createClass({

  getInitialState: function () {
    return MyStore.getState();
  },

  componentDidMount: function () {
    MyStore.listen(this.onChange);
    MyAction.GetData();
  },

  componentWillMount: function () {
    MyStore.unlisten(this.onChange);

  },

  onChange: function () {
    this.setState(MyStore.getState());
  },

  render: function () {
    var _this = this;
    var newImageDatasArr = this.state.newImageDatasArr;
    return (
      <div>
        testxiaojinfeng
      </div>
    );
  }
});


ReactDOM.render(<MyComponent />, document.getElementById('content')); // jshint ignore:line

module.exports = MyComponent;
