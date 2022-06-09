# Any-Message

<!-- <p align="center">
  <a href="https://circleci.com/gh/vuejs/vue/tree/dev"><img src="https://img.shields.io/circleci/project/github/vuejs/vue/dev.svg?sanitize=true" alt="Build Status"></a>
  <a href="https://codecov.io/github/vuejs/vue?branch=dev"><img src="https://img.shields.io/codecov/c/github/vuejs/vue/dev.svg?sanitize=true" alt="Coverage Status"></a>
  <a href="https://npmcharts.com/compare/vue?minimal=true"><img src="https://img.shields.io/npm/dm/vue.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/v/vue.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/l/vue.svg?sanitize=true" alt="License"></a>
  <a href="https://chat.vuejs.org/"><img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg?sanitize=true" alt="Chat"></a>
</p> -->

## Introduction

The message prompts, using the native DOM rendering mechanism, dynamically creates styles to complete the rendering, and automatically recycles when the execution ends. It is independent of any framework and can be migrated for use.

## When to use

- Can provide success, warning, error, loading, etc. feedback
- The top is displayed in the center and disappears automatically. It is a lightweight prompt method that does not interrupt the user's operation.

## Demo

`yarn && yarn dev`

or

`npm install && npm run dev`

## Use

`yarn add any-message` or `npm install any-message`

## API

The component provides some static methods, the usage methods and parameters are as follows：

- ```message.success(content,[duration],[params])```
- ```message.error(content,[duration],[params])```
- ```message.warn(content,[duration],[params])```
- ```message.info(content,[duration],[params])```
- ```message.loading(content,[duration],[params])```

| parameter | illustrate | type | default | required |
| --------- | --------- | --------- | --------- | --------- |
|  content  | The prompt content to be displayed  | ```string \| HTMLElement``` | - | true |
| duration  | Display how long to close, pass a number less than 0 will not close | ```number```  | 3 | false |
|  params   | Additional configuration parameters, see config for details      | ```Object``` | - | false |

In addition, you can also use the method of object passing parameters to use：

- ```message.success(config)```
- ```message.error(config)```
- ```message.warn(config)```
- ```message.info(config)```
- ```message.loading(config)```

```config```The object properties are as follows:

| parameter | illustrate | type | default | required |
| --------- | --------- | --------- | --------- | --------- |
| className | Customize CSS class | ```string``` | - | false |
| icon | Set icon type or custom icon | ```IconType``` | - | false |
| onClick | The callback event after the message box is clicked | ```Function``` | - | false |
| onClose | Callback event after a single message is closed | ```Function``` | - | false |
| key | Specifies a unique key for a unique message, which can be used for single update and close operations | ```string``` | - | false |
| style | Inline styles for custom messages | ```CSSStyleDeclaration``` | - | false |
| maxCount | The maximum number of message boxes displayed at the same time, more than that will be closed from the top | ```number``` | Infinity | false |
| content | The prompt information that needs to be displayed. It takes effect when the parameter is passed as an object. | ```string \| HTMLElement``` | - | true |
| duration | Display how long it will take to close, the number less than 0 will not be closed, and it will take effect when the parameter is passed as an object. | ```number``` | 3 | false |

```IconType```The object properties are as follows:

| parameter | illustrate | type | default | required |
| --------- | --------- | --------- | --------- | --------- |
| type | Icon type, optional built-in styles | ```info \| warn \| error \| success \| loading``` | - | false |
| show | whether to show the icon | ```boolean``` | - | false |
| custom | custom icon | ```string``` | - | false |

Support global unified configuration, but calling related methods has higher priority：

- ```message.config(config)```


The component also provides a destroy method：

- ```message.destroy([id])```


<!-- ## Contribution

<a href="https://github.com/vlinr/any-message/graphs/contributors"><img src="https://opencollective.com/any-message/contributors.svg?width=890" /></a> -->
