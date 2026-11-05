/* ================================================================
   THE SWAP KITCHEN — browse an item, compare substitutes, find them
   ================================================================ */
/* ---------- drawings (100×100, gradients + grain, no outlines) ---------- */
const sh=(x,y,c='#f6c443')=>`<path d="M${x} ${y} l-5 -6" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>`;
const steamD=(x,y)=>`<path d="M${x} ${y} q-6 -8 0 -16 q6 -8 0 -16" fill="none" stroke="url(#sSteam)" stroke-width="5" stroke-linecap="round" opacity=".85"/>`;
const leaf=(x,y,r=0,s=1)=>`<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M0 0 Q10 -14 24 -10 Q14 4 0 0Z" fill="url(#sGn)"/><path d="M0 0 Q12 -6 22 -9" stroke="#e8f0cf" stroke-width="1" fill="none" opacity=".7"/></g>`;
const flowerB=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})">${[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>`<ellipse cx="0" cy="-9" rx="2.6" ry="8" fill="url(#sBlue)" transform="rotate(${i*30})"/>`).join('')}<circle r="3.4" fill="#f6c443"/></g>`;
const flowerY=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})">${[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i=>`<ellipse cx="0" cy="-8" rx="2" ry="7" fill="url(#sYe)" transform="rotate(${i*25.7})"/>`).join('')}<circle r="3" fill="#f2a33a"/></g>`;
const roots=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-22 4 L22 -6" stroke="url(#sWood)" stroke-width="7" stroke-linecap="round"/><path d="M-20 -6 L20 6" stroke="url(#sWood)" stroke-width="6" stroke-linecap="round"/><path d="M-8 -3 l3 2 M6 2 l3 -1 M-12 2 l2 2" stroke="#b47a4e" stroke-width="1.2"/></g>`;
const berry=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -10 Q12 -8 9 4 Q5 13 0 14 Q-5 13 -9 4 Q-12 -8 0 -10Z" fill="url(#sRed)"/>${[[-4,-2],[3,-4],[0,4],[5,3],[-5,6]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r=".9" fill="#ffe6a6"/>`).join('')}<path d="M-6 -11 L0 -8 L6 -11 L0 -14Z" fill="url(#sGn)"/></g>`;
const mug=(liq,extra='')=>`${steamD(48,26)}${steamD(60,30)}<path d="M22 40 H74 V64 Q74 86 52 86 H44 Q22 86 22 64Z" fill="url(#sPk)"/><path d="M74 46 Q90 46 88 60 Q86 72 72 72" stroke="url(#sYe)" stroke-width="6" fill="none"/><ellipse cx="48" cy="41" rx="26" ry="6" fill="${liq}"/><ellipse cx="40" cy="40" rx="8" ry="2" fill="#fff" opacity=".35"/>${extra}`;
const iced=(liq,extra='')=>`<path d="M30 30 H70 L66 86 Q65 90 60 90 H40 Q35 90 34 86Z" fill="#fff" opacity=".55"/><path d="M31.5 46 H68.5 L66 86 Q65 90 60 90 H40 Q35 90 34 86Z" fill="${liq}"/>${[[40,52],[54,50],[46,64]].map(([x,y])=>`<rect x="${x}" y="${y}" width="10" height="10" rx="2" fill="#fff" opacity=".55" transform="rotate(12 ${x} ${y})"/>`).join('')}<path d="M58 30 L64 10" stroke="url(#sPkL)" stroke-width="4" stroke-linecap="round"/>${extra}`;
const carton=(c,l)=>`<path d="M32 30 L40 16 H60 L68 30 V90 H32Z" fill="${c}"/><path d="M32 30 L40 16 H60 L68 30Z" fill="#fff6ee"/><rect x="44" y="7" width="12" height="9" rx="2" fill="url(#sGn)"/><path d="M58 30 H68 V90 H58Z" fill="#fff" opacity=".18"/><rect x="36" y="50" width="24" height="16" rx="3" fill="#fff" opacity=".75"/>${l||''}`;
const wineB=(c,lab)=>`<path d="M43 8 H57 V28 C57 33 68 37 68 48 V86 Q68 90 64 90 H36 Q32 90 32 86 V48 C32 37 43 33 43 28Z" fill="${c}"/><rect x="34" y="54" width="32" height="20" rx="2" fill="${lab}"/><path d="M38 38 q-3 8 -2 22" stroke="#fff" stroke-width="3" opacity=".35" fill="none" stroke-linecap="round"/>`;
const pint=(liq)=>`<path d="M30 26 H70 L65 88 Q64 92 60 92 H40 Q36 92 35 88Z" fill="${liq}"/><path d="M29 20 Q38 12 50 18 Q62 12 71 20 L70 28 H30Z" fill="#fff8ee"/><circle cx="42" cy="56" r="1.6" fill="#fff" opacity=".7"/><circle cx="56" cy="66" r="1.2" fill="#fff" opacity=".7"/><circle cx="48" cy="74" r="1.4" fill="#fff" opacity=".7"/>`;
const jarD=(fill,lid,lab)=>`<rect x="28" y="30" width="44" height="58" rx="9" fill="${fill}"/><rect x="26" y="18" width="48" height="14" rx="4" fill="${lid}"/><rect x="33" y="48" width="34" height="24" rx="4" fill="#fff" opacity=".78"/>${lab||''}<rect x="31" y="36" width="4" height="46" rx="2" fill="#fff" opacity=".3"/>`;
const barD=(wrap,inner)=>`<g transform="rotate(-14 50 54)"><rect x="24" y="26" width="52" height="58" rx="4" fill="${inner}"/>${[0,1,2].map(r=>[0,1].map(c=>`<rect x="${29+c*24}" y="${30+r*12}" width="18" height="9" rx="2" fill="#fff" opacity=".14"/>`).join('')).join('')}<rect x="22" y="58" width="56" height="28" rx="3" fill="${wrap}"/><rect x="30" y="68" width="40" height="3" rx="1.5" fill="#fff" opacity=".8"/></g>`;
const bowlD=(fill,top)=>`<path d="M14 52 H86 Q84 86 50 88 Q16 86 14 52Z" fill="url(#sPk)"/><ellipse cx="50" cy="52" rx="36" ry="9" fill="${fill}"/>${top||''}<path d="M30 88 H70" stroke="#f4c3b0" stroke-width="4" stroke-linecap="round"/>`;
const noodles=`<path d="M22 50 q6 -8 12 0 t12 0 t12 0 t12 0 t10 0 M26 46 q6 -6 12 0 t12 0 t12 0 t12 0" stroke="url(#sGnL)" stroke-width="3" fill="none" stroke-linecap="round"/>`;
const peas=`${[[30,49],[38,46],[46,50],[54,46],[62,49],[70,47],[42,53],[58,53],[50,45]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.6" fill="url(#sYe)"/>`).join('')}`;
const seedsD=`${[...Array(16)].map((_,i)=>`<ellipse cx="${26+(i*7)%48}" cy="${46+((i*5)%9)}" rx="3.4" ry="1.6" fill="url(#sGn)" transform="rotate(${(i*47)%180} ${26+(i*7)%48} ${46+((i*5)%9)})"/>`).join('')}`;
const sliceD=(cheese)=>`<path d="M50 92 L16 24 Q50 8 84 24Z" fill="url(#sYe)"/><path d="M16 24 Q50 8 84 24 L79 34 Q50 20 21 34Z" fill="#f2a36b"/><path d="M50 84 L24 34 Q50 22 76 34Z" fill="${cheese?'#ffe6a0':'url(#sRed)'}"/>${cheese?`<circle cx="44" cy="44" r="6" fill="#f07a5a"/><circle cx="58" cy="56" r="5" fill="#f07a5a"/>`:`<circle cx="44" cy="44" r="3" fill="url(#sGn)"/><circle cx="58" cy="56" r="3" fill="url(#sGn)"/><circle cx="50" cy="68" r="2.4" fill="#fff6e0"/>`}${leaf(50,40,10,.5)}`;
const burgerD=(patty)=>`<path d="M18 46 Q18 22 50 22 Q82 22 82 46Z" fill="url(#sYe)"/>${[[38,32],[50,28],[62,33],[46,38]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="2" ry="1.2" fill="#fff6e0"/>`).join('')}<path d="M14 50 Q30 44 50 50 T86 50 V56 H14Z" fill="url(#sGnL)"/><rect x="16" y="54" width="68" height="12" rx="6" fill="${patty}"/><rect x="16" y="66" width="68" height="4" fill="#ffd86a"/><path d="M18 70 H82 Q82 84 50 84 Q18 84 18 70Z" fill="url(#sYe)"/>`;
const blockD=(c)=>`<path d="M20 44 L50 30 L80 44 L80 72 L50 86 L20 72Z" fill="${c}"/><path d="M20 44 L50 58 L80 44 L50 30Z" fill="#fff" opacity=".45"/><path d="M50 58 V86" stroke="#fff" stroke-width="1.4" opacity=".5"/>`;
const carrots=`${[[-14,0],[0,-6],[14,2]].map(([dx,r])=>`<g transform="translate(${50+dx} 56) rotate(${r*3})"><path d="M-6 -24 L6 -24 L1 30 Q0 32 -1 30Z" fill="url(#sOr)"/><path d="M-3 -24 q-6 -10 -2 -16 M0 -24 q0 -12 4 -16 M3 -24 q6 -8 8 -12" stroke="url(#sGn)" stroke-width="3" fill="none" stroke-linecap="round"/></g>`).join('')}`;
const stems=`${[[-10,-8],[6,6]].map(([dx,r])=>`<g transform="translate(${50+dx} 56) rotate(${r})"><rect x="-6" y="-28" width="12" height="56" rx="6" fill="url(#sGnL)"/><path d="M-2 -20 V22" stroke="#fff" stroke-width="1.6" opacity=".45"/></g>`).join('')}`;
const teeD=(c)=>`<path d="M30 20 L42 16 Q50 24 58 16 L70 20 L88 36 L78 48 L70 42 V88 H30 V42 L22 48 L12 36Z" fill="${c}"/><path d="M42 16 Q50 26 58 16" stroke="#fff" stroke-width="2.4" fill="none" opacity=".6"/>`;
const pantsD=(c)=>`<path d="M32 14 H68 L74 90 H56 L50 40 L44 90 H26Z" fill="${c}"/><rect x="32" y="14" width="36" height="7" fill="#fff" opacity=".3"/><path d="M50 21 V36" stroke="#fff" stroke-width="1.4" opacity=".5"/>`;
const hangerD=`<path d="M50 12 q6 -6 0 -9 q-5 -2 -6 3" stroke="#c98b5a" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M50 12 L22 26 H78Z" stroke="#c98b5a" stroke-width="2.4" fill="none" stroke-linejoin="round"/>`;
const trainD=`<rect x="18" y="20" width="64" height="58" rx="14" fill="url(#sGn)"/><rect x="26" y="30" width="48" height="20" rx="4" fill="#fff8ee"/><circle cx="34" cy="64" r="5" fill="#fff6d0"/><circle cx="66" cy="64" r="5" fill="#fff6d0"/><path d="M30 78 L22 92 M70 78 L78 92" stroke="#c98b5a" stroke-width="4" stroke-linecap="round"/><path d="M14 92 H86" stroke="#c98b5a" stroke-width="3" stroke-linecap="round"/>`;
const busD=`<rect x="10" y="26" width="80" height="48" rx="10" fill="url(#sYe)"/>${[0,1,2,3].map(i=>`<rect x="${16+i*18}" y="34" width="14" height="16" rx="2" fill="#fff8ee"/>`).join('')}<rect x="10" y="58" width="80" height="5" fill="url(#sPkL)"/><circle cx="28" cy="78" r="8" fill="#c98b5a"/><circle cx="72" cy="78" r="8" fill="#c98b5a"/><circle cx="28" cy="78" r="3" fill="#fff"/><circle cx="72" cy="78" r="3" fill="#fff"/>`;
const bikeD=`<circle cx="26" cy="66" r="16" fill="none" stroke="url(#sGn)" stroke-width="5"/><circle cx="76" cy="66" r="16" fill="none" stroke="url(#sGn)" stroke-width="5"/><path d="M26 66 L42 40 H66 L76 66 M42 40 L52 66 L66 40 M40 32 H50 M66 40 L62 28 H70" stroke="url(#sOr)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="52" cy="66" r="3" fill="#c98b5a"/>`;
const dropper=(c)=>`<rect x="42" y="8" width="16" height="16" rx="7" fill="url(#sGn)"/><rect x="45" y="22" width="10" height="8" fill="#fff8ee"/><path d="M34 34 Q34 28 40 28 H60 Q66 28 66 34 V84 Q66 90 60 90 H40 Q34 90 34 84Z" fill="${c}"/><rect x="38" y="52" width="24" height="18" rx="2" fill="#fff" opacity=".75"/><path d="M38 34 V82" stroke="#fff" stroke-width="2.4" opacity=".35" stroke-linecap="round"/>`;
const sprayB=(c)=>`<rect x="44" y="10" width="12" height="10" rx="2" fill="url(#sGn)"/><rect x="42" y="20" width="16" height="8" rx="2" fill="#fff8ee"/><path d="M30 42 Q30 30 42 30 H58 Q70 30 70 42 V82 Q70 90 62 90 H38 Q30 90 30 82Z" fill="${c}"/><rect x="38" y="54" width="24" height="18" rx="3" fill="#fff" opacity=".75"/><circle cx="66" cy="16" r="1.6" fill="#f7a9c4"/><circle cx="72" cy="12" r="1.4" fill="#f7a9c4"/><circle cx="70" cy="22" r="1.2" fill="#f7a9c4"/>`;
const applic=`<path d="M50 14 C66 14 76 30 70 50 L60 78 Q56 86 50 86 Q44 86 40 78 L30 50 C24 30 34 14 50 14Z" fill="url(#sPkL)"/><ellipse cx="42" cy="34" rx="5" ry="10" fill="#fff" opacity=".45"/><rect x="44" y="80" width="12" height="12" rx="3" fill="url(#sGn)"/>`;
const stripsD=`${[0,1,2].map(i=>`<g transform="rotate(${-18+i*14} 50 54)"><rect x="22" y="${36+i*4}" width="56" height="20" rx="4" fill="${['url(#sPkL)','url(#sYe)','url(#sGnL)'][i]}"/><rect x="28" y="${42+i*4}" width="44" height="8" rx="2" fill="#fff" opacity=".55"/></g>`).join('')}`;
const safetyR=`<g transform="rotate(-24 50 50)"><rect x="46" y="38" width="8" height="54" rx="4" fill="url(#sYe)"/>${[0,1,2,3,4].map(i=>`<rect x="46" y="${50+i*8}" width="8" height="2" fill="#fff" opacity=".45"/>`).join('')}<rect x="26" y="20" width="48" height="16" rx="5" fill="url(#sGn)"/><rect x="24" y="33" width="52" height="4" rx="1" fill="#e6e1d6"/></g>`;
const steamerD=`<path d="M30 40 Q30 26 44 26 H56 Q70 26 70 40 V76 Q70 84 62 84 H38 Q30 84 30 76Z" fill="url(#sPkL)"/><rect x="40" y="84" width="20" height="10" rx="3" fill="url(#sGn)"/><rect x="40" y="10" width="20" height="18" rx="5" fill="url(#sYe)"/><path d="M38 6 q-4 -6 2 -10 M50 4 q-4 -6 2 -10 M62 6 q-4 -6 2 -10" stroke="#cfe6f4" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="38" y="44" width="24" height="16" rx="3" fill="#fff" opacity=".6"/>`;
const basinsD=`<path d="M8 50 H50 Q48 80 29 80 Q10 80 8 50Z" fill="url(#sPk)"/><ellipse cx="29" cy="50" rx="21" ry="5" fill="url(#sBlue)"/><path d="M50 56 H92 Q90 86 71 86 Q52 86 50 56Z" fill="url(#sGnL)"/><ellipse cx="71" cy="56" rx="21" ry="5" fill="url(#sBlue)"/><circle cx="24" cy="46" r="3" fill="#fff" opacity=".8"/><circle cx="32" cy="44" r="2.2" fill="#fff" opacity=".8"/>`;
const washerD=`<rect x="22" y="12" width="56" height="78" rx="8" fill="url(#sPkL)"/><rect x="22" y="12" width="56" height="16" rx="8" fill="url(#sGn)"/><circle cx="50" cy="58" r="20" fill="#fff8ee"/><circle cx="50" cy="58" r="15" fill="url(#sBlue)"/><path d="M36 60 q7 -6 14 0 t14 0 V66 Q58 72 50 72 Q42 72 36 66Z" fill="#8fc0e6"/>`;
const laptopOff=`<rect x="18" y="20" width="64" height="44" rx="5" fill="url(#sPkL)"/><rect x="23" y="25" width="54" height="34" rx="2" fill="#fff8ee"/><circle cx="50" cy="38" r="7" fill="url(#sYe)"/><path d="M40 52 Q50 42 60 52" fill="url(#sYe)"/><path d="M28 30 L72 56" stroke="#ef7639" stroke-width="3" stroke-linecap="round"/><path d="M10 66 H90 L84 76 H16Z" fill="url(#sGnL)"/>`;
const phoneCall=`<g transform="rotate(-14 50 50)"><rect x="32" y="12" width="36" height="76" rx="8" fill="url(#sPkL)"/><rect x="36" y="20" width="28" height="58" rx="4" fill="#fff8ee"/><path d="M44 36 q-4 4 0 14 q4 10 12 14 q4 2 6 -2 l-4 -6 l-5 2 q-6 -6 -7 -12 l4 -3 z" fill="url(#sGn)"/></g><path d="M74 30 q8 8 0 18 M80 24 q14 14 0 30" stroke="#f6c443" stroke-width="3" fill="none" stroke-linecap="round"/>`;
const clockD=`<circle cx="50" cy="52" r="34" fill="url(#sPkL)"/><circle cx="50" cy="52" r="27" fill="#fff8ee"/><path d="M50 32 V52 L64 60" stroke="url(#sOr)" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M50 52 L50 25 A27 27 0 0 1 76 47Z" fill="url(#sGnL)" opacity=".55"/><rect x="44" y="10" width="12" height="8" rx="3" fill="url(#sGn)"/>`;
const bookD=`<path d="M14 26 Q32 18 50 28 V86 Q32 76 14 84Z" fill="url(#sPkL)"/><path d="M86 26 Q68 18 50 28 V86 Q68 76 86 84Z" fill="url(#sYe)"/><path d="M22 38 Q32 34 42 40 M22 48 Q32 44 42 50 M58 40 Q68 34 78 38 M58 50 Q68 44 78 48" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/>`;
const calcD=`<rect x="26" y="12" width="48" height="78" rx="8" fill="url(#sGn)"/><rect x="32" y="20" width="36" height="16" rx="3" fill="#fff8ee"/>${[0,1,2,3].map(r=>[0,1,2].map(c=>`<rect x="${33+c*12}" y="${43+r*11}" width="9" height="8" rx="2" fill="${r===3&&c===2?'#ff9a7c':'#fff8ee'}" opacity=".9"/>`).join('')).join('')}`;
const tvHD=`<rect x="10" y="18" width="80" height="54" rx="6" fill="url(#sPkL)"/><rect x="16" y="24" width="68" height="42" rx="3" fill="#fff8ee"/><text x="50" y="52" text-anchor="middle" font-family="Italiana,serif" font-size="20" fill="#ef7639">HD</text><path d="M38 72 L32 86 M62 72 L68 86 M26 86 H74" stroke="#c98b5a" stroke-width="3" stroke-linecap="round"/>`;
const sofaD=`<rect x="12" y="40" width="76" height="30" rx="10" fill="url(#sPkL)"/><rect x="20" y="26" width="60" height="22" rx="8" fill="url(#sYe)"/><rect x="8" y="44" width="14" height="30" rx="6" fill="url(#sGn)"/><rect x="78" y="44" width="14" height="30" rx="6" fill="url(#sGn)"/><path d="M18 74 V84 M82 74 V84" stroke="#c98b5a" stroke-width="4" stroke-linecap="round"/>`;
const dishwD=`<rect x="20" y="12" width="60" height="78" rx="8" fill="url(#sGnL)"/><rect x="20" y="12" width="60" height="16" rx="8" fill="url(#sYe)"/><rect x="28" y="36" width="44" height="44" rx="4" fill="#fff8ee"/>${[0,1,2,3].map(i=>`<ellipse cx="${36+i*9}" cy="58" rx="3" ry="12" fill="url(#sBlue)"/>`).join('')}<circle cx="68" cy="20" r="2.6" fill="#fff"/>`;
const swapD=`<path d="M22 40 A28 28 0 0 1 74 30" stroke="url(#sGn)" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M68 18 L76 31 L62 34" fill="url(#sGn)"/><path d="M78 60 A28 28 0 0 1 26 70" stroke="url(#sPk)" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M32 82 L24 69 L38 66" fill="url(#sPk)"/>`;
const mintD=`<path d="M50 94 V30" stroke="#7d9a52" stroke-width="3"/>${leaf(50,80,-150,1.9)}${leaf(50,80,-30,1.9)}${leaf(50,60,-145,1.6)}${leaf(50,60,-35,1.6)}${leaf(50,42,-135,1.3)}${leaf(50,42,-45,1.3)}${leaf(50,30,-90,1.1)}`;
const sparkW=`<path d="M32 22 H68 L64 88 Q63 92 58 92 H42 Q37 92 36 88Z" fill="#fff" opacity=".6"/><path d="M33.5 40 H66.5 L64 88 Q63 92 58 92 H42 Q37 92 36 88Z" fill="url(#sBlue)" opacity=".7"/>${[[44,60],[54,70],[48,78],[58,52]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2" fill="#fff"/>`).join('')}<circle cx="60" cy="34" r="10" fill="url(#sYe)"/><circle cx="60" cy="34" r="6" fill="#fff6c8"/>`;
const shea=`<ellipse cx="50" cy="76" rx="32" ry="12" fill="url(#sPkL)"/><rect x="18" y="52" width="64" height="24" fill="url(#sPkL)"/><ellipse cx="50" cy="52" rx="32" ry="10" fill="#fff6e0"/><path d="M38 50 q12 -10 24 0" stroke="#f2d6a6" stroke-width="3" fill="none"/>${leaf(70,40,-30,1)}`;
const fingertips=`<path d="M30 60 Q28 90 52 92 Q76 92 76 66 L80 44 Q81 38 76 38 Q71 38 70 44 L67 56 L66 24 Q66 18 60 18 Q55 18 55 24 L54 52 L52 18 Q52 12 46 12 Q40 12 40 18 L41 52 L38 26 Q37 20 32 21 Q27 22 28 28 L30 60Z" fill="url(#sPkL)"/>${[[46,16],[60,22],[33,25],[75,41]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="2.6" ry="1.8" fill="#fff" opacity=".6"/>`).join('')}${sh(24,26)}${sh(88,36)}`;
const thriftTag=(c)=>`${teeD(c)}<path d="M66 54 L84 50 L88 66 L70 70Z" fill="url(#sYe)"/><circle cx="72" cy="58" r="2" fill="#fff"/>`;
const plantD=`<path d="M28 58 H72 L66 90 Q65 94 60 94 H40 Q35 94 34 90Z" fill="url(#sPk)"/><rect x="25" y="54" width="50" height="9" rx="3" fill="url(#sYe)"/><path d="M50 54 V30" stroke="#7d9a52" stroke-width="3"/>${leaf(50,40,-150,1.4)}${leaf(50,40,-30,1.4)}${leaf(50,30,-120,1.1)}${leaf(50,30,-60,1.1)}`;
const SD={plant:plantD,
 chicory:mug('#8a5a3c',flowerB(26,82,.9)+roots(70,86,.8)),matcha:mug('url(#sGnL)',leaf(18,80,-20,1)),dandelion:iced('url(#sWoodL)',flowerY(76,78,1)),chicoryLatte:mug('#c08a62',flowerB(24,84,.8)),
 oat:carton('url(#sYe)',`<path d="M42 58 q6 -10 12 0" stroke="#d9a35a" stroke-width="2" fill="none"/>`),soy:carton('url(#sGnL)',`<ellipse cx="48" cy="58" rx="7" ry="5" fill="url(#sGn)"/>`),
 infuser:`<circle cx="50" cy="62" r="20" fill="url(#sBlue)" opacity=".75"/>${[...Array(10)].map((_,i)=>`<circle cx="${40+(i*7)%22}" cy="${54+(i*5)%16}" r="1.6" fill="#fff" opacity=".8"/>`).join('')}<path d="M50 42 V20 Q50 12 58 12" stroke="#c98b5a" stroke-width="2.6" fill="none"/>${leaf(58,24,-40,.9)}`,
 paperbag:`<path d="M34 30 H66 V78 Q66 84 60 84 H40 Q34 84 34 78Z" fill="url(#sWoodL)"/><path d="M34 30 L50 18 L66 30" fill="#f6dcb8"/><path d="M50 18 V8 H64" stroke="#c98b5a" stroke-width="1.6" fill="none"/><rect x="60" y="4" width="12" height="9" rx="1.5" fill="url(#sGn)"/>`,
 mint:mintD,beer:pint('url(#sYe)'),sparkling:sparkW,
 oatbar:barD('url(#sGnL)','url(#sYe)'),carob:barD('url(#sPkL)','#b9805a'),fennel:bowlD('url(#sGnL)',seedsD),chicle:`<circle cx="50" cy="48" r="26" fill="url(#sGnL)"/><ellipse cx="42" cy="38" rx="7" ry="4" fill="#fff" opacity=".55" transform="rotate(-30 42 38)"/><rect x="24" y="74" width="52" height="14" rx="3" fill="url(#sYe)"/>`,
 sunbutter:jarD('url(#sYe)','url(#sGn)',flowerY(50,60,.8)),tahini:jarD('#f6dcb8','url(#sPk)',`<circle cx="44" cy="60" r="2" fill="#c98b5a"/><circle cx="52" cy="58" r="2" fill="#c98b5a"/><circle cx="56" cy="64" r="2" fill="#c98b5a"/>`),
 marinara:sliceD(false),halfcheese:sliceD(true),chicken:burgerD('#e8b07a'),beanburger:burgerD('url(#sGn)'),mushroom:burgerD('#c99a7a'),
 zoodles:bowlD('url(#sGnL)',noodles),squash:bowlD('url(#sYe)',`<path d="M24 50 q6 -6 12 0 t12 0 t12 0 t12 0 t6 0" stroke="#f6c443" stroke-width="3" fill="none"/>`),
 tofu:blockD('url(#sYe)'),nooch:bowlD('url(#sYe)',`${[...Array(14)].map((_,i)=>`<path d="M${26+(i*7)%48} ${46+(i*3)%9} l4 -2" stroke="#f2a33a" stroke-width="2.4" stroke-linecap="round"/>`).join('')}`),
 chickpeas:bowlD('#f6dcb8',peas),scramble:`<ellipse cx="50" cy="66" rx="40" ry="14" fill="url(#sPkL)"/><ellipse cx="50" cy="62" rx="32" ry="10" fill="#fff8ee"/>${[[38,58],[50,60],[60,56],[44,64],[56,64]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="url(#sYe)"/>`).join('')}${leaf(66,52,-20,.5)}`,
 carrots,stems,freshbroc:`<circle cx="38" cy="38" r="14" fill="url(#sGn)"/><circle cx="56" cy="32" r="15" fill="url(#sGn)"/><circle cx="64" cy="48" r="12" fill="url(#sGn)"/><circle cx="46" cy="50" r="12" fill="url(#sGnL)"/><path d="M46 56 L42 90 H58 L54 56" fill="url(#sGnL)"/>${[[30,70],[70,76]].map(([x,y])=>`<path d="M${x} ${y} q-3 5 0 8 q3 -3 0 -8z" fill="url(#sBlue)"/>`).join('')}`,
 multi:`<g transform="translate(-14 4)">${dropper('url(#sYe)')}</g><g transform="translate(18 14) scale(.8)">${sprayB('url(#sPkL)')}</g>`,spf:`${jarD('url(#sPkL)','url(#sYe)','<text x="50" y="65" text-anchor="middle" font-family="Italiana,serif" font-size="12" fill="#ef7639">SPF</text>')}`,
 squalane:dropper('url(#sGnL)'),shea,rosewater:sprayB('url(#sPkL)')+flowerB(28,82,.6).replace(/sBlue/g,'sPkL'),disclosed:sprayB('url(#sYe)'),
 silicone:applic,fingertips,wax:stripsD,safety:safetyR,
 thrift:thriftTag('url(#sPkL)'),swap:`<g transform="translate(-8 2) scale(.7)">${teeD('url(#sYe)')}</g><g transform="translate(36 30) scale(.62)">${teeD('url(#sGnL)')}</g>`,
 linen:pantsD('#f2e2c6'),secondjeans:`${pantsD('url(#sBlue)')}<path d="M64 54 L82 50 L86 66 L68 70Z" fill="url(#sYe)"/>`,
 steamer:steamerD,hang:`${hangerD}<g transform="translate(10 14) scale(.8)">${teeD('url(#sGnL)')}</g>`,
 subway:trainD,bus:busD,bike:bikeD,
 cameraoff:laptopOff,phonecall:phoneCall,clock:clockD,book:bookD,calc:calcD,hd:tvHD,sofa:sofaD,basins:basinsD,dishwasher:dishwD
};
const sDraw=(k,cls='')=>`<svg class="sdraw ${cls}" viewBox="-4 -4 108 108" aria-hidden="true"><g filter="url(#gr)">${SD[k]||swapD}</g></svg>`;

/* ---------- substitutes for every item ---------- */
/* kind: 'buy' shows store locations · 'habit' needs no store.  cmp: [from, to, unit] only where a source supports it */
const OWID_M='https://ourworldindata.org/environmental-impact-milks';
const SWAPS={
 coffee:[{n:'Chicory Blend Latte',d:'chicory',k:'buy',t:'cafe',main:1,tx:'A dark, coffee-like drink that swaps half the coffee beans for roasted chicory root.'},
  {n:'Matcha Latte',d:'matcha',k:'buy',t:'cafe',tx:'A smooth, energising tea latte. Tea is generally estimated to need far less water per cup than coffee, though the milk you add has its own footprint.'},
  {n:'Iced Dandelion Latte',d:'dandelion',k:'buy',t:'cafe',tx:'Roasted dandelion root brews into a caffeine-free, coffee-like drink with no coffee beans at all.'},
  {n:'Chicory Latte',d:'chicoryLatte',k:'buy',t:'cafe',tx:'A fully coffee-free roasted chicory drink. We haven\'t found a matched footprint figure for it yet.'}],
 beans:[{n:'Half Chicory Blend',d:'chicory',k:'buy',t:'grocery',main:1},
  {n:'Dandelion Root Coffee',d:'dandelion',k:'buy',t:'grocery',tx:'Ground roasted dandelion root brews like coffee without coffee beans. No matched footprint figure yet.'},
  {n:'Matcha Powder',d:'matcha',k:'buy',t:'grocery',tx:'A caffeinated tea powder that replaces coffee beans in your morning cup.'}],
 almond:[{n:'Oat Milk',d:'oat',k:'buy',t:'grocery',main:1},
  {n:'Soy Milk',d:'soy',k:'buy',t:'grocery',cmp:['742','56','half-litre bottles'],tx:'Soy milk uses about 28 litres of freshwater per litre, the lowest of the common plant milks in the same dataset.',src:OWID_M}],
 tea:[{n:'Loose-Leaf Tea',d:'infuser',k:'buy',t:'cafe',main:1},
  {n:'Plastic-Free Tea Bags',d:'paperbag',k:'buy',t:'grocery',tx:'Look for bags labelled plastic-free: some paper bags are still sealed with plastic.'},
  {n:'Fresh Mint Tea',d:'mint',k:'buy',t:'grocery',tx:'Steep a few fresh mint leaves in hot water. No bag needed.'}],
 wine:[{n:'Beer',d:'beer',k:'buy',t:'grocery',main:1},
  {n:'Sparkling Water & Citrus',d:'sparkling',k:'buy',t:'grocery',tx:'A refreshing alcohol-free pour. We don\'t show a figure because we have no matched comparison.'}],
 chocolate:[{n:'Oat & Date Bar',d:'oatbar',k:'buy',t:'grocery',main:1},
  {n:'Carob Bar',d:'carob',k:'buy',t:'grocery',tx:'Carob tastes chocolatey and contains no cocoa. No matched footprint data yet.'}],
 gum:[{n:'Fennel Seeds',d:'fennel',k:'buy',t:'grocery',main:1},
  {n:'Natural Chicle Gum',d:'chicle',k:'buy',t:'grocery',tx:'Made with tree-sap chicle instead of a synthetic polymer gum base.'},
  {n:'Fresh Mint Leaves',d:'mint',k:'buy',t:'grocery',tx:'Chew a mint leaf for fresh breath without any gum base.'}],
 peanut:[{n:'Sunflower Seed Butter',d:'sunbutter',k:'buy',t:'grocery',main:1},
  {n:'Tahini',d:'tahini',k:'buy',t:'grocery',tx:'A creamy sesame spread. There is no data comparing insect fragments.'}],
 pizza:[{n:'Marinara Pizza',d:'marinara',k:'buy',t:'restaurant',main:1},
  {n:'Half-Cheese Veggie Pizza',d:'halfcheese',k:'buy',t:'restaurant',single:['≈ 2.4 kg','of CO₂e avoided'],tx:'Using 100 g less cheese avoids about 2.4 kg CO₂e, with the same 23.9 kg CO₂e per kg factor.'}],
 burger:[{n:'Chicken Burger',d:'chicken',k:'buy',t:'restaurant',main:1},
  {n:'Bean Burger',d:'beanburger',k:'buy',t:'restaurant',tx:'Plant-based patties generally need far less water than beef. We don\'t have a matched figure.'},
  {n:'Mushroom Burger',d:'mushroom',k:'buy',t:'restaurant',tx:'A meaty, savoury patty made from mushrooms. No matched figure yet.'}],
 pasta:[{n:'Zucchini Noodles',d:'zoodles',k:'buy',t:'grocery',main:1},
  {n:'Spaghetti Squash',d:'squash',k:'buy',t:'grocery',tx:'Roast it and fork out the strands: a fresh vegetable you can wash and inspect.'}],
 cheese:[{n:'Tofu',d:'tofu',k:'buy',t:'grocery',main:1},
  {n:'Nutritional Yeast',d:'nooch',k:'buy',t:'grocery',tx:'Savoury, cheesy-tasting flakes. No matched water figure yet.'}],
 eggs:[{n:'Cooked Chickpeas',d:'chickpeas',k:'buy',t:'grocery',main:1},
  {n:'Tofu Scramble',d:'scramble',k:'buy',t:'grocery',tx:'Crumbled tofu cooks like scrambled eggs. No matched figure yet.'}],
 broccoli:[{n:'Peeled Stems or Carrots',d:'carrots',k:'buy',t:'grocery',main:1},
  {n:'Fresh Broccoli',d:'freshbroc',k:'buy',t:'grocery',tx:'Buy it fresh, soak and rinse it yourself so you can inspect it.'}],
 skincare:[{n:'Multifunctional Products',d:'multi',k:'buy',t:'beauty',main:1},
  {n:'Tinted SPF Moisturizer',d:'spf',k:'buy',t:'beauty',tx:'One step instead of three: moisturiser, sun protection and a hint of colour.'}],
 moisturizer:[{n:'Plant Squalane',d:'squalane',k:'buy',t:'beauty',main:1},
  {n:'Shea Butter Balm',d:'shea',k:'buy',t:'beauty',tx:'A rich plant-based balm with no shark-derived ingredients.'}],
 perfume:[{n:'Rose Water',d:'rosewater',k:'buy',t:'beauty',main:1},
  {n:'Fully Disclosed Fragrance',d:'disclosed',k:'buy',t:'beauty',tx:'Choose a fragrance that lists every ingredient on the label.'}],
 blender:[{n:'Silicone Applicator',d:'silicone',k:'buy',t:'beauty',main:1},
  {n:'Clean Fingertips',d:'fingertips',k:'habit',tx:'Freshly washed fingers blend foundation well and need no sponge at all.'}],
 razor:[{n:'Wax Strips',d:'wax',k:'buy',t:'beauty',main:1},
  {n:'Safety Razor',d:'safety',k:'buy',t:'beauty',tx:'A metal handle that lasts for years, with only the thin blade replaced. Not part of the cited study, so no figure.'}],
 tshirt:[{n:'Secondhand T-shirt',d:'thrift',k:'buy',t:'thrift',main:1},
  {n:'Clothing Swap',d:'swap',k:'buy',t:'thrift',tx:'Trade clothes you no longer wear for something new to you.'}],
 jeans:[{n:'Linen Trousers',d:'linen',k:'buy',t:'thrift',main:1},
  {n:'Secondhand Jeans',d:'secondjeans',k:'buy',t:'thrift',tx:'Denim lasts for years. A pre-worn pair avoids the water of making a new one.'}],
 ironing:[{n:'Handheld Steamer',d:'steamer',k:'buy',t:'home',main:1},
  {n:'Hang to Smooth',d:'hang',k:'habit',tx:'Hang clothes straight from the wash. Many creases fall out on their own, no electricity needed.'}],
 uber:[{n:'Train or Subway',d:'subway',k:'buy',t:'transit',main:1},
  {n:'City Bus',d:'bus',k:'buy',t:'bus',cmp:['1.37','0.78','kg CO₂e per trip'],tx:'At about 97 g CO₂e per passenger-km, the same five miles by bus emits roughly 43% less.',src:'https://ourworldindata.org/travel-carbon-footprint'},
  {n:'Bike Share',d:'bike',k:'buy',t:'bike',tx:'Cycling has no tailpipe emissions at all.'}],
 videocall:[{n:'Camera Off',d:'cameraoff',k:'habit',main:1},
  {n:'Phone Call',d:'phonecall',k:'habit',tx:'For a quick catch-up, a voice call sends far less data than video.'}],
 scroll:[{n:'One Hour a Day',d:'clock',k:'habit',main:1},
  {n:'Read a Book',d:'book',k:'habit',tx:'Swap an evening scroll for a few chapters. No screen, no data.'}],
 netflix:[{n:'HD Instead of 4K',d:'hd',k:'habit',main:1},
  {n:'Watch Together',d:'sofa',k:'habit',tx:'One screen shared by the household instead of several separate streams.'}],
 ai:[{n:'Calculator or Search',d:'calc',k:'habit',main:1},
  {n:'A Dictionary',d:'book',k:'habit',tx:'For a definition or spelling, a dictionary does the job without AI.'}],
 dishes:[{n:'Two Basins',d:'basins',k:'habit',main:1},
  {n:'Full Dishwasher Loads',d:'dishwasher',k:'habit',tx:'An efficient dishwasher run only when full uses far less water than a running tap.',src:'https://www.energystar.gov/products/dishwashers'}]
};
/* fill the main card from the shared data */
Object.entries(SWAPS).forEach(([id,list])=>{const it=BY[id];list.forEach(s=>{if(s.main){s.cmp=s.cmp||it.sub.cmp;s.single=s.single||it.sub.single;s.tx=s.tx||it.sub.text;s.note=it.sub.note}})});
const SW_TAG={coffee:'A daily habit for many, but it comes with a cost.',beans:'The bag behind your morning brew.',almond:'Creamy, popular and surprisingly thirsty.',tea:'A cosy cup with something extra in it.',wine:'One bottle, many bathtubs.',chocolate:'A sweet treat with a heavy footprint.',gum:'Chewed for minutes, made of plastic.',peanut:'A pantry staple with a few extras.',pizza:'Cheesy, comforting and water-hungry.',burger:'The thirstiest thing on the grill.',pasta:'More than just wheat in the box.',cheese:'A small slice with a big footprint.',eggs:'A simple breakfast with hidden water.',broccoli:'Green, healthy, and sometimes buggy.',skincare:'Twelve steps, many ingredients.',moisturizer:'A little jar with a deep-sea secret.',perfume:'A spritz of the unknown.',blender:'Soft, bouncy and full of bacteria.',razor:'Small blades, ten years of waste.',tshirt:'A wardrobe basic, with a thirst.',jeans:'Years of drinking water in one pair.',ironing:'Crisp shirts, plenty of power.',uber:'A short ride with a long tail.',videocall:'Face to face, at a cost.',scroll:'Endless feed, real emissions.',netflix:'Binge-worthy, power-hungry.',ai:'A quick answer from a big machine.',dishes:'A sink full of water.'};
const SW_CATS=[['beverages','Beverages',['coffee','almond','tea','beans','wine'],'i:coffee'],['snacks','Snacks',['chocolate','peanut'],'i:pizza'],['meals','Meals',['pizza','burger','pasta'],'i:pasta'],['dairy','Dairy',['cheese','eggs'],'i:almond'],['produce','Produce',['broccoli'],'i:broccoli'],['beauty','Beauty',['skincare','moisturizer','perfume','blender','razor'],'i:blender'],['clothes','Clothes',['tshirt','jeans'],'i:tshirt'],['transport','Transportation',['uber'],'i:uber'],['tech','Technology',['videocall','ai'],'i:ai'],['ent','Entertainment',['netflix','scroll'],'i:netflix'],['house','Household',['dishes','ironing'],'i:dishes'],['other','Other',['gum'],'d:plant']];
const catArt=a=>a.startsWith('i:')?`<img src="${ic(a.slice(2))}" alt=""/>`:sDraw(a.slice(2));

/* ---------- illustrative city maps + example stores ---------- */
const STORE_NAMES={cafe:['Mellow Coffee Shop','Sunday Grind','Little Leaf Café','Morning Ritual','Bloom Tea House','The Roast Room','Pistil & Pour'],
 grocery:['Green Basket Market','Corner Pantry','Harvest Lane Grocer','Fresh Field Co-op','Daily Greens','The Root Cellar','Neighbourhood Larder'],
 restaurant:['Little Oven','Garden Grill','Slice & Basil','The Green Plate','Corner Kitchen','Market Table','Supper Club'],
 beauty:['Petal Apothecary','Glow Room','Botanica Beauty','Clean Shelf','Fern & Bloom','Soft Light Studio','Rosewood Chemist'],
 thrift:['Second Chapter Thrift','Loop Vintage','Rewear Studio','Thread Exchange','Pre-Loved Closet','Swap Society','Hanger Hall'],
 home:['Steam & Press','Household Goods Co.','Home Basics','The Laundry Shop','Everyday Hardware','Fold & Hang','Linen Room'],
 transit:['Central Station','Park Street Station','Riverside Station','Market Station','Garden Station','Union Station','Harbour Station'],
 bus:['Main St bus stop','Park Ave bus stop','Library bus stop','Market bus stop','Riverside bus stop','Museum bus stop','College bus stop'],
 bike:['Bike share dock · Park','Bike share dock · Plaza','Bike share dock · River','Bike share dock · Market','Bike share dock · Library','Bike share dock · Square','Bike share dock · Pier']};
const AVAIL={cafe:['Available offline','Available offline','Available online & offline'],grocery:['Available offline','Available online & offline','Available online & offline'],restaurant:['Available offline','Available online & offline (delivery)'],beauty:['Available offline','Available online & offline','Available online only'],thrift:['Available offline','Available online & offline'],home:['Available offline','Available online & offline'],transit:['Open now'],bus:['Every few minutes at peak'],bike:['Bikes available']};
const MAP_W=1100,MAP_H=800,ME=[550,400],MI_PER_UNIT=0.0042;
function rng(seed){let h=2166136261;for(const c of seed){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return()=>{h^=h<<13;h^=h>>>17;h^=h<<5;return ((h>>>0)%100000)/100000}}
function cityMapSVG(city){
  const r=rng(city+'map');const P=['#fde6c6','#fbd9cf','#fdeab8','#f9d3d6','#fff1d6','#fbe1c9'];
  let s=`<rect width="${MAP_W}" height="${MAP_H}" fill="#fbeedc"/>`;
  const step=city==='los-angeles'?74:city==='detroit'?66:58;
  const rot=city==='new-york'?-28:city==='detroit'?-12:0;
  s+=`<g transform="rotate(${rot} ${MAP_W/2} ${MAP_H/2})">`;
  for(let x=-400;x<MAP_W+400;x+=step)for(let y=-400;y<MAP_H+400;y+=step){const v=r();
    const fill=v<.11?'url(#mPark)':P[Math.floor(r()*P.length)];
    s+=`<rect x="${x+5}" y="${y+5}" width="${step-10}" height="${step-10}" rx="5" fill="${fill}"/>`;
    if(v<.11)for(let t=0;t<3;t++){const tx=x+12+r()*(step-24),ty=y+12+r()*(step-24);s+=`<path d="M${tx} ${ty+8} V${ty+14}" stroke="#7d9a52" stroke-width="2"/><circle cx="${tx}" cy="${ty+4}" r="6" fill="#8fb45f"/>`}}
  s+=`</g>`;
  // avenues
  s+=`<path d="M-50 ${MAP_H*.62} C300 ${MAP_H*.5} 700 ${MAP_H*.7} ${MAP_W+50} ${MAP_H*.55}" stroke="#fffaf2" stroke-width="16" fill="none"/>`;
  s+=`<path d="M${MAP_W*.3} -50 C${MAP_W*.4} 300 ${MAP_W*.25} 500 ${MAP_W*.35} ${MAP_H+50}" stroke="#fffaf2" stroke-width="14" fill="none"/>`;
  // water
  const W={ 'new-york':`M${MAP_W*.72} -40 C${MAP_W*.66} 200 ${MAP_W*.86} 380 ${MAP_W*.78} ${MAP_H+40}`,
    'los-angeles':`M-40 ${MAP_H*.86} C300 ${MAP_H*.8} 600 ${MAP_H*.95} ${MAP_W+40} ${MAP_H*.82}`,
    'detroit':`M-40 ${MAP_H*.2} C260 ${MAP_H*.32} 640 ${MAP_H*.08} ${MAP_W+40} ${MAP_H*.24}`}[city]||'';
  s+=`<path d="${W}" stroke="#bfe0e6" stroke-width="70" fill="none" stroke-linecap="round"/><path d="${W}" stroke="#d5ecee" stroke-width="40" fill="none" stroke-linecap="round" opacity=".7"/>`;
  // big park
  s+=`<path d="M${MAP_W*.08} ${MAP_H*.08} h170 q20 0 20 20 v110 q0 20 -20 20 h-170 q-20 0 -20 -20 v-110 q0 -20 20 -20Z" fill="url(#mPark)"/><ellipse cx="${MAP_W*.13}" cy="${MAP_H*.2}" rx="40" ry="22" fill="#cfe6ec"/>`;
  return s;
}
function storesFor(sub,city){
  const t=sub.t;const names=STORE_NAMES[t]||STORE_NAMES.grocery;const r=rng(city+sub.n);const out=[];
  const used=new Set();
  for(let i=0;i<7;i++){let x,y,tries=0;
    do{const a=r()*Math.PI*2,d=110+r()*300;x=ME[0]+Math.cos(a)*d*1.25;y=ME[1]+Math.sin(a)*d;tries++}while((x<60||x>MAP_W-60||y<60||y>MAP_H-60)&&tries<30);
    let k=Math.floor(r()*names.length);while(used.has(k))k=(k+1)%names.length;used.add(k);
    const miles=Math.hypot(x-ME[0],y-ME[1])*MI_PER_UNIT;
    out.push({x,y,name:names[k],mi:miles,av:(AVAIL[t]||AVAIL.grocery)[Math.floor(r()*(AVAIL[t]||AVAIL.grocery).length)]})}
  out.sort((a,b)=>a.mi-b.mi);return out;
}
function SwapMap({sub,city,setCity}){
  const c=city||'new-york';const box=useRef();const drag=useRef(null);
  const [view,setView]=useState({x:0,y:0,z:1});const [pick,setPick]=useState(0);
  const stores=useMemo(()=>storesFor(sub,c),[sub.n,c]);
  const mapMarkup=useMemo(()=>cityMapSVG(c),[c]);
  useEffect(()=>{setPick(0);setView({x:0,y:0,z:1})},[sub.n,c]);
  const clamp=(v,z)=>{const el=box.current;if(!el)return v;const bw=el.clientWidth,bh=el.clientHeight;const cw=bw*1.6*z,ch=cw*MAP_H/MAP_W;
    const minX=bw-cw,minY=Math.min(0,bh-ch);return {x:Math.min(0,Math.max(minX,v.x)),y:Math.min(0,Math.max(minY,v.y)),z}};
  const focus=(i,z)=>{const el=box.current;if(!el)return;const p=stores[i];if(!p)return;const bw=el.clientWidth,bh=el.clientHeight;
    setView(v=>{const zz=z||v.z;const cw=bw*1.6*zz,ch=cw*MAP_H/MAP_W;return clamp({x:bw/2-cw*p.x/MAP_W,y:bh*.64-ch*p.y/MAP_H,z:zz},zz)})};
  useEffect(()=>{focus(0,1)},[sub.n,c]);
  const down=e=>{if(e.target.closest('.pin,.pop,.mz'))return;drag.current={sx:e.clientX,sy:e.clientY,vx:view.x,vy:view.y};e.currentTarget.setPointerCapture(e.pointerId)};
  const move=e=>{const d=drag.current;if(!d)return;setView(v=>clamp({x:d.vx+e.clientX-d.sx,y:d.vy+e.clientY-d.sy,z:v.z},v.z))};
  const up=()=>{drag.current=null};
  const zoom=f=>setView(v=>{const el=box.current;const bw=el.clientWidth,bh=el.clientHeight;const z=Math.min(2.2,Math.max(1,v.z*f));const k=z/v.z;
    return clamp({x:bw/2-(bw/2-v.x)*k,y:bh/2-(bh/2-v.y)*k,z},z)});
  const key=e=>{const st=40;if(e.key==='ArrowLeft')setView(v=>clamp({...v,x:v.x+st},v.z));if(e.key==='ArrowRight')setView(v=>clamp({...v,x:v.x-st},v.z));if(e.key==='ArrowUp')setView(v=>clamp({...v,y:v.y+st},v.z));if(e.key==='ArrowDown')setView(v=>clamp({...v,y:v.y-st},v.z));if(e.key==='+'||e.key==='=')zoom(1.25);if(e.key==='-')zoom(.8)};
  const W=box.current?box.current.clientWidth*1.6*view.z:1;const sc=W/MAP_W;
  const s=stores[pick];
  return html`<div class="smap">
    <label class="sm-city"><span class="sr">City</span><select value=${c} onChange=${e=>setCity(e.target.value)}>${CITIES.map(([k,n])=>html`<option key=${k} value=${k}>${n==='New York'?'New York City':n}</option>`)}</select><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9.5l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></label>
    <div class="sm-box" ref=${box} tabindex="0" aria-label="Map of example locations. Drag or use arrow keys to move, plus and minus to zoom." onPointerDown=${down} onPointerMove=${move} onPointerUp=${up} onPointerCancel=${up} onKeyDown=${key}>
      <div class="sm-pan" style=${{transform:`translate(${view.x}px,${view.y}px)`,width:W+'px'}}>
        <svg class="sm-svg" viewBox=${`0 0 ${MAP_W} ${MAP_H}`} aria-hidden="true" dangerouslySetInnerHTML=${{__html:mapMarkup}}></svg>
        <span class="me" style=${{left:ME[0]*sc+'px',top:ME[1]*sc+'px'}} aria-hidden="true"></span>
        ${stores.map((p,i)=>html`<button key=${i} class=${'pin'+(i===pick?' on':'')} style=${{left:p.x*sc+'px',top:p.y*sc+'px'}} aria-label=${p.name+', '+p.mi.toFixed(1)+' miles away'} onClick=${()=>{setPick(i);focus(i)}}>
          <svg viewBox="0 0 24 32"><path d="M12 31 C12 31 2 18 2 11 A10 10 0 0 1 22 11 C22 18 12 31 12 31Z" fill="#f07a45"/><circle cx="12" cy="11" r="4" fill="#fff8ee"/></svg></button>`)}
        ${s?html`<div class="pop" role="status" style=${{left:s.x*sc+'px',top:s.y*sc+'px'}}><b>Available at ${s.name}</b><span>${s.mi<.1?'Under 0.1':s.mi.toFixed(1)} miles away</span><span>${s.av}</span></div>`:null}
      </div>
      <div class="mz"><button onClick=${()=>zoom(1.25)} aria-label="Zoom in">+</button><button onClick=${()=>zoom(.8)} aria-label="Zoom out">−</button></div>
    </div>
    <p class="sm-note">Illustrative map with example locations, not real stores or directions.</p>
  </div>`;
}

/* ---------- the page ---------- */
function SwapKitchen({go,count,city,setCity}){
  const [view,setView]=useState('home');const [cat,setCat]=useState(null);const [item,setItem]=useState('coffee');const [si,setSi]=useState(null);const [q,setQ]=useState('');const [open,setOpen]=useState({beverages:true});const [sug,setSug]=useState(false);
  const it=BY[item];const list=SWAPS[item];const sub=si!=null?list[si]:null;
  const home=()=>{setView('home');setSi(null);setQ('');window.scrollTo({top:0,behavior:'smooth'})};
  const openCat=k=>{setCat(k);setView('cat');setSi(null);setOpen(o=>({...o,[k]:true}));window.scrollTo({top:0,behavior:'smooth'})};
  const choose=(id,s=null)=>{setView('item');setItem(id);setSi(s);setQ(s!=null?SWAPS[id][s].n:BY[id].short);setSug(false);const c=SW_CATS.find(x=>x[2].includes(id));if(c)setOpen(o=>({...o,[c[0]]:true}));window.scrollTo({top:0,behavior:'smooth'})};
  const ql=q.trim().toLowerCase();
  const results=ql?[...ITEMS.filter(i=>SWAPS[i.id]&&(i.short+' '+i.title).toLowerCase().includes(ql)).map(i=>({id:i.id,s:null,label:i.short,sub:'Your consumption'})),
    ...Object.entries(SWAPS).flatMap(([id,l])=>l.map((s,k)=>({id,s:k,label:s.n,sub:'Swap for '+BY[id].short.toLowerCase()})).filter(x=>x.label.toLowerCase().includes(ql)))].slice(0,8):[];
  const mainSub=list.find(s=>s.main)||list[0];
  const big=it.stat[1],unit=it.stat[2];
  return html`<main class="pg swapk">
    <${Nav} tone="blush" go=${go} active="swap" count=${count}/>
    <div class="sk">
      <aside class="sk-side" aria-label="Categories">
        ${SW_CATS.map(([k,l,ids])=>html`<div key=${k} class="sk-cat">
          <button class="sk-ch" aria-expanded=${!!open[k]} onClick=${()=>setOpen(o=>({...o,[k]:!o[k]}))}><span>${l}</span><i class=${open[k]?'up':''}><svg viewBox="0 0 24 24"><path d="M6 9.5l6 6 6-6" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></i></button>
          ${open[k]?html`<ul>${ids.map(id=>html`<li key=${id}><button class=${id===item&&view==='item'?'on':''} onClick=${()=>choose(id)}>${BY[id].short}</button></li>`)}</ul>`:null}
        </div>`)}
      </aside>
      <section class="sk-main">
        <h1 class="disp sk-h"><button class="sk-hb" onClick=${home} title="Back to all categories">The Swap Kitchen</button></h1>${view==='home'?html`<p class="sk-lead">Find a substitute for your daily habit.</p>`:null}
        <div class="sk-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="#e7849f" stroke-width="2"/><path d="M15.5 15.5 L20 20" stroke="#e7849f" stroke-width="2" stroke-linecap="round"/></svg>
          <input value=${q} placeholder="Search for something you consume…" aria-label="Search consumption or substitute" onInput=${e=>{setQ(e.target.value);setSug(true)}} onFocus=${()=>setSug(true)} onBlur=${()=>setTimeout(()=>setSug(false),150)} onKeyDown=${e=>{if(e.key==='Enter'&&results[0])choose(results[0].id,results[0].s);if(e.key==='Escape')setSug(false)}}/>
          ${sug&&results.length?html`<ul class="sk-sug" role="listbox">${results.map((r,i)=>html`<li key=${i}><button onMouseDown=${e=>e.preventDefault()} onClick=${()=>choose(r.id,r.s)}><span>${r.label}</span><small>${r.sub}</small></button></li>`)}</ul>`:null}
          ${sug&&ql&&!results.length?html`<ul class="sk-sug"><li class="none">No matches. Try “coffee” or “oat milk”.</li></ul>`:null}
        </div>
        ${view==='home'?html`<div class="sk-cats">${SW_CATS.map(([k,l,ids,a])=>html`<article key=${k} class="skcat" onClick=${()=>openCat(k)}><div class="skcat-art" dangerouslySetInnerHTML=${{__html:catArt(a)}}></div><h4>${l}</h4><button class="skc-btn sm" onClick=${e=>{e.stopPropagation();openCat(k)}}>Explore <span aria-hidden="true">→</span></button></article>`)}</div>`:
         view==='cat'?(()=>{const C=SW_CATS.find(x=>x[0]===cat);return html`<div class="sk-over"><button class="lnk skd-back" onClick=${home}>← All categories</button><h2 class="disp sk-subh big">${C[1]}</h2><div class="sk-cats items">${C[2].map(id=>html`<article key=${id} class="skcat" onClick=${()=>choose(id)}><div class="skcat-art"><img src=${ic(id)} alt=""/></div><h4>${BY[id].short}</h4><p>${SWAPS[id].length} swaps</p><button class="skc-btn sm" onClick=${e=>{e.stopPropagation();choose(id)}}>See swaps <span aria-hidden="true">→</span></button></article>`)}</div></div>`})():
         sub?html`<div class="sk-detail">
          <div class="skd-l">
            <button class="lnk skd-back" onClick=${()=>setSi(null)}>← All swaps for ${it.short.toLowerCase()}</button>
            <h2 class="skd-name">${sub.n}</h2>
            <div class="skd-art" dangerouslySetInnerHTML=${{__html:sDraw(sub.d)}}></div>
            ${sub.cmp?html`<div class="skd-cmp"><div><b>${sub.cmp[0]}</b><span>${sub.cmp[2]}</span></div><i aria-label="to">→</i><div><b>${sub.cmp[1]}</b><span>${sub.cmp[2]}</span></div></div>`:
              sub.single?html`<div class="skd-cmp one"><div><b>${sub.single[0]}</b><span>${sub.single[1]}</span></div></div>`:
              html`<div class="skd-cmp"><div><b>${big}</b><span>${unit}</span></div><i aria-label="to">→</i><div><b class="word">Less</b><span>no verified figure</span></div></div>`}
            <p class="skd-tx">${sub.tx}</p>
            ${sub.note?html`<p class="skd-note">${sub.note}</p>`:null}
            ${sub.src?html`<p class="skd-src"><a href=${sub.src} target="_blank" rel="noopener noreferrer">Source</a></p>`:sub.main&&it.src?html`<p class="skd-src">${it.src.map((s,i)=>html`<a key=${i} href=${s[1]} target="_blank" rel="noopener noreferrer">${s[0]}</a>`)}</p>`:null}
          </div>
          <div class="skd-r">${sub.k==='buy'?html`<${SwapMap} sub=${sub} city=${city} setCity=${setCity}/>`:html`<div class="smap habit"><div class="hb-art" dangerouslySetInnerHTML=${{__html:sDraw(sub.d)}}></div><h3 class="disp">No store needed</h3><p>This swap is a change in habit, not a purchase, so there's nowhere to go. You can start right now.</p></div>`}</div>
        </div>`:html`<div class="sk-over">
          <button class="lnk skd-back" onClick=${()=>{const c=SW_CATS.find(x=>x[2].includes(item));c?openCat(c[0]):home()}}>← ${(SW_CATS.find(x=>x[2].includes(item))||[0,"All categories"])[1]}</button>
          <div class="sk-hero">
            <img class="skh-l" src=${ic(item)} alt=""/>
            <div class="skh-c"><h2 class="disp">${it.short}</h2><p>${SW_TAG[item]||it.title}</p><b>${big}</b><span>${unit}</span></div>
            <div class="skh-r" dangerouslySetInnerHTML=${{__html:sDraw(mainSub.d)}}></div>
          </div>
          <h3 class="disp sk-subh">Substitutes</h3>
          <div class=${'sk-grid n'+list.length}>${list.map((s,k)=>html`<article key=${k} class="sk-card">
            <div class="skc-art" dangerouslySetInnerHTML=${{__html:sDraw(s.d)}}></div>
            <h4>${s.n}</h4>
            <button class="skc-btn" onClick=${()=>{setSi(k);setQ(s.n);window.scrollTo({top:0,behavior:'smooth'})}}>${s.k==='habit'?'See this swap':'Find this'}</button>
          </article>`)}</div>
        </div>`}
      </section>
    </div>
  </main>`;
}
