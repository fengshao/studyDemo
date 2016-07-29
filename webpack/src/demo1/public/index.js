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

  Constant: {
    centerPos: {
      left: 0,
      right: 0
    },
    hPosRange: {   // 水平方向的取值范围
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    vPosRange: {    // 垂直方向的取值范围
      x: [0, 0],
      topY: [0, 0]
    }
  },

  getInitialState: function () {
    return MyStore.getState();
  },

  componentDidMount: function () {
    MyStore.listen(this.onChange);
    MyAction.handledata();
  },

  componentWillMount: function () {
    MyStore.unlisten(this.onChange);

  },

  onChange: function () {
    this.setState(MyStore.getState());
  },

  // 组件加载以后， 为每张图片计算其位置的范围
  componentDidMount: function () {

    // 首先拿到舞台的大小
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    debugger
    // 拿到一个imageFigure的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    // 计算中心图片的位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    // 计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    // 计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    MyAction.rearrange(0, this.Constant);

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
      MyAction.center(index, this.Constant);
    }


  },

  render: function () {
    debugger
    var _this = this;
    var newImageDatasArr = this.state.newImageDatasArr;
    var imgsArrangeArr = this.state.imgsArrangeArr;
    var controllerUnits = [],
      imgFigures = [];

    newImageDatasArr.forEach(function (value, index) {

      if (!imgsArrangeArr[index]) {
        imgsArrangeArr[index] = {
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
                                 arrange={imgsArrangeArr[index]}
                                 inverse={this.events.inverse}
                                 center={this.events.center}
      />);

      controllerUnits.push(<ControllerUnit key={index} arrange={imgsArrangeArr[index]}
                                           inverse={this.events.inverse} center={this.events.center}
      />);
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
