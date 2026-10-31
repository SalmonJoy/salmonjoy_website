import * as THREE from 'three';
export async function createNori(canvas:HTMLCanvasElement,onFailure:()=>void){
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<768?1.25:1.5));renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(35,1,.1,50);camera.position.set(0,.15,5.7);camera.lookAt(0,0,0);
 scene.add(new THREE.HemisphereLight(0xfff8ed,0x573140,2.4));const light=new THREE.DirectionalLight(0xffe4d7,4);light.position.set(-3,5,5);scene.add(light);const rim=new THREE.DirectionalLight(0xe0a0b6,2.5);rim.position.set(4,1,-2);scene.add(rim);
 const ivory=new THREE.MeshPhysicalMaterial({color:0xf6f1e9,roughness:.28,metalness:.05,clearcoat:.6});const burgundy=new THREE.MeshStandardMaterial({color:0x812641,roughness:.42});const dark=new THREE.MeshStandardMaterial({color:0x281e25,roughness:.28});const rose=new THREE.MeshStandardMaterial({color:0xdca4b3,emissive:0x812641,emissiveIntensity:.15});const eyeMat=new THREE.MeshBasicMaterial({color:0xfff4dd});
 function sphere(material:THREE.Material,x:number,y:number,z:number,sx:number,sy:number,sz:number){const mesh=new THREE.Mesh(new THREE.SphereGeometry(1,28,20),material);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);return mesh;}
 const character=new THREE.Group();scene.add(character);const body=sphere(ivory,0,0,0,.64,.81,.49);character.add(body);
 const collar=new THREE.Mesh(new THREE.TorusGeometry(.47,.12,12,40),burgundy);collar.rotation.x=Math.PI/2;collar.position.y=-.42;character.add(collar);
 const visor=sphere(dark,0,.16,.419,.44,.25,.13);character.add(visor);
 const eyes=new THREE.Group();eyes.add(sphere(eyeMat,-.16,.17,.55,.052,.086,.025),sphere(eyeMat,.16,.17,.55,.052,.086,.025));character.add(eyes);
 function lapel(x:number,angle:number){const shape=new THREE.Shape();shape.moveTo(-.12,.15);shape.lineTo(.12,.15);shape.lineTo(.03,-.2);shape.closePath();const m=new THREE.Mesh(new THREE.ShapeGeometry(shape),burgundy);m.position.set(x,-.42,.445);m.rotation.z=angle;return m;}character.add(lapel(-.16,.2),lapel(.16,-.2));
 const left=sphere(ivory,-.86,-.24,0,.15,.2,.15);const right=sphere(ivory,.86,-.1,.05,.15,.2,.15);character.add(left,right);
 const spark=new THREE.Group();const diamond=new THREE.Mesh(new THREE.OctahedronGeometry(.14),rose);spark.add(diamond);spark.position.set(.91,.65,.05);scene.add(spark);
 const sparkHalo=new THREE.Mesh(new THREE.TorusGeometry(.21,.009,5,30),rose);spark.add(sparkHalo);
 const shadow=new THREE.Mesh(new THREE.CircleGeometry(.6,40),new THREE.MeshBasicMaterial({color:0x27151e,transparent:true,opacity:.08}));shadow.scale.y=.14;shadow.position.set(0,-1.05,-.3);scene.add(shadow);
 const props=new THREE.Group();character.add(props);
 function board(w:number,h:number,color:THREE.Material){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,.045),color);mesh.position.set(0,-.5,.68);return mesh;}
 const document=board(.58,.46,ivory);document.rotation.z=-.12;const book=board(.65,.42,burgundy);book.rotation.z=.09;const envelope=board(.62,.4,rose);
 const envelopeLine=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-.3,-.3,.71),new THREE.Vector3(0,-.53,.71),new THREE.Vector3(.3,-.3,.71)]),new THREE.LineBasicMaterial({color:0x812641}));
 const boardLines=new THREE.Group();for(let i=0;i<3;i++){const line=new THREE.Mesh(new THREE.BoxGeometry(i===2?.2:.37,.018,.01),burgundy);line.position.set(-.03,-.39-i*.075,.72);boardLines.add(line);}
 const nodes=new THREE.Group();for(let i=0;i<3;i++){const node=sphere(i===1?rose:ivory,-.3+i*.3,-.55,.75,.075,.075,.075);nodes.add(node);}const wire=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-.3,-.55,.75),new THREE.Vector3(.3,-.55,.75)]),new THREE.LineBasicMaterial({color:0xdca4b3}));nodes.add(wire);
 props.add(document,book,envelope,envelopeLine,boardLines,nodes);let state='hero',step=0,paused=false,disposed=false,frame=0,last=0,elapsed=0,slow=0;let pointerX=0,pointerY=0;
 const showProps=()=>{document.visible=['teaching','training','proof'].includes(state);boardLines.visible=document.visible;book.visible=state==='ideas';envelope.visible=state==='contact';envelopeLine.visible=envelope.visible;nodes.visible=state==='work';};showProps();
 const resize=()=>{const r=canvas.getBoundingClientRect();if(r.width&&r.height){renderer.setSize(r.width,r.height,false);renderer.render(scene,camera);}};const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
 const pointer=(e:PointerEvent)=>{const r=canvas.getBoundingClientRect();pointerX=THREE.MathUtils.clamp((e.clientX-r.left-r.width/2)/innerWidth,-.2,.2);pointerY=THREE.MathUtils.clamp((e.clientY-r.top-r.height/2)/innerHeight,-.12,.12);};window.addEventListener('pointermove',pointer,{passive:true});
 function pose(t:number){character.position.y=Math.sin(t*1.7)*.035;character.rotation.z=Math.sin(t*.8)*.035;character.rotation.y=pointerX;character.rotation.x=-pointerY;left.position.y=-.25+Math.sin(t*2)*.04;right.position.y=state==='hero'?.15+Math.sin(t*3)*.14:-.2+Math.sin(t*1.8)*.04;right.rotation.z=state==='hero'?-.35:-.1;spark.position.x=.88+Math.sin(t*.7)*.08;spark.position.y=.62+Math.sin(t*1.3)*.08;spark.rotation.z=t*.4;diamond.rotation.y=t;eyes.scale.y=Math.sin(t*.72)> .995?.18:1;if(state==='teaching')document.rotation.z=Math.sin(t)*.08+step*.04;if(state==='work')nodes.rotation.z=Math.sin(t)*.12;}
 function render(now:number){frame=0;if(disposed||paused||globalThis.document.hidden)return;const dt=last?now-last:16;last=now;elapsed+=Math.min(dt,50)/1000;pose(elapsed);renderer.render(scene,camera);if(dt>65)slow++;else slow=Math.max(0,slow-1);if(slow>100){onFailure();dispose();return;}frame=requestAnimationFrame(render);}
 function start(){if(!frame&&!disposed&&!paused&&!globalThis.document.hidden){last=0;frame=requestAnimationFrame(render);}}
 function visibility(){if(globalThis.document.hidden){cancelAnimationFrame(frame);frame=0;}else start();}globalThis.document.addEventListener('visibilitychange',visibility);
 function contextLost(e:Event){e.preventDefault();onFailure();dispose();}canvas.addEventListener('webglcontextlost',contextLost);
 function dispose(){disposed=true;cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('pointermove',pointer);globalThis.document.removeEventListener('visibilitychange',visibility);canvas.removeEventListener('webglcontextlost',contextLost);scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();}});renderer.dispose();}
 start();return {setState(next:string,nextStep:number){state=next;step=nextStep;showProps();pose(elapsed);renderer.render(scene,camera);},setPaused(value:boolean){paused=value;if(value){cancelAnimationFrame(frame);frame=0;character.rotation.set(0,0,0);renderer.render(scene,camera);}else start();},dispose};
}
