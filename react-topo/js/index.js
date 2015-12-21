require("../css/main.css");
var Topo = require("./component/react-topo");

var TopoData1 = require("../data/data1.json");
var TopoData2 = require("../data/data2.json");
var TopoData3 = require("../data/data3.json");

var React = require("react");
var ReactDOM = require("react-dom");


var App = React.createClass({
    onTopoSelect : function(obj) {
        alert(obj.name);
    },
    getInitialState : function() {
        return {
            topoData : TopoData1,
            expandAll : true
        };
    },
    drawTopo1 : function() {
        this.setState({
            topoData : TopoData1,
            expandAll : true
        });
    },
    drawTopo2 : function() {
        this.setState({
            topoData : TopoData2,
            expandAll : false
        });
    },
    drawTopo3 : function() {
        this.setState({
            topoData : TopoData3,
            expandAll : true
        });
    },
    render : function() {
        return (
            <div>
                <div>
                    <button onClick={this.drawTopo1}>绘制拓扑图1</button>
                    <button onClick={this.drawTopo2}>绘制拓扑图2</button>
                    <button onClick={this.drawTopo3}>绘制拓扑图3</button>
                </div>
                <Topo topoData={this.state.topoData} expandAll={this.state.expandAll} onSelect={this.onTopoSelect}/>
            </div>
        );
    }
});

ReactDOM.render(<App/> , document.getElementById('app'));