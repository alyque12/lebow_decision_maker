import{c as p,l as C,u as J,a as O,p as j,i as A,b as E,g as n,d,e as H,t as _,m as M,f as l,s as $,h as P,j as k,k as m,n as g}from"./index-Cte-fwex.js";function z(s){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function D(s){p===null&&z(),C&&p.l!==null?F(p).m.push(s):J(()=>{const o=O(s);if(typeof o=="function")return o})}function F(s){var o=s.l;return o.u??(o.u={a:[],b:[],m:[]})}var G=_('<div class="question-container svelte-19r5otg"><h2> </h2> <div class="button-container svelte-19r5otg"><button class="svelte-19r5otg"> </button> <button class="svelte-19r5otg"> </button></div></div>'),K=_("<p>No questions available. Please add some questions first.</p>"),L=_("<main><!></main>");function U(s,o){j(o,!1);let r=[],i=0,e=M(),u=0,c=0;D(()=>{r=JSON.parse(localStorage.getItem("questions")||"[]"),m(e,r[i])});const a=()=>{const t=JSON.parse(localStorage.getItem("topics"));return t||["",""]},T=()=>{i<r.length-1?(i++,m(e,r[i])):(Q(),u>c?alert(`You are more suited for ${a()[0]}`):u<c?alert(`You are more suited for ${a()[1]}`):alert(`You are suited for both ${a()[0]} and ${a()[1]}`))},b=t=>{console.log(`${n(e).question}: ${t}`),t===a()[0]?u+=1:c+=1,console.log(`${a()[0]}: ${u}`),console.log(`${a()[1]}: ${c}`),T()},Q=()=>{localStorage.removeItem("questions"),r=[],m(e,null)};A();var h=L(),S=l(h);{var y=t=>{var f=G(),x=l(f),I=l(x),N=$(x,2),v=l(N),Y=l(v),q=$(v,2),w=l(q);P(()=>{g(I,n(e).question),g(Y,n(e).leftButtonText),g(w,n(e).rightButtonText)}),k("click",v,()=>b(n(e).leftButtonTopic)),k("click",q,()=>b(n(e).rightButtonTopic)),d(t,f)},B=t=>{var f=K();d(t,f)};E(S,t=>{n(e)?t(y):t(B,!1)})}d(s,h),H()}export{U as default};