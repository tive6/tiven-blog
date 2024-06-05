---
title: Javascript不得不说的基础知识
abbrlink: 5f317c1c
date: 2021-10-31 21:05:22
tags:
- JS
categories:
- JavaScript
---

`JavaScript (JS)` 是一种**高级编程语言**，为通常用于`客户端（client-side）`的网页动态脚本。因为灵活多变，所以基础很关键。本篇就来讲讲`JavaScript`中的基础知识点。

![Javascript](https://tiven.cn/static/img/img-js-04-dPIVRzlwMdj1V8eRB3tje.jpg)

<!-- more -->

### 1、ES6/ES7

#### 1-1、解构赋值

> `ES6`允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

以前，为变量赋值，只能直接指定值。

```js
let a = 1;
let b = 2;
let c = 3;
```

ES6 允许写成下面这样。

```js
let [a, b, c] = [1, 2, 3];
```

赋值的代码大大减少了，不需要分别把变量a，b，c分别声明定义和赋值，只需要将变量a，b，c作为一个数组的元素，然后将数组\[1,2,3\]赋值给数组\[a,b,c\]即可，变量a，b，c即可分别得到对应的值。

1、结构赋值可以嵌套的

```js
let [ a,b,[ c1,c2 ] ] = [ 1,2,[ 3.1,3.2 ] ];
console.log(c1);// c1的值为3.1
console.log(c2);// c2的值为3.2
```

2、不完全解构

```js
let [a, b, c] = [1, 2];
console.log(a);// a的值为1
console.log(b);// b的值为2

```

3.解构不成功，变量的值就等于`undefined`。

```js
let [a,b,c] = [1,2];
console.log(a);// a的值为1
console.log(b);// b的值为2
console.log(c);// 结果：c的值为undefined
```

4.解构赋值允许指定默认值

```js
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

`注意`，ES6 内部使用严格相等运算符`（===）`，判断一个位置是否有值。所以，只有当一个数组成员严格等于`undefined`，默认值才会生效。

**对象的解构赋值**

```js
var { a,b,c } = {"a":1,"c":3,"b":2};
    console.log(a);//结果：a的值为1
    console.log(b);//结果：b的值为2
    console.log(c);//结果：c的值为3
```

**字符串的解构赋值**

```js
var [a,b,c,d,e,f] = "我是一只小鸟";
    console.log(a);//我
    console.log(b);//是
    console.log(c);//一
    console.log(d);//只
    console.log(e);//小
    console.log(f);//鸟
```

**解构赋值的用途**

一、交换变量的值

```js
    var x = 1;
    var y = 2;
    [x,y] = [y,x];
```

二、提取函数返回的多个值

```js
function demo(){
    return {"name": "张三","age": 21}
}
var {name,age} = demo();
console.log(name);// 结果：张三
console.log(age);// 结果：21
```

三、定义函数参数

```js
function demo({a,b,c}){
    console.log("姓名："+ a);
    console.log("身高："+ b);
    console.log("体重："+ c);
}
demo({a:"唐三",b:"1.72m",c:"50kg",d:"8000"});
/* 通过这种写法， 很方便就能提取JSON对象中想要的参数，
例如案例中，我们只需要获取实参中的：a，b，c，
而不需要关其他的参数，比如：d或者其他更多的参数。*/
```

四、提取 JSON 数据

```js
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

五、输入模块的指定方法

> 加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

```js
const { SourceMapConsumer, SourceNode } = require("source-map");

```

#### 1-2、Module 的语法

历史上，JavaScript 一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。其他语言都有这项功能，比如 Ruby 的require、Python 的import，甚至就连 CSS 都有\@import，但是 JavaScript 任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。

```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（\_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

> `导出Export`：作为一个模块，它可以选择性地给其他模块暴露（提供）自己的属性和方法，供其他模块使用。

> `导入Import`：作为一个模块，可以根据需要，引入其他模块的提供的属性或者方法，供自己模块使用。

**模块化实现**

```js
//---module-B.js文件---

//导出变量：name
export var name = "模块化"; 
```

> 模块B我们使用关键字`export`关键字，对外暴露了一个属性：`name`的值为：字符串 `“模块化”`。一个关键字，一句代码就实现了，是不是很简单。

```js
//---module-A.js文件---

//导入 模块B的属性 name
import { name } from "./module-B.js";
console.log(name)
//打印结果：模块化
```

模块A我们使用关键字`import`导入了模块B的`name`属性，并且赋值给变量`name`。关键字`from`的作用是指定你想要引入的模块，我们这里指定的是`module-B.js`文件，也就是上面的`模块B`。打印结果：“模块化”正是`模块B`的对外暴露的属性。

#### 1-3、箭头函数

**箭头函数中的this指向的是定义时的this，而不是执行时的this。**

```js
//定义一个对象
var obj = {
    x:100,//属性x
    show(){
        //延迟500毫秒，输出x的值
        setTimeout(
        //不同处：箭头函数
        () => { console.log(this.x)},
        500
        );
    }
};
obj.show();//打印结果：100
```

> 当定义obj的show\( \)方法的时候，我们在箭头函数编写`this.x`，此时的`this`是指的`obj`，所以`this.x`指的是`obj.x`。而在`show()`被调用的时候，this依然指向的是被定义时候所指向的对象，也就是obj对象，故打印出：100。

#### 1-4、Promise 对象

`Promise` 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了`Promise`对象。

ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。

Promise对象有三种状态：

- `pending`：刚刚创建一个Promise实例的时候，表示初始状态；
- `fulfilled`：resolve方法调用的时候，表示操作成功；
- `rejected`：reject方法调用的时候，表示操作失败；

> 状态只能从 初始化 \-> 成功 或者 初始化 \-> 失败，不能逆向转换，也不能在成功fulfilled 和失败rejected之间转换。

```js
const pro = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

了解了Promise的创建和状态，我们来学习一个最重要的实例方法：`then( )`方法。

```js
pro.then(function (res) {
    //操作成功的处理程序
},function (error) {
    //操作失败的处理程序
});
// 参数是两个函数，第一个用于处理操作成功后的业务，第二个用于处理操作异常后的业务。

```

**catch( )方法**

```js
pro.catch(function (error) {
    //操作失败的处理程序
});

```

之所以能够使用链式调用，是因为then方法和catch方法调用后，都会返回`promise`对象。

如果你之前一点都没接触过Promise的话，现在一定很懵逼，没关系，下面我们用一个案例来串联前面的知识点，演示一下，认真阅读注释：

```js
//用new关键字创建一个Promise实例
    let pro = new Promise(function(resolve,reject){
        //假设condition的值为true
        let condition = true;

        if(condition){
            //调用操作成功方法
            resolve('操作成功');
            //状态：pending->fulfilled
        }else{
            //调用操作异常方法
            reject('操作异常');
            //状态：pending->rejected
        }
    });

    //用then处理操作成功，catch处理操作异常
    pro.then(function (res) {

        //操作成功的处理程序
        console.log(res)

    }).catch(function (error) {

        //操作失败的处理程序
        console.log(error)

    });
    //控制台输出：操作成功
```

上面案例的注释十分详细，串联起了上面介绍的所有知识点：创建实例，状态转换，then方法和catch方法的使用。

由于我们设置了变量condition的值为true，所以执行后控制台输出的结果是：“操作成功”。

上面就是Promise用于处理操作异常的这个过程；但是，正如文章开头讲到的，如果多个操作之间层层依赖，我们用Promise又是怎么处理的呢？

```js
    let pro = new Promise(function(resolve,reject){

        if(true){
            //调用操作成功方法
            resolve('操作成功');
        }else{
            //调用操作异常方法
            reject('操作异常');
        }
    });

    //用then处理操作成功，catch处理操作异常
    pro.then(requestA)
        .then(requestB)
        .then(requestC)
        .catch(requestError);

    function requestA(){
        console.log('请求A成功');
        return '请求B，下一个就是你了';
    }
    function requestB(res){
        console.log('上一步的结果：'+res);
        console.log('请求B成功');
        return '请求C，下一个就是你了';
    }
    function requestC(res){
        console.log('上一步的结果：'+res);
        console.log('请求C成功');
    }
    function requestError(){
        console.log('请求失败');
    }

    //打印结果：
    //请求A成功
    //上一步的结果：请求B，下一个就是你了
    //请求B成功
    //上一步的结果：请求C，下一个就是你了
    //请求C成功
```

案例中，先是创建一个实例，还声明了4个函数，其中三个是分别代表着请求A，请求B，请求C；有了`then`方法，三个请求操作再也不用层层嵌套了。我们使用`then`方法，按照调用顺序，很直观地完成了三个操作的绑定，并且，如果请求B依赖于请求A的结果，那么，可以在请求A的程序用使用`return`语句把需要的数据作为参数，传递给下一个请求，案例中我们就是使用`return`实现传递参数给下一步操作的。

**Promise.all\( \)方法**

`Promise.all( )`方法：接受一个数组作为参数，数组的元素是`Promise`实例对象，当参数中的实例对象的状态都为`fulfilled`时，`Promise.all( )`才会有返回。

```js
//创建实例pro1
    let pro1 = new Promise(function(resolve){
        setTimeout(function () {
            resolve('实例1操作成功');
        },5000);
    });
    
    //创建实例pro2
    let pro2 = new Promise(function(resolve){
        setTimeout(function () {
            resolve('实例2操作成功');
        },1000);
    });

    
    Promise.all([pro1,pro2]).then(function(result){
        console.log(result);
    });
    //打印结果：["实例1操作成功", "实例2操作成功"]
```

**Promise.race\( \)方法**

另一个类似的方法是`Promise.race()`方法：它的参数要求跟`Promise.all( )`方法一样，不同的是，它参数中的promise实例，只要有一个状态发生变化（不管是成功`fulfilled`还是异常`rejected`），它就会有返回，其他实例中再发生变化，它也不管了。

```js
//初始化实例pro1
    let pro1 = new Promise(function(resolve){
        setTimeout(function () {
            resolve('实例1操作成功');
        },4000);
    });

    //初始化实例pro2
    let pro2 = new Promise(function(resolve,reject){
        setTimeout(function () {
            reject('实例2操作失败');
        },2000);
    });

    Promise.race([pro2,pro1]).then(function(result){
        console.log(result);
    }).catch(function(error){
        console.log(error);
    });
    //打印结果：实例2操作失败
```

同样是两个实例，实例pro1不变，不同的是实例pro2，这次我们调用的是失败函数reject。

由于pro2实例中2000毫秒之后就执行reject方法，早于实例pro1的4000毫秒，所以最后输出的是：实例2操作失败。

以上就是对Promise对象的内容讲解，上面提到了一个概念：回调地狱；指的是过多地使用回调函数嵌套，使得调试和维护起来极其的不便。

### 2、变量声明

#### 2-1、JavaScript 的数据类型分类和判断

> 在 JavaScript 中，共有以下基本类型：

- String 
- Number 
- Boolean 
- Null 
- Undefined 
- Symbol 

其中`string`、`number`、`Boolean`、`undefined`、`Null`、`symbol`是6种原始类型。

值得`注意`的是：原始类型中不包含 `Object`。

> 类型判断用到哪些方法？

1、**typeof**

`typeof xxx` 得到的值有以下几种类型: `undefined boolean number string object function symbol`。

例如：

```js
console.log(typeof 42);
// expected output: "number"

console.log(typeof 'blubber');
// expected output: "string"

console.log(typeof true);
// expected output: "boolean"

console.log(typeof declaredButUndefinedVariable);
// expected output: "undefined";

```

- `typeof null` 结果是 `object` ，`JavaScript` 诞生以来便如此，由于 `null` 代表的是空指针（大多数平台下值为 0x00）,因此，`null` 的类型标签是 `0`，`typeof null` 也因此返回 `"object"`。
- `typeof [1, 2]` 结果是 `object` ，结果中没有`array` 这一项，引用类型除了`function`其他的全部都是 `object`
- `typeof Symbol()` 用 `typeof` 获取 `symbol` 类型的值得到的是 `symbol` ，`Symbol`实例是唯一且不可改变的这是 ES6 新增的知识点.

2、**instanceof**

用于实例和构造函数的对应。例如判断一个变量是否是数组，使用 typeof 无法判断，但可 以使用 `[1, 2] instanceof Array` 来判断,返回`true`。因为， \[1, 2\] 是数组，它的构造函数就是 Array 。同理：

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
var auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);
// expected output: true

console.log([1, 2] instanceof Array);
// expected output: true

```

#### 2-2、引用类型和值类型

除了原始类型，JS 还有引用类型，上面提到的 `typeof` 识别出来的类型中，只有 `object` 和 `function` 是引用类型，其他都是值类型。

> 根据 `JavaScript` 中的变量类型传递方式，又分为**值类型**和**引用类型**，值类型变量包括 `Boolean`、`String`、`Number`、`Undefined`、`Null`，引用类型包括了 `Object` 类的所有，如 `Date`、`Array`、`Function` 等。在参数传递方式上，**值类型**是按值传递，**引用类型**是按共享 传递。

```js
// 值类型
var a = 1;
var b = a;
b = 3
console.log(a) // 1
console.log(b) // 3
// a b 都是值类型，两者分别修改赋值，相互之间没有任何影响。

```

```js
// 引用类型
var a = {x: 10, y: 20}
var b = a
b.x = 100
b.y = 200
console.log(a) // {x: 100, y: 200}
console.log(b) // {x: 100, y: 200}

```

`a 和 b` 都是引用类型。在执行了 `b = a` 之后，修改 `b` 的属性值， `a` 的也跟着 变化。因为 `a 和 b` 都是**引用类型**，指向了同一个内存地址，即两者引用的是同一个值，因 此 b 修改属性时， a 的值随之改动。

### 3、原型与原型链（继承）

> `JavaScript` 常被描述为一种**基于原型的语言 \(prototype-based language\)**——每个对象拥有一个**原型对象**，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为**原型链 \(prototype chain\)**，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。

> `注意`: 理解对象的原型（可以通过`Object.getPrototypeOf(obj)`或者已被弃用的`__proto__`属性获得）与构造函数的`prototype`属性之间的区别是很重要的。前者是每个实例上都有的属性，后者是构造函数的属性。也就是说，`Object.getPrototypeOf(new Foobar())`和`Foobar.prototype`指向着同一个对象。

> 在`javascript`中，函数可以有属性。 每个函数都有一个特殊的属性叫作**原型（prototype）** ，正如下面所展示的。请注意，下面的代码是独立的一段\(在网页中没有其他代码的情况下，这段代码是安全的\)。为了最好的学习体验，你最好打开一个控制台 \(在`Chrome`和`Firefox`中，可以按`Ctrl+Shift+I` 来打开\)切换到`"Console"`选项卡, 复制粘贴下面的`JavaScript`代码，然后按回车来运行。

```js
function doSomething(){}
console.log( doSomething.prototype );
// 不管您如何声明函数，javascript中的函数总是有一个默认的原型属性
var doSomething = function(){}; 
console.log( doSomething.prototype );

```

正如上面所看到的, `doSomething` 函数有一个默认的`原型属性`，它在控制台上面呈现了出来. 运行这段代码之后，控制台上面应该出现了像这样的一个对象.

```js
{
    constructor: ƒ doSomething(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ `hasOwnProperty`(),
        isPrototypeOf: ƒ `isPrototypeOf`(),
        propertyIsEnumerable: ƒ `propertyIsEnumerable`(),
        toLocaleString: ƒ `toLocaleString`(),
        toString: ƒ `toString`(),
        valueOf: ƒ `valueOf`()
    }
}

```

现在，我们可以添加一些属性到 doSomething 的原型上面，如下所示:

```js
function doSomething(){}
doSomething.prototype.foo = "bar";
console.log( doSomething.prototype );

```

输出：

```js
{
    foo: "bar",
    constructor: ƒ doSomething(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ `hasOwnProperty`(),
        isPrototypeOf: ƒ `isPrototypeOf`(),
        propertyIsEnumerable: ƒ `propertyIsEnumerable`(),
        toLocaleString: ƒ `toLocaleString`(),
        toString: ƒ `toString`(),
        valueOf: ƒ `valueOf`()
    }
}

```

然后，我们可以使用 `new` 运算符来在现在的这个原型基础之上，创建一个 `doSomething` 的实例。

```js
function doSomething(){}
doSomething.prototype.foo = "bar"; // add a property onto the prototype
var doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value"; // add a property onto the object
console.log( doSomeInstancing );

```

输出：

```js
{
    prop: "some value",
    __proto__: {
        foo: "bar",
        constructor: ƒ doSomething(),
        __proto__: {
            constructor: ƒ Object(),
            hasOwnProperty: ƒ `hasOwnProperty`(),
            isPrototypeOf: ƒ `isPrototypeOf`(),
            propertyIsEnumerable: ƒ `propertyIsEnumerable`(),
            toLocaleString: ƒ `toLocaleString`(),
            toString: ƒ `toString`(),
            valueOf: ƒ `valueOf`()
        }
    }
}

```

就像上面看到的, `doSomeInstancing` 的 `__proto__` 属性就是`doSomething.prototype`. 但是这又有什么用呢\? 好吧,当你访问 `doSomeInstancing` 的一个属性, 浏览器首先查找 `doSomeInstancing` 是否有这个属性. 如果 `doSomeInstancing` 没有这个属性, 然后浏览器就会在 `doSomeInstancing` 的 `__proto__` 中查找这个属性\(也就是 `doSomething.prototype`\). 如果 `doSomeInstancing` 的 `__proto__` 有这个属性, 那么 `doSomeInstancing` 的 `__proto__` 上的这个属性就会被使用. 否则, 如果 `doSomeInstancing` 的 `__proto__` 没有这个属性, 浏览器就会去查找 `doSomeInstancing` 的 `__proto__` 的 `__proto__` ，看它是否有这个属性. 默认情况下, 所有函数的原型属性的 `__proto__` 就是 window.Object.prototype. 所以 doSomeInstancing 的 `__proto__` 的 `__proto__` \(也就是 doSomething.prototype 的 `__proto__` \(也就是 `Object.prototype`\)\) 会被查找是否有这个属性. 如果没有在它里面找到这个属性, 然后就会在 `doSomeInstancing` 的 `__proto__` 的 `__proto__` 的 `__proto__` 里面查找. 然而这有一个问题: `doSomeInstancing` 的 `__proto__` 的 `__proto__` 的 `__proto__` 不存在. 最后, 原型链上面的所有的 `__proto__` 都被找完了, 浏览器所有已经声明了的 `__proto__` 上都不存在这个属性，然后就得出结论，这个属性是 `undefined`.

```js
function doSomething(){}
doSomething.prototype.foo = "bar";
var doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value";
console.log("doSomeInstancing.prop:      " + doSomeInstancing.prop);
console.log("doSomeInstancing.foo:       " + doSomeInstancing.foo);
console.log("doSomething.prop:           " + doSomething.prop);
console.log("doSomething.foo:            " + doSomething.foo);
console.log("doSomething.prototype.prop: " + doSomething.prototype.prop);
console.log("doSomething.prototype.foo:  " + doSomething.prototype.foo);

```

输出：

```txt
doSomeInstancing.prop:      some value
doSomeInstancing.foo:       bar
doSomething.prop:           undefined
doSomething.foo:            undefined
doSomething.prototype.prop: undefined
doSomething.prototype.foo:  bar
```

是不是看的头大了，别担心。看看这个：

> - 所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（ `null`除外）
> - 所有的引用类型（数组、对象、函数），都有一个 `__proto__` 属性，属性值是一个普通的对象
> - 所有的函数，都有一个 `prototype` 属性，属性值也是一个普通的对象
> - 所有的引用类型（数组、对象、函数）， `__proto__` 属性值指向它的构造函数的`prototype` 属性值

```js
// 要点一：自由扩展属性
var obj = {}; obj.a = 100;
var arr = []; arr.a = 100;
function fn () {}
fn.a = 100;
// 要点二：__proto__
console.log(obj.__proto__);
console.log(arr.__proto__);
console.log(fn.__proto__);
// 要点三：函数有 prototype
console.log(fn.prototype)
// 要点四：引用类型的 __proto__ 属性值指向它的构造函数的 prototype 属性值
console.log(obj.__proto__ === Object.prototype)

```

#### 3-1、原型和原型链

**原型**

```js
// 构造函数
function Foo(name, age) {
 this.name = name
}
Foo.prototype.alertName = function () {
 alert(this.name)
}
// 创建示例
var f = new Foo('zhangsan')
f.printName = function () {
 console.log(this.name)
}
// 测试
f.printName()
f.alertName()

```

执行 `printName` 时很好理解，但是执行 `alertName` 时发生了什么？这里再记住一个重点 当 试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的 `__proto__` （即它的构造函数的 `prototype` ）中寻找，因此 `f.alertName` 就会找到 `Foo.prototype.alertName` 。

那么如何判断这个属性是不是对象本身的属性呢？使用 `hasOwnProperty` ，常用的地方是遍 历一个对象的时候。

```js
var item
for (item in f) {
 // 高级浏览器已经在 for in 中屏蔽了来自原型的属性，但是这里建议大家还是加上这个判断，保证程序正常输出
 if (f.hasOwnProperty(item)) {
 console.log(item)
 }
}

```

**原型链**

还是接着上面的示例，如果执行 f.toString\(\) 时，又发生了什么？

```js
f.printName()
```

因为 `f` 本身没有 `toString()` ，并且 `f.__proto__ （即 Foo.prototype ）`中也没有 `toString` 。这个问题还是得拿出刚才那句话——当试图得到一个对象的某个属性时，如果 这个对象本身没有这个属性，那么会去它的 `__proto__` （即它的构造函数的 `prototype` ） 中寻找。

如果在 f.**proto** 中没有找到 toString ，那么就继续去 f.**proto**.**proto** 中寻 找，因为 f.**proto** 就是一个普通的对象而已嘛！

- `f.__proto__` 即 `Foo.prototype` ，没有找到 `toString` ，继续往上找
- `f.__proto__.__proto__` 即 `Foo.prototype.__proto__` 。 `Foo.prototype` 就是一个普通 的对象，因此 `Foo.prototype.__proto__` 就是 `Object.prototype` ，在这里可以找到`toString`
- 因此 `f.toString` 最终对应到了 `Object.prototype.toString`

这样一直往上找，你会发现是一个链式的结构，所以叫做`“原型链”`。如果一直找到最上 层都没有找到，那么就宣告失败，返回 `undefined` 。最上层是什么 ——`Object.prototype.__proto__ === null`.原型链并不是无限的，原型链最终指向null。

### 4、作用域和闭包

> 作用域和闭包是前端面试中，最可能考查的知识点

#### 4-1、作用域

**作用域**就是一个独立的地盘，让变量不会外泄、暴露出去。

变量的作用域无非就是两种：`全局变量和局部变量`。

**全局作用域：**

最外层函数定义的变量拥有全局作用域，即对任何内部函数来说，都是可以访问的

```js
var outerVar = "outer";
function fn(){
    console.log(outerVar);
}
fn(); // result:outer

```

**局部作用域：**

和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，而对于函数外部是无法访问的，最常见的例如函数内部

```js
function fn(){
    var innerVar = "inner";
}
fn();
console.log(innerVar);  // ReferenceError: innerVar is not defined

```

这就是为何 jQuery、Zepto 等库的源码，所有的代码都会放在 \(function\(\)\{....\}\)\(\) 中。因为放在里面的所有变量，都不会被外泄和暴露，不会污染到外面，不会对其他的库 或者 JS 脚本造成影响。这是函数作用域的一个体现。

`注意：` ES6 中开始加入了块级作用域，使用 `let` 定义变量即可,如下：

```js
if (true) {
 let name = 'Tom'
}
console.log(name) // 报错，因为let定义的name是在if这个块级作用域

```

**作用域链** 如下代码中， `console.log(a)` 要得到 `a` 变量，但是在当前的作用域中没有定义 `a`,一层一层向上寻找，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是 **作用域链**。

```js
var a = 5
function fn() {
 var b = 10
 console.log(a)
 console.log(b)
}
fn()

```

#### 4-2、 什么是闭包，如何形成

那么什么叫闭包？观点很多，出现频率最高的有以下两个观点：

-    函数套函数。
-    在函数外获取函数内变量的技术。

```js
function F1() {
 var a = 100
 return function () {
 console.log(a)
 }
}
var f1 = F1()
var a = 200
f1()

```

闭包主要有两个应用场景：

-    **函数作为返回值**，上面的例子就是
-    **函数作为参数传递**，看以下例子

```js
function F1() {
 var a = 100
 return function () {
 console.log(a)
 }
}
function F2(f1) {
 var a = 200
 console.log(f1())
}
var f1 = F1()
F2(f1)

```

**关于this对象**

```js
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            return this.name;
        };
    }
};
alert(object.getNameFunc()()); // result:The Window

```

> `this`对象是在运行时基于函数的执行环境绑定的：在全局函数中，`this`等于`window`，而当函数被作为某个对象调用时，`this`等于那个对象。不过，匿名函数具有全局性，因此`this`对象同常指向`window`。

### 5、如何理解同步和异步

#### 5-1、同步 vs 异步

先看下面的栗子，根据程序阅读起来表达的意思，应该是先打印 100 ，1秒钟之后打印 200 ，最后打印 300 。但是实际运行根本不是那么回事。

```js
console.log(100)
setTimeout(function () {
 console.log(200)
}, 1000)
console.log(300)

```

再对比以下程序。先打印 100 ，再弹出 200 （等待用户确认），最后打印 300 。这个运行 效果就符合预期要求。

```js
console.log(100)
alert(200) // 1秒钟之后点击确认
console.log(300)

```

这俩到底有何区别？—— 第一个示例中间的步骤根本没有阻塞接下来程序的运行，而第二 个示例却阻塞了后面程序的运行。前面这种表现就叫做 `异步`（后面这个叫做 `同步` ），即 **不会阻塞后面程序的运行**。

#### 5-2、异步和单线程

```js
setTimeout(function(){
 a = false;
}, 100)
while(a){
 console.log('while执行了')
}

```

> 因为JS是单线程的，一次只能做一件事情,所以进入while循环之后，没有「时间」（线程）去跑定时器了，所以这个代码跑起来是个死循环！

#### 5-3、前端异步的场景描述

- 定时任务：`setTimeout`, `setInterval`
- 绑定事件：`addEventListener`（`click`等等）
- 网络请求：`ajax`和 `img` 动态加载

---

欢迎访问：[个人博客地址](https://tiven.cn/p/5f317c1c/ "天問博客")
