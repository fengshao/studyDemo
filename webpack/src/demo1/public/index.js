/**
 * Created by fengs on 2016/6/24.
 */
require('../../../public/index');

var React = require('react');
var ReactDOM = require('react-dom');

var MyStore = require('./store/store');
var MyAction = require('./action/action');
var ImgFigure = require('./view/imageFigure');
var ControllerUnit = require('./view/ControllerUnit');
var MyComponent = React.createClass({

  getInitialState: function () {
    return MyStore.getState();
  },

  componentDidMount: function () {
    MyStore.listen(this.onChange);
    MyAction.Handledata();
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
    var controllerUnits = [],
      imgFigures = [];

    newImageDatasArr.forEach(function (value, index) {

      if (!newImageDatasArr[index]) {
        newImageDatasArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        };
      }

      imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index}
                                 arrange={newImageDatasArr[index]}/>);

      controllerUnits.push(<ControllerUnit key={index} arrange={newImageDatasArr[index]}/>);
    }.bind(this));

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
});


ReactDOM.render(<MyComponent />, document.getElementById('content')); // jshint ignore:line

module.exports = MyComponent;
