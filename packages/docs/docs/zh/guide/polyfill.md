#

> IE11

## css
cssflex

> .

## script
es6+api String.prototype.includes api

#### 1 Babel
 babel runtimecore-js@3 useBuiltIns **vue-cli **
> babel  `node_modules`   `babel include`  `node_modules/@snema/vue-json-schema-form`

*  vue-cli   [transpileDependencies](https://cli.vuejs.org/zh/config/#transpiledependencies)

```js
{
    transpileDependencies: [
        '@snema/vue-json-schema-form' // +
    ]
},
```

* babel-loader
```js
{
    test: /\.js$/
    loader: 'babel-loader',
    include: [
        path.resolve(__dirname,'../src'),
        path.resolve(__dirname,'../node_modules/@snema/vue-json-schema-form') // +
    ]
}
```

:::tip

:::

#### 2 polyfill
 useBuiltIns  polyfill api @babel/polyfillpolyfill.

>
>
>
>* polyfill
>* [@snema/polyfill](https://github.com/lljj-x/polyfill)

```js
//  @babel/polyfill
import "@babel/polyfill";
```

::: tip
apipolyfill

 `core-js`

```js
//  Promise
import 'core-js/modules/es6.promise';
```
:::

