(function () {
  'use strict';

  var bgm = $('bgm');
  var musicBtn = $('musicBtn');

  $('openBtn').addEventListener('click', function () {
    $('cover').classList.add('is-open');
    document.body.classList.remove('is-locked');
    window.scrollTo(0, 0);
    musicBtn.hidden = false;
    playMusic();
  });

  function playMusic() {
    var p = bgm.play();
    if (p && p.then) {
      p.then(function () { musicBtn.classList.add('playing'); })
       .catch(function () { musicBtn.classList.remove('playing'); });
    }
  }

  musicBtn.addEventListener('click', function () {
    if (bgm.paused) {
      playMusic();
    } else {
      bgm.pause();
      musicBtn.classList.remove('playing');
    }
  });


  function toCal(d) { return d.toISOString().replace(/[-:]|\.\d{3}/g, ''); }
  $('calBtn').href =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' + encodeURIComponent('Pernikahan Raka & Ayu') +
    '&dates=' + toCal(EVENT_DATE) + '/' + toCal(EVENT_END) +
    '&location=' + encodeURIComponent('Gedung Graha Sentosa, Jl. Basuki Rahmat No. 88, Surabaya');

    function showToast(msg) {
    $('toastMsg').textContent = msg;
    bootstrap.Toast.getOrCreateInstance($('appToast'), { delay: 2600 }).show();
  }

  /* ---------- Salin nomor rekening ---------- */
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = $(btn.dataset.target).textContent.trim();
      var done = function () { showToast('Nomor rekening disalin: ' + text); };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
      } else {
        fallbackCopy(text, done);
      }
    });
  });

  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { showToast('Salin manual: ' + text); }
    document.body.removeChild(ta);
  }

  
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
