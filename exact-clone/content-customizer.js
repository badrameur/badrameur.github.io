(() => {
  const set = (selector, value, index = 0) => {
    const nodes = document.querySelectorAll(selector);
    if (nodes[index]) nodes[index].textContent = value;
  };
  const fill = (selector, values) => values.forEach((value, index) => set(selector, value, index));
  const replaceText = (from, to) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => { if (node.nodeValue.includes(from)) node.nodeValue = node.nodeValue.replaceAll(from, to); });
  };
  const apply = () => {
    if (!document.querySelector('.hero-name')) return false;

    document.title = 'Badr Ameur El Idrissi — Portfolio · Étudiant Ingénieur Cybersécurité';
    set('.hero-eyebrow', '// DOSSIER COMPLET — CANDIDAT AMEUR_EL_IDRISSI_B');
    set('.hero-name', 'BADR AMEUR EL IDRISSI');
    set('.hero-role', 'ÉTUDIANT INGÉNIEUR CYBERSÉCURITÉ · RÉSEAUX · SOC · SIEM');
    set('.hero-tagline', 'Étudiant ingénieur cybersécurité : je conçois des infrastructures sécurisées, j’automatise la supervision et je construis des environnements SOC pour détecter les menaces.');
    fill('.stat-value', ['2026', '4A', '4+', '3']);
    fill('.stat-label', ['STAGE AGT MAROC', 'ENSA TANGER', 'CERTIFICATIONS', 'LANGUES']);

    set('.p-about .section-title', 'Construire, détecter, protéger');
    set('.about-lead', 'Étudiant en quatrième année d’ingénierie cybersécurité à l’ENSA Tanger, orienté réseaux, défense, supervision et sécurité des infrastructures.');
    fill('.about-para', ['Je recherche un stage de 2 à 3 mois à partir de juin 2026, au Maroc comme à l’international. Mes projets combinent réseaux d’entreprise, pare-feux, SIEM, réponse à incident et automatisation.']);
    const facts = [
      ['Basé à', 'Tanger, Maroc'], ['Formation', 'Cycle Ingénieur Cybersécurité — ENSA Tanger'],
      ['Disponibilité', 'Juin 2026 · Stage 2 à 3 mois'], ['Cible', 'Stage cybersécurité — Maroc & international'],
      ['Contact', 'ameurelidrissi.badr@etu.uae.ac.ma']
    ];
    document.querySelectorAll('.fact-row').forEach((row, index) => {
      if (!facts[index]) return;
      const key = row.querySelector('.fact-k'), value = row.querySelector('.fact-v');
      if (key) key.textContent = facts[index][0];
      if (value) value.textContent = facts[index][1];
    });

    const jobs = document.querySelectorAll('.tl-item');
    const experience = [
      {
        period: 'JUIL. — AOÛT 2026', role: 'Stagiaire Cybersécurité — VPN & Authentification forte',
        org: 'AGT MAROC · Tanger, Maroc',
        bullets: ['Déploiement d’une infrastructure VPN sécurisée avec pfSense et OpenVPN.', 'Mise en place d’authentification forte : TLS mutuel, RADIUS, PAM et TOTP.', 'Intégration de Wazuh, règles de corrélation et détection temps réel de brute force.'],
        tags: ['PF SENSE', 'OPENVPN', 'WAZUH', 'SIEM', 'MFA']
      },
      {
        period: 'AOÛT 2025', role: 'Stagiaire d’observation — Direction des systèmes d’information',
        org: 'Aéroport International Mohammed V · Casablanca, Maroc',
        bullets: ['Découverte des opérations IT d’un environnement critique à haute disponibilité et haute sécurité.'], tags: ['IT OPERATIONS', 'INFRASTRUCTURE', 'SÉCURITÉ']
      }
    ];
    jobs.forEach((job, index) => {
      const item = experience[index]; if (!item) return;
      const period = job.querySelector('.tl-period'), role = job.querySelector('.tl-role'), org = job.querySelector('.tl-org');
      if (period) period.textContent = item.period;
      if (role) role.textContent = item.role;
      if (org) org.textContent = item.org;
      const list = job.querySelector('.tl-bullets');
      if (list) list.innerHTML = item.bullets.map(b => `<li>${b}</li>`).join('');
      const tags = job.querySelector('.tag-row');
      if (tags) tags.innerHTML = item.tags.map(t => `<li class="tag">${t}</li>`).join('');
    });

    const projects = [
      ['OP: TECHNOVA V3', 'TechNova V3 — Lab réseau & DevOps', 'Infrastructure réseau d’entreprise virtuelle avec redondance, FortiGate haute disponibilité, supervision Zabbix et sauvegardes automatisées.'],
      ['OP: PERSONAL SOC', 'Personal SOC Lab', 'SOC personnel sur VirtualBox : pfSense, Wazuh, TheHive, Cortex, MISP, Active Directory et scénarios d’attaque validés.'],
      ['OP: VPN SECURITY', 'VPN & authentification forte', 'VPN OpenVPN avec certificats TLS, MFA RADIUS/TOTP, filtrage DNS et alertes SIEM.']
    ];
    document.querySelectorAll('.proj-card').forEach((card, index) => {
      const item = projects[index]; if (!item) return;
      const code = card.querySelector('.proj-codename'), title = card.querySelector('.proj-title'), summary = card.querySelector('.proj-summary');
      if (code) code.textContent = item[0]; if (title) title.textContent = item[1]; if (summary) summary.textContent = item[2];
    });
    document.querySelectorAll('.proj-card').forEach((card, index) => { if (index >= 3) card.style.display = 'none'; });
    jobs.forEach((job, index) => { if (index >= 2) job.style.display = 'none'; });

    const skillNames = ['Réseaux & infrastructure', 'Security Operations / SOC', 'Systèmes & administration', 'Développement & automatisation'];
    fill('.skill-domain-name', skillNames);
    fill('.skill-blurb', ['Routage, switching, TCP/IP, pare-feux', 'SIEM, réponse à incident, threat intelligence', 'Linux, Windows Server, Active Directory, GPO', 'Python, HTML, PHP, SQL et scripts']);

    const certificates = [
      ['CCNA: Introduction to Networks', 'Cisco Networking Academy', 'OBTENU'],
      ['CCNA: Switching, Routing, and Wireless Essentials', 'Cisco Networking Academy', 'OBTENU'],
      ['CCNA: Enterprise Networking, Security, and Automation', 'Cisco Networking Academy', 'OBTENU'],
      ['Hack The Box Academy — Web Penetration Tester Path', 'Hack The Box Academy', 'EN COURS']
    ];
    document.querySelectorAll('.cert-row').forEach((row, index) => {
      const item = certificates[index];
      if (!item) { row.style.display = 'none'; return; }
      const name = row.querySelector('.cert-name'), meta = row.querySelector('.cert-meta'), status = row.querySelector('.cert-status');
      if (name) name.textContent = item[0]; if (meta) meta.textContent = item[1]; if (status) status.textContent = item[2];
    });

    const languages = [
      ['Arabe', 'C2', 'Langue maternelle'],
      ['Français', 'C2', 'Langue maternelle'],
      ['Anglais', 'B2', 'Intermédiaire supérieur']
    ];
    document.querySelectorAll('.lang-row').forEach((row, index) => {
      const item = languages[index];
      if (!item) { row.style.display = 'none'; return; }
      const name = row.querySelector('.lang-name'), cefr = row.querySelector('.lang-cefr'), level = row.querySelector('.lang-level');
      if (name) name.textContent = item[0]; if (cefr) cefr.textContent = item[1]; if (level) level.textContent = item[2];
    });

    const removeUnlistedSkill = (needle) => {
      document.querySelectorAll('li, .tag, .skill-bar-row, p, span').forEach(node => {
        if (node.children.length === 0 && node.textContent.trim().toLowerCase().includes(needle)) node.remove();
      });
    };
    removeUnlistedSkill('mythic');
    removeUnlistedSkill('sqlmap');

    replaceText('Léo Haidar', 'Badr Ameur El Idrissi');
    replaceText('LÉO HAIDAR', 'BADR AMEUR EL IDRISSI');
    replaceText('zleohaidar@gmail.com', 'ameurelidrissi.badr@etu.uae.ac.ma');
    replaceText('github.com/bylife', 'github.com/badrameur');
    replaceText('ByLife', 'Badr Ameur El Idrissi');
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => a.href = 'mailto:ameurelidrissi.badr@etu.uae.ac.ma');
    return true;
  };
  const observer = new MutationObserver(() => { if (apply()) observer.disconnect(); });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  apply();
})();
