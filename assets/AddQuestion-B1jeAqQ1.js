import{p as te,o as se,i as ae,b as le,d as q,e as ie,t as A,q as oe,w as ne,f as i,s,r as f,k as t,g as e,j,h as T,v as m,m as o,n as y}from"./index-Cte-fwex.js";var re=A('<div class="topics-form svelte-3edikg"><h2>Enter Two Topics (Categories)</h2> <input type="text" placeholder="Enter first topic" class="svelte-3edikg"> <input type="text" placeholder="Enter second topic" class="svelte-3edikg"> <button class="svelte-3edikg">Submit Topics</button></div>'),ce=A('<div class="add-question-container svelte-3edikg"><h2>Add a New Question</h2> <input type="text" placeholder="Enter your question" class="svelte-3edikg"> <div class="button-container svelte-3edikg"><div class="svelte-3edikg"><input type="text" placeholder="Left button text" class="svelte-3edikg"> <label class="svelte-3edikg"><input type="checkbox" class="svelte-3edikg"> </label> <label class="svelte-3edikg"><input type="checkbox" class="svelte-3edikg"> </label></div> <div class="svelte-3edikg"><input type="text" placeholder="Right button text" class="svelte-3edikg"> <label class="svelte-3edikg"><input type="checkbox" class="svelte-3edikg"> </label> <label class="svelte-3edikg"><input type="checkbox" class="svelte-3edikg"> </label></div></div> <button class="svelte-3edikg">Add Question</button></div>'),de=A("<main><!></main>");function pe(C,L){te(L,!1);const R=se(),z=()=>oe($,"$areTopicsAdded",R);let n=o(""),r=o(""),d=o(""),v=o(""),p=o(""),k=o(!1),B=o(!1),_=o(!1),S=o(!1),$=ne(!1);const D=()=>{e(n)&&e(r)?(localStorage.setItem("topics",JSON.stringify([e(n),e(r)])),$.set(!0)):alert("Please enter both topics")},h=()=>{const l=JSON.parse(localStorage.getItem("topics"));return l||["",""]},F=()=>{if(e(d)&&e(v)&&e(p)){let l=JSON.parse(localStorage.getItem("questions")||"[]");l.push({question:e(d),leftButtonText:e(v),rightButtonText:e(p),leftButtonTopic:e(k)?e(n):e(r),rightButtonTopic:e(_)?e(n):e(r)}),localStorage.setItem("questions",JSON.stringify(l)),t(d,""),t(v,""),t(p,""),t(k,!1),t(B,!1),t(_,!1),t(S,!1)}else alert("Please fill in all fields for the question")};ae();var N=de(),G=i(N);{var H=l=>{var u=re(),g=s(i(u),2),b=s(g,2),x=s(b,2);f(g,()=>e(n),c=>t(n,c)),f(b,()=>e(r),c=>t(r,c)),j("click",x,D),q(l,u)},K=l=>{var u=ce(),g=s(i(u),2),b=s(g,2),x=i(b),c=i(x),Q=s(c,2),w=i(Q),M=s(w);T(()=>y(M,` ${h()[0]??""}`));var U=s(Q,2),E=i(U),V=s(E);T(()=>y(V,` ${h()[1]??""}`));var W=s(x,2),I=i(W),J=s(I,2),O=i(J),X=s(O);T(()=>y(X,` ${h()[0]??""}`));var Y=s(J,2),P=i(Y),Z=s(P);T(()=>y(Z,` ${h()[1]??""}`));var ee=s(b,2);f(g,()=>e(d),a=>t(d,a)),f(c,()=>e(v),a=>t(v,a)),m(w,()=>e(k),a=>t(k,a)),m(E,()=>e(B),a=>t(B,a)),f(I,()=>e(p),a=>t(p,a)),m(O,()=>e(_),a=>t(_,a)),m(P,()=>e(S),a=>t(S,a)),j("click",ee,F),q(l,u)};le(G,l=>{z()?l(K,!1):l(H)})}q(C,N),ie()}export{pe as default};
