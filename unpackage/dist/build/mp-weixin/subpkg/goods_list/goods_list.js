(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/goods_list/goods_list"],{"18b6":function(t,e,o){"use strict";o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return s})),o.d(e,"a",(function(){return n}));var n={myGoodsItem:function(){return Promise.all([o.e("common/vendor"),o.e("components/my-goods-item/my-goods-item")]).then(o.bind(null,"8a7b"))}},i=function(){var t=this.$createElement;this._self._c},s=[]},6230:function(t,e,o){"use strict";o.r(e);var n=o("18b6"),i=o("7ad2");for(var s in i)["default"].indexOf(s)<0&&function(t){o.d(e,t,(function(){return i[t]}))}(s);var u=o("f0c5"),a=Object(u["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);e["default"]=a.exports},"7ad2":function(t,e,o){"use strict";o.r(e);var n=o("ce31"),i=o.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(s);e["default"]=i.a},ce31:function(t,e,o){"use strict";(function(t){var n=o("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(o("2eee")),s=n(o("448a")),u=n(o("c973")),a={data:function(){return{queryObj:{query:"",cid:"",pagenum:1,pagesize:10},goodsList:[],total:0,isLoading:!1}},onLoad:function(t){this.queryObj.query=t.query||"",this.queryObj.cid=t.cid||"",this.queryGoodsList()},methods:{queryGoodsList:function(e){var o=this;return(0,u.default)(i.default.mark((function n(){var u,a,r,d;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o.isLoading=!0,t.showLoading({title:"加载中哦~~"}),n.next=4,t.$request("/api/public/v1/goods/search",o.queryObj);case 4:u=n.sent,a=u.data.message,r=a.goods,a.pagenum,d=a.total,e&&e(),t.hideLoading(),200!==u.statusCode?t.$showMsg():(o.goodsList=[].concat((0,s.default)(o.goodsList),(0,s.default)(r)),o.total=d),o.isLoading=!1;case 10:case"end":return n.stop()}}),n)})))()},goToDetail:function(e){t.navigateTo({url:"/subpkg/goods_detail/goods_detail?goods_id="+e.goods_id})}},onReachBottom:function(){if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total)return t.$showMsg("已经触底了哦~","none");this.isLoading||(this.queryObj.pagenum+=1,this.queryGoodsList())},onPullDownRefresh:function(){this.queryObj.pagenum=1,this.total=0,this.goodsList=[],this.isLoading=!1,this.queryGoodsList((function(){return t.stopPullDownRefresh()}))}};e.default=a}).call(this,o("543d")["default"])},f907:function(t,e,o){"use strict";(function(t,e){var n=o("4ea4");o("c9c6");n(o("66fd"));var i=n(o("6230"));t.__webpack_require_UNI_MP_PLUGIN__=o,e(i.default)}).call(this,o("bc2e")["default"],o("543d")["createPage"])}},[["f907","common/runtime","common/vendor"]]]);