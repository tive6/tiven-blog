---
title: TypeScript 高级用法日常汇总
tags:
- TS
categories:
- TypeScript
abbrlink: 9ffbfcbb
date: 2023-06-04 10:28:22
---

本文介绍几个比较实用的 TypeScript 的高级技巧，每个技巧都有例子展示其如何实现和使用。使用这些技巧，您不仅可以提高您的代码质量，也可以提高您作为一名 TypeScript 程序员的技能水平。

![TypeScript](https://tiven.cn/static/img/img-ts-01-Xyj6BEm7dx6FDpFKrbJGp.jpg)

[//]: # (<!-- more -->)

## 1 — 高级类型（Advanced Types）

使用 TypeScript 的高级类型，如映射类型和条件类型，可以基于现有类型构建新类型。通过使用这些类型，您可以在强类型系统中更改和操作类型，从而使您的代码具有更大的灵活性和可维护性。

### 映射类型

映射类型会遍历现有类型的属性，并应用变换来创建新类型。一个常见的用例是创建一个类型的只读版本。

 ```typescript
 type Readonly<T> = {  
 readonly [P in keyof T]: T[P];  
};  
interface Point {  
 x: number;  
 y: number;  
}  
type ReadonlyPoint = Readonly<Point>;  
```

在这个例子中，我们定义了一个叫做 `Readonly` 的映射类型，它以类型 `T` 为泛型参数，并使其所有属性成为只读。然后，我们创建了一个 `ReadonlyPoint` 类型，该类型基于 `Point` 接口，其中所有属性都是只读的。

### 条件类型

条件类型允许您根据条件创建新类型。语法类似于三元运算符，使用extends关键字作为类型约束。

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;  
```

在此示例中，我们定义了一个名为NonNullable的条件类型，它取一个类型T并检查它是否扩展了null或undefined。如果扩展了，则结果类型为never，否则为原始类型T。让我们扩展一下高级类型的示例，增加更多的可用性和输出。

```typescript
interface Point {  
 x: number;  
 y: number;  
}  
type ReadonlyPoint = Readonly<Point>;

const regularPoint: Point = {  
 x: 5,  
 y: 10  
};

const readonlyPoint: ReadonlyPoint = {  
 x: 20,  
 y: 30  
};

regularPoint.x = 15; // This works as 'x' is mutable in the 'Point' interface  
console.log(regularPoint); // Output: { x: 15, y: 10 }  
// readonlyPoint.x = 25; // Error: Cannot assign to 'x' because it is a read-only property  
console.log(readonlyPoint); // Output: { x: 20, y: 30 }

function movePoint(p: Point, dx: number, dy: number): Point {  
 return { x: p.x + dx, y: p.y + dy };  
}

const movedRegularPoint = movePoint(regularPoint, 3, 4);  
console.log(movedRegularPoint); // Output: { x: 18, y: 14 }  
// const movedReadonlyPoint = movePoint(readonlyPoint, 3, 4); // Error: Argument of type 'ReadonlyPoint' is not assignable to parameter of type 'Point'  
```

在这个示例中，我们演示了 Readonly 映射类型的用法及其如何强制执行不可变性。我们创建了一个可变的 Point 对象和一个只读的 ReadonlyPoint 对象。我们展示了试图修改只读属性会导致编译时错误。我们还说明了只读类型不能在期望可变类型的位置使用，从而防止代码中出现意外的副作用。

## 2 — 装饰器（Decorator）

TypeScript 中的装饰器是一种强大的功能，允许您添加元数据，修改或扩展类、方法、属性和参数的行为。它们是高阶函数，可以用于观察、修改或替换类定义、方法定义、访问器定义、属性定义或参数定义。

### 类装饰器

类装饰器应用于类的构造函数，并可用于修改或扩展类定义。

```typescript
function LogClass(target: Function) {  
 console.log(`Class ${target.name} was defined.`);  
}  
@LogClass  
class MyClass {  
 constructor() {}  
}  
```

在这个示例中，我们定义了一个名为 LogClass 的类装饰器，它在定义时记录被装饰类的名称。然后，我们使用 \@ 语法将装饰器应用于 MyClass 类。

### 方法装饰器

方法装饰器应用于类的方法，并可用于修改或扩展方法定义。

```typescript
function LogMethod(target: any, key: string, descriptor: PropertyDescriptor) {  
 console.log(`Method ${key} was called.`);  
}  
class MyClass {  
 @LogMethod  
 myMethod() {  
 console.log("Inside myMethod.");  
 }  
}  
const instance = new MyClass();  
instance.myMethod();  
```

在这个例子中，我们定义了一个名为 `LogMethod` 的方法装饰器，它在调用方法时记录被装饰的方法的名称。然后，我们使用 `@` 语法将装饰器应用于 `MyClass` 类的 `myMethod` 方法。

### 属性装饰器

属性装饰器应用于类的属性，并可用于修改或扩展属性定义。

```typescript
function DefaultValue(value: any) {  
 return (target: any, key: string) => {  
 target[key] = value;  
 };  
}  
class MyClass {  
 @DefaultValue(42)  
 myProperty: number;  
}  
const instance = new MyClass();  
console.log(instance.myProperty); // Output: 42  
```

在这个例子中，我们定义了一个名为 `DefaultValue` 的属性装饰器，它为被装饰的属性设置默认值。然后，我们使用 `@` 语法将装饰器应用于 `MyClass` 类的 `myProperty` 属性。

### 参数装饰器

参数装饰器应用于方法或构造函数的参数，并可用于修改或扩展参数定义。

```typescript
function LogParameter(target: any, key: string, parameterIndex: number) {  
 console.log(`方法 ${key} 的参数 ${parameterIndex} 被调用了。`);  
}  
class MyClass {  
 myMethod(@LogParameter value: number) {  
 console.log(`在 myMethod 方法内，使用值 ${value}。`);  
 }  
}  
const instance = new MyClass();  
instance.myMethod(5);  
```

在这个例子中，我们定义了一个名为 LogParameter 的参数装饰器，它在方法调用时记录被装饰参数的索引和名称。然后，我们使用 `@` 语法将装饰器应用于 MyClass 类的 myMethod 方法的 value 参数。

## 3 — 命名空间（Namespaces）

在 TypeScript 中，命名空间是一种组织和分组相关代码的方式。它们可以帮助您避免命名冲突，通过将属于一起的代码封装在一起来促进模块化。命名空间可以包含类、接口、函数、变量和其他命名空间。

### 定义命名空间

要定义命名空间，请使用 `namespace` 关键字后跟命名空间名称。然后您可以在大括号内添加任何相关的代码。

```typescript
namespace MyNamespace {  
 export class MyClass {  
   constructor(public value: number) {}  
   displayValue() {  
     console.log(`The value is: ${this.value}`);  
   }  
 }  
}  
```

在此示例中，我们定义了一个名为 `MyNamespace` 的命名空间，并在其中添加一个类 `MyClass`。请注意，我们使用 `export` 关键字使该类在命名空间外部可访问。

### 使用命名空间

要使用命名空间中的代码，您可以使用完全限定的名称或使用命名空间导入导入代码。

```typescript
// 使用完全限定的名称  
const instance1 = new MyNamespace.MyClass(5);  
instance1.displayValue(); // 输出：The value is: 5  
// 使用命名空间导入  
import MyClass = MyNamespace.MyClass;  
const instance2 = new MyClass(10);  
instance2.displayValue(); // 输出：The value is: 10  
```

在此示例中，我们演示了两种使用 `MyNamespace` 命名空间中的 `MyClass` 类的方法。首先，我们使用完全限定的名称 `MyNamespace.MyClass`。其次，我们使用命名空间导入语句导入 `MyClass` 类，并使用较短的名称使用它。

### 嵌套命名空间

命名空间可以嵌套以创建层次结构并进一步组织代码。

```typescript
namespace OuterNamespace {  
 export namespace InnerNamespace {  
   export class MyClass {  
     constructor(public value: number) {}  
     displayValue() {  
       console.log(`The value is: ${this.value}`);  
     }  
   }  
 }  
}  
// 使用完全限定的名称  
const instance = new OuterNamespace.InnerNamespace.MyClass(15);  
instance.displayValue(); // 输出：The value is: 15  
```

在此示例中，我们定义了一个名为 `InnerNamespace` 的嵌套命名空间，在 `OuterNamespace` 中定义了一个 `MyClass` 类，并使用完全限定的名称 `OuterNamespace.InnerNamespace.MyClass` 使用它。

## 4 — 混入（Mixins）

混入（Mixins）是 TypeScript 中一种将类组合起来的方式，由多个较小的部分，即混入类（mixin classes），组成。它们允许您在不同的类之间重用和共享行为，促进模块化和代码可重用性。

### 定义混入

要定义混入类，请创建一个类，该类使用构造函数签名扩展泛型类型参数。这允许混入类与其他类组合。

```typescript
class TimestampMixin<TBase extends new (...args: any[]) => any>(Base: TBase) {  
 constructor(...args: any[]) {  
 super(...args);  
 }  
 getTimestamp() {  
 return new Date();  
 }  
}  
```

在此示例中，我们定义了一个名为 TimestampMixin 的混入类，它添加了一个 getTimestamp 方法，该方法返回当前日期和时间。混入类使用具有构造函数签名的泛型类型参数 TBase 扩展，以允许它与其他类组合。

### 使用混入

要使用混入类，请定义一个基类，并使用 `extends` 关键字将混入类应用于它。

```typescript
class MyBaseClass {  
 constructor(public value: number) {}  
 displayValue() {  
 console.log(`The value is: ${this.value}`);  
 }  
}  
class MyMixedClass extends TimestampMixin(MyBaseClass) {  
 constructor(value: number) {  
 super(value);  
 }  
}  
```

在此示例中，我们定义了一个名为 MyBaseClass 的基类，其中包含一个 displayValue 方法。然后，我们创建了一个名为 MyMixedClass 的新类，它扩展了基类并将 TimestampMixin 混入类应用于它。让我们演示一下混入类在实践中的工作原理。

```typescript
const instance = new MyMixedClass(42);  
instance.displayValue(); // 输出：The value is: 42  
const timestamp = instance.getTimestamp();  
console.log(`The timestamp is: ${timestamp}`); // 输出：The timestamp is: [当前日期和时间]  
```

在此示例中，我们创建了 MyMixedClass 类的一个实例，它包括 MyBaseClass 的 displayValue 方法和 TimestampMixin 混入类的 getTimestamp 方法。然后，我们调用这两个方法并显示它们的输出。

## 5 — 类型保护

TypeScript 中的类型保护是一种在特定代码块内缩小变量或参数类型范围的方式。它们允许您区分不同类型，并访问特定于这些类型的属性或方法，促进类型安全并减少运行时错误的可能性。

### 定义类型保护

要定义类型保护，请创建一个函数，该函数接受一个变量或参数并返回一个类型谓词。类型谓词是一个布尔表达式，可在函数范围内缩小参数的类型。

```typescript
function isString(value: any): value is string {  
 return typeof value === "string";  
}  
```

在这个例子中，我们定义了一个类型保护函数 `isString`，它检查给定的值是否为 `string` 类型。该函数返回一个类型谓词 `value is string`，它在函数范围内缩小了 `value` 参数的类型。

### 使用类型保护

要使用类型保护，只需在条件语句（如 `if` 语句或 `switch` 语句）中调用类型保护函数。

```typescript
function processValue(value: string | number) {  
 if (isString(value)) {  
 console.log(`The length of the string is: ${value.length}`);  
 } else {  
 console.log(`The square of the number is: ${value * value}`);  
 }  
}  
```

在这个例子中，我们定义了一个名为 `processValue` 的函数，它接受一个类型为 `string | number` 的值。我们使用 `isString` 类型保护函数来检查值是否为字符串。如果是字符串，我们访问特定于字符串类型的 `length` 属性。否则，我们假设该值是一个数字，并计算它的平方。让我们演示类型保护在实践中的工作方式。

```typescript
processValue("hello"); // 输出: The length of the string is: 5  
processValue(42); // 输出: The square of the number is: 1764  
```

在这个例子中，我们调用 `processValue` 函数并传入一个字符串和一个数字。类型保护函数 `isString` 确保为每种类型执行适当的代码块，允许我们访问特定于类型的属性和方法，而不会产生任何类型错误。

## 6 - 实用类型（Utility Types）

TypeScript 中的实用类型提供了一种方便的方法，将现有类型转换为新类型。它们允许您创建更复杂和灵活的类型，而无需从头定义它们，促进代码的可重用性和类型安全性。

### 使用实用类型

要使用实用类型，请使用尖括号语法将实用类型应用于现有类型。TypeScript 提供了各种内置实用类型，例如 `Partial`、`Readonly`、`Pick` 和 `Omit`。

```typescript
interface Person {  
 name: string;  
 age: number;  
 email: string;  
}  
type PartialPerson = Partial<Person>;  
type ReadonlyPerson = Readonly<Person>;  
type NameAndAge = Pick<Person, "name" | "age">;  
type WithoutEmail = Omit<Person, "email">;  
```

在这个例子中，我们定义了一个名为 `Person` 的接口，其中包含三个属性：`name`、`age` 和 `email`。然后，我们使用各种内置实用类型基于 `Person` 接口创建了新类型。让我们演示一下这些实用类型如何实际工作。

#### Partial

```typescript
const partialPerson: PartialPerson = {  
 name: "John Doe",  
};  
```

在这个例子中，我们创建了一个类型为 `PartialPerson` 的 `partialPerson` 对象。`Partial` 实用类型使 `Person` 接口的所有属性都是可选的，允许我们创建只有 `name` 属性的部分人员。

#### Readonly

```typescript
const readonlyPerson: ReadonlyPerson = {  
 name: "Jane Doe",  
 age: 30,  
 email: "jane@example.com",  
};  
// readonlyPerson.age = 31; // 错误：无法分配到 'age'，因为它是只读属性。  
```

在这个例子中，我们创建了一个类型为 `ReadonlyPerson` 的 `readonlyPerson` 对象。`Readonly` 实用类型使 `Person` 接口的所有属性都是只读的，防止我们修改 `age` 属性。

#### Pick

```typescript
const nameAndAge: NameAndAge = {  
 name: "John Smith",  
 age: 25,  
};  
// nameAndAge.email; // 错误：在类型 'Pick<Person, "name" | "age">' 上不存在属性 'email'。  
```

在这个例子中，我们创建了一个类型为 `NameAndAge` 的 `nameAndAge` 对象。`Pick` 实用类型创建一个新类型，其中仅包含 `Person` 接口的指定属性，本例中是 `name` 和 `age`。

#### Omit

```typescript
const withoutEmail: WithoutEmail = {  
 name: "Jane Smith",  
 age: 28,  
};  
// withoutEmail.email; // 错误：在类型 'Omit<Person, "email">' 上不存在属性 'email'。  
```

在这个例子中，我们创建了一个类型为 `WithoutEmail` 的 `withoutEmail` 对象。`Omit` 使用 Person 接口来创建一个新类型，从中删除了指定的属性，这里是 email 属性。这使得我们可以使用 withoutEmail 对象来表示一个没有 email 属性的 Person 对象。

```typescript
const withoutEmail: WithoutEmail = {  
 name: "Jane Smith",  
 age: 28,  
};  
// withoutEmail.email; // Error: Property 'email' does not exist on type 'Omit<Person, "email">'  
```

以上示例中，我们创建了一个 WithoutEmail 类型的 withoutEmail 对象。`Omit` 实用 Person 接口来创建一个新类型，从中删除了指定的属性，这里是 email 属性。这使得我们可以使用 withoutEmail 对象来表示一个没有 email 属性的 Person 对象。

## 总结

总之，本文探讨了各种高级 TypeScript 主题，如命名空间、高级类型、装饰器、混入、类型保护和实用类型。通过理解和利用这些特性，您可以创建更模块化、可重用和可维护的代码，符合最佳实践，并降低运行时错误的可能性。通过利用这些高级 TypeScript 特性，您可以编写更清洁、更有组织和更易于维护的代码，充分利用 TypeScript 强大的类型系统和语言特性。如果您喜欢本文并发现它有帮助，也可以点赞转发，让更多人能够清晰的写好代码！关于本文

转载来源：

* 作者：simple_lau
* 地址：https://juejin.cn/post/7225534193995104312

---

欢迎访问：[天问博客](https://tiven.cn/p/9ffbfcbb/ "天问博客-专注于大前端技术")

