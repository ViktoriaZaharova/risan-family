Fancybox.bind("[data-fancybox]", {
  // Your custom options
});


$(function () {
  // Все новости
  const $newsItems = $('.content-news .news-col');
  const $btn = $('.btn-loader-news');

  // Скрываем, если новостей больше 8
  if ($newsItems.length > 8) {
    $newsItems.slice(8).hide();
  } else {
    $btn.hide(); // Если меньше 8 — кнопку не показываем
  }

  // Обработчик кнопки
  $btn.on('click', function (e) {
    e.preventDefault();

    // Показываем следующие 4
    const $hiddenItems = $('.content-news .news-col:hidden');
    $hiddenItems.slice(0, 4).slideDown();

    // Если скрытых больше нет — скрываем кнопку
    if ($hiddenItems.length <= 4) {
      $(this).hide();
    }
  });
});

$(function () {
  // Все новости
  const $newsItems = $('.content-polls .polls-col');
  const $btn = $('.btn-loader-polls');

  // Скрываем, если новостей больше 6
  if ($newsItems.length > 6) {
    $newsItems.slice(8).hide();
  } else {
    $btn.hide(); // Если меньше 8 — кнопку не показываем
  }

  // Обработчик кнопки
  $btn.on('click', function (e) {
    e.preventDefault();

    // Показываем следующие 4
    const $hiddenItems = $('.content-polls .polls-col:hidden');
    $hiddenItems.slice(0, 4).slideDown();

    // Если скрытых больше нет — скрываем кнопку
    if ($hiddenItems.length <= 4) {
      $(this).hide();
    }
  });
});


$(document).ready(function () {
  $('.dept-card').each(function () {
    const $dept = $(this);
    const $employees = $dept.find('.emp-mini');
    const $btn = $dept.find('.btn-outline-secondary');

    // Проверяем количество сотрудников
    if ($employees.length > 4) {
      // Скрываем всё, кроме первых 4
      $employees.slice(4).hide();
      // Показываем кнопку
      $btn.show();
    } else {
      // Если сотрудников ≤ 4, скрываем кнопку
      $btn.hide();
    }
  });

  // Обработка клика на кнопку
  $('.dept-card').on('click', '.btn-outline-secondary', function () {
    const $btn = $(this);
    const $dept = $btn.closest('.dept-card');
    const $employees = $dept.find('.emp-mini');
    const hidden = $employees.filter(':hidden');

    if (hidden.length) {
      hidden.slideDown(300);
      $btn.text('Скрыть');
    } else {
      $employees.slice(4).slideUp(300);
      $btn.text('Показать ещё');
      $('html, body').animate({
        scrollTop: $dept.offset().top - 100
      }, 400);
    }
  });
});

$(document).ready(function () {
  const $badges = $('.profile-badges-card .badge-item');
  const $btnToggle = $('.profile-badges-card .btn-loader-badges:contains("Показать")');
  const batchSize = 8;

  // Изначально показываем первые N бейджей
  $badges.hide().slice(0, batchSize).show();

  // Клик по кнопке
  $btnToggle.on('click', function () {
    const isExpanded = $(this).data('expanded') === true;

    if (!isExpanded) {
      // Показать все
      $badges.slideDown(300);
      $(this).text('Скрыть').data('expanded', true);
    } else {
      // Скрыть обратно
      $badges.slice(batchSize).slideUp();
      $(this).text('Показать ещё').data('expanded', false);

      // Плавный скролл к началу блока бейджей
      $('html, body').animate({
        scrollTop: $('.profile-badges-card').offset().top - 100
      }, 400);
    }
  });
});


$(function () {
  $('.amount').each(function () {
    const $wrapper = $(this);
    const $input = $wrapper.find('input'); // теперь не зависит от type
    const $btnMinus = $wrapper.find('button').first();
    const $btnPlus = $wrapper.find('button').last();

    // Минимум и максимум (можно задавать через data-атрибуты)
    const min = parseInt($input.attr('min')) || 1;
    const max = parseInt($input.attr('max')) || 9999;

    // Функция нормализации значения
    function normalizeValue(val) {
      val = parseInt(val, 10);
      if (isNaN(val)) val = min;
      if (val < min) val = min;
      if (val > max) val = max;
      return val;
    }

    // Минус
    $btnMinus.on('click', function (e) {
      e.preventDefault();
      let val = normalizeValue($input.val());
      val = Math.max(min, val - 1);
      $input.val(val).trigger('change');
      flashInput($input);
    });

    // Плюс
    $btnPlus.on('click', function (e) {
      e.preventDefault();
      let val = normalizeValue($input.val());
      val = Math.min(max, val + 1);
      $input.val(val).trigger('change');
      flashInput($input);
    });

    // Ввод вручную
    $input.on('input', function () {
      let val = normalizeValue($(this).val());
      $(this).val(val);
    });

    // Эффект подсветки при изменении (опционально, можно убрать)
    function flashInput($el) {
      $el.addClass('changed');
      setTimeout(() => $el.removeClass('changed'), 200);
    }
  });
});


// $(function () {
//   const monthNames = [
//     "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
//     "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
//   ];
//   const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

//   function createCalendar($el, date) {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const today = new Date();

//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const startDay = (firstDay.getDay() + 6) % 7; // понедельник = 0
//     const totalDays = lastDay.getDate();

//     // === Шапка ===
//     let html = `
//       <div class="calendar-header d-flex justify-content-between align-items-center">
//         <div class="calendar-nav">
//           <button class="btn btn-link double-prev" title="Предыдущий год"></button>
//           <button class="btn btn-link prev" title="Предыдущий месяц"></button>
//         </div>
//         <div class="calendar-title">${monthNames[month]}<span>${year}</span></div>
//         <div class="calendar-nav">
//           <button class="btn btn-link next" title="Следующий месяц"></button>
//           <button class="btn btn-link double-next" title="Следующий год"></button>
//         </div>
//       </div>
//     `;

//     // === Таблица ===
//     html += `<div class="calendar-body"><table class="calendar-table w-100 text-center"><thead><tr>`;
//     weekDays.forEach(d => html += `<th>${d}</th>`);
//     html += `</tr></thead><tbody><tr>`;

//      const prevMonthLast = new Date(year, month, 0).getDate();
//     let dayCounter = 1;

//     // Дни из предыдущего месяца
//     for (let i = 0; i < startDay; i++) {
//       const day = prevMonthLast - startDay + i + 1;
//       html += `<td class="day other-month" data-day="${day}" data-month="${month - 1}" data-year="${year}">${day}</td>`;
//     }

//     // Основные дни
//     for (let d = 1; d <= totalDays; d++) {
//       if ((startDay + d - 1) % 7 === 0 && d !== 1) html += `</tr><tr>`;
//       const isToday = (today.getFullYear() === year && today.getMonth() === month && today.getDate() === d);
//       const todayClass = isToday ? 'today' : '';
//       html += `<td class="day ${todayClass}" data-day="${i}" data-month="${month}" data-year="${year}"><span>${i}</span></td>`;
//       dayCounter++;
//     }

//     // Дни из следующего месяца
//     const remaining = 7 - ((startDay + totalDays) % 7);
//     if (remaining < 7) {
//       for (let i = 1; i <= remaining; i++) {
//         html += `<td class="day other-month" data-day="${i}" data-month="${month + 1}" data-year="${year}">${i}</td>`;
//       }
//     }

//     html += `</tr></tbody></table></div>`;
//     $el.html(html);

//     // === Навигация ===
//     $el.find('.prev').on('click', () => createCalendar($el, new Date(year, month - 1, 1)));
//     $el.find('.next').on('click', () => createCalendar($el, new Date(year, month + 1, 1)));
//     $el.find('.double-prev').on('click', () => createCalendar($el, new Date(year - 1, month, 1)));
//     $el.find('.double-next').on('click', () => createCalendar($el, new Date(year + 1, month, 1)));

//     // === Выделение дат ===
//     $el.find('.day').on('click', function () {
//       $(this).toggleClass('selected');
//     });
//   }

//   // ==== Инициализация всех календарей ====
//   $('.calendar-instance').each(function () {
//     const $this = $(this);
//     createCalendar($this, new Date());
//   });

//   // ==== При переключении табов (Bootstrap) ====
//   $(document).on('shown.bs.tab', function () {
//     $('.calendar-instance').each(function () {
//       const $this = $(this);
//       if (!$this.data('rendered')) {
//         createCalendar($this, new Date());
//         $this.data('rendered', true);
//       }
//     });
//   });
// });



$(function () {
  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];
  const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

  function createCalendar($el, date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = (firstDay.getDay() + 6) % 7; // понедельник = 0
    const totalDays = lastDay.getDate();
    const prevMonthLast = new Date(year, month, 0).getDate();

    // === Шапка ===
    let html = `
      <div class="calendar-header d-flex justify-content-between align-items-center mb-2">
        <div class="calendar-nav d-flex gap-1">
          <button class="btn btn-link double-prev" title="Предыдущий год"></button>
          <button class="btn btn-link prev" title="Предыдущий месяц"></button>
        </div>
        <div class="calendar-title fw-semibold text-center">
          ${monthNames[month]} <span>${year}</span>
        </div>
        <div class="calendar-nav d-flex gap-1">
          <button class="btn btn-link next" title="Следующий месяц"></button>
          <button class="btn btn-link double-next" title="Следующий год"></button>
        </div>
      </div>
    `;

    // === Таблица ===
    html += `<div class="calendar-body"><table class="calendar-table w-100 text-center"><thead><tr>`;
    weekDays.forEach(d => html += `<th>${d}</th>`);
    html += `</tr></thead><tbody><tr>`;

    // Дни из предыдущего месяца
    for (let i = 0; i < startDay; i++) {
      const day = prevMonthLast - startDay + i + 1;
      html += `<td class="day other-month" data-day="${day}" data-month="${month - 1}" data-year="${year}">
        <span>${day}</span>
      </td>`;
    }

    // Основные дни
    for (let d = 1; d <= totalDays; d++) {
      if ((startDay + d - 1) % 7 === 0 && d !== 1) html += `</tr><tr>`;
      const isToday = (today.getFullYear() === year && today.getMonth() === month && today.getDate() === d);
      const todayClass = isToday ? 'today' : '';
      html += `<td class="day ${todayClass}" data-day="${d}" data-month="${month}" data-year="${year}">
        <span>${d}</span>
      </td>`;
    }

    // Дни из следующего месяца
    const remaining = 7 - ((startDay + totalDays) % 7);
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        html += `<td class="day other-month" data-day="${i}" data-month="${month + 1}" data-year="${year}">
          <span>${i}</span>
        </td>`;
      }
    }

    html += `</tr></tbody></table></div>`;
    $el.html(html);

    // === Навигация ===
    $el.find('.prev').on('click', () => createCalendar($el, new Date(year, month - 1, 1)));
    $el.find('.next').on('click', () => createCalendar($el, new Date(year, month + 1, 1)));
    $el.find('.double-prev').on('click', () => createCalendar($el, new Date(year - 1, month, 1)));
    $el.find('.double-next').on('click', () => createCalendar($el, new Date(year + 1, month, 1)));

    // === Выделение дат ===
    $el.find('.day').on('click', function () {
      const $day = $(this);
      if ($day.hasClass('other-month')) {
        const y = $day.data('year');
        const m = $day.data('month');
        createCalendar($el, new Date(y, m, 1));
      } else {
        $day.toggleClass('selected');
      }
    });
  }

  // ==== Инициализация всех календарей ====
  $('.calendar-instance').each(function () {
    const $this = $(this);
    createCalendar($this, new Date());
  });

  // ==== При переключении табов (Bootstrap) ====
  $(document).on('shown.bs.tab', function () {
    $('.calendar-instance').each(function () {
      const $this = $(this);
      if (!$this.data('rendered')) {
        createCalendar($this, new Date());
        $this.data('rendered', true);
      }
    });
  });
});

