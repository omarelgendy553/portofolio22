import {useState,useEffect} from 'react'
const info=()=>{const u=navigator.userAgent,d=/iPad|Tablet/i.test(u)?'Tablet':/Mobi|Android|iPhone/i.test(u)?'Mobile':'Desktop'
  return `${d} | ${navigator.userAgentData?.platform||navigator.platform} | ${screen.width}x${screen.height} | ${navigator.language}\n${u}`}
export default function Forms({t,type,onClose,P,consent}){
  const [v,setV]=useState({name:'',phone:'',subject:'',desc:'',ctype:t.f.ctypes[0]}),[att,setAtt]=useState(consent==='1'),[busy,setBusy]=useState(false),[url,setUrl]=useState('')
  const set=k=>e=>setV({...v,[k]:e.target.value}),c=type==='complaint'
  useEffect(()=>{const k=e=>e.key==='Escape'&&onClose();addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[])
  async function go(e){e.preventDefault();setBusy(true)
    let x=''
    if(att){x='\n\nمعلومات الجهاز (أرفقها المرسل بموافقته):\n'+info()
      try{const p=await new Promise((ok,no)=>navigator.geolocation.getCurrentPosition(ok,no,{timeout:6000}));x+=`\nالموقع: ${p.coords.latitude.toFixed(4)}, ${p.coords.longitude.toFixed(4)}`}catch{}}
    const m=`مرحبًا عمر،\n\nلدي ${c?'شكوى':'طلب جديد'}:\n\nالاسم:\n${v.name}\n\nرقم الهاتف:\n${v.phone}\n\n${c?'نوع الشكوى':'نوع الطلب'}:\n${c?v.ctype+' - ':''}${v.subject}\n\nالتفاصيل:\n${v.desc}${x}`
    const u=`https://wa.me/${P.phone}?text=${encodeURIComponent(m)}`
    setUrl(u);setBusy(false);if(!window.open(u,'_blank'))location.href=u}
  const F=({k,area})=><label>{t.f[k]}{area?<textarea required rows="4" value={v[k]} onChange={set(k)}/>:<input required autoFocus={k==='name'} type={k==='phone'?'tel':'text'} value={v[k]} onChange={set(k)}/>}</label>
  return <div className="ov" onClick={onClose}><div className="mod" role="dialog" aria-modal="true" aria-label={c?t.req.b2:t.req.b1} onClick={e=>e.stopPropagation()}>
    <h3>{c?'⚠️ '+t.req.b2:'📝 '+t.req.b1}</h3>
    {url?<><p>{t.f.ok}</p><a className="btn" href={url} target="_blank" rel="noopener">{t.f.again}</a> <button className="btn" onClick={onClose}>{t.f.close}</button></>
    :<form onSubmit={go}>
      {F({k:'name'})}{F({k:'phone'})}
      {c&&<label>{t.f.ctype}<select value={v.ctype} onChange={set('ctype')}>{t.f.ctypes.map(x=><option key={x}>{x}</option>)}</select></label>}
      {F({k:'subject'})}{F({k:'desc',area:1})}
      <label className="chk"><input type="checkbox" checked={att} onChange={e=>setAtt(e.target.checked)}/> {t.f.attach}</label>
      <p className="dim">{t.f.note}</p>
      <button className="btn" disabled={busy}>{busy?t.f.busy:'💬 '+t.f.send}</button> <button type="button" className="btn" onClick={onClose}>{t.f.close}</button>
    </form>}
  </div></div>
}
