/** @format */

// import $ from "jquery";
// import particles from "particles.js";
// window.jQuery = $;
// window.$ = $;
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

  function popupToggle(
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
    popupToggle(
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
    popupToggle(
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
  showForm.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      let subject = this.dataset.subject;
      console.log(subject);
      e.preventDefault();
      formShow();
    });
  });
  function projectShow() {
    popupToggle(
      popupProject,
      projectPreview,
      "animate__fadeIn",
      "animate__bounceIn",
      "animate__fadeOut",
      "animate__bounceOut"
    );
    setTimeout(function FormFadeIn() {
      popupProject.style.display = "flex";
    }, 100);
  }
  function projectHide() {
    popupToggle(
      popupProject,
      projectPreview,
      "animate__fadeOut",
      "animate__bounceOut",
      "animate__fadeIn",
      "animate__bounceIn"
    );
    setTimeout(function FormFadeOut() {
      popupProject.style.display = "none";
    }, 1000);
  }
  function popupHide() {
    if (window.getComputedStyle(popupForm).display === "flex") {
      formHide();
    }
    if (window.getComputedStyle(popupProject).display === "flex") {
      projectHide();
    }
  }
  showProject.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      let preview = this.dataset.preview;
      projectPreviewImg.src = preview;
      console.log(preview);
      projectShow();
      e.preventDefault();
    });
  });

  popupBg.forEach(function (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      popupHide();
    });
  });
  closePopup.forEach(function (close) {
    close.addEventListener("click", function (e) {
      popupHide();
      e.preventDefault();
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
      popupHide();
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
  // projectHorisontal.addEventListener("mouseenter", (e) => {
  //   projectHorisontal.autoplay.stop();
  // });
  // projectHorisontal.addEventListener("mouseleave", (e) => {
  //   projectHorisontal.autoplay.start();
  // });
});
