'use strict';

document.addEventListener('DOMContentLoaded', function () {

  //----MAIN-BLOCK----//
  // counter MAIN
  function changeValCountMain(item, max, min, step) {
    console.log('вызвали changeValCount');
    const plus = item.querySelector(".plus"),
      minus = item.querySelector(".minus"),
      count = item.querySelector(".count");
    count.setAttribute('disabled', true);
    plus.addEventListener("click", function () {
      if (count.value == step) { //только если MIN = 5 , а STEP = 10
        console.log('+');
        document.querySelector('.main-counter .minus').classList.remove('disabl');
      }
      if (count.value < max) {
        document.querySelector('.main-counter .minus').classList.remove('disabled');
        count.value = +count.value + step;
        let amountSlide = document.querySelectorAll('.video-slide').length;
        if (count.value / amountSlide >= step) {
          document.querySelector('.add-item-block.add-slide button').disabled = false;
          document.querySelector('.main-counter').classList.remove('notice');
        }
      }
      if (count.value == max) {
        plus.classList.add('disabled');
      }
    });

    minus.addEventListener("click", function () {

      let value = +count.value;
      if (value == max) {
        plus.classList.remove('disabled');
      }
      if (value / +document.querySelectorAll('.video-slide').length == step) {
        min = value;
        //document.querySelector('.main-counter').classList.add('notice');
      } else {
        min = min - step;
      }
      if (value > min) {
        count.value = value - step;
        value = count.value;
        let amountSlide = document.querySelectorAll('.video-slide').length;
        if (value / amountSlide == step) {
          document.querySelector('.add-item-block.add-slide button').disabled = true;
          //document.querySelector('.main-counter').classList.add('notice');
          console.log('получается нельзя меньше')
          minus.classList.add('disabled');
        }
      } else {
        console.log('не никак')
      };
      if (count.value == step) { //только если MIN = 5 , а STEP = 10
        console.log('object');
        document.querySelector('.main-counter .minus').classList.remove('disabled');
        document.querySelector('.main-counter .minus').classList.add('disabl');
      }

    })
  };

  //запускаем counter общей длины слайда
  changeValCountMain(document.querySelector('.counter.main-counter'), 40, 5, 5);

  // counter Slides
  function changeValCountSlides(item, max, min, step) {
    const plus = item.querySelector(".plus"),
      minus = item.querySelector(".minus"),
      count = item.querySelector(".count");
    count.setAttribute('disabled', true);
    plus.addEventListener("click", function () {
      if (count.value == min) {
        minus.classList.remove('disabled');
      }
      if (count.value < max) {
        count.value = +count.value + step;
      }
      if (count.value == max) {
        plus.classList.add('disabled');
      }
    });
    minus.addEventListener("click", function () {
      if (count.value == max) {
        plus.classList.remove('disabled');
      }
      if (count.value > min) {
        count.value = +count.value - step;
      }
      if (count.value == min) {
        minus.classList.add('disabled');
      }
    })
  };

  //Добавляем Touchstart and Touchend для counter
  function counterTouch(selector, element = "") {
    if (element != "") {
      selector = element;
    } else {
      selector = document.querySelector(`.${selector}`)
    }
    // MINUS TOUCHSTART
    selector.querySelector('span.minus').addEventListener("touchstart", function () {
      selector.querySelector('span.minus').classList.add('orange');
    });
    selector.querySelector('span.minus').addEventListener("touchend", function () {
      selector.querySelector('span.minus').classList.remove('orange');
    });
    // PLUS TOUCHSTART
    selector.querySelector('span.plus').addEventListener("touchstart", function () {
      selector.querySelector('span.plus').classList.add('orange');
    });
    selector.querySelector('span.plus').addEventListener("touchend", function () {
      selector.querySelector('span.plus').classList.remove('orange');
    });
  };
  counterTouch("main-settings");

  //загрузка файла 
  function uploadFile(target) { //заносим id Input
    target.addEventListener('change', () => {
      console.log(target.id);
      let amount = target.files.length;
      if (target.id == "extra-files" && amount != 0) {
        let comment = "";
        console.log(amount);
        switch (true) {
          case ((amount >= 2 && amount <= 4) || (amount % 10 >= 2 && amount % 10 <= 4)):
            comment = "изображения";
            break;
          case ((amount == 1) || (amount % 10 == 1)):
            comment = "изображение";
            break;
          case (amount >= 5 && amount <= 20):
            comment = "изображений";
            break;
        };
        console.log(comment);
        target.previousElementSibling.lastElementChild.textContent = target.files.length + " " + comment;
      } else {
        target.previousElementSibling.lastElementChild.textContent = target.files[0].name;
      }
    });
  };
  uploadFile(document.getElementById('main-logo'));
  uploadFile(document.getElementById('extra-files'));

  //format-video-preview
  const formatVideoSelect = document.querySelector(".format-video__change_input"),
    formatPreview = document.createElement("div");
  let formatVideoZone = document.querySelector(".format-video__preview");
  let pickedVideoFormat = formatVideoSelect.value;

  let formats = {
    f16x9: "rectangle16x9",
    f1x1: "square",
    f9x16: "rectangle9x16"
  }

  function createPreview(zone, item, picked) {
    console.log('вызвали createPreview для format');
    let nameFormatArr = picked.split(":"),
      nameFormat = `f${nameFormatArr[0]}x${nameFormatArr[1]}`;
    item.classList = formats[nameFormat];
    zone.append(item);
  }

  function createPreviewCustom() {
    const inputCustomSize = document.querySelector(".format-video__input-size"),
      inputHorizont = inputCustomSize.firstElementChild,
      inputVertical = inputCustomSize.lastElementChild;

    const customSizeElem = document.createElement('div');
    customSizeElem.classList.add("format-video__preview");
    customSizeElem.innerHTML = '<div class="custom-size-preview"></div>';
    inputCustomSize.after(customSizeElem);

    const customSizePreview = document.querySelector(".custom-size-preview");
    let horizontPx, verticalPx, proportionPx, resizeVerticalPx, resizeHorizontPx;

    customSizePreview.style.display = 'none';

    inputHorizont.addEventListener("input", () => {
      horizontPx = inputHorizont.value;
      if (!inputVertical.value == "") {
        if (inputHorizont.value == "" || inputVertical.value == "") {
          customSizePreview.style.display = 'none';
        } else {
          customSizePreview.style.display = 'block';
        }
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
        if (inputHorizont.value == "" || inputVertical.value == "") {
          customSizePreview.style.display = 'none';
        } else {
          customSizePreview.style.display = 'block';
        }

        proportionPx = 30 / verticalPx;
        resizeVerticalPx = proportionPx * verticalPx;
        resizeHorizontPx = proportionPx * horizontPx;
        customSizePreview.style.width = `${resizeHorizontPx}px`;
        customSizePreview.style.height = `${resizeVerticalPx}px`;
        customSizePreview.style.border = '1px solid #ffa500'
      }
    });
  }

  function deletePreviewCustom() {
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
        <input name="custom-format-width" class="form-control form-control-sm" type="number" placeholder="пиксели">
        <p>X</p>
        <input name="custom-format-height" class="form-control form-control-sm" type="number" placeholder="пиксели">`
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

  //What radio contact and disclaimer FOR 1 SLIDE

  const optionalContact = `<div class="option-contact solo-check form-check">
  <input class="form-check-input optional-checkbox" type="checkbox" value="" id="defaultCheck1">
  <label class="form-check-label" for="defaultCheck1">
    <input disabled name="optional-conatact" class="optional-txt form-control form-control-sm" type="text" placeholder="Контактная информация">
  </label>
  </div>`

  const optionalDisclaimer = `<div class="option-disclaimer solo-check form-check">
      <input class="form-check-input optional-checkbox" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        <input disabled name="optional-disclaimer" class="optional-txt form-control form-control-sm" type="text" placeholder="Дисклеймер">
      </label>
    </div>`

  let howDisplayContact = document.querySelector('input[name="contact-where"]:checked').value;
  let howDisplayDisclaimer = document.querySelector('input[name="disclaimer-where"]:checked').value;

  document.querySelectorAll('input[name="contact-where"]').forEach(elem => {
    elem.addEventListener('change', () => {
      if (elem.checked) {
        howDisplayContact = elem.value;
        if (howDisplayContact === 'all') {
          document.querySelectorAll('.option-contact').forEach((elem) => {
            elem.remove();
          })
        } else {
          document.querySelectorAll(".optional-contact__wrapp").forEach((elem) => {
            elem.innerHTML = optionalContact;
            elem.querySelector(".option-contact .optional-txt").value = contactValue;
          })
        }
      }
    })
  });

  document.querySelectorAll('input[name="disclaimer-where"]').forEach(elem => {
    elem.addEventListener('change', () => {
      if (elem.checked) {
        howDisplayDisclaimer = elem.value;
        if (howDisplayDisclaimer === 'all') {
          document.querySelectorAll('.option-disclaimer').forEach((elem) => {
            elem.remove();
          })
        } else {
          document.querySelectorAll(".optional-disclaimer__wrapp").forEach((elem) => {
            elem.innerHTML = optionalDisclaimer;
            elem.querySelector(".option-disclaimer .optional-txt").value = disclaimerValue;
          })
        }
      }
    })
  });

  let contactValue = "";
  let contactTextarea = document.querySelector('.contact-block textarea');

  contactTextarea.addEventListener('change', () => {
    contactValue = contactTextarea.value;
    document.querySelectorAll('.option-contact .optional-txt').forEach((elem) => {
      elem.value = contactValue;
    })
  })

  let disclaimerValue = "";
  let disclaimerTextarea = document.querySelector('.disclaimer-block textarea');

  disclaimerTextarea.addEventListener('change', () => {
    disclaimerValue = disclaimerTextarea.value;
    document.querySelectorAll('.option-disclaimer .optional-txt').forEach((elem) => {
      elem.value = disclaimerValue;
    })
  })

  //MORE - INPUT (more color)
  function turnForm(elem) {
    console.log("вызвали turnForm")
    const moreColorsCheckbox = elem.querySelector(".optional-checkbox"),
      moreColorsInpt = elem.querySelector(".optional-txt");

    moreColorsCheckbox.addEventListener('click', function () {
      if (moreColorsCheckbox.checked) {
        moreColorsInpt.removeAttribute('disabled', false);
      } else {
        moreColorsInpt.setAttribute('disabled', true);
      }
    });
  }

  function createOptionalFiled(item) {
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
        if (item.previousElementSibling !== null) {
          item = item.previousElementSibling;
          if (item.nextElementSibling !== null || item.nextElementSibling.classList.contains("optional-field")) {
            item.nextSibling.remove();
          }
        }
      }
    })
    if (!moreColorsCheckbox.checked) {
      moreColorsInpt.setAttribute('disabled', true);
    }
  }

  // динамическое создание слайдов
  function setSlideHtmlWithSelector(number, selector) {
    let logo = "",
      stimulPhrs = "",
      productPrice = "",
      serviceDescription = "",
      stock = "",
      contacts = "";
    switch (selector) {
      case "logo":
        logo = "selected";
        break;
      case "stimul":
        stimulPhrs = "selected";
        break;
      case "product":
        productPrice = "selected";
        break;
      case "service":
        serviceDescription = "selected";
        break;
      case "stock":
        stock = "selected";
        break;
      case "contact":
        contacts = "selected";
        break;
    };
    let forConstruct = `<div class="wrapper"><div class="title-line"><div class="left-title"><h5 class="video-slide__number">${number}</h5><select name="slide-${number}" class="video-slide__change form-control form-control-sm"><option value="stimul" ${stimulPhrs}>Побуждающая фраза</option><option value="logo" ${logo}>Логотип</option><option value="product" ${productPrice}>Товар-Цена</option><option value="service" ${serviceDescription}>Услуга-Описание</option><option value="stock" ${stock}>Акция</option><option value="contact" ${contacts}>Контакты</option></select></div><div class="right-title"><h6 class="duration-title">Длительность</h6><div class="counter qty slide-counter"><span class="minus">-</span><input type="number" class="count" name="qty" value="5" disabled="true"><span class="plus">+</span></div></div></div></div>`
    return forConstruct;
  }

  //ФУНКИЦЯ СОЗДАНИЯ ТЕЛА ВТОРОЙ ЧАСТИ СЛАЙДА
  function createSecondPartHtml(nameForInitSlider, optionalContact, optionalDisclaimer) {
    let textZoneHtml_1 = `<div class="text-zone">
       <input class="text-field form-control" type="text" name="stimul-text" placeholder="Введите текст">
       <div class="more-colors optional-field form-check">
         <input class="form-check-input optional-checkbox" type="checkbox"  id="defaultCheck1">
         <label class="form-check-label" for="defaultCheck1">
           <input name="optional-text" class="optional-txt form-control form-control-sm" type="text" placeholder="Добавить еще текст">
         </label>
       </div>
     </div>`;
    let textZoneHtml_2 = `<div class="text-zone">
     <div class="solo-check form-check">
       <input class="form-check-input optional-checkbox" type="checkbox" value="" id="defaultCheck1">
       <label class="form-check-label" for="defaultCheck1">
       <input disabled name="optional-text" class="optional-txt form-control form-control-sm" type="text" placeholder="Добавить слоган или фразу">
       </label>
     </div>
   </div>`;

    let textForContact = `<div class="option-contact solo-check form-check">
   <input class="form-check-input optional-checkbox" type="checkbox" value="" id="defaultCheck1">
   <label class="form-check-label" for="defaultCheck1">
     <input name="optional-text" class="optional-txt form-control form-control-sm" type="text" placeholder="Добавить слоган или фразу" disabled="true">
   </label>
   </div>`

    let textStockHtml = `<div class="text-zone">
        <textarea name="stock-text" class="form-control text-field stock-text" id="textarea3" placeholder="Текст акции" rows="1"></textarea>
   </div>`;

    let nameAttach,
        attachHtml,
        carouselHtml,
        gifName,
        nameAnim_1,
        nameAnim_2,
        nameAnim_3,
        nameAnim_4;

    function getCarouselHtml(gifName, nameAnim_1, nameAnim_2, nameAnim_3, nameAnim_4) {
        let carousel = `<h6 class="duration-title">Настроить анимацию</h6>
        <div class="chooseAnimation-zone">
          <div class="${nameForInitSlider}">
            <div class="sl_slice"><img src="img/${gifName}-1.gif" alt="" class="sl_img">
            <p class="sl_text">${nameAnim_1}</p>
            </div>
            <div class="sl_slice"><img src="img/${gifName}-2.gif" alt="" class="sl_img">
              <p class="sl_text">${nameAnim_2}</p></div>
            <div class="sl_slice"><img src="img/${gifName}-3.gif" alt="" class="sl_img">
              <p class="sl_text">${nameAnim_3}</p>
            </div>
            <div class="sl_slice"><img src="img/${gifName}-4.gif" alt="" class="sl_img">
              <p class="sl_text">${nameAnim_4}</p>
            </div> 
          </div>
        </div>`;
      return carousel;
    };

    function getAttachHtml(name) {
      let attach = `<div class="attach-block for-logo">
    <label class="my-file-input" for="exampleFormControlFile1"><ion-icon size="large" name="attach-outline"></ion-icon><p>${name}</p></label>
    <input type="file" name="example" accept="image/*" class="form-control-file" id="exampleFormControlFile1">
    </div>`
      return attach;
    };

    let productZoneHtml = `<div class="product-block mini-block" id="product-1">
      <div class="form-row">
        <div class="col-12 col-sm-8 col-md-8 col-lg-8">
          <input name="product-1_name" type="text" class="form-control  form-control-sm" placeholder="Название товара">
        </div>
        <div class="col">
          <input  name="product-1_price" type="text" class="form-control  form-control-sm" placeholder="Цена">
        </div>
      </div>
      <div class="form-row">
        <div class="col-12 col-sm-8 col-md-8 col-lg-8">
          <input name="product-1_descript" type="text" class="form-control  form-control-sm" placeholder="Описание товара">
        </div>
        <div class="col">
          <div class="attach-block for-product">
            <label class="my-file-input" for="product-slider-1_img-1">
              <ion-icon size="large" name="image-outline"></ion-icon>
              <p>Изображение</p>
            </label>
            <input type="file" name="product-slider-1_img-1" accept="image/*" class="form-control-file" id="product-slider-1_img-1">
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col">
        <div class="delete-item">
          <div class="close">
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="add-item-block inside">
      <div class="add-item">
        <p>+</p>
        <p>Добавить товар</p>
      </div>
    </div>`;

    let serviceZoneHtml = `<div class="product-block service mini-block" id="service-1">
      <div class="form-row">
        <div class="col-12 col-sm-8 col-md-8 col-lg-8">
          <input name="service-1_name" type="text" class="form-control  form-control-sm" placeholder="Название услуги">
        </div>
        <div class="col">
          <input name="service-1_price" type="text" class="form-control  form-control-sm" placeholder="Цена">
        </div>
      </div>
      <div class="form-row">
        <div class="col-12 col-sm-8 col-md-8 col-lg-8">
          <input name="service-1_descript" type="text" class="form-control  form-control-sm" placeholder="Описание услуги">
        </div>
        <div class="col">
          <div class="attach-block for-product">
            <label class="my-file-input" for="service-slider-1_img-1">
              <ion-icon size="large" name="image-outline"></ion-icon>
              <p>Изображение</p>
            </label>
            <input type="file" name="service-slider-1_img-1" accept="image/*" class="form-control-file" id="service-slider-1_img-1">
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col">
        <div class="delete-item">
          <div class="close">
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="add-item-block inside">
      <div class="add-item">
        <p>+</p>
        <p>Добавить услугу</p>
      </div>
    </div>`;

    let logoUseHtml = `<div class="form-check for-logo">
    <input class="form-check-input" type="checkbox" id="gridCheck" name="logo-use">
    <label class="form-check-label" for="gridCheck">
        Добавить логотип
    </label>
  </div>`
    let optionalFieldHtml = `<div class="optional-contact__wrapp">${optionalContact}</div>
     <div class="optional-disclaimer__wrapp">${optionalDisclaimer}</div>`;

    let removeSlideHtml = `<div class="btn-zone"><button type="button" class="btn-remove-slide btn btn-outline-danger btn-sm"><ion-icon name="trash-bin-outline"></ion-icon><p>Удалить слайд</p></button></div>`;

    let insideHtml;

    switch (true) {
      case /logo-part_slider/i.test(nameForInitSlider):
        nameAnim_1 = "Динамичный";
        nameAnim_2 = "Нежный";
        nameAnim_3 = "Технологичный";
        nameAnim_4 =  "Брутальный";
        nameAttach = 'Прикрепить логотип';
        attachHtml = getAttachHtml(nameAttach);
        gifName='logo';
        carouselHtml = getCarouselHtml(gifName, nameAnim_1, nameAnim_2, nameAnim_3, nameAnim_4);
        insideHtml = `${attachHtml}${textZoneHtml_2}${carouselHtml}${optionalFieldHtml}${removeSlideHtml}`;
        break;
      case /stimul-part_slider/i.test(nameForInitSlider):
        nameAnim_1 = "Динамичный";
        nameAnim_2 = "Нежный";
        nameAnim_3 = "Технологичный";
        nameAnim_4 =  "Брутальный";
        nameAttach = 'Прикрепить логотип';
        gifName='stimul';
        carouselHtml = getCarouselHtml(gifName, nameAnim_1, nameAnim_2, nameAnim_3, nameAnim_4);
        insideHtml = `${textZoneHtml_1}${carouselHtml}${logoUseHtml}${optionalFieldHtml}${removeSlideHtml}`;
        break;
      case /product-part_slider/i.test(nameForInitSlider):
        gifName='product';
        insideHtml = `${productZoneHtml}${carouselHtml}${logoUseHtml}${optionalFieldHtml}${removeSlideHtml}`;
        break;
      case /service-part_slider/i.test(nameForInitSlider):
        insideHtml = `${serviceZoneHtml}${carouselHtml}${logoUseHtml}${optionalFieldHtml}${removeSlideHtml}`;
        break;
      case /stock-part_slider/i.test(nameForInitSlider):
        nameAttach = 'Прикрепить изображение';
        attachHtml = getAttachHtml(nameAttach);
        insideHtml = `${attachHtml}${textStockHtml}${carouselHtml}${logoUseHtml}${optionalFieldHtml}${removeSlideHtml}`;
        break;
      case /contact-part_slider/i.test(nameForInitSlider):
        nameAttach = 'Прикрепить фото фасада';
        attachHtml = getAttachHtml(nameAttach);
        insideHtml = `${attachHtml}${textForContact}${carouselHtml}${logoUseHtml}${optionalFieldHtml}${removeSlideHtml}`;
        break;
    }
    //console.log(insideHtml);
    return insideHtml;
  };

  function setStimulHtmlWithSlider(name, optionalContact, howDisplayContact, optionalDisclaimer, howDisplayDisclaimer) {
    let insideHtmlStimulPrase = `<div class="text-zone">
       <input class="text-field form-control" type="text" name="stimul-text" placeholder="Введите текст">
       <div class="more-colors optional-field form-check">
         <input  class="form-check-input optional-checkbox" type="checkbox" id="defaultCheck1">
         <label class="form-check-label" for="defaultCheck1">
           <input name="optional-text" class="optional-txt form-control form-control-sm" type="text" placeholder="Добавить еще текст">
         </label>
       </div>
     </div>
     <h6 class="duration-title">Настроить анимацию</h6>
     <div class="chooseAnimation-zone">
       <div class="${name}">
         <div class="sl_slice"><img src="img/stimul-1.gif" alt="" class="sl_img">
         <p class="sl_text">Текст на подложке</p>
         </div>
         <div class="sl_slice"><img src="img/stimul-2.gif" alt="" class="sl_img">
           <p class="sl_text">Текст с фигурами</p></div>
         <div class="sl_slice"><img src="img/stimul-3.gif" alt="" class="sl_img">
           <p class="sl_text">На подложке с фигурами</p>
         </div>
         <div class="sl_slice"><img src="img/stimul-4.gif" alt="" class="sl_img">
           <p class="sl_text">Энергичный</p>
         </div> 
        </div>
        </div>
     <div class="form-check for-logo">
       <input class="form-check-input" type="checkbox" id="gridCheck" name="logo-use">
       <label class="form-check-label" for="gridCheck">
           Добавить логотип
       </label>
     </div>
     <div class="optional-contact__wrapp">${optionalContact}</div>
     <div class="optional-disclaimer__wrapp">${optionalDisclaimer}</div>
     <div class="btn-zone"><button type="button" class="btn-remove-slide btn btn-outline-danger btn-sm"><ion-icon name="trash-bin-outline"></ion-icon><p>Удалить слайд</p></button></div>`
    return insideHtmlStimulPrase;
  };

  let nameSlider;

  function createSecondPart(wrapp, part2, classPart, funcHtmlSlider) {
    part2 = document.createElement('div');
    part2.classList.add(classPart);
    part2.innerHTML = funcHtmlSlider;
    wrapp.append(part2);
  };

  function addProduct(insideSlideWrapp, nameSlider) {
    insideSlideWrapp.querySelector('.add-item').addEventListener('click', (elem) => {
      let target = elem.target;
      let allProducts = insideSlideWrapp.querySelectorAll('.product-block');
      let nextProduct = allProducts[allProducts.length - 1].cloneNode(true);

      let productNumb = +nextProduct.id.split("-")[1];
      let nextProductId = `${nextProduct.id.split("-")[0]}-${productNumb + 1}`;
      nextProduct.id = nextProductId;

      uploadFile(nextProduct.querySelector('input[type="file"]'));
      nameSlider = nameSlider.replace(/part_/g, "");
      let nextProductId2 = nextProductId.replace(/\w*-/gi, "");

      nextProduct.querySelectorAll('input[type="text"]')[0].setAttribute('name', nextProductId + "_name");
      nextProduct.querySelectorAll('input[type="text"]')[1].setAttribute('name', nextProductId + "_price");
      nextProduct.querySelectorAll('input[type="text"]')[2].setAttribute('name', nextProductId + "_descript");

      let idAttach = nameSlider + "_img-" + nextProductId2;
      nextProduct.querySelector('input[type="file"]').id = idAttach;
      nextProduct.querySelector('input[type="file"]').setAttribute('name', idAttach)
      nextProduct.querySelector('.my-file-input').setAttribute('for', idAttach);
      console.log(nextProduct.querySelector('input[type="file"]'));
      target.parentElement.parentElement.before(nextProduct);
      nextProduct.querySelectorAll('input').forEach((inpt) => {
        inpt.value = '';
        if (inpt.type == "file") {
          inpt.previousElementSibling.lastElementChild.textContent = 'Изображение';
        }
      });

      nextProduct.querySelector(".close").addEventListener('click', () => {
        if (insideSlideWrapp.querySelectorAll('.product-block').length > 1) {
          nextProduct.remove();
        }
      });
    });
  };

  function deleteSlide(btn) {
    if (document.querySelectorAll('.video-slide').length == 1) {
      document.querySelector('.btn-remove-slide').disabled = true;
    } else {
      document.querySelector('.btn-remove-slide').disabled = false;
    }
    btn.addEventListener('click', () => {
      //if (document.querySelectorAll('.video-slide.block').length != 1) {
      console.log("Удаляем Слайд")
      if (confirm("После удаления слайда данные не сохранятся. Удалить?")) {
        const targetVideoSlide = btn.parentNode.parentNode.parentNode.parentNode;
        targetVideoSlide.remove();
        let i = 1;
        let allSlides = document.querySelectorAll('.video-slide.block');
        document.querySelectorAll('.video-slide__number').forEach((item) => {
          allSlides[i - 1].classList = `video-slide block added-${i}`;
          allSlides[i - 1].querySelector('.video-slide__change').setAttribute('name', `slide-${i}`)
          item.textContent = i++;
        })
        //slideNumber = +document.querySelectorAll('.video-slide__number').length - 1;
        let mainCounterVal = document.querySelector(".main-counter input").value;
        console.log(i);

        if (mainCounterVal / (i - 1) <= 5) {
          document.querySelector('.add-item-block.add-slide button').disabled = true;
          document.querySelector('.main-counter .minus').classList.add('disabled');
        } else {
          document.querySelector('.add-item-block.add-slide button').disabled = false;
          document.querySelector('.main-counter .minus').classList.remove('disabled');
        }
        if (document.querySelectorAll('.video-slide').length == 1) {
          document.querySelector('.btn-remove-slide').disabled = true;
        } else {
          document.querySelector('.btn-remove-slide').disabled = false;
        }

        let logoCheck = document.querySelectorAll('.form-check.for-logo');
        console.log(logoCheck);
        logoCheck.forEach(el => {
          console.log(el);
          let numb = el.parentElement.parentElement.querySelector('.video-slide__number').textContent;
          el.querySelector('[name="logo-use"]').id = "gridCheck-" + numb;
          el.querySelector('.for-logo label').setAttribute("for", "gridCheck-" + numb)
        });
      }
    });
  };

  function initCarousel(carouselClass) {
    $(carouselClass).slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      slidesToScroll: 2,
      infinity: true,
      responsive: [{
        breakpoint: 990,
        settings: {
          //arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2
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
  };

  function getMaxLengthStimulPhrase(slideCounterInput) {
    return +slideCounterInput.value * 4;
  };

  //----MAIN---// динамическое добавление Побуждающей фразы на существующий
  document.querySelectorAll('.video-slide__change').forEach((item) => {
    let insideSlideWrapp, secondPart, optionalField;

    switch (item.value) {
      case 'stimul':
        console.log('перебор нашел Побуждающую фразу и создает оставшуюся часть слайда')
        insideSlideWrapp = item.parentNode.parentNode.parentNode;

        createSecondPart(insideSlideWrapp, secondPart, 'stimul-part', setStimulHtmlWithSlider("stimul-part_slider", optionalContact, howDisplayContact, optionalDisclaimer, howDisplayDisclaimer));
        //добавлям Touchstart на Counter этого слайда
        counterTouch("video-slide");

        //добавляем работу доп. форм
        optionalField = document.querySelectorAll(".optional-field");
        optionalField.forEach(function (item) {
          createOptionalFiled(item);
        })
        //соло формы
        insideSlideWrapp.querySelectorAll(".solo-check").forEach(function (item) {
          turnForm(item);
        })

        //запускаем counter длины 1го слайда
        changeValCountSlides(document.querySelector('.slide-counter'), 8, 2, 1);

        // валидация длины текста
        let invalFeedback = document.createElement('div');
        invalFeedback.classList.add('invalid-feedback');
        document.querySelector('.text-zone .text-field').after(invalFeedback);

        document.querySelector('.text-zone .text-field').addEventListener('input', (e) => {
          let maxLengthStimulPhrase = getMaxLengthStimulPhrase(document.querySelector('.slide-counter input'));
          if (e.target.value.length > maxLengthStimulPhrase) {
            e.target.classList.add('is-invalid');
            invalFeedback.textContent = `Длина текста ${e.target.value.length} при максимально допустимой в ${maxLengthStimulPhrase}`;
          } else {
            e.target.classList.remove('is-invalid');
            invalFeedback.textContent = '';
          }
        });

        break;
      case 'logo':
        console.log('перебор нашел Побуждающую фразу и создает оставшуюся часть слайда')
        insideSlideWrapp = item.parentNode.parentNode.parentNode;
        secondPart = document.createElement('div');
        secondPart.classList.add('logo-part');
        secondPart.innerHTML = setLogoHtmlWithSlider("stimul-part_slider");
        insideSlideWrapp.append(secondPart);
        //добавляем работу доп. форм
        optionalField = document.querySelectorAll(".optional-field");
        optionalField.forEach(function (item) {
          createOptionalFiled(item);
        })
        break;
    };
  });

  //иницианализируем карусель
  initCarousel('.stimul-part_slider');

  //иницинализируем функцию удаления слайда - идет после того как сформировалась
  deleteSlide(document.querySelector('.btn-remove-slide'));

  let iArr = 1; //для обхода массива названий слайдов

  // ----- Cоздать новый слайд по клику! 
  document.querySelector(".add-slide .add-item").addEventListener("click", () => {
    let slidesArr = ['stimul', 'logo', 'product', 'service', 'stock', 'contact'];

    let namePart = slidesArr[iArr];
    iArr++;
    if (iArr == slidesArr.length) {
      iArr = 0;
    }

    let allSlidesNumb = document.querySelectorAll('.video-slide__number');
    console.log(allSlidesNumb);
    let slideNumber = +allSlidesNumb[allSlidesNumb.length - 1].textContent + 1;
    console.log(slideNumber);

    let constructSlide = document.createElement("div");
    constructSlide.classList = `video-slide block added-${slideNumber}`
    constructSlide.innerHTML = setSlideHtmlWithSelector(slideNumber, namePart);
    let main = document.querySelector('.add-slide');
    main.before(constructSlide);

    let insideSlideWrapp, secondPart;
    insideSlideWrapp = document.querySelector(`.added-${slideNumber} .wrapper`);

    namePart = namePart + '-part';
    let number = (+document.querySelectorAll(`.${namePart}`).length + 1);
    console.log(number);
    let nameCarousel;
    if (number > 1) {
      nameCarousel = namePart + '_slider-' + number;
    } else {
      nameCarousel = namePart + '_slider';
      console.log(nameCarousel);
    };
    createSecondPart(insideSlideWrapp, secondPart, namePart, createSecondPartHtml(nameCarousel, optionalContact, optionalDisclaimer));
    console.log(insideSlideWrapp);

    //CHANGE COLOR TOUCHSTART COUNTER
    counterTouch("", constructSlide);
    // ЕСЛИ ЛОГО добавляем работу доп. форм(Нужно для: побуждающей, лого)
    if (namePart === 'logo-part') {
      let optionalField = document.querySelectorAll(".logo-part .optional-field");
      optionalField.forEach(function (item) {
        createOptionalFiled(item);
      });
    }
    // устанавливаем id для вложений
    if (namePart != 'stimul-part') {
      uploadFile(insideSlideWrapp.querySelector('.attach-block input'));
    }
    if (namePart === 'logo-part' || namePart === 'contact-part' || namePart === 'stock-part') {
      insideSlideWrapp.querySelector('.attach-block.for-logo input').id = namePart + "_attach-" + number;
      insideSlideWrapp.querySelector('.attach-block.for-logo label').setAttribute('for', namePart + "_attach-" + number);
      insideSlideWrapp.querySelector('.attach-block.for-logo input').setAttribute('name', namePart + "_attach-" + number);
    }

    //для установки ID опционному лого - ДОДЕЛАТЬ
    if (namePart != 'logo-part' && namePart != 'contact-part') {
      insideSlideWrapp.querySelector('.form-check.for-logo [name="logo-use"]').id = "gridCheck-" + constructSlide.querySelector('.video-slide__number').textContent;
      insideSlideWrapp.querySelector('.form-check.for-logo label').setAttribute("for", "gridCheck-" + constructSlide.querySelector('.video-slide__number').textContent);
    }

    //добавляем работу дизэйбл энэйбл для Соло форм
    insideSlideWrapp.querySelectorAll(".solo-check").forEach(function (item) {
      turnForm(item);
    })

    // валидация длины текста на Побуждающей
    if (namePart === 'stimul-part' || namePart === 'stock-part') {

      let invalFeedback = document.createElement('div');
      invalFeedback.classList.add('invalid-feedback');
      console.log(insideSlideWrapp.querySelector('.text-zone .text-field'));
      insideSlideWrapp.querySelector('.text-zone .text-field').after(invalFeedback);

      insideSlideWrapp.querySelector('.text-zone .text-field').addEventListener('input', (e) => {
        let maxLengthStimulPhrase = getMaxLengthStimulPhrase(insideSlideWrapp.querySelector('.slide-counter input'));
        if (e.target.value.length > maxLengthStimulPhrase) {
          e.target.classList.add('is-invalid');
          invalFeedback.textContent = `Длина текста ${e.target.value.length} при максимально допустимой в ${maxLengthStimulPhrase}`;
        } else {
          e.target.classList.remove('is-invalid');
          invalFeedback.textContent = '';
        }
      });
    }

    // ЕСЛИ ТОВАР-цена , услуга - добавить товар на страницу
    if (namePart === 'service-part' || namePart === 'product-part') { //<--------- ДЛЯ ТОВАР-ЦЕНА и УСЛУГА ЦЕНА
      addProduct(insideSlideWrapp, nameCarousel);
      if (document.querySelectorAll(`.${namePart}`).length > 1) {
        let nameSliderSlim = nameCarousel.replace(/part_/g, "");
        insideSlideWrapp.querySelector('input[type="file"]').id = nameSliderSlim + '_img-1';
        insideSlideWrapp.querySelector('input[type="file"]').setAttribute("name", nameSliderSlim + '_img-1');
        insideSlideWrapp.querySelector('.my-file-input').setAttribute("for", nameSliderSlim + '_img-1');
      }

      //УДАЛЕНИЕ ТОВАРА
      insideSlideWrapp.querySelector(".close").addEventListener('click', () => {
        if (insideSlideWrapp.querySelectorAll('.product-block').length >= 2) {
          console.log('удаляем товар или услугу');
          insideSlideWrapp.querySelector(".close").parentElement.parentElement;
          insideSlideWrapp.querySelector('.product-block').remove();
        };
      })
    };

    //иницинализируем карусель
    initCarousel(`.${nameCarousel}`);

    //запускаем Counter длины слайда и присваиваем класс слайда  и меняем Name
    const slideCounter = insideSlideWrapp.querySelector('.slide-counter');
    slideCounter.querySelector('input').classList.add(namePart + '-count-' + number);
    slideCounter.querySelector('input').setAttribute('name', namePart + '-count-' + number);
    changeValCountSlides(slideCounter, 8, 2, 1);

    // отображение доп форм КОНТАКТЫ ДИСКЛЭЙМЕР
    //собираем инфу из поля Контактов и дисклеймера и вносим в поля на слайде
    let howDisplayContact = document.querySelector('input[name="contact-where"]:checked').value;
    let howDisplayDisclaimer = document.querySelector('input[name="disclaimer-where"]:checked').value;

    if (howDisplayContact === 'all') {
      constructSlide.querySelector('.option-contact').remove();
    } else {
      const optionContactInput = constructSlide.querySelector('.option-contact .optional-txt');
      optionContactInput.value = document.querySelector('.contact-block textarea').value;
    }
    if (howDisplayDisclaimer === 'all') {
      constructSlide.querySelector('.option-disclaimer').remove();
    } else {
      const optionDisclaimerInput = constructSlide.querySelector('.option-disclaimer .optional-txt');
      optionDisclaimerInput.value = document.querySelector('.disclaimer-block textarea').value;
    }

    changeSlide(insideSlideWrapp.querySelector('.video-slide__change'));

    let mainCounterVal = document.querySelector(".main-counter input").value;
    if (mainCounterVal / slideNumber <= 5) {
      document.querySelector('.add-item-block.add-slide button').disabled = true;
      document.querySelector('.main-counter .minus').classList.add('disabled');
    } else {
      document.querySelector('.add-item-block.add-slide button').disabled = false;
      document.querySelector('.main-counter .minus').classList.remove('disabled');
    }

    //иницинализируем удаление слайда
    deleteSlide(insideSlideWrapp.querySelector(".btn-remove-slide"));

    //перемещаем кнопку добавить слайд
    document.querySelector('.last-main-block').before(document.querySelector(".add-slide"));

    // Перемотка к началу созданого элемента
    insideSlideWrapp.scrollIntoView();
  });


  function eventChangeSlide(elem) {
    const firstPart = elem.parentElement.parentElement;
    firstPart.nextElementSibling.remove();
    let secondPart, classForSecondP;
    switch (elem.value) {
      case "logo":
        classForSecondP = "logo-part";
        break;
      case "stimul":
        classForSecondP = "stimul-part";
        break;
      case "product":
        classForSecondP = "product-part";
        break;
      case "service":
        classForSecondP = "service-part";
        break;
      case "stock":
        classForSecondP = "stock-part";
        break;
      case "contact":
        classForSecondP = "contact-part";
        break;
    };

    let number = (+document.querySelectorAll(`.${classForSecondP}`).length + 1),
      nameSlider = classForSecondP + "_slider-" + number;
    createSecondPart(firstPart.parentElement, secondPart, classForSecondP, createSecondPartHtml(nameSlider, optionalContact, optionalDisclaimer));

    let constructSlide = firstPart.parentElement.parentElement;

    let insideSlideWrapp = firstPart.parentNode;

    let slideNumber = +constructSlide.querySelector('.video-slide__number').textContent;
    //добавляем работу доп. форм(Нужно для: побуждающей)
    if (classForSecondP === 'stimul-part') {
      let optionalField = constructSlide.querySelectorAll(".stimul-part .optional-field");
      optionalField.forEach(function (item) {
        createOptionalFiled(item);
      });
    }
    // устанавливаем id для вложений
    if (classForSecondP != 'stimul-part') {
      uploadFile(insideSlideWrapp.querySelector('.attach-block input'));
    }
    if (classForSecondP === 'logo-part' || classForSecondP === 'contact-part' || classForSecondP === 'stock-part') {
      insideSlideWrapp.querySelector('.attach-block.for-logo input').id = classForSecondP + "_attach-" + number;
      insideSlideWrapp.querySelector('.attach-block.for-logo label').setAttribute('for', classForSecondP + "_attach-" + number);
      insideSlideWrapp.querySelector('.attach-block.for-logo input').setAttribute('name', classForSecondP + "_attach-" + number);
    }

    //для установки ID опционному лого - ДОДЕЛАТЬ
    if (classForSecondP != 'logo-part' && classForSecondP != 'contact-part') {
      insideSlideWrapp.querySelector('.form-check.for-logo [name="logo-use"]').id = "gridCheck-" + slideNumber;
      insideSlideWrapp.querySelector('.form-check.for-logo label').setAttribute("for", "gridCheck-" + slideNumber);
    }

    //добавляем работу дизэйбл энэйбл для Соло форм
    insideSlideWrapp.querySelectorAll(".solo-check").forEach(function (item) {
      turnForm(item);
    })

    // ЕСЛИ ТОВАР-цена , услуга - добавить товар на страницу
    if (classForSecondP === 'service-part' || classForSecondP === 'product-part') { //<--------- ДЛЯ ТОВАР-ЦЕНА и УСЛУГА ЦЕНА
      addProduct(insideSlideWrapp, nameSlider);

      if (document.querySelectorAll(`.${classForSecondP}`).length > 1) {
        let nameSliderSlim = nameSlider.replace(/part_/g, "");
        insideSlideWrapp.querySelector('input[type="file"]').id = nameSliderSlim + '_img-1';
        insideSlideWrapp.querySelector('input[type="file"]').setAttribute("name", nameSliderSlim + '_img-1');
        insideSlideWrapp.querySelector('.my-file-input').setAttribute("for", nameSliderSlim + '_img-1');
      }

      //УДАЛЕНИЕ ТОВАРА
      insideSlideWrapp.querySelector(".close").addEventListener('click', () => {
        if (insideSlideWrapp.querySelectorAll('.product-block').length >= 2) {
          console.log('удаляем товар или услугу');
          insideSlideWrapp.querySelector(".close").parentElement.parentElement;
          insideSlideWrapp.querySelector('.product-block').remove();
        };
      });
    };

    //переименовываем counter слайда и меняем Name
    insideSlideWrapp.querySelector('.slide-counter input').classList = 'count ' + classForSecondP + '-count-' + number;
    insideSlideWrapp.querySelector('.slide-counter input').setAttribute('name', classForSecondP + '-count-' + number);

    //валидация длины формы
    if (classForSecondP === 'stimul-part' || classForSecondP === 'stock-part') {
      let invalFeedback = document.createElement('div');
      invalFeedback.classList.add('invalid-feedback');
      console.log(insideSlideWrapp.querySelector('.text-zone .text-field'));
      insideSlideWrapp.querySelector('.text-zone .text-field').after(invalFeedback);

      insideSlideWrapp.querySelector('.text-zone .text-field').addEventListener('input', (e) => {
        let maxLengthStimulPhrase = getMaxLengthStimulPhrase(insideSlideWrapp.querySelector('.slide-counter input'));
        if (e.target.value.length > maxLengthStimulPhrase) {
          e.target.classList.add('is-invalid');
          invalFeedback.textContent = `Длина текста ${e.target.value.length} при максимально допустимой в ${maxLengthStimulPhrase}`;
        } else {
          e.target.classList.remove('is-invalid');
          invalFeedback.textContent = '';
        }
      });
    }
    //иницинализируем слайдер
    initCarousel(`.${nameSlider}`);

    // отображение доп форм КОНТАКТЫ ДИСКЛЭЙМЕР
    //собираем инфу из поля Контактов и дисклеймера и вносим в поля на слайде
    let howDisplayContact = document.querySelector('input[name="contact-where"]:checked').value;
    let howDisplayDisclaimer = document.querySelector('input[name="disclaimer-where"]:checked').value;
    if (howDisplayContact === 'all') {
      constructSlide.querySelector('.option-contact').remove();
    } else {
      const optionContactInput = constructSlide.querySelector('.option-contact .optional-txt');
      optionContactInput.value = document.querySelector('.contact-block textarea').value;
    }
    if (howDisplayDisclaimer === 'all') {
      constructSlide.querySelector('.option-disclaimer').remove();
    } else {
      const optionDisclaimerInput = constructSlide.querySelector('.option-disclaimer .optional-txt');
      optionDisclaimerInput.value = document.querySelector('.disclaimer-block textarea').value;
    }
    deleteSlide(insideSlideWrapp.querySelector(".btn-remove-slide"));
  }

  function changeSlide(elem) {
    elem.addEventListener('change', ()=>{
      eventChangeSlide(elem);
    });
  };

  changeSlide(document.querySelector('.video-slide__change'));
//НУЖНО ДОБАВИТЬ ВЫБОР VALUE Чтобы сразу собрать ДРУГОЙ СЛАЙД
  eventChangeSlide(document.querySelector('.video-slide__change'));

  // СБОР ДАННЫХ ФОРМЫ
  /*  formElem.onsubmit = async (e) => {
     e.preventDefault();
     console.log( document.querySelector(".qty.main-counter .count"));
     document.querySelectorAll(".qty .count").forEach((el)=>{
       el.removeAttribute("disabled");
     });  

     let formData = new FormData(formElem);
     document.querySelectorAll('.slick-slider').forEach((el)=>{
       let parentNameAnimation = el.classList[0];
       let srcSlider = el.querySelector('.slick-current img').getAttribute('src');
       let nameAnimation = srcSlider.replace(/img\//gi, ""); 
       formData.append(parentNameAnimation, nameAnimation);
     });
     for(let [name, value] of formData) {
       console.log(`${name} = ${value}`); 
     };
     document.querySelectorAll(".qty .count").forEach((el)=>{
       el.setAttribute("disabled", "true");
     });  
    */
  /* let response = await fetch('/article/formdata/post/user', {
    method: 'POST',
    body: new FormData(formElem)
  }); */

  //let result = await response.json();
  //alert(result.message);

  let formElem = document.querySelector('#formElem');
  formElem.addEventListener('submit',(e)=>{
    e.preventDefault();
    let allDuration = document.querySelector('#main-conter-val').value;
    let slidesDurationArr=[],
        slidesDuration = 0;
    document.querySelectorAll('.slide-counter input').forEach((el)=>{
      slidesDurationArr.push(el.value);
    });

    console.log(allDuration);

    slidesDurationArr.forEach(element => {
      slidesDuration += (+element);
    });

    console.log(slidesDuration);

    if (allDuration >= slidesDuration){
      if (document.querySelector('.duration-message')){
        document.querySelector('.duration-message').remove();
      }
      submitHandler();
    } else {
      if (document.querySelector('.duration-message')){
        document.querySelector('.duration-message').remove();
        let durationMessage = document.createElement('div');
        durationMessage.classList.add('duration-message');
        durationMessage.textContent = "Сначала уменьшите длительность слайдов"
        document.querySelector('button[type="submit"]').before(durationMessage);
      } else {
        let durationMessage = document.createElement('div');
        durationMessage.classList.add('duration-message');
        durationMessage.textContent = "Сначала уменьшите длительность слайдов"
        document.querySelector('button[type="submit"]').before(durationMessage);
      };
    } 
  });

  function submitHandler() {
    //убираем disabled у Counter
    document.querySelectorAll(".qty .count").forEach((el) => {
      el.removeAttribute("disabled");
    });
    //формируем formData
    let formData = new FormData(formElem);
    for (let [name, value] of formData) {
      console.log(`${name} = ${value}`);
    }
    //добавляем в formData name Animation
    document.querySelectorAll('.slick-slider').forEach((el) => {
      let parentNameAnimation = el.classList[0];
      let srcSlider = el.querySelector('.slick-current img').getAttribute('src');
      let nameAnimation = srcSlider.replace(/img\//gi, "");
      formData.append(parentNameAnimation, nameAnimation);
    });

    for (let [name1, value1] of formData) {
      console.log(`${name1}=${value1}`);
    };
    //возвращаем инпут обратно
    document.querySelectorAll(".qty .count").forEach((el) => {
      el.setAttribute("disabled", "true");
    });
    console.log('идет отправка');
    document.querySelector('.modal .modal-body').textContent = "Отправляем данные... Не закрывайте окно до окончания отправки.";
    $(".modal").modal('show');
    fetch("send.php", {
        method: "POST",
        body: formData
      })
      .then(response => {
        return response.json()
      })
      .then(function (json) {
        console.log('отправлено');
        document.querySelector('.modal .modal-body').textContent = "Отправлено!"
        //$("#myModalBox").modal('show');
        /*process your JSON further */
      })
      .catch(function (error) {
        console.log(error);
        console.log("ошибка отправки");
        document.querySelector('.modal .modal-body').textContent = "Отправка не удалась , попробуйте еще раз."
      });
  };


})