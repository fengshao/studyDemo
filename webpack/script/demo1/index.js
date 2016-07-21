/**
 * Created by fengs on 2016/6/24.
 */
var React = require('react');

//var MyStore = require('./store/store');

//var MyAction = require('./action/action');

var MyComponent = React.createClass({

    //getInitialState: function () {
    //    return MyStore.getState();
    //},
    //
    //getDetail: function (data, e) {
    //    var id = data.Id;
    //    MyAction.GetDetail(id);
    //
    //},
    //
    //componentDidMount: function () {
    //    MyStore.listen(this.onChange);
    //},
    //
    //componentWillMount: function () {
    //    MyStore.unlisten(this.onChange);
    //
    //},
    //
    //onChange: function (state) {
    //    this.setState(state);
    //},

    render: function () {
        return (
            <div>
                testxiaojinfeng
            </div>
        );
    }
});


React.render(<MyComponent />, document.getElementById('content')); // jshint ignore:line

module.exports = MyComponent;
