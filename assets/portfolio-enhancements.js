(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!reduced.matches) document.addEventListener('pointermove', e => {
    const card = e.target.closest?.('.proj-card');
    if (!card) return;
    const box = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - box.left}px`);
    card.style.setProperty('--my', `${e.clientY - box.top}px`);
  });

  let lastFocus;
  let modal;
  const isEnglish = () => document.documentElement.lang === 'en' || location.pathname.startsWith('/en');
  const label = (fr, en) => isEnglish() ? en : fr;

  function close() {
    if (!modal) return;
    modal.remove();
    modal = null;
    document.body.classList.remove('project-modal-open');
    lastFocus?.focus();
  }

  function open(card) {
    close();
    lastFocus = document.activeElement;
    const title = card.querySelector('.proj-title')?.textContent?.trim() || '';
    const tagline = card.querySelector('.proj-tagline')?.textContent?.trim() || '';
    const summary = card.querySelector('.proj-summary')?.textContent?.trim() || '';
    const code = card.querySelector('.proj-codename')?.textContent?.trim() || '';
    const number = card.querySelector('.proj-num')?.textContent?.trim() || '';
    const highlights = [...card.querySelectorAll('.proj-highlights li')].map(el => el.textContent.trim().replace(/^▹\s*/, ''));
    const tags = [...card.querySelectorAll('.tag-row li')].map(el => el.textContent.trim());
    const link = card.querySelector('.proj-link');

    modal = document.createElement('div');
    modal.className = 'project-modal-backdrop';
    modal.innerHTML = `<section class="project-modal panel" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <div class="project-modal-top mono"><span></span><button type="button" class="project-modal-close" aria-label="${label('Fermer la fiche projet', 'Close project details')}">×</button></div>
      <div class="project-modal-index mono"></div>
      <h2 id="project-modal-title" class="display project-modal-title"></h2>
      <p class="project-modal-tagline"></p>
      <p class="project-modal-summary"></p>
      <div class="project-modal-rule"></div>
      <h3 class="mono project-modal-label"></h3>
      <ul class="project-modal-highlights"></ul>
      <ul class="project-modal-tags"></ul>
      <div class="project-modal-actions"></div>
    </section>`;
    modal.querySelector('.project-modal-top span').textContent = code || label('FICHE PROJET', 'PROJECT BRIEF');
    modal.querySelector('.project-modal-index').textContent = `// ${number} / 08`;
    modal.querySelector('.project-modal-title').textContent = title;
    modal.querySelector('.project-modal-tagline').textContent = tagline;
    modal.querySelector('.project-modal-summary').textContent = summary;
    modal.querySelector('.project-modal-label').textContent = label('POINTS CLÉS', 'KEY POINTS');
    const list = modal.querySelector('.project-modal-highlights');
    highlights.forEach(item => { const li = document.createElement('li'); li.textContent = item; list.append(li); });
    const tagList = modal.querySelector('.project-modal-tags');
    tags.forEach(item => { const li = document.createElement('li'); li.textContent = item; tagList.append(li); });
    const actions = modal.querySelector('.project-modal-actions');
    if (link) {
      const a = document.createElement('a');
      a.className = 'cmd cmd--primary';
      a.href = link.href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = label('Voir sur GitHub ↗', 'View on GitHub ↗');
      actions.append(a);
    }
    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'cmd project-modal-back';
    back.textContent = label('Retour aux projets', 'Back to projects');
    back.addEventListener('click', close);
    actions.append(back);
    modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('.project-modal-close')) close(); });
    document.body.append(modal);
    document.body.classList.add('project-modal-open');
    modal.querySelector('.project-modal-close').focus();
  }

  document.addEventListener('click', e => {
    const card = e.target.closest?.('.proj-card');
    if (!card || e.target.closest('a')) return;
    open(card);
  });
  document.addEventListener('keydown', e => {
    if (modal) {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        const focusable = [...modal.querySelectorAll('a,button')];
        const first = focusable[0], last = focusable.at(-1);
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    } else if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.proj-card')) {
      e.preventDefault(); open(e.target);
    }
  });

  const observer = new MutationObserver(() => {
    document.querySelectorAll('.proj-card:not([data-detail-ready])').forEach(card => {
      card.dataset.detailReady = 'true';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `${label('Voir le projet', 'View project')}: ${card.querySelector('.proj-title')?.textContent || ''}`);
    });
  });
  observer.observe(document.getElementById('root'), {childList:true,subtree:true});
})();
