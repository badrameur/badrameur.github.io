import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{_ as t,a as n,c as r,d as i,f as a,h as o,i as s,l as c,n as l,o as u,p as d,r as f,s as p,t as m,u as h}from"./r3f-DJwWP_88.js";import{a as g,i as _,n as v,r as y,t as b}from"./index-C53yPSiq.js";var x=e(t(),1),S=`#8f7bff`,C=`#5fd9e8`,w=`#e7c288`,T=`#ecd6a8`;function E(e=T,t=1.6,n=.8){return new a({uniforms:{uColor:{value:new h(e)},uSize:{value:t},uOpacity:{value:n},uTime:{value:0}},vertexShader:`
      attribute float aPhase;
      attribute float aScale;
      uniform float uTime;
      uniform float uSize;
      varying float vA;
      void main() {
        vec3 p = position;
        float t = uTime * 0.18 + aPhase * 6.2831;
        p += 0.05 * vec3(sin(t * 1.7), cos(t * 1.3), sin(t * 2.1));
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = min(uSize * aScale * (26.0 / -mv.z), 11.0);
        vA = 0.5 + 0.5 * sin(uTime * 1.4 + aPhase * 12.566);
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vA;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.06, d) * (0.35 + 0.65 * vA) * uOpacity;
        if (a < 0.01) discard;
        gl_FragColor = vec4(uColor, a);
      }
    `,transparent:!0,blending:2,depthWrite:!1})}function D(e,t,n,i){let a=new Float32Array(e*3),o=new Float32Array(e),s=new Float32Array(e);for(let r=0;r<e;r++)a.set([(Math.random()-.5)*t,(Math.random()-.5)*n,(Math.random()-.5)*i],r*3),o[r]=Math.random(),s[r]=.35+Math.random()*1.1;let l=new c;return l.setAttribute(`position`,new r(a,3)),l.setAttribute(`aPhase`,new r(o,1)),l.setAttribute(`aScale`,new r(s,1)),l}var O=o(),k=()=>({amp:.55,flow:1,hue:0,spread:1,glow:0,fade:1,x:0,y:0,scale:1,tilt:1,shimmer:1});function A({drive:e,tier:t=`full`,position:r=[0,0,-1.5],rotation:o=[-.42,0,-.08],width:s=12,height:c=6,hueOffset:l=0,opacity:u=1,ampMul:d=1,flowMul:f=1,colors:m=[S,C,w]}){let g=(0,x.useRef)(null),_=(0,x.useRef)(null),v=(0,x.useRef)(Math.random()*60),b=t===`full`?200:120,T=t===`full`?110:70,E=(0,x.useMemo)(()=>({geometry:new i(s,c,b,T),material:new a({uniforms:{uTime:{value:0},uAmp:{value:.55},uSpread:{value:1},uHue:{value:l},uGlow:{value:0},uFade:{value:u},uShimmer:{value:1},uColA:{value:new h(m[0])},uColB:{value:new h(m[1])},uColC:{value:new h(m[2])},uGold:{value:new h(`#f2cf92`)}},vertexShader:`
        uniform float uTime;
        uniform float uAmp;
        uniform float uSpread;
        varying vec2 vUv;
        varying float vH;
        varying float vR;

        /* hash borné (Hoskins) : stable même quand le domaine dérive loin */
        float hash(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * 0.1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
        }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
            u.y
          ) * 2.0 - 1.0;
        }
        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 4; i++) {
            v += a * noise(p);
            p = p * 2.03 + 17.31;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vUv = uv;
          vec3 p = position;
          p.x *= uSpread;
          vec2 q = vec2(p.x * 0.34 - uTime * 0.62, p.y * 0.6 + uTime * 0.085);
          float h = fbm(q);
          float r = fbm(q * 2.15 + 43.7);
          p.z += h * uAmp;
          p.y += r * uAmp * 0.5;
          vH = h;
          vR = r;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,fragmentShader:`
        uniform float uTime;
        uniform float uHue;
        uniform float uGlow;
        uniform float uFade;
        uniform float uShimmer;
        uniform vec3 uColA;
        uniform vec3 uColB;
        uniform vec3 uColC;
        uniform vec3 uGold;
        varying vec2 vUv;
        varying float vH;
        varying float vR;

        void main() {
          /* dégradé irisé circulaire : la phase uHue fait tourner la palette */
          float g = fract(vUv.x * 0.72 + vH * 0.36 + uHue);
          float w0 = pow(0.5 + 0.5 * cos(6.2831 * g), 2.0);
          float w1 = pow(0.5 + 0.5 * cos(6.2831 * (g - 0.3333)), 2.0);
          float w2 = pow(0.5 + 0.5 * cos(6.2831 * (g - 0.6666)), 2.0);
          vec3 col = (uColA * w0 + uColB * w1 + uColC * w2) / (w0 + w1 + w2);

          /* les crêtes de la houle portent la lumière — douces, sans « neige » */
          float lum = smoothstep(-0.7, 1.0, vH) * (0.55 + 0.45 * smoothstep(-0.5, 1.0, vR));
          lum *= 1.0 + 0.08 * uShimmer * sin(uTime * 1.8 + vUv.x * 34.0 + vH * 7.0);

          /* aube dorée (acte final) : le voile se réchauffe par le bas */
          col = mix(col, uGold, uGlow * 0.55);
          lum += uGlow * 0.4 * smoothstep(0.8, 0.1, vUv.y);

          /* bande de lumière : beaucoup de vide autour, jamais un rectangle */
          float ex = smoothstep(0.02, 0.2, vUv.x) * smoothstep(0.98, 0.8, vUv.x);
          float ey = smoothstep(0.02, 0.34, vUv.y) * smoothstep(0.98, 0.6, vUv.y);

          float a = lum * ex * ey * uFade;
          if (a < 0.004) discard;
          gl_FragColor = vec4(col * (0.7 + 0.45 * lum), a);
        }
      `,transparent:!0,blending:2,depthWrite:!1,side:2})}),[s,c,b,T,l,u,m[0],m[1],m[2]]);return(0,x.useEffect)(()=>()=>{E.geometry.dispose(),E.material.dispose()},[E]),p((t,i)=>{let a=e?.current??k(),s=E.material.uniforms;v.current+=i*a.flow*f,s.uTime.value=v.current,s.uAmp.value=a.amp*d,s.uSpread.value=a.spread,s.uHue.value=a.hue+l,s.uGlow.value=a.glow,s.uFade.value=a.fade*u,s.uShimmer.value=a.shimmer;let c=g.current;n(c.position,`x`,r[0]+a.x,.5,i),n(c.position,`y`,r[1]+a.y,.5,i),n(c.rotation,`x`,o[0]-y.y*.05*a.tilt,.6,i),n(c.rotation,`y`,o[1]+y.x*.08*a.tilt,.6,i),n(c.scale,`x`,a.scale,.4,i),c.scale.setScalar(c.scale.x)}),(0,O.jsx)(`group`,{ref:g,position:r,rotation:o,children:(0,O.jsx)(`mesh`,{ref:_,geometry:E.geometry,material:E.material})})}function j({count:e=320,width:t=16,height:r=10,depth:i=6,size:a=.9,opacity:o=.34,parallax:s=.45,color:c=T,position:l=[0,0,-3.5]}){let u=(0,x.useRef)(null),d=(0,x.useMemo)(()=>D(e,t,r,i),[e,t,r,i]),f=(0,x.useMemo)(()=>E(c,a,o),[c,a,o]);return(0,x.useEffect)(()=>()=>{d.dispose(),f.dispose()},[d,f]),p((e,t)=>{f.uniforms.uTime.value=e.clock.elapsedTime,n(u.current.position,`x`,l[0]+y.x*s,.8,t),n(u.current.position,`y`,l[1]-y.y*s*.6,.8,t)}),(0,O.jsx)(`group`,{ref:u,position:l,children:(0,O.jsx)(`points`,{geometry:d,material:f})})}function M({tier:e}){let t=(0,x.useMemo)(()=>new d(55e-5,35e-5),[]);return e===`lite`?null:(0,O.jsxs)(m,{multisampling:0,children:[(0,O.jsx)(f,{mipmapBlur:!0,intensity:.62,luminanceThreshold:.18,luminanceSmoothing:.35,radius:.74}),e===`full`?(0,O.jsx)(s,{offset:t,radialModulation:!0,modulationOffset:.35}):(0,O.jsx)(O.Fragment,{}),(0,O.jsx)(l,{eskil:!1,offset:.22,darkness:.55})]})}var N=e=>Math.min(1,Math.max(0,e));function P(){return p((e,t)=>{let r=e.camera;n(r.position,`x`,v.cam.x,.4,t),n(r.position,`y`,v.cam.y,.4,t),n(r.position,`z`,v.cam.z,.4,t),r.lookAt(0,0,0)}),null}function F({drive:e}){let t=(0,x.useRef)(0);return p((n,r)=>{let i=e.current,a=N(v.graph),o=b.current<0?0:(b.current-2)*.05;t.current+=(o-t.current)*Math.min(1,r*4),i.fade=.28+.72*a,i.amp=.48+.3*a+v.globe*.12,i.flow=.75,i.hue=v.hue+t.current,i.glow=v.globe,i.spread=1,i.scale=1,i.tilt=.6,i.shimmer=.8}),null}function I(){let e=_(e=>e.tier),t=_(e=>e.setCanvasReady),n=(0,x.useRef)(k());return(0,O.jsx)(`div`,{className:`scene`,"aria-hidden":`true`,children:(0,O.jsxs)(u,{dpr:g(e),camera:{fov:46,position:[0,0,6],near:.1,far:40},gl:{antialias:!0,alpha:!0,powerPreference:`high-performance`},onCreated:()=>{t(!0),[60,400,1400].forEach(e=>window.setTimeout(()=>window.dispatchEvent(new Event(`resize`)),e))},children:[(0,O.jsx)(P,{}),(0,O.jsx)(F,{drive:n}),(0,O.jsx)(A,{drive:n,tier:e,position:[2.6,.5,-3.4],rotation:[-.5,-.14,.72],width:15,height:7.5,hueOffset:.1,opacity:.42,ampMul:1.35,flowMul:.55}),(0,O.jsx)(A,{drive:n,tier:e,position:[2.1,0,-1.6],rotation:[-.42,-.1,.66],width:13,height:5,opacity:.85}),(0,O.jsx)(j,{count:e===`full`?220:110,width:18,height:12,depth:6,opacity:.26,position:[0,0,-4]}),(0,O.jsx)(M,{tier:e})]})})}export{I as default};