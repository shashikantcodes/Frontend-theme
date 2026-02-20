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

    // Dropdown se selected rows per load value lo
    const selectedRows = parseInt($('#selectRows1').val()) || 10;

    // Current length + selectedRows
    table1.page.len(info.length + selectedRows).draw();
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
// ============================================================
//  STYLE 3: COMBO (LOAD MORE + PAGINATION) (#leadsTable3)
// ============================================================
if ($.fn.DataTable.isDataTable('#leadsTable3')) {
  $('#leadsTable3').DataTable().destroy();
}

const table3 = $('#leadsTable3').DataTable({
  dom: 't',
  scrollX: false,
  data: generateMockLeads(),
  pageLength: 20, // Default rows
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

  // 💡 Isme dono (Load More aur Pagination) ki condition check hongi
  drawCallback: function (settings) {
    const api = this.api();
    const info = api.page.info();

    // 1. Total Records Update
    $('#totalBadge3').text(`Total Records: ${info.recordsTotal}`);

    // 2. Checkbox Reset
    $('#selectAll3').prop('checked', false);

    // 3. Load More Button State (Agar saara data ek page par aa gaya, to disable kar do)
    if (info.length >= info.recordsTotal) {
      $('#btnLoadMore3').prop('disabled', true).find('span').text('All data loaded');
      $('#btnLoadMore3 i').attr('class', 'fa-solid fa-check');
    } else {
      $('#btnLoadMore3').prop('disabled', false).find('span').text('Show More Leads');
      $('#btnLoadMore3 i').attr('class', 'fa-solid fa-arrows-rotate');
    }

    // 4. Pagination (Prev/Next) Button State
    $('#btnPrev3').prop('disabled', info.page === 0);
    $('#btnNext3').prop('disabled', info.page === info.pages - 1 || info.pages === 0);
  },
});

// --- Table 3 Events ---

// Load More Logic (Yeh current page ki length badha dega)
$('#btnLoadMore3').on('click', function () {
  const info = table3.page.info();
  const selectedRows = parseInt($('#selectRows3').val()) || 20; // Dropdown value
  table3.page.len(info.length + selectedRows).draw(); // length increase karo
});

// Prev Click
$('#btnPrev3').on('click', function () {
  table3.page('previous').draw('page');
});

// Next Click
$('#btnNext3').on('click', function () {
  table3.page('next').draw('page');
});

// Show Total Click
$('#btnShowTotal3').on('click', function () {
  $(this).hide();
  $('#totalBadge3').removeClass('d-none').fadeIn();
});

// Rows Per Page Dropdown Change
$('#selectRows3').on('change', function () {
  table3.page.len(parseInt($(this).val())).draw();
});

// Select All Checkbox
$('#selectAll3').on('click', function () {
  $('#leadsTable3').find('.row-checkbox').prop('checked', $(this).is(':checked'));
});
// ============================================================
//  STYLE 4: EXPANDABLE + BULK ACTIONS + SMART PAGING (#leadsTable4)
// ============================================================
if ($.fn.DataTable.isDataTable('#leadsTable4')) {
  $('#leadsTable4').DataTable().destroy();
}

// Helper function: Child row ka design (Fixed for Dark Mode)
function formatChildRow(d) {
  return `
      <div class="child-row-container rounded mx-2">
        <h6 class="child-title mb-3"><i class="fa-solid fa-circle-user me-2"></i>Extra Details for <span style="color: var(--color-text-main);">${d.name}</span></h6>
        
        <div class="d-flex flex-wrap gap-5" style="font-size: 13px;">
          <div><span class="detail-label">Source:</span> <span class="detail-value">${d.source.toUpperCase()}</span></div>
          <div><span class="detail-label">Primary Email:</span> <span class="detail-value">${d.email}</span></div>
          <div><span class="detail-label">Owner Contact:</span> <span class="detail-value">${d.ownerEmail}</span></div>
          <div><span class="detail-label">Last Active:</span> <span class="detail-value">Just Now</span></div>
        </div>
        
        <div class="mt-3 d-flex gap-2">
          <button class="yajra-btn py-1 px-3" style="font-size: 12px; color: var(--color-primary); border-color: var(--color-primary); background: transparent;">View Full Profile</button>
          <button class="yajra-btn py-1 px-3" style="font-size: 12px;">Add Note</button>
        </div>
      </div>
    `;
}

const table4 = $('#leadsTable4').DataTable({
  dom: 't',
  scrollX: false,
  data: generateMockLeads(),
  pageLength: 10, // Default 10 rakha hai
  ordering: true,
  columns: [
    {
      data: null,
      orderable: false,
      width: '40px',
      render: () => '<input type="checkbox" class="row-checkbox">',
    },
    {
      className: 'dt-control text-primary',
      orderable: false,
      data: null,
      defaultContent: '<i class="fa-solid fa-plus-circle" style="cursor:pointer;"></i>',
      width: '30px',
    },
    { data: 'name', render: (d) => `<a href="#" class="text-link fw-semibold">${d}</a>` },
    { data: 'email', render: (d) => `<span class="opacity-70">${d}</span>` },
    {
      data: 'mobile',
      render: (d) => `<div><i class="fa-brands fa-whatsapp wa-icon"></i><span>${d}</span></div>`,
    },
    { data: 'date' },
    {
      data: 'stage',
      render: (d) =>
        `<span class="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25">${d}</span>`,
    },
    { data: 'owner', render: (d, t, r) => `<div><div class="fw-bold">${d}</div></div>` },
    { data: 'state' },
    { data: 'city' },
  ],
  createdRow: (row, data) => {
    $(row).addClass('expandable-row');
    if (data.isUntouched) $(row).addClass('indicator-row');
  },

  drawCallback: function (settings) {
    const api = this.api();
    const info = api.page.info();

    // 1. Update Total
    $('#totalBadge4').text(`Total Records: ${info.recordsTotal}`);

    // 2. Pagination Button States (Prev/Next)
    $('#btnPrev4').prop('disabled', info.page === 0);
    $('#btnNext4').prop('disabled', info.page === info.pages - 1 || info.pages === 0);

    // 3. Reset Checkboxes & Bulk Toolbar on page change
    $('#selectAll4').prop('checked', false);
    updateBulkActionBar();

    // 4. SMART NUMBERED PAGINATION LOGIC
    renderSmartPagination(info.page, info.pages);
  },
});

// --- SMART PAGINATION RENDERER ---
function renderSmartPagination(currentPage, totalPages) {
  let html = '';
  let lastPushed = -1;

  for (let i = 0; i < totalPages; i++) {
    // Logic: Show 1st, Last, Current, and 1 page before & after current
    if (i === 0 || i === totalPages - 1 || (i >= currentPage - 1 && i <= currentPage + 1)) {
      // Add Ellipsis (...) if there's a gap
      if (lastPushed !== -1 && i - lastPushed > 1) {
        html += `<span class="px-2 text-muted fw-bold">...</span>`;
      }

      let activeClass = i === currentPage ? 'active-page' : '';
      html += `<button class="yajra-btn page-number-btn py-1 px-2 ${activeClass}" data-page="${i}">${i + 1}</button>`;

      lastPushed = i;
    }
  }
  $('#pageNumbers4').html(html);
}

// --- BULK ACTION TOOLBAR LOGIC ---
function updateBulkActionBar() {
  const selectedCount = $('#leadsTable4 tbody .row-checkbox:checked').length;
  $('#selectedCount4').text(selectedCount);

  if (selectedCount > 0) {
    $('#bulkActionBar4').addClass('show-bar');
  } else {
    $('#bulkActionBar4').removeClass('show-bar');
  }
}

// --- EVENTS FOR TABLE 4 ---

// Click row to Expand (Exclude Checkbox click)
$('#leadsTable4 tbody').on('click', 'td:not(:first-child)', function () {
  const tr = $(this).closest('tr');
  const row = table4.row(tr);
  const icon = tr.find('.dt-control i');

  if (row.child.isShown()) {
    row.child.hide();
    tr.removeClass('shown');
    icon.removeClass('fa-minus-circle text-danger').addClass('fa-plus-circle text-primary');
  } else {
    row.child(formatChildRow(row.data())).show();
    tr.addClass('shown');
    icon.removeClass('fa-plus-circle text-primary').addClass('fa-minus-circle text-danger');
  }
});

// Checkbox Events
$('#selectAll4').on('click', function () {
  $('#leadsTable4 tbody .row-checkbox').prop('checked', $(this).is(':checked'));
  updateBulkActionBar();
});

$('#leadsTable4 tbody').on('change', '.row-checkbox', function () {
  // Uncheck "Select All" if any individual box is unchecked
  if (!$(this).is(':checked')) {
    $('#selectAll4').prop('checked', false);
  }
  updateBulkActionBar();
});

// Pagination Clicks (Prev/Next/Numbers)
$('#btnPrev4').on('click', () => table4.page('previous').draw('page'));
$('#btnNext4').on('click', () => table4.page('next').draw('page'));

$('#pageNumbers4').on('click', '.page-number-btn', function () {
  const pageNum = parseInt($(this).data('page'));
  table4.page(pageNum).draw('page');
});

// Rows Per Page
$('#selectRows4').on('change', function () {
  table4.page.len(parseInt($(this).val())).draw();
});
