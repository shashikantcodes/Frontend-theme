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

// NAYA EVENT: Blue Bar se saari selection clear karne ke liye
$('#clearSelection4').on('click', function () {
  $('#selectAll4').prop('checked', false);
  $('#leadsTable4 tbody .row-checkbox').prop('checked', false);
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
}); // ============================================================
//  STYLE 5: MODERN DASHBOARD (LIST & GRID VIEW) (#leadsTable5)
// ============================================================

const generateModernLeads = () => {
  const names = [
    'Tahani Al-Hashemi',
    'Alexe Jordan',
    'Shouq Al-Kumaiti',
    'Khalid Zaabi',
    'Gany Halpal',
    'Dibbondho',
    'Hamasy Singhal',
    'Rahul Verma',
    'John Doe',
    'Sarah Miller',
  ];
  const companies = [
    'Zendesk',
    'Quicken Loans',
    'Audi',
    'Etsy',
    'Tesla',
    'Western Union',
    'Google',
    'Microsoft',
  ];
  const colors = [
    '#0f766e',
    '#be123c',
    '#000000',
    '#d97706',
    '#be123c',
    '#ca8a04',
    '#1a73e8',
    '#0078d4',
  ];

  // Data array size increased to 100
  return Array.from({ length: 100 }, (_, i) => {
    const nameStr = names[i % names.length];
    const compIdx = i % companies.length;
    return {
      id: 1000 + i,
      name: `${nameStr} - ${i + 1}`,
      initials: nameStr
        .split(' ')
        .map((n) => n[0])
        .join(''),
      time: i % 2 === 0 ? 'Today at 12:40PM' : 'Yesterday at 10:45AM',
      email: `${nameStr.split(' ')[0].toLowerCase()}${i}@gmail.com`,
      phone: `+97150${Math.floor(100000 + Math.random() * 900000)}`,
      company: companies[compIdx],
      companyUrl: `${companies[compIdx].toLowerCase().replace(' ', '')}.com`,
      companyColor: colors[compIdx],
      companyInitial: companies[compIdx].substring(0, 2).toUpperCase(),
      industry: 'Technology',
      status: i % 4 === 0 ? 'New' : i % 5 === 0 ? 'Sold' : 'In Progress',
    };
  });
};

$(document).ready(function () {
  if (!$.fn.DataTable.isDataTable('#leadsTable5')) {
    const selectedLeads5 = new Set();
    let currentView5 = 'list';

    const getActionMenuHtml = () => `
      <div class="d-flex align-items-center">
        <button class="tb-action-btn" title="Call"><i class="fa-solid fa-phone"></i></button>
        <button class="tb-action-btn" title="History"><i class="fa-solid fa-clock-rotate-left"></i></button>
        <div class="dropdown d-inline-block">
          <button class="tb-action-btn" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-ellipsis"></i></button>
          <ul class="dropdown-menu dropdown-menu-end tb5-dropdown-menu">
            <li><a class="dropdown-item" href="#"><i class="fa-regular fa-eye me-2"></i> View Profile</a></li>
            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-pen-to-square me-2"></i> Edit Record</a></li>
            <li><hr class="dropdown-divider" style="border-color: var(--color-border);"></li>
            <li><a class="dropdown-item text-danger" href="#"><i class="fa-regular fa-trash-can me-2"></i> Delete</a></li>
          </ul>
        </div>
      </div>
    `;

    const table5 = $('#leadsTable5').DataTable({
      dom: 't',
      scrollX: false,
      data: generateModernLeads(),
      pageLength: 20, // Default rows 20
      ordering: true,
      columns: [
        {
          data: 'id',
          orderable: false,
          width: '40px',
          render: (d) => `<input type="checkbox" class="row-checkbox5" value="${d}">`,
        },
        {
          data: 'name',
          render: (d, t, r) =>
            `<div class="d-flex align-items-center gap-3"><div class="tb-avatar">${r.initials}</div><div><a href="#" class="tb-link">${d}</a><span class="tb-subtext">${r.time}</span></div></div>`,
        },
        {
          data: 'email',
          render: (d, t, r) =>
            `<div><div class="tb-maintext d-flex align-items-center gap-2"><i class="fa-regular fa-envelope tb5-text-light"></i> ${d}</div><span class="tb-subtext d-flex align-items-center gap-2"><i class="fa-solid fa-phone tb5-text-light"></i> ${r.phone}</span></div>`,
        },
        {
          data: 'company',
          render: (d, t, r) =>
            `<div class="d-flex align-items-center gap-2"><div class="tb-company-logo" style="background-color: ${r.companyColor};">${r.companyInitial}</div><div><div class="tb-maintext">${d}</div><span class="tb-subtext">${r.companyUrl}</span></div></div>`,
        },
        { data: 'industry', render: (d) => `<span class="tb-maintext">${d}</span>` },
        {
          data: 'status',
          render: (d) =>
            `<span class="tb-badge ${d === 'New' ? 'new' : d === 'Sold' ? 'sold' : 'in-progress'}">${d}</span>`,
        },
        { data: null, orderable: false, render: () => getActionMenuHtml() },
      ],

      rowCallback: function (row, data) {
        if (selectedLeads5.has(data.id.toString())) {
          $(row).addClass('selected-row');
          $(row).find('.row-checkbox5').prop('checked', true);
        } else {
          $(row).removeClass('selected-row');
          $(row).find('.row-checkbox5').prop('checked', false);
        }
      },

      drawCallback: function (settings) {
        const api = this.api();
        const info = api.page.info();

        // 1. Footer Data Update
        $('#totalRecordsText5').text(info.recordsDisplay);

        // 2. Footer Prev/Next Button states
        $('#btnPrev5').prop('disabled', info.page === 0);
        $('#btnNext5').prop('disabled', info.page === info.pages - 1 || info.pages === 0);

        syncSelectAllCheckbox5();
        renderGridView5(api.rows({ page: 'current' }).data().toArray());
      },
    });

    /* --- GRID RENDERER --- */
    function renderGridView5(pageData) {
      let html = '';
      if (pageData.length === 0) {
        html = `<div class="col-12 text-center tb5-text-light py-5">No records found</div>`;
      } else {
        pageData.forEach((row) => {
          const isSelected = selectedLeads5.has(row.id.toString()) ? 'checked' : '';
          const cardClass = isSelected ? 'selected-card' : '';
          let badgeClass =
            row.status === 'New' ? 'new' : row.status === 'Sold' ? 'sold' : 'in-progress';

          html += `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
              <div class="tb5-grid-card ${cardClass}" data-id="${row.id}">
                <input type="checkbox" class="row-checkbox5 grid-card-checkbox yajra-checkbox" value="${row.id}" ${isSelected}>
                
                <div class="d-flex align-items-center gap-3 mb-3">
                  <div class="tb-avatar">${row.initials}</div>
                  <div><a href="#" class="tb-link">${row.name}</a><span class="tb-subtext">${row.time}</span></div>
                </div>

                <div class="mb-3">
                  <div class="tb-maintext d-flex align-items-center gap-2 mb-1" style="font-size:13px"><i class="fa-regular fa-envelope tb5-text-light"></i> ${row.email}</div>
                  <span class="tb-subtext d-flex align-items-center gap-2"><i class="fa-solid fa-phone tb5-text-light"></i> ${row.phone}</span>
                </div>

                <div class="d-flex justify-content-between align-items-center border-top pt-3 mt-auto" style="border-color: var(--color-border) !important;">
                  <span class="tb-badge ${badgeClass}">${row.status}</span>
                  ${getActionMenuHtml()}
                </div>
              </div>
            </div>
          `;
        });
      }
      $('#gridItemsWrapper5').html(html);
    }

    function syncSelectAllCheckbox5() {
      const allCheckboxes = $('#leadsTable5 tbody .row-checkbox5');
      if (allCheckboxes.length > 0) {
        const allChecked = allCheckboxes.length === allCheckboxes.filter(':checked').length;
        $('#selectAll5').prop('checked', allChecked);
      } else {
        $('#selectAll5').prop('checked', false);
      }
    }

    function updateBulkActionUI5() {
      const count = selectedLeads5.size;
      $('#selectedCount5').text(count);
      if (count > 0)
        $('#bulkActionsContainer5').removeClass('d-none').addClass('d-flex').hide().fadeIn(200);
      else
        $('#bulkActionsContainer5')
          .removeClass('d-flex')
          .fadeOut(200, function () {
            $(this).addClass('d-none');
          });
    }

    /* --- EVENTS --- */

    // View Toggle
    $('input[name="viewToggle5"]').on('change', function () {
      currentView5 = $(this).val();
      if (currentView5 === 'grid') {
        $('#listViewContainer5').hide();
        $('#gridViewContainer5').fadeIn(300);
      } else {
        $('#gridViewContainer5').hide();
        $('#listViewContainer5').fadeIn(300);
      }
    });

    // Custom Search
    $('#customSearch5').on('keyup', function () {
      table5.search(this.value).draw();
    });

    // Bottom Dropdown Page Length Change
    $('#selectRows5').on('change', function () {
      table5.page.len(parseInt($(this).val())).draw();
    });

    // Checkboxes Logic
    $(document).on('change', '.row-checkbox5', function () {
      const id = $(this).val();
      if ($(this).is(':checked')) selectedLeads5.add(id);
      else selectedLeads5.delete(id);
      table5.draw(false);
      updateBulkActionUI5();
    });

    $('#selectAll5').on('change', function () {
      const isChecked = $(this).is(':checked');
      $('#leadsTable5 tbody .row-checkbox5').each(function () {
        const id = $(this).val();
        if (isChecked) selectedLeads5.add(id);
        else selectedLeads5.delete(id);
      });
      table5.draw(false);
      updateBulkActionUI5();
    });

    $('#btnDelete5').on('click', function () {
      alert(`${selectedLeads5.size} leads will be deleted.`);
      selectedLeads5.clear();
      table5.draw(false);
      updateBulkActionUI5();
    });

    // BOTTOM Pagination Click Events
    $('#btnPrev5').on('click', () => table5.page('previous').draw('page'));
    $('#btnNext5').on('click', () => table5.page('next').draw('page'));

    // Icon Actions (Top Right)
    $('#btnSidebarToggle5').on('click', function () {
      alert('Sidebar Action');
    });

    // RESET BUTTON (Rotate icon)
    $('#btnResetTable5').on('click', function () {
      $('#customSearch5').val('');
      table5.search('').page.len(20);
      $('#selectRows5').val('20');
      selectedLeads5.clear();
      table5.draw();
      updateBulkActionUI5();
    });
  }
});
