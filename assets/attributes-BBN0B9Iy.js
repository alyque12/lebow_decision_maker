import{a6 as Q,a7 as W,i as Z,a8 as Y,a9 as k,aa as z,ab as F,ac as $,e as V,ad as m,ae as j,af as ee,ag as ae,ah as re,ai as ne,aj as ie,ak as H,al as L,x as fe,s as G,am as J,an as se,ao as le,ap as te,h as ue,aq as ve,ar as oe}from"./index-DGpm3imC.js";let _e=!1;function Ae(r,e){return e}function ce(r,e,a,f){for(var s=[],u=e.length,_=0;_<u;_++)j(e[_].e,s,!0);var E=u>0&&s.length===0&&a!==null;if(E){var c=a.parentNode;ee(c),c.append(a),f.clear(),x(r,e[0].prev,e[u-1].next)}ae(s,()=>{for(var g=0;g<u;g++){var o=e[g];E||(f.delete(o.k),x(r,o.prev,o.next)),re(o.e,!E)}})}function we(r,e,a,f,s,u=null){var _=r,E={flags:e,items:new Map,first:null},c=(e&J)!==0;if(c){var g=r;_=g.appendChild(Q())}var o=null,p=!1;W(()=>{var h=a(),n=Z(h)?h:h==null?[]:Y(h),l=n.length;if(!(p&&l===0)){p=l===0;{var v=ne;de(n,E,_,s,e,(v.f&k)!==0,f)}u!==null&&(l===0?o?z(o):o=F(()=>u(_)):o!==null&&$(o,()=>{o=null})),a()}})}function de(r,e,a,f,s,u,_,E){var D,O,b,q;var c=(s&se)!==0,g=(s&(H|L))!==0,o=r.length,p=e.items,h=e.first,n=h,l,v=null,M,d=[],A=[],T,I,i,t;if(c)for(t=0;t<o;t+=1)T=r[t],I=_(T,t),i=p.get(I),i!==void 0&&((D=i.a)==null||D.measure(),(M??(M=new Set)).add(i));for(t=0;t<o;t+=1){if(T=r[t],I=_(T,t),i=p.get(I),i===void 0){var K=n?n.e.nodes_start:a;v=he(K,e,v,v===null?e.first:v.next,T,I,t,f,s),p.set(I,v),d=[],A=[],n=v.next;continue}if(g&&pe(i,T,t,s),i.e.f&k&&(z(i.e),c&&((O=i.a)==null||O.unfix(),(M??(M=new Set)).delete(i))),i!==n){if(l!==void 0&&l.has(i)){if(d.length<A.length){var N=A[0],w;v=N.prev;var R=d[0],S=d[d.length-1];for(w=0;w<d.length;w+=1)U(d[w],N,a);for(w=0;w<A.length;w+=1)l.delete(A[w]);x(e,R.prev,S.next),x(e,v,R),x(e,S,N),n=N,v=S,t-=1,d=[],A=[]}else l.delete(i),U(i,n,a),x(e,i.prev,i.next),x(e,i,v===null?e.first:v.next),x(e,v,i),v=i;continue}for(d=[],A=[];n!==null&&n.k!==I;)(u||!(n.e.f&k))&&(l??(l=new Set)).add(n),A.push(n),n=n.next;if(n===null)continue;i=n}d.push(i),v=i,n=i.next}if(n!==null||l!==void 0){for(var C=l===void 0?[]:Y(l);n!==null;)(u||!(n.e.f&k))&&C.push(n),n=n.next;var y=C.length;if(y>0){var P=s&J&&o===0?a:null;if(c){for(t=0;t<y;t+=1)(b=C[t].a)==null||b.measure();for(t=0;t<y;t+=1)(q=C[t].a)==null||q.fix()}ce(e,C,P,p)}}c&&ie(()=>{var B;if(M!==void 0)for(i of M)(B=i.a)==null||B.apply()}),V.first=e.first&&e.first.e,V.last=v&&v.e}function pe(r,e,a,f){f&H&&m(r.v,e),f&L?m(r.i,a):r.i=a}function he(r,e,a,f,s,u,_,E,c,g){var o=(c&H)!==0,p=(c&le)===0,h=o?p?fe(s):G(s):s,n=c&L?G(_):_,l={i:n,v:h,k:u,a:null,e:null,prev:a,next:f};try{return l.e=F(()=>E(r,h,n),_e),l.e.prev=a&&a.e,l.e.next=f&&f.e,a===null?e.first=l:(a.next=l,a.e.next=l.e),f!==null&&(f.prev=l,f.e.prev=l.e),l}finally{}}function U(r,e,a){for(var f=r.next?r.next.e.nodes_start:a,s=e?e.e.nodes_start:a,u=r.e.nodes_start;u!==f;){var _=te(u);s.before(u),u=_}}function x(r,e,a){e===null?r.first=a:(e.next=a,e.e.next=a&&a.e),a!==null&&(a.prev=e,a.e.prev=e&&e.e)}function xe(r,e,a,f){var s=r.__attributes??(r.__attributes={});s[e]!==(s[e]=a)&&(e==="style"&&"__styles"in r&&(r.__styles={}),e==="loading"&&(r[ve]=a),a==null?r.removeAttribute(e):typeof a!="string"&&Ee(r).includes(e)?r[e]=a:r.setAttribute(e,a))}var X=new Map;function Ee(r){var e=X.get(r.nodeName);if(e)return e;X.set(r.nodeName,e=[]);for(var a,f=r,s=Element.prototype;s!==f;){a=oe(f);for(var u in a)a[u].set&&e.push(u);f=ue(f)}return e}export{we as e,Ae as i,xe as s};
