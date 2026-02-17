/* ==========================================================================
   SECTION A: CORE DASHBOARD LOGIC
   --------------------------------------------------------------------------
   Contains sidebar toggles, submenu accordion, and active state management.
   ========================================================================== */

function executeDashboardLogic() {
  console.log('✅ UI Logic Initialized...');

  // 1. Sidebar Toggle (Desktop)
  $('#toggle-sidebar-desktop').on('click', function () {
    $('body').toggleClass('sidebar-is-collapsed');
    $('#sidebar').toggleClass('collapsed');
    $('#main-wrapper').toggleClass('expanded');

    if ($('#sidebar').hasClass('collapsed')) {
      $('.submenu').slideUp(0);
      $('.has-submenu').removeClass('open');
      // Clear active child indicators when collapsed
      $('.has-active-child').removeClass('has-active-child');
    } else {
      // Re-apply active child indicators when expanded
      var currentPage = window.location.pathname.split('/').pop().split('.html')[0];
      if (currentPage) {
        var activeLink = $('#sidebar a[href*="' + currentPage + '"]');
        if (activeLink.length > 0) {
          activeLink.closest('.has-submenu').addClass('has-active-child');
        }
      }
    }
  });

  // 2. Sidebar Toggle (Mobile)
  $('#toggle-sidebar-mobile').on('click', function () {
    $('#sidebar').toggleClass('mobile-show');
  });

  $('#close-mobile').on('click', function () {
    $('#sidebar').removeClass('mobile-show');
  });

  // 3. Smart Submenu (Accordion Behavior)
  $('.toggle-submenu').on('click', function (e) {
    if ($('#sidebar').hasClass('collapsed')) {
      $('#sidebar').removeClass('collapsed');
      $('#main-wrapper').removeClass('expanded');
      $('body').removeClass('sidebar-is-collapsed');
    }

    e.preventDefault();
    e.stopPropagation();

    const parent = $(this).parent();
    const submenu = $(this).next('.submenu');

    if (submenu.length > 0) {
      if (submenu.is(':visible')) {
        submenu.slideUp(250);
        parent.removeClass('open');
      } else {
        // Close other submenus (Accordion Effect)
        parent.siblings('.has-submenu').find('> .submenu').slideUp(250);
        parent.siblings('.has-submenu').removeClass('open');
        submenu.slideDown(250);
        parent.addClass('open');
      }
    }

    // Visual active state for toggles only (do NOT clear leaf link active state)
    $('.toggle-submenu').removeClass('active');
    $(this).addClass('active');
  });
  $('.nav-link')
    .not('.toggle-submenu')
    .on('click', function (e) {
      // Check if it's a page link (not #)
      var href = $(this).attr('href');

      if (href && href !== '#' && href !== 'javascript:void(0)') {
        // For relative paths, construct absolute path from root
        if (!href.startsWith('http') && !href.startsWith('/')) {
          var absolutePath = '/' + href;
          window.location.href = absolutePath;
          return false;
        }

        // Let the navigation work normally for absolute paths
        return true;
      }

      // 1. Purane sabhi active links ko reset karein
      $('.nav-link').removeClass('active');

      // 2. Jispar click kiya usko Active karein
      $(this).addClass('active');

      // 3. Ensure karein ki Parent Folders khule rahein
      // (Taaki click karne par menu band na ho jaye)
      $(this).closest('.has-submenu').addClass('open');
      $(this).parents('.has-submenu').addClass('open');

      e.preventDefault();
    });
  /* ----------------------------------------------------------------------
       4. ACTIVE LINK MANAGER (Theme-Friendly)
       ----------------------------------------------------------------------
       - Sets `.active` only on the real page link (leaf)
       - Opens all parent menus so the user can see where they are
       - Avoids setting `.active` on parent toggles (prevents dot/arrow glitches)
    */
  $('.nav-link').removeClass('active');
  $('.has-submenu').removeClass('open');
  $('.submenu').slideUp(0);

  var cleanPath = window.location.pathname.replace(/^\/+/, '');
  var fileName = cleanPath.split('/').pop() || 'index.html';

  var activeLink = $('#sidebar a[href="' + cleanPath + '"]');
  if (activeLink.length === 0) {
    activeLink = $('#sidebar a[href$="/' + fileName + '"]');
  }
  if (activeLink.length === 0) {
    activeLink = $('#sidebar a[href$="' + fileName + '"]');
  }

  if (activeLink.length > 0) {
    activeLink.addClass('active');

    // Open all parent menus and show their submenu lists
    activeLink.parents('.has-submenu').each(function () {
      $(this).addClass('open');
      $(this).children('.submenu').slideDown(0);
    });
  }

  /* ----------------------------------------------------------------------
       FUTURE LARAVEL VERSION (Commented Out)
    ---------------------------------------------------------------------- */
  /*
    var currentUrl = window.location.href; // Get Full URL

    $('#sidebar a.nav-link').each(function() {
        var linkUrl = this.href;

        // Logic: Exact match OR if current URL contains this link (for nested pages)
        // Example: if link is '/students' and current is '/students/create', it matches.
        if (currentUrl === linkUrl || (currentUrl.startsWith(linkUrl) && linkUrl !== window.location.origin + '/')) {
            
            $(this).addClass('active');

            // Open Parent Submenu
            $(this).closest('.submenu').slideDown(0);
            $(this).closest('.has-submenu').addClass('open');
            $(this).closest('.has-submenu').find('> .nav-link').addClass('active');
        }
    });
    */
}

/* ==========================================================================
   SECTION B: HTML COMPONENT LOADER (Delete for Laravel)
   --------------------------------------------------------------------------
This code is now for static HTML files only.
   ========================================================================== */

// 1. Component Fetcher
async function loadComponent(id, file) {
  try {
    const response = await fetch(file);
    const data = await response.text();
    document.getElementById(id).innerHTML = data;
  } catch (err) {
    console.error('Error loading ' + file, err);
  }
}

// 2. Script Loader (jQuery & Bootstrap)
function loadScriptsAndRun() {
  // Determine base path for script loading
  const currentPath = window.location.pathname;
  let basePath = '';

  if (currentPath.includes('/pages/')) {
    const depth = currentPath.split('/').filter((segment) => segment).length;
    basePath = '../'.repeat(depth - 1);
  }

  fetch(basePath + 'components/scripts.html')
    .then((response) => response.text())
    .then((html) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const scripts = Array.from(tempDiv.querySelectorAll('script'));

      let loadedScripts = 0;

      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        // Adjust script src paths if needed
        let scriptSrc = oldScript.src;
        if (scriptSrc && !scriptSrc.startsWith('http') && basePath) {
          scriptSrc = basePath + scriptSrc;
        }
        newScript.src = scriptSrc;
        newScript.onload = () => {
          loadedScripts++;

          if (loadedScripts === scripts.length) {
            executeDashboardLogic();
          }
        };
        document.body.appendChild(newScript);
      });
    });
}

document.addEventListener('DOMContentLoaded', function () {
  // Determine the current path depth to adjust component paths
  const currentPath = window.location.pathname;
  let basePath = '';

  // Adjust base path according to folder depth
  if (currentPath.includes('/pages/')) {
    const depth = currentPath.split('/').filter((segment) => segment).length;
    basePath = '../'.repeat(depth - 1);
  }

  fetch(basePath + 'components/head-resources.html')
    .then((res) => res.text())
    .then((css) => {
      // Fix CSS paths in the loaded content
      let fixedCss = css;
      if (basePath) {
        fixedCss = css.replace(/href="assets\//g, `href="${basePath}assets/`);
        fixedCss = fixedCss.replace(/href="\/assets\//g, `href="${basePath}assets/`);
      }
      document.head.insertAdjacentHTML('beforeend', fixedCss);
    });

  Promise.all([
    loadComponent('sidebar-container', basePath + 'components/sidebar.html'),
    loadComponent('topbar-container', basePath + 'components/topbar.html'),
  ]).then(() => {
    loadScriptsAndRun();
  });
});
