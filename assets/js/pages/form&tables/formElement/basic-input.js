document.addEventListener('DOMContentLoaded', function () {
  // Initialize all independent modules
  initPasswordToggle();
  initClearableInput();
  initDragAndDrop();
  initRangeLiveSystem();
  initOTP();
  initTagsInput();
  initCharacterCounter();
  initAutoResizeTextarea();
  initCopyToClipboard();
  initDebouncedSearch();
  initPasswordStrength();
  initValidationDemo();
  initIndeterminateCheckboxes();
  initSelectAllCheckboxes();
  initIconSwitches();
  initAsyncLoadingSwitches();
  initConfirmationSwitches();
  initLiveStatusSwitches();
  initRadioBehaviorSwitches();
  initSwitchCounters();
  initApiControlledSwitches();
  initCountryCodeDropdown();
  initLiveSearchDropdown();
  initDynamicLoadingSpinner();
  initVerificationTimer();
  initDynamicStatusBadge();
  initExpandableGroups();
  initDynamicFields();
  initStepBasedInput();
  initCharacterLimitProgress();
  initDualActionInput();
  initPasswordGenerator();
  initCurrencyConverter();
  initDebouncedApiSearch();
  initValidationIcon();
  initTaggableGroup();
  initTooltips();
});

/* ==========================================
       1. PASSWORD TOGGLE SYSTEM
    ========================================== */
function initPasswordToggle() {
  document.querySelectorAll('.js-password-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('bi-eye', 'bi-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
      }
    });
  });
}

/* ==========================================
       2. CLEARABLE INPUT FUNCTIONALITY
    ========================================== */
function initClearableInput() {
  document.querySelectorAll('.js-clear-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      input.value = '';
      input.focus();
    });
  });
}

/* ==========================================
       3. DRAG & DROP UPLOAD
    ========================================== */
function initDragAndDrop() {
  document.querySelectorAll('.js-drop-zone').forEach((zone) => {
    const input = zone.querySelector('.js-drop-input');
    const fileNameDisplay = zone.querySelector('.js-drop-file-name');

    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('dragover');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('dragover');
      if (e.dataTransfer.files.length) {
        input.files = e.dataTransfer.files;
        updateFileName();
      }
    });
    zone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        input.click();
      }
    });
    input.addEventListener('change', updateFileName);

    function updateFileName() {
      if (input.files && input.files[0]) {
        fileNameDisplay.textContent = `Selected file: ${input.files[0].name}`;
      }
    }
  });
}

/* ==========================================
       4. RANGE LIVE VALUE DISPLAY SYSTEM
    ========================================== */
function initRangeLiveSystem() {
  document.querySelectorAll('.js-range-live').forEach((range) => {
    const wrapper = range.closest('.range-wrapper');
    if (!wrapper) return;
    const valueDisplay = wrapper.querySelector('.js-range-value');
    if (!valueDisplay) return;

    range.addEventListener('input', function () {
      valueDisplay.textContent = this.value;
    });
  });
}

/* ==========================================
       5. OTP AUTO FOCUS SYSTEM
    ========================================== */
function initOTP() {
  document.querySelectorAll('.js-otp-container').forEach((container) => {
    const inputs = container.querySelectorAll('.otp-input');
    inputs.forEach((input, index) => {
      input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Numeric only
        if (e.target.value !== '' && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value === '' && index > 0) {
          inputs[index - 1].focus();
        }
      });
    });
  });
}

/* ==========================================
       6. TAGS INPUT SYSTEM
    ========================================== */
function initTagsInput() {
  document.querySelectorAll('.js-tags-wrapper:not(.js-tag-group-container)').forEach((wrap) => {
    const input = wrap.querySelector('.js-tags-input');
    if (!input) return;
    const tags = [];

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const val = input.value.trim().replace(',', '');
        if (val && !tags.includes(val)) {
          tags.push(val);
          renderTags();
          input.value = '';
        }
      } else if (e.key === 'Backspace' && input.value === '' && tags.length > 0) {
        tags.pop();
        renderTags();
      }
    });

    wrap.addEventListener('click', () => input.focus());

    function renderTags() {
      wrap.querySelectorAll('.tag-badge').forEach((b) => b.remove());
      tags.forEach((tag, idx) => {
        const badge = document.createElement('span');
        badge.className = 'tag-badge';
        badge.innerHTML = `${tag} <i class="bi bi-x tag-remove" data-idx="${idx}" tabindex="0" role="button" aria-label="Remove tag"></i>`;
        wrap.insertBefore(badge, input);
      });

      wrap.querySelectorAll('.tag-remove').forEach((btn) => {
        const removeAction = (e) => {
          const idx = e.target.getAttribute('data-idx');
          tags.splice(idx, 1);
          renderTags();
        };
        btn.addEventListener('click', removeAction);
        btn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') removeAction(e);
        });
      });
    }
  });
}

/* ==========================================
       7. CHARACTER COUNTER TEXTAREA
    ========================================== */
function initCharacterCounter() {
  document.querySelectorAll('.js-char-textarea').forEach((ta) => {
    const counter = ta.previousElementSibling?.querySelector('.js-char-counter');
    if (!counter) return;
    const max = ta.getAttribute('maxlength');
    ta.addEventListener('input', () => {
      counter.textContent = `${ta.value.length} / ${max}`;
    });
  });
}

/* ==========================================
       8. AUTO RESIZE TEXTAREA
    ========================================== */
function initAutoResizeTextarea() {
  document.querySelectorAll('.js-autoresize-textarea').forEach((ta) => {
    ta.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
  });
}

/* ==========================================
       9. COPY TO CLIPBOARD INPUT
    ========================================== */
function initCopyToClipboard() {
  document.querySelectorAll('.js-copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      const feedback = btn.parentElement.nextElementSibling;

      input.select();
      document.execCommand('copy');

      feedback.classList.remove('d-none');
      setTimeout(() => feedback.classList.add('d-none'), 2000);
    });
  });
}

/* ==========================================
       10. DEBOUNCED SEARCH INPUT
    ========================================== */
function initDebouncedSearch() {
  document.querySelectorAll('.js-debounce-input').forEach((input) => {
    const feedback = input.nextElementSibling;
    let timeout = null;

    input.addEventListener('input', () => {
      feedback.textContent = 'Typing...';
      feedback.classList.replace('text-info', 'text-warning');

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        feedback.textContent = `You searched: "${input.value}"`;
        feedback.classList.replace('text-warning', 'text-info');
      }, 500);
    });
  });
}

/* ==========================================
       11. PASSWORD STRENGTH INDICATOR
    ========================================== */
function initPasswordStrength() {
  document.querySelectorAll('.js-strength-input').forEach((input) => {
    const bar = input.nextElementSibling.querySelector('.js-strength-bar');
    const text = input.nextElementSibling.nextElementSibling;

    input.addEventListener('input', (e) => {
      const val = e.target.value;
      let strength = 0;

      if (val.length > 5) strength += 1;
      if (val.length > 8) strength += 1;
      if (/[A-Z]/.test(val)) strength += 1;
      if (/[0-9]/.test(val)) strength += 1;
      if (/[^A-Za-z0-9]/.test(val)) strength += 1;

      bar.classList.remove(
        'w-0',
        'w-25',
        'w-50',
        'w-75',
        'w-100',
        'bg-danger-var',
        'bg-warning-var',
        'bg-success-var',
        'bg-primary-var'
      );

      if (val.length === 0) {
        bar.classList.add('w-0');
        text.textContent = 'Enter password';
        text.className = 'form-text mt-2 fw-medium text-muted';
      } else if (strength <= 2) {
        bar.classList.add('w-25', 'bg-danger-var');
        text.textContent = 'Weak';
        text.className = 'form-text mt-2 fw-medium text-danger';
      } else if (strength === 3 || strength === 4) {
        bar.classList.add('w-50', 'bg-warning-var');
        text.textContent = 'Medium';
        text.className = 'form-text mt-2 fw-medium text-warning';
      } else {
        bar.classList.add('w-100', 'bg-success-var');
        text.textContent = 'Strong';
        text.className = 'form-text mt-2 fw-medium text-success';
      }
    });
  });
}

/* ==========================================
       12. VALIDATION DEMO & SUBMIT SPINNER
    ========================================== */
function initValidationDemo() {
  document.querySelectorAll('.js-live-email').forEach((input) => {
    input.addEventListener('input', () => {
      const feedback = input.nextElementSibling;
      if (input.checkValidity()) {
        input.classList.remove('is-invalid-custom');
        input.classList.add('is-valid-custom');
        feedback.classList.add('d-none');
      } else {
        input.classList.remove('is-valid-custom');
        input.classList.add('is-invalid-custom');
        feedback.classList.remove('d-none');
      }
    });
  });

  document.querySelectorAll('.js-validation-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      Array.from(form.elements).forEach((input) => {
        if (input.required && !input.checkValidity()) {
          input.classList.add('is-invalid-custom');
          const errorMsg = input.nextElementSibling;
          if (errorMsg && errorMsg.classList.contains('invalid-feedback-custom')) {
            errorMsg.classList.remove('d-none');
          }
        }
      });

      if (!form.checkValidity()) return;

      const btn = form.querySelector('.js-submit-btn');
      const btnText = form.querySelector('.js-submit-text');
      const spinner = form.querySelector('.js-submit-spinner');

      btn.disabled = true;
      btnText.textContent = 'Submitting...';
      spinner.classList.remove('d-none');

      setTimeout(() => {
        btn.disabled = false;
        btnText.textContent = '47. Submit Data';
        spinner.classList.add('d-none');
        Array.from(form.elements).forEach((i) =>
          i.classList.remove('is-valid-custom', 'is-invalid-custom')
        );
        form.reset();
        alert('Form submitted successfully!');
      }, 1500);
    });
  });
}

/* ==========================================
       13. INDETERMINATE CHECKBOX STATE
    ========================================== */
function initIndeterminateCheckboxes() {
  document.querySelectorAll('.js-indeterminate').forEach((chk) => (chk.indeterminate = true));
}

/* ==========================================
       14. SELECT ALL CHECKBOX FUNCTIONALITY
    ========================================== */
function initSelectAllCheckboxes() {
  document.querySelectorAll('.js-select-all-parent').forEach((parent) => {
    const container = parent.closest('.card-body');
    const group = container.querySelector('.js-select-all-group');
    if (!group) return;

    const children = group.querySelectorAll('.js-select-child');

    parent.addEventListener('change', (e) => {
      children.forEach((child) => (child.checked = e.target.checked));
    });

    children.forEach((child) => {
      child.addEventListener('change', () => {
        const checkedCount = group.querySelectorAll('.js-select-child:checked').length;
        if (checkedCount === 0) {
          parent.checked = false;
          parent.indeterminate = false;
        } else if (checkedCount === children.length) {
          parent.checked = true;
          parent.indeterminate = false;
        } else {
          parent.checked = false;
          parent.indeterminate = true;
        }
      });
    });
  });
}

/* ==========================================
       15. SWITCH ICON TOGGLE SYSTEM
    ========================================== */
function initIconSwitches() {
  document.querySelectorAll('.js-icon-switch').forEach((sw) => {
    sw.addEventListener('change', (e) => {
      const icon = e.target.nextElementSibling.querySelector('.js-switch-icon');
      if (e.target.checked) {
        icon.classList.replace('bi-moon', 'bi-sun');
        icon.classList.add('text-warning');
      } else {
        icon.classList.replace('bi-sun', 'bi-moon');
        icon.classList.remove('text-warning');
      }
    });
  });
}

/* ==========================================
       16. ASYNC LOADING SWITCH
    ========================================== */
function initAsyncLoadingSwitches() {
  document.querySelectorAll('.js-loading-switch').forEach((sw) => {
    sw.addEventListener('click', (e) => {
      e.preventDefault();
      const spinner = sw.parentElement.parentElement.querySelector('.js-switch-spinner');

      sw.disabled = true;
      spinner.classList.remove('d-none');

      setTimeout(() => {
        sw.checked = !sw.checked;
        sw.disabled = false;
        spinner.classList.add('d-none');
      }, 1000);
    });
  });
}

/* ==========================================
       17. CONFIRMATION SWITCH SYSTEM
    ========================================== */
function initConfirmationSwitches() {
  document.querySelectorAll('.js-confirm-switch').forEach((sw) => {
    const confirmBox = sw.parentElement.querySelector('.js-confirm-box');
    sw.addEventListener('click', (e) => {
      if (e.target.checked) {
        e.preventDefault();
        confirmBox.classList.remove('d-none');
      } else {
        confirmBox.classList.add('d-none');
      }
    });

    const yesBtn = sw.parentElement.querySelector('.js-confirm-yes');
    const noBtn = sw.parentElement.querySelector('.js-confirm-no');

    if (yesBtn && noBtn) {
      yesBtn.addEventListener('click', () => {
        sw.checked = true;
        confirmBox.classList.add('d-none');
      });
      noBtn.addEventListener('click', () => {
        sw.checked = false;
        confirmBox.classList.add('d-none');
      });
    }
  });
}

/* ==========================================
       18. LIVE STATUS SWITCH
    ========================================== */
function initLiveStatusSwitches() {
  document.querySelectorAll('.js-status-switch').forEach((sw) => {
    sw.addEventListener('change', (e) => {
      const textNode = e.target.nextElementSibling;
      if (e.target.checked) {
        textNode.textContent = 'Online';
        textNode.classList.replace('text-danger', 'text-success');
      } else {
        textNode.textContent = 'Offline';
        textNode.classList.replace('text-success', 'text-danger');
      }
    });
  });
}

/* ==========================================
       19. RADIO BEHAVIOR SWITCH GROUP
    ========================================== */
function initRadioBehaviorSwitches() {
  document.querySelectorAll('.js-radio-switch').forEach((sw) => {
    sw.addEventListener('change', (e) => {
      if (e.target.checked) {
        const group = e.target.closest('.js-switch-group');
        const siblings = group.querySelectorAll('.js-radio-switch');
        siblings.forEach((sibling) => {
          if (sibling !== e.target) sibling.checked = false;
        });
      }
    });
  });
}

/* ==========================================
       20. SWITCH COUNTER SYSTEM
    ========================================== */
function initSwitchCounters() {
  document.querySelectorAll('.js-counter-switch').forEach((sw) => {
    let count = 0;
    sw.addEventListener('change', () => {
      count++;
      const valNode = sw.nextElementSibling.querySelector('.js-switch-counter-val');
      if (valNode) valNode.textContent = count;
    });
  });
}

/* ==========================================
       21. JS API CONTROLLED SWITCH
    ========================================== */
function initApiControlledSwitches() {
  document.querySelectorAll('.js-api-turn-on').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.closest('.d-flex').querySelector('.js-api-switch-target');
      if (target) target.checked = true;
    });
  });
  document.querySelectorAll('.js-api-turn-off').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.closest('.d-flex').querySelector('.js-api-switch-target');
      if (target) target.checked = false;
    });
  });
}

/* ==========================================
       22. COUNTRY CODE DROPDOWN MAPPING
    ========================================== */
function initCountryCodeDropdown() {
  document.querySelectorAll('.js-country-toggle').forEach((toggle) => {
    const options = toggle.nextElementSibling.querySelectorAll('.js-country-option');
    options.forEach((opt) => {
      opt.addEventListener('click', (e) => {
        e.preventDefault();
        toggle.textContent = e.target.getAttribute('data-code');
      });
    });
  });
}

/* ==========================================
       23. SEARCH DROPDOWN LIVE RESULTS
    ========================================== */
function initLiveSearchDropdown() {
  document.querySelectorAll('.js-live-search').forEach((liveSearchInput) => {
    const searchDropdown = liveSearchInput.parentElement.nextElementSibling;
    if (!searchDropdown || !searchDropdown.classList.contains('js-search-dropdown')) return;

    const fakeData = [
      'New York',
      'London',
      'Paris',
      'Tokyo',
      'Berlin',
      'Madrid',
      'Sydney',
      'Mumbai',
    ];

    liveSearchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase();
      searchDropdown.innerHTML = '';

      if (val.length === 0) {
        searchDropdown.classList.remove('active');
        liveSearchInput.setAttribute('aria-expanded', 'false');
        return;
      }

      const matches = fakeData.filter((city) => city.toLowerCase().includes(val));

      if (matches.length > 0) {
        matches.forEach((match) => {
          const div = document.createElement('div');
          div.className = 'search-result-item';
          div.textContent = match;
          div.tabIndex = 0;
          div.addEventListener('click', () => {
            liveSearchInput.value = match;
            searchDropdown.classList.remove('active');
          });
          div.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter') {
              liveSearchInput.value = match;
              searchDropdown.classList.remove('active');
            }
          });
          searchDropdown.appendChild(div);
        });
        searchDropdown.classList.add('active');
        liveSearchInput.setAttribute('aria-expanded', 'true');
      } else {
        const div = document.createElement('div');
        div.className = 'search-result-item text-muted';
        div.textContent = 'No results found';
        searchDropdown.appendChild(div);
        searchDropdown.classList.add('active');
      }
    });

    document.addEventListener('click', (e) => {
      if (!liveSearchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.remove('active');
        liveSearchInput.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* ==========================================
       24. DYNAMIC LOADING SPINNER
    ========================================== */
function initDynamicLoadingSpinner() {
  document.querySelectorAll('.js-spinner-input').forEach((spinnerInput) => {
    const group = spinnerInput.parentElement;
    const inputSpinner = group.querySelector('.js-input-spinner');
    const inputSuccess = group.querySelector('.js-input-success');
    let spinnerTimeout;

    if (inputSpinner && inputSuccess) {
      spinnerInput.addEventListener('input', () => {
        inputSuccess.classList.add('d-none');
        inputSpinner.classList.remove('d-none');

        clearTimeout(spinnerTimeout);
        spinnerTimeout = setTimeout(() => {
          inputSpinner.classList.add('d-none');
          inputSuccess.classList.remove('d-none');
        }, 800);
      });
    }
  });
}

/* ==========================================
       25. VERIFICATION TIMER
    ========================================== */
function initVerificationTimer() {
  document.querySelectorAll('.js-verify-btn').forEach((verifyBtn) => {
    const timerDisplay = verifyBtn.parentElement.querySelector('.js-timer-display');
    if (!timerDisplay) return;

    let timerInterval;
    let timeLeft = 120; // 2 mins

    const startTimer = () => {
      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft < 0) {
          clearInterval(timerInterval);
          timerDisplay.textContent = '00:00';
          verifyBtn.disabled = true;
          return;
        }
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        timerDisplay.textContent = `0${m}:${s < 10 ? '0' + s : s}`;
      }, 1000);
    };

    startTimer(); // Demo init

    verifyBtn.addEventListener('click', () => {
      clearInterval(timerInterval);
      verifyBtn.textContent = 'Verified';
      verifyBtn.classList.replace('btn-primary', 'btn-success');
    });
  });
}

/* ==========================================
       26. DYNAMIC STATUS BADGE
    ========================================== */
function initDynamicStatusBadge() {
  document.querySelectorAll('.js-status-badge-input').forEach((input) => {
    const statusBadge = input.parentElement.querySelector('.js-status-badge');
    if (!statusBadge) return;

    input.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().trim();
      statusBadge.classList.remove('bg-secondary', 'bg-success', 'bg-danger');

      if (val === '') {
        statusBadge.textContent = 'Pending';
        statusBadge.classList.add('bg-secondary');
      } else if (val === 'admin') {
        statusBadge.textContent = 'Verified';
        statusBadge.classList.add('bg-success');
      } else {
        statusBadge.textContent = 'Error';
        statusBadge.classList.add('bg-danger');
      }
    });
  });
}

/* ==========================================
       27. EXPANDABLE & COLLAPSIBLE INPUT GROUPS
    ========================================== */
function initExpandableGroups() {
  document.querySelectorAll('.js-expand-btn').forEach((btn) => {
    const expandContent = document.getElementById(btn.getAttribute('aria-controls'));
    if (!expandContent) return;

    btn.addEventListener('click', () => {
      const isExpanded = expandContent.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', isExpanded);
      const icon = btn.querySelector('.js-expand-icon');
      if (isExpanded) {
        icon.classList.replace('bi-chevron-down', 'bi-chevron-up');
      } else {
        icon.classList.replace('bi-chevron-up', 'bi-chevron-down');
      }
    });
  });

  document.querySelectorAll('.js-filter-toggle').forEach((btn) => {
    const filterContent = document.getElementById(btn.getAttribute('aria-controls'));
    if (!filterContent) return;

    btn.addEventListener('click', () => {
      const isExpanded = filterContent.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', isExpanded);
      if (isExpanded) {
        btn.classList.replace('btn-outline-secondary', 'btn-secondary');
        btn.classList.add('text-white');
      } else {
        btn.classList.replace('btn-secondary', 'btn-outline-secondary');
        btn.classList.remove('text-white');
      }
    });
  });
}

/* ==========================================
       28. DYNAMIC ADD/REMOVE FIELDS
    ========================================== */
function initDynamicFields() {
  document.querySelectorAll('.js-dynamic-fields-wrapper').forEach((dynWrapper) => {
    dynWrapper.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.js-add-field');
      const removeBtn = e.target.closest('.js-remove-field');

      if (addBtn) {
        const newRow = document.createElement('div');
        newRow.className = 'input-group mb-2 dynamic-field-row';
        newRow.innerHTML = `
                        <input type="text" class="form-control" placeholder="Team member name">
                        <button class="btn btn-outline-danger js-remove-field" type="button" aria-label="Remove field">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    `;
        dynWrapper.appendChild(newRow);
      }

      if (removeBtn) {
        const row = removeBtn.closest('.dynamic-field-row');
        if (dynWrapper.children.length > 1) {
          row.remove();
        }
      }
    });
  });
}

/* ==========================================
       29. STEP-BASED INPUT GROUP
    ========================================== */
function initStepBasedInput() {
  document.querySelectorAll('.js-step-input').forEach((stepInput) => {
    const group = stepInput.parentElement;
    const stepMinus = group.querySelector('.js-step-minus');
    const stepPlus = group.querySelector('.js-step-plus');

    if (stepMinus && stepPlus) {
      stepMinus.addEventListener('click', () => {
        let val = parseInt(stepInput.value) || 0;
        let min = parseInt(stepInput.getAttribute('min')) || 0;
        if (val > min) stepInput.value = val - 1;
      });
      stepPlus.addEventListener('click', () => {
        let val = parseInt(stepInput.value) || 0;
        let max = parseInt(stepInput.getAttribute('max')) || 999;
        if (val < max) stepInput.value = val + 1;
      });
    }
  });
}

/* ==========================================
       30. CHARACTER LIMIT PROGRESS BAR
    ========================================== */
function initCharacterLimitProgress() {
  document.querySelectorAll('.js-progress-input').forEach((input) => {
    const container = input.parentElement;
    const progressBar = container.querySelector('.js-input-progress-bar');
    const progressText = container.querySelector('.js-progress-text');

    if (progressBar && progressText) {
      const maxChars = parseInt(input.getAttribute('maxlength'));
      input.addEventListener('input', (e) => {
        const len = e.target.value.length;
        const percent = (len / maxChars) * 100;

        progressBar.style.width = `${percent}%`;
        progressText.textContent = `${len}/${maxChars}`;

        progressBar.classList.remove('bg-success', 'bg-warning', 'bg-danger');
        if (percent < 60) progressBar.classList.add('bg-success');
        else if (percent < 90) progressBar.classList.add('bg-warning');
        else progressBar.classList.add('bg-danger');
      });
    }
  });
}

/* ==========================================
       31. DUAL ACTION COPY + CLEAR
    ========================================== */
function initDualActionInput() {
  document.querySelectorAll('.js-dual-input').forEach((input) => {
    const group = input.parentElement;
    const dualCopy = group.querySelector('.js-dual-copy');
    const dualClear = group.querySelector('.js-dual-clear');

    if (dualCopy && dualClear) {
      dualCopy.addEventListener('click', () => {
        input.select();
        document.execCommand('copy');
        const origHtml = dualCopy.innerHTML;
        dualCopy.innerHTML = '<i class="bi bi-check2 text-success"></i>';
        setTimeout(() => (dualCopy.innerHTML = origHtml), 1500);
      });
      dualClear.addEventListener('click', () => {
        input.value = '';
        input.focus();
      });
    }
  });
}

/* ==========================================
       32. PASSWORD GENERATOR
    ========================================== */
function initPasswordGenerator() {
  document.querySelectorAll('.js-gen-btn').forEach((btn) => {
    const input = btn.parentElement.querySelector('.js-gen-input');
    if (!input) return;

    btn.addEventListener('click', () => {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      let pass = '';
      for (let i = 0; i < 12; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      input.value = pass;

      input.classList.add('is-valid-custom');
      setTimeout(() => input.classList.remove('is-valid-custom'), 500);
    });
  });
}

/* ==========================================
       33. CURRENCY CONVERTER LOGIC
    ========================================== */
function initCurrencyConverter() {
  document.querySelectorAll('.js-curr-amount').forEach((currAmt) => {
    const group = currAmt.parentElement;
    const currFrom = group.querySelector('.js-curr-from');
    const currTo = group.querySelector('.js-curr-to');
    const currRes = group.querySelector('.js-curr-result');

    if (currFrom && currTo && currRes) {
      const rates = { USD: 1, EUR: 0.92, GBP: 0.79 };

      const convert = () => {
        const amt = parseFloat(currAmt.value) || 0;
        const baseToUsd = amt / rates[currFrom.value];
        const final = baseToUsd * rates[currTo.value];
        currRes.value = final.toFixed(2);
      };

      [currFrom, currTo, currAmt].forEach((el) => el.addEventListener('input', convert));
      convert();
    }
  });
}

/* ==========================================
       34. DEBOUNCED API SEARCH LOGIC
    ========================================== */
function initDebouncedApiSearch() {
  document.querySelectorAll('.js-api-debounce-input').forEach((input) => {
    const group = input.parentElement;
    const apiBtn = group.querySelector('.js-api-btn');
    const apiFeedback = group.nextElementSibling;
    if (!apiBtn || !apiFeedback) return;

    let apiTimeout;
    const spinner = apiBtn.querySelector('.js-api-spinner');
    const text = apiBtn.querySelector('.js-api-text');

    input.addEventListener('input', (e) => {
      const val = e.target.value;
      apiFeedback.textContent = 'Waiting to send request...';

      clearTimeout(apiTimeout);

      if (val.trim() === '') {
        apiFeedback.textContent = '';
        return;
      }

      apiTimeout = setTimeout(() => {
        apiBtn.disabled = true;
        text.textContent = 'Loading';
        spinner.classList.remove('d-none');
        apiFeedback.textContent = `Fetching data for "${val}"...`;

        setTimeout(() => {
          apiBtn.disabled = false;
          text.textContent = 'Ready';
          spinner.classList.add('d-none');
          apiFeedback.textContent = `Retrieved 12 results for "${val}".`;
        }, 1200);
      }, 800);
    });
  });
}

/* ==========================================
       35. LIVE VALIDATION ICON INDICATOR
    ========================================== */
function initValidationIcon() {
  document.querySelectorAll('.js-val-icon-input').forEach((input) => {
    const valIcon = input.parentElement.querySelector('.js-val-icon');
    if (!valIcon) return;

    input.addEventListener('input', (e) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (e.target.value === '') {
        valIcon.className = 'bi bi-x-circle-fill text-danger validation-icon js-val-icon';
      } else if (emailRegex.test(e.target.value)) {
        valIcon.className = 'bi bi-check-circle-fill text-success validation-icon js-val-icon';
      } else {
        valIcon.className =
          'bi bi-exclamation-circle-fill text-warning validation-icon js-val-icon';
      }
    });
  });
}

/* ==========================================
       36. TAGGABLE INPUT + EXPLICIT ADD BUTTON
    ========================================== */
function initTaggableGroup() {
  document.querySelectorAll('.js-tag-group-input').forEach((input) => {
    const group = input.parentElement;
    const btn = group.querySelector('.js-tag-group-btn');
    const container = group.nextElementSibling;
    if (!btn || !container) return;

    const grpTags = [];

    const addGrpTag = () => {
      const val = input.value.trim();
      if (val && !grpTags.includes(val)) {
        grpTags.push(val);
        renderGrpTags();
        input.value = '';
      }
    };

    btn.addEventListener('click', addGrpTag);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addGrpTag();
      }
    });

    function renderGrpTags() {
      container.innerHTML = '';
      grpTags.forEach((tag, idx) => {
        const badge = document.createElement('span');
        badge.className = 'tag-badge mb-1';
        badge.innerHTML = `${tag} <i class="bi bi-x tag-remove" data-idx="${idx}" tabindex="0" role="button" aria-label="Remove tag"></i>`;
        container.appendChild(badge);
      });

      container.querySelectorAll('.tag-remove').forEach((removeBtn) => {
        const removeAction = (e) => {
          const idx = e.target.getAttribute('data-idx');
          grpTags.splice(idx, 1);
          renderGrpTags();
        };
        removeBtn.addEventListener('click', removeAction);
        removeBtn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') removeAction(e);
        });
      });
    }
  });
}

/* ==========================================
       37. TOOLTIP INITIALIZATION
    ========================================== */
function initTooltips() {
  if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
  }
}
