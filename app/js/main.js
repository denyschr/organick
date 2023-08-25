document.addEventListener('DOMContentLoaded', () => {

  const body = document.querySelector('body');
  const header = document.querySelector('.header');
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const navItems = nav.querySelectorAll('.nav__link');
  const overlay = document.querySelector('.overlay');
  const headerHeight = header.offsetHeight;
  document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);

  burger.addEventListener('click', () => {
    burger.classList.toggle('burger--active');
    nav.classList.toggle('nav--active');
    overlay.classList.toggle('overlay--active');
    body.classList.toggle('noscroll');
  });

  navItems.forEach(el => {
    el.addEventListener('click', () => {
      if (el.classList.contains('nav__link') && !el.classList.contains('nav__link--drop')) {
        burger.classList.remove('burger--active');
        nav.classList.remove('nav--active');
        body.classList.remove('noscroll');
        overlay.classList.remove('overlay--active');
      }
    });
  });

  window.addEventListener('scroll', function () {
    scrollY > 0 ? document.querySelector('.header').classList.add('scroll') : document.querySelector('.header').classList.remove('scroll');
  });

  const navDropLinks = document.querySelectorAll('.nav__link--drop');

  navDropLinks.forEach(function (item) {
    item.addEventListener('click', navDropLinkClick);
  });

  function navDropLinkClick() {
    this.nextElementSibling.classList.toggle('dropdown-list--active');
  }

  const modalSearch = document.querySelector('.modal-search');
  const searchButton = document.querySelector('.search-form__button');
  const modalSearchClose = document.querySelector('.modal-search__close');

  const modalCart = document.querySelector('.modal-cart');
  const cartButton = document.querySelector('.cart');
  const modalCartClose = document.querySelector('.modal-cart__close');
  const modalCartLink = document.querySelector('.modal-cart__link');

  const mq = window.matchMedia("(min-width: 1260px)");

  if (mq.matches) {
    searchButton.classList.remove('modal-search--open');
    modalSearch.classList.remove('modal-search--open');
    body.classList.remove('noscroll');
  } else {
    searchButton.addEventListener('click', () => {
      searchButton.classList.add('modal-search--open');
      modalSearch.classList.add('modal-search--open');
      body.classList.add('noscroll');
    });
  }

  modalSearchClose.addEventListener('click', () => {
    modalSearch.classList.remove('modal-search--open');
    body.classList.remove('noscroll');
  });

  cartButton.addEventListener('click', () => {
    cartButton.classList.add('modal-cart--open');
    modalCart.classList.add('modal-cart--open');
    body.classList.add('noscroll');
  });

  modalCartClose.addEventListener('click', () => {
    modalCart.classList.remove('modal-cart--open');
    body.classList.remove('noscroll');
  });

  modalCartLink.addEventListener('click', () => {
    modalCart.classList.remove('modal-cart--open');
    body.classList.remove('noscroll');
  });

  const tabBtn = document.querySelectorAll('.tabs__button');
  const tabContent = document.querySelectorAll('.tabs__content');

  tabBtn.forEach(function (element) {
    element.addEventListener('click', open);
  })

  function open(evt) {
    const tabTarget = evt.currentTarget;
    const button = tabTarget.dataset.button;

    tabBtn.forEach(function (item) {
      item.classList.remove('tabs__button--active');
    })

    tabTarget.classList.add('tabs__button--active');

    tabContent.forEach(function (item) {
      item.classList.remove('tabs__content--active');
    });

    document.querySelector(`#${button}`).classList.add('tabs__content--active');
  }

  const resizableSwiper = (breakpoint, swiperClass, swiperSettings, callback) => {
    let swiper;

    breakpoint = window.matchMedia(breakpoint);

    const enableSwiper = function (className, settings) {
      swiper = new Swiper(className, settings);

      if (callback) {
        callback(swiper);
      }
    }

    const checker = function () {
      if (breakpoint.matches) {
        return enableSwiper(swiperClass, swiperSettings);
      } else {
        if (swiper !== undefined) swiper.destroy(true, true);
        return;
      }
    };

    breakpoint.addEventListener('change', checker);
    checker();
  }

  resizableSwiper(
    '(max-width: 78.7488em)',
    '.product-listing__slider',
    {
      spaceBetween: 20,
      slidesPerView: 3,
      freeMode: true,
      breakpoints: {
        1024: {
          slidesPerView: 3,
        },
        800: {
          slidesPerView: 2.5,
        },
        680: {
          slidesPerView: 2,
        },
        576: {
          slidesPerView: 1.6,
        },
        430: {
          slidesPerView: 1.3,
        },
        320: {
          slidesPerView: 1,
        },
      }
    },
  );

  const testimonialsSlider = new Swiper(".testimonials__slider", {
    speed: 800,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    }
  });

  function animateCounter(counter, endValue, symbol) {
    const duration = 5000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    function animate() {
      const progress = frame / totalFrames;
      const currentValue = Math.round(progress * endValue);
      counter.textContent = currentValue + symbol;

      frame++;
      if (frame <= totalFrames) {
        requestAnimationFrame(animate);
      }
    }

    animate();
  }

  const counters = document.querySelectorAll(".progress-element__value");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const endValue = parseInt(counter.getAttribute("data-val"));
        const symbol = counter.textContent.replace(/[0-9]/g, '');

        animateCounter(counter, endValue, symbol);
        observer.unobserve(counter);
      }
    });
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });

  const modalVideo = document.querySelector('.modal-video');
  const videoPlay = document.querySelector('.video-block__play');

  videoPlay.addEventListener('click', () => {
    modalVideo.classList.add('modal-video--open');
    body.classList.add('noscroll');
  });

  modalVideo.addEventListener('click', () => {
    modalVideo.classList.remove('modal-video--open');
    body.classList.remove('noscroll');
  });

});
