// ===== Gemilang Katun Outbound - Main Script =====
(function () {
  'use strict';

  // ===== Navbar Scroll Effect =====
  const navbar = document.querySelector('.navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  // ===== Hamburger Menu =====
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.navbar-menu');
  const navOverlay = document.querySelector('.navbar-overlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    if (navOverlay) navOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Close menu when clicking nav links
  document.querySelectorAll('.navbar-menu a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // ===== Scroll to Top =====
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Fade-up Animation on Scroll =====
  const fadeElements = document.querySelectorAll('.fade-up');
  function checkFadeUp() {
    fadeElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', checkFadeUp);
  window.addEventListener('load', checkFadeUp);
  checkFadeUp();

  // ===== TOC Toggle =====
  const tocToggle = document.querySelector('.toc-toggle');
  const tocList = document.querySelector('.toc-list');
  if (tocToggle && tocList) {
    // Open by default
    tocToggle.classList.add('active');
    tocList.classList.add('active');

    tocToggle.addEventListener('click', function () {
      tocToggle.classList.toggle('active');
      tocList.classList.toggle('active');
    });
  }

  // ===== Auto-generate TOC =====
  function generateTOC() {
    var articleBody = document.querySelector('.article-body');
    var tocListEl = document.querySelector('.toc-list');
    if (!articleBody || !tocListEl) return;

    var headings = articleBody.querySelectorAll('h2, h3');
    if (headings.length === 0) return;

    tocListEl.innerHTML = '';
    headings.forEach(function (heading, index) {
      var id = 'section-' + index;
      heading.id = id;
      var li = document.createElement('li');
      if (heading.tagName === 'H3') {
        li.classList.add('toc-h3');
      }
      var a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = heading.textContent;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      li.appendChild(a);
      tocListEl.appendChild(li);
    });
  }
  generateTOC();

  // ===== FAQ Accordion =====
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var answer = this.nextElementSibling;
      var isActive = this.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-question').forEach(function (b) {
        b.classList.remove('active');
        b.nextElementSibling.classList.remove('active');
      });

      // Open clicked if not already active
      if (!isActive) {
        this.classList.add('active');
        answer.classList.add('active');
      }
    });
  });

  // ===== Share Buttons =====
  function setupShareButtons() {
    var shareButtons = document.querySelectorAll('.share-btn');
    var pageUrl = encodeURIComponent(window.location.href);
    var pageTitle = encodeURIComponent(document.title);

    shareButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var url = '';
        if (btn.classList.contains('wa')) {
          url = 'https://api.whatsapp.com/send?text=' + pageTitle + '%20' + pageUrl;
        } else if (btn.classList.contains('fb')) {
          url = 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl;
        } else if (btn.classList.contains('tw')) {
          url = 'https://twitter.com/intent/tweet?url=' + pageUrl + '&text=' + pageTitle;
        } else if (btn.classList.contains('li')) {
          url = 'https://www.linkedin.com/sharing/share-offsite/?url=' + pageUrl;
        } else if (btn.classList.contains('tg')) {
          url = 'https://t.me/share/url?url=' + pageUrl + '&text=' + pageTitle;
        }
        if (url) {
          window.open(url, '_blank', 'width=600,height=400');
        }
      });
    });
  }
  setupShareButtons();

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
