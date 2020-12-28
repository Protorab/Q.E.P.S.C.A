/** @format */

// import $ from "jquery";
// import particles from "particles.js";
// window.jQuery = $;
// window.$ = $;
// import wow from "wowjs";
import Swiper from "./vendor/swiper-bundle.min.js";
import Inputmask from "inputmask";
import loadingAttributePolyfill from "loading-attribute-polyfill";
// require("./vendor/mail.js");
// require("./vendor/swiper-bundle.min.js");

// const WOW = require("wowjs");
// const swiper = require("swiper");
var phone = document.querySelector(".telephone");

var phoneMask = new Inputmask({
  mask: "+375-99-999-99-99",
  clearIncomplete: true,
  greedy: false,
});
phoneMask.mask(phone);

// window.wow = new WOW.WOW();
// window.wow.init();
// window.jQuery = $;
// window.$ = $;

// import module example (npm i -D jquery)
// particlesJS.load(
//   "particles-js",
//   "../assets/json/particlesjs-config.json",
//   function () {
//     console.log("callback - particles-js config loaded");
//   }
// );

document.addEventListener("DOMContentLoaded", () => {
  const showMore = document.querySelectorAll(".show__more");
  const popupRates = document.querySelector(".popup__rates");
  const ratesMore = document.querySelector(".popup__more");
  const ratesDevelopment = document.querySelector("#development__text");
  const ratesAdvancing = document.querySelector("#advancing__text");
  const ratesTitle = document.querySelector("#more__title");
  const ratesDay = document.querySelector("#more__day");
  const ratesPrice = document.querySelector("#more__price");
  const ratesIcon = document.querySelector("#more__icon");
  const ratesList = document.querySelector("#rates__list");
  const ratesOrder = document.querySelector("#rates__order");
  const popupProject = document.querySelector(".popup__project");
  const projectPreview = document.querySelector(".project__preview");
  const projectPreviewImg = document.querySelector("#project__img");
  const showProject = document.querySelectorAll(".show__project");
  const popupForm = document.querySelector(".popup__form");
  const formPopup = document.querySelector(".form__popup");
  const popupBg = document.querySelectorAll(".popup__overlay");
  const showForm = document.querySelectorAll(".show__form");
  const closePopup = document.querySelectorAll(".close");
  const body = document.querySelector("body");
  let moreDevelopment,
    moreAdvancing,
    moreList,
    moreTitle,
    morePrice,
    moreIcon,
    moreDay;

  function popupToggle(
    popUp,
    popUpElement,
    el1ShowClassAdd,
    el2ShowClassAdd,
    el1HideClassRemove,
    el2HideClassRemove,
    state,
    timing
  ) {
    popUp.classList.add(el1ShowClassAdd);
    popUp.classList.remove(el1HideClassRemove);
    popUpElement.classList.remove(el2HideClassRemove);
    popUpElement.classList.add(el2ShowClassAdd);
    body.classList.toggle("__fixed");
    setTimeout(function FormFadeIn() {
      popUp.style.display = state;
    }, timing);
  }

  showForm.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      let subject = this.dataset.subject;
      console.log(subject);
      e.preventDefault();
      popupToggle(
        popupForm,
        formPopup,
        "animate__fadeIn",
        "animate__bounceInDown",
        "animate__fadeOut",
        "animate__bounceOutUp",
        "flex",
        100
      );
    });
  });
  if (showMore) {
    showMore.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        moreIcon = this.dataset.icon;
        moreDay = this.dataset.day;
        moreDevelopment = this.parentElement.parentElement.querySelector(
          ".more__development"
        );
        morePrice = this.parentElement.parentElement.parentElement.querySelector(
          ".rates__item-price h4"
        );
        moreTitle = this.parentElement.parentElement.parentElement.querySelector(
          ".rates__item-title h4"
        );
        moreAdvancing = this.parentElement.parentElement.querySelector(
          ".more__advancing"
        );
        moreList = this.parentElement.parentElement.querySelector(
          ".rates__item-short__info"
        );
        ratesOrder.dataset.subject = "Хочу заказать " + moreTitle.textContent;
        ratesIcon.src = moreIcon;
        ratesDay.innerHTML = moreDay;
        ratesList.innerHTML = moreList.innerHTML;
        ratesTitle.innerHTML = moreTitle.textContent;
        ratesPrice.innerHTML = morePrice.textContent;
        ratesDevelopment.innerHTML = moreDevelopment.innerHTML;
        ratesAdvancing.innerHTML = moreAdvancing.innerHTML;

        popupToggle(
          popupRates,
          ratesMore,
          "animate__fadeIn",
          "animate__bounceInDown",
          "animate__fadeOut",
          "animate__bounceOutUp",
          "flex",
          100
        );
        e.preventDefault();
      });
    });
  }

  function popupClose() {
    if (window.getComputedStyle(popupForm).display === "flex") {
      // popupHide(popupForm, formPopup);
      popupToggle(
        popupForm,
        formPopup,
        "animate__fadeOut",
        "animate__bounceOutUp",
        "animate__fadeIn",
        "animate__bounceInDown",
        "none",
        1000
      );
    }
    if (window.getComputedStyle(popupProject).display === "flex") {
      // popupHide(popupProject, projectPreview);
      popupToggle(
        popupProject,
        projectPreview,
        "animate__fadeOut",
        "animate__bounceOutUp",
        "animate__fadeIn",
        "animate__bounceInDown",
        "none",
        1000
      );
    }
    if (window.getComputedStyle(popupRates).display === "flex") {
      // popupHide(popupRates, ratesMore);
      popupToggle(
        popupRates,
        ratesMore,
        "animate__fadeOut",
        "animate__bounceOutUp",
        "animate__fadeIn",
        "animate__bounceInDown",
        "none",
        1000
      );
    }
  }

  showProject.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      let preview = this.dataset.preview;
      projectPreviewImg.src = preview;
      popupToggle(
        popupProject,
        projectPreview,
        "animate__fadeIn",
        "animate__bounceInDown",
        "animate__fadeOut",
        "animate__bounceOutUp",
        "flex",
        100
      );
      e.preventDefault();
    });
  });

  popupBg.forEach(function (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      popupClose();
    });
  });

  closePopup.forEach(function (close) {
    close.addEventListener("click", function (e) {
      popupClose();
      e.preventDefault();
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
      popupClose();
    }
  });

  let touchMove;

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // true for mobile device
    console.log("mobile device");
    touchMove = true;
  } else {
    // false for not mobile device
    console.log("not mobile device");
    touchMove = false;
  }

  const wrapper = document.querySelector(".wrapper");
  const pageSlider = new Swiper(".page", {
    // переопределить классы
    wrapperClass: "page__wrapper",
    slideClass: "page__screen",
    //задать направление
    direction: "vertical",
    // количество слайдов для показа
    slidesPerView: "auto",
    // включение параллакс
    parallax: true,

    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    mousewheel: {
      sensitivity: 1,
      releaseOnEdges: false,
    },
    allowTouchMove: touchMove,
    watchOverflow: true,
    speed: 800,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,

    pagination: {
      el: ".page__pagination",
      type: "bullets",
      clickable: true,
      bulletClass: "page__pagination-bollet",
      bulletActiveClass: "page__pagination-bollet-active",
    },
    scrollbar: {
      el: ".page__scroll",
      dragClass: "page__scroll-thumb",
      draggable: true,
    },
    init: false,
    on: {
      init: function () {
        menuSlider();
        setScrollType();
        wrapper.classList.add("__loaded");
      },
      slideChange: function () {
        menuSliderRemoveClass();
        menuLinks[pageSlider.realIndex].classList.add("__active");
      },
      resize: function () {
        setScrollType();
      },
    },
  });

  const menuLinks = document.querySelectorAll(".menu__link");
  function menuSlider() {
    if (menuLinks.length > 0) {
      menuLinks[pageSlider.realIndex].classList.add("__active");
      for (let i = 0; i < menuLinks.length; i++) {
        const menuLink = menuLinks[i];
        menuLink.addEventListener("click", function (e) {
          menuSliderRemoveClass();
          pageSlider.slideTo(i, 800);
          menuLink.classList.add("__active");
          e.preventDefault();
        });
      }
    }
  }

  function menuSliderRemoveClass() {
    const menuLinkActive = document.querySelector(".menu__link.__active");
    if (menuLinkActive) {
      menuLinkActive.classList.remove("__active");
    }
  }

  function setScrollType() {
    if (wrapper.classList.contains("__free")) {
      wrapper.classList.remove("__free");
      pageSlider.params.freMode = false;
    }
    for (let i = 0; i < pageSlider.slides.length; i++) {
      const pageSlide = pageSlider.slides[i];
      const pageSlideContent = pageSlide.querySelector(".screen__content");
      if (pageSlideContent) {
        const pageSlideContentHeight = pageSlideContent.offsetHeight;
        if (pageSlideContentHeight > window.innerHeight) {
          wrapper.classList.add("__free");
          pageSlider.params.freMode = true;
          break;
        }
      }
    }
  }
  pageSlider.init();

  const projectHorisontal = new Swiper(".project", {
    effect: "cube",
    rtl: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    // direction: "vertical",
    speed: 800,
    // spaceBetween: 100,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });

  const projectVertical = new Swiper(".project__vertical", {
    effect: "cube",

    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    direction: "vertical",
    speed: 800,
    // spaceBetween: 100,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
});
