(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{180:function(e,t,n){"use strict";n.r(t);var r="function"==typeof fetch?fetch.bind():function(e,t){return t=t||{},new Promise(function(n,r){var s=new XMLHttpRequest;for(var o in s.open(t.method||"get",e),t.headers)s.setRequestHeader(o,t.headers[o]);function a(){var e,t=[],n=[],r={};return s.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm,function(s,o,a){t.push(o=o.toLowerCase()),n.push([o,a]),e=r[o],r[o]=e?e+","+a:a}),{ok:1==(s.status/200|0),status:s.status,statusText:s.statusText,url:s.responseURL,clone:a,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(s.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([s.response]))},headers:{keys:function(){return t},entries:function(){return n},get:function(e){return r[e.toLowerCase()]},has:function(e){return e.toLowerCase()in r}}}}s.withCredentials="include"==t.credentials,s.onload=function(){n(a())},s.onerror=r,s.send(t.body)})};t.default=r},346:function(e,t,n){__NEXT_REGISTER_PAGE("/",function(){return e.exports=n(347),{page:e.exports.default}})},347:function(e,t,n){"use strict";n.r(t);var r=n(29),s=n.n(r),o=n(55),a=n.n(o),u=n(0),c=n.n(u),i=(n(353),n(28)),l=n.n(i),f=n(56),p=(n(148),n(98));function d(e,t,n,r,s,o,a){try{var u=e[o](a),c=u.value}catch(e){return void n(e)}u.done?t(c):Promise.resolve(c).then(r,s)}function h(e){return function(){var t=this,n=arguments;return new Promise(function(r,s){var o=e.apply(t,n);function a(e){d(o,r,s,a,u,"next",e)}function u(e){d(o,r,s,a,u,"throw",e)}a(void 0)})}}var m=function(e){return c.a.createElement(p.a,null,c.a.createElement("ul",{className:"jsx-1704715776"},e.allRoutes.map(function(e){return c.a.createElement("li",{key:e.id,className:"jsx-1704715776"},c.a.createElement(l.a,{prefetch:!0,as:"post?id=".concat(e.routeName),href:{pathname:"/post",query:{id:e.routeName}}},c.a.createElement("a",{className:"jsx-1704715776"},c.a.createElement("h2",{className:"jsx-1704715776"},e.routeName))))})),c.a.createElement(a.a,{styleId:"1704715776",css:["ul.jsx-1704715776{list-style:none;}"]}))};m.getInitialProps=h(s.a.mark(function e(){var t;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return"{\n    allRoutes {\n      id\n      routeName\n    }\n  }",e.next=3,Object(f.request)("https://ferrytrackerserver.now.sh/graphql","{\n    allRoutes {\n      id\n      routeName\n    }\n  }");case 3:return t=e.sent,console.log("All routes fetched. Count: ".concat(t.allRoutes.length)),e.abrupt("return",t);case 6:case"end":return e.stop()}},e,this)})),t.default=m},353:function(e,t,n){e.exports=window.fetch||(window.fetch=n(180).default||n(180))}},[[346,1,0]]]);