/* ================================================================
   CONSUMPTION CHARACTER — built from layers cut out of the
   reference illustration. The base figure is always drawn; each
   selected item adds its own layer (data-ci) on top.
   ================================================================ */
const CH_HAND=['coffee','wine','tea','almond','pizza','burger','chocolate'];   // raised hand
const CH_PHONE=['videocall','scroll','netflix','ai'];                          // held to the chest
const CH_BOTTLE=['skincare','moisturizer','perfume'];                          // the pump bottle in the bag
const CH_SPOTS=[[105,385,100,-24],[55,330,80,-32],[125,305,82,-10],[60,418,74,-18],[150,238,72,8],[30,372,66,-40],[88,250,66,-14],[170,410,70,6],[185,282,84,-6]];
function chLayout(sel){
  const has=id=>sel.includes(id);const used=new Set();
  const take=list=>{const id=list.find(x=>has(x)&&!used.has(x));if(id)used.add(id);return id||null};
  const L={};
  L.gum=take(['gum']);L.tee=take(['tshirt']);L.jeans=take(['jeans']);L.car=take(['uber']);
  L.hand=take(CH_HAND);L.phone=take(CH_PHONE);
  L.cheese=take(['cheese']);L.bottle=take(CH_BOTTLE);
  L.bag=sel.filter(id=>!used.has(id));
  L.hasBag=!!(L.cheese||L.bottle||L.bag.length);
  return L;
}
const clImg=(k,extra='')=>{const v=CL[k];return `<image href="${v.src}" x="${v.x}" y="${v.y}" width="${v.w}" height="${v.h}"${extra}/>`};
const icImg=(id,cx,cy,s,rot)=>`<image href="${A['i_'+BY[id].icon]}" x="${cx-s/2}" y="${cy-s/2}" width="${s}" height="${s}" preserveAspectRatio="xMidYMid meet" transform="rotate(${rot} ${cx} ${cy})"/>`;
const ci=(id,inner)=>`<g class="ci" data-ci="${id}" tabindex="0" role="button" aria-label="${BY[id].short}: show its side effect">${inner}</g>`;
function characterSVG(sel){
  const L=chLayout(sel);let s='';
  s+=clImg('base');
  if(L.hasBag){
    s+=clImg('greens');
    // free spots in the bag (the cheese and bottle keep their own places)
    let spots=CH_SPOTS.filter((p,i)=>!(L.bottle&&i===8)&&!(L.cheese&&i===7));
    const extra=L.bag.length-spots.length;
    if(extra>0){for(let i=0;i<extra;i++)spots.push([30+(i%4)*48,280+Math.floor(i/4)*60,56,(i%2?12:-12)])}
    const sc=L.bag.length>6?.82:1;
    L.bag.forEach((id,i)=>{const p=spots[i];s+=ci(id,icImg(id,p[0],p[1],p[2]*sc,p[3]))});
    if(L.cheese)s+=ci(L.cheese,clImg('cheese'));
    if(L.bottle)s+=ci(L.bottle,clImg('bottle'));
    s+=clImg('bag')+clImg('strap');
  }
  if(L.tee)s+=ci(L.tee,clImg('tee'));
  if(L.jeans)s+=ci(L.jeans,clImg('jeans'));
  if(L.car)s+=ci(L.car,clImg('car'));
  if(L.phone)s+=ci(L.phone,clImg('phone'));
  s+=clImg('lhand');
  if(L.hand)s+=ci(L.hand,L.hand==='coffee'?`<g class="steam">${clImg('steam')}</g>`+clImg('cup'):icImg(L.hand,576,228,92,-8));
  s+=clImg('rfing');
  if(L.gum)s+=ci(L.gum,`<g class="gum">${clImg('gum')}</g>`);
  return `<svg class="char" viewBox="0 0 730 960" role="img" aria-label="Your consumption character with ${sel.map(i=>BY[i].short).join(', ')}">${s}</svg>`;
}
/* click an item: it grows a little and its side effect opens; leave: it settles back */
function Character({sel,cls,ground,onPick}){
  const ref=useRef();const pickRef=useRef(onPick);pickRef.current=onPick;
  const markup=useMemo(()=>characterSVG(sel),[sel.join(',')]);
  useEffect(()=>{const el=ref.current;if(!el)return;
    const find=e=>e.target.closest&&e.target.closest('.ci');
    const on=e=>{const g=find(e);if(!g)return;g.classList.add('big');
      if(e.pointerType&&e.pointerType!=='mouse'){clearTimeout(g._t);g._t=setTimeout(()=>g.classList.remove('big'),700)}
      if(pickRef.current)pickRef.current(g.dataset.ci)};
    const out=e=>{const g=find(e);if(!g)return;if(e.relatedTarget&&g.contains(e.relatedTarget))return;g.classList.remove('big')};
    const key=e=>{if(e.key!=='Enter'&&e.key!==' ')return;const g=find(e);if(!g)return;e.preventDefault();g.classList.add('big');if(pickRef.current)pickRef.current(g.dataset.ci)};
    const blur=e=>{const g=find(e);if(g)g.classList.remove('big')};
    el.addEventListener('pointerup',on);el.addEventListener('pointerout',out);el.addEventListener('keydown',key);el.addEventListener('focusout',blur);
    return()=>{el.removeEventListener('pointerup',on);el.removeEventListener('pointerout',out);el.removeEventListener('keydown',key);el.removeEventListener('focusout',blur)}},[markup]);
  return html`<div class=${'char-wrap '+(cls||'')} ref=${ref}>
    ${ground?html`<svg class="char-ground" viewBox="0 0 600 120" aria-hidden="true"><ellipse cx="300" cy="70" rx="280" ry="38" fill="#e4edcd"/></svg>`:null}
    <div class="char-svg" dangerouslySetInnerHTML=${{__html:markup}}></div>
  </div>`;
}
