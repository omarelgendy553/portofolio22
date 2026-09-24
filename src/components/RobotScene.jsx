import {useRef} from 'react'
import {Canvas,useFrame} from '@react-three/fiber'
import {Environment,Lightformer,Sparkles,ContactShadows} from '@react-three/drei'
import * as THREE from 'three'
const S=(a,b,p)=>{const t=Math.min(1,Math.max(0,(p-a)/(b-a)));return t*t*(3-2*t)}
const L=THREE.MathUtils.lerp
const mk=(c,m,r,e)=>new THREE.MeshStandardMaterial({color:c,metalness:m,roughness:r,emissive:e||'#000',emissiveIntensity:e?1:0})
const M={metal:mk('#8fa39d',.9,.28),dark:mk('#0d1110',.7,.4),skin:mk('#b9c7c2',.85,.22),glow:mk('#1F8A70',0,.5,'#1F8A70'),blue:mk('#3A607E',.3,.4,'#3A607E')}
const Caps=({p,r=.1,l=.5,m='metal'})=><mesh position={p} material={M[m]}><capsuleGeometry args={[r,l,8,16]}/></mesh>
const Box=({p,s,m='metal'})=><mesh position={p} material={M[m]}><boxGeometry args={s}/></mesh>
const Ball=({p,r,m='metal'})=><mesh position={p} material={M[m]}><sphereGeometry args={[r,24,24]}/></mesh>
const Arm=({g,x})=><group ref={g} position={[x,3.05,0]}><Ball p={[0,0,0]} r={.2}/><Caps p={[0,-.4,0]}/><Ball p={[0,-.8,0]} r={.11} m="dark"/><Caps p={[0,-1.2,0]} r={.09}/><Box p={[0,-1.65,0]} s={[.15,.24,.1]} m="dark"/></group>
function Robot({prog,mouse,calm}){
  const g=useRef(),hd=useRef(),dl=useRef(),dr=useRef(),pl=useRef(),pr=useRef(),lt=useRef(),kl=useRef(),al=useRef(),ar=useRef()
  useFrame(({clock,camera})=>{
    prog.cur+=(prog.v-prog.cur)*.08
    const p=prog.cur,t=calm?0:clock.elapsedTime,o=S(.35,.65,p),z=S(.8,1,p)
    g.current.position.y=-2+Math.sin(t*1.2)*.03
    g.current.rotation.y=mouse.x*.35*(1-S(.6,.9,p))
    hd.current.rotation.y=Math.sin(t*.5)*.08+S(.15,.3,p)*.5*Math.sin(p*25)
    hd.current.rotation.x=S(.15,.3,p)*.1
    dl.current.rotation.y=-o*1.5; dr.current.rotation.y=o*1.5
    pl.current.position.x=-.17-S(.5,.7,p)*.4; pr.current.position.x=.17+S(.5,.7,p)*.4
    M.glow.emissiveIntensity=.3+S(.65,.85,p)*3; lt.current.intensity=S(.6,.85,p)*8
    al.current.rotation.z=-(.06+Math.sin(t)*.03+o*.3); ar.current.rotation.z=.06+Math.sin(t+1)*.03+o*.3
    kl.current.position.x=mouse.x*5
    camera.position.set(mouse.x*.5*(1-S(.7,1,p)),L(.3,.6,S(.7,1,p))+mouse.y*.2,7-2*S(.45,.8,p)-3.9*z)
    camera.lookAt(0,L(.3,.6,S(.6,1,p)),0)
  })
  return <>
    <directionalLight ref={kl} position={[3,5,4]} intensity={2} color="#9fe8d0"/>
    <pointLight position={[-4,2,2]} intensity={40} color="#3A607E"/>
    <pointLight position={[0,3,-4]} intensity={30} color="#1F8A70"/>
    <ambientLight intensity={.15}/>
    <group ref={g}>
      <Box p={[0,1.85,0]} s={[1,.3,.4]} m="dark"/><Box p={[0,2.02,0]} s={[.8,.25,.34]} m="dark"/>
      <Box p={[0,2.6,-.12]} s={[1.3,1.1,.25]}/><Box p={[0,3.15,0]} s={[1.5,.12,.4]}/>
      <Caps p={[0,2.6,-.02]} r={.05} l={1} m="dark"/>
      {[0,1,2,3].map(i=><Box key={i} p={[0,2.2+i*.27,0]} s={[.9,.04,.3]} m="dark"/>)}
      <Ball p={[0,2.6,.05]} r={.16} m="glow"/>
      <pointLight ref={lt} position={[0,2.6,.3]} color="#1F8A70" distance={4}/>
      <Box p={[-.4,2.6,.05]} s={[.05,.8,.05]} m="blue"/><Box p={[.4,2.6,.05]} s={[.05,.8,.05]} m="blue"/>
      <group ref={dl} position={[-.65,2.6,.27]}><Box p={[.33,0,0]} s={[.66,1.1,.1]}/><Box p={[.33,.3,.06]} s={[.5,.02,.02]} m="blue"/></group>
      <group ref={dr} position={[.65,2.6,.27]}><Box p={[-.33,0,0]} s={[.66,1.1,.1]}/><Box p={[-.33,.3,.06]} s={[.5,.02,.02]} m="blue"/></group>
      <group ref={pl} position={[-.17,2.02,.2]}><Box p={[0,0,0]} s={[.3,.24,.06]}/></group>
      <group ref={pr} position={[.17,2.02,.2]}><Box p={[0,0,0]} s={[.3,.24,.06]}/></group>
      <Caps p={[0,3.3,0]} r={.09} l={.1} m="dark"/>
      <group ref={hd} position={[0,3.6,0]}>
        <mesh material={M.skin} scale={[.85,1,.95]}><sphereGeometry args={[.32,32,32]}/></mesh>
        <Box p={[0,.03,.27]} s={[.4,.1,.1]} m="blue"/><Ball p={[-.09,.03,.33]} r={.025} m="glow"/><Ball p={[.09,.03,.33]} r={.025} m="glow"/>
        <Box p={[0,-.22,.15]} s={[.3,.12,.2]}/><Ball p={[-.29,0,0]} r={.07} m="dark"/><Ball p={[.29,0,0]} r={.07} m="dark"/>
      </group>
      <Arm g={al} x={-.85}/><Arm g={ar} x={.85}/>
      {[-1,1].map(s=><group key={s}><Caps p={[s*.28,1.4,0]} r={.13} l={.6}/><Ball p={[s*.28,.95,0]} r={.13} m="dark"/><Caps p={[s*.28,.5,0]} r={.1} l={.6}/><Box p={[s*.28,.08,.1]} s={[.24,.16,.5]} m="dark"/></group>)}
    </group>
    <mesh position={[0,-1.98,0]} rotation-x={-Math.PI/2}><ringGeometry args={[1.3,1.35,64]}/><meshBasicMaterial color="#1F8A70"/></mesh>
    <ContactShadows position={[0,-1.99,0]} opacity={.6} blur={2.5} scale={8}/>
  </>
}
export default function RobotScene({prog,mouse,mobile,calm}){
  return <Canvas dpr={[1,mobile?1.4:2]} camera={{fov:40,position:[0,.3,7]}} gl={{antialias:!mobile}}>
    <color attach="background" args={['#030505']}/><fog attach="fog" args={['#030505',8,16]}/>
    <Robot prog={prog} mouse={mouse} calm={calm}/>
    <Sparkles count={mobile?30:100} scale={[10,6,6]} size={2} color="#1F8A70" speed={calm?0:.3}/>
    <Environment resolution={128}><Lightformer intensity={2} position={[0,5,-5]} scale={[10,5,1]}/><Lightformer intensity={1.5} position={[5,1,3]} scale={[4,4,1]} color="#7fd6bd"/></Environment>
  </Canvas>
}
