/**
 * Created by fengshao on 2016/7/28.
 */
var ImgFigure = React.createClass({

  /*
   * imgFigure 的点击处理函数
   */
  handleClick: function (index, e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse(index);
    } else {
      this.props.center(index);
    }

    e.stopPropagation();
    e.preventDefault();
  },

  render: function () {

    var styleObj = {};
    var _this = this;
    // 如果props属性中指定了这张图片的位置，则使用
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }

    // 如果图片的旋转角度有值并且不为0， 添加旋转角度
    if (this.props.arrange.rotate) {
      (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
        styleObj[value] = 'rotate(' + _this.props.arrange.rotate + 'deg)';
      });
    }

    // 如果是居中的图片， z-index设为11
    if (this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }

    var imgFigureClassName = 'img-figure';
    imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this,this.props.value)}>
        <img src={this.props.data.imageUrl}
             alt={this.props.data.title}
        />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick.bind(this,this.props.value)}>
            <p>
              {this.props.data.desc}
            </p>
          </div>
        </figcaption>
      </figure>
    );
  }
});

module.exports = ImgFigure;
