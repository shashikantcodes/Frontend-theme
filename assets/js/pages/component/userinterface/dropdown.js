// === GLOBAL: CLICK HANDLER ===
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('.dropdown-toggle-custom');
  const menu = e.target.closest('.custom-menu');
  const tagClose = e.target.closest('.dd-tag-close');

  // Prevent closing when removing tag
  if (tagClose) return;
  // Prevent closing when interacting inside menu (unless it's a selection item)
  if (e.target.closest('input') && menu) return;

  // DROPDOWN 5 SPECIAL CASE (Input Trigger)
  if (trigger && trigger.dataset.target === 'dd-5' && e.target.tagName === 'INPUT') {
    const targetMenu = document.getElementById('dd-5');
    // Close others
    document.querySelectorAll('.custom-menu').forEach((m) => {
      if (m !== targetMenu) m.classList.remove('show');
    });
    targetMenu.classList.add('show'); // Always open on click
    return;
  }

  // STANDARD TOGGLE LOGIC
  if (trigger) {
    const targetId = trigger.getAttribute('data-target');
    const targetMenu = document.getElementById(targetId);

    // Close others
    document.querySelectorAll('.custom-menu').forEach((m) => {
      if (m !== targetMenu) m.classList.remove('show');
    });

    // Toggle current
    targetMenu.classList.toggle('show');

    // Auto-focus search inputs if present
    const searchInput = targetMenu.querySelector('input[autofocus]');
    if (targetMenu.classList.contains('show') && searchInput) {
      setTimeout(() => searchInput.focus(), 100);
    }
  }
  // CLICK OUTSIDE
  else if (!menu) {
    document.querySelectorAll('.custom-menu').forEach((m) => m.classList.remove('show'));
  }
});

// === COMMON: LIST FILTER ===
function filterList(input, itemSelector, textSelector) {
  const val = input.value.toLowerCase();
  let container = input.closest('.custom-menu');

  // Handle Dropdown 5 (Input outside menu)
  if (!container) {
    const trigger = input.closest('.dropdown-toggle-custom');
    if (trigger) {
      const targetId = trigger.getAttribute('data-target');
      container = document.getElementById(targetId);
    }
  }

  if (!container) return;

  container.querySelectorAll(itemSelector).forEach((item) => {
    const text = item.querySelector(textSelector).innerText.toLowerCase();
    item.style.display = text.includes(val) ? 'flex' : 'none';
  });
}

// === DROPDOWN 1: RADIO LOGIC ===
function toggleRadio(el) {
  const container = el.closest('.border-top');
  container.querySelectorAll('.menu-item').forEach((i) => i.classList.remove('active'));
  el.classList.add('active');
}

// === DROPDOWN 3: TEAM SELECT ===
function selectTeam(el, color, name) {
  const container = el.closest('.custom-menu');
  container.querySelectorAll('.dd-team-item').forEach((i) => {
    i.classList.remove('active');
    if (i.querySelector('.bi-check')) i.querySelector('.bi-check').remove();
  });
  el.classList.add('active');
  const check = document.createElement('i');
  check.className = 'bi bi-check ms-auto fs-7 text-primary';
  el.appendChild(check);

  document.getElementById('team-active-dot').style.background = color;
  document.getElementById('team-active-text').innerText = name;
  container.classList.remove('show');
}

// === DROPDOWN 4: TABS ===
function switchTab(el, targetId) {
  const container = el.closest('.custom-menu');
  container.querySelectorAll('.dd-nav-link').forEach((l) => l.classList.remove('active'));
  el.classList.add('active');
  container.querySelectorAll('.tab-content').forEach((c) => c.classList.add('d-none'));
  document.getElementById(targetId).classList.remove('d-none');
}

// === DROPDOWN 6: FILTER SELECT ===
function selectFilter(el, text, icon, colorClass) {
  el.parentElement.querySelectorAll('.menu-item').forEach((i) => i.classList.remove('active'));
  el.classList.add('active');
  const btn = document.getElementById('filter-btn');
  btn.innerHTML = `<div class="d-flex align-items-center gap-2 ${colorClass} fs-7"><i class="bi ${icon}"></i> <span>${text}</span></div><i class="bi bi-chevron-down fs-8 text-light-theme"></i>`;
  el.parentElement.classList.remove('show');
}

// === DROPDOWN 7: SIMPLE MULTI ===
function toggleSimpleMulti(el) {
  el.classList.toggle('active');
  const count = el.parentElement.querySelectorAll('.active').length;
  document.getElementById('simple-multi-label').innerText = count + ' Selected';
}

// === DROPDOWN 8: COUNTRY SELECT ===
function selectCountry(el, flag, code) {
  el.parentElement.querySelectorAll('.dd-country-item').forEach((i) => {
    i.classList.remove('active');
    if (i.querySelector('.bi-check')) i.querySelector('.bi-check').remove();
  });
  el.classList.add('active');
  const check = document.createElement('i');
  check.className = 'bi bi-check text-primary';
  el.appendChild(check);

  document.getElementById('selected-flag').innerText = flag;
  document.getElementById('selected-code').innerText = code;
  el.closest('.custom-menu').classList.remove('show');
}

// === DROPDOWN 10: ADVANCED MULTI (TAGS) ===
// Initial Render
renderAdvTags();

function toggleCheckAdv(el) {
  el.classList.toggle('active');
  renderAdvTags();
}

function toggleSelectAllAdv(el) {
  const items = document.getElementById('adv-list').querySelectorAll('.dd-multi-item');
  const allActive = Array.from(items).every((i) => i.classList.contains('active'));
  items.forEach((i) => {
    if (allActive) i.classList.remove('active');
    else i.classList.add('active');
  });
  renderAdvTags();
}

function renderAdvTags() {
  const container = document.getElementById('adv-tags');
  const items = document.querySelectorAll('#adv-list .dd-multi-item.active');
  container.innerHTML = '';

  if (items.length === 0) {
    container.innerHTML =
      '<span class="text-light-theme fs-8" id="adv-placeholder">Select countries...</span>';
    return;
  }

  items.forEach((item) => {
    const val = item.getAttribute('data-value');
    const tag = document.createElement('div');
    tag.className = 'dd-tag-chip';
    tag.innerHTML = `<span>${val}</span> <i class="bi bi-x dd-tag-close" onclick="removeAdvTag(event, '${val}')"></i>`;
    container.appendChild(tag);
  });
}

function removeAdvTag(e, val) {
  e.stopPropagation(); // Stop dropdown toggle
  const item = document.querySelector(`#adv-list .dd-multi-item[data-value="${val}"]`);
  if (item) {
    item.classList.remove('active');
    renderAdvTags();
  }
}
