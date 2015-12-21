title: SASS文档整理与less的对比
speaker: 肖金峰
transition: move
files: /js/demo.js,/css/demo.css,/js/zoom.js
theme: moon
usemathjax: no

[slide]

# sass文档整理与less的对比
<small>演讲者：肖金峰</small>
<small>部门：应用部</small>

[slide]

# CSS 预处理器是什么？ {:&.flexbox.vleft}
*	一般来说，它们基于 CSS 扩展了一套属于自己的 DSL，来解决我们书写 CSS 时难以解决的问题：
		语法不够强大，比如无法嵌套书写导致模块化开发中需要书写很多重复的选择器；
        没有变量和合理的样式复用机制，使得逻辑上相关的属性值必须以字面量的形式重复输出，导致难以维护。
*	所以这就决定了 CSS 预处理器的主要目标：
        提供 CSS 缺失的样式层复用机制、减少冗余代码，提高样式代码的可维护性。
*	CSS 预处理器是一种语言用来为 CSS 增加一些编程的的特性，
		无需考虑浏览器的兼容性问题，例如你可以在 CSS 中使用变量、简单的程序逻辑、函数等等在编程语言中的一些基本技巧，
		可以让 CSS 更见简洁，适应性更强，代码更直观等诸多好处。

[slide]
## 介绍
----
* SASS: 2007年诞生，最早也是最成熟的CSS预处理器，拥有ruby社区的支持和compass这一最强大的css框架，目前受LESS影响，已经进化到了全面兼容CSS的SCSS。
* LESS: 2009年出现，受SASS的影响较大，但又使用CSS的语法，让大部分开发者和设计师更容易上手，在ruby社区之外支持者远超过SASS，其缺点是比起SASS来，可编程功能不够，不过优点是简单和兼容CSS，反过来也影响了SASS演变到了SCSS的时代，著名的Twitter Bootstrap就是采用LESS做底层语言的。

[slide]
## 安装

<img src="/images/ruby.png"/>
<img src="/images/ruby-cmd.png"/>
<img src="/images/ruby-cmd-install.png"/>


[slide]

# sass特色 {:&.flexbox.vleft}
* 完全兼容 CSS3;
* 在 CSS 语言基础上添加了扩展功能，比如变量、嵌套 (nesting)、混合 (mixin)
* 对颜色和其它值进行操作的函数
* 函数库控制指令之类的高级功能
* 良好的格式，可对输出格式进行定制
* 支持 Firebug

[slide]
## 变量
----
*  Sass 的变量必须是 $ 开始，而 Less 的变量名使用 @ 符号开始，然后变量名和值使用冒号隔开；

<img src="/images/sassTest/sassTestVariable.png"/>
<img src="/images/lessTest/lessTestVariable.png"/>



[slide]
## 嵌套
----
sass和less都支持嵌套（选择器的嵌套，属性的嵌套）

<img src="/images/nesting.png"/>

[slide]
## Mixins混合
----
*  mixin 有点像是函数或者是宏，当你某段 CSS 经常需要在多个元素中使用时，你可以为这些共用的 CSS 定义一个 Mixin，然后你只需要在需要引用这些 CSS 地方调用该 Mixin 即可。
<img src="/images/sassTest/sassMixinTest.png"/>
<img src="/images/lessTest/lessMixinTest.png"/>

[slide]
## 继承
----
*  当我们需要为多个元素定义相同样式的时候，我们可以考虑使用继承的做法。
* <img src="/images/sassTest/sassExtendTest.png"/>
	<img src="/images/lessTest/lessExtendTest.png"/>

[slide]
## 导入 (Import)
----
*   sass less 都可以用 Import 导入其他样式文件。
	需要注意的是 导入文件中定义的混入、变量等信息也将会被引入到主样式文件中，因此需要避免它们互相冲突。

[slide]

## 颜色函数
----
*   sass 和 less 内置了一些颜色处理函数用来对颜色值进行处理，例如加亮、变暗、颜色梯度等。
	<img src="/images/colorFunction.png"/>
*   Sass：http://sass-lang.com/documentation/Sass/Script/Functions.html
*   less：http://lesscss.org/#-color-functions

[slide]
## 运算符
----
*   sass 和 less 可以进行一些数据的计算。
[slide]

## CSS预处理器的高级应用
----
* 条件语句
	* <img src="/images/ifTest.png"/>

[slide]

## CSS预处理器的高级应用
----
* sass循环语句
	* <img src="/images/sassTest/sassLoopTest.png"/>

[slide]

## CSS预处理器的高级应用
----
* less循环语句
	* <img src="/images/lessTest/lessLoopTest.png"/>

[slide]

## 自定义函数
----
<img src="/images/functionTest.png"/>

[slide]
## 总结：
* sass和less都是开源项目；
* Sass诞生是最早也是最成熟的CSS预处理器，有Ruby社区和Compass支持；LESS出现于2009年，支持者远超于Ruby社区；
* Sass和LESS语法较为严谨、严密，其中LESS学习起来更快一些，因为他更像CSS的标准；
* Sass和LESS相互影响较大，其中Sass受LESS影响，已经进化到了全面兼容CSS的SCSS；
* Sass和LESS都有第三方工具提供转译，特别是Sass和Compass是绝配；
* Sass、LESS都具有变量、作用域、混合、嵌套、继承、运算符、颜色函数、导入和注释等基本特性，而且以“变量”、“混合”、“嵌套”、“继承”和“颜色函数”称为五大基本特性，各自特性实现功能基本相似，只是使用规则上有所不同；
* Sass具有类似于语言处理的能力，比如说条件语句、循环语句等，而LESS需要通过When等关键词模拟这些功能，在这一方面略逊一层；

[slide]
#Question?
----





