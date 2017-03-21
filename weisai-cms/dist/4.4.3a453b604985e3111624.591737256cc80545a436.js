webpackJsonp([4],{17:function(t,e,i){var a,n;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
!function(){"use strict";function i(){for(var t=[],e=0;e<arguments.length;e++){var a=arguments[e];if(a){var n=typeof a;if("string"===n||"number"===n)t.push(a);else if(Array.isArray(a))t.push(i.apply(null,a));else if("object"===n)for(var o in a)s.call(a,o)&&a[o]&&t.push(o)}}return t.join(" ")}var s={}.hasOwnProperty;"undefined"!=typeof t&&t.exports?t.exports=i:(a=[],n=function(){return i}.apply(e,a),!(void 0!==n&&(t.exports=n)))}()},35:function(t,e,i){(function(e){try{(function(){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}var n=i(3),s=i(17),o=a(s),r=n.Input.Group,l=null,c=e.createClass({displayName:"SearchInput",getInitialState:function(){return{value:"",focus:!1}},handleInputChange:function(t){this.setState({value:t.target.value});var e=this;l?clearTimeout(l):"",l=setTimeout(function(){e.props.onSearch&&e.props.onSearch(e.state.value)},1e3)},handleFocusBlur:function(t){this.setState({focus:t.target===document.activeElement})},handleSearch:function(){this.props.onSearch&&this.props.onSearch(this.state.value)},render:function(){var t=this.props,i=t.style,a=t.size,s=t.placeholder,l=(0,o["default"])({"ant-search-btn":!0,"ant-search-btn-noempty":!!this.state.value.trim()}),c=(0,o["default"])({"ant-search-input":!0,"ant-search-input-focus":this.state.focus});return e.createElement("div",{className:"ant-search-input-wrapper",style:i},e.createElement(r,{className:c},e.createElement(n.Input,{placeholder:s,value:this.state.value,onChange:this.handleInputChange,onFocus:this.handleFocusBlur,onBlur:this.handleFocusBlur,onPressEnter:this.handleSearch}),e.createElement("div",{className:"ant-input-group-wrap"},e.createElement(n.Button,{icon:"search",className:l,size:a,onClick:this.handleSearch}))))}});t.exports=c}).call(this)}finally{}}).call(e,i(2))},36:function(t,e,i){(function(e){try{(function(){"use strict";function a(){return window.location.hash.split("?")[0].replace(/^\#\//,"")}function n(){var t=a(),e=/^([\w-]+)/i,i=t.match(e);return i&&i[1]||""}var s=(i(3),i(17)),o=i(44).Link,r=i(37),l=e.createClass({displayName:"TopNav",render:function(){return e.createElement("div",{className:"topNav"},this.props.children)}});l.MenuList=e.createClass({displayName:"MenuList",render:function(){var t=a(),i=n(),l=r[i]||[];return 0==t.indexOf("/")&&(t=subModule[0].routePath),e.createElement("ul",{className:"topnav-links"},l.map(function(i,a){var n="",r=s(n,{"topNav-menu-item-selected":t===i.routePath});return e.createElement("li",{className:r,key:a},i.typeID?e.createElement(o,{to:"/"+i.routePath,query:{type_id:i.typeID,type_name:i.typeName},activeClassName:"active",ref:"navLinks"},i.displayName):e.createElement(o,{to:"/"+i.routePath,activeClassName:"active",ref:"navLinks"},i.displayName))}))}}),t.exports=l}).call(this)}finally{}}).call(e,i(2))},37:function(t,e,i){try{(function(){"use strict";for(var e=JSON.parse(window.sessionStorage.getItem("leftMenus")),i=0,a="",n=0;n<e.length;n++)"designers_recommend"==e[n].route_path&&(i=e[n].type_id,a=e[n].type_name);var s={designers_recommend:[{routePath:"designers_recommend/designers_recommend_list",displayName:"IP列表",typeID:i,typeName:a},{routePath:"designers_recommend/designers_recommend_bgimg",displayName:"背景图片管理",typeID:i,typeName:a}],sharing_activities:[{routePath:"sharing_activities/commodity_classification",displayName:"商品分类管理",typeID:"",typeName:""},{routePath:"sharing_activities/commodity_management",displayName:"商品管理",typeID:"",typeName:""},{routePath:"sharing_activities/sharing_activities_management",displayName:"分享活动管理",typeID:"",typeName:""},{routePath:"sharing_activities/sharing_activities_log",displayName:"日志列表",typeID:"",typeName:""}]};t.exports=s}).call(this)}finally{}},182:function(t,e,i){try{(function(){"use strict";function e(){this.generateActions("getGoodsTypeList","addGoodsType","editGoodsType","delGoodsType","showEditFrom","showAddFrom","hideEditFrom","loadingFnc"),this.getGoodsTypeList=function(t){var e=this,i={current_page:t&&t.current_page?t.current_page:1,order:t&&t.order?t.order:"create_time",sort:t&&t.sort?t.sort.replace(/\Bend\b/g,""):"desc",pageSize:t&&t.per_page?t.per_page:10,content:t&&t.content?t.content:""};a.getGoodsTypeList(i).then(function(t){e.dispatch({data:t,filtersData:i})},function(t){e.dispatch(t)})},this.addGoodsType=function(t){var e=this;a.addGoodsType(t).then(function(t){e.actions.getGoodsTypeList()},function(t){e.dispatch(t)})},this.editGoodsType=function(t){var e=this;a.editGoodsType(t).then(function(t){e.actions.getGoodsTypeList()},function(t){e.dispatch(t)})},this.delGoodsType=function(t){var e=this,i={id:t.id};a.delGoodsType(i).then(function(t){e.dispatch({id:i.id,data:t})},function(t){e.dispatch(t)})}}var a=i(8);t.exports=alt.createActions(e)}).call(this)}finally{}},340:function(t,e,i){(function(e){try{(function(){"use strict";var a=i(36),n=i(182),s=i(341),o=i(343),r=i(342),l=e.createClass({displayName:"CommodityClassificationList",getInitialState:function(){var t=s.getState();return t},onChange:function(){var t=s.getState();this.setState(t)},componentDidMount:function(){s.listen(this.onChange),n.getGoodsTypeList()},componentWillUnmount:function(){s.unlisten(this.onChange),alt.flush()},events:{delGoodsType:function(t){n.delGoodsType(t)},showEditFrom:function(t){n.showEditFrom(t)},showAddFrom:function(){n.showAddFrom()},addGoodsType:function(t){n.addGoodsType(t)},editGoodsType:function(t){n.editGoodsType(t)},hideEditFrom:function(){n.hideEditFrom()},loadingFnc:function(){n.loadingFnc()},getGoodsTypeList:function(t){n.getGoodsTypeList(t)}},render:function(){return e.createElement("div",null,e.createElement(a,null,e.createElement(a.MenuList,null)),e.createElement("div",{className:"right-content-bottom"},this.state.isShowEditFrom||this.state.isShowAddFrom?e.createElement(o,{hideEditFrom:this.events.hideEditFrom,addGoodsType:this.events.addGoodsType,editGoodsType:this.events.editGoodsType,allData:this.state.commodityClassificationList,editRowData:this.state.editRowData}):e.createElement(r,{tableData:this.state.commodityClassificationList,titleData:"",delGoodsType:this.events.delGoodsType,filtersData:this.state.filtersData,pagination:this.state.pagination,showEditFrom:this.events.showEditFrom,showAddFrom:this.events.showAddFrom,loadingFnc:this.events.loadingFnc,getGoodsTypeList:this.events.getGoodsTypeList})))}});t.exports=l}).call(this)}finally{}}).call(e,i(2))},341:function(t,e,i){(function(e){try{(function(){"use strict";function a(){this.isShowEditFrom=!1,this.isShowAddFrom=!1,this.loading=!1,this.editRowData={id:"",title:"",pic:"",pic_select:"",spm:"",create_time:"",update_time:"",is_sale:"",wechat_url:"",qq_url:"",status:""},this.pagination={total:0,showTotal:function(t){return"共 "+t+" 条"},defaultCurrent:1,per_page:10,current_page:1,showQuickJumper:!0,showSizeChanger:!0},this.filtersData={sort:"desc",order:"create_time",current_page:1,per_page:10,content:""},this.total=0,this.commodityClassificationList=[],this.bindActions(n)}var n=i(182);a.prototype.getGoodsTypeList=function(t){var i=t.data;this.total=i.total,this.pagination={total:i.total,showTotal:function(t){return"共 "+t+" 条"},defaultCurrent:1,per_page:i.per_page,current_page:i.current_page,showQuickJumper:!0,showSizeChanger:!0},this.isShowEditFrom=!1,this.isShowAddFrom=!1,this.loading=!1,this.commodityClassificationList=i.data?i.data:[],this.filtersData=e.extend(this.filtersData,t.filtersData)},a.prototype.delGoodsType=function(t){if(0==t.data.error)for(var i=t.id,a=0;a<this.commodityClassificationList.length;a++)i==this.commodityClassificationList[a].id&&this.commodityClassificationList.splice(a,1);this.total=this.total-1;var n={total:this.total,showTotal:function(t){return"共 "+t+" 条"},defaultCurrent:1,per_page:10,current_page:1,showQuickJumper:!0,showSizeChanger:!0};this.filtersData=e.extend(this.pagination,n)},a.prototype.showEditFrom=function(t){this.editRowData=t,this.isShowEditFrom=!0},a.prototype.showAddFrom=function(){this.editRowData={id:"",title:"",pic:"",pic_select:"",spm:"",create_time:"",update_time:"",is_sale:"",wechat_url:"",qq_url:"",status:""},this.isShowAddFrom=!0},a.prototype.hideEditFrom=function(){this.editRowData={id:"",title:"",pic:"",pic_select:"",spm:"",create_time:"",update_time:"",is_sale:"",wechat_url:"",qq_url:"",status:""},this.isShowEditFrom=!1,this.isShowAddFrom=!1},a.prototype.loadingFnc=function(){this.loading=!0},t.exports=alt.createStore(a,"CommodityClassificationStore")}).call(this)}finally{}}).call(e,i(20))},342:function(t,e,i){(function(e,a,n){try{(function(){"use strict";var s=i(3),o=i(35),r=e.createClass({displayName:"TableComponent",getInitialState:function(){return{tableHeight:a(window).height()-56-30-130-80-60,pagination:this.props.pagination}},componentWillReceiveProps:function(t){this.setState(this.getInitialState()),this.setState({pagination:t.pagination})},resizeWindow:function(){var t=a(window).height()-56-30-130-80-60-60;this.setState({tableHeight:t})},componentWillUnmount:function(){a("body").css("overflow","auto"),a(window).off("resize",this.resizeWindow)},confirm:function(t){this.props.delGoodsType(t)},getMyDate:function(t){var e=new Date(1e3*t),i=e.getFullYear(),a=e.getMonth()+1,n=e.getDate(),s=e.getHours(),o=e.getMinutes(),r=e.getSeconds(),l=i+"-"+this.getzf(a)+"-"+this.getzf(n)+" "+this.getzf(s)+":"+this.getzf(o)+":"+this.getzf(r);return l},getzf:function(t){return parseInt(t)<10&&(t="0"+t),t},getTableColumns:function(){var t=this,i=[{title:"ID",dataIndex:"id",width:"8%",key:"id_key",sorter:function(t,e){return t.id-e.id}},{title:"专题名称",dataIndex:"title",width:"20%",key:"title_key"},{title:"专题封面",dataIndex:"pic",width:"22%",key:"pic_key",render:function(t){return e.createElement("img",{className:"td-img",src:t})}},{title:"创建时间",dataIndex:"create_time",width:"19%",key:"create_time_key",sorter:!0,render:function(e){return t.getMyDate(e)}},{title:"更新时间",dataIndex:"update_time",width:"19%",key:"update_time_key",sorter:!0},{title:"操作",width:"12%",render:function(i,a,n){var o="确定要删除吗？";return e.createElement("div",{className:"operate-div"},e.createElement(s.Button,{className:"operate-btn",type:"primary",onClick:t.props.showEditFrom.bind(t,a)},"修改"),e.createElement(s.Popconfirm,{placement:"topRight",title:o,onConfirm:t.confirm.bind(t,a)},e.createElement(s.Button,null,"删除")))}}];return i},onSearch:function(t){this.props.loadingFnc();var e=this.state.pagination;e.current=1;var i={current_page:1,content:t},a=n.extend(this.props.filtersData,i);this.props.getGoodsTypeList(a),this.setState({pagination:e})},handleTableChange:function(t,e,i){this.props.loadingFnc();var a=this.props.pagination,n=this.props.filtersData.content;a.current=t.current,a.pageSize=t.pageSize;var s={order:i.field,sort:i.order,current_page:t.current,per_page:t.pageSize,content:n};this.props.getGoodsTypeList(s)},componentDidMount:function(){a("body").css("overflow","hidden"),a(window).on("resize",this.resizeWindow)},titleElement:function(){return e.createElement("div",null,e.createElement("span",null,this.props.titleData),e.createElement(s.Button,{type:"primary",onClick:this.props.showAddFrom},"添加商品分类"),e.createElement(o,{placeholder:"根据商品分类名称查询",onSearch:this.onSearch,style:{width:300}}))},render:function(){var t=this.getTableColumns(),i=this.state.pagination,a=this.props.tableData,n=this.state.tableHeight,o=this.titleElement();return e.createElement(s.Table,{title:function(){return o},bordered:!0,columns:t,dataSource:a,pagination:i,scroll:{y:n},onChange:this.handleTableChange,loading:this.props.loading})}});t.exports=r}).call(this)}finally{}}).call(e,i(2),i(4),i(20))},343:function(t,e,i){(function(e,a){try{(function(){"use strict";var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},s=i(3),o=s.Form.Item,r=i(8),l=e.createClass({displayName:"EditForm",getInitialState:function(){return{imgSrc:this.props.editRowData.pic,imgSelectSrc:this.props.editRowData.pic_select}},componentWillUnmount:function(){a("body").css("overflow","hidden")},componentDidMount:function(){a("body").css("overflow","auto")},confirm:function(t){this.props.deleteSpecialFnc(t)},checkSpecialUrl:function(t,e,i){e||i(),/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(e)?i():i([new Error("抱歉，请输入有效的网址。")])},checkSpecialName:function(t,e,i){for(var a=!1,n=0;n<this.props.allData.length;n++)if(e==this.props.allData[n].title&&this.props.editRowData.id!=this.props.allData[n].id){a=!0;break}a?i([new Error("抱歉，该专题名称已被占用。")]):i()},checkImgType:function(t,e,i){if(!e&&this.state.imgSrc)return void i();if(!e)return void i([new Error("抱歉，请选择png，jpg，jpeg，gif格式的图片上传。")]);var a=e.substr(e.lastIndexOf(".")).toLowerCase();".jpg"!=a&&".png"!=a&&".jpeg"!=a&&".gif"!=a?i([new Error("抱歉，请选择png，jpg，jpeg，gif格式的图片上传。")]):i()},saveSpecial:function(){var t=this,e=this;return this.state.imgSrc||this.props.editRowData.img_wechat?this.state.imgSelectSrc||this.props.editRowData.pic_select?void this.props.form.validateFields(function(i,n){n.pic=t.state.imgSrc,n.pic_select=t.state.imgSelectSrc;var s=!1;a.each(n,function(t,i){i!=e.props.editRowData[t]&&(s=!0)}),!i&&s&&(e.props.editRowData.id?(n.id=e.props.editRowData.id,e.props.editGoodsType(n)):e.props.addGoodsType(n))}):void s.message.warning("请上传选中商品分类图片"):void s.message.warning("请上传商品分类图片")},uploadImage:function(){var t=this,e=new FormData(a("#fileForm")[0]);a.ajax({method:"post",url:r.publicParms.url,data:e,dataType:"JSON",cache:!1,processData:!1,contentType:!1,success:function(e){if(e&&e.result){var i=e.result,a=r.publicParms.httpStr+i.savepath+"/"+i.savename;t.setState({imgSrc:a})}},error:function(t){s.message.error("上传失败")}})},uploadSelectImage:function(){var t=this,e=new FormData(a("#fileSelectForm")[0]);a.ajax({method:"post",url:r.publicParms.url,data:e,dataType:"JSON",cache:!1,processData:!1,contentType:!1,success:function(e){if(e&&e.result){var i=e.result,a=r.publicParms.httpStr+i.savepath+"/"+i.savename;t.setState({imgSelectSrc:a})}},error:function(t){s.message.error("上传失败")}})},render:function(){var t=this.props.form,i=t.getFieldProps,a=t.getFieldError,r=t.isFieldValidating,l=i("title",{rules:[{required:!0,max:20,message:"专题名称最多为 20 个字符"},{validator:this.checkSpecialName}],initialValue:this.props.editRowData.title?this.props.editRowData.title:""}),c=i("spm",{initialValue:this.props.editRowData.spm?this.props.editRowData.spm.toString():this.props.editRowData.spm}),p=i("pic",{validate:[{rules:[{validator:this.checkImgType}],trigger:["onChange"]}]}),d=i("pic_select",{validate:[{rules:[{validator:this.checkImgType}],trigger:["onChange"]}]}),h=i("wechat_url",{rules:[{validator:this.checkSpecialUrl}],initialValue:this.props.editRowData.wechat_url?this.props.editRowData.wechat_url:""}),u=i("qq_url",{rules:[{validator:this.checkSpecialUrl}],initialValue:this.props.editRowData.qq_url?this.props.editRowData.qq_url:""}),m={labelCol:{span:7},wrapperCol:{span:12}};return e.createElement("div",null,e.createElement(s.Form,{horizontal:!0,className:"editform",id:"fileForm"},e.createElement(o,n({label:"商品分类图片",hasFeedback:!0},m,{help:r("pic")?"校验中...":(a("pic")||[]).join(", ")}),e.createElement(s.Input,n({},p,{type:"file",id:"file",name:"file",className:"upload-img",accept:"image/png, image/jpg, image/jpeg, image/gif",style:{width:"70%",marginRight:8}})),e.createElement(s.Button,{onClick:this.uploadImage,className:"upload-btn"},"上传"))),e.createElement(s.Form,{horizontal:!0,className:"editform",id:"fileSelectForm"},e.createElement(o,n({label:"选中商品分类图片",hasFeedback:!0},m,{help:r("pic_select")?"校验中...":(a("pic_select")||[]).join(", ")}),e.createElement(s.Input,n({},d,{type:"file",id:"file",name:"file",className:"upload-img",accept:"image/png, image/jpg, image/jpeg, image/gif",style:{width:"70%",marginRight:8}})),e.createElement(s.Button,{onClick:this.uploadSelectImage,className:"upload-btn"},"上传"))),e.createElement(s.Form,{horizontal:!0,className:"editform"},e.createElement(o,n({},m,{label:"图片预览",hasFeedback:!0}),e.createElement("img",{src:this.state.imgSrc?this.state.imgSrc:this.props.editRowData.pic,className:"preview-img"})),e.createElement(o,n({},m,{label:"选中图片预览",hasFeedback:!0}),e.createElement("img",{src:this.state.imgSelectSrc?this.state.imgSelectSrc:this.props.editRowData.pic_select,className:"preview-img"})),e.createElement(o,n({},m,{label:"商品分类名称",hasFeedback:!0,help:r("title")?"校验中...":(a("title")||[]).join(", ")}),e.createElement(s.Input,n({},l,{placeholder:"请输入专题名称"}))),e.createElement(o,n({},m,{label:"手Q链接",hasFeedback:!0,help:r("qq_url")?"校验中...":(a("qq_url")||[]).join(", ")}),e.createElement(s.Input,n({},u,{placeholder:"请输入手Q链接"}))),e.createElement(o,n({},m,{label:"微信链接",hasFeedback:!0,help:r("wechat_url")?"校验中...":(a("wechat_url")||[]).join(", ")}),e.createElement(s.Input,n({},h,{placeholder:"请输入微信链接"}))),e.createElement(o,n({},m,{label:"SPM值",hasFeedback:!0,help:r("spm")?"校验中...":(a("spm")||[]).join(", ")}),e.createElement(s.Input,n({placeholder:"请输入SPM值"},c))),e.createElement(o,{wrapperCol:{span:12,offset:7}},e.createElement(s.Button,{type:"primary",onClick:this.saveSpecial},"确定"),"   ",e.createElement(s.Button,{type:"ghost",onClick:this.props.hideEditFrom},"返回"))))}});l=s.Form.create()(l),t.exports=l}).call(this)}finally{}}).call(e,i(2),i(4))}});
//# sourceMappingURL=4.4.3a453b604985e3111624.591737256cc80545a436.js.map