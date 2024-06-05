---
title: Egg.js + Joi 进行接口参数验证
tags:
- Egg.js
- Node
categories:
- Egg.js
abbrlink: 5fd3f2f1
date: 2023-08-18 11:18:49
---

**Joi** 是一款强大的 JavaScript 数据验证库，用于验证和转换数据的格式。无论是在后端还是前端开发中，数据验证都是确保数据完整性和一致性的关键步骤。Joi 提供了一种简洁而灵活的方式来定义验证规则，以确保输入数据满足预期要求。
本文将介绍如何使用 `Joi` 进行数据验证，以及在 `Egg.js` 如何集成 `Joi` 进行接口参数验证。

![Egg.js + Joi](https://tiven.cn/static/img/eggjs-01-t4dYaNtm.jpg)

[//]: # (<!-- more -->)

## 一、Joi 简介

**Joi** 是一个 Node.js 模块，用于验证 JavaScript 对象的结构和值。它提供了一个流畅的 API，可以轻松定义数据验证规则。无论是验证用户输入、API 请求还是配置文件，Joi 都可以帮助开发者确保数据的合法性。

## 二、安装 Joi

在开始之前，确保你的项目已经安装了 Node.js。要在项目中使用 Joi，可以通过 npm 或 pnpm 进行安装：

```bash
npm install joi
# 或者
pnpm add joi
```

## 三、Joi 基本用法

以下是使用 Joi 进行基本数据验证的示例：

```js
const Joi = require('joi');

// 定义验证规则
const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(99),
});

// 要验证的数据
const data = {
  username: 'john_doe',
  email: 'john@example.com',
  age: 25,
};

// 进行验证
const result = schema.validate(data);

if (result.error) {
  console.error(result.error.details);
} else {
  console.log('数据验证通过');
}
```

在上面的示例中，我们首先定义了一个验证规则 schema，然后创建了一个要验证的数据对象 data。通过调用 schema.validate(data) 方法，我们可以获得验证结果。如果数据符合规则，result.error 将为 null，否则会包含错误信息的详细列表。

## 四、Joi 高级用法

Joi 不仅可以验证基本的数据类型，还可以处理复杂的数据结构，例如嵌套对象、数组和异步验证。以下是一些高级用法示例：

1. 嵌套对象验证：

```js
const addressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  zipCode: Joi.string().pattern(/^\d{5}$/).required(),
});

const personSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
  address: addressSchema,
});

const personData = {
  name: 'Alice',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'Exampleville',
    zipCode: '12345',
  },
};

const personResult = personSchema.validate(personData);
```

2. 数组验证：

```js
const itemSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
});

const cartSchema = Joi.array().items(itemSchema).min(1);

const cartData = [
  { name: 'Item 1', price: 10 },
  { name: 'Item 2', price: 20 },
];

const cartResult = cartSchema.validate(cartData);
```

3. 异步验证

```js
const asyncSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  // 异步验证函数，返回 Promise
  isUsernameAvailable: Joi.function().async().required(),
});

const asyncData = {
  username: 'new_user',
  isUsernameAvailable: async (username) => {
    // 在实际应用中，可以查询数据库或调用 API 来检查用户名是否可用
    const isAvailable = await checkUsernameAvailability(username);
    if (!isAvailable) {
      throw new Error('Username is not available');
    }
  },
};

const asyncResult = await asyncSchema.validateAsync(asyncData);
```

## 五、Egg.js 集成 Joi

数据验证是 Web 应用程序开发中至关重要的一部分，它有助于保障输入数据的合法性和完整性。在 Egg.js 框架中，你可以借助 Joi 库来轻松进行数据验证。本文将介绍如何在 Egg.js 项目中使用 Joi 进行数据验证，以确保接收到的数据满足预期的格式和要求。

首先，在 `app/controller` 控制器目录下创建一个新的控制器文件，例如 `user.js`：

```js
// app/controller/user.js

const Controller = require('egg').Controller;
const Joi = require('joi');

class UserController extends Controller {
  async create() {
    const { ctx } = this;
    
    // 定义验证规则
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().required(),
      age: Joi.number().integer().min(18).max(99),
    });

    // 获取请求体数据
    const requestBody = ctx.request.body;

    // 进行数据验证
    const validationResult = schema.validate(requestBody);

    if (validationResult.error) {
      ctx.status = 400;
      ctx.body = {
        message: '数据验证失败',
        details: validationResult.error.details,
      };
      return;
    }

    // 数据验证通过，继续处理业务逻辑
    // ...
  }
}

module.exports = UserController;
```

在上面的示例中，我们首先导入了 Joi 和 Egg.js 的 Controller 类。在 create 方法中，我们定义了验证规则 schema，然后获取请求体数据 requestBody 并进行数据验证。如果验证失败，我们返回一个包含错误信息的响应；如果验证通过，我们可以继续处理业务逻辑。

## 六、总结

Joi 是一个功能强大且易于使用的数据验证库，适用于各种 JavaScript 应用。通过定义清晰的验证规则，可以有效地确保输入数据的合法性，从而提高数据的质量和应用的稳定性。无论是简单的数据验证还是复杂的数据结构，Joi 都可以满足你的需求，让数据验证变得更加简单高效。
通过在 **Egg.js** 项目中集成 **Joi** 数据验证，你可以确保输入数据的合法性，并减少潜在的错误和安全风险。Joi 提供了简洁而灵活的验证规则定义，帮助你轻松应对不同类型的数据验证需求。

参考文档：https://joi.dev/

---

欢迎访问：[天问博客](https://tiven.cn/p/5fd3f2f1/ "天问博客-专注于大前端技术")

