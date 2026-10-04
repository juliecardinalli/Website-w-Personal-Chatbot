import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const places = [[-5.4,.45,-3.1],[3.6,.7,-4.8],[5.3,-.35,4.5],[-4.1,-.65,5.4]];

export default function World({ chapters, onSelect, onReady, paused }) {
  const host = useRef(null), labelRefs = useRef({}), pauseRef = useRef(paused);
  const [failed, setFailed] = useState(false);
  useEffect(() => { pauseRef.current = paused; }, [paused]);
  useEffect(() => {
    const container = host.current;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, powerPreference:"low-power" }); }
    catch { setFailed(true); onReady({reset(){}}); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.6));
    renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    renderer.outputColorSpace=THREE.SRGBColorSpace; renderer.setClearColor(0xf1efe5,0);
    container.appendChild(renderer.domElement);
    const scene=new THREE.Scene(), camera=new THREE.OrthographicCamera(-15,15,12,-12,.1,180);
    camera.position.set(13,19,27);
    const controls=new OrbitControls(camera,renderer.domElement);
    controls.target.set(0,-.2,.1); controls.enableDamping=true; controls.dampingFactor=.07; controls.enablePan=false;
    controls.minZoom=.7; controls.maxZoom=1.5; controls.minPolarAngle=Math.PI*.17; controls.maxPolarAngle=Math.PI*.39;
    controls.rotateSpeed=.55; controls.zoomSpeed=.45; controls.update(); controls.saveState();
    scene.add(new THREE.HemisphereLight(0xfffcf1,0xc7bcaa,2.7));
    const sun=new THREE.DirectionalLight(0xfff4df,3.4); sun.position.set(-8,22,12); sun.castShadow=true;
    sun.shadow.mapSize.set(2048,2048); Object.assign(sun.shadow.camera,{left:-19,right:19,top:19,bottom:-19,near:1,far:65});
    sun.shadow.normalBias=.04; sun.shadow.bias=-.0003; scene.add(sun);
    const shadow=new THREE.Mesh(new THREE.PlaneGeometry(100,100),new THREE.ShadowMaterial({opacity:.085}));
    shadow.rotation.x=-Math.PI/2; shadow.position.y=-3.6; shadow.receiveShadow=true; scene.add(shadow);
    const materials=new Map();
    const mat=(color)=>{if(!materials.has(color)) materials.set(color,new THREE.MeshStandardMaterial({color,roughness:.9,flatShading:true})); return materials.get(color);};
    function mesh(parent,geometry,color,x=0,y=0,z=0){const o=new THREE.Mesh(geometry,mat(color));o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
    const box=(g,w,h,d,color,x=0,y=0,z=0)=>mesh(g,new THREE.BoxGeometry(w,h,d),color,x,y,z);
    const ball=(g,r,color,x,y,z,detail=1)=>mesh(g,new THREE.IcosahedronGeometry(r,detail),color,x,y,z);
    const cyl=(g,rt,rb,h,color,x=0,y=0,z=0,sides=12)=>mesh(g,new THREE.CylinderGeometry(rt,rb,h,sides),color,x,y,z);
    const root=new THREE.Group();scene.add(root);
    const islands=[],animated=[],trees=[0x8d9b79,0xabb697,0x748e79,0xb4bc94];
    function tree(g,x,z,s=1,pine=false,variant=0){
      cyl(g,.075*s,.1*s,.75*s,0x9b8164,x,.4*s,z,5);
      if(pine){cyl(g,0,.42*s,.88*s,trees[variant%4],x,1*s,z,6);cyl(g,0,.32*s,.7*s,trees[(variant+1)%4],x,1.4*s,z,6);}
      else ball(g,.48*s,trees[variant%4],x,1*s,z,0).scale.set(.85,1.2,.9);
    }
    function island(index,color){
      const g=new THREE.Group();g.position.set(...places[index]);g.userData.island=chapters[index].id;root.add(g);
      cyl(g,3,2.9,.3,color,0,-.02,0,15);cyl(g,2.95,2.15,.65,0xb4a386,0,-.48,0,15);cyl(g,2.14,1.4,.58,0x998670,0,-1.095,0,13);
      for(let j=0;j<23;j++){const a=j/23*Math.PI*2;const tile=box(g,.52,.22+(j%3)*.13,.58,[0xccc6a9,0xb6bda1,0xd6d0b7,0xb7a98e][j%4],Math.cos(a)*2.92,-.04,Math.sin(a)*2.92);tile.rotation.y=-a;}
      for(let j=0;j<10;j++){const a=j*2.38+index;tree(g,Math.cos(a)*2.35,Math.sin(a)*2.35,.45+(j%3)*.2,index===3,j);}
      islands.push(g);return g;
    }
    function windows(g,x,z,rows,columns,gap,baseY){for(let r=0;r<rows;r++)for(let col=0;col<columns;col++)box(g,.12,.2,.02,0x4b6668,x+col*gap,baseY+r*.38,z);}
    function cloud(parent,x,y,z,s=1,color=0xfaf7eb){
      const g=new THREE.Group();g.position.set(x,y,z);g.scale.setScalar(s);parent.add(g);
      ball(g,.43,color,-.52,0,0).scale.set(1.3,.65,.75);ball(g,.57,color,0,.16,0).scale.set(1,.8,.8);ball(g,.4,color,.51,0,0).scale.set(1.4,.65,.85);return g;
    }
    // Cloud campus.
    const work=island(0,0xc5c9aa);
    box(work,1.32,2.05,1.2,0xeceadd,-.6,1.1,-.25);box(work,.95,1.2,1,0xc6d1c3,.57,.68,.1);box(work,1.2,.15,1.13,0xd28053,-.6,2.16,-.25);
    windows(work,-1.03,.365,4,4,.28,.54);windows(work,.33,.615,2,2,.3,.58);
    const orangeCloud=cloud(work,-.2,3.18,-.45,1.14,0xea9660);animated.push({object:orangeCloud,type:"float",base:3.18,phase:0});
    box(work,1.65,.03,.48,0xe4dfcb,.2,.15,1.6);for(let j=0;j<3;j++)box(work,.16,.04,.56,0xc4bfa7,-.36+j*.46,.18,1.6);
    cyl(work,.05,.05,2.5,0x878a78,1.6,1.25,-1.2,5);box(work,.7,.37,.025,0xd97851,1.94,2.4,-1.2);
    // The AI observatory.
    const ai=island(1,0xc6c5d1);cyl(ai,1.2,1.35,.28,0xe8e4e2,0,.26,-.25,20);
    const dome=mesh(ai,new THREE.SphereGeometry(1.2,20,12,0,Math.PI*2,0,Math.PI/2),0xa5afb2,0,.4,-.25);
    const domeMat=new THREE.MeshStandardMaterial({color:0xaabcc6,transparent:true,opacity:.52,roughness:.35,metalness:.1});dome.material=domeMat;
    const idea=ball(ai,.48,0x9d8abc,0,1.03,-.25),orbit=mesh(ai,new THREE.TorusGeometry(.92,.027,6,48),0x8b759f,0,1.28,-.25);
    orbit.rotation.x=1.12;animated.push({object:orbit,type:"rotate"},{object:idea,type:"float",base:1.03,phase:2});
    for(let j=0;j<3;j++){const server=box(ai,.4,.66+j*.17,.5,0xecebe4,-1.18+j*.6,.49,1.1);for(let k=0;k<3;k++)box(ai,.24,.05,.02,0x9c8dac,server.position.x,.33+k*.16,1.36);}
    cyl(ai,.055,.07,1.3,0x96978c,1.65,.74,-.7,6);const dish=mesh(ai,new THREE.SphereGeometry(.42,12,6,0,Math.PI*2,0,.85),0xddd9dc,1.65,1.55,-.7);dish.rotation.z=-.8;
    box(ai,.08,.6,.08,0x887c9c,1.65,1.68,-.7).rotation.z=-.8;
    // An open-air amphitheatre.
    const speaking=island(2,0xd8c6b3);cyl(speaking,1.7,1.7,.22,0xe5dbcb,0,.24,-.3,24);cyl(speaking,1.1,1.1,.18,0xbc7a64,0,.44,-.52,24);
    mesh(speaking,new THREE.TorusGeometry(1.1,.13,6,26,Math.PI),0xcc8b71,0,.56,-.95);box(speaking,1.62,.89,.08,0xf0e4d1,0,1.09,-1.05);
    box(speaking,.36,.5,.32,0x7e9388,.08,.72,-.45);cyl(speaking,.018,.025,.28,0x48544d,.08,1.09,-.45,5);
    for(let row=0;row<2;row++)for(let j=0;j<5;j++){const x=(j-2)*.43,z=.66+row*.52;box(speaking,.29,.12,.28,0xb99473,x,.28,z);box(speaking,.29,.33,.08,0xb99473,x,.5,z+.11);}
    for(let j=0;j<6;j++)box(speaking,.065,.18+Math.sin(j*1.3)*.1,.015,0xb67863,(j-2.5)*.17,1.09,-.997);
    // The outdoors: mountains, cabin, lake, and pines.
    const life=island(3,0xaebca4);cyl(life,0,1.17,2.55,0x9aa690,-.65,1.4,-.9,5);cyl(life,0,.49,1.03,0xf1efe4,-.65,2.18,-.9,5);
    cyl(life,0,.78,1.72,0xb1b5a0,.54,.99,-1.07,5);cyl(life,0,.31,.68,0xeeece0,.54,1.54,-1.07,5);
    const lake=cyl(life,.83,.83,.025,0x91bfc1,1.2,.16,.58,20);lake.scale.z=.68;
    box(life,.8,.6,.68,0xdfae82,-.65,.49,1.03);const roof=mesh(life,new THREE.ConeGeometry(.68,.47,4),0xb56f52,-.65,.98,1.03);roof.rotation.y=Math.PI/4;roof.scale.z=.85;
    box(life,.18,.33,.025,0x63796a,-.65,.39,1.38);box(life,.16,.16,.025,0xf7e2aa,-.9,.64,1.38);tree(life,-1.7,.25,1.2,true,1);tree(life,1.45,-1.7,.9,true,2);
    // An elevated railway connects the islands. The train follows its tangent.
    const curve=new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5.4,.77,-.2),new THREE.Vector3(-1.5,1.05,-1.2),new THREE.Vector3(3.5,1,-1.75),new THREE.Vector3(6.8,.6,.55),
      new THREE.Vector3(5.2,.02,7),new THREE.Vector3(.8,-.03,7.25),new THREE.Vector3(-4.4,-.25,7.4),new THREE.Vector3(-7.5,.24,3.1)
    ],true,"catmullrom",.35);
    for(const offset of [-.13,.13]){
      const points=Array.from({length:181},(_,i)=>{const t=i/180,p=curve.getPointAt(t),dir=curve.getTangentAt(t);return p.add(new THREE.Vector3(-dir.z,0,dir.x).normalize().multiplyScalar(offset));});
      mesh(root,new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),180,.035,5,true),0x8c8b79);
    }
    for(let i=0;i<124;i++){
      const t=i/124,p=curve.getPointAt(t),dir=curve.getTangentAt(t),tie=box(root,.47,.065,.11,0xc6b397,p.x,p.y-.04,p.z);tie.rotation.y=Math.atan2(dir.x,dir.z);
      if(i%13===0){const h=p.y+2.3;cyl(root,.055,.075,h,0xb1a48e,p.x,p.y-h/2,p.z,5);cyl(root,.27,.31,.11,0xbcac91,p.x,-2.3,p.z,8);}
    }
    const train=new THREE.Group();root.add(train);box(train,.43,.34,.82,0xbd6d4d,0,.24,0);box(train,.46,.075,.86,0xe6d4b4,0,.45,0);box(train,.31,.16,.025,0x638c91,0,.3,.422);
    for(const side of [-1,1])for(const z of [-.2,.16]){box(train,.025,.15,.2,0xc4e0dd,side*.223,.3,z);cyl(train,.075,.075,.07,0x556157,side*.22,.075,z,8).rotation.z=Math.PI/2;}
    [cloud(root,-7.4,3.2,-5.5,.9),cloud(root,6.8,3.8,-5.5,1.1),cloud(root,1.5,2.6,6.8,.6)].forEach((o,i)=>animated.push({object:o,type:"float",base:o.position.y,phase:i*2.1}));
    const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let down;
    const onDown=(e)=>{down=[e.clientX,e.clientY];};
    const onUp=(e)=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>6)return;const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(islands,true)[0];if(hit){let p=hit.object;while(p&&!p.userData.island)p=p.parent;if(p)onSelect(p.userData.island);}};
    renderer.domElement.addEventListener("pointerdown",onDown);renderer.domElement.addEventListener("pointerup",onUp);
    let width=0,height=0;
    function resize(){width=container.clientWidth;height=container.clientHeight;if(!width||!height)return;const aspect=width/height,v=Math.max(18.6,21/aspect);camera.left=-v*aspect/2;camera.right=v*aspect/2;camera.top=v/2;camera.bottom=-v/2;camera.updateProjectionMatrix();renderer.setSize(width,height);}
    const observer=new ResizeObserver(resize);observer.observe(container);resize();
    let raf=0,time=0,last=0;const position=new THREE.Vector3();
    function render(now){
      raf=requestAnimationFrame(render);const dt=Math.min((now-last)/1000||0,.05);last=now;if(document.hidden)return;if(!pauseRef.current)time+=dt;controls.update();
      animated.forEach((entry)=>{if(entry.type==="float")entry.object.position.y=entry.base+Math.sin(time*.65+entry.phase)*.085;else entry.object.rotation.z=time*.22;});
      const t=(time*.012+.11)%1;train.position.copy(curve.getPointAt(t));const dir=curve.getTangentAt(t);train.rotation.y=Math.atan2(dir.x,dir.z);
      islands.forEach((g,i)=>{
        const label=labelRefs.current[chapters[i].id];if(!label)return;
        position.set(g.position.x,g.position.y+.15,g.position.z+3.05).project(camera);
        const half=(label.offsetWidth||150)/2+8;
        const x=THREE.MathUtils.clamp((position.x*.5+.5)*width,half,width-half);
        const y=THREE.MathUtils.clamp((-position.y*.5+.5)*height,20,height-64);
        label.style.transform=`translate(${x}px,${y}px) translate(-50%,8px)`;
      });
      renderer.render(scene,camera);
    }
    raf=requestAnimationFrame(render);onReady({reset:()=>controls.reset()});
    return()=>{cancelAnimationFrame(raf);observer.disconnect();controls.dispose();renderer.domElement.removeEventListener("pointerdown",onDown);renderer.domElement.removeEventListener("pointerup",onUp);scene.traverse((o)=>{if(o.geometry)o.geometry.dispose();});materials.forEach((m)=>m.dispose());domeMat.dispose();shadow.material.dispose();renderer.dispose();renderer.domElement.remove();};
  },[chapters,onReady,onSelect]);
  return <><div ref={host} className="world-canvas" aria-hidden="true" />
    {failed?<div className="world-fallback">A little world. A lot of curiosity.<p>The 3D view isn&apos;t available on this device. All four chapters are still available below.</p></div>:<div className="world-labels" aria-label="Explore an island">{chapters.map((chapter)=><button ref={(node)=>{labelRefs.current[chapter.id]=node;}} className="island-label" key={chapter.id} onClick={()=>onSelect(chapter.id)} aria-label={`Explore ${chapter.label}: ${chapter.sub}`}><span style={{color:chapter.color}}>{chapter.number}</span><strong>{chapter.label}</strong><ArrowUpRight /></button>)}</div>}
  </>;
}
