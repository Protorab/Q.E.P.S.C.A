/** @format */

import $ from "jquery";
// import particles from "particles.js";
window.jQuery = $;
window.$ = $;
// import wow from "wowjs";
import Swiper from "./vendor/swiper-bundle.min.js";
import inputmask from "inputmask";
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
window.jQuery = $;
window.$ = $;

// import module example (npm i -D jquery)
// particlesJS.load(
//   "particles-js",
//   "../assets/json/particlesjs-config.json",
//   function () {
//     console.log("callback - particles-js config loaded");
//   }
// );
document.addEventListener("DOMContentLoaded", () => {
  const icon = document.querySelector(".icon");
  const menu = document.querySelector(".menu");
  const frame = document.querySelector(".frame");
  const popupForm = document.querySelector("#popup__form");
  const formPopup = document.querySelector(".form__popup");
  const popupBg = document.querySelector(".popup-bg");
  // const showForm = document.querySelectorAll(".show__form");
  const closeForm = document.querySelector(".close__form");
  const body = document.querySelector("body");

  function FormToggle(
    el1,
    el2,
    el1ShowClass,
    el2ShowClass,
    el1HideClass,
    el2HideClass
  ) {
    el1.classList.add(el1ShowClass);
    el1.classList.remove(el1HideClass);
    el2.classList.remove(el2HideClass);
    el2.classList.add(el2ShowClass);
    body.classList.toggle("__fixed");
  }
  function formShow() {
    FormToggle(
      popupForm,
      formPopup,
      "animate__fadeIn",
      "animate__backInDown",
      "animate__fadeOut",
      "animate__backOutUp"
    );
    setTimeout(function FormFadeIn() {
      popupForm.style.display = "flex";
    }, 100);
  }
  function formHide() {
    FormToggle(
      popupForm,
      formPopup,
      "animate__fadeOut",
      "animate__backOutUp",
      "animate__fadeIn",
      "animate__backInDown"
    );
    setTimeout(function FormFadeOut() {
      popupForm.style.display = "none";
    }, 1000);
  }
  popupBg.addEventListener("click", function (e) {
    e.preventDefault();
    formHide();
  });
  closeForm.addEventListener("click", function (e) {
    e.preventDefault();
    formHide();
  });
  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
      formHide();
    }
  });
  // $(document).ready(function () {
  //   $(".show__form").on("click", function () {
  //     let subject = $(this).data("subject");
  //     $("#popup__subject").val(subject);
  //     formShow();
  //   });
  // });

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
      pageSlide.params.freMode = false;
    }
    for (let i = 0; i < pageSlider.slides.length; i++) {
      const pageSlide = pageSlider.slides[i];
      const pageSlideContent = pageSlide.querySelector(".screen__content");
      if (pageSlideContent) {
        const pageSlideContentHeight = pageSlideContent.offsetHeight;
        if (pageSlideContentHeight > window.innerHeight) {
          wrapper.classList.add("__free");
          pageSlide.params.freMode = true;
          break;
        }
      }
    }
  }
  pageSlider.init();
});
