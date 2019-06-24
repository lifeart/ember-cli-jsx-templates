ember-cli-jsx-templates
==============================================================================

[![Greenkeeper badge](https://badges.greenkeeper.io/lifeart/ember-cli-jsx-templates.svg)](https://greenkeeper.io/)

This addon allow use `.jsx/.tsx` syntaxis for templates.

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-jsx-templates
```


Usage
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
<MyComponent attr-name="foo" value={42} onChange={action("update")} />
```
will be compiled into:
```hbs
<MyComponent name="foo" @value={{42}} @onChange={{action "update"}} />
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
All supported cases: [lifeart/ember-meta-explorer/test/utils/jsx-caster.test.js](https://github.com/lifeart/ember-meta-explorer/blob/master/test/utils/jsx-caster.test.js)


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
