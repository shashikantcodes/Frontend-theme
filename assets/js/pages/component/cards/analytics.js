/* ===============================
           CARD 01 – REVENUE (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-01');
  if (!ctx) return;
  let chart;
  const init = () => {
    const style = getComputedStyle(document.documentElement);
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
          {
            data: [10, 25, 20, 40, 35, 50, 45],
            borderColor: style.getPropertyValue('--color-success').trim(),
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 02 – PROFIT (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-02');
  if (!ctx) return;
  let chart;
  const init = () => {
    const style = getComputedStyle(document.documentElement);
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
          {
            data: [5, 15, 10, 20, 18, 30, 28],
            borderColor: style.getPropertyValue('--color-primary').trim(),
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 03 – EXPENSES (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-03');
  if (!ctx) return;
  let chart;
  const init = () => {
    const style = getComputedStyle(document.documentElement);
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
          {
            data: [40, 38, 42, 35, 33, 30, 28],
            borderColor: style.getPropertyValue('--color-danger').trim(),
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 04 – ORDERS (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-04');
  if (!ctx) return;
  let chart;
  const init = () => {
    const style = getComputedStyle(document.documentElement);
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
          {
            data: [100, 120, 110, 140, 160, 180, 200],
            borderColor: style.getPropertyValue('--color-info').trim(),
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 05 – USERS (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-05');
  if (!ctx) return;
  let chart;
  const init = () => {
    const style = getComputedStyle(document.documentElement);
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
          {
            data: [800, 820, 830, 850, 860, 880, 892],
            borderColor: style.getPropertyValue('--color-secondary').trim(),
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 06 – ACTIVE USERS (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-06');
  if (!ctx) return;
  let chart;
  const init = () => {
    const style = getComputedStyle(document.documentElement);
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
          {
            data: [310, 312, 311, 313, 310, 312, 312],
            borderColor: style.getPropertyValue('--color-warning').trim(),
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 07 – CONVERSION (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-07');
  if (!ctx) return;
  let chart;
  const init = () => {
    const style = getComputedStyle(document.documentElement);
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
          {
            data: [3.5, 3.8, 4.0, 3.9, 4.2, 4.5, 4.8],
            borderColor: style.getPropertyValue('--color-success').trim(),
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 08 – BOUNCE RATE (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-08');
  if (!ctx) return;
  let chart;
  const init = () => {
    const style = getComputedStyle(document.documentElement);
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
          {
            data: [38, 36, 37, 35, 34, 33, 32.4],
            borderColor: style.getPropertyValue('--color-danger').trim(),
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 09 – AVG ORDER (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-09');
  if (!ctx) return;
  let chart;
  const init = () => {
    const style = getComputedStyle(document.documentElement);
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
          {
            data: [120, 125, 122, 130, 135, 140, 145],
            borderColor: style.getPropertyValue('--color-primary').trim(),
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 10 – NEW CUSTOMERS (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-10');
  if (!ctx) return;
  let chart;
  const init = () => {
    const style = getComputedStyle(document.documentElement);
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
          {
            data: [1000, 1050, 1100, 1080, 1150, 1200, 1245],
            borderColor: style.getPropertyValue('--color-info').trim(),
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 11 – LINE CHART (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-11');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Growth',
            data: [150, 200, 180, 250, 300, 450],
            borderColor: s.getPropertyValue('--color-primary').trim(),
            backgroundColor: s.getPropertyValue('--color-bg-soft').trim(),
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { labels: { color: tc } } },
        scales: {
          x: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
          y: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
        },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 12 – BAR CHART (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-12');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['W1', 'W2', 'W3', 'W4'],
        datasets: [
          {
            label: 'Signups',
            data: [120, 190, 300, 250],
            backgroundColor: s.getPropertyValue('--color-info').trim(),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { labels: { color: tc } } },
        scales: {
          x: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
          y: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
        },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 13 – STACKED BAR (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-13');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Organic',
            data: [30, 40, 50, 60],
            backgroundColor: s.getPropertyValue('--color-primary').trim(),
          },
          {
            label: 'Paid',
            data: [20, 30, 40, 30],
            backgroundColor: s.getPropertyValue('--color-secondary').trim(),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { labels: { color: tc } } },
        scales: {
          x: {
            stacked: true,
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
          y: {
            stacked: true,
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
        },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 14 – AREA CHART (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-14');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        datasets: [
          {
            label: 'Load %',
            data: [20, 15, 60, 85, 45, 30],
            borderColor: s.getPropertyValue('--color-warning').trim(),
            backgroundColor: s.getPropertyValue('--color-warning').trim() + '40',
            fill: true,
            tension: 0.2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { labels: { color: tc } } },
        scales: {
          x: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
          y: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
        },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 15 – RADAR CHART (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-15');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Speed', 'Reliability', 'Security', 'UX', 'Support'],
        datasets: [
          {
            label: 'Score',
            data: [90, 85, 95, 80, 70],
            borderColor: s.getPropertyValue('--color-secondary').trim(),
            backgroundColor: s.getPropertyValue('--color-secondary').trim() + '40',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { labels: { color: tc } } },
        scales: {
          r: {
            ticks: { display: false },
            grid: { color: s.getPropertyValue('--color-border').trim() },
            pointLabels: { color: tc },
          },
        },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 16 – PIE CHART (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-16');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['US', 'EU', 'Asia', 'Other'],
        datasets: [
          {
            data: [45, 25, 20, 10],
            backgroundColor: [
              s.getPropertyValue('--color-primary').trim(),
              s.getPropertyValue('--color-secondary').trim(),
              s.getPropertyValue('--color-info').trim(),
              s.getPropertyValue('--color-warning').trim(),
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { position: 'right', labels: { color: tc } } },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 17 – DONUT CHART (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-17');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Mobile', 'Desktop', 'Tablet'],
        datasets: [
          {
            data: [60, 30, 10],
            backgroundColor: [
              s.getPropertyValue('--color-primary').trim(),
              s.getPropertyValue('--color-info').trim(),
              s.getPropertyValue('--color-warning').trim(),
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { position: 'right', labels: { color: tc } } },
        cutout: '70%',
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 18 – MIXED CHART (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-18');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
          {
            type: 'line',
            label: 'Target',
            data: [200, 220, 250, 280],
            borderColor: s.getPropertyValue('--color-danger').trim(),
            fill: false,
          },
          {
            type: 'bar',
            label: 'Actual',
            data: [180, 230, 240, 300],
            backgroundColor: s.getPropertyValue('--color-success').trim(),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { labels: { color: tc } } },
        scales: {
          x: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
          y: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
        },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 19 – HEATMAP GRID (JS)
        ================================ */
(() => {
  const hm = document.getElementById('hm-19');
  if (!hm) return;
  const init = () => {
    hm.innerHTML = '';
    const s = getComputedStyle(document.documentElement);
    const bg = s.getPropertyValue('--color-primary').trim();
    for (let i = 0; i < 28; i++) {
      const op = (Math.floor(Math.random() * 10 + 1) * 10) / 100;
      const d = document.createElement('div');
      d.className = 'cell';
      d.style.backgroundColor = bg;
      d.style.opacity = op;
      hm.appendChild(d);
    }
  };
  init();
  document.addEventListener('themeChanged', init);
})();

/* ===============================
           CARD 20 – COMPARISON CHART (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-20');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Us', 'Comp A', 'Comp B'],
        datasets: [
          {
            label: 'Market Share %',
            data: [45, 30, 25],
            backgroundColor: [
              s.getPropertyValue('--color-primary').trim(),
              s.getPropertyValue('--color-bg-soft').trim(),
              s.getPropertyValue('--color-bg-soft').trim(),
            ],
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { labels: { color: tc } } },
        scales: {
          x: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
          y: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
        },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 21 – MONTHLY REVENUE (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-21');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Revenue ($)',
            data: [12000, 15000, 18000, 14000, 20000, 24000],
            backgroundColor: s.getPropertyValue('--color-success').trim(),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { labels: { color: tc } } },
        scales: {
          x: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
          y: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
        },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 22 – QUARTERLY PROFIT (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-22');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Margin %',
            data: [15, 18, 22, 25],
            borderColor: s.getPropertyValue('--color-primary').trim(),
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { labels: { color: tc } } },
        scales: {
          x: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
          y: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
        },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 23 – EXPENSE BREAKDOWN (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-23');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Payroll', 'Marketing', 'Infra', 'Office'],
        datasets: [
          {
            data: [50, 20, 15, 15],
            backgroundColor: [
              s.getPropertyValue('--color-secondary').trim(),
              s.getPropertyValue('--color-primary').trim(),
              s.getPropertyValue('--color-info').trim(),
              s.getPropertyValue('--color-warning').trim(),
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { position: 'right', labels: { color: tc } } },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 24 – CASH FLOW (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-24');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Start', 'Inflow', 'Outflow', 'End'],
        datasets: [
          {
            label: 'Cash Flow',
            data: [50000, 30000, -20000, 60000],
            backgroundColor: [
              s.getPropertyValue('--color-bg-soft').trim(),
              s.getPropertyValue('--color-success').trim(),
              s.getPropertyValue('--color-danger').trim(),
              s.getPropertyValue('--color-primary').trim(),
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { labels: { color: tc } } },
        scales: {
          x: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
          y: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
        },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 25 – INVOICE STATUS (JS)
        ================================ */
(() => {
  /* purely HTML/CSS */
})();

/* ===============================
           CARD 26 – PAYMENT METHODS (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-26');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Credit Card', 'PayPal', 'Crypto', 'Wire'],
        datasets: [
          {
            data: [60, 25, 10, 5],
            backgroundColor: [
              s.getPropertyValue('--color-primary').trim(),
              s.getPropertyValue('--color-info').trim(),
              s.getPropertyValue('--color-warning').trim(),
              s.getPropertyValue('--color-secondary').trim(),
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { position: 'right', labels: { color: tc } } },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 27 – TAX OVERVIEW (JS)
        ================================ */
(() => {
  /* purely HTML/CSS */
})();

/* ===============================
           CARD 28 – NET MARGIN (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-28');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Net Margin', 'Costs'],
        datasets: [
          {
            data: [24, 76],
            backgroundColor: [
              s.getPropertyValue('--color-success').trim(),
              s.getPropertyValue('--color-bg-soft').trim(),
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        rotation: -90,
        circumference: 180,
        plugins: { legend: { display: false } },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 29 – SESSIONS (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-29');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [
          {
            label: 'Avg Session (m)',
            data: [2.5, 3.1, 2.8, 4.2, 3.9, 5.5, 6.1],
            borderColor: s.getPropertyValue('--color-primary').trim(),
            backgroundColor: s.getPropertyValue('--color-primary').trim() + '30',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { labels: { color: tc } } },
        scales: {
          x: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
          y: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
        },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 30 – PAGE VIEWS (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-30');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['0-6h', '6-12h', '12-18h', '18-24h'],
        datasets: [
          {
            label: 'Views',
            data: [1200, 4500, 6800, 3200],
            backgroundColor: s.getPropertyValue('--color-info').trim(),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { labels: { color: tc } } },
        scales: {
          x: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
          y: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
        },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 31 – TOP PAGES (JS)
        ================================ */
(() => {
  /* purely HTML/CSS */
})();

/* ===============================
           CARD 32 – TRAFFIC SOURCE (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-32');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Direct', 'Social', 'Referral', 'Organic'],
        datasets: [
          {
            data: [40, 25, 15, 20],
            backgroundColor: [
              s.getPropertyValue('--color-primary').trim(),
              s.getPropertyValue('--color-secondary').trim(),
              s.getPropertyValue('--color-warning').trim(),
              s.getPropertyValue('--color-success').trim(),
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { position: 'right', labels: { color: tc } } },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 33 – DEVICE DIST (JS)
        ================================ */
(() => {
  /* purely HTML/CSS */
})();

/* ===============================
           CARD 34 – LIVE VISITORS (JS)
        ================================ */
(() => {
  /* purely HTML/CSS */
})();

/* ===============================
           CARD 35 – ACTIVITY (JS)
        ================================ */
(() => {
  /* purely HTML/CSS */
})();

/* ===============================
           CARD 36 – TOP PRODUCTS (JS)
        ================================ */
(() => {
  /* purely HTML/CSS */
})();

/* ===============================
           CARD 37 – SALES FUNNEL (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-37');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Leads', 'Qualified', 'Proposals', 'Won'],
        datasets: [
          {
            label: 'Count',
            data: [1000, 600, 200, 50],
            backgroundColor: [
              s.getPropertyValue('--color-primary').trim(),
              s.getPropertyValue('--color-info').trim(),
              s.getPropertyValue('--color-warning').trim(),
              s.getPropertyValue('--color-success').trim(),
            ],
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
          y: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
        },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 38 – TARGET (JS)
        ================================ */
(() => {
  /* purely HTML/CSS */
})();

/* ===============================
           CARD 39 – REGION (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-39');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: ['North', 'South', 'East', 'West'],
        datasets: [
          {
            data: [80, 50, 60, 90],
            backgroundColor: [
              s.getPropertyValue('--color-primary').trim(),
              s.getPropertyValue('--color-secondary').trim(),
              s.getPropertyValue('--color-info').trim(),
              s.getPropertyValue('--color-warning').trim(),
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { position: 'right', labels: { color: tc } } },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 40 – LEADERBOARD (JS)
        ================================ */
(() => {
  /* purely HTML/CSS */
})();

/* ===============================
           CARD 41 – RETENTION (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-41');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
        datasets: [
          {
            label: 'Cohort A',
            data: [100, 80, 65, 50, 45, 40],
            borderColor: s.getPropertyValue('--color-primary').trim(),
            tension: 0.4,
          },
          {
            label: 'Cohort B',
            data: [100, 85, 75, 65, 60, 55],
            borderColor: s.getPropertyValue('--color-success').trim(),
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { labels: { color: tc } } },
        scales: {
          x: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
          y: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
        },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 42 – FORECAST (JS)
        ================================ */
(() => {
  const ctx = document.getElementById('c-42');
  if (!ctx) return;
  let chart;
  const init = () => {
    const s = getComputedStyle(document.documentElement);
    const tc = s.getPropertyValue('--color-text-light').trim();
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May (Proj)'],
        datasets: [
          {
            label: 'MRR',
            data: [100, 120, 140, 150, 180],
            borderColor: s.getPropertyValue('--color-secondary').trim(),
            segment: { borderDash: (c) => (c.p0DataIndex >= 3 ? [5, 5] : undefined) },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: tc,
        plugins: { legend: { labels: { color: tc } } },
        scales: {
          x: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
          y: {
            ticks: { color: tc },
            grid: { color: s.getPropertyValue('--color-border').trim() },
          },
        },
      },
    });
  };
  init();
  document.addEventListener('themeChanged', () => {
    chart.destroy();
    init();
  });
})();

/* ===============================
           CARD 43 – COHORT GRID (JS)
        ================================ */
(() => {
  /* purely HTML/CSS */
})();

/* ===============================
           CARD 44 – AI INSIGHTS (JS)
        ================================ */
(() => {
  /* purely HTML/CSS */
})();

/* ===============================
           CARD 45 – EXECUTIVE (JS)
        ================================ */
(() => {
  /* purely HTML/CSS */
})();
