# Code Example Site

Created this as a quick way to display and execute javascript code examples. Also as a way to make a quick framework-less "app" demo.

You can view the app by cloning this repo and opening `index.html` in a browser

#### Examples

Add code example objects to `examples.js`

Give each example `title` and `execute` entries. `execute` should be a function to use in the example

You can add a `setup` function to add buttons or controls to the example page

Be sure to clean up any DOM artifacts created in a `cleanup` function

#### Navigation

In the `<nav>`, add a `<li>` with an id attribute that matches the entry in `examples.js`

Additionally, it should call selectExample(event) on click events

```javascript
<li id="simple_js_blocking" onclick="selectExample(event)">Basic JS Blocking</li>
```

#### Initialization

To set the initial active example, set the example variable at the top of `main.js` to the initial `examples.js` key
