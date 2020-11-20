var globalMixin = {
  data: function () {
    return {
      icons: {
        arrow_down: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>',
        arrow_rigth: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>'
      }
    };
  }
};

//
var script = {
  name: "v-treeview-node",
  mixins: [globalMixin],
  props: {
    item: Object,
    selectedItem: Object
  },
  data: function () {
    return {
      showChildren: true,
      selected: false
    };
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren;
    },

    selectItem() {
      if (!this.item.nodes || !this.item.nodes.length) {
        this.$emit("selected-item", {
          selectedItem: this.item,
          selected: this.selected
        });
      }
    },

    onSelectItem({
      selectedItem,
      selected
    }) {
      this.$emit("selected-item", {
        selectedItem,
        selected
      });
    }

  },
  watch: {
    selectedItem() {
      if (this.selectedItem.index === this.item.index) {
        this.selected = !this.selected;
      } else this.selected = false;
    }

  },
  computed: {
    hasLeftPadding() {
      if (!this.item.nodes || !this.item.nodes.length) {
        return true;
      }

      return false;
    },

    getIcon() {
      return this.showChildren ? this.icons.arrow_down : this.icons.arrow_rigth;
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('div', {
    class: ['v-treeview-node-body', {
      'v-treeview-node-body-selected': _vm.selected
    }],
    on: {
      "click": _vm.selectItem
    }
  }, [_vm.item.nodes && _vm.item.nodes.length ? _c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.getIcon)
    },
    on: {
      "click": _vm.toggleChildren
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    class: ['v-treeview-node-name', {
      'v-treeview-node-name-left-padding': _vm.hasLeftPadding
    }]
  }, [_vm._v(_vm._s(_vm.item.label))])]), _vm._v(" "), _vm.item.nodes ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showChildren,
      expression: "showChildren"
    }]
  }, _vm._l(_vm.item.nodes, function (item, index) {
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
  }), 1) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-4cedb8bf_0", {
    source: ".v-treeview-node-body{display:flex;text-align:center;height:1.5rem;padding-left:100%;margin-left:-100%}.v-treeview-node-icon{display:flex;align-items:center;margin-left:.5rem;color:#cbd5e0}.v-treeview-node-name{display:flex;font-size:.875rem;margin-left:.5rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;align-items:center;justify-content:center}.v-treeview-node-name-left-padding{padding-left:1.5rem}.v-treeview-node-leaf{padding-left:1.25rem}.v-treeview-node-body-selected{background:#0073ac;color:#fff}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

//
var script$1 = {
  components: {
    VTreeviewNode: __vue_component__
  },
  props: {
    propItems: Array
  },
  data: function () {
    return {
      items: [],
      selectedItem: {},
      counter: 0
    };
  },

  created() {
    this.items = this.recursiveMap(this.propItems);
  },

  methods: {
    recursiveMap(nodes) {
      return nodes.map(node => {
        if (node.nodes && node.nodes.length) return { ...node,
          nodes: this.recursiveMap(node.nodes),
          selected: false,
          index: this.counter++
        };else return { ...node,
          selected: false,
          index: this.counter++
        };
      });
    },

    onSelectItem({
      selectedItem,
      selected
    }) {
      if (!selected) this.selectedItem = { ...selectedItem
      };else this.selectedItem = {};
      this.$emit("selected-item", this.selectedItem);
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
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

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-0c88b7bc_0", {
    source: ".v-treeview-container{background-image:repeating-linear-gradient(0deg,#cde4f582,#cde4f582 1.5rem,#fff 1.5rem,#fff 3rem)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

// Import vue component

const install = function installVTreeview(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VTreeview', __vue_component__$1);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$1.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__$1;
