'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // COUNTER
  const changeValCount = function (item, max, min, step) {
    const plus = item.querySelector(".plus"),
      minus = item.querySelector(".minus"),
      count = item.querySelector(".count");
    count.setAttribute('disabled', true);
    plus.addEventListener("click", function () {
      if (count.value < max) {
        count.value = +count.value + step;
      }
    });
    minus.addEventListener("click", function () {
      if (count.value > min) {
        count.value = +count.value - step;
      }
    })
  }

  document.querySelectorAll(".counter").forEach(function (item) {
    if (item.classList.contains('main-counter')) {
      changeValCount(item, 40, 5, 5);
    } else {
      changeValCount(item, 8, 2, 1);
    }

  })

  //FORMAT VIDEO PREVIEW
  const formatVideoSelect = document.querySelector(".format-video__change_input"),
    formatVideoZone = document.querySelector(".format-video__preview"),
    formatPreview = document.createElement("div");
  let pickedVideoFormat = formatVideoSelect.value;

  let formats = {
    f16x9: "rectangle16x9",
    f1x1: "square",
    f9x16: "rectangle9x16"
  }

  const createPreview = function (zone, item, picked) {
    let nameFormatArr = picked.split(":"),
      nameFormat = `f${nameFormatArr[0]}x${nameFormatArr[1]}`;
    item.classList = formats[nameFormat];
    zone.append(item);
  }

  createPreview(formatVideoZone, formatPreview, pickedVideoFormat);

  formatVideoSelect.addEventListener('change', () => {
    if (formatVideoSelect.value != pickedVideoFormat) {
      pickedVideoFormat = formatVideoSelect.value;
      console.log(formatVideoSelect.value);
      createPreview(formatVideoZone, formatPreview, pickedVideoFormat);

    }
  })

  //MORE-COLOR
  let createOptionalFiled = function (item) {
    const moreColorsCheckbox = item.querySelector(".optional-checkbox"),
      moreColorsInpt = item.querySelector(".optional-txt");
    moreColorsCheckbox.addEventListener('click', function () {
      if (moreColorsCheckbox.checked) {
        moreColorsInpt.removeAttribute('disabled', false);
        let itemClone = item.cloneNode(true), //clone
          cloneCheck = itemClone.querySelector(".optional-checkbox"),
          cloneInpt = itemClone.querySelector(".optional-txt");
        cloneCheck.checked = false;
        cloneInpt.setAttribute('disabled', true);
        if (item.nextSibling) {
          item.after(itemClone);
          item = item.nextSibling;
          createOptionalFiled(item);
        }
      } else {
        moreColorsInpt.setAttribute('disabled', true);
        item = item.previousSibling;
        if (item.nextSibling) {
          item.nextSibling.remove();
        }
      }
    })
    if (!moreColorsCheckbox.checked) {
      moreColorsInpt.setAttribute('disabled', true);
    }
  }

  // CAROUSEL - external plugin
  /* $(document).ready(function () {
    $('.sl').slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      responsive: [{
          breakpoint: 990,
          settings: {
            //arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            //arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 580,
          settings: {
            //arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 420,
          settings: {
            //arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });
  });
 */
  //получение выбранной анимации DISABLE
  /*  const slickSlide = document.querySelector('.sl');

   slickSlide.addEventListener('click', () => {

     let txtSlide = document.querySelector('.slick-current p');

     console.log(txtSlide)

   }) */


  // динамическое создание слайдов
  const slide = document.querySelector(".test1");

  const constructSlide = document.createElement("div");

  constructSlide.classList = "video-slide block test1"
  constructSlide.innerHTML = '<div class="wrapper"><div class="title-line"><div class="left-title"><h5 class="video-slide__number">1</h5><select class="video-slide__change form-control form-control-sm "><option>Побуждающая фраза</option><option>Логотип</option><option>Товар-Цена</option><option>Услуга-Описание</option><option>Акция</option><option>Контакты</option></select></div><div class="right-title"><h6 class="duration-title">Длительность</h6><div class="counter qty"><span class="minus bg-dark">-</span><input type="number" class="count" name="qty" value="5" disabled="true"><span class="plus bg-dark">+</span></div></div></div></div>'
  console.log(constructSlide);

  const main = document.querySelector('.main .col-md-8');

  console.log(main);
  main.append(constructSlide);


  //динамическое добавление Побуждающей фразы
  const nameForCarouselPromo = "sl1"
  document.querySelectorAll('.video-slide__change').forEach((item) => {
    switch (item.value) {
      case 'Побуждающая фраза':
        const insideSlideWrapp = item.parentNode.parentNode.parentNode;
        console.log(insideSlideWrapp);
        const stimulPraseInside = document.createElement('div');

        stimulPraseInside.innerHTML = `<div class="text-zone">
                <input class="text-field form-control" type="text" placeholder="Введите текст">
                <div class="more-colors optional-field form-check">
                  <input class="form-check-input optional-checkbox" type="checkbox" value="" id="defaultCheck1">
                  <label class="form-check-label" for="defaultCheck1">
                    <input class="optional-txt form-control form-control-sm" type="text" placeholder="Добавить еще текст">
                  </label>
                </div>
              </div>
              <h6 class="duration-title">Настроить анимацию</h6>
              <div class="chooseAnimation-zone">
                <div class="${nameForCarouselPromo}">
                  <div class="sl_slice"><img src="img/1.gif" alt="" class="sl_img">
                  <p class="sl_text">Текст на подложке</p>
                  </div>
                  <div class="sl_slice"><img src="img/2.gif" alt="" class="sl_img">
                    <p class="sl_text">Текст с фигурами</p></div>
                  <div class="sl_slice"><img src="img/3.gif" alt="" class="sl_img">
                    <p class="sl_text"> На подложке с фигурами</p>
                  </div>
                  <div class="sl_slice"><img src="img/1.gif" alt="" class="sl_img">
                    <p class="sl_text">Текст на подложке</p>
                </div>
                  <div class="sl_slice"><img src="img/2.gif" alt="" class="sl_img">
                    <p class="sl_text">Текст с фигурами</p></div>
                </div>
              </div>
              <div class="btn-zone"><button type="button" class="btn btn-outline-danger btn-sm">Удалить слайд</button></div>`

        insideSlideWrapp.append(stimulPraseInside);

        //добавляем работу доп. форм

        const optionalField = document.querySelectorAll(".optional-field");
        optionalField.forEach(function (item) {
          createOptionalFiled(item);
        })

        break;
    }
  });

  $(document).ready(function () {
    $('.sl1').slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      responsive: [{
          breakpoint: 990,
          settings: {
            //arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            //arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 580,
          settings: {
            //arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 420,
          settings: {
            //arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });
  });


})