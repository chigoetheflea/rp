"use strict";

const CLASS_REMOVING_TIME = 700;

const MENU = `.js-menu`;
const MENU_BUTTON = `.js-menu-button`;
const MENU_CLOSE = `.js-menu-close`;
const MENU_ACTIVE_CLASS = `main-menu--open`;
const MENU_CLOSED_CLASS = `main-menu--closed`;

const SLIDER_CLASSES = [`peppermint`, `peppermint-inactive`];
const SLIDER = `.js-slider`;
const SLIDER_NAV = `.js-slider-navigation`;
const SLIDER_PREV = `.js-slider-prev`;
const SLIDER_NEXT = `.js-slider-next`;
const SLIDER_DOTS = `.js-slider-dots`;
const SLIDER_ITEMS = `.slider__item`;
const SLIDER_NAV_TEXT_PREV = `.js-slider-nav-text-prev`;
const SLIDER_NAV_TEXT_NEXT = `.js-slider-nav-text-next`;
const SLIDER_ITEM_TITLE = `.js-slide-title`;
const SLIDER_NAV_TEXT_CHANGE_CLASS = `slider__navigation-text--change`;
const SLIDER_IMG = `.js-slider-img`;

const MODAL = `.js-modal`;
const MODAL_CLOSE = `.js-modal-close`;
const MODAL_BUTTON = `.js-modal-button`;
const MODAL_ACTIVE_CLASS = `modal--active`;
const MODAL_CLOSED_CLASS = `modal--closed`;
const MODAL_OPENED = `.js-modal-opened`;

const SCROLL_BUTTON_CLASS = `.js-scroll`;
const SCROLL_OFFSET = -50;

const LOADING = `.js-loading`;
const LOADING_HIDDEN_CLASS = `loading--hidden`;

const FORM = `.form`;
const FORM_VALIDATION = `.js-form`;
const FORM_RESULT = `.js-result`;
const FORM_INPUT = `.form__input`;
const FORM_RESULT_ACTIVE_CLASS = `form__result--active`;
const FORM_RESULT_TIMEOUT = 2000;
const FORM_ALERT_ERROR = `Ошибка отправки!`;
const FORM_ALERT_SUCCESS = `Отправлено!`;
const FORM_METHOD = `POST`;
const FORM_SERVER_URL = (typeof phpHandler !== `undefined` ) ? phpHandler.url : ``;
const FORM_FIELD_DEFAULT_VALUE = ``;
const FORM_SUBMIT = `.js-submit`;
const FORM_AGREE = `.js-agree`;
const FORM_DATE = '.js-date-picker';
const FORM_DATE_FORMAT = `F j, Y`;
const FORM_MASK = `.js-masked-input`;

const FILE_INPUT = `.js-file-input`;

const SELECT = `.js-select`;
const SELECT_BUTTON = `.js-select-button`;
const SELECT_LIST = `.js-select-list`;
const SELECT_INPUT = `js-select-input`;
const SELECT_ACTIVE_CLASS = `like-select__list--active`;
const SELECT_BUTTON_ACTIVE_CLASS = `like-select__button--active`;
const SELECT_CURRENT_OPTION_CLASS = `like-select__current`;

const VALIDATE_FIELD = `[data-validate='true']`;
const VALIDATE_TRUE_CLASS = `form__input--success`;
const VALIDATE_FALSE_CLASS = `form__input--error`;

const MAP = `#map`;
const MAP_HINT = `Ресторан «Русское Подворье»`;
const MAP_BALLOON_CONTENT = `Русское Подворье`;
const MAP_MARKER_PATH = `img/map_marker.svg`;

const GSAP_WRAPPER = `.js-gsap-wrapper`;
const GSAP_CONTENT = `.js-gsap-content`;
const GSAP_CHAIN = `.js-chain`;
const GSAP_CHAIN_TRIGGER = `.js-chain-trigger`;

const TABS = `.js-tabs`;
const TABS_BUTTON = `[role='tab']`;
const TABS_CONTENT = `[role='tabpanel']`;
const TABS_BUTTON_ACTIVE_CLASS = `tabs__button--active`;
const TABS_CONTENT_ACTIVE_CLASS = `tabs__content--active`;

const COUNT = `.js-count`;
const COUNT_FIELD = `.js-count-field`;
const COUNT_MINUS = `js-count-minus`;
const COUNT_PLUS = `js-count-plus`;
const COUNT_UPDATE_BUTTON = `.js-cart-update`;

const CART_ICON = `.js-cart`;
const CART_FULL_CLASS = `button-cart--not-empty`;
const CART_STICKY_ICON = `.js-sticky-cart`;
const CART_STICKY_FULL_CLASS = `sticky-icons__cart--active`;
const ADD_IN_CART_BUTTON = `.js-add-in-cart`;

const Test = {
  REQUIRED: `required`,
  PHONE: `phone`,
  EMAIL: `email`,
  TAGS: `tags`,
};

const MaskTemplates = {
  phone: new Inputmask(`+7 (999) 999-99-99`),
  email: new Inputmask({regex: '[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]+'}),
};

const SlidersSettings = {
  speed: 250,
  touchSpeed: 250,
  stopSlideshowAfterInteraction: true,
  dots: true,
  isResponsive: false,
};

const Resolution = {
  PC: 1200,
  TABLET: 560,
  MOBILE: 0,
};

const SliderItem = {
  PC: 1,
  TABLET: 1,
  MOBILE: 1,
};

const toggleClasses = (element, elClasses) => {
  elClasses.map((elClass) => {
    element.classList.toggle(elClass);
  });
};

document.addEventListener(`DOMContentLoaded`, function() {

  setTimeout(() => {
    document.querySelector(LOADING).classList.add(LOADING_HIDDEN_CLASS);
  }, 300);

  /* menu */

  const menuWrapper = document.querySelector(MENU);
  const isMenuOpen = (menu) => menu.classList.contains(MENU_ACTIVE_CLASS);

  const menuButtons = Array.from(document.querySelectorAll(MENU_BUTTON));
  let menuButtonClose = null;

  if (menuButtons && menuWrapper) {
    menuButtonClose = menuWrapper.querySelector(MENU_CLOSE);
  }

  const openMenu = () => {
    toggleClasses(menuWrapper, [MENU_ACTIVE_CLASS, MENU_CLOSED_CLASS]);

    menuButtonClose.addEventListener('click', closeMenu);
  };

  const closeMenu = () => {
    toggleClasses(menuWrapper, [MENU_ACTIVE_CLASS, MENU_CLOSED_CLASS]);

    menuButtonClose.removeEventListener(`click`, closeMenu);
  };

  if (menuButtons.length) {
    menuButtons.map((menuButton) => {
      menuButton.addEventListener(`click`, () => {
        (!isMenuOpen(menuWrapper)) ? openMenu() : closeMenu();
      });
    });
  }

  /* menu */

  /* sliders */

  const handleSliderControlClick = (slider, sliderContainer, evt) => {
    const sliderPrev = sliderContainer.querySelector(SLIDER_PREV);
    const sliderNext = sliderContainer.querySelector(SLIDER_NEXT);

    if (evt.target === sliderPrev ) {
      slider.prev();
    }

    if (evt.target === sliderNext ) {
      slider.next();
    }
  };

  const initSlider = (sliderContainer, sliderSettings = SlidersSettings) => {
    if (sliderContainer) {
      const sliderWrapper = sliderContainer.querySelector(SLIDER);
      const sliderNavigation = sliderContainer.querySelector(SLIDER_NAV);
      const sliderDots = sliderContainer.querySelector(SLIDER_DOTS);
      const initDelay = (sliderSettings.initDelay) ? sliderSettings.initDelay : 0;
      let slider = null;

      sliderWrapper.classList.add(...SLIDER_CLASSES);

      setTimeout(() => {
        slider = Peppermint(
          sliderWrapper, {
            ...sliderSettings,
            dotsContainer: sliderDots,
            onSlideChange: (slideNumber) => {

              if (sliderSettings.changeNavText) {
                changeSlidesNavText(sliderWrapper, sliderNavigation, slideNumber);
              }

              if (sliderSettings.useImgAnimation) {
                addAnimationToImg(sliderWrapper, slideNumber);
              }
            },
        });

        if (sliderNavigation) {
          sliderNavigation.addEventListener(`click`, handleSliderControlClick.bind(null, slider, sliderContainer));
        }
      }, initDelay);

      return slider;
    }
  };

  const addAnimationToImg = (sliderWrapper, slideNumber) => {
    const slides = sliderWrapper.querySelectorAll(SLIDER_ITEMS);
    const currentImg = slides[slideNumber].querySelector(SLIDER_IMG);
    const angle = currentImg.dataset.rotate;

    currentImg.classList.add(`slider__img--${angle}`);

    setTimeout(() => {
      currentImg.classList.remove(`slider__img--${angle}`);
    }, 1000);
  };

  const changeSlidesNavText = (sliderWrapper, sliderNavigation, slideNumber) => {
    const slides = sliderWrapper.querySelectorAll(SLIDER_ITEMS);
    const slidesCount = slides.length;

    const sliderNavTextPrev = sliderNavigation.querySelector(SLIDER_NAV_TEXT_PREV);
    const sliderNavTextNext = sliderNavigation.querySelector(SLIDER_NAV_TEXT_NEXT);

    const prevSlide = (slideNumber === 0) ? slidesCount - 1 : slideNumber - 1;
    const nextSlide = (slideNumber === slidesCount - 1) ? 0 : slideNumber + 1;

    const prevSlideText = slides[prevSlide].querySelector(SLIDER_ITEM_TITLE).textContent;
    const nextSlideText = slides[nextSlide].querySelector(SLIDER_ITEM_TITLE).textContent;

    sliderNavTextPrev.classList.add(SLIDER_NAV_TEXT_CHANGE_CLASS);
    sliderNavTextNext.classList.add(SLIDER_NAV_TEXT_CHANGE_CLASS);

    setTimeout(() => {
      sliderNavTextPrev.textContent = prevSlideText;
      sliderNavTextNext.textContent = nextSlideText;

      sliderNavTextPrev.classList.remove(SLIDER_NAV_TEXT_CHANGE_CLASS);
      sliderNavTextNext.classList.remove(SLIDER_NAV_TEXT_CHANGE_CLASS);
    }, 300);
  };

  const sliderUTP = initSlider(document.querySelector(`.js-slider-utp`), {
    ...SlidersSettings,
    slideshow: false,
    slideshowInterval: 2500,
    dots: false,
    useImgAnimation: true,
    changeNavText: false,
  });

  const sliderBanners = initSlider(document.querySelector(`.js-slider-banners`), {
    ...SlidersSettings,
    slideshow: true,
    slideshowInterval: 8000,
    dots: false,
    useImgAnimation: false,
    changeNavText: false,
  });

  const sliderHalls = initSlider(document.querySelector(`.js-slider-halls`), {
    ...SlidersSettings,
    slideshow: false,
    slideshowInterval: 2500,
    dots: false,
    useImgAnimation: true,
    changeNavText: true,
  });

  const sliderMenu = initSlider(document.querySelector(`.js-slider-menu`), {
    ...SlidersSettings,
    slideshow: false,
    dots: false,
  });

  /* sliders */

  /* modal */

  const closeModal = (modal, button) => {
    modal.classList.remove(MODAL_ACTIVE_CLASS);

    if (modal.classList.contains(MODAL_OPENED.replace(`.`, ''))) {
      sessionStorage.setItem(`modal_closed`, 1);
    }

    button.removeEventListener(`click`, handleModalCloseClick);
  }

  const openModal = (modal) => {
    let target = modal;
    let slide = null;

    if (modal.target) {
      target = document.querySelector(modal.dataset.target);
      slide = modal.dataset.slide;
    }

    const modalClose = target.querySelector(MODAL_CLOSE);

    if (slide) {
      sliderServices.slideTo(parseInt(slide));
    }

    if (target) {
      target.classList.add(MODAL_ACTIVE_CLASS);

      modalClose.addEventListener(`click`, handleModalCloseClick);
    }
  };

  const handleModalCloseClick = (evt) => {
    evt.preventDefault();

    const modal = evt.target.closest(MODAL);

    closeModal(modal, evt.target);
  }

  const handleModalButtonClick = (evt) => {
    evt.preventDefault();

    openModal(evt.target);
  };

  const modalButtons = Array.from(document.querySelectorAll(MODAL_BUTTON));

  if (modalButtons.length) {
    modalButtons.map((modalButton) => {
      modalButton.addEventListener(`click`, handleModalButtonClick);
    });
  }

  const modalOpened = document.querySelector(MODAL_OPENED);

  if (modalOpened && !sessionStorage.getItem(`modal_closed`)) {
    openModal(modalOpened);
  }

  /* modal */

  /* scroll */

  const scrollButtons = Array.from(document.querySelectorAll(SCROLL_BUTTON_CLASS));
  const isValidAnchor = (target) => (target !== `#` && target !== ``);

  const scrollToTarget = (selector) => {
    console.log(selector);
    const target = selector.getAttribute(`href`).trim();
    let position = 0;

    if (isValidAnchor(target)) {
      const targetElement = document.querySelector(selector.getAttribute(`href`).trim());

      position = targetElement.getBoundingClientRect().top;

      window.scrollBy({
        top: position,
        behavior: `smooth`,
      });

      if (isMenuOpen(menuWrapper)) {
        closeMenu();
      }
    }
  };

  const handleScrollButtonClick = (evt) => {
    evt.preventDefault();

    scrollToTarget(evt.target);
  };

  if (scrollButtons.length) {
    scrollButtons.map((scrollButton) => {
      scrollButton.addEventListener(`click`, handleScrollButtonClick);
    });
  }

  /* scroll */

  /* __ form sending */

  const clearForm = (form) => {
    const fields = Array.from(form.querySelectorAll(FORM_INPUT));
    const resultField = form.querySelector(FORM_RESULT);
    const submitButton = form.querySelector(FORM_SUBMIT);
    let fieldResetValue = FORM_FIELD_DEFAULT_VALUE;

    fields.map((field) => {
      console.log(field);
      if (field.classList.contains(SELECT_INPUT)) {
        const selectButton = field.parentNode.querySelector(SELECT_BUTTON);
        const selectList = field.parentNode.querySelector(`.${SELECT_CURRENT_OPTION_CLASS}`);
        const selectDefaultValue = selectButton.dataset.default;

        selectButton.querySelector(`span`).textContent = selectDefaultValue;
        selectList.classList.remove(SELECT_CURRENT_OPTION_CLASS);

        fieldResetValue = selectDefaultValue;
      }

      if (field.classList.contains(FILE_INPUT)) {
        field.files = null;

        const fileUpload = field.parentNode.querySelector(FILE_MARK);
        fileUpload.textContent = fileUpload.dataset.default;
      }

      field.value = fieldResetValue;
    });

    resultField.classList.remove(FORM_RESULT_ACTIVE_CLASS);
  };

  const displayXHRError = (form, response) => {
    console.log(`Sending error: ${response}`);

    const resultField = form.querySelector(FORM_RESULT);
    resultField.textContent = FORM_ALERT_ERROR;
    resultField.classList.add(FORM_RESULT_ACTIVE_CLASS);

    setTimeout(() => {
      resultField.classList.remove(FORM_RESULT_ACTIVE_CLASS);
    }, FORM_RESULT_TIMEOUT);
  };

  const displayXHRSuccess = (form) => {
    console.log(`send`);

    //ym(86360556, `reachGoal`, `Bronirovanie_zala`);

    const resultField = form.querySelector(FORM_RESULT);
    resultField.textContent = FORM_ALERT_SUCCESS;
    resultField.classList.add(FORM_RESULT_ACTIVE_CLASS);

    setTimeout(clearForm.bind(null, form), FORM_RESULT_TIMEOUT);
  };

  const sendFormData = (form) => {
    changeSubmitButtonStatus(form);

    const xhr = new XMLHttpRequest();
    const formData = new FormData(form);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          displayXHRSuccess(form);
        } else {
          displayXHRError(form, xhr.response);
        }

        changeSubmitButtonStatus(form);
      }
    };

    xhr.onerror = function() {
      displayXHRError(form);
    };

    xhr.open(FORM_METHOD, FORM_SERVER_URL);
    xhr.send(formData);
  };

  /* __ form sending */

  /* __ form check */

  const testRequired = (valueToTest) => {
    return valueToTest !== ``;
  };

  const testPhone = (valueToTest) => {
    const phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    return phoneRegExp.test(valueToTest);
  };

  const testEmail = (valueToTest) => {
    const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegExp.test(valueToTest);
  };

  const testTags = (valueToTest) => {
    const tags = valueToTest.replace(/\s+/, ``).split(TAG_SEPARATOR);

    return tags.length <= 3;
  };

  const checkField = (field) => {
    const tests = Object.keys(field.dataset);
    const fieldValue = field.value;

    const testingResult = tests.every((test) => {
      let singleTestResult = true;

      switch (test) {
        case Test.REQUIRED:
          singleTestResult = testRequired(fieldValue);
          break;

        case Test.PHONE:
          singleTestResult = testPhone(fieldValue);
          break;

        case Test.EMAIL:
          singleTestResult = testEmail(fieldValue);
          break;

        case Test.TAGS:
          singleTestResult = testTags(fieldValue);
      }

      return singleTestResult;
    });

    field.classList.remove(VALIDATE_TRUE_CLASS, VALIDATE_FALSE_CLASS);

    if (testingResult) {
      field.classList.add(VALIDATE_TRUE_CLASS);
    } else {
      field.classList.add(VALIDATE_FALSE_CLASS);

      setTimeout(() => {
        field.classList.remove(VALIDATE_FALSE_CLASS);
      }, 1000);
    }

    return testingResult;
  };

  const checkForm = (formToCheck) => {
    const fieldsToCheck = Array.from(formToCheck.querySelectorAll(VALIDATE_FIELD));

    const checkPromise = new Promise((resolve, reject) => {
      const validationResult = fieldsToCheck.every((field) => {
        return checkField(field);
      });

      validationResult ? resolve(validationResult) : reject(validationResult);
    });

    checkPromise.then(
      result => result
    ).then(
      result => sendFormData(formToCheck),
      error => console.log(`no`)
    );
  };

  const changeSubmitButtonStatus = (form) => {
    const FORM_SENDING_CLASS = `button--loading`;

    const submitButton = form.querySelector(FORM_SUBMIT);
    submitButton.classList.toggle(FORM_SENDING_CLASS);
  };

  const handleFormSubmit = (form, evt) => {
    evt.preventDefault();

    checkForm(form);
  };

  const form = document.querySelector(FORM_VALIDATION);

  if (form) {
    form.addEventListener(`submit`, handleFormSubmit.bind(null, form));
  }

  /* __ form check */

  /* form agree */

  const changeSubmitAvailability = (checkbox) => {
    const formSubmit = document.querySelector(FORM_SUBMIT);

    formSubmit.disabled = !checkbox.checked;
  };

  const handleFormAgreeClick = (evt) => {
    changeSubmitAvailability(evt.target);
  };

  if (form) {
    const formAgreeField = form.querySelector(FORM_AGREE);

    if (formAgreeField) {
      formAgreeField.addEventListener(`click`, handleFormAgreeClick);
    } else {
      const formSubmit = document.querySelector(FORM_SUBMIT);

      formSubmit.disabled = false;
    }
  }

  /* form agree */

  /* input masks */

  const formMasks = Array.from(document.querySelectorAll(FORM_MASK));

  if (formMasks.length) {
    formMasks.map((formMask) => {
      const maskType = formMask.dataset.mask;

      MaskTemplates[maskType].mask(formMask);
    });
  }

  /* input masks */

  /* form select */

  const customSelects = Array.from(document.querySelectorAll(SELECT));

  const chooseOption = (select, option) => {
    const currentOption = select.querySelector(`.${SELECT_CURRENT_OPTION_CLASS}`);
    const selectButton = select.querySelector(`${SELECT_BUTTON}>span`);
    const selectInput = select.querySelector(`.${SELECT_INPUT}`);

    if (currentOption) {
      currentOption.classList.remove(SELECT_CURRENT_OPTION_CLASS);
    }

    option.classList.add(SELECT_CURRENT_OPTION_CLASS);
    selectInput.value = option.textContent;
    selectButton.textContent = option.textContent;

    toggleSelectList(select);
  };

  const handleOptionClick = (evt) => {
    evt.preventDefault();

    const select = evt.target.closest(SELECT);

    chooseOption(select, evt.target);
  };

  const handleBodyClick = (evt) => {
    if (!evt.target.closest(SELECT)) {
      customSelects.forEach((select) => {
        const list = select.querySelector(SELECT_LIST);
        const isListOpen = list.classList.contains(SELECT_ACTIVE_CLASS);

        if (isListOpen) {
          toggleSelectList(select);
        }
      });
    }
  };

  const toggleSelectList = (select) => {
    const list = select.querySelector(SELECT_LIST);
    const selectButton = select.querySelector(SELECT_BUTTON);

    list.classList.toggle(SELECT_ACTIVE_CLASS);
    selectButton.classList.toggle(SELECT_BUTTON_ACTIVE_CLASS);

    const isListOpen = list.classList.contains(SELECT_ACTIVE_CLASS);

    if (isListOpen) {
      list.addEventListener(`click`, handleOptionClick);

      document.documentElement.addEventListener(`click`, handleBodyClick);
    } else {
      list.removeEventListener(`click`, handleOptionClick);

      document.documentElement.removeEventListener(`click`, handleBodyClick);
    }
  };

  const handleSelectClick = (select, evt) => {
    evt.preventDefault();

    toggleSelectList(select);
  };

  if (customSelects.length) {
    customSelects.map((select) => {
      const selectButton = select.querySelector(SELECT_BUTTON);

      selectButton.addEventListener(`click`, handleSelectClick.bind(null, select));
    });
  }

  /* form select */

  /* date picker */

  if (document.querySelectorAll(FORM_DATE).length) {
    flatpickr(FORM_DATE, {
      altFormat: FORM_DATE_FORMAT,
      altInput: true,
    });
  }

  /* date picker */

  /* gsap */

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  if (document.querySelector(`body`).classList.contains(`home`)) {
    if (!ScrollTrigger.isTouch) {
      // ScrollSmoother.create({
      //   wrapper: GSAP_WRAPPER,
      //   content: GSAP_CONTENT,
      //   smooth: 1,
      //   effects: true,
      // });
    }
  }

  setTimeout(() => {
    gsap.fromTo(GSAP_CHAIN, {x: 0}, {
      x: -1500,
      scrollTrigger: {
        trigger: GSAP_CHAIN_TRIGGER,
        scrub: true,
      },
    });
  }, 1000);

  /* gsap */

  /* map */

  const MARKER_MOBILE_SIZE = {
    width: 72,
    height: 82,
  };

  const defaultCoords = [55.651942, 37.604732];

  const coords = (typeof phpHandler !== `undefined`)
    ? (phpHandler.coords).replace(` `, ``).split(`,`)
    : defaultCoords;

  const markerUrl = (typeof phpHandler !== `undefined`)
    ? phpHandler.marker
    : MAP_MARKER_PATH;

  const currentMarkerSize = MARKER_MOBILE_SIZE;
  const mapContainer = document.querySelector(MAP);

  if (mapContainer) {
    ymaps.ready(function () {
      const mZoom = 17;
      const map = new ymaps.Map(`map`, {
          center: coords,
          zoom: mZoom,
        }, {
          searchControlProvider: `yandex#search`,
        }
      ),
      marker = new ymaps.Placemark(coords, {
          hintContent: MAP_HINT,
          balloonContent: MAP_BALLOON_CONTENT,
        }, {
          iconLayout: `default#image`,
          iconImageHref: markerUrl,
          iconImageSize: [currentMarkerSize.width, currentMarkerSize.height],
          iconImageOffset: [-1 * currentMarkerSize.width / 2, -1 * currentMarkerSize.height ],
        }
      );

      map.behaviors.disable(`scrollZoom`);
      map.geoObjects.add(marker);
    });
  }

  /* map */

  /* tabs */

  const showTab = (tabs, tabIndex) => {
    const tabsButtons = tabs.querySelectorAll(TABS_BUTTON);
    const newActiveTabButton = tabs.querySelector(`[aria-controls='${tabIndex}']`);
    const tabsContent = tabs.querySelectorAll(TABS_CONTENT);
    const newActiveTab = tabs.querySelector(`#${tabIndex}`);

    tabsButtons.forEach((tab) => {
      tab.classList.remove(TABS_BUTTON_ACTIVE_CLASS);
      tab.setAttribute(`aria-selected`, false);
    });

    newActiveTabButton.classList.add(TABS_BUTTON_ACTIVE_CLASS);
    newActiveTabButton.setAttribute(`aria-selected`, true);

    tabsContent.forEach((content) => {
      content.classList.remove(TABS_CONTENT_ACTIVE_CLASS);
    });

    newActiveTab.classList.add(TABS_CONTENT_ACTIVE_CLASS);
  };

  const handleTabButtonClick = (tabs, evt) => {
    const newActiveTabButton = evt.target;
    const newActiveTabIndex = newActiveTabButton.getAttribute(`aria-controls`);

    if (!newActiveTabButton.classList.contains(TABS_BUTTON_ACTIVE_CLASS)) {
      showTab(tabs, newActiveTabIndex);
    }
  };

  const tabsContainer = Array.from(document.querySelectorAll(TABS));

  if (tabsContainer.length) {
    tabsContainer.map((tabs) => {
      const tabsButtons = tabs.querySelectorAll(TABS_BUTTON);
      const defaultActiveTab = tabs.dataset.start;

      showTab(tabs, defaultActiveTab);

      tabsButtons.forEach((tabButton) => {
        tabButton.addEventListener(`click`, handleTabButtonClick.bind(null, tabs));
      });
    });
  }

  /* tabs */

  /* product count */

  const countFields = Array.from(document.querySelectorAll(COUNT));

  const changeCount = (target) => {
    const field = target.closest(COUNT).querySelector(COUNT_FIELD);
    const updateButton = document.querySelector(COUNT_UPDATE_BUTTON);
    let value = field.value;

    if (target.classList.contains(COUNT_MINUS)) {
      value = (value > 1) ? value-1 : value;
    }

    if (target.classList.contains(COUNT_PLUS)) {
      value++;
    }

    field.value = value;

    if (updateButton) {
      updateButton.disabled = false;
    }
  };

  const handleCountButtonClick = (evt) => {
    evt.preventDefault();

    changeCount(evt.target);
  };

  if (countFields.length) {
    countFields.map((countField) => {
      countField.addEventListener(`click`, handleCountButtonClick);
    });
  }

  /* product count */

  /* cart style */

  const addButtons = Array.from(document.querySelectorAll(ADD_IN_CART_BUTTON));

  const toggleCartClass = () => {
    const cartIcons = document.querySelectorAll(CART_ICON);
    const cartStickyIcon = document.querySelector(CART_STICKY_ICON);

    cartIcons.forEach((cartIcon) => {
      cartIcon.classList.add(CART_FULL_CLASS);
    });

    cartStickyIcon.classList.add(CART_STICKY_FULL_CLASS);
  };

  const handleAddButtonClick = (evt) => {
    evt.preventDefault();

    toggleCartClass();
  };

  if (addButtons.length) {
    addButtons.map((addButton) => {
      addButton.addEventListener(`click`, handleAddButtonClick);
    });
  }

  /* cart style */

  /* sticky header */

  const STICKY_HEADER = `.js-sticky-header`;
  const STICKY_HEADER_ACTIVE_CLASS = `sticky-header--active`;
  const STICKY_OFFSET = 300;

  const stickyHeader = document.querySelector(STICKY_HEADER);

  const changeHeaderStatus = (isSticky) => {

    (isSticky)
      ? stickyHeader.classList.add(STICKY_HEADER_ACTIVE_CLASS)
      : stickyHeader.classList.remove(STICKY_HEADER_ACTIVE_CLASS);
  };

  const handleWindowScroll = () => {
    const isSticky = window.scrollY > STICKY_OFFSET;

    changeHeaderStatus(isSticky);
  }

  if (stickyHeader) {
    document.addEventListener(`scroll`, handleWindowScroll);
  }

  /* sticky header */
});
