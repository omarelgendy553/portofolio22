import {useEffect,useRef,useState,Suspense,lazy,Component} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import en from './i18n/en.json'
import ar from './i18n/ar.json'
import P from './data/profile.js'
import Forms from './components/Forms.jsx'
import AIChat from './components/AIChat.jsx'
const RobotScene=lazy(()=>import('./components/RobotScene.jsx'))
gsap.registerPlugin(ScrollTrigger)
class EB extends Component{state={e:0};static getDerivedStateFromError(){return{e:1}};render(){return this.state.e?null:this.props.children}}
const ls=(k,v)=>{try{return v===undefined?localStorage.getItem(k):localStorage.setItem(k,v)}catch{return null}}
const D={en,ar}
export default function App(){
  const [lang,setLang]=useState(ls('lang')||'ar'),[modal,setModal]=useState(null),[chat,setChat]=useState(false),[consent,setConsent]=useState(ls('consent'))
  const t=D[lang],prog=useRef({v:0,cur:0}).current,mouse=useRef({x:0,y:0}).current,cur=useRef(),wrap=useRef(),hint=useRef()
  const mobile=innerWidth<768,calm=matchMedia('(prefers-reduced-motion:reduce)').matches
  useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';document.title=t.title;ls('lang',lang)},[lang])
  useEffect(()=>{
    const st=ScrollTrigger.create({trigger:'.intro',start:'top top',end:'bottom bottom',scrub:true,onUpdate:s=>{prog.v=s.progress;wrap.current.style.opacity=1-Math.max(0,(s.progress-.9)/.1);hint.current.style.opacity=Math.max(0,1-s.progress*6)}})
    const mm=e=>{mouse.x=e.clientX/innerWidth*2-1;mouse.y=-(e.clientY/innerHeight*2-1)
      if(cur.current){cur.current.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`;cur.current.classList.toggle('h',!!e.target.closest?.('a,button,.card'))}}
    addEventListener('mousemove',mm)
    if(!calm){gsap.set('.rv',{opacity:0,y:40});ScrollTrigger.batch('.rv',{start:'top 90%',once:true,onEnter:els=>gsap.to(els,{opacity:1,y:0,duration:.8,stagger:.1,ease:'power3.out'})})}
    return()=>{removeEventListener('mousemove',mm);ScrollTrigger.getAll().forEach(k=>k.kill())}
  },[])
  const A=t.about,isAr=lang==='ar',wa=`https://wa.me/${P.phone}`
  const rows=[[A.name,isAr?P.nameAr:P.name],[A.age,P.age],[A.from,P.town[lang]],[A.uni,A.uniV],[A.field,A.fieldV],[A.interests,A.intV],[A.skills,A.skV]]
  return <>
    <div className="cur" ref={cur} aria-hidden="true"/>
    <nav aria-label="main"><b>{isAr?P.nameAr:P.name}</b>
      <span className="links">{['about','skills','projects','services','ai','contact'].map(k=><a key={k} href={'#'+k}>{t.nav[k]}</a>)}</span>
      <span><button className="btn sm" aria-pressed={isAr} onClick={()=>setLang('ar')}>العربية</button> | <button className="btn sm" aria-pressed={!isAr} onClick={()=>setLang('en')}>English</button></span></nav>
    <header className="intro"><div className="stick">
      <div className="cv" ref={wrap}><EB><Suspense fallback={<p className="hint">{t.load}</p>}><RobotScene prog={prog} mouse={mouse} mobile={mobile} calm={calm}/></Suspense></EB></div>
      <p className="hint" ref={hint}>{t.scroll}</p></div></header>
    <main>
      <section id="hero" className="hero"><p className="rv dim">{t.hero.uni}</p><h1 className="rv">{isAr?P.nameAr:P.name}</h1><h2 className="rv">{t.hero.role}</h2><p className="rv">{t.hero.desc}</p>
        <div className="rv row"><a className="btn" href="#projects">{t.hero.b1}</a><a className="btn" href="#contact">{t.hero.b2}</a><button className="btn" onClick={()=>setChat(true)}>{t.hero.b3}</button></div></section>
      <section id="about" className="about"><img className="ph rv" src={import.meta.env.BASE_URL+P.photo} alt={isAr?P.nameAr:P.name} onError={e=>e.currentTarget.style.display='none'}/>
        <div><h2 className="rv">{A.h}</h2><p className="rv">{A.bio}</p><div className="grid">{rows.map(([k,v])=><div className="card rv" key={k}><small className="dim">{k}</small><div>{v}</div></div>)}</div></div></section>
      <section id="skills"><h2 className="rv">{t.skills.h}</h2><div className="grid">{t.skills.list.map(s=><div className="card rv" key={s.n}><div className="viz" aria-hidden="true"><i/><i/><i/><i/></div><h3>{s.i} {s.n}</h3><p>{s.d}</p></div>)}</div></section>
      <section id="projects"><h2 className="rv">{t.projects.h}</h2><div className="grid">{P.projects.map((p,i)=><article className="card rv" key={i}>
        {p.image?<img className="pi" src={import.meta.env.BASE_URL+p.image} alt={p.title[lang]}/>:<div className="pi" role="img" aria-label="placeholder">🖼️</div>}
        <h3>{p.title[lang]}</h3><p>{p.desc[lang]}</p><small className="dim">{p.tech.join(' · ')}</small>
        <div className="row">{p.github?<a className="btn sm" href={p.github} target="_blank" rel="noopener">{t.projects.gh}</a>:<span className="dim">{t.projects.gh}</span>}{p.demo?<a className="btn sm" href={p.demo} target="_blank" rel="noopener">{t.projects.demo}</a>:<span className="dim">{t.projects.demo}</span>}</div></article>)}</div></section>
      <section id="services"><h2 className="rv">{t.services.h}</h2><p className="rv dim">{t.services.note}</p><div className="grid">{t.services.list.map(s=><div className="card rv" key={s.n}><h3>{s.n}</h3><p>{s.d}</p></div>)}</div></section>
      <section id="ai"><h2 className="rv">{t.ai.h}</h2><p className="rv">{t.ai.d}</p><button className="btn rv" onClick={()=>setChat(true)}>🤖 {t.ai.b}</button></section>
      <section id="request"><h2 className="rv">{t.req.h}</h2><div className="grid">
        <div className="card rv"><p>{t.req.d1}</p><button className="btn" onClick={()=>setModal('request')}>📝 {t.req.b1}</button></div>
        <div className="card rv"><p>{t.req.d2}</p><button className="btn" onClick={()=>setModal('complaint')}>⚠️ {t.req.b2}</button></div></div></section>
      <section id="contact"><h2 className="rv">{t.contact.h}</h2><div className="row rv"><a className="btn" href={wa} target="_blank" rel="noopener">💬 {t.contact.wa}</a><a className="btn" href={P.telegram} target="_blank" rel="noopener">✈️ {t.contact.tg}</a></div></section>
    </main>
    <footer><b>{isAr?P.nameAr:P.name}</b><p>{t.hero.role} · {t.hero.uni}</p><p>© {new Date().getFullYear()} Omar Elgendy · {t.footer.rights}</p>
      <p><button className="btn sm" onClick={()=>setLang(isAr?'en':'ar')}>العربية | English</button> <button className="btn sm" onClick={()=>setConsent(null)}>{t.privacy.link}</button></p></footer>
    {consent===null&&<div className="consent" role="dialog" aria-label={t.privacy.link}><p>{t.privacy.text}</p>
      <button className="btn sm" onClick={()=>{ls('consent','1');setConsent('1')}}>{t.privacy.yes}</button> <button className="btn sm" onClick={()=>{ls('consent','0');setConsent('0')}}>{t.privacy.no}</button></div>}
    {modal&&<Forms t={t} type={modal} P={P} consent={consent} onClose={()=>setModal(null)}/>}
    <AIChat t={t} open={chat} setOpen={setChat}/>
  </>
}
