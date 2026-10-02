/* ─────────────────────────────────────────────────────────────
   nav.js  —  Shared navigation renderer for AI on IBM Z 101 site
   ─────────────────────────────────────────────────────────────

   renderNav({
     root:         '../',           // path prefix to site root
     activeTop:    'lifecycle',     // 'overview'|'use-cases'|'lifecycle'|'products'|'help'
     activeSub:    'prepare-data',  // sub-tab id, or null
     pageNavItems: [
       { id: 'overview', label: 'Overview' },
       ...
     ]
   });

   ───────────────────────────────────────────────────────────── */

function renderNav(opts) {
  const p   = opts.root || '';
  const top = opts.activeTop || '';
  const sub = opts.activeSub || '';

  /* ── Lifecycle stages with their tool sub-items ─────────────── */
  const lifecycleItems = [
    { id: 'lifecycle-overview', label: 'Overview',   href: p + 'prepare-data/lifecycle-overview.html', tools: [] },
    { id: 'prepare-data',   label: 'Prepare Data',   href: p + 'prepare-data/prepare-data.html',       tools: [] },
    { id: 'build-model',    label: 'Build Models',   href: p + 'build-model/build-model.html',         tools: [] },
    { id: 'deploy-models',  label: 'Deploy Models',  href: p + 'deploy-models/deploy-models.html',     tools: [] },
    { id: 'serve-model',    label: 'Serve Model',    href: p + 'serve-model/serve-model.html',         tools: [] },
    { id: 'ai-governance',  label: 'AI Governance',  href: p + 'ai-governance/ai-governance.html',     tools: [] },
  ];

  /* ── Product categories with their tool sub-items ───────────── */
  const productsCategoryItems = [
    {
      id: 'products-overview', label: 'Overview',
      href: p + 'products-tools/overview.html',
      tools: []
    },
    {
      id: 'data-analytics', label: 'Data & Analytics',
      href: p + 'products-tools/data-analytics.html',
      tools: [
        { label: 'IBM Synthetic Data Sets', href: p + 'products-tools/data-analytics.html#synthetic-data-sets' },
      ]
    },
    {
      id: 'ai-frameworks', label: 'AI Frameworks & Dev Tools',
      href: p + 'products-tools/ai-frameworks.html',
      tools: [
        { label: 'AI Toolkit for IBM Z and IBM LinuxONE',   href: p + 'products-tools/ai-frameworks.html#ai-toolkit' },
        { label: 'IBM Z Accelerated SnapML',            href: p + 'products-tools/ai-frameworks.html#snapml' },
        { label: 'IBM Z Accelerated for TensorFlow',    href: p + 'products-tools/ai-frameworks.html#tensorflow' },
        { label: 'IBM Z Accelerated for PyTorch',       href: p + 'products-tools/ai-frameworks.html#pytorch' },
      ]
    },
    {
      id: 'model-formats', label: 'Model Formats & Compilers',
      href: p + 'products-tools/model-formats.html',
      tools: [
        { label: 'ONNX Model Format',                    href: p + 'products-tools/model-formats.html#onnx' },
        { label: 'PMML Model Format',                    href: p + 'products-tools/model-formats.html#pmml' },
        { label: 'IBM Z Deep Learning Compiler (zDLC)',  href: p + 'products-tools/model-formats.html#zdlc' },
      ]
    },
    {
      id: 'inference-serving', label: 'Inference & Serving',
      href: p + 'products-tools/inference-serving.html',
      tools: [
        { label: 'IBM Z Accelerated for Triton Inference Server', href: p + 'products-tools/inference-serving.html#triton' },
        { label: 'IBM Z Accelerated Serving for TensorFlow', href: p + 'products-tools/inference-serving.html#tf-serving' },
        { label: 'Red Hat AI Inference Server',              href: p + 'products-tools/inference-serving.html#rh-inference' },
      ]
    },
    {
      id: 'ai-platforms', label: 'AI Platforms',
      href: p + 'products-tools/ai-platforms.html',
      tools: [
        { label: 'AI Optimizer for IBM Z and LinuxONE', href: p + 'products-tools/ai-platforms.html#ai-optimizer' },
        { label: 'Red Hat OpenShift AI',                href: p + 'products-tools/ai-platforms.html#rhoai' },
        { label: 'watsonx.ai',                          href: p + 'products-tools/ai-platforms.html#watsonx-ai' },
        { label: 'watsonx.governance',                  href: p + 'products-tools/ai-platforms.html#watsonx-governance' },
      ]
    },
    {
      id: 'hardware-solutions', label: 'Hardware',
      href: p + 'products-tools/hardware-solutions.html',
      tools: [
        { label: 'Telum and the IBM Integrated Accelerator for AI', href: p + 'products-tools/hardware-solutions.html#telum' },
        { label: 'IBM Spyre Accelerator',                     href: p + 'products-tools/hardware-solutions.html#spyre' },
      ]
    },
    {
      id: 'turnkey-solutions', label: 'Turnkey & ISV Solutions',
      href: p + 'products-tools/turnkey-solutions.html',
      tools: [
        { label: 'Embedded AI Core Banking Solutions', href: p + 'products-tools/turnkey-solutions.html#embedded-ai-solutions' },
        { label: 'ISV Packaged AI Solutions',          href: p + 'products-tools/turnkey-solutions.html#packaged-ai-solutions' },
      ]
    },
  ];

  const helpItems = [
    { id: 'resources-contacts', label: 'Resources & Contacts', href: p + 'getting-help/terminology.html#resources-contacts' },
  ];

  const useCasesItems = [
    { id: 'use-cases-overview',    label: 'Overview',                     href: p + 'use-cases/overview.html' },
    { id: 'ai-solution-patterns',  label: 'Advanced Credit Card Fraud Detection', href: p + 'use-cases/use-cases.html#ai-solution-patterns' },
    { id: 'ai-solution-template',  label: 'Solution Blueprints',          href: p + 'use-cases/ai-solution-template.html' },
  ];

  /* ── Helper: simple dropdown (no flyout) ───────────────────── */
  function dropdown(labelText, items, activeSub) {
    const links = items.map(l => {
      const isActive = activeSub && (l.id === activeSub || (l.href && l.href.includes('#' + activeSub)));
      return `<a href="${l.href}"${isActive ? ' class="active"' : ''}>${l.label}</a>`;
    }).join('');
    return `<div class="topnav-dropdown">
      <div class="topnav-dropdown-label">${labelText}</div>
      ${links}
    </div>`;
  }

  /* ── Helper: flyout dropdown (category → tools) ─────────────── */
  function flyoutDropdown(labelText, items, activeSub) {
    const rows = items.map(l => {
      const isActive = activeSub && l.id === activeSub;
      const toolLinks = (l.tools || []).map(t =>
        `<a href="${t.href}" class="flyout-tool-link">${t.label}</a>`
      ).join('');
      const hasFlyout = l.tools && l.tools.length > 0;
      return `<div class="topnav-flyout-item${hasFlyout ? ' has-flyout' : ''}">
        <a href="${l.href}" class="topnav-dropdown-cat${isActive ? ' active' : ''}">${l.label}${hasFlyout ? '<span class="flyout-caret">›</span>' : ''}</a>
        ${hasFlyout ? `<div class="flyout-panel">${toolLinks}</div>` : ''}
      </div>`;
    }).join('');
    return `<div class="topnav-dropdown">
      <div class="topnav-dropdown-label">${labelText}</div>
      ${rows}
    </div>`;
  }

  /* ── 1. Build top nav ─────────────────────────────────────── */
  const topbarEl = document.getElementById('topnav');
  if (topbarEl) {
    const items = [
      {
        id: 'use-cases', label: 'Use Cases',
        href: p + 'use-cases/overview.html',
        dropdown: dropdown('Use Cases', useCasesItems, top === 'use-cases' ? sub : null),
      },
      {
        id: 'lifecycle', label: 'AI Lifecycle',
        href: p + 'prepare-data/lifecycle-overview.html',
        dropdown: flyoutDropdown('AI Lifecycle', lifecycleItems, sub),
      },
      {
        id: 'products', label: 'Products & Tools',
        href: p + 'products-tools/overview.html',
        dropdown: flyoutDropdown('Products & Tools', productsCategoryItems, sub),
      },
      {
        id: 'help', label: 'Getting Help',
        href: p + 'getting-help/terminology.html',
        dropdown: dropdown('Getting Help', helpItems, sub),
      },
    ];

    topbarEl.innerHTML = items.map(item => {
      const isActive = top === item.id;
      const hasCaret = item.dropdown !== null;
      const caret = hasCaret ? `<span class="caret">▾</span>` : '';
      return `<div class="topnav-item">
        <div class="topnav-link-row">
          <a href="${item.href}" class="topnav-link${isActive ? ' active' : ''}">${item.label}</a>
          ${hasCaret ? `<button class="mobile-subnav-toggle" aria-label="Toggle ${item.label} submenu">${caret}</button>` : ''}
        </div>
        ${item.dropdown || ''}
      </div>`;
    }).join('');

    /* ── Inject search bar inside topnav ── */
    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'topbar-search';
    searchWrapper.innerHTML = `
      <span class="topbar-search-icon">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="1.5"/>
          <line x1="10.35" y1="10.35" x2="14" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </span>
      <input
        type="text"
        class="topbar-search-input"
        placeholder="Search AI on Z…"
        autocomplete="off"
        spellcheck="false"
        aria-label="Search AI on Z"
      />
      <button class="topbar-search-clear" aria-label="Clear search">&#x2715;</button>
      <div class="topbar-search-results" role="listbox" aria-label="Search results"></div>
    `;
    topbarEl.appendChild(searchWrapper);
    initSearch(searchWrapper, p);

    /* ── Mobile Hamburger Toggle ── */
    const headerEl = topbarEl.closest('.topbar');
    if (headerEl && !headerEl.querySelector('.mobile-menu-btn')) {
      const menuBtn = document.createElement('button');
      menuBtn.className = 'mobile-menu-btn';
      menuBtn.setAttribute('aria-label', 'Toggle Navigation Menu');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      `;
      headerEl.appendChild(menuBtn);

      const navBackdrop = document.createElement('div');
      navBackdrop.className = 'mobile-nav-backdrop';
      document.body.appendChild(navBackdrop);

      const toggleMenu = (forceState) => {
        const isOpen = typeof forceState === 'boolean' ? forceState : !topbarEl.classList.contains('is-open');
        topbarEl.classList.toggle('is-open', isOpen);
        menuBtn.classList.toggle('is-open', isOpen);
        navBackdrop.classList.toggle('is-open', isOpen);
        menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.classList.toggle('mobile-menu-open', isOpen);
      };

      menuBtn.addEventListener('click', () => toggleMenu());
      navBackdrop.addEventListener('click', () => toggleMenu(false));

      // Mobile sub-item / flyout toggles
      topbarEl.querySelectorAll('.mobile-subnav-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const item = btn.closest('.topnav-item');
          if (item) item.classList.toggle('is-expanded');
        });
      });

      topbarEl.querySelectorAll('.topnav-dropdown-cat').forEach(cat => {
        cat.addEventListener('click', (e) => {
          if (window.innerWidth <= 840) {
            const flyoutItem = cat.closest('.topnav-flyout-item');
            if (flyoutItem && flyoutItem.classList.contains('has-flyout')) {
              // If clicked on caret or to expand
              if (e.target.classList.contains('flyout-caret') || !flyoutItem.classList.contains('is-expanded')) {
                e.preventDefault();
                flyoutItem.classList.toggle('is-expanded');
              }
            }
          }
        });
      });
    }
  }

  /* ── 2. Sub-nav bar — hidden; always use no-lifecycle padding ── */
  const lifecycleEl = document.getElementById('lifecycle-nav');
  if (lifecycleEl) {
    lifecycleEl.style.display = 'none';
    document.body.classList.add('no-lifecycle');
    document.body.classList.remove('has-lifecycle');
  }

  /* ── 3. Right page-nav ───────────────────────────────────── */
  const navItems = opts.pageNavItems || [];
  const pagenavEl = document.getElementById('pagenav');
  if (pagenavEl && navItems.length) {
    pagenavEl.style.top = 'var(--topbar-height)';

    pagenavEl.innerHTML =
      `<div class="pagenav-label">On this page</div>` +
      navItems.map(item =>
        `<a href="#${item.id}" class="pagenav-link" data-target="${item.id}">${item.label}</a>`
      ).join('');
  }

  /* ── 4. Scroll-spy ───────────────────────────────────────── */
  const sections = document.querySelectorAll('.section');
  const navLinks  = document.querySelectorAll('.pagenav-link');
  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const a = document.querySelector(`.pagenav-link[data-target="${entry.target.id}"]`);
          if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: '-22% 0px -65% 0px' });
    sections.forEach(s => observer.observe(s));
  }
}

/* Legacy shim */
function renderSidebar() {}
function initScrollSpy() {}

/* ─────────────────────────────────────────────────────────────
   Search — static index + live dropdown
   ───────────────────────────────────────────────────────────── */
function initSearch(wrapper, root) {
  /* ── Static index: { title, section, snippet, href } ── */
  const INDEX = [
    /* Prepare Data */
    { title: 'Prepare Data', section: 'AI Lifecycle', snippet: 'Synthetic data generation, feature engineering, and open-source Python libraries on IBM LinuxONE for data preparation.', href: root + 'prepare-data/prepare-data.html' },
    { title: 'IBM Synthetic Data Sets', section: 'Prepare Data', snippet: 'Generate realistic, privacy-safe labeled datasets for training AI models on IBM LinuxONE.', href: root + 'products-tools/data-analytics.html#synthetic-data-sets' },
    { title: 'IBM Z Accelerated for Snap ML', section: 'Prepare Data', snippet: 'Snap ML on IBM LinuxONE — accelerated preprocessing and feature engineering leveraging the Telum II on-chip AI accelerator.', href: root + 'products-tools/ai-frameworks.html#snapml' },

    /* Build Models */
    { title: 'Build Models', section: 'AI Lifecycle', snippet: 'Traditional ML, deep learning, and LLMs on IBM LinuxONE — IBM Z Accelerated for Snap ML, IBM Z Accelerated for TensorFlow, IBM Z Accelerated for PyTorch, fine-tuning, and prompt engineering.', href: root + 'build-model/build-model.html' },
    { title: 'IBM Z Accelerated for Snap ML', section: 'Build Model', snippet: 'IBM Z Accelerated for Snap ML leverages the Telum II on-chip AI accelerator for fast classical ML training on IBM LinuxONE.', href: root + 'products-tools/ai-frameworks.html#snapml' },
    { title: 'IBM Z Accelerated for TensorFlow', section: 'AI Frameworks & Dev Tools', snippet: 'IBM Z Accelerated for TensorFlow optimized for IBM LinuxONE with hardware acceleration via the Telum II AI accelerator.', href: root + 'products-tools/ai-frameworks.html#tensorflow' },
    { title: 'IBM Z Accelerated Serving for TensorFlow', section: 'Inference & Serving', snippet: 'IBM Z Accelerated Serving for TensorFlow on IBM LinuxONE — expose REST and gRPC endpoints for high-throughput, low-latency model inference.', href: root + 'products-tools/inference-serving.html#tf-serving' },
    { title: 'IBM Z Accelerated for PyTorch', section: 'Build Model', snippet: 'IBM Z Accelerated for PyTorch optimized for s390x, enabling deep learning model training on IBM LinuxONE.', href: root + 'products-tools/ai-frameworks.html#pytorch' },
    { title: 'Red Hat OpenShift AI', section: 'Build Model', snippet: 'MLOps platform on Red Hat OpenShift running on IBM LinuxONE for containerized AI workloads.', href: root + 'products-tools/ai-platforms.html#rhoai' },

    /* Deploy Models (includes optimize & deploy) */
    { title: 'ONNX & IBM Z Deep Learning Compiler', section: 'Deploy Models', snippet: 'Convert and compile models to ONNX format; use zDLC to optimize neural networks for IBM LinuxONE hardware.', href: root + 'products-tools/model-formats.html#zdlc' },
    { title: 'AI Optimizer for IBM LinuxONE', section: 'Deploy Models', snippet: 'Quantize and compress AI models to improve inference throughput on IBM LinuxONE — a single LPAR appliance ready in under 2 hours.', href: root + 'products-tools/ai-platforms.html#ai-optimizer' },

    /* Model Formats & Compilers */
    { title: 'Model Formats & Compilers', section: 'Products & Tools', snippet: 'ONNX and PMML model interchange formats plus the IBM Z Deep Learning Compiler for Telum II-accelerated inference.', href: root + 'products-tools/model-formats.html' },
    { title: 'ONNX Model Format', section: 'Model Formats & Compilers', snippet: 'Export IBM Z Accelerated for TensorFlow, IBM Z Accelerated for PyTorch, or scikit-learn models to ONNX for portable deployment on IBM LinuxONE.', href: root + 'products-tools/model-formats.html#onnx' },
    { title: 'PMML Model Format', section: 'Model Formats & Compilers', snippet: 'Convert scikit-learn, XGBoost, or LightGBM models to PMML for deployment via IBM Z Accelerated for Snap ML on IBM LinuxONE.', href: root + 'products-tools/model-formats.html#pmml' },
    { title: 'IBM Z Deep Learning Compiler (zDLC)', section: 'Model Formats & Compilers', snippet: 'Compile ONNX models to optimized s390x binaries with automatic Telum II AI accelerator offloading via zDNN.', href: root + 'products-tools/model-formats.html#zdlc' },

    /* Deploy Models */
    { title: 'Deploy Models', section: 'AI Lifecycle', snippet: 'Deploy AI models on IBM LinuxONE with RHOAI, watsonx.ai, or AI Optimizer for streamlined containerized deployment.', href: root + 'deploy-models/deploy-models.html' },
    { title: 'watsonx.ai on IBM LinuxONE', section: 'Deploy Models', snippet: 'Run IBM watsonx.ai workloads on IBM LinuxONE infrastructure for enterprise-grade AI deployment.', href: root + 'products-tools/ai-platforms.html#watsonx-ai' },

    /* Serve Model */
    { title: 'Serve Model', section: 'AI Lifecycle', snippet: 'Invoke deployed IBM LinuxONE models from applications via REST and gRPC endpoints using Triton or Red Hat AI Inference Server.', href: root + 'serve-model/serve-model.html' },
    { title: 'IBM Z Accelerated for Triton Inference Server', section: 'Serve Model', snippet: 'IBM Z Accelerated for Triton Inference Server — multi-framework model serving optimized for IBM LinuxONE.', href: root + 'products-tools/inference-serving.html#triton' },
    { title: 'Red Hat AI Inference Server', section: 'Serve Model', snippet: 'Serve large language models and GenAI workloads on IBM LinuxONE using the Red Hat AI Inference Server with vLLM.', href: root + 'products-tools/inference-serving.html#rh-inference' },

    /* AI Governance */
    { title: 'AI Governance', section: 'AI Lifecycle', snippet: 'Monitor, explain, and govern AI models with watsonx.governance and TrustyAI on IBM LinuxONE.', href: root + 'ai-governance/ai-governance.html' },
    { title: 'watsonx.governance', section: 'AI Governance', snippet: 'Track model risk, detect drift, and ensure regulatory compliance with IBM watsonx.governance on IBM LinuxONE via IBM Software Hub 5.4.0.', href: root + 'products-tools/ai-platforms.html#watsonx-governance' },

    /* Hardware */
    { title: 'Hardware Solutions', section: 'Products & Tools', snippet: 'IBM LinuxONE hardware for AI: Telum II on-chip accelerator and IBM Spyre Accelerator for generative AI.', href: root + 'products-tools/hardware-solutions.html' },
    { title: 'IBM Integrated Accelerator for AI (Telum II)', section: 'Hardware', snippet: 'Telum II is the on-chip AI accelerator built into IBM LinuxONE 5 processors — 450B inference requests/day, 99% within 1ms latency.', href: root + 'products-tools/hardware-solutions.html#telum' },
    { title: 'IBM Spyre Accelerator', section: 'Hardware', snippet: 'The IBM Spyre Accelerator on IBM LinuxONE 5 enables high-throughput generative AI — 32 Gen AI-ready cores per adapter, up to 48 cards per system.', href: root + 'products-tools/hardware-solutions.html#spyre' },

    /* AI Frameworks */
    { title: 'AI Toolkit for IBM LinuxONE', section: 'Products & Tools', snippet: 'A collection of open-source AI frameworks — IBM Z Accelerated for TensorFlow, IBM Z Accelerated for PyTorch, IBM Z Accelerated for Snap ML, ONNX — optimized for s390x.', href: root + 'products-tools/ai-frameworks.html#ai-toolkit' },

    /* Use Cases */
    { title: 'Advanced Credit Card Fraud Detection', section: 'Use Cases', snippet: 'Multi-model ensemble AI on IBM LinuxONE 5 — a complete end-to-end solution blueprint using XGBoost and BERT.', href: root + 'use-cases/use-cases.html#ai-solution-patterns' },
    { title: 'Solution Blueprints', section: 'Use Cases', snippet: 'AI solution patterns on IBM LinuxONE — generative AI, fraud detection, credit risk, health insurance, data preprocessing, and AML.', href: root + 'use-cases/ai-solution-template.html' },
    { title: 'Fraud Detection on IBM LinuxONE', section: 'Solution Blueprints', snippet: 'Deploy an AI fraud detection model using open-source frameworks on IBM LinuxONE.', href: root + 'use-cases/ai-solution-template.html#fraud-detection' },
    { title: 'Document Intelligence with Spyre', section: 'Solution Blueprints · Generative AI', snippet: 'IBM Granite LLM inference on Red Hat AI Inference Server, leveraging the IBM Spyre Accelerator on IBM LinuxONE.', href: root + 'use-cases/ai-solution-template.html#generative-ai' },
    { title: 'Credit Risk Assessment on IBM LinuxONE', section: 'Solution Blueprints', snippet: 'Build and deploy a credit risk scoring model using open-source frameworks on IBM LinuxONE with real-time scoring.', href: root + 'use-cases/ai-solution-template.html#credit-risk' },
    { title: 'Health Insurance Claims on IBM LinuxONE', section: 'Solution Blueprints', snippet: 'AI model for health insurance claims processing on IBM LinuxONE, deployed for real-time scoring.', href: root + 'use-cases/ai-solution-template.html#health-insurance' },
    { title: 'Data Preprocessing on IBM LinuxONE', section: 'Solution Blueprints', snippet: 'Build an AI solution with a preprocessing pipeline using open-source frameworks on IBM LinuxONE.', href: root + 'use-cases/ai-solution-template.html#data-preprocessing' },
    { title: 'Anti-Money Laundering on IBM LinuxONE', section: 'Solution Blueprints', snippet: 'AML detection model using open-source frameworks for real-time transaction monitoring on IBM LinuxONE.', href: root + 'use-cases/ai-solution-template.html#anti-money-laundering' },

    /* Turnkey & ISV Solutions */
    { title: 'Turnkey & ISV Solutions', section: 'Products & Tools', snippet: 'Pre-built AI solutions from IBM and ecosystem partners — Featurespace, Quantexa, Clari5, OvationCXM, Exponential AI, ACI, DXC, Worldline.', href: root + 'products-tools/turnkey-solutions.html' },
    { title: 'Featurespace — ARIC Risk Hub', section: 'ISV Solutions', snippet: 'Real-time fraud detection and risk scoring on IBM LinuxONE. Integrates with core banking and payments solutions.', href: root + 'products-tools/turnkey-solutions.html#packaged-ai-solutions' },
    { title: 'Quantexa — Decision Intelligence Platform', section: 'ISV Solutions', snippet: 'Entity resolution, fraud detection, KYC, and AML on IBM LinuxONE. Batch core banking and payments integrations.', href: root + 'products-tools/turnkey-solutions.html#packaged-ai-solutions' },
    { title: 'Clari5 — Enterprise Fraud Management', section: 'ISV Solutions', snippet: 'Anti-money laundering and payments fraud detection on IBM LinuxONE.', href: root + 'products-tools/turnkey-solutions.html#packaged-ai-solutions' },
    { title: 'OvationCXM — Customer Experience', section: 'ISV Solutions', snippet: 'Customer experience management on IBM LinuxONE. Integrates with FIS Systematics and DXC Hogan.', href: root + 'products-tools/turnkey-solutions.html#packaged-ai-solutions' },
    { title: 'Exponential AI — Enso Platform', section: 'ISV Solutions', snippet: 'Claims processing for healthcare and insurance on IBM LinuxONE. Real-time and batch workloads.', href: root + 'products-tools/turnkey-solutions.html#packaged-ai-solutions' },
    { title: 'ACI Proactive Risk Manager', section: 'ISV Solutions', snippet: 'Fraud and risk management on IBM LinuxONE. Integrates with ACI Base24 and other payment solutions.', href: root + 'products-tools/turnkey-solutions.html#packaged-ai-solutions' },
    { title: 'DXC Umbrella — Embedded AI', section: 'ISV Solutions', snippet: 'Real-time fraud detection embedded in DXC Hogan / Card and Merchant System on IBM LinuxONE.', href: root + 'products-tools/turnkey-solutions.html#embedded-ai-solutions' },
    { title: 'Worldline — Embedded AI', section: 'ISV Solutions', snippet: 'Fraud detection embedded in Worldline Cardlink on IBM LinuxONE.', href: root + 'products-tools/turnkey-solutions.html#embedded-ai-solutions' },

    /* Getting Help */
    { title: 'Resources & Contacts', section: 'Getting Help', snippet: 'Links to documentation, GitHub repos, community contacts, and how to reach the AI on LinuxONE team.', href: root + 'getting-help/terminology.html#resources-contacts' },

    /* Additional terms */
    { title: 'XGBoost on IBM LinuxONE', section: 'AI Frameworks', snippet: 'XGBoost is supported via standard Python on Linux on IBM LinuxONE — export models as ONNX or PMML for deployment.', href: root + 'products-tools/ai-frameworks.html' },
    { title: 'BERT / Transformer Models on IBM LinuxONE', section: 'AI Frameworks', snippet: 'Fine-tune BERT-base with IBM Z Accelerated for PyTorch on IBM LinuxONE, export as ONNX, and deploy via Triton or Red Hat AI Inference Server.', href: root + 'products-tools/ai-frameworks.html#pytorch' },
    { title: 'IBM LinuxONE 5', section: 'Hardware', snippet: 'IBM LinuxONE 5 features the Telum II AI accelerator and IBM Spyre Accelerator for high-throughput, low-latency AI inference — 83% energy reduction vs x86+GPU.', href: root + 'products-tools/hardware-solutions.html' },
    { title: 'Telum II AI Accelerator', section: 'Hardware', snippet: 'Telum II is the second-generation on-chip AI accelerator in IBM LinuxONE 5, supporting INT8 quantization for 2× efficiency vs FP16.', href: root + 'products-tools/hardware-solutions.html#telum' },
    { title: 'Real-Time AI Inference on IBM LinuxONE', section: 'AI Lifecycle', snippet: 'Run AI inference co-located with transactional data on IBM LinuxONE using Triton or Red Hat AI Inference Server via REST and gRPC.', href: root + 'serve-model/serve-model.html' },
  ];

  const input   = wrapper.querySelector('.topbar-search-input');
  const results = wrapper.querySelector('.topbar-search-results');
  const clearBtn = wrapper.querySelector('.topbar-search-clear');

  let focusIdx = -1;
  let currentItems = [];

  function highlight(text, query) {
    if (!query) return escHtml(text);
    const re = new RegExp('(' + escRe(query) + ')', 'gi');
    return escHtml(text).replace(re, '<mark>$1</mark>');
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function escRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function search(query) {
    query = query.trim();
    if (query.length < 2) return [];
    const terms = query.toLowerCase().split(/\s+/);
    const scored = [];
    INDEX.forEach(entry => {
      const haystack = (entry.title + ' ' + entry.section + ' ' + entry.snippet).toLowerCase();
      let score = 0;
      let allMatch = true;
      terms.forEach(term => {
        if (!haystack.includes(term)) { allMatch = false; return; }
        if (entry.title.toLowerCase().includes(term)) score += 10;
        if (entry.section.toLowerCase().includes(term)) score += 4;
        if (entry.snippet.toLowerCase().includes(term)) score += 2;
        if (entry.title.toLowerCase().startsWith(term)) score += 6;
      });
      if (allMatch) scored.push({ entry, score });
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 8).map(s => s.entry);
  }

  function render(matches, query) {
    focusIdx = -1;
    currentItems = matches;
    if (!query || query.trim().length < 2) {
      results.style.display = 'none';
      return;
    }
    results.style.display = 'block';
    if (matches.length === 0) {
      results.innerHTML = `<div class="search-no-results">No results for "<strong>${escHtml(query.trim())}</strong>"</div>`;
      return;
    }
    const q = query.trim();
    results.innerHTML =
      `<div class="search-results-header">${matches.length} result${matches.length > 1 ? 's' : ''}</div>` +
      matches.map((m, i) => `
        <a class="search-result-item" href="${m.href}" data-idx="${i}">
          <div class="search-result-title">${highlight(m.title, q)}</div>
          <div class="search-result-section">${escHtml(m.section)}</div>
          <div class="search-result-snippet">${highlight(m.snippet, q)}</div>
        </a>
      `).join('');
  }

  function moveFocus(dir) {
    const items = results.querySelectorAll('.search-result-item');
    if (!items.length) return;
    items[focusIdx]?.classList.remove('focused');
    focusIdx = (focusIdx + dir + items.length) % items.length;
    const el = items[focusIdx];
    el.classList.add('focused');
    el.scrollIntoView({ block: 'nearest' });
  }

  function clearSearch() {
    input.value = '';
    results.style.display = 'none';
    clearBtn.style.display = 'none';
    focusIdx = -1;
    currentItems = [];
  }

  input.addEventListener('input', () => {
    const q = input.value;
    clearBtn.style.display = q ? 'flex' : 'none';
    render(search(q), q);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); moveFocus(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveFocus(-1); }
    else if (e.key === 'Enter') {
      const focused = results.querySelector('.search-result-item.focused');
      if (focused) { window.location.href = focused.href; }
      else if (currentItems.length) { window.location.href = currentItems[0].href; }
    }
    else if (e.key === 'Escape') { clearSearch(); input.blur(); }
  });

  clearBtn.addEventListener('click', () => { clearSearch(); input.focus(); });

  /* Close dropdown when clicking outside */
  document.addEventListener('click', e => {
    if (!wrapper.contains(e.target)) {
      results.style.display = 'none';
    }
  });

  /* Re-open if input is focused and has value */
  input.addEventListener('focus', () => {
    if (input.value.trim().length >= 2) {
      render(search(input.value), input.value);
    }
  });
}
