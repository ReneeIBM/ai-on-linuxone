/* Shared sidebar renderer - included by all pages */
/* Call renderSidebar(activeSection, activeSubPage) */
/* activeSection: 'overview' | 'lifecycle' | 'products' | 'help' */
/* activeSubPage: 'use-cases' | 'prepare-data' | 'build-model' | 'optimize-model' | 'deploy-models' | 'serve-model' | 'ai-governance' | null */

function renderSidebar(activeSection, activeSubPage, rootPrefix) {
  const p = rootPrefix || '';
  const lifecycleOpen = activeSection === 'lifecycle';

  const links = {
    overview:      p + 'overview/overview.html',
    usecases:      p + 'use-cases/use-cases.html',
    preparedata:   p + 'prepare-data/prepare-data.html',
    trainmodel:    p + 'build-model/build-model.html',
    optimizemodel: p + 'optimize-model/optimize-model.html',
    deploymodels:  p + 'deploy-models/deploy-models.html',
    servemodel:    p + 'serve-model/serve-model.html',
    aigovernance:  p + 'ai-governance/ai-governance.html',
    products:      p + 'products-tools/data-analytics.html',
    help:          p + 'getting-help/terminology.html',
  };

  document.getElementById('sidebar').innerHTML = `
    <div class="sidebar-section-label">Navigation</div>
    <a href="${links.overview}" class="sidebar-link${activeSection === 'overview' ? ' active' : ''}">Overview</a>
    <div class="sidebar-group-toggle${lifecycleOpen ? ' open' : ''}${activeSection === 'lifecycle' ? ' active' : ''}"
         id="lifecycle-toggle" onclick="toggleLifecycle()">
      <span>AI Lifecycle</span>
      <span class="chevron">&#9654;</span>
    </div>
    <div class="sidebar-sub-items${lifecycleOpen ? ' open' : ''}" id="lifecycle-items">
      <a href="${links.usecases}"      class="sidebar-sub-link${activeSubPage === 'use-cases'      ? ' active' : ''}">Use Cases</a>
      <a href="${links.preparedata}"   class="sidebar-sub-link${activeSubPage === 'prepare-data'   ? ' active' : ''}">Prepare Data</a>
      <a href="${links.trainmodel}"    class="sidebar-sub-link${activeSubPage === 'build-model'    ? ' active' : ''}">Build Model</a>
      <a href="${links.optimizemodel}" class="sidebar-sub-link${activeSubPage === 'optimize-model' ? ' active' : ''}">Optimize Model</a>
      <a href="${links.deploymodels}"  class="sidebar-sub-link${activeSubPage === 'deploy-models'  ? ' active' : ''}">Deploy Models</a>
      <a href="${links.servemodel}"    class="sidebar-sub-link${activeSubPage === 'serve-model'    ? ' active' : ''}">Serve Model</a>
      <a href="${links.aigovernance}"  class="sidebar-sub-link${activeSubPage === 'ai-governance'  ? ' active' : ''}">AI Governance</a>
    </div>
    <div class="sidebar-divider"></div>
    <a href="${links.products}" class="sidebar-link${activeSection === 'products' ? ' active' : ''}">Products &amp; Tools</a>
    <a href="${links.help}"     class="sidebar-link${activeSection === 'help'     ? ' active' : ''}">Getting Help</a>
  `;
}

function toggleLifecycle() {
  const toggle = document.getElementById('lifecycle-toggle');
  const items  = document.getElementById('lifecycle-items');
  toggle.classList.toggle('open');
  items.classList.toggle('open');
}

/* Scroll-spy: highlight subnav link matching visible section */
function initScrollSpy() {
  const sections = document.querySelectorAll('.section');
  const links    = document.querySelectorAll('.subnav-link');
  if (!sections.length || !links.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const a = document.querySelector('.subnav-link[href="#' + entry.target.id + '"]');
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  sections.forEach(s => observer.observe(s));
}
