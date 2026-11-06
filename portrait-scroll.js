(() => {
  const photos = [
    ['/assets/experience-agt.png', 'Portrait professionnel — AGT Maroc'],
    ['/assets/experience-airport.png', 'Portrait professionnel — Aéroport Mohammed V']
  ];
  const mount = () => {
    const section = document.querySelector('.p-experience');
    const timeline = section?.querySelector('.timeline');
    const items = timeline ? [...timeline.querySelectorAll('.tl-item')].slice(0, 2) : [];
    if (!section || !timeline || items.length < 2 || section.querySelector('.experience-workspace')) return false;
    const workspace = document.createElement('div'); workspace.className = 'experience-workspace';
    const portrait = document.createElement('aside'); portrait.className = 'experience-portrait'; portrait.setAttribute('aria-live', 'polite');
    portrait.innerHTML = photos.map(([src, alt], i) => `<img class="experience-pose${i === 0 ? ' is-active' : ''}" src="${src}" alt="${alt}">`).join('');
    timeline.replaceWith(workspace); workspace.append(timeline, portrait);
    const images = [...portrait.querySelectorAll('.experience-pose')]; let active = 0;
    const show = index => { if (index === active) return; active = index; images.forEach((img, i) => img.classList.toggle('is-active', i === index)); };
    let frame = 0;
    const update = () => {
      frame = 0;
      const sectionRect = section.getBoundingClientRect();
      if (sectionRect.bottom < innerHeight * .12 || sectionRect.top > innerHeight * .88) { images.forEach(img => img.classList.remove('is-active')); active = -1; return; }
      const center = innerHeight * .48;
      const nearest = items.reduce((best, item, index) => {
        const rect = item.getBoundingClientRect(); const distance = Math.abs((rect.top + rect.height * .35) - center);
        return distance < best.distance ? { index, distance } : best;
      }, { index: 0, distance: Infinity });
      show(nearest.index);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll, { passive: true }); update(); return true;
  };
  if (!mount()) { const observer = new MutationObserver(() => { if (mount()) observer.disconnect(); }); observer.observe(document.documentElement, { childList: true, subtree: true }); }
})();
