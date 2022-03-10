/* eslint-disable */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
    typeof define === 'function' && define.amd ? define(['vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["agora-lib"] = factory(global.Vue));
})(this, (function (Vue) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    /**
      * vue-class-component v7.2.6
      * (c) 2015-present Evan You
      * @license MIT
      */

    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    function _defineProperty(obj, key, value) {
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

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

        return arr2;
      }
    }

    function _iterableToArray(iter) {
      if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }

    // The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
    // which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
    // Without this check consumers will encounter hard to track down runtime errors.
    function reflectionIsSupported() {
      return typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
    }
    function copyReflectionMetadata(to, from) {
      forwardMetadata(to, from);
      Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
        forwardMetadata(to.prototype, from.prototype, key);
      });
      Object.getOwnPropertyNames(from).forEach(function (key) {
        forwardMetadata(to, from, key);
      });
    }

    function forwardMetadata(to, from, propertyKey) {
      var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from);
      metaKeys.forEach(function (metaKey) {
        var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from);

        if (propertyKey) {
          Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
        } else {
          Reflect.defineMetadata(metaKey, metadata, to);
        }
      });
    }

    var fakeArray = {
      __proto__: []
    };
    var hasProto = fakeArray instanceof Array;
    function createDecorator(factory) {
      return function (target, key, index) {
        var Ctor = typeof target === 'function' ? target : target.constructor;

        if (!Ctor.__decorators__) {
          Ctor.__decorators__ = [];
        }

        if (typeof index !== 'number') {
          index = undefined;
        }

        Ctor.__decorators__.push(function (options) {
          return factory(options, key, index);
        });
      };
    }
    function isPrimitive(value) {
      var type = _typeof(value);

      return value == null || type !== 'object' && type !== 'function';
    }
    function warn(message) {
      if (typeof console !== 'undefined') {
        console.warn('[vue-class-component] ' + message);
      }
    }

    function collectDataFromConstructor(vm, Component) {
      // override _init to prevent to init as Vue instance
      var originalInit = Component.prototype._init;

      Component.prototype._init = function () {
        var _this = this;

        // proxy to actual vm
        var keys = Object.getOwnPropertyNames(vm); // 2.2.0 compat (props are no longer exposed as self properties)

        if (vm.$options.props) {
          for (var key in vm.$options.props) {
            if (!vm.hasOwnProperty(key)) {
              keys.push(key);
            }
          }
        }

        keys.forEach(function (key) {
          Object.defineProperty(_this, key, {
            get: function get() {
              return vm[key];
            },
            set: function set(value) {
              vm[key] = value;
            },
            configurable: true
          });
        });
      }; // should be acquired class property values


      var data = new Component(); // restore original _init to avoid memory leak (#209)

      Component.prototype._init = originalInit; // create plain data object

      var plainData = {};
      Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
          plainData[key] = data[key];
        }
      });

      if (process.env.NODE_ENV !== 'production') {
        if (!(Component.prototype instanceof Vue__default["default"]) && Object.keys(plainData).length > 0) {
          warn('Component class must inherit Vue or its descendant class ' + 'when class property is used.');
        }
      }

      return plainData;
    }

    var $internalHooks = ['data', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'render', 'errorCaptured', 'serverPrefetch' // 2.6
    ];
    function componentFactory(Component) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options.name = options.name || Component._componentTag || Component.name; // prototype props.

      var proto = Component.prototype;
      Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
          return;
        } // hooks


        if ($internalHooks.indexOf(key) > -1) {
          options[key] = proto[key];
          return;
        }

        var descriptor = Object.getOwnPropertyDescriptor(proto, key);

        if (descriptor.value !== void 0) {
          // methods
          if (typeof descriptor.value === 'function') {
            (options.methods || (options.methods = {}))[key] = descriptor.value;
          } else {
            // typescript decorated data
            (options.mixins || (options.mixins = [])).push({
              data: function data() {
                return _defineProperty({}, key, descriptor.value);
              }
            });
          }
        } else if (descriptor.get || descriptor.set) {
          // computed properties
          (options.computed || (options.computed = {}))[key] = {
            get: descriptor.get,
            set: descriptor.set
          };
        }
      });
      (options.mixins || (options.mixins = [])).push({
        data: function data() {
          return collectDataFromConstructor(this, Component);
        }
      }); // decorate options

      var decorators = Component.__decorators__;

      if (decorators) {
        decorators.forEach(function (fn) {
          return fn(options);
        });
        delete Component.__decorators__;
      } // find super


      var superProto = Object.getPrototypeOf(Component.prototype);
      var Super = superProto instanceof Vue__default["default"] ? superProto.constructor : Vue__default["default"];
      var Extended = Super.extend(options);
      forwardStaticMembers(Extended, Component, Super);

      if (reflectionIsSupported()) {
        copyReflectionMetadata(Extended, Component);
      }

      return Extended;
    }
    var reservedPropertyNames = [// Unique id
    'cid', // Super Vue constructor
    'super', // Component options that will be used by the component
    'options', 'superOptions', 'extendOptions', 'sealedOptions', // Private assets
    'component', 'directive', 'filter'];
    var shouldIgnore = {
      prototype: true,
      arguments: true,
      callee: true,
      caller: true
    };

    function forwardStaticMembers(Extended, Original, Super) {
      // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
      Object.getOwnPropertyNames(Original).forEach(function (key) {
        // Skip the properties that should not be overwritten
        if (shouldIgnore[key]) {
          return;
        } // Some browsers does not allow reconfigure built-in properties


        var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);

        if (extendedDescriptor && !extendedDescriptor.configurable) {
          return;
        }

        var descriptor = Object.getOwnPropertyDescriptor(Original, key); // If the user agent does not support `__proto__` or its family (IE <= 10),
        // the sub class properties may be inherited properties from the super class in TypeScript.
        // We need to exclude such properties to prevent to overwrite
        // the component options object which stored on the extended constructor (See #192).
        // If the value is a referenced value (object or function),
        // we can check equality of them and exclude it if they have the same reference.
        // If it is a primitive value, it will be forwarded for safety.

        if (!hasProto) {
          // Only `cid` is explicitly exluded from property forwarding
          // because we cannot detect whether it is a inherited property or not
          // on the no `__proto__` environment even though the property is reserved.
          if (key === 'cid') {
            return;
          }

          var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);

          if (!isPrimitive(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
            return;
          }
        } // Warn if the users manually declare reserved properties


        if (process.env.NODE_ENV !== 'production' && reservedPropertyNames.indexOf(key) >= 0) {
          warn("Static property name '".concat(key, "' declared on class '").concat(Original.name, "' ") + 'conflicts with reserved property name of Vue internal. ' + 'It may cause unexpected behavior of the component. Consider renaming the property.');
        }

        Object.defineProperty(Extended, key, descriptor);
      });
    }

    function Component(options) {
      if (typeof options === 'function') {
        return componentFactory(options);
      }

      return function (Component) {
        return componentFactory(Component, options);
      };
    }

    Component.registerHooks = function registerHooks(keys) {
      $internalHooks.push.apply($internalHooks, _toConsumableArray(keys));
    };

    (undefined && undefined.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    /** @see {@link https://github.com/vuejs/vue-class-component/blob/master/src/reflect.ts} */
    var reflectMetadataIsSupported = typeof Reflect !== 'undefined' && typeof Reflect.getMetadata !== 'undefined';
    function applyMetadata(options, target, key) {
        if (reflectMetadataIsSupported) {
            if (!Array.isArray(options) &&
                typeof options !== 'function' &&
                !options.hasOwnProperty('type') &&
                typeof options.type === 'undefined') {
                var type = Reflect.getMetadata('design:type', target, key);
                if (type !== Object) {
                    options.type = type;
                }
            }
        }
    }

    /**
     * decorator of a prop
     * @param  options the options for the prop
     * @return PropertyDecorator | void
     */
    function Prop(options) {
        if (options === void 0) { options = {}; }
        return function (target, key) {
            applyMetadata(options, target, key);
            createDecorator(function (componentOptions, k) {
                (componentOptions.props || (componentOptions.props = {}))[k] = options;
            })(target, key);
        };
    }

    let AButton = class AButton extends Vue__default["default"] {
        // 按键尺寸
        size;
        // 按键类型
        type;
        // 是否添加圆角
        round;
        // 是否禁用
        disabled;
        get btnClass() {
            return {
                "a-button": true,
                "a-button-primary": this.type === "primary",
                "a-button-secondary": this.type === "secondary",
                "a-button-text-secondary": this.type === "secondary",
                "a-button-round": this.round,
                "a-button-disabled": this.disabled,
                "a-button-size": this.size,
            };
        }
    };
    __decorate([
        Prop({
            default: "medium",
            // `'small'` / `'medium'`/ `'large'`
            type: String,
        })
    ], AButton.prototype, "size", void 0);
    __decorate([
        Prop({
            default: "primary",
            // `'primary'` / `'secondary'`/ `'tertiary'` / `'danger'` / `'success'` / `'warning'` / `'info'` / `'light'` / `'dark'`
            type: String,
        })
    ], AButton.prototype, "type", void 0);
    __decorate([
        Prop({
            default: false,
            type: Boolean,
        })
    ], AButton.prototype, "round", void 0);
    __decorate([
        Prop({
            default: false,
            type: Boolean,
        })
    ], AButton.prototype, "disabled", void 0);
    AButton = __decorate([
        Component({
            name: "AButton",
        })
    ], AButton);
    var script = AButton;

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

    /* script */
    const __vue_script__ = script;
    /* template */
    var __vue_render__ = function () {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "button",
        {
          staticClass: "btn",
          class: _vm.btnClass,
          attrs: { disabled: _vm.disabled },
          on: { click: _vm.handleClick },
        },
        [_vm._t("default")],
        2
      )
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      const __vue_inject_styles__ = undefined;
      /* scoped */
      const __vue_scope_id__ = "data-v-b8effe98";
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__ = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        undefined,
        undefined,
        undefined
      );

    __vue_component__.install = (app) => {
        app.component(__vue_component__.name, __vue_component__);
    };

    const components = [__vue_component__];
    const install = (Vue) => {
        if (install.installed)
            return;
        install.installed = true;
        components.forEach((component) => {
            Vue.component(component.name, component);
        });
    };
    if (typeof window !== "undefined" && window.Vue) {
        install(window.Vue);
    }
    var index = {
        install,
        AButton: __vue_component__,
    };

    return index;

}));
//# sourceMappingURL=index.js.map
