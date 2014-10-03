# am.js
a javascript library for using attributes and their values rather than classes for styling HTML elements.


Based on **AMCSS** Attribute Modules for CSS - Specification <a href="github.com/amcss/attribute-module-specification">github.com/amcss/attribute-module-specification</a>.

** Works on all browsers which supports attribute and ~= selectors **

--------------------------------------------------------

## Installation
 <script src="am.js"></script>

On older browsers which don't support Array.IsArray and Array.indexOf include es5-shim <a href="https://github.com/es-shims/es5-shim">github.com/es-shims/es5-shim</a> before am.js

## some Issues:
* works only on browsers which supports attribute and ~= selectors (no IE6 and below)
* module names are case sensitive on IE only.
* value names are case sensitive everywhere.
* strange results on ie7 if you use module-names with seperator as mentioned in <a href="github.com/amcss/attribute-module-specification">specification</a>.
If you want to support IE7 dont use seperators in module-names (i.e. am-Button => amButton)

--------------------------------------------------------

# API:
## $am(element)
<code>$am(element)</code> gives you a new chainable am instance (like jQuery) containing the element.
 * `element` is a single DOM element

```js
var testam=$am(document.getElementById("test")); //get a new am instance
testam.setModule("am-Button"); //sets the module on #test
```
** Once you have a instance, you can call any of the $am methods on it.**

### .hasModule(module)
<code>.hasModule(module)</code> returns <code>true</code> if the element has the module or <code>false</code> if not.
 * `module` Modulename (string)

```html
    <div id="test" am-Button="green"></div>
```
```js
console.log(
    $am(document.getElementById("test"))
    .hasModule("am-Button")
    ); //logs true
console.log(
    $am(document.getElementById("test"))
    .hasModule("am-Grid")
    ); //logs false
```

### .getModules()
<code>.getModules()</code> returns a array with all modules (i.e. uncommon attribute names).

```html
    <div id="test" am-Button="green" am_Grid="1/3" title="Hallo"></div>
```
```js
console.log(
    $am(document.getElementById("test")).getModules()K
    ); //logs ["am-Button","am-Grid"]
```

### .setModule(module[,values])
<code>.setModule(module[,values])</code> add a module to a element and optional set its value. Module Values, if any, are saved between toggle
 * `module` Modulename (string)
 * `values` Values to set. Array of valuenames or string with one or more space-seperated value-names

```html
    <div id="test"></div>
    <div id="test2"></div>
    <div id="test3"></div>
```
```js
    $am(document.getElementById("test")).setModule("am-Button"); //<div id="test" am-Button=""></div>
    $am(document.getElementById("test2")).setModule("am-Button","green"); //<div id="test2" am-Button="green"></div>
    $am(document.getElementById("test3")).setModule("am-Button",["green","round","big"]); //<div id="test3" am-Button="green round big"></div>
    //same as
    $am(document.getElementById("test3")).setModule("am-Button","green round big");
```

### .removeModule(module)
<code>.removeModule(module)</code> remove a module from a element.
 * `module` Modulename (string)

```html
    <div id="test"></div>
```
```js
    $am(document.getElementById("test")).setModule("am-Button"); //<div id="test" am-Button=""></div>
    $am(document.getElementById("test")).setModule("am-Grid"); //<div id="test" am-Button="" am-Grid=""></div>
    $am(document.getElementById("test")).removeModule("am-Button"); //<div id="test" am-Button=""></div>
```

### .toggleModule(modules)
<code>.toggleModule(modules)</code> toggles (switch on/off) one or more modules of a element.
 * `modules` Modules to toggle. Array of module-names or string with one or more space-seperated module-names

```html
    <div id="test" am-Button="round"></div>
```
```js
    $am(document.getElementById("test")).toggleModule("am-Button"); //<div id="test"></div>
    $am(document.getElementById("test")).toggleModule("am-Button"); //<div id="test" am-Button="round"></div>
```

### .getModule(module)
<code>.getModule(module)</code> returns array of value-names if module is set or empty array.
 * `module` Modulename (string)

```html
    <div id="test" am-Button="round green"></div>
```
```js
    $am(document.getElementById("test")).getModule("am-Button"); //returns ["round","green"]
    $am(document.getElementById("test")).getModule("am-Grid"); //returns []
```

### .setVal(module,values)
<code>.setVal(module,values)</code> Add one or more values to a module. Create the Module if it dosn't exists'
 * `module` Modulename (string)
 * `values` Values to set. Array of valuenames or string with one or more space-seperated value-names

```html
    <div id="test" am-Button="round"></div>
```
```js
    $am(document.getElementById("test")).setVal("am-Button","big"); //<div id="test" am-Button="round big"></div>
    $am(document.getElementById("test")).setVal("am-Grid","1/3"); //<div id="test" am-Button="round big" am-Grid="1/3"></div>
```

### .hasVal(module,values)
<code>.setVal(module,values)</code> returns **true** if all values exists, otherwith **false**
 * `module` Modulename (string)
 * `values` Values to check. Array of valuenames or string with one or more space-seperated value-names

```html
    <div id="test" am-Button="round"></div>
```
```js
    $am(document.getElementById("test")).hasVal("am-Button","big"); //returns false
    $am(document.getElementById("test")).hasVal("am-Grid","round"); //returns true;
    $am(document.getElementById("test")).hasVal("am-Grid","round big"); //returns false;

```

### .removeVal(module,values)
<code>.removeVal(module,values)</code> Remove one or more values from a module.
 * `module` Modulename (string)
 * `values` Values to remove. Array of valuenames or string with one or more space-seperated value-names

```html
    <div id="test" am-Button="round"></div>
```
```js
    $am(document.getElementById("test")).setVal("am-Button","big"); //<div id="test" am-Button="round big"></div>
    $am(document.getElementById("test")).removeVal("am-Button","round"); //<div id="test" am-Button="big"></div>
    $am(document.getElementById("test")).removeVal("am-Button","big"); //<div id="test" am-Button=""></div>
```

### .toggleVal(module,values)
<code>.toggleVal(module,values)</code> Toggles (switch on/off) one or more values from a module.
 * `module` Modulename (string)
 * `values` Values to toggle. Array of valuenames or string with one or more space-seperated value-names

```html
    <div id="test" am-Button="round"></div>
```
```js
    $am(document.getElementById("test")).toggleVal("am-Button","round"); //<div id="test" am-Button=""></div>
    $am(document.getElementById("test")).removeVal("am-Button","big"); //<div id="test" am-Button="big"></div>
    $am(document.getElementById("test")).removeVal("am-Button","round big"); //<div id="test" am-Button="round"></div>
```
--------------------------------------------------------
## Other functions:
* <code>$am.getVersion()</code> returns version string
* <code>$am.useForcedRefresh()</code> returns **true** if elements are not automatically updated on module change
--------------------------------------------------------
## Licence
[MIT License](LICENSE). © Oliver Jean EIfler (olli.eifler@gmail.com).