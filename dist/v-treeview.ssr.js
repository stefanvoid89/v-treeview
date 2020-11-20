'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}var globalMixin = {
  data: function data() {
    return {
      icons: {
        arrow_down: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>',
        arrow_rigth: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>'
      }
    };
  }
};//
var script = {
  name: "v-treeview-node",
  mixins: [globalMixin],
  props: {
    item: Object,
    selectedItem: Object
  },
  data: function data() {
    return {
      showChildren: true,
      selected: false
    };
  },
  methods: {
    toggleChildren: function toggleChildren() {
      this.showChildren = !this.showChildren;
    },
    selectItem: function selectItem() {
      if (!this.item.nodes || !this.item.nodes.length) {
        this.$emit("selected-item", {
          selectedItem: this.item,
          selected: this.selected
        });
      }
    },
    onSelectItem: function onSelectItem(_ref) {
      var selectedItem = _ref.selectedItem,
          selected = _ref.selected;
      this.$emit("selected-item", {
        selectedItem: selectedItem,
        selected: selected
      });
    }
  },
  watch: {
    selectedItem: function selectedItem() {
      if (this.selectedItem.index === this.item.index) {
        this.selected = !this.selected;
      } else this.selected = false;
    }
  },
  computed: {
    hasLeftPadding: function hasLeftPadding() {
      if (!this.item.nodes || !this.item.nodes.length) {
        return true;
      }

      return false;
    },
    getIcon: function getIcon() {
      return this.showChildren ? this.icons.arrow_down : this.icons.arrow_rigth;
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<div" + _vm._ssrClass(null, ['v-treeview-node-body', {
    'v-treeview-node-body-selected': _vm.selected
  }]) + ">" + (_vm.item.nodes && _vm.item.nodes.length ? "<div>" + _vm._s(_vm.getIcon) + "</div>" : "<!---->") + " <div" + _vm._ssrClass(null, ['v-treeview-node-name', {
    'v-treeview-node-name-left-padding': _vm.hasLeftPadding
  }]) + ">" + _vm._ssrEscape(_vm._s(_vm.item.label)) + "</div></div> "), _vm.item.nodes ? _vm._ssrNode("<div" + _vm._ssrStyle(null, null, {
    display: _vm.showChildren ? '' : 'none'
  }) + ">", "</div>", _vm._l(_vm.item.nodes, function (item, index) {
    return _c('v-treeview-node', {
      key: index,
      staticClass: "v-treeview-node-leaf",
      attrs: {
        "item": item,
        "selectedItem": _vm.selectedItem
      },
      on: {
        "selected-item": _vm.onSelectItem
      }
    });
  }), 1) : _vm._e()], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-4cedb8bf_0", {
    source: ".v-treeview-node-body{display:flex;text-align:center;height:1.5rem;padding-left:100%;margin-left:-100%}.v-treeview-node-icon{display:flex;align-items:center;margin-left:.5rem;color:#cbd5e0}.v-treeview-node-name{display:flex;font-size:.875rem;margin-left:.5rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;align-items:center;justify-content:center}.v-treeview-node-name-left-padding{padding-left:1.5rem}.v-treeview-node-leaf{padding-left:1.25rem}.v-treeview-node-body-selected{background:#0073ac;color:#fff}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-4cedb8bf";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);var script$1 = {
  components: {
    VTreeviewNode: __vue_component__
  },
  props: {
    propItems: Array
  },
  data: function data() {
    return {
      items: [],
      selectedItem: {},
      counter: 0
    };
  },
  created: function created() {
    this.items = this.recursiveMap(this.propItems);
  },
  methods: {
    recursiveMap: function recursiveMap(nodes) {
      var _this = this;

      return nodes.map(function (node) {
        if (node.nodes && node.nodes.length) return _objectSpread2(_objectSpread2({}, node), {}, {
          nodes: _this.recursiveMap(node.nodes),
          selected: false,
          index: _this.counter++
        });else return _objectSpread2(_objectSpread2({}, node), {}, {
          selected: false,
          index: _this.counter++
        });
      });
    },
    onSelectItem: function onSelectItem(_ref) {
      var selectedItem = _ref.selectedItem,
          selected = _ref.selected;
      if (!selected) this.selectedItem = _objectSpread2({}, selectedItem);else this.selectedItem = {};
      this.$emit("selected-item", this.selectedItem);
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "v-treeview-container"
  }, _vm._l(_vm.items, function (item, index) {
    return _c('v-treeview-node', {
      key: index,
      attrs: {
        "item": item,
        "selectedItem": _vm.selectedItem
      },
      on: {
        "selected-item": _vm.onSelectItem
      }
    });
  }), 1);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-0c88b7bc_0", {
    source: ".v-treeview-container{background-image:repeating-linear-gradient(0deg,#cde4f582,#cde4f582 1.5rem,#fff 1.5rem,#fff 3rem)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-0c88b7bc";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installVTreeview(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VTreeview', __vue_component__$1);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$1.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__$1;