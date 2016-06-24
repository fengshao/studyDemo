/**
 * Created by fengs on 2016/6/24.
 */
var alt = require("../alt");
var MyActions = require("../action/action");

var MyStore = alt.createStore({
    bindListeners: {
        Handledata: MyActions.GetData,
        HandleDetail: MyActions.GetDetail
    },

    Handledata: function (data) {
        this.setState({datas: data});
    },
    HandleDetail: function (data) {
        this.setState({data: data});
    }
}, 'MyStore');

module.exports = MyStore;