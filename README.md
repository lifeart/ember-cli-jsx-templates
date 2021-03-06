ember-cli-jsx-templates
==============================================================================

[![Greenkeeper badge](https://badges.greenkeeper.io/lifeart/ember-cli-jsx-templates.svg)](https://greenkeeper.io/)

This addon allow use `.jsx/.tsx` syntaxis for templates.

---

__q__: _Why?_

__a__: If you came from React, or want to "touch" JSX in Ember with an easy way, this is for you!

---

__q__: _Can I use typings? Component types for autocomplete?_

__a__: Yes! You can create `.tsx` template and import any typings into it.

---

__q__: _How it's working?_

__a__: Addon perform `.jsx` to `JSX-AST` transform, after we transform `JSX-AST` into `HBS-AST` and after we compile template from valid handlebars `AST`.

---

__q__: _Is it Turing complete  transpilation?_

__a__: Nope, and never planned to be, all supported cases described in [jsx-caster tests](https://github.com/lifeart/ember-meta-explorer/blob/master/test/utils/jsx-caster.test.js) and [jsx-extractor tests](https://github.com/lifeart/ember-meta-explorer/blob/master/test/utils/jsx-extractor.test.js)

---
__q__: _If I spend some time, playing this addon, can I revert created `jsx` into `hbs`?_

__a__: Yes, if you played enough with `jsx` you able to convert template to hbs using `ember-meta-explorer` __extractJSXComponents__ method.

---

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-jsx-templates
```


Usage
------------------------------------------------------------------------------

template-only usecase
```jsx
// app/templates/components/my-functional-component
export default function MyFunctionalComponent({name, onChange}) {
 const inputPrefix = 'New name:';
 return (
   <>
   <h1>JSX templates for Ember!</h1>
   <p>Hello, {name}!</p><br />
   {inputPrefix}: <input class="my-input" value={name} onkeyup={onChange}/>
   </>
 )
}
```

any ember component + template usecase (with this):

```js
// app/components/my-functional-component
import Component from '@ember/component';
export default class MyComponent extends Component {
    inputPrefix = "Nemo";
    onChange(e) {
        this.set('inputPrefix', e.target.value);
    }    
}
```
and
```jsx
// app/templates/components/my-functional-component
export default function MyFunctionalComponent() {
    return (
      <>
      <h1>JSX templates for Ember!</h1>
      <p>Hello, {this.inputPrefix}!</p><br />
      Update: <input class="my-input" value={name} onkeyup={action(this.onChange)}/>
      </>
    )
}
```

------------------------------------------------------------------------------

basic usage:
```jsx
// app/templates/components/my-component.jsx
<div attributes>{3 + 2} { props.children } { name } { props.external }</div>
```
will be compiled into:
```hbs
<div ...attributes> {{add 3 2}} {{yield}} {{this.name}} {{@external}}></div>
```
---
jsx for ember components:
```jsx
<MyComponent attr-name="foo" value={42} data-test-name="item" onChange={action("update")} />
```
will be compiled into:
```hbs
<MyComponent name="foo" @value={{42}} data-test-name="item" @onChange={{action "update"}} />
```
---
jsx having modifier:
```jsx
<div mod-style={{color:"#face8d", ["font-size"]: "12px"}}></div>
// named arguments for modifiers not supported
```
will be compiled into:
```hbs
<div {{style (hash color="#face8d" font-size= "12px")}}></div>
```
---
access to component's yielded context:
```jsx
<MyComponent as={ctx, param}>{ctx.name} {param}</MyComponent>
```
will be compiled into:
```hbs
<MyComponent as |ctx param|>{{ctx.name}} {{param}}</MyComponent>
```
---
yield with params:
```jsx
<div>{yield(name, {foo:1})}</div>
```
will be compiled into:
```hbs
<div>{{yield name (hash foo=1)}}</div>
```
---
`.tsx` template, with typings & autocomplete:
```tsx
import { FooProp } from "./../../typings";
export default function TypedHello(props: FooProp) {
    return <h1>This is typed template! And name is: {props.name}</h1>
}
```
will be compiled into:
```hbs
<h1>This is typed template! And name is: {{@name}}</h1>
```
---
subtemplates declaration:
```jsx
export function MyComponent() {
  const localTemplate = <h1>Hello!</h1>
  return <div>{localTemplate}</div>
}
```
will be compiled into:
```hbs
<div><h1>Hello!</h1></div>
```
---

### How convert JSX back to HBS and save it?

Following blueprint created to convert any `.jsx/.tsx` file into `.hbs` template.

```
ember g jsx-template-to-hbs app/templates/components/hello-world.jsx

options:
   no-remove - no remove jsx/tsx source
   no-write  - no wite converted output
   no-rewrite - no rewrite template file if already exists
   new-path:"app/templates/components/original.hbs" - new template file name
```

---

### Can I convert HBS back to JSX? - nope

---
All supported cases: [lifeart/ember-meta-explorer/test/utils/jsx-caster.test.js](https://github.com/lifeart/ember-meta-explorer/blob/master/test/utils/jsx-caster.test.js)


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
