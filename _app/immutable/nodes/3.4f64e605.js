import{e as oe,m as $,t as A}from"../chunks/ui.ce99e1d2.js";import{S as ne,i as fe,s as ue,k as h,q as I,a as g,K as _e,l as m,m as d,r as S,h as o,c as k,L as he,n as C,b as p,G as _,H as ee,J as le,u as ie}from"../chunks/index.ff45362d.js";import{b as me}from"../chunks/paths.3d52c490.js";async function de({params:i}){const t=oe.filter(s=>s.pk===parseInt(i.id));let r={};for(let s=0;s<$.length;s++){let a=$[s];r[parseInt(a.pk)]=a.fields.name}return{exercise:t[0],muscles:r}}const Me=Object.freeze(Object.defineProperty({__proto__:null,load:de},Symbol.toStringTag,{value:"Module"}));function te(i,t,r){const s=i.slice();return s[3]=t[r],s}function se(i,t,r){const s=i.slice();return s[3]=t[r],s}function ae(i){let t,r=i[3]+"",s;return{c(){t=h("li"),s=I(r)},l(a){t=m(a,"LI",{});var c=d(t);s=S(c,r),c.forEach(o)},m(a,c){p(a,t,c),_(t,s)},p(a,c){c&1&&r!==(r=a[3]+"")&&ie(s,r)},d(a){a&&o(t)}}}function re(i){let t,r=i[3]+"",s;return{c(){t=h("li"),s=I(r)},l(a){t=m(a,"LI",{});var c=d(t);s=S(c,r),c.forEach(o)},m(a,c){p(a,t,c),_(t,s)},p(a,c){c&1&&r!==(r=a[3]+"")&&ie(s,r)},d(a){a&&o(t)}}}function pe(i){let t,r=i[1].name+"",s,a,c,H,q,y,T,G,J,x,w,E,V,K,N,D,B,b,j,F,Q,O,ce=i[1].steps+"",L=A(i[1].primary_muscles,i[0]),n=[];for(let e=0;e<L.length;e+=1)n[e]=ae(se(i,L,e));let P=A(i[1].secondary_muscles,i[0]),f=[];for(let e=0;e<P.length;e+=1)f[e]=re(te(i,P,e));return{c(){t=h("h1"),s=I(r),a=g(),c=h("a"),H=I("←Back to Exercise Directory"),q=g(),y=h("div"),T=h("h2"),G=I("Primary Muscles"),J=g(),x=h("ul");for(let e=0;e<n.length;e+=1)n[e].c();w=g(),E=h("div"),V=h("h2"),K=I("Secondary Muscles"),N=g(),D=h("ul");for(let e=0;e<f.length;e+=1)f[e].c();B=g(),b=h("div"),j=h("h2"),F=I("Steps"),Q=g(),O=new _e(!1),this.h()},l(e){t=m(e,"H1",{});var u=d(t);s=S(u,r),u.forEach(o),a=k(e),c=m(e,"A",{href:!0});var l=d(c);H=S(l,"←Back to Exercise Directory"),l.forEach(o),q=k(e),y=m(e,"DIV",{id:!0});var v=d(y);T=m(v,"H2",{});var R=d(T);G=S(R,"Primary Muscles"),R.forEach(o),J=k(v),x=m(v,"UL",{});var W=d(x);for(let M=0;M<n.length;M+=1)n[M].l(W);W.forEach(o),v.forEach(o),w=k(e),E=m(e,"DIV",{id:!0});var U=d(E);V=m(U,"H2",{});var X=d(V);K=S(X,"Secondary Muscles"),X.forEach(o),N=k(U),D=m(U,"UL",{});var Y=d(D);for(let M=0;M<f.length;M+=1)f[M].l(Y);Y.forEach(o),U.forEach(o),B=k(e),b=m(e,"DIV",{id:!0});var z=d(b);j=m(z,"H2",{});var Z=d(j);F=S(Z,"Steps"),Z.forEach(o),Q=k(z),O=he(z,!1),z.forEach(o),this.h()},h(){C(c,"href",me+"/"),C(y,"id","primaryMuscles"),C(E,"id","secondaryMuscles"),O.a=null,C(b,"id","steps")},m(e,u){p(e,t,u),_(t,s),p(e,a,u),p(e,c,u),_(c,H),p(e,q,u),p(e,y,u),_(y,T),_(T,G),_(y,J),_(y,x);for(let l=0;l<n.length;l+=1)n[l]&&n[l].m(x,null);p(e,w,u),p(e,E,u),_(E,V),_(V,K),_(E,N),_(E,D);for(let l=0;l<f.length;l+=1)f[l]&&f[l].m(D,null);p(e,B,u),p(e,b,u),_(b,j),_(j,F),_(b,Q),O.m(ce,b)},p(e,[u]){if(u&3){L=A(e[1].primary_muscles,e[0]);let l;for(l=0;l<L.length;l+=1){const v=se(e,L,l);n[l]?n[l].p(v,u):(n[l]=ae(v),n[l].c(),n[l].m(x,null))}for(;l<n.length;l+=1)n[l].d(1);n.length=L.length}if(u&3){P=A(e[1].secondary_muscles,e[0]);let l;for(l=0;l<P.length;l+=1){const v=te(e,P,l);f[l]?f[l].p(v,u):(f[l]=re(v),f[l].c(),f[l].m(D,null))}for(;l<f.length;l+=1)f[l].d(1);f.length=P.length}},i:ee,o:ee,d(e){e&&o(t),e&&o(a),e&&o(c),e&&o(q),e&&o(y),le(n,e),e&&o(w),e&&o(E),le(f,e),e&&o(B),e&&o(b)}}}function ve(i,t,r){let s,{data:a}=t;const c=a.exercise.fields;return i.$$set=H=>{"data"in H&&r(2,a=H.data)},i.$$.update=()=>{i.$$.dirty&4&&r(0,s=a.muscles)},[s,c,a]}class ge extends ne{constructor(t){super(),fe(this,t,ve,pe,ue,{data:2})}}export{ge as component,Me as universal};
