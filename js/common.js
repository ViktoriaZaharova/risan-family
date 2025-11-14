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

    const perLoad = 6; // сколько карточек показываем за раз

    const $items = $('.badges-wrapper .thanks-badge-col');

    // === 1. Автоматическая нумерация карточек ===
    $items.each(function (index) {
        $(this).attr('data-index', index + 1);
    });

    // === 2. Скрываем все и показываем первые 6 ===
    $items.hide();
    $items.slice(0, perLoad).show();

    // === 3. Логика кнопки «Показать ещё» ===
    $('.btn-loader-thanks-badge').on('click', function () {

        const hiddenItems = $items.filter(':hidden');

        if (hiddenItems.length === 0) return;

        hiddenItems.slice(0, perLoad).slideDown();

        // Скрываем кнопку, если больше нечего показывать
        if (hiddenItems.length <= perLoad) {
            $(this).fadeOut();
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
//     const prevMonthLast = new Date(year, month, 0).getDate();

//     // === Шапка ===
//     let html = `
//       <div class="calendar-header d-flex justify-content-between align-items-center mb-2">
//         <div class="calendar-nav d-flex gap-1">
//           <button class="btn btn-link double-prev" title="Предыдущий год"></button>
//           <button class="btn btn-link prev" title="Предыдущий месяц"></button>
//         </div>
//         <div class="calendar-title fw-semibold text-center">
//           ${monthNames[month]} <span>${year}</span>
//         </div>
//         <div class="calendar-nav d-flex gap-1">
//           <button class="btn btn-link next" title="Следующий месяц"></button>
//           <button class="btn btn-link double-next" title="Следующий год"></button>
//         </div>
//       </div>
//     `;

//     // === Таблица ===
//     html += `<div class="calendar-body"><table class="calendar-table w-100 text-center"><thead><tr>`;
//     weekDays.forEach(d => html += `<th>${d}</th>`);
//     html += `</tr></thead><tbody><tr>`;

//     // Дни из предыдущего месяца
//     for (let i = 0; i < startDay; i++) {
//       const day = prevMonthLast - startDay + i + 1;
//       html += `<td class="day other-month" data-day="${day}" data-month="${month - 1}" data-year="${year}">
//         <span>${day}</span>
//       </td>`;
//     }

//     // Основные дни
//     for (let d = 1; d <= totalDays; d++) {
//       if ((startDay + d - 1) % 7 === 0 && d !== 1) html += `</tr><tr>`;
//       const isToday = (today.getFullYear() === year && today.getMonth() === month && today.getDate() === d);
//       const todayClass = isToday ? 'today' : '';
//       html += `<td class="day ${todayClass}" data-day="${d}" data-month="${month}" data-year="${year}">
//         <span>${d}</span>
//       </td>`;
//     }

//     // Дни из следующего месяца
//     const remaining = 7 - ((startDay + totalDays) % 7);
//     if (remaining < 7) {
//       for (let i = 1; i <= remaining; i++) {
//         html += `<td class="day other-month" data-day="${i}" data-month="${month + 1}" data-year="${year}">
//           <span>${i}</span>
//         </td>`;
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
//       const $day = $(this);
//       if ($day.hasClass('other-month')) {
//         const y = $day.data('year');
//         const m = $day.data('month');
//         createCalendar($el, new Date(y, m, 1));
//       } else {
//         $day.toggleClass('selected');
//       }
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
    "Январь","Февраль","Март","Апрель","Май","Июнь",
    "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
  ];
  const weekDays = ["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"];

  // формат YYYY-MM-DD
  function fmt(y,m,d){ return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }

  function parseDataDates(str){
    if(!str) return [];
    return str.split(',').map(s => s.trim()).filter(Boolean);
  }

  function createCalendar($el, date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();

    // читаем подсветки из data-атрибутов контейнера (приоритет)
    const h1arr = parseDataDates($el.attr('data-highlight1'));
    const h2arr = parseDataDates($el.attr('data-highlight2'));

    const firstDay = new Date(year, month, 1);
    const lastDay  = new Date(year, month + 1, 0);
    const startDay = (firstDay.getDay() + 6) % 7; // Пн=0
    const totalDays = lastDay.getDate();
    const prevMonthLast = new Date(year, month, 0).getDate();

    // шапка
    let html = `
      <div class="calendar-header d-flex justify-content-between align-items-center mb-2">
        <div class="calendar-nav d-flex gap-1">
          <button class="btn btn-link double-prev" title="Предыдущий год"></button>
          <button class="btn btn-link prev" title="Предыдущий месяц"></button>
        </div>
        <div class="calendar-title fw-semibold text-center">${monthNames[month]} <span>${year}</span></div>
        <div class="calendar-nav d-flex gap-1">
          <button class="btn btn-link next" title="Следующий месяц"></button>
          <button class="btn btn-link double-next" title="Следующий год"></button>
        </div>
      </div>
    `;

    html += `<div class="calendar-body"><table class="calendar-table w-100 text-center"><thead><tr>`;
    weekDays.forEach(d => html += `<th>${d}</th>`);
    html += `</tr></thead><tbody>`;

    // предыдущий месяц (хвост)
    let cells = 0;
    for (let i = 0; i < startDay; i++) {
      const day = prevMonthLast - startDay + i + 1;
      const keyDate = new Date(year, month - 1, day);
      const key = fmt(keyDate.getFullYear(), keyDate.getMonth(), keyDate.getDate());
      const cls = buildClassForDate(key, true, h1arr, h2arr);
      if(cells % 7 === 0) html += `<tr>`;
      html += `<td class="${cls}" data-day="${day}" data-month="${month-1}" data-year="${year}"><span>${day}</span></td>`;
      cells++;
    }

    // текущий месяц
    for (let d = 1; d <= totalDays; d++) {
      if (cells % 7 === 0) html += `<tr>`;
      const key = fmt(year, month, d);
      const cls = buildClassForDate(key, false, h1arr, h2arr, today, year, month, d);
      html += `<td class="${cls}" data-day="${d}" data-month="${month}" data-year="${year}"><span>${d}</span></td>`;
      cells++;
    }

    // хвост следующего месяца — сначала заполнить остаток строки
    let nextDay = 1;
    if (cells % 7 !== 0) {
      const need = 7 - (cells % 7);
      for (let i = 0; i < need; i++) {
        const keyDate = new Date(year, month + 1, nextDay);
        const key = fmt(keyDate.getFullYear(), keyDate.getMonth(), keyDate.getDate());
        const cls = buildClassForDate(key, true, h1arr, h2arr);
        html += `<td class="${cls}" data-day="${nextDay}" data-month="${month+1}" data-year="${year}"><span>${nextDay}</span></td>`;
        nextDay++; cells++;
      }
      html += `</tr>`;
    } else {
      html += `</tr>`;
    }

    // добавить строки, чтобы было ровно 6 строк (6*7=42 ячейки)
    while (cells < 42) {
      html += `<tr>`;
      for (let i = 0; i < 7; i++) {
        const keyDate = new Date(year, month + 1, nextDay);
        const key = fmt(keyDate.getFullYear(), keyDate.getMonth(), keyDate.getDate());
        const cls = buildClassForDate(key, true, h1arr, h2arr);
        html += `<td class="${cls}" data-day="${nextDay}" data-month="${month+1}" data-year="${year}"><span>${nextDay}</span></td>`;
        nextDay++; cells++;
      }
      html += `</tr>`;
    }

    html += `</tbody></table></div>`;
    $el.html(html);

    // навигация
    $el.find('.prev').on('click', () => createCalendar($el, new Date(year, month - 1, 1)));
    $el.find('.next').on('click', () => createCalendar($el, new Date(year, month + 1, 1)));
    $el.find('.double-prev').on('click', () => createCalendar($el, new Date(year - 1, month, 1)));
    $el.find('.double-next').on('click', () => createCalendar($el, new Date(year + 1, month, 1)));

    // клик по дням — мультивыбор; клик по other-month переключает месяц
    $el.find('.day').on('click', function () {
      const $day = $(this);
      if ($day.hasClass('other-month')) {
        const y = parseInt($day.attr('data-year'),10);
        const m = parseInt($day.attr('data-month'),10);
        createCalendar($el, new Date(y, m, 1));
        return;
      }
      $day.toggleClass('selected');
    });

    // вспомогательные функции
    function buildClassForDate(key, isOther, arr1, arr2, todayRef, yRef, mRef, dRef) {
      // base
      let cls = "day";
      if (isOther) cls += " other-month";

      // today detection (if provided with yRef/mRef/dRef or by parsing key)
      if (todayRef) {
        const isToday = (todayRef.getFullYear() === yRef && todayRef.getMonth() === mRef && todayRef.getDate() === dRef);
        if (isToday) cls += " today";
      }

      // highlights
      if (arr1.includes(key)) cls += " highlight-1";
      if (arr2.includes(key)) cls += " highlight-2";

      return cls;
    }
  }

  // инициализация всех контейнеров
  $('.calendar-instance').each(function () {
    createCalendar($(this), new Date());
  });

  // при показе табов (если используются табы)
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
