![Lego web-components JS lib](./assets/lego.svg)

[![CircleCI ](https://circleci.com/gh/vinyll/lego/tree/master.svg?style=shield)](https://circleci.com/gh/vinyll/lego/tree/master)


# LEGO: Modern Web-Components


LEGO (_Lightweight Embedded Gluten-free Objects_) is a thin layer to build web-component bricks that are easy to digest for your browser.

Lego is inspired from great libraries such as [Riot](https://riot.js.org/), [VueJS](https://vuejs.org) or [Polymer](https://www.polymer-project.org/). It's just much lighter with no complexity, easier to read code, maintain and interact with the source.


## Quick start

Create an element:

__components/user-profile.html__

```html
<template>
  <h1>${ this.state.firstName } ${ this.state.lastName }'s profile</h1>
  <p>Welcome ${ this.state.firstName }!</p>
  <p :if="this.state.registered">You are fully registered</p>
  <button :if="!this.state.registered" on:click="this.register">Register now</button>
</template>

<script>
  this.setState({
    firstName: 'John',
    lastName: 'Doe',
    registered: false
  })

  this.register = () => {
    this.state.registered = true
    this.render()  // update the interface
  }
</script>
```

Then include it in your page:

_index.html_

```html
<user-profile></user-profile>
<script src="./dist.js" type="module"></script>
```

Now you need to compile your components into a js file:

```sh
npx lego ./components/ ./dist.js
```

That will read all HTML components from _./components_ and create a _dist.js_ file.

> When developing you may want to automatically recompile components on change (_aka_ watch files changes).
> In that case pass the `-w` flag: `npx lego -w ./components/ ./dist.js`

> Trick: you probably want to store this task with a shortcut like `npm run watch`.
> To do so just add `lego -w ./components/ ./dist.js` in you _package.json_ scripts.


## Writing a component

A component can optionnaly have 3 parts: some HTML in a `<template>` tag, some JavaScript
in a `<script>` tag and some CSS in a `<style>` tag.

### Template tag

A template is written within a `<template>` tag.

It's just HTML with some empowerments for reactiveness.

These superpowers can be recognized with their `:` prefix.

> Note that these tags are interpreted and removed. You can't read them with CSS or script.

#### `:if`

Conditionally display a tag and its descendants.

Example: `<p :if="this.state.count < 5">Less than 5</p>` will be displayed if the condition is met.

#### `:for`

Repeat a tag reading from a variable.
The syntax is as follow: `:for="item in this.state.items"`.
The _item_ value will be available trough `this.item` within the loop.

Example: `<li :for="attendee in this.state.attendees">${ this.attendee }</li>` with a state as
`this.setState({ attendees: ['John', 'Mary'] })` will display `<li>John</li><li>Mary</li>`

#### Boolean attributes

[Boolean attributes](https://www.w3.org/TR/html5/infrastructure.html#sec-boolean-attributes)
like `required`, `checked`, `selected`, `disabled`, … are interpreted with a simple `:` prefix.

Example: `<input type=checkbox :checked="this.state.agreed" :required="this.state.mustAgree">`.
With the following state: `this.setState({ agreed: false, mustAgree: true })` would render
`<input type=checkbox required="required">`.

#### Event listener

An event can be attached to a _DOM_ element with the prefix `on:` and the event name.

Example: `<button on:click="this.clicked">Click me</button>` will call the `this.clicked`
method in the component.

#### Slots

[Slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) are part of the
native web-component.
Because Lego build native web-components, you can use the standard _slots_.

Example:

__index.html__
```html
<user-profile>
  <span>This user is in Paris</span>
<user-profile>
```

__components/user-profile.html__
```html
<template>
  <h1>User profile</h1>
  <p>important information: <slot></slot></p>
</template>
```

Will write `…<p>important information: <span>This user is in Paris</span></p>`



### Script tag

The `<script>` tag contains HTML that will be injected into the component on initialisation.

It can provide information to the template via the `state` object.
Example: `this.state.userName = 'John'` will permit to render `<p>Hello ${ John }</p>`.


#### Rendering

_Rendering_ is calculating the template tag and displaying it.
It is processed with the `render()` method.

Most of the time when you change the `state`, you probably then want to call `this.render()`
in order to update your HTML with the new `state` value(s).

Note that you can also pass the state as an object to the `render` method:
`this.render({ userName: 'John' })`.

In other words, calling `this.render()` is the way to update your component!


#### Binding event methods

`on:eventName` will bind the _eventName_ to the _DOM_ object and trigger the method.

In most cases you will want to bind that event with a call to a script function.

Example:

```html
<template>
  <button on:click="this.clicked">Click me</button>
</template>
<script>
  this.clicked = () => {
    alert('you clicked the button!')
  }
</script>
```

The events are native HTML. Meaning you can call `on:click`, `on:change`, `on:submit`, …

Behind the scene, it creates an `addEventListener(eventName)`, meaning you can use the
native browser debug, remove events and play with the full power of native events!


### Style tag

CSS is much more fun when it's scoped.
Here it come with the web-components.

Here again, no trick or magic, though the full power of web-components and scoping.

Writing CSS is as easy as

```html
<template>
  <h1>Bonjour!</h1>
</template>
<style>
  h1 {
    padding: 1rem;
    text-align: center;
  }
</style>
```

#### Host

[`:host` is a native selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:host())
for web-components.
It allows to select the current component itself.

#### Variables

You can use variables in your CSS just like in your templates.

Example:
```html
<template>
  <h1>Bonjour<h1>
</template>
<script>
  this.state.color = '#357';
</script>
<style>
  h1 {
    color: ${ this.state.color };
  }
</style>
```

will apply the `#357` color onto `h1`.


## Compiling

```sh
npx lego <source_path> <target_file_path>
```

Would compile the _source_path_ file or folder (recursively) into _target_file_path_ js file.

As mentioned before, when developing you probably want to watch for changes with the `-w`
option: `npx lego -w <source_path> <target_file_path>`


**source_path**: either a file or a directory (relative or absolute). If it's a directory, it will recursively read all the _.html_ files and compile them into the _target_file_.

**target_file_path**: (default: _components.js_) the path (relative or absolute) to a _.js_ file.
That file will be created and contain all the components.

## Testing

## Running tests [![CircleCI](https://circleci.com/gh/vinyll/lego/tree/master.svg?style=svg)](https://circleci.com/gh/vinyll/lego/tree/master)

Just install node dev dependencies (`npm install`) and run the tests (`npm test`).


## Under the hood


### Native web-components

Because Lego is actual native web-components, all its native possibilities (like [slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#Adding_flexibility_with_slots)),
[:host](https://developer.mozilla.org/en-US/docs/Web/CSS/:host)
and whatever exists or will exist are on board.


### Browser compatibility

Lego is based on native _customElements_.
[Support for customElement is spreading](https://caniuse.com/#feat=custom-elementsv1) and
shall increase in time.

When building a web-app you may have control of the browsers.
If you're building a more general website you may need to increase the overall browser
compatibility and install the [custom-element polyfill](https://github.com/webcomponents/custom-elements).


### Dependencies

It is still fully compatible with native _custom elements_. No magic behind the scene,
no complexity, just a couple of useful methods to write native web-components easier.

Using a compiled component has no dependency, nothing extra injected in the browser.
Compiling depends on [jsdom](https://www.npmjs.com/package/jsdom).
