/**
 * Created by fengs on 2016/6/24.
 */
require('../../../public/index');
require('./styles/main.scss');

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

  componentWillMount: function () {
    MyStore.unlisten(this.onChange);

  },

  onChange: function () {
    this.setState(MyStore.getState());
  },

  // 组件加载以后， 为每张图片计算其位置的范围
  componentDidMount: function () {
    MyStore.listen(this.onChange);
    MyAction.handledata();

    var Constant = this.state.Constant;
    // 首先拿到舞台的大小
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    // 拿到一个imageFigure的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM ? imgFigureDOM.scrollWidth : 320,
      imgH = imgFigureDOM ? imgFigureDOM.scrollHeight : 360,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    // 计算中心图片的位置点
    Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    // 计算左侧，右侧区域图片排布位置的取值范围
    Constant.hPosRange.leftSecX[0] = -halfImgW;
    Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    Constant.hPosRange.y[0] = -halfImgH;
    Constant.hPosRange.y[1] = stageH - halfImgH;

    // 计算上侧区域图片排布位置的取值范围
    Constant.vPosRange.topY[0] = -halfImgH;
    Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    Constant.vPosRange.x[0] = halfStageW - imgW;
    Constant.vPosRange.x[1] = halfStageW;
  },


  events: {
    /*
     * 翻转图片
     * @param index 传入当前被执行inverse操作的图片对应的图片信息数组的index值
     * @returns {Function} 这是一个闭包函数, 其内return一个真正待被执行的函数
     */
    inverse: function (index) {
      MyAction.inverse(index);
    },

    /*
     * 利用arrange函数， 居中对应index的图片
     * @param index, 需要被居中的图片对应的图片信息数组的index值
     * @returns {Function}
     */
    center: function (index) {
      MyAction.center(index, this.state.Constant);
    }


  },

  render: function () {
    var _this = this;
    var imgsArrangeArr = this.state.imgsArrangeArr;
    var newImageDatasArr = this.state.newImageDatasArr;
    var controllerUnits = [],
      imgFigures = [];

    newImageDatasArr.forEach(function (value, index) {

      imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index}
                                 arrange={imgsArrangeArr[index]}
                                 value={index}
                                 inverse={_this.events.inverse.bind(_this)}
                                 center={_this.events.center.bind(_this)}
      />);

      controllerUnits.push(<ControllerUnit key={index} arrange={imgsArrangeArr[index]}
                                           value={index}
                                           inverse={_this.events.inverse.bind(_this)}
                                           center={_this.events.center.bind(_this)}
      />);
    });

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
