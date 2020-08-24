'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // COUNTER
  const changeValCount = function (item, max, min, step) {
    console.log('вызвали changeValCount');
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

  //FORMAT VIDEO PREVIEW
  const formatVideoSelect = document.querySelector(".format-video__change_input"),
    formatPreview = document.createElement("div");
  let formatVideoZone = document.querySelector(".format-video__preview");
  let pickedVideoFormat = formatVideoSelect.value;

  let formats = {
    f16x9: "rectangle16x9",
    f1x1: "square",
    f9x16: "rectangle9x16"
  }
  const createPreview = function (zone, item, picked) {
    console.log('вызвали createPreview для format');
    let nameFormatArr = picked.split(":"),
      nameFormat = `f${nameFormatArr[0]}x${nameFormatArr[1]}`;
    item.classList = formats[nameFormat];
    zone.append(item);
  }

  const createPreviewCustom = function () {
    const inputCustomSize = document.querySelector(".format-video__input-size"),
      inputHorizont = inputCustomSize.firstElementChild,
      inputVertical = inputCustomSize.lastElementChild;

    const customSizeElem = document.createElement('div');
    customSizeElem.classList.add("format-video__preview");
    customSizeElem.innerHTML = '<div class="custom-size-preview"></div>';
    inputCustomSize.after(customSizeElem);

    const customSizePreview = document.querySelector(".custom-size-preview");
    let horizontPx, verticalPx, proportionPx, resizeVerticalPx, resizeHorizontPx;
    inputHorizont.addEventListener("input", () => {
      horizontPx = inputHorizont.value;
      if (!inputVertical.value == "") {
        proportionPx = 30 / verticalPx,
          resizeVerticalPx = proportionPx * verticalPx,
          resizeHorizontPx = proportionPx * horizontPx;
        customSizePreview.style.width = `${resizeHorizontPx}px`;
        customSizePreview.style.height = `${resizeVerticalPx}px`;
        customSizePreview.style.border = '1px solid #ffa500'
      }

    });
    inputVertical.addEventListener("input", () => {
      verticalPx = inputVertical.value;
      if (!inputHorizont.value == "") {
        proportionPx = 30 / verticalPx;
        resizeVerticalPx = proportionPx * verticalPx;
        resizeHorizontPx = proportionPx * horizontPx;
        customSizePreview.style.width = `${resizeHorizontPx}px`;
        customSizePreview.style.height = `${resizeVerticalPx}px`;
        customSizePreview.style.border = '1px solid #ffa500'
      }
    });
  }

  const deletePreviewCustom = function () {
    const formatVideoZone2 = document.querySelector('.format-video__preview');
    formatVideoZone2.remove();
  }

  if (formatVideoZone) {
    createPreview(formatVideoZone, formatPreview, pickedVideoFormat);
  }

  formatVideoSelect.addEventListener('change', () => {
    if (formatVideoSelect.value === "Ввести") {
      formatVideoZone.remove();
      const inputSize = document.createElement('div');
      inputSize.classList.add('format-video__input-size');
      inputSize.innerHTML = `
        <input class="form-control form-control-sm" type="number" placeholder="пиксели">
        <p>X</p>
        <input class="form-control form-control-sm" type="number" placeholder="пиксели">`
      formatVideoSelect.parentNode.after(inputSize);
      createPreviewCustom();
    } else {
      if (document.querySelector('.format-video__input-size')) {
        document.querySelector('.format-video__input-size').remove();
        deletePreviewCustom();
        formatVideoZone = document.createElement("div");
        formatVideoZone.classList.add("format-video__preview");
        formatVideoSelect.parentNode.after(formatVideoZone);
      }
      pickedVideoFormat = formatVideoSelect.value;
      createPreview(formatVideoZone, formatPreview, pickedVideoFormat);
    }
  })

  //MORE-COLOR
  const createOptionalFiled = function (item) {
    console.log('вызвали createOptionalFiled');
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
  const setSlideHtmlWithSelector = function (number,selector) {
    let logo = "",
      stimulPhrs = "",
      productPrice = "",
      serviceDescription = "",
      stock = "",
      contacts = "";
    switch (selector) {
      case "Логотип":
        logo = "selected";
        break;
      case "Побуждающая фраза":
        stimulPhrs = "selected";
        break;
      case "Товар-Цена":
        productPrice = "selected";
        break;
      case "Услуга-Описание":
        serviceDescription = "selected";
        break;
      case "Акция":
        stock = "selected";
        break;
      case "Контакты":
        contacts = "selected";
        break;
    };
    let forConstruct = `<div class="wrapper"><div class="title-line"><div class="left-title"><h5 class="video-slide__number">${number}</h5><select class="video-slide__change form-control form-control-sm "><option ${stimulPhrs}>Побуждающая фраза</option><option ${logo}>Логотип</option><option ${productPrice}>Товар-Цена</option><option ${serviceDescription}>Услуга-Описание</option><option ${stock}>Акция</option><option ${contacts}>Контакты</option></select></div><div class="right-title"><h6 class="duration-title">Длительность</h6><div class="counter qty stimul-phrase"><span class="minus bg-dark">-</span><input type="number" class="count" name="qty" value="5" disabled="true"><span class="plus bg-dark">+</span></div></div></div></div>`
    return forConstruct;

  }
  /*   const constructSlide = document.createElement("div");
    constructSlide.classList = "video-slide block"
    constructSlide.innerHTML = setSelector("Акция");
    const main = document.querySelector('.main .col-md-8');
    main.append(constructSlide); */

  const setStimulHtmlWithSlider = function (name) {
    let insideHtmlStimulPrase = `<div class="text-zone">
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
  <div class="${name}">
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
<div class="btn-zone"><button type="button" class="btn-remove-slide btn btn-outline-danger btn-sm">Удалить слайд</button></div>`
    return insideHtmlStimulPrase;
  };

  const setLogoHtmlWithSlider = function (name) {
    let insideHtmlLogo = `
    <label class="my-file-input" for="exampleFormControlFile1"><ion-icon size="large" name="attach-outline"></ion-icon><p>Прикрепить логотип</p></label>
<input type="file" class="form-control-file" id="exampleFormControlFile1">
    <div class="text-zone">
    <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Введите контактную информацию которая должна быть отражена в видеоролике" rows="3"></textarea>
    <div class="more-colors optional-field form-check">
      <input class="form-check-input optional-checkbox" type="checkbox" checked value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        <input class="slogan optional-txt form-control form-control-sm" type="text" placeholder="Добавить слоган или фразу" >
      </label>
    </div>
  </div>
  <h6 class="duration-title">Настроить анимацию</h6>
  <div class="chooseAnimation-zone">
    <div class="${name}">
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
  <div class="btn-zone"><button type="button" class="btn-remove-slide btn btn-outline-danger btn-sm">Удалить слайд</button></div>`
    return insideHtmlLogo;
  };

  const createSecondPart = function(wrapp, part2, classPart, funcHtmlSlider ){

    part2 = document.createElement('div');
    part2.classList.add(classPart);
    part2.innerHTML = funcHtmlSlider;
    wrapp.append(part2);

  };

  //динамическое добавление Побуждающей фразы или другого слайда исходя из существующих слайдов
  document.querySelectorAll('.video-slide__change').forEach((item) => {
    let insideSlideWrapp, secondPart, optionalField;
    switch (item.value) {
      case 'Побуждающая фраза':
        console.log('перебор нашел Побуждающую фразу и создает оставшуюся часть слайда')
        insideSlideWrapp = item.parentNode.parentNode.parentNode;

        createSecondPart(insideSlideWrapp,secondPart,'stimul-part', setStimulHtmlWithSlider("sl1"));

        //добавляем работу доп. форм
        optionalField = document.querySelectorAll(".optional-field");
        optionalField.forEach(function (item) {
          createOptionalFiled(item);
        })
        break;
      case 'Логотип':
        console.log('перебор нашел Побуждающую фразу и создает оставшуюся часть слайда')
        insideSlideWrapp = item.parentNode.parentNode.parentNode;
        secondPart = document.createElement('div');
        secondPart.classList.add('logo-part');
        secondPart.innerHTML = setLogoHtmlWithSlider("sl1");
        insideSlideWrapp.append(secondPart);
        //добавляем работу доп. форм
        optionalField = document.querySelectorAll(".optional-field");
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
      }, {
        breakpoint: 768,
        settings: {
          //arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      }, {
        breakpoint: 580,
        settings: {
          //arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2
        }
      }, {
        breakpoint: 420,
        settings: {
          //arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }]
    });
  });

  const deleteSlide = function () {
    document.querySelectorAll(".btn-remove-slide").forEach((elem) => {
      elem.addEventListener('click', () => {
        console.log("Удаляем Слайд")
        if (confirm("После удаления слайда данные не сохранятся. Удалить?")) {
          const targetVideoSlide = elem.parentNode.parentNode.parentNode.parentNode;
          targetVideoSlide.remove();
        }
      })
    })
  };

  deleteSlide(); //точно должна идти после формирования слайда

  document.querySelectorAll(".counter").forEach(function (item) {
    if (item.classList.contains('main-counter')) {
      changeValCount(item, 40, 5, 5);
    }
    if (item.classList.contains('stimul-phrase')) {
      changeValCount(item, 8, 2, 1);
    }

  })

  //создать новый слайд по клику
  document.querySelector(".add_slide").addEventListener("click", () => {
    const constructSlide = document.createElement("div");
    constructSlide.classList = "video-slide block added"
    constructSlide.innerHTML = setSlideHtmlWithSelector(2,"Логотип");
    let main = document.querySelector('.main .col-md-8');
    main.append(constructSlide);

    let insideSlideWrapp, secondPart;
    insideSlideWrapp = document.querySelector('.added .wrapper');

    createSecondPart(insideSlideWrapp,secondPart,'logo-part', setLogoHtmlWithSlider("logo_slide"));

    //добавляем работу доп. форм
    let optionalField = document.querySelectorAll(".optional-field");
    optionalField.forEach(function (item) {
      createOptionalFiled(item);
    });

    $(document).ready(function () {
      $('.logo_slide').slick({
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
        }, {
          breakpoint: 768,
          settings: {
            //arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        }, {
          breakpoint: 580,
          settings: {
            //arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 2
          }
        }, {
          breakpoint: 420,
          settings: {
            //arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }]
      });
    });
    deleteSlide();
    
    document.querySelector('.main .col-md-8').append(document.querySelector(".add_slide-wrapp"));

  })



})