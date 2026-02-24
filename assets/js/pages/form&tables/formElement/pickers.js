/* ==========================================================
   PICKER FACTORY SYSTEM (Stateless Instantiation)
========================================================== */
(function () {
  const PickerFactory = {
    initFlatpickr(el, options = {}) {
      if (!el) return null;
      return flatpickr(el, options);
    },
    initLitepicker(el, options = {}) {
      if (!el || typeof Litepicker === 'undefined') return null;
      return new Litepicker({ element: el, ...options });
    },
    initTomSelect(el, options = {}) {
      if (!el) return null;
      return new TomSelect(el, options);
    },
    initTempusDominus(el, options = {}) {
      if (!el) return null;
      return new tempusDominus.TempusDominus(el, options);
    },
    initPickr(el, options = {}) {
      if (!el) return null;
      return Pickr.create({ el, ...options });
    },
    initPicmo(triggerElement, popupOptions = {}, pickerOptions = {}) {
      if (!triggerElement || !window.picmoPopup?.createPopup) return null;
      return window.picmoPopup.createPopup(pickerOptions, {
        referenceElement: triggerElement,
        triggerElement: triggerElement,
        ...popupOptions,
      });
    },
  };

  /* ==========================================================
   ADMIN PICKERS COMPONENT CLASS WRAPPER
========================================================== */
  class AdminPickers {
    constructor(wrapperElement) {
      if (!wrapperElement) throw new Error('AdminPickers requires a valid DOM element.');
      this.wrapper = wrapperElement;
      this.instances = [];
      this.listeners = [];
      this.theme = this.wrapper.getAttribute('data-theme') || 'light';
      this._iconDropdownListenerAdded = false;
    }

    /* ---------------------------------------------------------
       LIFECYCLE METHODS
    --------------------------------------------------------- */
    init() {
      this._initDatePickers();
      this._initRangePickers();
      this._initTimePickers();
      this._initSelectPickers();
      this._initStaticPickers();

      // Theme-aware components
      this._initColorPickers();
      this._initEmojiPicker();

      // Global Theme Event Listener Mapping (bound once per component wrapper)
      if (!this._themeHandler) {
        this._themeHandler = (e) => this.reinitTheme(e.detail);
        document.addEventListener('admin-theme-change', this._themeHandler);
      }
    }

    destroy() {
      // Unbind external document listeners
      if (this._themeHandler) {
        document.removeEventListener('admin-theme-change', this._themeHandler);
        this._themeHandler = null;
      }

      // Unbind local listeners
      this.listeners.forEach(({ el, event, handler }) => {
        if (el) el.removeEventListener(event, handler);
      });
      this.listeners = [];

      // Destroy tracked instances safely
      this.instances.forEach(({ type, instance, el, container }) => {
        if (!instance) return;

        if (typeof instance.destroyAndRemove === 'function')
          instance.destroyAndRemove(); // Pickr
        else if (typeof instance.dispose === 'function')
          instance.dispose(); // Tempus Dominus
        else if (typeof instance.destroy === 'function') instance.destroy(); // Flatpickr, Litepicker, TomSelect, Picmo

        // Clean up state flags to allow re-initialization
        if (el) el._pickerInitialized = false;
        if (container && type === 'color') container.innerHTML = '';
      });

      this.instances = [];
      this._iconDropdownListenerAdded = false;
    }

    reinitTheme(newTheme) {
      this.theme = newTheme;
      this.wrapper.setAttribute('data-theme', newTheme);

      // Find and destroy only theme-aware pickers (Pickr, Picmo)
      const themeAwareTypes = ['color', 'emoji'];
      this.instances = this.instances.filter((tracked) => {
        if (themeAwareTypes.includes(tracked.type)) {
          const { instance, el, container } = tracked;
          if (instance) {
            if (typeof instance.destroyAndRemove === 'function') instance.destroyAndRemove();
            else if (typeof instance.destroy === 'function') instance.destroy();
          }

          if (el) el._pickerInitialized = false;

          // Regenerate pickr mounting anchor inside its retained container
          if (tracked.type === 'color' && container) {
            container.innerHTML = '<div></div>';
          }
          return false; // Remove from tracked array
        }
        return true;
      });

      // Reinitialize
      this._initColorPickers();
      this._initEmojiPicker();
    }

    /* ---------------------------------------------------------
       UTILITIES
    --------------------------------------------------------- */
    track(type, instance, el = null, container = null) {
      if (instance) this.instances.push({ type, instance, el, container });
    }

    addListener(el, event, handler) {
      if (!el) return;
      el.addEventListener(event, handler);
      this.listeners.push({ el, event, handler });
    }

    /* ---------------------------------------------------------
       COMPONENT INITIALIZERS
    --------------------------------------------------------- */
    _initDatePickers() {
      this.wrapper.querySelectorAll('[data-picker="group-date-basic"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track(
          'date',
          PickerFactory.initFlatpickr(el, { wrap: true, appendTo: this.wrapper }),
          el
        );
      });

      this.wrapper.querySelectorAll('[data-picker="date-validation"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track(
          'date',
          PickerFactory.initFlatpickr(el, {
            appendTo: this.wrapper,
            onChange: (sel, dateStr, instance) => {
              if (dateStr) {
                instance.element.classList.remove('is-invalid');
                instance.element.classList.add('is-valid');
              }
            },
          }),
          el
        );
      });

      this.wrapper.querySelectorAll('[data-picker="date-datetime"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track(
          'date',
          PickerFactory.initFlatpickr(el, {
            enableTime: true,
            dateFormat: 'Y-m-d H:i',
            appendTo: this.wrapper,
          }),
          el
        );
      });

      this.wrapper.querySelectorAll('[data-picker="date-range"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track(
          'date',
          PickerFactory.initFlatpickr(el, {
            mode: 'range',
            dateFormat: 'Y-m-d',
            appendTo: this.wrapper,
          }),
          el
        );
      });

      this.wrapper.querySelectorAll('[data-picker="date-timezone"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track(
          'date',
          PickerFactory.initFlatpickr(el, {
            dateFormat: 'Z',
            altInput: true,
            altFormat: 'F j, Y (Z)',
            appendTo: this.wrapper,
          }),
          el
        );
      });

      this.wrapper.querySelectorAll('[data-picker="date-multiple"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track(
          'date',
          PickerFactory.initFlatpickr(el, {
            mode: 'multiple',
            dateFormat: 'Y-m-d',
            appendTo: this.wrapper,
          }),
          el
        );
      });

      this.wrapper.querySelectorAll('[data-picker="date-disabled"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        const today = new Date();
        const next14Days = new Date(today);
        next14Days.setDate(today.getDate() + 14);
        this.track(
          'date',
          PickerFactory.initFlatpickr(el, {
            minDate: 'today',
            maxDate: next14Days,
            appendTo: this.wrapper,
            disable: [(date) => date.getDay() === 0 || date.getDay() === 6],
          }),
          el
        );
      });

      if (typeof monthSelectPlugin !== 'undefined') {
        this.wrapper.querySelectorAll('[data-picker="date-month"]').forEach((el) => {
          if (el._pickerInitialized) return;
          el._pickerInitialized = true;
          this.track(
            'date',
            PickerFactory.initFlatpickr(el, {
              appendTo: this.wrapper,
              plugins: [
                new monthSelectPlugin({
                  shorthand: true,
                  dateFormat: 'Y-m',
                  altFormat: 'F Y',
                  theme: 'light',
                }),
              ],
            }),
            el
          );
        });
        this.wrapper.querySelectorAll('[data-picker="date-year"]').forEach((el) => {
          if (el._pickerInitialized) return;
          el._pickerInitialized = true;
          this.track(
            'date',
            PickerFactory.initFlatpickr(el, {
              appendTo: this.wrapper,
              plugins: [
                new monthSelectPlugin({
                  shorthand: true,
                  dateFormat: 'Y',
                  altFormat: 'Y',
                  theme: 'light',
                }),
              ],
            }),
            el
          );
        });
      }

      this.wrapper.querySelectorAll('[data-picker="date-inline"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track('date', PickerFactory.initFlatpickr(el, { inline: true }), el);
      });
    }

    _initRangePickers() {
      this.wrapper.querySelectorAll('[data-picker="litepicker-range"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;

        const today = new Date();
        const yyyy = today.getFullYear();
        const currentQ = Math.floor(today.getMonth() / 3);

        const qStart = new Date(yyyy, currentQ * 3, 1);
        const qEnd = new Date(yyyy, currentQ * 3 + 3, 0);
        const prevQStart = new Date(yyyy, (currentQ - 1) * 3, 1);
        const prevQEnd = new Date(yyyy, (currentQ - 1) * 3 + 3, 0);
        const yrStart = new Date(yyyy, 0, 1);
        const yrEnd = new Date(yyyy, 11, 31);
        const prevYrStart = new Date(yyyy - 1, 0, 1);
        const prevYrEnd = new Date(yyyy - 1, 11, 31);

        const lp = PickerFactory.initLitepicker(el, {
          parentEl: this.wrapper,
          plugins: [Litepicker.plugins?.ranges || 'ranges'],
          singleMode: false,
          numberOfMonths: 2,
          numberOfColumns: 2,
          autoApply: true,
          dropdowns: { minYear: 2020, maxYear: null, months: true, years: true },
          ranges: {
            customRanges: {
              Today: [today, today],
              Yesterday: [
                new Date(new Date().setDate(today.getDate() - 1)),
                new Date(new Date().setDate(today.getDate() - 1)),
              ],
              'Last 7 Days': [new Date(new Date().setDate(today.getDate() - 6)), today],
              'Last 30 Days': [new Date(new Date().setDate(today.getDate() - 29)), today],
              'This Month': [
                new Date(yyyy, today.getMonth(), 1),
                new Date(yyyy, today.getMonth() + 1, 0),
              ],
              'Last Month': [
                new Date(yyyy, today.getMonth() - 1, 1),
                new Date(yyyy, today.getMonth(), 0),
              ],
              'This Quarter': [qStart, qEnd],
              'Last Quarter': [prevQStart, prevQEnd],
              'This Year': [yrStart, yrEnd],
              'Last Year': [prevYrStart, prevYrEnd],
            },
          },
        });

        this.track('range', lp, el);

        const container = el.closest('.input-group') || this.wrapper;
        const clearBtn = container.querySelector('[data-clear-target="litepicker-range"]');
        if (clearBtn) {
          this.addListener(clearBtn, 'click', () => {
            lp.clearSelection();
            el.value = '';
          });
        }
      });
    }

    _initTimePickers() {
      this.wrapper.querySelectorAll('[data-picker="group-time-24hr"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track(
          'time',
          PickerFactory.initFlatpickr(el, {
            wrap: true,
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            time_24hr: true,
            appendTo: this.wrapper,
          }),
          el
        );
      });

      this.wrapper.querySelectorAll('[data-picker="time-12hr"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track(
          'time',
          PickerFactory.initFlatpickr(el, {
            enableTime: true,
            noCalendar: true,
            dateFormat: 'h:i K',
            time_24hr: false,
            appendTo: this.wrapper,
          }),
          el
        );
      });

      this.wrapper.querySelectorAll('[data-picker="time-minmax"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track(
          'time',
          PickerFactory.initFlatpickr(el, {
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            minTime: '09:00',
            maxTime: '17:00',
            appendTo: this.wrapper,
          }),
          el
        );
      });

      // Linked Time Pickers
      this.wrapper.querySelectorAll('[data-picker="time-range-start"]').forEach((startEl) => {
        if (startEl._pickerInitialized) return;
        startEl._pickerInitialized = true;

        const container = startEl.closest('.input-group') || this.wrapper;
        const endEl = container.querySelector('[data-picker="time-range-end"]');

        let fpStart, fpEnd;
        fpStart = PickerFactory.initFlatpickr(startEl, {
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          appendTo: this.wrapper,
          onChange: (sel, str) => {
            if (fpEnd) fpEnd.set('minTime', str);
          },
        });

        if (endEl && !endEl._pickerInitialized) {
          endEl._pickerInitialized = true;
          fpEnd = PickerFactory.initFlatpickr(endEl, {
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            appendTo: this.wrapper,
            onChange: (sel, str) => {
              if (fpStart) fpStart.set('maxTime', str);
            },
          });
          this.track('time', fpEnd, endEl);
        }
        this.track('time', fpStart, startEl);
      });

      // Tempus Dominus programmatic init
      this.wrapper
        .querySelectorAll('[data-picker="td-scroll-container"]')
        .forEach((tdContainer) => {
          if (tdContainer._pickerInitialized) return;
          tdContainer._pickerInitialized = true;

          const tdToggle = tdContainer.querySelector('[data-action="td-toggle"]');
          const td = PickerFactory.initTempusDominus(tdContainer, {
            display: {
              viewMode: 'clock',
              components: {
                decades: false,
                year: false,
                month: false,
                date: false,
                hours: true,
                minutes: true,
                seconds: false,
              },
            },
          });
          if (tdToggle) {
            this.addListener(tdToggle, 'click', () => td.toggle());
          }
          this.track('time', td, tdContainer);
        });
    }

    _initColorPickers() {
      const createPickr = (containerSelector, defaultColor, components, isSwatch = false) => {
        this.wrapper
          .querySelectorAll(`[data-picker-container="${containerSelector}"]`)
          .forEach((container) => {
            if (container._pickerInitialized) return;
            container._pickerInitialized = true;

            container.innerHTML = '<div></div>'; // Create safe mounting point

            const options = {
              theme: 'classic',
              default: defaultColor,
              components,
              container: this.wrapper,
            };
            if (isSwatch) {
              options.swatches = [
                '#ef4444',
                '#f97316',
                '#f59e0b',
                '#84cc16',
                '#22c55e',
                '#06b6d4',
                '#3b82f6',
                '#6366f1',
                '#a855f7',
                '#ec4899',
              ];
            }

            const p = PickerFactory.initPickr(container.firstElementChild, options);
            if (p) {
              p.on('save', () => p.hide());
              this.track('color', p, container, container); // Use the outer wrapper as the tracked container
            }
          });
      };

      const stdComps = {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
          hex: true,
          rgba: true,
          hsla: true,
          hsva: false,
          cmyk: false,
          input: true,
          clear: true,
          save: true,
        },
      };
      const swatchComps = {
        preview: true,
        opacity: false,
        hue: false,
        palette: false,
        interaction: { input: false, save: true },
      };

      createPickr('color-hex', '#4361ee', stdComps);
      createPickr('color-rgba', 'rgba(67, 97, 238, 0.5)', stdComps);
      createPickr('color-hsla', 'hsla(229, 83%, 60%, 1)', stdComps);
      createPickr('color-swatches', '#3b82f6', swatchComps, true);
    }

    _initSelectPickers() {
      this.wrapper.querySelectorAll('[data-picker="select-search"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track(
          'select',
          PickerFactory.initTomSelect(el, {
            create: false,
            sortField: { field: 'text', direction: 'asc' },
          }),
          el
        );
      });

      this.wrapper.querySelectorAll('[data-picker="select-optgroup"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track('select', PickerFactory.initTomSelect(el, { create: false }), el);
      });

      this.wrapper.querySelectorAll('[data-picker="select-multi"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track(
          'select',
          PickerFactory.initTomSelect(el, { plugins: ['remove_button'], maxItems: 3 }),
          el
        );
      });

      this.wrapper.querySelectorAll('[data-picker="select-tags"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track(
          'select',
          PickerFactory.initTomSelect(el, {
            plugins: ['remove_button'],
            create: true,
            valueField: 'id',
            labelField: 'title',
            searchField: 'title',
            load: function (query, callback) {
              if (!query.length) return callback();
              const self = this;
              self.wrapper.classList.add('is-loading');
              setTimeout(() => {
                self.wrapper.classList.remove('is-loading');
                callback([
                  { id: query + '-1', title: query + ' Tag 1' },
                  { id: query + '-2', title: query + ' Tag 2' },
                ]);
              }, 1000);
            },
          }),
          el
        );
      });

      this.wrapper.querySelectorAll('[data-picker="select-avatar"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track(
          'select',
          PickerFactory.initTomSelect(el, {
            valueField: 'id',
            labelField: 'name',
            searchField: ['name', 'email'],
            options: [
              {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                img: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
              },
              {
                id: 2,
                name: 'Jane Smith',
                email: 'jane@example.com',
                img: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
              },
            ],
            render: {
              option: (data, esc) =>
                `<div><img class="select-avatar" src="${esc(data.img)}" alt=""><span class="fw-medium">${esc(data.name)}</span><span class="text-muted small ms-2">${esc(data.email)}</span></div>`,
              item: (data, esc) =>
                `<div><img class="select-avatar" src="${esc(data.img)}" alt="" style="width: 20px; height: 20px;">${esc(data.name)}</div>`,
            },
          }),
          el
        );
      });

      this.wrapper.querySelectorAll('[data-picker="select-badge"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track(
          'select',
          PickerFactory.initTomSelect(el, {
            valueField: 'id',
            labelField: 'text',
            searchField: 'text',
            options: [
              { id: 'active', text: 'Active', bg: '#d1fae5', color: '#065f46' },
              { id: 'pending', text: 'Pending', bg: '#fef3c7', color: '#92400e' },
            ],
            render: {
              option: (data, esc) =>
                `<div><span class="select-badge" style="background-color:${esc(data.bg)}; color:${esc(data.color)};">${esc(data.text)}</span></div>`,
              item: (data, esc) =>
                `<div><span class="select-badge" style="background-color:${esc(data.bg)}; color:${esc(data.color)};">${esc(data.text)}</span></div>`,
            },
          }),
          el
        );
      });

      this.wrapper.querySelectorAll('[data-picker="special-status"]').forEach((el) => {
        if (el._pickerInitialized) return;
        el._pickerInitialized = true;
        this.track(
          'select',
          PickerFactory.initTomSelect(el, {
            valueField: 'id',
            labelField: 'text',
            searchField: 'text',
            options: [
              { id: 'success', text: 'Success', color: '#10b981' },
              { id: 'warning', text: 'Warning', color: '#f59e0b' },
              { id: 'danger', text: 'Critical', color: '#ef4444' },
              { id: 'info', text: 'Informational', color: '#3b82f6' },
            ],
            render: {
              option: (data, esc) =>
                `<div><span style="display:inline-block; width:12px; height:12px; border-radius:50%; background-color:${esc(data.color)}; margin-right:8px;"></span>${esc(data.text)}</div>`,
              item: (data, esc) =>
                `<div><span style="display:inline-block; width:12px; height:12px; border-radius:50%; background-color:${esc(data.color)}; margin-right:8px;"></span>${esc(data.text)}</div>`,
            },
          }),
          el
        );
      });
    }

    _initEmojiPicker() {
      this.wrapper.querySelectorAll('[data-action="emoji-trigger"]').forEach((trigger) => {
        if (trigger._pickerInitialized) return;
        trigger._pickerInitialized = true;

        const container = trigger.closest('.input-group') || this.wrapper;
        const input = container.querySelector('[data-picker="emoji-input"]');
        if (!input) return;

        const picmoTheme = this.theme === 'dark' ? 'dark' : 'light';
        const instance = PickerFactory.initPicmo(
          trigger,
          { position: 'bottom-end', rootElement: this.wrapper },
          { theme: picmoTheme }
        );

        if (instance) {
          const toggleHandler = (e) => {
            e.preventDefault();
            instance.toggle();
          };
          this.addListener(trigger, 'click', toggleHandler);

          instance.addEventListener('emoji:select', (selection) => {
            input.value += selection.emoji;
          });
          this.track('emoji', instance, trigger);
        }
      });
    }

    _initStaticPickers() {
      // Rating Stars Group Handling
      const ratingGroups = Array.from(
        this.wrapper.querySelectorAll('[data-picker="rating-star"]')
      ).reduce((groups, star) => {
        const parent = star.closest('[role="radiogroup"]');
        if (!parent || parent._pickerInitialized) return groups;
        if (!groups.has(parent)) groups.set(parent, []);
        groups.get(parent).push(star);
        return groups;
      }, new Map());

      ratingGroups.forEach((stars, parent) => {
        parent._pickerInitialized = true;
        const ratingInput = parent.querySelector('[data-picker="rating-input"]');
        const ratingText = parent.querySelector('[data-picker="rating-text"]');

        const activateStar = (el) => {
          const val = parseInt(el.getAttribute('data-val'), 10);
          if (ratingInput) ratingInput.value = val;
          if (ratingText) ratingText.textContent = `${val} / 5`;
          stars.forEach((s) => {
            const isActive = parseInt(s.getAttribute('data-val'), 10) <= val;
            s.classList.toggle('active', isActive);
            s.setAttribute('aria-checked', isActive);
          });
        };

        stars.forEach((star) => {
          this.addListener(star, 'mouseover', function () {
            const val = parseInt(this.getAttribute('data-val'), 10);
            stars.forEach((s) =>
              s.classList.toggle('hover', parseInt(s.getAttribute('data-val'), 10) <= val)
            );
          });
          this.addListener(star, 'mouseout', () =>
            stars.forEach((s) => s.classList.remove('hover'))
          );
          this.addListener(star, 'click', function () {
            activateStar(this);
          });
          this.addListener(star, 'keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              activateStar(this);
            }
          });
        });
      });

      // Icon Grid Group Handling
      this.wrapper.querySelectorAll('[data-picker="icon-grid-trigger"]').forEach((iconTrigger) => {
        if (iconTrigger._pickerInitialized) return;
        iconTrigger._pickerInitialized = true;

        const container = iconTrigger.closest('.position-relative') || this.wrapper;
        const iconDropdown = container.querySelector('[data-picker="icon-grid-dropdown"]');
        const iconPreview = container.querySelector('[data-picker="selected-icon-preview"]');
        const iconInput = container.querySelector('[data-picker="icon-grid-input"]');
        const icons = [
          'bi-app-indicator',
          'bi-bell',
          'bi-bookmark',
          'bi-camera',
          'bi-chat',
          'bi-cloud',
          'bi-envelope',
          'bi-gear',
          'bi-heart',
          'bi-star',
        ];

        if (iconDropdown) {
          icons.forEach((icon) => {
            const el = document.createElement('div');
            el.className = 'icon-grid-item';
            el.setAttribute('tabindex', '0');
            el.setAttribute('role', 'option');
            el.innerHTML = `<i class="bi ${icon}"></i>`;

            const selectIcon = (e) => {
              e.stopPropagation();
              if (iconInput) iconInput.value = icon;
              if (iconPreview) iconPreview.className = `bi ${icon} me-2`;
              iconDropdown.classList.remove('show');
              if (iconTrigger) {
                iconTrigger.setAttribute('aria-expanded', 'false');
                iconTrigger.focus();
              }
            };

            this.addListener(el, 'click', selectIcon);
            this.addListener(el, 'keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectIcon(e);
              }
            });
            iconDropdown.appendChild(el);
          });

          this.addListener(iconTrigger, 'click', (e) => {
            e.preventDefault();
            const isShowing = iconDropdown.classList.contains('show');
            iconDropdown.classList.toggle('show');
            iconTrigger.setAttribute('aria-expanded', !isShowing);
            if (!isShowing) {
              setTimeout(() => iconDropdown.firstChild.focus(), 50);
            }
          });

          if (!this._iconDropdownListenerAdded) {
            this.addListener(document, 'click', (e) => {
              this.wrapper
                .querySelectorAll('[data-picker="icon-grid-dropdown"].show')
                .forEach((dropdown) => {
                  const relatedTrigger = dropdown.parentElement.querySelector(
                    '[data-picker="icon-grid-trigger"]'
                  );
                  if (
                    relatedTrigger &&
                    !relatedTrigger.contains(e.target) &&
                    !dropdown.contains(e.target)
                  ) {
                    dropdown.classList.remove('show');
                    relatedTrigger.setAttribute('aria-expanded', 'false');
                  }
                });
            });
            this._iconDropdownListenerAdded = true;
          }
        }
      });

      // Business Scheduler Linked
      this.wrapper.querySelectorAll('[data-picker="sched-time-start"]').forEach((sStartEl) => {
        if (sStartEl._pickerInitialized) return;
        sStartEl._pickerInitialized = true;

        const container = sStartEl.closest('.input-group') || this.wrapper;
        const sEndEl = container.querySelector('[data-picker="sched-time-end"]');

        let sStart, sEnd;
        sStart = PickerFactory.initFlatpickr(sStartEl, {
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          appendTo: this.wrapper,
          onChange: (sel, str) => {
            if (sEnd) sEnd.set('minTime', str);
          },
        });

        if (sEndEl && !sEndEl._pickerInitialized) {
          sEndEl._pickerInitialized = true;
          sEnd = PickerFactory.initFlatpickr(sEndEl, {
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            appendTo: this.wrapper,
            onChange: (sel, str) => {
              if (sStart) sStart.set('maxTime', str);
            },
          });
          this.track('time', sEnd, sEndEl);
        }
        this.track('time', sStart, sStartEl);
      });
    }
  }

  /* ==========================================================
   AUTO-INITIALIZATION & THEME BINDING
========================================================== */
  AdminPickers.autoInit = function () {
    document.querySelectorAll('[data-admin-pickers]').forEach((el) => {
      if (!el._adminPickersInstance) {
        el._adminPickersInstance = new AdminPickers(el);
        el._adminPickersInstance.init();
      }
    });

    // Global Theme Selectors Binding
    document.querySelectorAll('[data-action="theme-select"]').forEach((select) => {
      // Prevent duplicate global listeners if autoInit is called multiple times
      if (select._themeListenerAttached) return;
      select._themeListenerAttached = true;

      select.addEventListener('change', (e) => {
        document.dispatchEvent(new CustomEvent('admin-theme-change', { detail: e.target.value }));
      });
    });
  };

  document.addEventListener('dynamicScriptsLoaded', AdminPickers.autoInit);
})();
