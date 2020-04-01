# Brick

> The minimalist reactive web-component

Brick is a thin layer to constructs [native webcomponents](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and make them [reactive](https://en.wikipedia.org/wiki/Reactive_programming).

Brick is:
- 👙 minimalist: 74 lines of readable code (non-optimised, uncompressed, no cheating)
- 🌱 low dependency: its single third-party is the minimalist [Petit-Dom](https://github.com/yelouafi/petit-dom) which itself has no dependency
- ♻️ reactive: updating the state recalculate the Virtual Dom when needed.
- 🚀 fast: using virtual dom through a thin layer makes it close to bare-metal.
- 💧 simple: that's [Vanilla](http://vanilla-js.com/), there isn't much to know, it's a raw class to extend; no magic ✨.

View the [demo](https://polight.github.io/brick/demo/) and [their source](https://github.com/Polight/lego/tree/master/demo) 🧪.

### Getting started

Here's a fully working example with no install.

Copy-paste the following in an HMTL file and run it in a browser:

```html
<hello-world name="earth">

<script type=module>
  import { h, Component } from '//unpkg.com/@polight/brick/lib'

  class HelloWorld extends Component {
    init() { this.state = { name: 'world' } }

    toggleName() { this.state.name = 'gaia' }

    get vdom() {
      return ({ state }) => [
        h('p', {}, `Hello ${state.name}`),
        h('button', { onclick: this.toggleName.bind(this) }, `toggle`),
      ]
    }
  }

  customElements.define('hello-world', HelloWorld)
</script>
```

There isn't much to explain, but let's detail a little:

- `<hello-world name="earth">` is a web-component. That's native. `name="earth"` will be sent to the component as `{ state: 'earth' }`
- `init() { this.state = { name: 'world' } }` declares the `state` with it's default values. Also, anything that is declared in the state—and only what is declared here—will be reactive
- `toggleName` is a custom method that will be called on click
- `get vdom()` is the property that should return a function reprenting your HTML. That function is itself called passing the `state` argument. It should returns a virtual-dom. If you know [virtual-dom](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060), [React](https://reactjs.org/) or [elm](https://elm-lang.org/), this writing will be familiar
- `customElements.define('hello-world', HelloWorld)` that's the native way in HTML to declare the web-component

If you'd rather write HTML in HTML and CSS in CSS rather than JavaScript and virtual-dom, checkout [Lego](https://github.com/polight/lego) that builds Bricks out of HTML web-components.

### Documentation

The best documentation is [reading the code](./lib/Component.js).

Because it constructs native webcomponents, all the native [web-components documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components) applies.
You can therefore use [slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/slot), disable or enable [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), the [`is` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-is) and other web-component or HTML capabilities.

In addition, a couple of extra tools are brought by Brick:

#### state

this object is made available to the virtual-dom (and CSS styles).
It can be reactive (when declared in the init) and can be updated by the app.

State is fed the following way:
1. declared in the `init()` with the default values
2. attributes of the element in the HTML will overwrite the defaults
3. changing values in the object or on the component attributes will update the values and re-render the component.

#### init()

You can initialize whatever you need here.
That's a convenient instance to declare your reactive `state` object.
When declaring your `state` here, it's properties will be made reactive.

#### vdom()

Must return a function that returns a string, an array or a `h()` instance.
The structure of `h()` takes 3 arguments:
`h(<html element (string)>, <attributes (object)>, <children (array, string, or h())>)`.

#### vstyle()

Same as `vdom()`, but returning a CSS style node.

```js
get vstyle() {
  return ({ state }) => h('style', {}, 'p{ color: red }')
}
```

#### connected()

A convenient method to call when the component is attached to the dom.

#### disconnected()

A convenient method to call when the component is removed from the dom.
