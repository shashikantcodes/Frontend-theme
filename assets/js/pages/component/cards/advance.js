// --- SECTION A: KPI & OVERVIEW ---
/* ===== START CARD 01 ===== */
(() => {
  document.querySelectorAll('[data-component="01-smart-kpi"]').forEach((c) => {
    const el = c.querySelector('.js-val');
    const tar = +el.dataset.target;
    let s = 0;
    const step = () => {
      s += Math.ceil(tar / 30);
      if (s > tar) s = tar;
      el.textContent = s.toLocaleString();
      if (s < tar) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
})();
/* ===== END CARD 01 ===== */

/* ===== START CARD 02 ===== */
(() => {
  document.querySelectorAll('[data-component="02-rev-proj"]').forEach((c) => {
    const val = c.querySelector('.js-val');
    const bar = c.querySelector('.js-bar');
    c.addEventListener('click', (e) => {
      if (e.target.classList.contains('rev-proj__tab')) {
        c.querySelectorAll('.rev-proj__tab').forEach((t) => t.classList.remove('active'));
        e.target.classList.add('active');
        const m = e.target.dataset.mode;
        val.textContent = '$' + Number(val.getAttribute(`data-val-${m}`)).toLocaleString();
        bar.style.width = m === 'mo' ? '65%' : '85%';
      }
    });
  });
})();
/* ===== END CARD 02 ===== */

/* ===== START CARD 03 ===== */
(() => {
  document.querySelectorAll('[data-component="03-live-vis"]').forEach((c) => {
    const val = c.querySelector('.js-val');
    const st = c.querySelector('.js-status');
    let curr = 342;
    setInterval(() => {
      const diff = Math.floor(Math.random() * 11) - 4;
      curr += diff;
      val.textContent = curr;
      if (diff > 3) {
        val.style.color = 'var(--color-success)';
        st.textContent = 'Traffic spiking';
      } else if (diff < -2) {
        val.style.color = 'var(--color-danger)';
        st.textContent = 'Traffic dropping';
      } else {
        val.style.color = 'var(--color-text-main)';
        st.textContent = 'Traffic is stable';
      }
    }, 2500);
  });
})();
/* ===== END CARD 03 ===== */

/* ===== START CARD 04 ===== */
(() => {
  document.querySelectorAll('[data-component="04-multi-kpi"]').forEach((c) => {
    const d = {
      signups: { v: '1,204', t: '+4.2%', c: 'success' },
      churn: { v: '2.1%', t: '-0.5%', c: 'success' },
      cac: { v: '$42', t: '+$5', c: 'danger' },
    };
    const main = c.querySelector('.js-main');
    const tr = c.querySelector('.js-trend');
    const cnt = c.querySelector('.js-content');
    c.addEventListener('click', (e) => {
      if (e.target.classList.contains('multi-kpi__item')) {
        c.querySelectorAll('.multi-kpi__item').forEach((i) => i.classList.remove('active'));
        e.target.classList.add('active');
        const k = e.target.dataset.k;
        cnt.classList.remove('anim-fade');
        void cnt.offsetWidth;
        main.textContent = d[k].v;
        tr.textContent = d[k].t;
        tr.className = `text-sm fw-bold js-trend mb-1 text-${d[k].c}`;
        cnt.classList.add('anim-fade');
      }
    });
  });
})();
/* ===== END CARD 04 ===== */

/* ===== START CARD 05 ===== */
(() => {
  document.querySelectorAll('[data-component="05-goal-cmp"]').forEach((c) => {
    let s = { tot: 0, tar: 10000 };
    const pct = c.querySelector('.js-pct');
    const fill = c.querySelector('.js-fill');
    c.querySelector('.js-add').addEventListener('click', () => {
      const v = +c.querySelector('.js-inp').value;
      if (v > 0) s.tot += v;
      const p = Math.min((s.tot / s.tar) * 100, 100);
      pct.textContent = Math.round(p) + '%';
      fill.style.width = p + '%';
      fill.style.backgroundColor = p === 100 ? 'var(--color-success)' : 'var(--color-primary)';
    });
  });
})();
/* ===== END CARD 05 ===== */

// --- SECTION B: DATA & TABLE ---
/* ===== START CARD 06 ===== */
(() => {
  document.querySelectorAll('[data-component="06-adv-table"]').forEach((c) => {
    let st = {
      d: [
        { i: '1', n: 'Acme', p: 'Pro' },
        { i: '2', n: 'Zeta', p: 'Basic' },
        { i: '3', n: 'Globex', p: 'Ent' },
      ],
      sCol: 'i',
      asc: 1,
    };
    const tb = c.querySelector('.js-tbody');
    const inp = c.querySelector('.js-search');
    const ren = (q = '') => {
      let a = [...st.d].filter((x) => x.n.toLowerCase().includes(q.toLowerCase()));
      a.sort((a, b) => (a[st.sCol] > b[st.sCol] ? (st.asc ? 1 : -1) : st.asc ? -1 : 1));
      tb.innerHTML = a
        .map(
          (x) =>
            `<tr><td class="font-monospace ">#${x.i}</td><td class="fw-bold">${x.n}</td><td><span class="ui-badge ui-badge--soft">${x.p}</span></td></tr>`
        )
        .join('');
    };
    c.addEventListener('click', (e) => {
      const th = e.target.closest('th');
      if (th) {
        if (st.sCol === th.dataset.col) st.asc ^= 1;
        else {
          st.sCol = th.dataset.col;
          st.asc = 1;
        }
        ren(inp.value);
      }
    });
    inp.addEventListener('input', (e) => ren(e.target.value));
    ren();
  });
})();
/* ===== END CARD 06 ===== */

/* ===== START CARD 07 ===== */
(() => {
  document.querySelectorAll('[data-component="07-edit-table"]').forEach((c) => {
    let d = { NODE_ENV: 'production', TIMEOUT: '3000' };
    let ed = null;
    const tb = c.querySelector('.js-tbody');
    const ren = () => {
      tb.innerHTML = Object.keys(d)
        .map(
          (k) =>
            `<tr><td class="text-xs font-monospace ">${k}</td><td class="js-cell" data-k="${k}">${ed === k ? `<input class="edit-tbl__input js-inp" value="${d[k]}">` : `<span class="cursor-pointer text-sm d-block">${d[k]}</span>`}</td></tr>`
        )
        .join('');
      if (ed) c.querySelector('.js-inp')?.focus();
    };
    c.addEventListener('click', (e) => {
      const cell = e.target.closest('.js-cell');
      if (cell && !e.target.classList.contains('js-inp')) {
        ed = cell.dataset.k;
        ren();
      }
    });
    c.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.classList.contains('js-inp')) {
        d[e.target.parentElement.dataset.k] = e.target.value;
        ed = null;
        ren();
      }
    });
    c.addEventListener('focusout', (e) => {
      if (e.target.classList.contains('js-inp')) {
        d[e.target.parentElement.dataset.k] = e.target.value;
        ed = null;
        ren();
      }
    });
    ren();
  });
})();
/* ===== END CARD 07 ===== */

/* ===== START CARD 08 ===== */
(() => {
  document.querySelectorAll('[data-component="08-col-toggle"]').forEach((c) => {
    const m = c.querySelector('.js-menu');
    const t = c.querySelector('.js-tbl');
    let cols = [1, 1, 1, 1];
    const lbls = ['Time', 'Level', 'Event', 'IP'];
    c.querySelector('.js-tog-btn').addEventListener('click', () => m.classList.toggle('open'));
    const ren = () => {
      m.innerHTML = cols
        .map(
          (v, i) =>
            `<label class="text-sm d-flex gap-2"><input type="checkbox" class="js-chk" data-i="${i}" ${v ? 'checked' : ''}> ${lbls[i]}</label>`
        )
        .join('');
      cols.forEach((v, i) =>
        t
          .querySelectorAll(`[data-col="${i}"]`)
          .forEach((el) => (el.style.display = v ? 'table-cell' : 'none'))
      );
    };
    m.addEventListener('change', (e) => {
      if (e.target.classList.contains('js-chk')) {
        cols[e.target.dataset.i] = e.target.checked ? 1 : 0;
        ren();
      }
    });
    ren();
  });
})();
/* ===== END CARD 08 ===== */

/* ===== START CARD 09 ===== */
(() => {
  document.querySelectorAll('[data-component="09-csv-export"]').forEach((c) => {
    const d = 'id,name,status\n1,Alice,active\n2,Bob,pending';
    c.querySelector('.js-prev').textContent = d;
    c.querySelector('.js-btn').addEventListener('click', (e) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([d], { type: 'text/csv' }));
      a.download = 'export.csv';
      a.click();
      e.target.innerHTML = '<i class="bi bi-check"></i> Downloaded';
    });
  });
})();
/* ===== END CARD 09 ===== */

/* ===== START CARD 10 ===== */
(() => {
  document.querySelectorAll('[data-component="10-filter-tag"]').forEach((c) => {
    let tags = new Set();
    const w = c.querySelector('.js-tags');
    const tb = c.querySelector('.js-tbody');
    const d = [
      { id: 'INV-1', s: 'Paid' },
      { id: 'INV-2', s: 'Pending' },
    ];
    const ren = () => {
      w.innerHTML = [...tags]
        .map(
          (t) =>
            `<span class="flt-tag">${t} <i class="bi bi-x cursor-pointer text-muted js-rm" data-v="${t}"></i></span>`
        )
        .join('');
      let filt = d;
      if (tags.has('Paid')) filt = filt.filter((x) => x.s === 'Paid');
      if (tags.has('Pending')) filt = filt.filter((x) => x.s === 'Pending');
      if (tags.has('Paid') && tags.has('Pending')) filt = d;
      tb.innerHTML = filt
        .map(
          (x) =>
            `<tr><td class="font-monospace text-xs">${x.id}</td><td><span class="ui-badge ui-badge--soft">${x.s}</span></td></tr>`
        )
        .join('');
    };
    c.querySelector('.js-sel').addEventListener('change', (e) => {
      if (e.target.value) {
        tags.add(e.target.value);
        e.target.value = '';
        ren();
      }
    });
    c.addEventListener('click', (e) => {
      if (e.target.classList.contains('js-rm')) {
        tags.delete(e.target.dataset.v);
        ren();
      }
    });
    ren();
  });
})();
/* ===== END CARD 10 ===== */

// --- SECTION C: PRODUCTIVITY ---
/* ===== START CARD 11 ===== */
(() => {
  document.querySelectorAll('[data-component="11-task-mgr"]').forEach((c) => {
    let t = JSON.parse(
      localStorage.getItem('saas_tasks') || '[{ "id": 1, "txt": "Review PR", "done": false }]'
    );
    const l = c.querySelector('.js-list');
    const i = c.querySelector('.js-inp');
    const ren = () => {
      localStorage.setItem('saas_tasks', JSON.stringify(t));
      l.innerHTML = t
        .map(
          (x) =>
            `<div class="task-mgr__item ${x.done ? 'done' : ''}"><div class="task-mgr__chk js-tgl" data-id="${x.id}"><i class="bi bi-check"></i></div><span class="task-mgr__txt">${x.txt}</span><i class="bi bi-trash text-danger ms-auto cursor-pointer js-del" data-id="${x.id}"></i></div>`
        )
        .join('');
    };
    c.querySelector('.js-add').addEventListener('click', () => {
      if (i.value) {
        t.push({ id: Date.now(), txt: i.value, done: false });
        i.value = '';
        ren();
      }
    });
    c.addEventListener('click', (e) => {
      if (e.target.closest('.js-tgl')) {
        const id = +e.target.closest('.js-tgl').dataset.id;
        const x = t.find((a) => a.id === id);
        if (x) x.done = !x.done;
        ren();
      }
      if (e.target.classList.contains('js-del')) {
        t = t.filter((x) => x.id !== +e.target.dataset.id);
        ren();
      }
    });
    ren();
  });
})();
/* ===== END CARD 11 ===== */

/* ===== START CARD 12 ===== */
(() => {
  document.querySelectorAll('[data-component="12-dnd-list"]').forEach((c) => {
    const l = c.querySelector('.js-list');
    let drg = null;
    l.addEventListener('dragstart', (e) => {
      drg = e.target;
      e.target.classList.add('dragging');
    });
    l.addEventListener('dragend', (e) => e.target.classList.remove('dragging'));
    l.addEventListener('dragover', (e) => {
      e.preventDefault();
      const after = [...l.querySelectorAll('.dnd-list__item:not(.dragging)')].find(
        (el) => e.clientY < el.getBoundingClientRect().top + el.offsetHeight / 2
      );
      if (after) l.insertBefore(drg, after);
      else l.appendChild(drg);
    });
  });
})();
/* ===== END CARD 12 ===== */

/* ===== START CARD 13 ===== */
(() => {
  document.querySelectorAll('[data-component="13-mini-kanban"]').forEach((c) => {
    let t = [
      { i: 1, s: 'todo', x: 'API Docs' },
      { i: 2, s: 'doing', x: 'Auth logic' },
    ];
    let drg = null;
    const ren = () => {
      c.querySelectorAll('.js-col').forEach((col) => {
        col.querySelector('.js-items').innerHTML = t
          .filter((x) => x.s === col.dataset.status)
          .map(
            (x) => `<div class="kanban__card js-drg" draggable="true" data-i="${x.i}">${x.x}</div>`
          )
          .join('');
      });
    };
    c.addEventListener('dragstart', (e) => {
      if (e.target.classList.contains('js-drg')) {
        drg = e.target.dataset.i;
        e.target.style.opacity = '0.5';
      }
    });
    c.addEventListener('dragend', (e) => {
      if (e.target.classList.contains('js-drg')) e.target.style.opacity = '1';
    });
    c.querySelectorAll('.js-col').forEach((col) => {
      col.addEventListener('dragover', (e) => {
        e.preventDefault();
        col.classList.add('dragover');
      });
      col.addEventListener('dragleave', () => col.classList.remove('dragover'));
      col.addEventListener('drop', () => {
        col.classList.remove('dragover');
        if (drg) {
          const o = t.find((x) => x.i == drg);
          if (o) o.s = col.dataset.status;
          ren();
        }
      });
    });
    ren();
  });
})();
/* ===== END CARD 13 ===== */

/* ===== START CARD 14 ===== */
(() => {
  document.querySelectorAll('[data-component="14-notes"]').forEach((c) => {
    const a = c.querySelector('.js-area');
    const lbl = c.querySelector('.js-save-lbl');
    const cnt = c.querySelector('.js-count');
    a.value = localStorage.getItem('saas_nt') || '';
    cnt.textContent = `${a.value.length} chars`;
    let tm;
    a.addEventListener('input', (e) => {
      cnt.textContent = `${e.target.value.length} chars`;
      clearTimeout(tm);
      lbl.style.opacity = 0;
      tm = setTimeout(() => {
        localStorage.setItem('saas_nt', e.target.value);
        lbl.style.opacity = 1;
        setTimeout(() => (lbl.style.opacity = 0), 1500);
      }, 500);
    });
  });
})();
/* ===== END CARD 14 ===== */

/* ===== START CARD 15 ===== */
(() => {
  document.querySelectorAll('[data-component="15-focus-timer"]').forEach((c) => {
    let st = { t: 25 * 60, r: false, id: null };
    const f = c.querySelector('.js-fill');
    const tm = c.querySelector('.js-time');
    const btn = c.querySelector('.js-tgl');
    const ren = () => {
      tm.textContent = `${Math.floor(st.t / 60)
        .toString()
        .padStart(2, '0')}:${(st.t % 60).toString().padStart(2, '0')}`;
      f.style.strokeDasharray = `${(st.t / (25 * 60)) * 100}, 100`;
      btn.textContent = st.r ? 'Pause' : 'Start';
    };
    const tick = () => {
      if (st.t > 0) {
        st.t--;
        ren();
      } else clearInterval(st.id);
    };
    btn.addEventListener('click', () => {
      st.r = !st.r;
      if (st.r) st.id = setInterval(tick, 1000);
      else clearInterval(st.id);
      ren();
    });
    c.querySelector('.js-rst').addEventListener('click', () => {
      clearInterval(st.id);
      st = { t: 25 * 60, r: false, id: null };
      ren();
    });
  });
})();
/* ===== END CARD 15 ===== */

// --- SECTION D: FINANCE & SYSTEM ---
/* ===== START CARD 16 ===== */
(() => {
  document.querySelectorAll('[data-component="16-rev-chart"]').forEach((c) => {
    const ren = (yr) => {
      const h = yr === '2026' ? [30, 50, 80, 60] : [20, 40, 30, 50];
      c.querySelector('.js-chart').innerHTML = h
        .map((v) => `<div class="chart-sim__bar" style="height:${v}%"></div>`)
        .join('');
    };
    c.querySelector('.js-sel').addEventListener('change', (e) => ren(e.target.value));
    ren('2025');
  });
})();
/* ===== END CARD 16 ===== */

/* ===== START CARD 17 ===== */
(() => {
  document.querySelectorAll('[data-component="17-tx-log"]').forEach((c) => {
    let d = [{ i: 'tx_01', t: 'Charge', a: '+$49' }];
    const l = c.querySelector('.js-list');
    const ren = () =>
      (l.innerHTML = d
        .map(
          (x) =>
            `<div class="tx-log__row"><span class="font-monospace text-xs ">${x.i}</span><span class="text-sm fw-bold">${x.t}</span><span class="text-success fw-bold text-sm">${x.a}</span></div>`
        )
        .join(''));
    c.querySelector('.js-add').addEventListener('click', () => {
      d.unshift({
        i: `tx_${Math.floor(Math.random() * 100)}`,
        t: 'Charge',
        a: '+$' + Math.floor(Math.random() * 99),
      });
      if (d.length > 5) d.pop();
      ren();
    });
    ren();
  });
})();
/* ===== END CARD 17 ===== */

/* ===== START CARD 18 ===== */
(() => {
  document.querySelectorAll('[data-component="18-api-tester"]').forEach((c) => {
    const res = c.querySelector('.js-res');
    const btn = c.querySelector('.js-btn');
    btn.addEventListener('click', () => {
      btn.disabled = true;
      res.textContent = 'Fetching...';
      setTimeout(() => {
        btn.disabled = false;
        res.textContent = `200 OK\n{\n  "data": "success",\n  "ms": 42\n}`;
      }, 600);
    });
  });
})();
/* ===== END CARD 18 ===== */

/* ===== START CARD 19 ===== */
(() => {
  document.querySelectorAll('[data-component="19-sys-gauge"]').forEach((c) => {
    const f = c.querySelector('.js-fill');
    const v = c.querySelector('.js-val');
    c.querySelector('.js-btn').addEventListener('click', (e) => {
      e.target.disabled = true;
      f.style.transform = 'rotate(-135deg)';
      v.textContent = '0%';
      setTimeout(() => {
        const p = Math.floor(Math.random() * 40 + 20);
        f.style.transform = `rotate(${-135 + (p / 100) * 180}deg)`;
        v.textContent = `${p}%`;
        f.style.borderTopColor = p > 50 ? 'var(--color-warning)' : 'var(--color-success)';
        f.style.borderLeftColor = p > 50 ? 'var(--color-warning)' : 'var(--color-success)';
        e.target.disabled = false;
      }, 500);
    });
  });
})();
/* ===== END CARD 19 ===== */

/* ===== START CARD 20 ===== */
(() => {
  document.querySelectorAll('[data-component="20-err-log"]').forEach((c) => {
    const b = c.querySelector('.js-box');
    const m = ['[INFO] DB Sync OK', '[WARN] High CPU node-2', '[ERR] 502 Timeout'];
    setInterval(() => {
      const msg = m[Math.floor(Math.random() * m.length)];
      let cl = 'text-muted';
      if (msg.includes('ERR')) cl = 'text-danger fw-bold';
      if (msg.includes('WARN')) cl = 'text-warning';
      b.innerHTML += `<div class="${cl}">${msg}</div>`;
      b.scrollTop = b.scrollHeight;
    }, 3000);
  });
})();
/* ===== END CARD 20 ===== */

// --- SECTION E: USER & CONTROL ---
/* ===== START CARD 21 ===== */
(() => {
  document.querySelectorAll('[data-component="21-usr-dir"]').forEach((c) => {
    let u = [
      { n: 'Alice M.', r: 'Admin' },
      { n: 'Bob T.', r: 'User' },
    ];
    const l = c.querySelector('.js-list');
    const ren = (q = '') =>
      (l.innerHTML = u
        .filter((x) => x.n.toLowerCase().includes(q))
        .map(
          (x) =>
            `<div class="usr-dir__item"><div class="usr-dir__av">${x.n[0]}</div><div class="flex-grow-1"><div class="text-sm fw-bold">${x.n}</div><div class="text-xs text-muted">${x.r}</div></div><button class="ui-btn py-0 px-2 text-xs ui-btn--outline">View</button></div>`
        )
        .join(''));
    c.querySelector('.js-inp').addEventListener('input', (e) => ren(e.target.value.toLowerCase()));
    ren();
  });
})();
/* ===== END CARD 21 ===== */

/* ===== START CARD 22 ===== */
(() => {
  document.querySelectorAll('[data-component="22-role-perm"]').forEach((c) => {
    let p = [
      { l: 'Public API', v: true },
      { l: 'Invite Users', v: false },
    ];
    c.querySelector('.js-list').innerHTML = p
      .map(
        (x, i) =>
          `<div class="role-perm__row"><span class="text-sm fw-bold">${x.l}</span><div class="ui-toggle js-tgl ${x.v ? 'active' : ''}" data-i="${i}"></div></div>`
      )
      .join('');
    c.addEventListener('click', (e) => {
      if (e.target.classList.contains('js-tgl')) {
        e.target.classList.toggle('active');
        c.querySelector('.js-msg').textContent = 'Saved just now.';
      }
    });
  });
})();
/* ===== END CARD 22 ===== */

/* ===== START CARD 23 ===== */
(() => {
  document.querySelectorAll('[data-component="23-feat-flag"]').forEach((c) => {
    const m = c.querySelector('.js-tgl-master');
    const d = c.querySelector('.js-tgl-dep');
    const b = c.querySelector('.js-dep-box');
    m.addEventListener('click', () => {
      const a = m.classList.toggle('active');
      b.classList.toggle('disabled', !a);
      if (!a) d.classList.remove('active');
    });
    d.addEventListener('click', () => {
      if (!b.classList.contains('disabled')) d.classList.toggle('active');
    });
  });
})();
/* ===== END CARD 23 ===== */

/* ===== START CARD 24 ===== */
(() => {
  document.querySelectorAll('[data-component="24-maint-mode"]').forEach((c) => {
    const t = c.querySelector('.js-tgl');
    const b = c.querySelector('.js-banner');
    const cd = c.querySelector('.js-card');
    t.addEventListener('click', () => {
      const a = t.classList.toggle('active');
      b.classList.toggle('active', !a);
      cd.style.borderColor = a ? 'var(--color-border)' : 'var(--color-danger)';
    });
  });
})();
/* ===== END CARD 24 ===== */

/* ===== START CARD 25 ===== */
(() => {
  document.querySelectorAll('[data-component="25-notif-ctr"]').forEach((c) => {
    let n = [
      { id: 1, t: 'Payment failed', r: false },
      { id: 2, t: 'Welcome aboard', r: true },
    ];
    const l = c.querySelector('.js-list');
    const bdg = c.querySelector('.js-badge');
    const ren = () => {
      l.innerHTML = n
        .map(
          (x) =>
            `<div class="notif-ctr__item js-it ${x.r ? '' : 'unread'}" data-i="${x.id}"><div class="text-sm fw-bold">${x.t}</div></div>`
        )
        .join('');
      const u = n.filter((x) => !x.r).length;
      bdg.textContent = u;
      bdg.style.display = u ? 'block' : 'none';
    };
    c.addEventListener('click', (e) => {
      const it = e.target.closest('.js-it');
      if (it) {
        const o = n.find((x) => x.id == it.dataset.i);
        if (o) o.r = true;
        ren();
      }
    });
    c.querySelector('.js-read-all').addEventListener('click', () => {
      n.forEach((x) => (x.r = true));
      ren();
    });
    ren();
  });
})();
/* ===== END CARD 25 ===== */

// --- SECTION F: INTERACTION & UI ---
/* ===== START CARD 26 ===== */
(() => {
  document.querySelectorAll('[data-component="26-expandable"]').forEach((c) => {
    const cd = c.querySelector('.js-card');
    const tr = c.querySelector('.js-trig');
    tr.addEventListener('click', () => {
      const o = cd.classList.toggle('open');
      tr.setAttribute('aria-expanded', o);
    });
  });
})();
/* ===== END CARD 26 ===== */

/* ===== START CARD 27 ===== */
(() => {
  document.querySelectorAll('[data-component="27-tabs"]').forEach((c) => {
    c.addEventListener('click', (e) => {
      if (e.target.classList.contains('js-tab')) {
        c.querySelectorAll('.js-tab').forEach((t) =>
          t.classList.remove('active', 'border-primary')
        );
        e.target.classList.add('active', 'border-primary');
        c.querySelectorAll('.js-pane').forEach((p) => p.classList.remove('active'));
        c.querySelector(`#${e.target.dataset.target}`).classList.add('active');
      }
    });
  });
})();
/* ===== END CARD 27 ===== */

/* ===== START CARD 28 ===== */
(() => {
  document.querySelectorAll('[data-component="28-accordion"]').forEach((c) => {
    c.addEventListener('click', (e) => {
      const t = e.target.closest('.js-trig');
      if (t) {
        const it = t.parentElement;
        const o = it.classList.contains('open');
        c.querySelectorAll('.acc-ui__item').forEach((x) =>
          x.classList.remove('open', 'text-primary')
        );
        if (!o) {
          it.classList.add('open');
          t.querySelector('i').className = 'bi bi-dash';
        } else {
          t.querySelector('i').className = 'bi bi-plus';
        }
      }
    });
  });
})();
/* ===== END CARD 28 ===== */

/* ===== START CARD 29 ===== */
(() => {
  document.querySelectorAll('[data-component="29-modal-trig"]').forEach((c) => {
    const ov = c.querySelector('.js-overlay');
    c.querySelector('.js-open').addEventListener('click', () => ov.classList.add('open'));
    c.addEventListener('click', (e) => {
      if (e.target.classList.contains('js-close') || e.target.classList.contains('js-confirm'))
        ov.classList.remove('open');
    });
    ov.addEventListener('click', (e) => {
      if (e.target === ov) ov.classList.remove('open');
    });
  });
})();
/* ===== END CARD 29 ===== */

/* ===== START CARD 30 ===== */
// (() => {
//   document.querySelectorAll('[data-component="30-theme-sw"]').forEach((c) => {
//     c.addEventListener('click', (e) => {
//       const b = e.target.closest('.js-btn');
//       if (b) {
//         c.querySelectorAll('.js-btn').forEach((x) => x.classList.remove('active'));
//         b.classList.add('active');
//         document.documentElement.setAttribute('data-theme', b.dataset.theme);
//       }
//     });
//   });
// })();
/* ===== END CARD 30 ===== */

// --- SECTION G: ADVANCED ---
/* ===== START CARD 31 ===== */
(() => {
  document.querySelectorAll('[data-component="31-file-up"]').forEach((c) => {
    let f = [];
    const l = c.querySelector('.js-list');
    const i = c.querySelector('.js-inp');
    const ren = () =>
      (l.innerHTML = f
        .map(
          (x, idx) =>
            `<div class="p-2 border rounded text-sm d-flex justify-content-between"><span>${x.name}</span><i class="bi bi-x cursor-pointer text-danger js-rm" data-i="${idx}"></i></div>`
        )
        .join(''));
    c.querySelector('.js-drop').addEventListener('click', () => i.click());
    i.addEventListener('change', (e) => {
      f = [...f, ...Array.from(e.target.files)];
      ren();
    });
    c.addEventListener('click', (e) => {
      if (e.target.classList.contains('js-rm')) {
        f.splice(e.target.dataset.i, 1);
        ren();
      }
    });
  });
})();
/* ===== END CARD 31 ===== */

/* ===== START CARD 32 ===== */
(() => {
  document.querySelectorAll('[data-component="32-up-prog"]').forEach((c) => {
    const b = c.querySelector('.js-btn');
    const w = c.querySelector('.js-wrap');
    const bar = c.querySelector('.js-bar');
    const pt = c.querySelector('.js-pct');
    b.addEventListener('click', () => {
      b.style.display = 'none';
      w.style.display = 'block';
      let p = 0;
      const int = setInterval(() => {
        p += 10;
        bar.style.width = p + '%';
        pt.textContent = p + '%';
        if (p >= 100) {
          clearInterval(int);
          setTimeout(() => {
            w.style.display = 'none';
            b.style.display = 'block';
            b.textContent = 'Done!';
            bar.style.width = '0%';
          }, 1000);
        }
      }, 200);
    });
  });
})();
/* ===== END CARD 32 ===== */

/* ===== START CARD 33 ===== */
(() => {
  document.querySelectorAll('[data-component="33-ldr-bd"]').forEach((c) => {
    let d = [
      { n: 'Jane', s: 95 },
      { n: 'Bob', s: 82 },
      { n: 'Alex', s: 88 },
    ];
    let asc = false;
    const ren = () => {
      d.sort((a, b) => (asc ? a.s - b.s : b.s - a.s));
      c.querySelector('.js-list').innerHTML = d
        .map(
          (x, i) =>
            `<div class="ldr-bd__row"><span class="ldr-bd__rank">${i + 1}</span><span class="text-sm fw-bold flex-grow-1">${x.n}</span><span class="ui-badge ui-badge--soft">${x.s}</span></div>`
        )
        .join('');
    };
    c.querySelector('.js-sort').addEventListener('click', () => {
      asc = !asc;
      ren();
    });
    ren();
  });
})();
/* ===== END CARD 33 ===== */

/* ===== START CARD 34 ===== */
(() => {
  document.querySelectorAll('[data-component="34-act-feed"]').forEach((c) => {
    const b = c.querySelector('.js-box');
    const m = ['Deployed v1.2', 'DB Migrated', 'Cache Purged'];
    setInterval(() => {
      b.innerHTML =
        `<div class="act-feed__item anim-fade"><div class="act-feed__dot"></div><div><div class="text-sm fw-bold">${m[Math.floor(Math.random() * m.length)]}</div><div class="text-xs text-muted">Just now</div></div></div>` +
        b.innerHTML;
    }, 3500);
  });
})();
/* ===== END CARD 34 ===== */

/* ===== START CARD 35 ===== */
(() => {
  document.querySelectorAll('[data-component="35-bdg-plan"]').forEach((c) => {
    let s = 0;
    const limit = 10000;
    const tot = c.querySelector('.js-tot');
    const bar = c.querySelector('.js-bar');
    c.querySelector('.js-add').addEventListener('click', () => {
      const a = +c.querySelector('.js-amt').value;
      if (a > 0) s += a;
      tot.textContent = '$' + s.toLocaleString();
      c.querySelector('.js-amt').value = '';
      c.querySelector('.js-lbl').value = '';
      const p = Math.min((s / limit) * 100, 100);
      bar.style.width = p + '%';
      if (s > limit) {
        tot.classList.replace('text-main', 'text-danger');
        bar.style.backgroundColor = 'var(--color-danger)';
      }
    });
  });
})();
/* ===== END CARD 35 ===== */
