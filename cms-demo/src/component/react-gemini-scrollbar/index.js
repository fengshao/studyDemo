'use strict';

var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };

function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
    }
    return target;
}

require('./jquery.mousewheel.js');
require("./gemini-scrollbar.scss");
var React = require('react');
var ReactDOM = require('react-dom');
var GeminiScrollbar = require('./gemini-scrollbar');

var ReactScrollBar = React.createClass({
    displayName: 'GeminiScrollbar',

    propTypes: {
        autoshow: React.PropTypes.bool,
        forceGemini: React.PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
        return {
            autoshow: false,
            forceGemini: false,
            enabled : true
        };
    },

    /**
     * Holds the reference to the GeminiScrollbar instance.
     * @property scrollbar <public> [Object]
     */
    scrollbar: null,

    initScrollbar : function() {
        this.scrollbar = new GeminiScrollbar({
            element: ReactDOM.findDOMNode(this),
            autoshow: this.props.autoshow,
            forceGemini: this.props.forceGemini,
            createElements: false
        }).create();
    },

    componentDidMount: function componentDidMount() {
        if(this.props.enabled) {
            this.initScrollbar();
        }
    },

    componentDidUpdate: function componentDidUpdate() {
        if(this.props.enabled) {
            if(!this.scrollbar) {
                this.initScrollbar();
            } else {
                this.scrollbar.update();
            }
        } else {
            if(this.scrollbar) {
                this.scrollbar.destroy();
                this.scrollbar = null;
            }
        }
    },

    componentWillUnmount: function componentWillUnmount() {
        if(this.scrollbar) {
            this.scrollbar.destroy();
            this.scrollbar = null;
        }
    },

    render: function render() {
        var _props = this.props;
        var className = _props.className;
        var children = _props.children;
        var other = _objectWithoutProperties(_props, ['className', 'children']);
        var classes = '';

        if (className) {
            classes += ' ' + className;
        }

        return React.createElement(
            'div',
            _extends({}, other, {className: classes}),
            React.createElement(
                'div',
                {className: 'gm-scrollbar -vertical'},
                React.createElement('div', {className: 'thumb'})
            ),
            React.createElement(
                'div',
                {className: 'gm-scrollbar -horizontal'},
                React.createElement('div', {className: 'thumb'})
            ),
            React.createElement(
                'div',
                {className: 'gm-scroll-view', ref: 'scroll-view'},
                children
            )
        );
    }
});

ReactScrollBar.scrollTo = function(dom , px) {
    var $scrollbar = $(dom).find(".gm-scroll-view");
    if($scrollbar[0]) {
        $scrollbar[0].scrollTop  = px;
    }
};

module.exports = ReactScrollBar;
