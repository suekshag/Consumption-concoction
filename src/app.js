const {useState,useEffect,useRef,useMemo,useCallback}=React;
const html=htm.bind(React.createElement);
const ic=id=>A['i_'+BY[id].icon];
const art=id=>BY[id].art?A['b_'+BY[id].art]:ic(id);
const pad=n=>String(n).padStart(2,'0');
const cityName=c=>(CITIES.find(x=>x[0]===c)||[0,''])[1];
/* city-dependent value for an item, or null */
const cityVal=(it,c)=>it.city&&c&&CITY_DATA[c]?CITY_DATA[c][it.city]:null;
const co2Of=(it,c)=>{if(it.co2!=null)return it.co2;const v=cityVal(it,c);if(v&&(it.id==='videocall'||it.id==='netflix'))return v.v*CHARGE_KG;return null};
const statLine=(it,c)=>{const v=cityVal(it,c);if(v)return `${v.q?v.q+' ':''}${v.v} ${it.stat[2].toLowerCase()} ${it.stat[3]}, in ${cityName(c)} (modeled)`;return `${it.stat[1]} ${it.stat[2].toLowerCase()} ${it.stat[3]}`};
const store={get(){try{return JSON.parse(localStorage.getItem('cc2')||'{}')}catch(e){return {}}},set(v){try{localStorage.setItem('cc2',JSON.stringify(v))}catch(e){}}};

const Chev=html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9.5l6 6 6-6" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function Nav({tone,go,active,count}){
  return html`<header class=${'nav '+(tone||'')}>
    <button class="logo" onClick=${()=>go('home')} aria-label="Consumption Concoction, home">Consumption Concoction</button>
    <nav class="nav-r">
      <button class=${active==='home'?'on':''} onClick=${()=>go('home')}>Home</button>
      <button class=${active==='menu'?'on':''} onClick=${()=>go('menu')}>Menu</button>
      <button class=${active==='swap'?'on':''} onClick=${()=>go('swap')}>Swap Kitchen</button>
      <button class=${active==='about'?'on':''} onClick=${()=>go('about')}>About</button>
      <button class="bag" onClick=${()=>go('kitchen')} aria-label=${'Your pot: '+count+' ingredients'}>
        <svg viewBox="0 0 24 24"><path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8z M9 8V6.5a3 3 0 0 1 6 0V8" fill="none" stroke="#24211f" stroke-width="1.5" stroke-linejoin="round"/><circle cx="10" cy="13" r=".9" fill="#24211f"/><circle cx="14" cy="13" r=".9" fill="#24211f"/><path d="M9.6 15.6q2.4 2 4.8 0" fill="none" stroke="#24211f" stroke-width="1.3" stroke-linecap="round"/></svg>
        ${count?html`<b>${count}</b>`:null}
      </button>
    </nav>
  </header>`;
}

/* ---------- HOME ---------- */
const LAND=html`<svg class="land" viewBox="0 0 1692 330" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <path d="M0 72 C120 50 240 34 340 42 C480 54 600 100 760 122 C940 140 1120 112 1300 92 C1450 76 1580 62 1692 58 L1692 330 L0 330Z" fill="#d9e08a"/>
  <path d="M430 330 C470 230 520 150 600 132 C760 140 900 196 1090 214 C1320 234 1500 196 1692 164 L1692 330Z" fill="#b8c977"/>
  <path d="M0 236 C140 218 300 246 430 296 C450 306 466 318 476 330 L0 330Z" fill="#b8c977"/>
  <path d="M580 204 C760 226 980 248 1190 262 C1400 276 1570 298 1692 308 L1692 330 L1560 330 C1340 330 1120 316 920 296 C770 280 660 250 580 204Z" fill="#abd2e8"/>
  <path d="M760 268 C980 300 1240 322 1460 330 L860 330 C820 310 790 290 760 268Z" fill="#d9e08a"/>
  <g fill="none" stroke="#a3ba6c" stroke-width="5" stroke-linecap="round">
    <path d="M30 170 q-4 -26 -14 -36 M42 168 q2 -30 12 -40 M54 170 q8 -18 20 -22"/>
    <path d="M560 172 q-4 -22 -12 -30 M572 170 q2 -26 10 -34 M584 172 q8 -16 18 -18"/>
    <path d="M1130 160 q-4 -22 -12 -30 M1142 158 q2 -26 10 -34 M1154 160 q8 -16 18 -18"/>
    <path d="M1550 110 q-4 -22 -12 -30 M1562 108 q2 -26 10 -34 M1574 110 q8 -16 18 -18"/>
    <path d="M330 300 q-4 -28 -14 -38 M342 298 q2 -32 12 -42 M356 300 q8 -18 20 -22"/>
    <path d="M640 290 q-4 -22 -12 -30 M652 288 q2 -26 10 -34 M664 290 q8 -16 18 -18"/>
  </g>
  <path d="M80 326 q8 -46 36 -58 q-18 28 -8 58 M112 330 q26 -36 64 -38 q-36 18 -36 38" fill="none" stroke="#86a356" stroke-width="5" stroke-linecap="round"/>
  ${[[90,236],[420,240],[466,250],[520,226],[1622,206],[1644,226]].map(([x,y],i)=>html`<g key=${i} transform=${`translate(${x} ${y})`}><path d="M0 8 V44" stroke="#a3ba6c" stroke-width="3"/><circle cx="-6" cy="0" r="7" fill="#fff"/><circle cx="6" cy="0" r="7" fill="#fff"/><circle cx="0" cy="-6" r="7" fill="#fff"/><circle cx="0" cy="6" r="7" fill="#fff"/><circle r="4.5" fill="#f49ab5"/></g>`)}
</svg>`;
function Home({go,count}){
  return html`<main class="pg">
    <${Nav} go=${go} active="home" count=${count}/>
    <section class="home2">
      ${LAND}
      <img class="h2-cook" src=${A.b_cook} alt="A cook sprinkling ingredients into a large pot"/>
      <img class="h2-cons" src=${A.b_consumer} alt="A figure carrying an armful of everyday things"/>
      <div class="h2-c">
        <h1 class="disp">What's your<br/>hidden<br/>consumption</h1>
        <p>Add the things you eat, wear, use, watch, apply and buy. We'll cook up what you've really been consuming.</p>
        <button class="btn" onClick=${()=>go('kitchen')}>Cook your concoction <span aria-hidden="true">→</span></button>
      </div>
    </section>
  </main>`;
}

/* ---------- KITCHEN ---------- */
function potSpots(n){
  const out=[];if(!n)return out;
  const perRow=n<=4?n:n<=10?Math.ceil(n/2):Math.ceil(n/3);const rows=Math.ceil(n/perRow);
  let k=0;for(let r=0;r<rows;r++){const m=Math.min(perRow,n-k);for(let c=0;c<m;c++){
    const fx=(c+.5)/m, fy=rows===1?.55:(r+.5)/rows;
    const w=Math.sin(Math.PI*(.15+.7*fy));
    out.push({x:50+(fx-.5)*86*Math.max(.55,w),y:18+fy*72,s:Math.max(9,Math.min(19,78/perRow))});k++}}
  return out;
}
function Kitchen({sel,setSel,go,count}){
  const potRef=useRef();const [hot,setHot]=useState(false);
  const toggle=id=>setSel(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  const add=id=>setSel(s=>s.includes(id)?s:[...s,id]);
  const overPot=(x,y)=>{const r=potRef.current.getBoundingClientRect();return x>r.left&&x<r.right&&y>r.top-40&&y<r.bottom};
  const onDown=(e,id)=>{
    if(e.button&&e.button!==0)return;
    const sx=e.clientX,sy=e.clientY;let g=null,drag=false;
    const move=ev=>{if(!drag&&Math.hypot(ev.clientX-sx,ev.clientY-sy)>7){drag=true;g=document.createElement('img');g.src=ic(id);g.className='ghost';document.body.appendChild(g)}
      if(drag){g.style.transform=`translate(${ev.clientX-42}px,${ev.clientY-42}px) rotate(${(ev.clientX-sx)*.05}deg)`;setHot(overPot(ev.clientX,ev.clientY))}};
    const up=ev=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);window.removeEventListener('pointercancel',up);
      if(drag){g.remove();setHot(false);if(ev.type==='pointerup'&&overPot(ev.clientX,ev.clientY))add(id)}else if(ev.type==='pointerup')toggle(id)};
    window.addEventListener('pointermove',move);window.addEventListener('pointerup',up);window.addEventListener('pointercancel',up)};
  const card=id=>{const it=BY[id];const on=sel.includes(id);return html`<button key=${id} class=${'ing'+(on?' on':'')} aria-pressed=${on} aria-label=${(on?'Remove ':'Add ')+it.short}
      onPointerDown=${e=>onDown(e,id)} onKeyDown=${e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle(id)}}}>
      <span class="ib"><img src=${ic(id)} alt="" draggable="false"/></span><span class="l">${it.short}</span></button>`};
  const spots=potSpots(sel.length);
  return html`<main class="pg">
    <${Nav} go=${go} active="home" count=${count}/>
    <section class="kit">
      <h1 class="disp">What did you<br/>consume today?</h1>
      <p>Drag your everyday ingredients into the pot. Tap one to add it, tap it again to take it out.</p>
      <div class="k-stage">
        <div class="k-grid">${KITCHEN_L.map(card)}</div>
        <div class="k-mid">
          <div class=${'pot'+(hot?' hot':'')} ref=${potRef}>
            <img src=${A.b_pot} alt=${sel.length?'The pot, holding '+sel.map(i=>BY[i].short).join(', '):'An empty cooking pot'}/>
            <div class="pot-in">${sel.map((id,i)=>html`<img key=${id} src=${ic(id)} alt="" title=${'Take out '+BY[id].short} onClick=${()=>toggle(id)} style=${{left:spots[i].x+'%',top:spots[i].y+'%',width:spots[i].s+'%',height:(spots[i].s*2.6)+'%'}}/>`)}</div>
          </div>
          <div class="k-count">Ingredients added: <b>${pad(sel.length)}</b></div>
          <button class="btn" disabled=${!sel.length} onClick=${()=>go('city')}>Cook my concoction <span aria-hidden="true">→</span></button>
          ${sel.length?html`<button class="lnk k-clear" onClick=${()=>setSel([])}>Empty the pot</button>`:null}
        </div>
        <div class="k-grid">${KITCHEN_R.map(card)}</div>
      </div>
    </section>
  </main>`;
}

/* ---------- CITY ---------- */
function City({city,setCity,go,count,next}){
  return html`<main class="pg">
    <${Nav} go=${go} count=${count}/>
    <section class="city">
      <h1 class="disp">Where are you<br/>cooking from?</h1>
      <p>Some side effects depend on where you live. Choose a city to see how your consumption changes.</p>
      <div class="cities" role="radiogroup" aria-label="Choose your city">
        ${CITIES.map(([k,n,img])=>html`<button key=${k} role="radio" aria-checked=${city===k} class=${'cc'+(city===k?' on':'')} onClick=${()=>setCity(k)}>
          <span class="ck"><svg viewBox="0 0 24 24"><path d="M6.5 12.5l3.6 3.6 7.4-8" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          <img src=${A['d_'+img]} alt=""/><span>${n}</span></button>`)}
      </div>
      <button class="btn" disabled=${!city} onClick=${()=>go(next||'cooking')}>Continue cooking <span aria-hidden="true">→</span></button>
    </section>
  </main>`;
}

/* ---------- READY ---------- */
/* ---------- COOKING (stop motion) ---------- */
const COOK_STEPS=[['Making your consumption concoction','We’re bringing your everyday ingredients together to see the bigger picture.'],
 ['Adding in your ingredients','Your selected items are going into the pot.'],
 ['Uncovering the side effects','We’re analyzing the hidden effects of what you consume.'],
 ['Your consumption is done!','Your concoction is ready.']];
const COOK_AT=[3,6,9];  // frame at which steps 1-3 tick
function Cooking({sel,go,count}){
  const RMo=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [f,setF]=useState(RMo?11:0);const done=f>=11;
  useEffect(()=>{let i=RMo?11:0,t;const tick=()=>{i=i<11?i+1:9+((i-8)%3);setF(i);t=setTimeout(tick,i<11?430:520)};t=setTimeout(tick,RMo?520:430);return()=>clearTimeout(t)},[]);
  const reached=useRef(false);if(f>=11)reached.current=true;const fin=reached.current;
  const state=i=>i<3?((fin||f>=COOK_AT[i])?'ok':(i===0||f>=COOK_AT[i-1])?'now':''):(fin?'now':'');
  return html`<main class="pg">
    <${Nav} go=${go} count=${count}/>
    <section class="cook">
      <div class="cook-l">${Array.from({length:12},(_,i)=>html`<img key=${i} class=${'fr'+(i===f?' on':'')} src=${A['f'+i]} alt=${i===f?'Your ingredients tumbling into the pot and being stirred':''}/>`)}</div>
      <div class="cook-r">
        <ol class="steps">${COOK_STEPS.map(([h,p],i)=>html`<li key=${i} class=${'st-'+(state(i)||'todo')}>
          <span class="dot">${state(i)==='ok'?html`<svg viewBox="0 0 24 24"><path d="M6.5 12.5l3.6 3.6 7.4-8" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`:null}</span>
          <div><h3>${h}</h3><p>${p}</p></div></li>`)}</ol>
        <button class=${'rbtn solid cook-btn'+(fin?' show':'')} disabled=${!fin} onClick=${()=>go('ready')}>View your consumption <span aria-hidden="true">→</span></button>
      </div>
    </section>
  </main>`;
}

function Ready({sel,go,count}){
  return html`<main class="pg green">
    <${Nav} tone="lime" go=${go} count=${count}/>
    <section class="ready">
      <svg class="hills" viewBox="0 0 1625 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 C200 10 380 30 560 70 C760 112 900 60 1100 50 C1300 40 1460 70 1625 60 L1625 200 L0 200Z" fill="#c4d392"/><path d="M0 110 C220 70 420 80 640 120 C800 150 880 190 960 200 L0 200Z" fill="#9fb273"/><path d="M1000 140 C1180 90 1380 100 1625 130 L1625 200 L940 200Z" fill="#b2c483"/></svg>
      <svg class="flower fl-l" viewBox="0 0 130 140" aria-hidden="true"><path d="M58 140 Q60 90 56 40 M70 140 Q84 100 100 70" stroke="#7d9a52" stroke-width="4" fill="none"/><path d="M40 140 Q10 110 18 70 Q46 96 50 140Z" fill="#8fae5e"/><circle cx="56" cy="30" r="22" fill="#f6a35c"/><circle cx="100" cy="64" r="17" fill="#f2735a"/></svg>
      <svg class="flower fl-r" viewBox="0 0 160 180" aria-hidden="true"><path d="M70 180 Q72 120 82 60 M66 180 Q50 130 32 100" stroke="#7d9a52" stroke-width="4" fill="none"/><path d="M76 180 Q120 140 140 70 Q90 100 70 180Z" fill="#8fae5e"/><path d="M60 180 Q20 150 4 120 Q50 130 66 180Z" fill="#a8c878"/><circle cx="82" cy="40" r="24" fill="#f6a35c"/><circle cx="30" cy="92" r="20" fill="#f2735a"/></svg>
      <div class="ready-l"><${Character} sel=${sel} onPick=${id=>{window.__ccOpen=id;go('results')}}/></div>
      <div class="ready-r">
        <h1 class="disp">Your concoction<br/>is ready!</h1>
        <h2>Meet your consumption character</h2>
        <p>You have selected ${sel.length} ingredient${sel.length===1?'':'s'} from your everyday life. Now see the hidden effects of what you consume, along with ways to reduce them.</p>
        <button class="btn sage" onClick=${()=>go('results')}>View the secrets</button>
      </div>
    </section>
  </main>`;
}

/* ---------- shared bodies ---------- */
function Sources({src,right}){return html`<div class=${'srcs'+(right?' right':'')}>${src.map((s,i)=>html`<a key=${i} href=${s[1]} target="_blank" rel="noopener noreferrer">${s[0]}</a>`)}</div>`}
function ConsBody({it,city}){
  const v=cityVal(it,city);
  return html`<div>
    <div class="cb">
      <div class="stats">
        <div class="st"><div class="lab">${it.stat[0]}</div><div class="big">${it.stat[1]}</div><div class="unit">${it.stat[2]}</div><div class="sub">${it.stat[3]}</div></div>
        ${v?html`<div class="st"><div class="lab">${cityName(city)}</div><div class="big">${v.q?html`<span class="q">${v.q}</span>`:null}${v.v}</div><div class="unit">${it.stat[2]}</div><div class="sub">${it.stat[3]}</div><span class="prov">Provisional modeled estimate</span></div>`:null}
      </div>
      <div class="cb-art"><img class="se-art" src=${A['s_'+SE_ART[it.id]]||art(it.id)} alt=""/>${v?html`<p>${it.expl}</p><p>${it.cityNote}</p>`:null}</div>
    </div>
    ${v?null:html`<p class="expl">${it.expl}${it.unverified?' (Estimate awaiting matched-source verification.)':''}</p>`}
    <${Sources} src=${it.src} right=${!!v}/>
  </div>`;
}
function SubBody({it}){const s=it.sub;
  return html`<div class="sb">
    <div class="k">Substitute</div>
    <h3>${s.name}</h3>
    ${s.cmp?html`<div class="cmp"><div><span class="v">${s.cmp[0]}</span><span class="u">${s.cmp[2]}</span></div><span class="ar" aria-label="to">→</span><div><span class="v">${s.cmp[1]}</span><span class="u">${s.cmp[2]}</span></div></div>`:null}
    ${s.single?html`<div class="cmp"><div><span class="v">${s.single[0]}</span><span class="u">${s.single[1]}</span></div></div>`:null}
    <p>${s.text}</p>
    ${s.note?html`<p class="note">${s.note}</p>`:null}
  </div>`;
}
function Acc({n,it,open,onToggle,children,cls}){
  return html`<li id=${'acc-'+it.id} class=${'acc'+(open?' open':'')+(cls?' '+cls:'')}>
    <button class="acc-h" aria-expanded=${open} onClick=${onToggle}><span class="num">${n}</span><span class="acc-t">${it.title}</span><span class="chev">${Chev}</span></button>
    ${open?html`<div class="acc-b">${children}</div>`:null}
  </li>`;
}

/* ---------- RESULTS (consumption + substitutes) ---------- */
function Tabs({mode,go}){
  const T=[['results','Consumption'],['subs','Substitutes'],['receipt','Your Receipt']];
  return html`<div class="tabs" role="tablist">${T.map(([k,l])=>html`<button key=${k} role="tab" aria-selected=${mode===k} class=${'tab'+(mode===k?' on':'')} onClick=${()=>go(k)}>${l}</button>`)}</div>`;
}
function CityLine({city,setCity}){
  return html`<div class="cityline"><span>Estimates for</span>${CITIES.map(([k,n])=>html`<button key=${k} class=${city===k?'on':''} aria-pressed=${city===k} onClick=${()=>setCity(k)}>${n}</button>`)}</div>`;
}
function Results({mode,sel,city,setCity,go,count}){
  const subs=mode==='subs';
  const [open,setOpen]=useState(()=>{const o=window.__ccOpen;window.__ccOpen=null;return o&&sel.includes(o)?o:sel[0]});const listRef=useRef();
  useEffect(()=>{if(open&&open!==sel[0])pick(open)},[]);
  const pick=id=>{setOpen(id);requestAnimationFrame(()=>requestAnimationFrame(()=>{const e2=document.getElementById('acc-'+id);const L=listRef.current;if(!e2||!L)return;const lr=L.getBoundingClientRect(),er=e2.getBoundingClientRect();if(er.top<lr.top||er.bottom>lr.bottom)L.scrollTop+=er.top-lr.top-8;if(window.innerWidth<=900)e2.scrollIntoView({block:'start',behavior:'smooth'})}))};
  const toggle=id=>{const el=document.getElementById('acc-'+id);const t0=el?el.getBoundingClientRect().top:0;setOpen(o=>o===id?null:id);
    requestAnimationFrame(()=>{const e2=document.getElementById('acc-'+id);const L=listRef.current;if(!e2||!L)return;L.scrollTop+=e2.getBoundingClientRect().top-t0;
      const lr=L.getBoundingClientRect(),er=e2.getBoundingClientRect();if(er.bottom>lr.bottom)L.scrollTop+=Math.min(er.bottom-lr.bottom+8,er.top-lr.top-6)})};
  const hasCity=sel.some(id=>BY[id].city);
  return html`<main class=${'pg fit'+(subs?' green':'')}>
    <${Nav} tone=${subs?'lime':''} go=${go} count=${count}/>
    <section class="res">
      <div class="res-l">
        <h1 class="disp">${subs?html`Let's reduce your<br/>side effects`:html`What did you<br/>actually consume`}</h1>
        <div class="art"><${Character} sel=${sel} ground=${true} onPick=${pick}/></div>
      </div>
      <div class="res-r">
        <${Tabs} mode=${mode} go=${go}/>
        ${hasCity&&!subs?html`<${CityLine} city=${city} setCity=${setCity}/>`:null}
        <ul class="accs" ref=${listRef}>
          ${sel.map((id,i)=>html`<${Acc} key=${id} n=${i+1} it=${BY[id]} open=${open===id} onToggle=${()=>toggle(id)}>
            ${subs?html`<${SubBody} it=${BY[id]}/>`:html`<${ConsBody} it=${BY[id]} city=${city}/>`}
          <//>`)}
          <li class="rc-cta"><span>${subs?'See it all together':'Ready for the bill?'}</span><button class="btn" onClick=${()=>go(subs?'receipt':'subs')}>${subs?'Your receipt':'See substitutes'} →</button></li>
        </ul>
      </div>
    </section>
  </main>`;
}

/* ---------- RECEIPT ---------- */
const RC_LABEL={skincare:'Morning routine (12 products)',tshirt:'T-shirt (1 cotton)',coffee:'Daily coffee (1 year)',videocall:'Video call (1 hour)',broccoli:'Frozen broccoli (100 g)',gum:'Chewing gum (1 piece)',uber:'Solo Uber (5 miles)',razor:'Disposable razors (10 yrs)',dishes:'Handwashed dishes (1 load)',scroll:'Scrolling (3 hours)',ai:'AI prompt (1)',tea:'Plastic tea bag (1)',perfume:'Perfume (1 spritz)',blender:'Beauty blender (1)'};
const rcLabel=it=>{if(RC_LABEL[it.id])return RC_LABEL[it.id];const q=it.qty.split(',').pop().trim();return `${it.short} (${q})`};
const rcEffect=(it,c)=>{const v=cityVal(it,c);const n=v?(v.q==='Up to'?'Up to ':'')+v.v:it.stat[1];const u=it.stat[2].toLowerCase();const tail=/^of (drinking|water)/.test(it.stat[3])?' '+it.stat[3]:'';return `${n} ${u}${tail}`};
function Barcode({seed}){const bars=useMemo(()=>{let x=0;const out=[];for(let i=0;i<58;i++){const h=hashN(seed+i);const w=1+Math.floor(h*3.2);out.push([x,w]);x+=w+1+Math.floor(hashN(seed+'g'+i)*2.4)}return {out,x}},[seed]);
  return html`<svg class="bc" viewBox=${`0 0 ${bars.x} 30`} preserveAspectRatio="none" aria-hidden="true">${bars.out.map(([x,w],i)=>html`<rect key=${i} x=${x} y="0" width=${w} height="30" fill="#1d1a1a"/>`)}</svg>`}
function hashN(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return (h>>>0)/4294967295}
function Receipt({sel,city,setCity,go,count,reset}){
  const ref=useRef();const [msg,setMsg]=useState('');
  const W=sel.filter(id=>BY[id].water!=null),C=sel.filter(id=>co2Of(BY[id],city)!=null);
  const water=W.reduce((a,id)=>a+BY[id].water,0),co2=C.reduce((a,id)=>a+co2Of(BY[id],city),0);
  const showers=water/SHOWER_L,flights=co2/FLIGHT.kg;
  const fmt=(n,d)=>n.toLocaleString('en-US',{maximumFractionDigits:d,minimumFractionDigits:0});
  const shTxt=W.length?fmt(showers,showers<10?1:0):'—';
  const flTxt=C.length?(flights<1?fmt(flights,flights<.1?3:2):fmt(flights,1)):'—';
  const d=new Date();const date=d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}).toUpperCase();
  const charMarkup=useMemo(()=>characterSVG(sel),[sel.join(',')]);
  const download=async()=>{setMsg('');try{const dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null;
      if(!dl||!window.html2canvas){setMsg('Downloading isn\'t available here. Use “Save receipt” instead.');return}
      const cv=await html2canvas(ref.current,{backgroundColor:null,scale:2});const blob=await new Promise(r=>cv.toBlob(r,'image/png'));
      await dl.save({filename:'consumption-receipt.png',data:blob});setMsg('Receipt downloaded.')}catch(e){setMsg(e&&e.code==='declined'?'':'Couldn\'t download the receipt. Try again.')}};
  return html`<main class="pg fit">
    <${Nav} go=${go} count=${count}/>
    <section class="res rcp">
      <div class="rcp-l">
        <h1 class="disp">Your<br/>consumption<br/>receipt</h1>
        <p class="rcp-sub">A summary of what you consume and the hidden costs behind it.</p>
        <button class="rbtn solid" onClick=${download}>Download receipt <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="rbtn" onClick=${()=>window.print()}>Save receipt <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.8h10v16.4l-5-3.8-5 3.8z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg></button>
        ${msg?html`<p class="rc-msg" role="status">${msg}</p>`:null}
        <p class="rcp-links"><button class="lnk" onClick=${()=>go('city','receipt')}>Change city</button><span aria-hidden="true">·</span><button class="lnk" onClick=${reset}>Start a new concoction</button></p>
      </div>
      <div class="res-r">
        <${Tabs} mode="receipt" go=${go}/>
        <div class="rcp-scroll">
          <div class="slip-sh"><article class="slip" ref=${ref}>
            <h2>Consumption Concoction</h2>
            <div class="dash"></div>
            <p class="meta">${date} · ${(cityName(city)||'No city').toUpperCase()}</p>
            <div class="slip-art" dangerouslySetInnerHTML=${{__html:charMarkup}}></div>
            <div class="dash"></div>
            <table class="slip-t"><thead><tr><th>Item</th><th>Side effect</th></tr></thead>
              <tbody>${sel.map(id=>html`<tr key=${id}><td>${rcLabel(BY[id])}</td><td>${rcEffect(BY[id],city)}</td></tr>`)}</tbody></table>
            <div class="dash"></div>
            <p class="tot-h">Your total</p>
            <div class="slip-tot">
              <div><b>${shTxt}</b><span class="u">Showers</span><small>worth of water</small></div>
              <i aria-hidden="true"></i>
              <div><b>${flTxt}</b><span class="u">Flights</span><small>worth of emissions</small></div>
            </div>
            <div class="dash"></div>
            <p class="thanks">Thank you<br/>for your consumption!</p>
            <${Barcode} seed=${sel.join(',')}/>
          </article></div>
          <p class="slip-note">Showers: ${W.length} of ${sel.length} items with a comparable water footprint, at ${SHOWER_L} L per shower. Flights: ${C.length} of ${sel.length} items with a CO₂e estimate, at ${FLIGHT.kg} kg CO₂e per ${FLIGHT.label} flight. Water and carbon are never combined; totals cover only the selected items as modeled.</p>
        </div>
      </div>
    </section>
  </main>`;
}

/* ---------- MENU + ITEM ---------- */
function Menu({go,count,openItem}){
  const [f,setF]=useState('all');const list=ITEMS.filter(i=>f==='all'||i.cat===f);
  return html`<main class="pg">
    <${Nav} tone="rose" go=${go} active="menu" count=${count}/>
    <section class="menu">
      <h1 class="disp">The menu</h1>
      <div class="filters" role="tablist">${CATS.map(([k,l])=>html`<button key=${k} role="tab" aria-selected=${f===k} class=${'fp'+(f===k?' on':'')} onClick=${()=>setF(k)}>${l}</button>`)}</div>
      <div class="mgrid">${list.map(it=>html`<button key=${it.id} class="mc" onClick=${()=>openItem(it.id)}><img src=${ic(it.id)} alt=""/><b>${it.short}</b><small>${it.stat[1]} ${it.stat[2].toLowerCase()}</small></button>`)}</div>
    </section>
  </main>`;
}
function Item({id,go,count,city,setCity}){
  const it=BY[id];const c=city||'new-york';
  return html`<main class="pg">
    <${Nav} tone="rose" go=${go} active="menu" count=${count}/>
    <section class="item">
      <div class="item-l"><button class="lnk" onClick=${()=>go('menu')}>← Back to the menu</button><h1 class="disp">${it.title}</h1><p class="item-q">${it.qty}</p><img src=${art(id)} alt=""/></div>
      <div class="item-r">
        ${it.city?html`<${CityLine} city=${c} setCity=${setCity}/>`:null}
        <p class="cap">The side effect</p>
        <ul class="accs" style=${{overflow:'visible',margin:0}}><li class="acc open"><div class="acc-b"><${ConsBody} it=${it} city=${c}/></div></li></ul>
      </div>
    </section>
  </main>`;
}

/* ---------- ABOUT ---------- */
function About({go,count}){
  return html`<main class="pg">
    <${Nav} go=${go} active="about" count=${count}/>
    <section class="about">
      <div class="ab-top">
        <img src=${A.b_consumer} alt="A figure carrying an armful of everyday things"/>
        <h1 class="disp">Everything you consume<br/>comes with something<br/>you didn't order.</h1>
        <img src=${A.b_cook} alt="A cook sprinkling ingredients into a large pot"/>
      </div>
      <div class="ab-cols">
        <section><h2>The project</h2><p>Consumption Concoction is an investigation into the unexpected consequences of everyday consumption: the water, emissions, microplastics, insects and ingredients that travel with the things we eat, wear, use, watch, apply and buy.</p><p>It isn't about guilt. It reveals trade-offs, so the consequences become visible.</p></section>
        <section><h2>Why a recipe?</h2><p>A recipe starts with simple ingredients, just like our daily choices. Put them together in the pot and they cook into something much bigger. Each habit becomes an ingredient, and the side effects are what you didn't know you were serving.</p><p>The substitutes show other ingredients you could reach for.</p></section>
        <section><h2 class="g">Methodology</h2><ul>
          <li>Estimates come from published studies, government data and reputable reporting, linked under every fact.</li>
          <li>Comparisons such as bathtubs, phone charges or days of drinking water translate a measured or modeled quantity into something familiar.</li>
          <li>Some results are modeled, because nobody can measure every product directly. They're labelled as estimates.</li>
          <li>Substitutes reduce a particular impact; they rarely eliminate it, and every alternative has its own footprint.</li>
          <li>Location matters for electricity: the same hour of streaming or ironing depends on how a city's power is generated.</li>
        </ul></section>
      </div>
      <div class="ab-cta"><button class="btn" onClick=${()=>go('kitchen')}>Cook your concoction</button></div>
    </section>
  </main>`;
}

/* ---------- APP ---------- */
function App(){
  const saved=useMemo(()=>store.get(),[]);
  const [route,setRoute]=useState('home');const [after,setAfter]=useState(null);
  const [sel,setSel]=useState((saved.sel||[]).filter(id=>BY[id]));
  const [city,setCity]=useState(saved.city||null);
  const [item,setItem]=useState(null);
  useEffect(()=>{store.set({sel,city})},[sel,city]);
  const go=useCallback((r,next)=>{setAfter(next||null);setRoute(r);window.scrollTo(0,0)},[]);
  const reset=()=>{setSel([]);go('kitchen')};
  const count=sel.length;
  const p={go,count};
  if((route==='results'||route==='subs'||route==='receipt'||route==='ready')&&!sel.length)return html`<${Kitchen} ...${p} sel=${sel} setSel=${setSel}/>`;
  switch(route){
    case 'kitchen':return html`<${Kitchen} ...${p} sel=${sel} setSel=${setSel}/>`;
    case 'city':return html`<${City} ...${p} city=${city} setCity=${setCity} next=${after}/>`;
    case 'cooking':return html`<${Cooking} ...${p} sel=${sel}/>`;
    case 'ready':return html`<${Ready} ...${p} sel=${sel}/>`;
    case 'results':case 'subs':return html`<${Results} key=${route} ...${p} mode=${route} sel=${sel} city=${city} setCity=${setCity}/>`;
    case 'receipt':return html`<${Receipt} ...${p} sel=${sel} city=${city} setCity=${setCity} reset=${reset}/>`;
    case 'menu':return html`<${Menu} ...${p} openItem=${id=>{setItem(id);go('item')}}/>`;
    case 'item':return html`<${Item} ...${p} id=${item} city=${city} setCity=${setCity}/>`;
    case 'swap':return html`<${SwapKitchen} ...${p} city=${city} setCity=${setCity}/>`;
    case 'about':return html`<${About} ...${p}/>`;
    default:return html`<${Home} ...${p}/>`;
  }
}

