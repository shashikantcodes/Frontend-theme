// --- COMMON DATA GENERATOR ---
const generateMockLeads = () =>
  Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: i % 5 === 0 ? 'RAVI RAMANAND SASIKALA' : 'Applicant ' + (i + 1),
    email: `user${i}@gmail.com`,
    mobile: `+91-810341700${i}`,
    date: `10/02/2026`,
    stage: 'Untouched',
    owner: 'Sheela Mehra',
    ownerEmail: 'sheela@test.com',
    state: 'Karnataka',
    city: 'Bengaluru',
    source: 'google',
    isUntouched: i % 4 !== 0,
  }));

$(document).ready(function () {
  // ============================================================
  //  STYLE 1: LOAD MORE LOGIC (#leadsTable1)
  // ============================================================
  if ($.fn.DataTable.isDataTable('#leadsTable1')) {
    $('#leadsTable1').DataTable().destroy();
  }

  const table1 = $('#leadsTable1').DataTable({
    dom: 't', // Sirf Table dikhao
    scrollX: false,
    data: generateMockLeads(),
    pageLength: 10,
    columns: [
      {
        data: null,
        orderable: false,
        width: '40px',
        render: () => '<input type="checkbox" class="row-checkbox">',
      },
      { data: 'name', render: (d) => `<a href="#" class="text-link">${d}</a>` },
      { data: 'email', render: (d) => `<span class="opacity-70">${d}</span>` },
      {
        data: 'mobile',
        render: (d) => `<div><i class="fa-brands fa-whatsapp wa-icon"></i><span>${d}</span></div>`,
      },
      { data: 'date' },
      { data: 'stage' },
      {
        data: 'owner',
        render: (d, t, r) =>
          `<div><div class="fw-bold">${d}</div><span class="sub-email">(${r.ownerEmail})</span></div>`,
      },
      { data: 'state' },
      { data: 'city' },
      {
        data: 'source',
        render: (d) => `<span class="opacity-50" style="font-size:11px;">${d}</span>`,
      },
    ],
    createdRow: (row, data) => {
      if (data.isUntouched) $(row).addClass('indicator-row');
    },

    // ✅ FIX: Sabkuch drawCallback ke andar (Checkbox Reset + Total + Button State)
    drawCallback: function (settings) {
      const api = this.api();
      const info = api.page.info();

      // 1. Total Records Update (Background me set ho jayega)
      $('#totalBadge1').text(`Total Records: ${info.recordsTotal}`);

      // 2. CHECKBOX RESET (Aapka main requirement)
      $('#selectAll1').prop('checked', false);
      // Rows ke checkbox bhi DOM redraw hone par hat jate hain, lekin header wala reset karna zaroori hai

      // 3. Load More Button Logic
      if (info.length >= info.recordsTotal) {
        $('#btnLoadMore1').prop('disabled', true).find('span').text('All data loaded');
        $('#btnLoadMore1 i').attr('class', 'fa-solid fa-check');
      } else {
        $('#btnLoadMore1').prop('disabled', false).find('span').text('Show More Leads');
        $('#btnLoadMore1 i').attr('class', 'fa-solid fa-arrows-rotate');
      }
    },
  });

  // --- Table 1 Events ---

  // Load More Click
  $('#btnLoadMore1').on('click', function () {
    const info = table1.page.info();
    table1.page.len(info.length + 10).draw();
  });

  // Show Total Click
  $('#btnShowTotal1').on('click', function () {
    $(this).hide();
    $('#totalBadge1').removeClass('d-none').fadeIn();
  });

  // Select Rows
  $('#selectRows1').on('change', function () {
    table1.page.len(parseInt($(this).val())).draw();
  });

  // Select All Checkbox
  $('#selectAll1').on('click', function () {
    $('#leadsTable1').find('.row-checkbox').prop('checked', $(this).is(':checked'));
  });

  // ============================================================
  //  STYLE 2: PAGINATION LOGIC (#leadsTable2)
  // ============================================================
  if ($.fn.DataTable.isDataTable('#leadsTable2')) {
    $('#leadsTable2').DataTable().destroy();
  }

  const table2 = $('#leadsTable2').DataTable({
    dom: 't',
    scrollX: false,
    data: generateMockLeads(),
    pageLength: 20,
    ordering: true,
    columns: [
      {
        data: null,
        orderable: false,
        width: '40px',
        render: () => '<input type="checkbox" class="row-checkbox">',
      },
      { data: 'name', render: (d) => `<a href="#" class="text-link">${d}</a>` },
      { data: 'email', render: (d) => `<span class="opacity-70">${d}</span>` },
      {
        data: 'mobile',
        render: (d) => `<div><i class="fa-brands fa-whatsapp wa-icon"></i><span>${d}</span></div>`,
      },
      { data: 'date' },
      { data: 'stage' },
      {
        data: 'owner',
        render: (d, t, r) =>
          `<div><div class="fw-bold">${d}</div><span class="sub-email">(${r.ownerEmail})</span></div>`,
      },
      { data: 'state' },
      { data: 'city' },
      {
        data: 'source',
        render: (d) => `<span class="opacity-50" style="font-size:11px;">${d}</span>`,
      },
    ],
    createdRow: (row, data) => {
      if (data.isUntouched) $(row).addClass('indicator-row');
    },

    // ✅ FIX: Draw Callback updates everything correctly
    drawCallback: function (settings) {
      const api = this.api();
      const info = api.page.info();

      // 1. Total Records Text Update
      $('#totalBadge2').text(`Total Records: ${info.recordsTotal}`);

      // 2. Button State Logic
      $('#btnPrev2').prop('disabled', info.page === 0);
      $('#btnNext2').prop('disabled', info.page === info.pages - 1 || info.pages === 0);

      // 3. CHECKBOX RESET (Table 2 ke liye bhi zaroori hai)
      $('#selectAll2').prop('checked', false);
    },
  });

  // --- Table 2 Events ---

  // Show Total Click
  $('#btnShowTotal2').on('click', function () {
    $(this).hide();
    $('#totalBadge2').removeClass('d-none').fadeIn();
  });

  // Prev Click
  $('#btnPrev2').on('click', function () {
    table2.page('previous').draw('page');
  });

  // Next Click
  $('#btnNext2').on('click', function () {
    table2.page('next').draw('page');
  });

  // Select All Checkbox
  $('#selectAll2').on('click', function () {
    $('#leadsTable2').find('.row-checkbox').prop('checked', $(this).is(':checked'));
  });

  // Rows Per Page
  $('#selectRows2').on('change', function () {
    table2.page.len(parseInt($(this).val())).draw();
  });
});
