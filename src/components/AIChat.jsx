import {useState,useRef,useEffect} from 'react'
const R=[['hello',/^(hi|hello|hey)\b|مرحب|اهلا|أهلا|سلام/i],['thanks',/thank|شكر/i],['age',/how old|\bage\b|عمرك|سنك|كام سنة|كم عمر/i],['where',/where|live|address|city|فين|عنوان|تسكن|مدين|بلد/i],['study',/study|univers|college|major|جامع|كلي|دراس|تخصص/i],['skills',/skill|good at|مهار|تجيد/i],['projects',/project|portfolio|مشرو|أعمال|اعمال/i],['services',/service|hire|خدم/i],['contact',/contact|whatsapp|telegram|phone|number|تواصل|واتس|تليج|رقم/i],['name',/name|who|اسم|مين|من أنت|من انت/i]]
export default function AIChat({t,open,setOpen}){
  const [ms,setMs]=useState([]),[q,setQ]=useState(''),[ty,setTy]=useState(false),[mn,setMn]=useState(false),end=useRef()
  useEffect(()=>{if(open&&!ms.length)setMs([{r:'b',x:t.bot.hello}])},[open])
  useEffect(()=>{end.current?.scrollIntoView({block:'end'})},[ms,ty])
  const send=e=>{e.preventDefault();const x=q.trim();if(!x||ty)return
    setQ('');setMs(m=>[...m,{r:'u',x}]);setTy(true)
    const k=(R.find(r=>r[1].test(x))||[])[0]
    const a=k?t.bot[k]:t.bot.fallback[Math.floor(Math.random()*t.bot.fallback.length)]
    setTimeout(()=>{setMs(m=>[...m,{r:'b',x:a}]);setTy(false)},600+Math.random()*700)}
  return <>
    <button className="btn fab" aria-label={t.chat.open} onClick={()=>{setOpen(!open);setMn(false)}}>🤖 {t.chat.open}</button>
    {open&&<div className={'chat'+(mn?' min':'')} role="dialog" aria-label={t.chat.h}>
      <div className="ch"><b>{t.chat.h}</b><span>
        <button aria-label={t.chat.clear} onClick={()=>setMs([{r:'b',x:t.bot.hello}])}>🗑</button>
        <button aria-label={t.chat.min} onClick={()=>setMn(!mn)}>–</button>
        <button aria-label={t.chat.close} onClick={()=>setOpen(false)}>✕</button></span></div>
      {!mn&&<><div className="msgs" aria-live="polite">{ms.map((m,i)=><div key={i} className={'m '+m.r}>{m.x}</div>)}{ty&&<div className="m dim">{t.chat.typing}</div>}<div ref={end}/></div>
      <form className="cf" onSubmit={send}><input aria-label={t.chat.ph} placeholder={t.chat.ph} value={q} onChange={e=>setQ(e.target.value)}/><button className="btn sm">{t.chat.send}</button></form></>}
    </div>}
  </>
}
