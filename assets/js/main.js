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
