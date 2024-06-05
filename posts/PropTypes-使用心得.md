---
title: PropTypes 使用心得
tags:
  - React
categories:
  - React
abbrlink: 8cb92d22
date: 2023-12-12 18:04:19
---

在 **React** 开发中，`PropTypes` 是一个非常有用的库，用于对组件的属性进行类型检查。它可以帮助我们在开发过程中捕获潜在的错误，提高代码的可靠性和可维护性。本文将介绍 `PropTypes` 的基本用法和一些使用心得。

![React PropTypes](https://tiven.cn/static/img/img-react-01-awodTve6vGeownJ6xi27U.jpg)

[//]: # (<!-- more -->)

## 一、什么是 PropTypes

`PropTypes` 是 **React** 提供的一个用于类型检查的库。它可以用来验证组件的属性（props）是否符合预期的类型和格式。通过在组件中定义 PropTypes，我们可以确保组件在使用时传入正确的属性，并在属性类型不匹配时给出警告信息。

## 二、PropTypes 的基本用法

首先，我们需要下载安装 `prop-types` 库：

```shell
pnpm add -S prop-types
```

然后，我们需要在组件文件的顶部引入 `PropTypes`：

```jsx
import PropTypes from 'prop-types';
```

然后，在组件定义中使用 PropTypes 进行属性类型检查。例如，我们有一个名为 `MyComponent` 的组件，它接受一个名为 `name` 的字符串属性：

```jsx
MyComponent.propTypes = {
  name: PropTypes.string
};
```

在上面的示例中，我们使用 `PropTypes.string` 来指定 `name` 属性的类型为字符串。如果在使用 `MyComponent` 时传入的 `name` 属性不是字符串类型，将会在控制台中显示警告信息。

PropTypes 提供了许多常用的数据类型检查器：

- `PropTypes.string`、
- `PropTypes.symbol`、
- `PropTypes.number`、
- `PropTypes.bigint`、
- `PropTypes.bool`、
- `PropTypes.func`、
- `PropTypes.array`、
- `PropTypes.object`、

节点类型检查器：

- `PropTypes.node`、
- `PropTypes.element`、
- `PropTypes.elementType`、

## 三、PropTypes 的高级用法

除了基本的数据类型检查器，PropTypes 还提供了一些特殊的类型检查器：

- `PropTypes.any.isRequired`：任意类型且为必填项。
- `PropTypes.func.isRequired`：函数类型且为必填项。
- `PropTypes.instanceOf`：指定类的实例，例如 `PropTypes.instanceOf(MyClass)` 表示 `MyClass` 的实例。
- `PropTypes.oneOf`：枚举类型，例如 `PropTypes.oneOf(['red', 'green'])` 表示 `red` 或 `green` 之一。
- `PropTypes.oneOfType`：多种类型中的一种，例如 `PropTypes.oneOfType([PropTypes.string, PropTypes.number])` 表示字符串或数字类型之一。
- `PropTypes.arrayOf`：数组类型，例如 `PropTypes.arrayOf(PropTypes.string)` 表示字符串数组，等价于 TS 中的 `string[]`。
- `PropTypes.objectOf`：对象类型，例如 `PropTypes.objectOf(PropTypes.string)` 表示字符串对象，等价于 TS 中的 `{ [key: string]: string }`。
- `PropTypes.shape`：对象类型，例如 `PropTypes.shape({ name: PropTypes.string.isRequired, age: PropTypes.number })` 表示对象中包含 `name` 和 `age` 属性，其中 `name` 属性为字符串类型且为必填项，`age` 属性为数字类型。等价于 TS 中的 `{ name: string, age?: number }`。
- `PropTypes.exact`：限定对象类型，且可以指定对象的哪些属性必须有，哪些属性可以没有。如果出现没有定义的属性，会出现警告。例如 `PropTypes.exact({ name: PropTypes.string, age: PropTypes.number }).isRequired` 表示对象中包含 `name` 和 `age` 属性，且都为必填项。等价于 TS 中的 `{ name: string, age: number }`。

还可以高级自定义类型：

```jsx
const Com = () => {
  return ()
}

Com.propTypes = {
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
      );
    }
  },
  
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
          'Invalid prop `' + propFullName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

## 四、PropTypes 设置默认值

您可以通过配置特定的 defaultProps 属性来定义 props 的默认值：

```jsx
import { Tabs } from 'antd'
import PropTypes from 'prop-types'

const Com = ({ tabsData, showTabs }) => {
  const onChange = (key) => {
    console.log(key)
  }

  return (
    <>
      {showTabs && (
        <Tabs defaultActiveKey="1" items={tabsData} onChange={onChange} />
      )}
    </>
  )
}

Com.propTypes = {
  tabsData: PropTypes.array,
  showTabs: PropTypes.bool,
}

Com.defaultProps = {
  tabsData: [],
  showTabs: true,
}

export default Com
```

## 五、PropTypes 的使用心得

在实际开发中，我发现 PropTypes 对于团队协作和代码维护非常有帮助。以下是一些我在使用 PropTypes 过程中的心得体会：

1. **提前发现错误**：PropTypes 可以在开发阶段就发现潜在的错误，避免在运行时出现类型不匹配的问题。这有助于减少调试时间和提高代码质量。
2. **文档化组件接口**：通过定义 PropTypes，我们可以清晰地了解组件所需的属性类型和格式。这对于组件的使用者来说非常有帮助，可以更好地理解如何正确地使用组件。
3. **团队协作**：PropTypes 可以作为团队协作的一种规范，帮助团队成员理解组件之间的依赖关系和接口约定。它提供了一种统一的方式来定义和验证属性类型，减少了团队成员之间的沟通成本。
4. **代码维护**：PropTypes 可以帮助我们更好地理解代码的意图和结构。当我们需要修改或重构组件时，PropTypes 可以作为一个指导，帮助我们更快地理解组件的用途和关联关系。

总的来说，PropTypes 是一个非常有用的工具，可以提高代码的可靠性和可维护性。它可以帮助我们在开发过程中捕获潜在的错误，并提供清晰的接口文档。在实际项目中，我强烈推荐使用 PropTypes 来进行属性类型检查。

以上是我对 PropTypes 的使用心得，希望对你有所帮助！

参考资料：
- [React PropTypes 中文文档](https://zh-hans.legacy.reactjs.org/docs/typechecking-with-proptypes.html)
- [PropTypes 库文档](https://www.npmjs.com/package/prop-types)


---

欢迎访问：[天问博客](https://tiven.cn/p/8cb92d22/ "天问博客-专注于大前端技术")

