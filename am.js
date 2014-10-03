/*! am.js (0.0.2). (C) 2014 Oliver Jean Eifler. MIT @license: en.wikipedia.org/wiki/MIT_License
a javascript library for using attributes and their values rather than classes for styling HTML elements.
based on Attribute Modules for CSS - Specification: github.com/amcss/attribute-module-specification
*/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory(root));
    } else if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(root);
    }
    else {
        // Browser globals
        factory(root);
    }
}(this, function (root) {

  //private variables
  var vars = {ver:"0.0.2"};
  var self = this;
  var known = Array('onmsanimationiteration','onbeforeeditfocus','aria-haspopup','onbeforeactivate','onbeforepaste','oncopy','onmouseleave','ondragstart','onmsanimationend','ondatasetcomplete','aria-required','aria-expanded','onscroll','onrowsdelete','aria-grabbed','onmouseup','onbeforecut','implementation','onclick','spellcheck','onmoveend','role','aria-disabled','tabIndex','aria-label','lang','onkeypress','aria-valuenow','aria-checked','onmstransitionstart','onlayoutcomplete','onmsanimationstart','aria-busy','onmouseover','onfocusin','onmsmanipulationstatechanged','onrowenter','aria-describedby','ondblclick','onmove','aria-flowto','onpage','dataFormatAs','onmstransitionend','ondragleave','ondragend','aria-orientation','aria-multiline','onresize','onmouseenter','onresizeend','onmousemove','onresizestart','onerrorupdate','aria-secret','onkeyup','aria-hidden','onbeforedeactivate','onmousedown','aria-pressed','oncut','onrowsinserted','oncellchange','aria-readonly','onfocus','aria-posinset','dataSrc','onmouseout','disabled','aria-selected','aria-dropeffect','ondragover','x-ms-aria-flowfrom','onrowexit','onfilterchange','aria-controls','onfocusout','aria-relevant','x-ms-acceleratorkey','aria-level','onblur','ondragenter','aria-setsize','ondrag','id','title','ondataavailable','aria-live','aria-valuetext','onpropertychange','aria-multiselectable','onreadystatechange','aria-sort','class','aria-invalid','onselectstart','aria-autocomplete','onpaste','onhelp','ondeactivate','hideFocus','onbeforeupdate','contentEditable','onafterupdate','onkeydown','aria-valuemin','language','style','oncontrolselect','oncontextmenu','aria-valuemax','dir','aria-activedescendant','onbeforecopy','onmovestart','onactivate','oninvalid','oncuechange','onlosecapture','ondatasetchanged','ondrop','accessKey','aria-owns','aria-atomic','aria-labelledby','dataFld','onmousewheel','align','nofocusrect','noWrap');
  /* private helper functions */
  var _isBlank = function(str) {
    return (str.length === 0 || !/[^\s]+/.test(str));
  };
  var _toArray = function(values)
  {
    if (typeof values === 'string' && !_isBlank(values))
        return _cleanArray(values.trim().split(/\s*\s\s*/));
    else if(Array.isArray(values))
        return _cleanArray(values);
    else
        return [];
  }
  var _cleanArray = function(array)
  {
    var v = [];
    for (var i = 0, n = array.length; i < n; i++)
    {
        if (typeof array[i]==='string' && !_isBlank(array[i]))
            v.push(array[i].trim());
    }
    return v;
  }

  //check if refresh is needed
  var refreshTest = /*private*/function()
  {
    //create stylesheet
    var css = '[wurstl] {height:100px;} [wurstl~=test] {height:200px;}',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
    //create test div
    vars.refresh = true;
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.width = "100px";
    div.style.left = "-100px";
    div.style.zIndex = -1;
    div = document.body.appendChild(div);
    var height = div.clientHeight;
    div.setAttribute("wurstl","");
    if (height != div.clientHeight)
    {
        height = div.clientHeight;
        div.setAttribute("wurstl","test");
        vars.refresh = (height == div.clientHeight);
    }
    document.body.removeChild(div);
    head.removeChild(style);
    return vars.refresh;

  }
  //forced refresh
  var refresh_force = function(el)
  {
    el.className = el.className;
  }
  // auto refresh
  var refresh_auto = function(el) {}
  //The REFRESH function
  self.refresh = function(el)
  {
        if (refreshTest()) //on first call check if refresh is needed
        {
            refresh_force(el); //do it
            self.refresh = refresh_force; //modify the refresh function to use forced refresh
        }
        else
            self.refresh = refresh_auto; //modify the refresh function to use auto refresh

  }

  //private Module functions
  var getAllModules = function(el)
  {
    var mods=[];
    for (var i = 0, atts = el.attributes, n = atts.length; i < n; i++)
    {
        if (known.indexOf(atts[i].nodeName) === -1)
            mods.push(atts[i].nodeName);
    }
    return mods;
  }
  var hasModule = (!window.Element || typeof Element.hasAttribute !== 'function') ?
    function(el,module)
    {
      return (el.attributes!==undefined && el.attributes[module]!==undefined);
    }
    :function(el,module)
    {
      return el.hasAttribute(module);
    }

  var getModule = function(el,module)
  {
    var rc=[];
    if (hasModule(el,module))
        rc= _toArray(el.getAttribute(module));
    return rc;
  }
  var setModule = function(el,module,values)
  {
        return _setModule(el,module,_toArray(values));
  }
  var _setModule = function(el,module,array)
  {
    el.setAttribute(module,array.join(" "));
    self.refresh(el);
    return hasModule(el,module);
  }

  var removeModule = function(el,module)
  {
    if (hasModule(el,module))
    {
        el.removeAttribute(module);
        self.refresh(el);
    }
    return !hasModule(el,module);
  }
  var _toggleModule = function(el,module)
  {
    if (hasModule(el,module))
    {
        var val = el.getAttribute(module);
        el.removeAttribute(module);
        el.setAttribute("_"+module,val);
    }
    else if (hasModule(el,"_"+module))
    {
        var val = el.getAttribute("_"+module);
        el.removeAttribute("_"+module);
        el.setAttribute(module,val);
    }
    else
    {
        el.setAttribute(module,"");
    }
  }
  var toggleModule = function(el,module)
  {
        module = _toArray(module);
        if (module.length === 0)
            return false;
        for (var i = 0, n = module.length; i < n; i++)
            _toggleModule(el,module[i]);
        self.refresh(el);
  }

  //private functions for Module Values
  var hasModuleValue = function(el,module,value)
  {
        var v = getModule(el,module);
        if (v.length === 0)
            return false;
        value = _toArray(value);
        if (value.length == 0)
            return false;
        for (var i = 0, n = value.length; i < n; i++)
        {
            if (v.indexOf(value[i])===-1)
                return false;
        }
        return true;
  }
  var setModuleValue = function(el,module,value)
  {
        var v = getModule(el,module)
           ,update = !hasModule(el,module);
        value = _toArray(value);
        for (var i = 0,n = value.length; i < n; i++)
        {
            if (v.indexOf(value[i])===-1)
            {
                v.push(value[i]);
                update = true;
            }
        }
        if (update)
            _setModule(el,module,_cleanArray(v));
        return true;
  }
var removeModuleValue = function(el,module,value)
  {
        if (!hasModule(el,module))
            return false;

        var v = getModule(el,module)
           ,update = false;
        value = _toArray(value);
        for (var i = 0,n = value.length; i < n; i++)
        {
            var idx = v.indexOf(value[i]);
            if (idx !==-1)
            {
                v[idx]=false;
                update = true;
            }
        }
        if (update)
            _setModule(el,module,_cleanArray(v));
        return true;
  }
  var toggleModuleValue = function(el,module,value)
  {
        if (!hasModule(el,module))
            return false;

        var v = getModule(el,module)
           ,update = false;
        value = _toArray(value);
        for (var i = 0,n = value.length; i < n; i++)
        {
            var idx = v.indexOf(value[i]);
            if (idx !==-1)
            {
                v[idx]=false;
                update = true;
            }
            else
            {
                v.push(value[i]);
                update = true;
            }

        }
        if (update)
            _setModule(el,module,_cleanArray(v));
        return true;
  }
    /* am base. */
    var am = function (element) {
        return new am.fn.init(element);
    };
    /*standalone functions*/
    am.getVersion = function() {return vars.ver;}
    am.useForcedRefresh = function() {return vars.refresh;}
    am.getAllModules = getAllModules;
    am.hasModule = hasModule;
    am.getModule = getModule;
    am.setModule = setModule;
    am.removeModule = removeModule;
    am.toggleModule = toggleModule;
    am.hasModuleValue = hasModuleValue;
    am.setModuleValue = setModuleValue;
    am.removeModuleValue = removeModuleValue;
    am.toggleModuleValue = toggleModuleValue;

    /* chainable public am(element) like jQuery but only one Element wrapped*/
    am.fn = am.prototype = {
        init: function (element) {
            if (element.nodeType) {
                this[0] = element;
                return this;
            } else {
                throw new Error("Not a DOM node.");
            }
        },
        get: function(module) {return getModule(this[0],module);},
        has: function(module) {return hasModule(this[0],module);},
        set: function(module,values) {setModule(this[0],module,values);return this;},
        toggle: function(module) {toggleModule(this[0],module);return this;},
        remove: function(module) {removeModule(this[0],module);return this;},
        hasVal: function(module,values) {return hasModuleValue(this[0],module,values);},
        setVal: function(module,values) {setModuleValue(this[0],module,values);return this;},
        removeVal: function(module,values) {removeModuleValue(this[0],module,values);return this;},
        toggleVal: function(module,values) {toggleModuleValue(this[0],module,values);return this;},
        getModules: function() {return getAllModules(this[0]);}
    }
  /* Makes am(node) possible, without having to call init. */
 am.fn.init.prototype = am.fn;
 /* make am global as  $am */
 root.$am = am;
 return am;
 }));
