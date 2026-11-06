(() => {
  const poses = [['/assets/pose-stand.png','Posture droite'],['/assets/pose-crossed.png','Bras croisés'],['/assets/pose-lapel.png','Ajustement de veste']];
  const mount = () => {
    const about = document.querySelector('.p-about'); const container = about?.querySelector('.container');
    if (!container || document.querySelector('.portrait-stage')) return false;
    const stage = document.createElement('section'); stage.className = 'portrait-stage'; stage.dataset.step = '0'; stage.setAttribute('aria-label','Portrait professionnel animé');
    stage.innerHTML = `<div class="portrait-stage__sticky"><div class="portrait-stage__meta"><strong>// PROFIL VISUEL</strong><div class="portrait-stage__rule"></div><p>SCROLL POUR CHANGER<br>DE POSTURE</p><p class="portrait-stage__counter">01 / 03</p></div><div class="portrait-stage__visual">${poses.map(([src,alt],index)=>`<img class="portrait-pose${index===0?' is-active':''}" src="${src}" alt="${alt}">`).join('')}</div></div>`;
    container.append(stage); const images = [...stage.querySelectorAll('.portrait-pose')]; const counter = stage.querySelector('.portrait-stage__counter'); let active = 0;
    const select = next => { if (next === active) return; active = next; stage.dataset.step = String(next); images.forEach((image,index)=>image.classList.toggle('is-active',index===next)); counter.textContent = `0${next+1} / 03`; };
    let frame = 0; const update = () => { frame=0; const rect=stage.getBoundingClientRect(); const span=Math.max(1,rect.height-innerHeight); const progress=Math.min(1,Math.max(0,-rect.top/span)); select(Math.min(2,Math.floor(progress*3))); };
    const onScroll=()=>{if(!frame) frame=requestAnimationFrame(update)}; addEventListener('scroll',onScroll,{passive:true}); addEventListener('resize',onScroll,{passive:true}); update(); return true;
  };
  if (!mount()) { const observer = new MutationObserver(()=>{if(mount()) observer.disconnect()}); observer.observe(document.documentElement,{childList:true,subtree:true}); }
})();
