# summative-3-web-graphic-store
Yoobee Application Development assignment, Web graphic store

# To Run localy

Donwload or clone. Run `npm i` for both the `frontend` and `backend` folders

If not given the needed backend secret then just ask. Create a `config.env` inside `backend/config` Add the given enviroment vairables given to you
To start the server, open `backend` in terminal and run `npm run dev`

To start the front end, open `frontend` in the terminal and run `npm run serve`


# JS Style Guide

- No semi colons
- Tabbed indentation
- Double quotes for strings

- Use camelcase when naming variables and functions
```javascript
function myFunction() {}
var myVar = "hello"
```

- Add a space after keywords
```javascript
    if (condition) { ... }
```

- Infix operators must be spaced
```javascript
var x = 2
var message = "hello, " + name + "!"
```

- Commas should have a space after them
```javascript
var list = [1, 2, 3, 4]
function greet (name, options) { ... }
```

- Keep else statements on the same line as their curly braces
```javascript
if (condition) {
  // ...
} else {
  // ...
}
```

- For multi-line if statements, use curly braces
```javascript
if (options.quiet !== true) {
  console.log('done')
}
```

- Multiple blank lines not allowed
```javascript
// ✗ avoid
var value = 'hello world'
 
 
console.log(value)
```

- Commas must be placed at the end of the current line
```javascript
var obj = {
  foo: "foo",
  bar: "bar"
}
```

- No space between function identifiers and their invocations
```javascript
console.log("hello")
```

- Constructor/Class names must begin with a capital letter
```javascript
function Animal() {}
var dog = new Animal()
```

- Use array literals instead of array constructors

```javascript
var nums = [1, 2, 3]
```

- Use a single import statement per module
```javascript
import { myFunc1, myFunc2 } from "module"
```

- Component names should always be multi-word, except for root App
```javascript
export default {
  name: "TodoItem"
  // ...
}
```

- Each component should be in its own file
```javascript
components/
|- TodoList.vue
|- TodoItem.vue
```

- Filenames of single-file components should be PascalCase
```javascript
components/
|- MyComponent.vue
```

- Child components that are tightly coupled with their parent should include the parent component name as a prefix.

```javascript
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

- Always use key with v-for
```javascript
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

- Never use v-if on the same element as v-for
```javascript
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

- For applications, styles in a top-level App component and in layout components may be global, but all other components should always be scoped
```javascript
<template>
  <button class="button button-close">X</button>
</template>

<!-- Using the `scoped` attribute -->
<style scoped>
.button 
  border: none
  border-radius: 2px

.button-close 
  background-color: red
  
</style>
```

- Self-closing components
```javascript
<MyComponent />
```

- Elements with multiple attributes should span multiple lines, with one attribute per line
```javascript
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
```

# Sass style guide

- Use the sass type

```javascript
// ✗ avoid
<style scoped lang="scss">
.button, #thing {
    color: red;
}
</style>

// Do
<style scoped lang="sass">
.button, #thing
    color: red
</style>
```

- Use tabs for indenting with sass, not spaces

```javascript
<style scoped lang="sass">
// ✗ avoid
.button, #thing
  color: red

//Do
.button, #thing
    color: red
</style>
```

- Keep all sass vairables and mixens inside dedacated folders

```javascript
lib/
|- vars.sass
|- mixens.scss
```

- Use .scss for mixens in the mixen file only

```javascript
lib/
|- vars.sass
|- mixens.scss
```

- Import the master var.sass file at the top of each style section

```javascript
<style scoped lang="sass">
import path/to/vars.sass
.button, #thing
    color: red
</style>
```

- Avoid global layouts for each page, instead add vairables to vars.sass
- Respect catergory sections added to vars.sass and mixens.scss
- Use camelcase when naming variables and mixens

```sass
//breakpoints
$small: 340px
$med: 10rem
...
//colors
$mainBlue: #432B
...
//Spasings
$mainPadding: 30px
...
```

- Comment out any mixens if you add them to mixens.scss

- Only import mixens.scss at the top of the style section if you are using them

