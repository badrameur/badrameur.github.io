(() => {
  const portrait = document.createElement('figure');
  portrait.className = 'scroll-portrait';
  portrait.setAttribute('aria-hidden', 'true');
  portrait.innerHTML = '<img src="/assets/badr-portrait.png" alt="">';

  const mount = () => {
    const about = document.querySelector('.p-about');
    const projects = document.querySelector('.p-projects');
    if (!about || !projects) return false;
    document.body.append(portrait);

    let frame = 0;
    const update = () => {
      frame = 0;
      const start = about.getBoundingClientRect().top;
      const end = projects.getBoundingClientRect().top;
      const viewport = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (viewport * .72 - start) / Math.max(1, end - start + viewport * .42)));
      const visible = start < viewport * .72 && end > viewport * .1;
      portrait.style.setProperty('--portrait-progress', progress.toFixed(4));
      portrait.classList.toggle('is-visible', visible);
    };
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', requestUpdate, { passive: true });
    addEventListener('resize', requestUpdate, { passive: true });
    requestUpdate();
    return true;
  };

  if (!mount()) {
    const observer = new MutationObserver(() => { if (mount()) observer.disconnect(); });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
