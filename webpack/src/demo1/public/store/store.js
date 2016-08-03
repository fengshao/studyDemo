/**
 * Created by fengs on 2016/6/24.
 */

var MyActions = require("../action/action");

function MyStore() {
  this.newImageDatasArr = [];
  this.imgsArrangeArr = [];
  this.Constant = {
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
  };
  this.bindActions(MyActions);
};

MyStore.prototype.handledata = function (data) {
  var newData = this.getImageUrl(data);
  this.newImageDatasArr = newData;
  this.getImgsArrangeArr(newData);
  this.rearrange({
    index: 0,
    constant: this.Constant
  });
};

/*
 * 翻转图片
 * @param index 传入当前被执行inverse操作的图片对应的图片信息数组的index值
 * @returns {Function} 这是一个闭包函数, 其内return一个真正待被执行的函数
 */
MyStore.prototype.inverse = function (index) {
  this.imgsArrangeArr[index].isInverse = !this.imgsArrangeArr[index].isInverse;
};

/*
 * 利用arrange函数， 居中对应index的图片
 * @param index, 需要被居中的图片对应的图片信息数组的index值
 * @returns {Function}
 */
MyStore.prototype.center = function (obj) {
  this.rearrange(obj);
};

/*
 * 重新布局所有图片
 * @param centerIndex 指定居中排布哪个图片
 */
MyStore.prototype.rearrange = function (obj) {
  var imgsArrangeArr = this.imgsArrangeArr,
    Constant = obj.constant,
    centerPos = Constant.centerPos,
    hPosRange = Constant.hPosRange,
    vPosRange = Constant.vPosRange,
    hPosRangeLeftSecX = hPosRange.leftSecX,
    hPosRangeRightSecX = hPosRange.rightSecX,
    hPosRangeY = hPosRange.y,
    vPosRangeTopY = vPosRange.topY,
    vPosRangeX = vPosRange.x,
    imgsArrangeTopArr = [],
    topImgNum = Math.floor(Math.random() * 2),    // 取一个或者不取
    topImgSpliceIndex = 0,
    _this = this,
    centerIndex = obj.index,

    imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

  // 首先居中 centerIndex 的图片, 居中的 centerIndex 的图片不需要旋转
  imgsArrangeCenterArr[0] = {
    pos: centerPos,
    rotate: 0,
    isCenter: true
  };

  // 取出要布局上侧的图片的状态信息
  topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
  imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

  // 布局位于上侧的图片
  imgsArrangeTopArr.forEach(function (value, index) {
    imgsArrangeTopArr[index] = {
      pos: {
        top: _this.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
        left: _this.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
      },
      rotate: _this.get30DegRandom(),
      isCenter: false
    };
  });

  // 布局左右两侧的图片
  for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
    var hPosRangeLORX = null;

    // 前半部分布局左边， 右半部分布局右边
    if (i < k) {
      hPosRangeLORX = hPosRangeLeftSecX;
    } else {
      hPosRangeLORX = hPosRangeRightSecX;
    }

    imgsArrangeArr[i] = {
      pos: {
        top: _this.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
        left: _this.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
      },
      rotate: _this.get30DegRandom(),
      isCenter: false
    };

  }

  if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
    imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
  }

  imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

  this.imgsArrangeArr = imgsArrangeArr;

};


MyStore.prototype.getImageUrl = function (imageDatasArr) {
  for (var i = 0, j = imageDatasArr.length; i < j; i++) {
    var singleImageData = imageDatasArr[i];
    singleImageData.imageUrl = require("../../../../images/" + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }

  return imageDatasArr;
};


MyStore.prototype.getImgsArrangeArr = function (newImageDatasArr) {
  var _this = this;
  newImageDatasArr.forEach(function (value, index) {
    if (!_this.imgsArrangeArr[index]) {
      _this.imgsArrangeArr[index] = {
        pos: {
          left: 0,
          top: 0
        },
        rotate: 0,
        isInverse: false,
        isCenter: false
      };
    }
  });
}

/*
 * 获取区间内的一个随机值
 */
MyStore.prototype.getRangeRandom = function (low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

/*
 * 获取 0~30° 之间的一个任意正负值
 */
MyStore.prototype.get30DegRandom = function () {
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}


module.exports = alt.createStore(MyStore, 'MyStore');
