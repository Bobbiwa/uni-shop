(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/myAddress/myAddress"],{2710:function(e,t,n){"use strict";var r=n("6229"),c=n.n(r);c.a},6229:function(e,t,n){},ace8:function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return r}));var r={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"afb0"))}},c=function(){var e=this.$createElement,t=(this._self._c,JSON.stringify(this.address)),n="{}"!==t?this.addstr():null;this.$mp.data=Object.assign({},{$root:{g0:t,m0:n}})},s=[]},b08c:function(e,t,n){"use strict";(function(e){var r=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=r(n("2eee")),s=r(n("278c")),u=r(n("c973")),o=r(n("9523")),a=n("26cb");function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){(0,o.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var f={name:"myAddress",data:function(){return{}},methods:d(d(d({},(0,a.mapMutations)("m_user",["updateAddress"])),(0,a.mapGetters)("m_user",["addstr"])),{},{handleChooseAddress:function(){var t=this;return(0,u.default)(c.default.mark((function n(){var r,u,o,a;return c.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.chooseAddress().catch((function(e){return e}));case 2:r=n.sent,u=(0,s.default)(r,2),o=u[0],a=u[1],null===o&&"chooseAddress:ok"===a.errMsg&&t.updateAddress(a);case 7:case"end":return n.stop()}}),n)})))()}}),computed:d({},(0,a.mapState)("m_user",["address"]))};t.default=f}).call(this,n("543d")["default"])},becb:function(e,t,n){"use strict";n.r(t);var r=n("ace8"),c=n("d955");for(var s in c)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return c[e]}))}(s);n("2710");var u=n("f0c5"),o=Object(u["a"])(c["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],void 0);t["default"]=o.exports},d955:function(e,t,n){"use strict";n.r(t);var r=n("b08c"),c=n.n(r);for(var s in r)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(s);t["default"]=c.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/myAddress/myAddress-create-component',
    {
        'components/myAddress/myAddress-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("becb"))
        })
    },
    [['components/myAddress/myAddress-create-component']]
]);
