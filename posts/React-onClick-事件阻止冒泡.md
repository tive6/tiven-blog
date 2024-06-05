---
title: React onClick 事件阻止冒泡
tags:
- JS
- React
categories:
- React
abbrlink: a5933870
date: 2023-09-03 16:43:47
---

在 **React** 中，你可以通过使用 **onClick** 事件来处理点击事件，并且可以通过在事件处理函数中调用 `stopPropagation()` 方法来阻止事件冒泡。本文将为你提供 **类组件** 和 **函数式组件** 两种示例。

![React 阻止冒泡](https://tiven.cn/static/img/img-react-01-awodTve6vGeownJ6xi27U.jpg)

[//]: # (<!-- more -->)

## 一、类组件示例

```jsx
import React from 'react';

class MyComponent extends React.Component {
  handleClick = (e) => {
    // 阻止事件冒泡
    e.stopPropagation();

    // 处理点击事件的逻辑
    console.log('子元素被点击');
  };

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>点击我不会触发父元素的点击事件</p>
      </div>
    );
  }
}

export default MyComponent;
```

在上述示例中，创建了一个名为 MyComponent 的 React 类组件，通过在 handleClick 函数中使用 `e.stopPropagation()` 来阻止事件冒泡。

## 二、函数式组件示例（使用React Hooks）

```jsx
import React from 'react';

function MyFunctionalComponent() {
  const handleClick = (e) => {
    // 阻止事件冒泡
    e.stopPropagation();

    // 处理点击事件的逻辑
    console.log('子元素被点击');
  };

  return (
    <div onClick={handleClick}>
      <p>点击我不会触发父元素的点击事件</p>
    </div>
  );
}

export default MyFunctionalComponent;
```

在上述示例中，创建了一个名为 MyFunctionalComponent 的 React 函数式组件，同样使用 `e.stopPropagation()` 来阻止事件冒泡。

## 三、开发案例

在实际开发中，我们经常会遇到需要阻止事件冒泡的场景，比如在 React 中使用 Ant Design 的 Tree + Dropdown 组件时，我们需要阻止 Dropdown 点击事件冒泡，否则会导致点击 Dropdown 组件时，Dropdown 被包裹的父组件 Tree 也会被触发 onClick 事件或 onSelect 事件。

```jsx
const Com = () => {
  const treeData = useMemo(() => {
    return trees.map(({ title, key, children }) => {
      return {
        title: (
            <div
                key={key}
                className="w-[150px] flex justify-between items-center tree-parent-li"
            >
              <div className="flex items-center">
                <FolderOutlined
                    style={{ color: '#FFCB03', marginRight: '5px' }}
                />
                {title}
              </div>
              {(`${key}` === '3' || isAdmin) && (
                  <Dropdown
                      key="title"
                      menu={{
                        items: items.map((item) => {
                          return {
                            ...item,
                            onClick: (e) => {
                              console.log(e)
                              e.domEvent.preventDefault()
                              itemClick(item, { key })
                            },
                          }
                        }),
                      }}
                      placement="bottom"
                      arrow
                  >
                    <MoreOutlined className="tree-plus" />
                  </Dropdown>
              )}
            </div>
        ),
        key: key + '',
        children: children.map(({ id, collName, questionCount }) => {
          return {
            title: (
                <div className="w-[126px] flex justify-between items-center">
                  <div className="w-[110px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {collName}({questionCount})
                  </div>
                  {(`${key}` === '3' || isAdmin) && (
                      <Dropdown
                          key="subtitle"
                          menu={{
                            items: subItems.map((item) => {
                              return {
                                ...item,
                                onClick: (e) => {
                                  e.domEvent.preventDefault()
                                  e.domEvent.stopPropagation()
                                  itemClick(item, {
                                    key,
                                    id,
                                    collName,
                                  })
                                },
                              }
                            }),
                          }}
                          placement="bottom"
                          arrow
                      >
                        <MoreOutlined
                            onClick={(e) => {
                              e.stopPropagation()
                            }}
                        />
                      </Dropdown>
                  )}
                </div>
            ),
            key: `${key}-${id}`,
          }
        }),
      }
    })
  }, [trees])
  
  return 
  <>
    <Tree
        showIcon
        defaultExpandParent={true}
        autoExpandParent={true}
        defaultExpandAll={true}
        expandedKeys={[...expandedKeys]}
        selectedKeys={[treeSelectedKeys]}
        switcherIcon={<DownOutlined />}
        treeData={treeData}
        onExpand={onExpand}
        onSelect={onSelect}
    />
  </>
}
```                  

不论你使用类组件还是函数式组件，都可以采用相同的方式来阻止事件冒泡，使 React 中的事件处理非常一致和灵活。
举一反三，当然还可以使用 `e.preventDefault()` 方法来阻止事件默认行为。

---

欢迎访问：[天问博客](https://tiven.cn/p/a5933870/ "天问博客-专注于大前端技术")

