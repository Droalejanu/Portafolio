/* BOCA. · efectos interactivos. Cada efecto se puede apagar con el panel "Efectos" (abajo a la izquierda)
   o poniendo 0 en DEF. Para ocultar el panel al publicar: PANEL = false. */
(()=>{
const KEY="boca-fx-v2", PANEL=true;
const DEF={trail:1,blur:0,magnet:1,preview:0,gallery:1,stack:1,count:1,sweep:1,dot:0};
const L={trail:"2 · Rastro de cuadrados",blur:"4 · Enfoque en BOCA.",magnet:"5 · Botones magnéticos",preview:"6 · Vista previa al pasar",gallery:"7 · Galería arrastrable",stack:"8 · Pila de tarjetas",count:"9 · Números que cuentan",sweep:"11 · Transición de página",dot:"12 · Punto arrastrable"};
let F={...DEF};try{Object.assign(F,JSON.parse(localStorage.getItem(KEY)||"{}"))}catch(e){}
const root=document.documentElement, $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE=matchMedia("(hover:hover) and (pointer:fine)").matches;
if(RM){root.classList.remove("fxs");return}
const st=document.createElement("style");st.textContent=`
.fx-t{position:fixed;width:16px;height:16px;margin:-8px 0 0 -8px;pointer-events:none;z-index:50;opacity:.9;animation:fxt .8s forwards}
@keyframes fxt{to{opacity:0;transform:scale(.2) rotate(45deg)}}
.fx-bw{position:relative}.fx-b{display:inline-block;transition:filter .3s}.fx-bw.on .fx-b{filter:blur(10px)}
.fx-sh{position:absolute!important;left:0;top:0;margin:0!important;pointer-events:none;opacity:0;transition:opacity .3s;-webkit-mask-image:radial-gradient(circle 170px at var(--mx,50%) var(--my,50%),#000 60%,transparent);mask-image:radial-gradient(circle 170px at var(--mx,50%) var(--my,50%),#000 60%,transparent)}
.fx-bw.on .fx-sh{opacity:1}
h1 i{cursor:grab;touch-action:none;position:relative;z-index:3}h1 i::before{content:"";position:absolute;inset:-.3em}
.fx-mg{display:inline-block;transition:transform .25s cubic-bezier(.2,.8,.2,1)}
.fx-pv{position:fixed;left:0;top:0;width:17rem;pointer-events:none;z-index:40;opacity:0;transition:opacity .2s;box-shadow:0 12px 40px rgba(0,0,0,.35);background:#A51F2B;color:#F4F2EE}
.fx-pv.on{opacity:1}.fx-pv img{display:block;width:100%;height:auto}.fx-pv b{display:none;font:700 1.6rem/1 var(--hd);padding:1.2rem;aspect-ratio:16/9}
.fx-pv.nopic img{display:none}.fx-pv.nopic b{display:block}
#cases .case{transition:opacity .35s,filter .35s,transform .6s}
#cases.hov .case:not(.hot){filter:blur(3px);opacity:.3}
.sec>div{min-width:0}
.fx-hint{margin:1rem 0 -.4rem}
.fx-dg{display:flex;gap:1rem;overflow-x:auto;scrollbar-width:none;cursor:grab;margin:1.2rem 0;max-width:100%}
.fx-dg::-webkit-scrollbar{display:none}.fx-dg.grab{cursor:grabbing;user-select:none}
.fx-dg figure{flex:0 0 min(82%,34rem);margin:0}
.fx-st{position:relative;aspect-ratio:16/9;max-width:38rem;margin:1.5rem 0 3.5rem;touch-action:pan-y;user-select:none}
.fx-st figure{position:absolute;inset:0;margin:0;cursor:grab}.fx-st figure img{height:100%;object-fit:cover}
.fx-st figcaption{position:absolute;left:0;bottom:0;background:#101010;color:#F4F2EE;padding:.2rem .6rem}
.fx-sw{position:fixed;inset:0;background:#A51F2B;z-index:99;display:grid;place-items:center;transform:translateX(-100%);transition:transform .48s cubic-bezier(.7,0,.3,1);visibility:visible;pointer-events:none}
.fx-sw b{font:700 clamp(3rem,14vw,9rem)/1 var(--hd);color:#F4F2EE;letter-spacing:-.04em}
.fx-pn{position:fixed;left:.75rem;bottom:.75rem;z-index:60;font:400 .75rem var(--mo);background:#101010;color:#F4F2EE;border:1px solid #777;max-width:15rem}
.fx-pn button{all:unset;cursor:pointer;padding:.5rem .8rem;letter-spacing:.08em;text-transform:uppercase;display:block}
.fx-pn div{padding:.2rem .8rem .7rem;display:grid;gap:.4rem}.fx-pn label{display:flex;gap:.5rem;cursor:pointer}
`;document.head.appendChild(st);

/* 11 · transición */
if(F.sweep){const o=document.createElement("div");o.className="fx-sw";o.innerHTML="<b>BOCA.</b>";document.body.appendChild(o);
 if(root.classList.contains("fxs")){o.style.transition="none";o.style.transform="translateX(0)";root.classList.remove("fxs");
  requestAnimationFrame(()=>requestAnimationFrame(()=>{o.style.transition="";o.style.transform="translateX(100%)"}))}
 const cover=cb=>{o.style.transition="none";o.style.transform="translateX(-100%)";o.offsetWidth;o.style.transition="";o.style.transform="translateX(0)";setTimeout(cb,500)};
 addEventListener("pageshow",e=>{if(e.persisted){o.style.transition="none";o.style.transform="translateX(100%)"}});
 document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||a.target==="_blank")return;
  let u;try{u=new URL(a.href,location.href)}catch(x){return}
  if(u.protocol!==location.protocol||(u.protocol!=="file:"&&u.origin!==location.origin))return;
  if(u.pathname===location.pathname&&u.hash){const t=document.querySelector(u.hash);if(t&&t.classList.contains("case")){e.preventDefault();cover(()=>{location.hash=u.hash;scrollTo(0,0);o.style.transition="";o.style.transform="translateX(100%)"})}return}
  if(/\.html?$/.test(u.pathname)&&u.pathname!==location.pathname){e.preventDefault();try{sessionStorage.setItem("fxs","1")}catch(x){}cover(()=>{location.href=u.href})}})
}else root.classList.remove("fxs");

/* 2 · rastro */
if(F.trail&&FINE){const h=document.querySelector(".hero");if(h){let lx=0,ly=0;h.addEventListener("pointermove",e=>{if(Math.hypot(e.clientX-lx,e.clientY-ly)<26)return;lx=e.clientX;ly=e.clientY;const d=document.createElement("div");d.className="fx-t";d.style.left=e.clientX+"px";d.style.top=e.clientY+"px";d.style.background=["#A51F2B","#F4F2EE","#D6D6D3"][Math.random()*3|0];d.addEventListener("animationend",()=>d.remove());document.body.appendChild(d)})}}

/* 4 · enfoque en BOCA. */
if(F.blur&&FINE){const h=document.querySelector("h1.big");if(h&&h.firstChild&&h.firstChild.nodeType===3){
 const sp=document.createElement("span");sp.className="fx-b";sp.textContent=h.firstChild.textContent;h.replaceChild(sp,h.firstChild);
 const w=document.createElement("div");w.className="fx-bw";h.parentNode.insertBefore(w,h);w.style.marginTop=getComputedStyle(h).marginTop;h.style.margin="0";w.appendChild(h);
 const sh=h.cloneNode(true);sh.querySelector("i").remove();sh.removeAttribute("aria-label");sh.setAttribute("aria-hidden","true");sh.classList.add("fx-sh");w.appendChild(sh);
 w.addEventListener("pointermove",e=>{const r=w.getBoundingClientRect();w.style.setProperty("--mx",e.clientX-r.left+"px");w.style.setProperty("--my",e.clientY-r.top+"px");w.classList.add("on")});
 w.addEventListener("pointerleave",()=>w.classList.remove("on"))}}

/* 12 · punto arrastrable con resorte */
if(F.dot){$$("h1 i").forEach(d=>{let x=0,y=0,vx=0,vy=0,drag=false,sx=0,sy=0,raf=0;
 const loop=()=>{if(!drag){vx+=-x*.12;vy+=-y*.12;vx*=.82;vy*=.82;x+=vx;y+=vy}d.style.transform=`translate(${x}px,${y}px)`;
  if(drag||Math.abs(x)+Math.abs(y)+Math.abs(vx)+Math.abs(vy)>.2)raf=requestAnimationFrame(loop);else{d.style.transform="";raf=0}};
 d.addEventListener("pointerdown",e=>{drag=true;d.setPointerCapture(e.pointerId);sx=e.clientX-x;sy=e.clientY-y;e.preventDefault();if(!raf)raf=requestAnimationFrame(loop)});
 d.addEventListener("pointermove",e=>{if(!drag)return;const nx=e.clientX-sx,ny=e.clientY-sy;vx=nx-x;vy=ny-y;x=nx;y=ny});
 const up=()=>{drag=false};d.addEventListener("pointerup",up);d.addEventListener("pointercancel",up)})}

/* 5 · botones magnéticos */
if(F.magnet&&FINE){const els=$$(".btn,.top a");els.forEach(e=>e.classList.add("fx-mg"));
 addEventListener("pointermove",e=>{els.forEach(el=>{const r=el.getBoundingClientRect();if(!r.width)return;const dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);
  if(Math.hypot(dx,dy)<80+Math.max(r.width,r.height)/2){el.style.transform=`translate(${dx*.25}px,${dy*.25}px)`;el._m=1}else if(el._m){el.style.transform="";el._m=0}})},{passive:true})}

/* 6 · vista previa que sigue al mouse */
if(F.preview&&FINE){const box=document.getElementById("cases");if(box){const pv=document.createElement("div");pv.className="fx-pv";pv.innerHTML="<img alt=''><b></b>";document.body.appendChild(pv);
 const im=pv.firstChild,tt=pv.lastChild;let tx=0,ty=0,x=0,y=0,rot=0,on=false,raf=0;
 addEventListener("pointermove",e=>{tx=e.clientX;ty=e.clientY},{passive:true});
 const loop=()=>{if(!on){raf=0;return}const px=x;x+=(tx-x)*.15;y+=(ty-y)*.15;rot+=((x-px)*.6-rot)*.2;pv.style.transform=`translate(${x+24}px,${y-90}px) rotate(${Math.max(-12,Math.min(12,rot))}deg)`;raf=requestAnimationFrame(loop)};
 $$(".case",box).forEach(c=>{c.addEventListener("pointerenter",()=>{const s=c.querySelector(".cv img");if(s){im.src=s.getAttribute("src");pv.classList.remove("nopic")}else{tt.textContent=(c.querySelector("h3")||{}).textContent||"";pv.classList.add("nopic")}
  x=tx;y=ty;pv.classList.add("on");box.classList.add("hov");c.classList.add("hot");on=true;if(!raf)loop()});
  c.addEventListener("pointerleave",()=>{pv.classList.remove("on");box.classList.remove("hov");c.classList.remove("hot");on=false})})}}

/* 7 · galería arrastrable (MaesPro) */
if(F.gallery){const sec=$$("#maespro .sec").find(s=>/05 · Proceso/.test(s.textContent));const figs=sec?$$("figure",sec):[];
 if(figs.length){const dg=document.createElement("div");dg.className="fx-dg";figs[0].before(dg);figs.forEach(f=>dg.appendChild(f));
  const hint=document.createElement("div");hint.className="mo sub fx-hint";hint.textContent=FINE?"Arrastra para ver más →":"Desliza para ver más →";dg.before(hint);
  $$("img",dg).forEach(i=>i.draggable=false);let down=false,sx=0,sl=0,v=0,raf=0;
  dg.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse")return;down=true;sx=e.clientX;sl=dg.scrollLeft;v=0;cancelAnimationFrame(raf);dg.classList.add("grab");dg.setPointerCapture(e.pointerId)});
  dg.addEventListener("pointermove",e=>{if(!down)return;const nl=sl-(e.clientX-sx);v=nl-dg.scrollLeft;dg.scrollLeft=nl});
  const up=()=>{if(!down)return;down=false;dg.classList.remove("grab");const g=()=>{v*=.94;dg.scrollLeft+=v;if(Math.abs(v)>.5)raf=requestAnimationFrame(g)};g()};
  dg.addEventListener("pointerup",up);dg.addEventListener("pointercancel",up)}}

/* 8 · pila de tarjetas (BIG Academy) */
if(F.stack){const sec=$$("#big-academy .sec").find(s=>/03 · Aplicaciones/.test(s.textContent));const figs=sec?$$("figure",sec):[];
 if(figs.length>1){const box=document.createElement("div");box.className="fx-st";figs[0].before(box);figs.forEach(f=>box.appendChild(f));
  const hint=document.createElement("div");hint.className="mo sub fx-hint";hint.textContent="Arrastra las tarjetas →";box.before(hint);
  $$("img",box).forEach(i=>i.draggable=false);const n=figs.length,rots=[0,-2.2,1.8,-1.2];let order=[...figs],down=null;
  const lay=()=>order.forEach((f,i)=>{f.style.zIndex=n-i;f.style.opacity=1;f.style.transition="transform .35s,opacity .35s";f.style.transform=`translate(${i*10}px,${i*10}px) rotate(${rots[i%4]}deg)`});lay();
  box.addEventListener("pointerdown",e=>{if(!order[0].contains(e.target))return;down={x:e.clientX,y:e.clientY};order[0].style.transition="none";box.setPointerCapture(e.pointerId)});
  box.addEventListener("pointermove",e=>{if(!down)return;const dx=e.clientX-down.x,dy=e.clientY-down.y;order[0].style.transform=`translate(${dx}px,${dy}px) rotate(${dx*.04}deg)`});
  const end=e=>{if(!down)return;const dx=e.clientX-down.x;down=null;const top=order[0];
   if(Math.abs(dx)>90){top.style.transition="transform .35s,opacity .35s";top.style.transform=`translate(${dx>0?140:-140}%,0) rotate(${dx>0?25:-25}deg)`;top.style.opacity=0;setTimeout(()=>{order.push(order.shift());lay()},340)}else lay()};
  box.addEventListener("pointerup",end);box.addEventListener("pointercancel",end)}}

/* 9 · números que cuentan */
if(F.count){const run=b=>{const [,pre,num,suf]=b._m,end=parseInt(num.replace(/[.,]/g,""),10),t0=performance.now(),th=/\./.test(num);
  const f=t=>{const k=Math.min(1,(t-t0)/1300),v=Math.round(end*(1-Math.pow(1-k,3)));b.textContent=pre+(th?v.toLocaleString("es-CO"):v)+suf;if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
 const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){io.unobserve(en.target);run(en.target)}}),{threshold:.6});
 $$(".stats b,.facts b").forEach(b=>{const t=b.textContent,m=t.match(/^(\D*?)(\d[\d.,]*)(.*)$/);if(!m||/–/.test(t))return;b._m=m;b.textContent=m[1]+"0"+m[3];io.observe(b)})}

/* panel de pruebas */
if(PANEL){const p=document.createElement("div");p.className="fx-pn";
 p.innerHTML='<button type="button" aria-expanded="false">Efectos</button><div hidden>'+Object.keys(L).map(k=>`<label><input type="checkbox" data-k="${k}" ${F[k]?"checked":""}>${L[k]}</label>`).join("")+'<span style="color:#D6D6D3">Se aplica al recargar.</span></div>';
 const bt=p.firstChild,pn=p.children[1];bt.onclick=()=>{pn.hidden=!pn.hidden;bt.setAttribute("aria-expanded",String(!pn.hidden))};
 p.addEventListener("change",e=>{const k=e.target.dataset.k;if(!k)return;F[k]=e.target.checked?1:0;try{localStorage.setItem(KEY,JSON.stringify(F))}catch(x){}location.reload()});
 document.body.appendChild(p)}
})();
