// Theme Logic
const themeOptions = document.querySelectorAll('.theme-option');
// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

themeOptions.forEach((option) => {
  option.addEventListener('click', function (e) {
    e.preventDefault();
    const selectedTheme = this.getAttribute('data-theme');

    document.documentElement.setAttribute('data-theme', selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  });
});
// Search Bar Logic
document.addEventListener('click', function (e) {
  const container = document.getElementById('phSearch');
  const trigger = container.querySelector('.ph-search-trigger');
  const input = container.querySelector('.ph-search-input');
  const closeBtn = container.querySelector('.ph-search-close');

  // 1. OPEN SEARCH (Click Magnifying Glass)
  if (trigger.contains(e.target)) {
    container.classList.add('active');
    input.focus();
  }

  // 2. CLOSE SEARCH (Click X Button)
  if (closeBtn && closeBtn.contains(e.target)) {
    e.stopPropagation();
    container.classList.remove('active');
    input.value = '';
  }

  // 3. CLOSE SEARCH (Click Outside)
  if (container.classList.contains('active') && !container.contains(e.target)) {
    container.classList.remove('active');
  }
});
// Jab topbar, sidebar aur sabhi scripts load ho jayein
document.addEventListener('dynamicScriptsLoaded', function () {
  const infoModalElement = document.getElementById('globalInfoModal');

  if (infoModalElement) {
    // Modal open hone se thik pehle trigger hoga
    infoModalElement.addEventListener('show.bs.modal', function () {
      const modalBody = document.getElementById('globalInfoBody');
      const modalTitle = document.getElementById('globalInfoTitle');

      // Current page me hidden info div dhundho
      const hiddenContent = document.getElementById('page-specific-info');

      if (hiddenContent) {
        // 1. Content Copy karo
        modalBody.innerHTML = hiddenContent.innerHTML;

        // 2. Title update karo (agar data attribute set hai)
        const customTitle = hiddenContent.getAttribute('data-modal-title');
        if (customTitle) {
          modalTitle.textContent = customTitle;
        } else {
          modalTitle.textContent = 'Page Guide';
        }
      } else {
        // Agar page par info div nahi banaya hai to default message
        modalTitle.textContent = 'Information';
        modalBody.innerHTML = `
          <div class="text-center py-5 text-muted">
            <i class="bi bi-info-circle display-4 mb-3 d-block opacity-50"></i>
            <h5>No Guide Available</h5>
            <p>Documentation for this page has not been added yet.</p>
          </div>
        `;
      }
    });
  }
});
