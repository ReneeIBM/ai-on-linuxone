/* ─────────────────────────────────────────────────────────────
   nav.js  —  Shared navigation renderer for AI on IBM Z site
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
    { id: 'prepare-data',   label: 'Prepare Data',   href: p + 'prepare-data/prepare-data.html',       tools: [] },
    { id: 'train-model',    label: 'Train Model',    href: p + 'train-model/train-model.html',         tools: [] },
    { id: 'deploy-models',  label: 'Deploy Models',  href: p + 'deploy-models/deploy-models.html',     tools: [] },
    { id: 'serve-model',    label: 'Serve Model',    href: p + 'serve-model/serve-model.html',         tools: [] },
    { id: 'ai-governance',  label: 'AI Governance',  href: p + 'ai-governance/ai-governance.html',     tools: [] },
  ];

  /* ── Product categories with their tool sub-items ───────────── */
  const productsCategoryItems = [
    {
      id: 'data-analytics', label: 'Data & Analytics',
      href: p + 'products-tools/data-analytics.html',
      tools: [
        { label: 'IBM Z Platform for Apache Spark', href: p + 'products-tools/data-analytics.html#apache-spark' },
        { label: 'IBM SQL Data Insights Pro',        href: p + 'products-tools/data-analytics.html#sql-data-insights' },
        { label: 'IBM Synthetic Data Sets',          href: p + 'products-tools/data-analytics.html#synthetic-data-sets' },
      ]
    },
    {
      id: 'ai-frameworks', label: 'AI Frameworks & Dev Tools',
      href: p + 'products-tools/ai-frameworks.html',
      tools: [
        { label: 'AI Toolkit for IBM Z and LinuxONE',   href: p + 'products-tools/ai-frameworks.html#ai-toolkit' },
        { label: 'IBM Z Accelerated SnapML',            href: p + 'products-tools/ai-frameworks.html#snapml' },
        { label: 'IBM Z Accelerated for TensorFlow',    href: p + 'products-tools/ai-frameworks.html#tensorflow' },
        { label: 'IBM Z Accelerated for PyTorch',       href: p + 'products-tools/ai-frameworks.html#pytorch' },
        { label: 'Python AI Toolkit for z/OS',          href: p + 'products-tools/ai-frameworks.html#python-ai-toolkit' },
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
        { label: 'IBM Z Accelerated Serving for TensorFlow', href: p + 'products-tools/inference-serving.html#tf-serving' },
        { label: 'IBM Z Accelerated for Triton',             href: p + 'products-tools/inference-serving.html#triton' },
        { label: 'Red Hat AI Inference Server',              href: p + 'products-tools/inference-serving.html#rh-inference' },
      ]
    },
    {
      id: 'ai-platforms', label: 'AI Platforms',
      href: p + 'products-tools/ai-platforms.html',
      tools: [
        { label: 'Machine Learning for IBM z/OS',       href: p + 'products-tools/ai-platforms.html#mlz' },
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
        { label: 'IBM Integrated Accelerator for AI (Telum)', href: p + 'products-tools/hardware-solutions.html#telum' },
        { label: 'IBM Spyre Accelerator',                     href: p + 'products-tools/hardware-solutions.html#spyre' },
      ]
    },
  ];

  const helpItems = [
    { id: 'terminology',        label: 'Terminology',          href: p + 'getting-help/terminology.html#terminology' },
    { id: 'resources-contacts', label: 'Resources & Contacts', href: p + 'getting-help/terminology.html#resources-contacts' },
  ];

  const useCasesItems = [
    { id: 'ai-solution-patterns',  label: 'AI Solution Patterns',  href: p + 'use-cases/use-cases.html#ai-solution-patterns' },
    { id: 'ai-solution-template',  label: 'AI Solution Blueprint',  href: p + 'use-cases/ai-solution-template.html' },
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
        id: 'overview', label: 'Overview',
        href: p + 'overview/overview.html',
        dropdown: null,
      },
      {
        id: 'use-cases', label: 'Use Cases',
        href: p + 'use-cases/use-cases.html',
        dropdown: dropdown('Use Cases', useCasesItems, top === 'use-cases' ? sub : null),
      },
      {
        id: 'lifecycle', label: 'AI Lifecycle',
        href: p + 'prepare-data/prepare-data.html',
        dropdown: flyoutDropdown('AI Lifecycle', lifecycleItems, sub),
      },
      {
        id: 'products', label: 'Products & Tools',
        href: p + 'products-tools/data-analytics.html',
        dropdown: flyoutDropdown('Products & Tools', productsCategoryItems, sub),
      },
      {
        id: 'generative-ai', label: 'Generative AI',
        href: p + 'generative-ai/generative-ai.html',
        dropdown: null,
      },
      {
        id: 'agentic-ai', label: 'Agentic AI',
        href: p + 'agentic-ai/agentic-ai.html',
        dropdown: null,
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
        <a href="${item.href}" class="topnav-link${isActive ? ' active' : ''}">${item.label}${caret}</a>
        ${item.dropdown || ''}
      </div>`;
    }).join('');

    /* ── Inject search bar after the nav items ── */
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
  }

  /* ── 2. Sub-nav bar (lifecycle OR products) ──────────────── */
  const lifecycleEl = document.getElementById('lifecycle-nav');
  if (lifecycleEl) {
    if (top === 'lifecycle') {
      lifecycleEl.style.display = '';
      lifecycleEl.innerHTML = lifecycleItems.map(l =>
        `<a href="${l.href}" class="lifecycle-link${sub === l.id ? ' active' : ''}">${l.label}</a>`
      ).join('');
      document.body.classList.add('has-lifecycle');
      document.body.classList.remove('no-lifecycle');
    } else if (top === 'products') {
      lifecycleEl.style.display = '';
      lifecycleEl.innerHTML = productsCategoryItems.map(l =>
        `<a href="${l.href}" class="lifecycle-link${sub === l.id ? ' active' : ''}">${l.label}</a>`
      ).join('');
      document.body.classList.add('has-lifecycle');
      document.body.classList.remove('no-lifecycle');
    } else {
      lifecycleEl.style.display = 'none';
      document.body.classList.add('no-lifecycle');
      document.body.classList.remove('has-lifecycle');
    }
  }

  /* ── 3. Right page-nav ───────────────────────────────────── */
  const navItems = opts.pageNavItems || [];
  const pagenavEl = document.getElementById('pagenav');
  if (pagenavEl && navItems.length) {
    const hasSubnav = top === 'lifecycle' || top === 'products';
    pagenavEl.style.top = hasSubnav
      ? 'calc(var(--topbar-height) + var(--lifecycle-height))'
      : 'var(--topbar-height)';

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
    /* Overview */
    { title: 'What is AI on IBM Z?', section: 'Overview', snippet: 'IBM Z combines hardware acceleration, open-source AI frameworks, and a complete software stack to run AI workloads co-located with critical business data.', href: root + 'overview/overview.html' },
    { title: 'Why Run AI on IBM Z?', section: 'Overview', snippet: 'Co-location with data eliminates latency, reduces risk, and enables real-time AI scoring within existing transaction systems.', href: root + 'overview/overview.html#why-z' },
    { title: 'AI on Z Entry Points', section: 'Overview', snippet: 'Three entry points: z/OS with MLz, Linux on Z with open-source frameworks, and Red Hat OpenShift AI on IBM Z.', href: root + 'overview/overview.html#entry-points' },
    { title: 'AI Lifecycle on IBM Z', section: 'Overview', snippet: 'Prepare data, train, optimize, deploy, serve, and govern AI models — all on IBM Z infrastructure.', href: root + 'overview/overview.html#ai-lifecycle' },

    /* Prepare Data */
    { title: 'Prepare Data', section: 'AI Lifecycle', snippet: 'Synthetic data generation, feature engineering, and Apache Spark on IBM Z for data preparation.', href: root + 'prepare-data/prepare-data.html' },
    { title: 'IBM SQL Data Insights Pro', section: 'Products & Tools', snippet: 'AI-powered semantic search and similarity queries inside Db2 for z/OS using standard SQL and Telum on-chip inference — no data movement required.', href: root + 'products-tools/sql-data-insights.html' },
    { title: 'IBM Synthetic Data Sets', section: 'Prepare Data', snippet: 'Generate realistic, privacy-safe labeled datasets for training AI models on IBM Z.', href: root + 'products-tools/data-analytics.html#synthetic-data-sets' },
    { title: 'IBM Z Platform for Apache Spark', section: 'Prepare Data', snippet: 'Run Apache Spark workloads natively on IBM Z for scalable data processing and feature engineering.', href: root + 'products-tools/data-analytics.html#apache-spark' },
    { title: 'Python AI Toolkit for z/OS', section: 'Prepare Data', snippet: 'A curated set of Python AI/ML packages — NumPy, Pandas, Scikit-learn — optimized for z/OS.', href: root + 'products-tools/ai-frameworks.html#python-ai-toolkit' },

    /* Train Model */
    { title: 'Train Model', section: 'AI Lifecycle', snippet: 'Traditional ML, deep learning, and hardware-accelerated training on IBM Z using SnapML, TensorFlow, PyTorch.', href: root + 'train-model/train-model.html' },
    { title: 'IBM Z Accelerated SnapML', section: 'Train Model', snippet: 'Accelerated Snap ML leverages the Telum on-chip AI accelerator for fast classical ML training on IBM Z.', href: root + 'products-tools/ai-frameworks.html#snapml' },
    { title: 'IBM Z Accelerated for TensorFlow', section: 'Train Model', snippet: 'TensorFlow optimized for IBM Z with hardware acceleration via the Telum AI accelerator.', href: root + 'products-tools/ai-frameworks.html#tensorflow' },
    { title: 'IBM Z Accelerated for PyTorch', section: 'Train Model', snippet: 'PyTorch optimized for s390x, enabling deep learning model training on IBM Z and LinuxONE.', href: root + 'products-tools/ai-frameworks.html#pytorch' },
    { title: 'Machine Learning for IBM z/OS (MLz)', section: 'Train Model', snippet: 'IBM MLz provides a full lifecycle platform for building, deploying, and scoring AI models on z/OS.', href: root + 'products-tools/ai-platforms.html#mlz' },
    { title: 'Red Hat OpenShift AI', section: 'Train Model', snippet: 'MLOps platform on Red Hat OpenShift running on IBM Z and LinuxONE for containerized AI workloads.', href: root + 'products-tools/ai-platforms.html#rhoai' },

    /* Deploy Models (includes optimize & deploy) */
    { title: 'ONNX & IBM Z Deep Learning Compiler', section: 'Deploy Models', snippet: 'Convert and compile models to ONNX format; use zDLC to optimize neural networks for IBM Z hardware.', href: root + 'products-tools/model-formats.html#zdlc' },
    { title: 'AI Optimizer for IBM Z and LinuxONE', section: 'Deploy Models', snippet: 'Quantize and compress AI models to improve inference throughput on IBM Z hardware.', href: root + 'products-tools/ai-platforms.html#ai-optimizer' },

    /* Model Formats & Compilers */
    { title: 'Model Formats & Compilers', section: 'Products & Tools', snippet: 'ONNX and PMML model interchange formats plus the IBM Z Deep Learning Compiler for Telum-accelerated inference.', href: root + 'products-tools/model-formats.html' },
    { title: 'ONNX Model Format', section: 'Model Formats & Compilers', snippet: 'Export TensorFlow, PyTorch, or scikit-learn models to ONNX for portable deployment on IBM Z and LinuxONE.', href: root + 'products-tools/model-formats.html#onnx' },
    { title: 'PMML Model Format', section: 'Model Formats & Compilers', snippet: 'Convert scikit-learn, XGBoost, or LightGBM models to PMML for deployment via MLz and IBM Snap ML on IBM Z.', href: root + 'products-tools/model-formats.html#pmml' },
    { title: 'IBM Z Deep Learning Compiler (zDLC)', section: 'Model Formats & Compilers', snippet: 'Compile ONNX models to optimized s390x binaries with automatic Telum AI accelerator offloading via zDNN.', href: root + 'products-tools/model-formats.html#zdlc' },

    /* Deploy Models */
    { title: 'Deploy Models', section: 'AI Lifecycle', snippet: 'Deploy AI models on z/OS with MLz, on OpenShift with RHOAI, or to watsonx.ai on IBM Z.', href: root + 'deploy-models/deploy-models.html' },
    { title: 'watsonx.ai on IBM Z', section: 'Deploy Models', snippet: 'Run IBM watsonx.ai workloads on IBM Z infrastructure for enterprise-grade AI deployment.', href: root + 'products-tools/ai-platforms.html#watsonx-ai' },

    /* Serve Model */
    { title: 'Serve Models', section: 'AI Lifecycle', snippet: 'Triton Inference Server, TensorFlow Serving, MLz, and Red Hat AI Inference Server on IBM Z.', href: root + 'serve-model/serve-model.html' },
    { title: 'IBM Z Accelerated Serving for TensorFlow', section: 'Serve Model', snippet: 'High-performance TensorFlow Model Serving accelerated by IBM Z hardware for production inference.', href: root + 'products-tools/inference-serving.html#tf-serving' },
    { title: 'IBM Z Accelerated for Triton', section: 'Serve Model', snippet: 'NVIDIA Triton Inference Server optimized for IBM Z and LinuxONE for containerized model serving.', href: root + 'products-tools/inference-serving.html#triton' },
    { title: 'Red Hat AI Inference Server', section: 'Serve Model', snippet: 'Serve large language models and GenAI workloads on IBM Z using the Red Hat AI Inference Server with vLLM.', href: root + 'products-tools/inference-serving.html#rh-inference' },

    /* AI Governance */
    { title: 'AI Governance', section: 'AI Lifecycle', snippet: 'Monitor, explain, and govern AI models with watsonx.governance and MLz on IBM Z.', href: root + 'ai-governance/ai-governance.html' },
    { title: 'watsonx.governance', section: 'AI Governance', snippet: 'Track model risk, detect drift, and ensure regulatory compliance with IBM watsonx.governance on Z.', href: root + 'products-tools/ai-platforms.html#watsonx-governance' },

    /* Hardware */
    { title: 'Hardware Solutions', section: 'Products & Tools', snippet: 'IBM Z hardware for AI: Telum on-chip accelerator and IBM Spyre Accelerator for generative AI.', href: root + 'products-tools/hardware-solutions.html' },
    { title: 'IBM Integrated Accelerator for AI (Telum)', section: 'Hardware', snippet: 'Telum is an on-chip AI accelerator built into IBM z16 and z17 processors for low-latency transactional AI inference.', href: root + 'products-tools/hardware-solutions.html#telum' },
    { title: 'IBM Spyre Accelerator', section: 'Hardware', snippet: 'The IBM Spyre Accelerator on IBM z17 enables high-throughput generative AI and large model inference.', href: root + 'products-tools/hardware-solutions.html#spyre' },

    /* AI Frameworks */
    { title: 'AI Toolkit for IBM Z and LinuxONE', section: 'Products & Tools', snippet: 'A collection of open-source AI frameworks — TensorFlow, PyTorch, SnapML, ONNX — optimized for s390x.', href: root + 'products-tools/ai-frameworks.html#ai-toolkit' },

    /* Use Cases */
    { title: 'AI Solution Patterns', section: 'Use Cases', snippet: 'Common AI solution patterns on IBM Z including real-time scoring, batch inference, and hybrid cloud.', href: root + 'use-cases/use-cases.html#ai-solution-patterns' },
    { title: 'AI Solution Blueprints', section: 'Use Cases', snippet: 'Pre-built blueprints that walk you through the full AI lifecycle on IBM Z with working code.', href: root + 'use-cases/ai-solution-template.html' },
    { title: 'Advanced Credit Card Fraud Detection', section: 'Solution Blueprints', snippet: 'Multi-model ensemble AI on IBM z17 — XGBoost + BERT deployed with MLz for real-time fraud scoring.', href: root + 'use-cases/ai-solution-template.html#fraud-detection-tis' },
    { title: 'Fraud Detection on IBM Z', section: 'Solution Blueprints', snippet: 'Deploy an AI fraud detection model using open-source frameworks and Machine Learning for IBM z/OS.', href: root + 'use-cases/ai-solution-template.html#fraud-detection' },
    { title: 'Document Intelligence with Spyre', section: 'Solution Blueprints · Generative AI', snippet: 'IBM Granite LLM inference on Red Hat AI Inference Server, leveraging the IBM Spyre Accelerator on IBM Z.', href: root + 'use-cases/ai-solution-template.html#generative-ai' },
    { title: 'Credit Risk Assessment on IBM Z', section: 'Solution Blueprints', snippet: 'Build and deploy a credit risk scoring model using open-source frameworks and MLz with real-time scoring.', href: root + 'use-cases/ai-solution-template.html#credit-risk' },
    { title: 'Health Insurance Claims on IBM Z', section: 'Solution Blueprints', snippet: 'AI model for health insurance claims processing using MLz, deployed for real-time scoring on z/OS.', href: root + 'use-cases/ai-solution-template.html#health-insurance' },
    { title: 'Data Preprocessing on IBM Z', section: 'Solution Blueprints', snippet: 'Build an AI solution with a preprocessing pipeline using open-source frameworks and MLz on IBM Z.', href: root + 'use-cases/ai-solution-template.html#data-preprocessing' },
    { title: 'Anti-Money Laundering on IBM Z', section: 'Solution Blueprints', snippet: 'AML detection model using open-source frameworks and MLz for real-time transaction monitoring.', href: root + 'use-cases/ai-solution-template.html#anti-money-laundering' },

    /* Getting Help */
    { title: 'Terminology & Glossary', section: 'Getting Help', snippet: 'Key terms and definitions for AI on IBM Z: MLz, PMML, ONNX, Telum, Spyre, zDLC, and more.', href: root + 'getting-help/terminology.html#terminology' },
    { title: 'Resources & Contacts', section: 'Getting Help', snippet: 'Links to documentation, GitHub repos, community contacts, and how to reach the AI on Z team.', href: root + 'getting-help/terminology.html#resources-contacts' },

    /* XGBoost / BERT / MLz specific terms */
    { title: 'XGBoost on IBM Z', section: 'AI Frameworks', snippet: 'XGBoost is supported via the Python AI Toolkit and MLz — export models as PMML for z/OS deployment.', href: root + 'products-tools/ai-frameworks.html' },
    { title: 'BERT / Transformer Models on IBM Z', section: 'AI Frameworks', snippet: 'Fine-tune BERT-base with PyTorch on IBM Z, export as ONNX, and deploy via MLz scoring endpoints.', href: root + 'products-tools/ai-frameworks.html#pytorch' },
    { title: 'PMML Deployment with MLz', section: 'Deploy Models', snippet: 'Export scikit-learn or XGBoost models as PMML and deploy to Machine Learning for IBM z/OS.', href: root + 'deploy-models/deploy-models.html' },
    { title: 'CICS Scoring Endpoint', section: 'Deploy Models', snippet: 'Expose MLz-deployed models as CICS or REST scoring endpoints for z/OS transaction applications.', href: root + 'deploy-models/deploy-models.html' },
    { title: 'IBM z17', section: 'Hardware', snippet: 'IBM z17 is the latest IBM Z mainframe featuring Telum II AI accelerator and IBM Spyre Accelerator support.', href: root + 'products-tools/hardware-solutions.html' },
    { title: 'Telum II AI Accelerator', section: 'Hardware', snippet: 'Telum II is the second-generation on-chip AI accelerator in IBM z17, with improved inference throughput.', href: root + 'products-tools/hardware-solutions.html#telum' },
    { title: 'Ensemble AI on IBM Z', section: 'Solution Blueprints', snippet: 'Combine XGBoost and BERT in an ensemble pipeline — fast model screens first, deep model refines uncertain predictions.', href: root + 'use-cases/ai-solution-template.html#fraud-detection-tis' },
    { title: 'Real-Time AI Inference on z/OS', section: 'AI Lifecycle', snippet: 'Run AI inference co-located with transactional data on z/OS using MLz CICS or REST scoring.', href: root + 'serve-model/serve-model.html' },
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
