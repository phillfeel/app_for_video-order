'use strict';

document.addEventListener('DOMContentLoaded', function () {

  //----MAIN-BLOCK----//
  // counter
  function changeValCount(item, max, min, step) {
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

  //What radio contact and disclaimer

  const optionalContact = `<div class="option-contact solo-check form-check">
  <input class="form-check-input optional-checkbox" type="checkbox" value="" id="defaultCheck1">
  <label class="form-check-label" for="defaultCheck1">
    <input disabled class="optional-txt form-control form-control-sm" type="text" placeholder="Контактная информация">
  </label>
  </div>`

  const optionalDisclaimer = `<div class="option-disclaimer solo-check form-check">
      <input class="form-check-input optional-checkbox" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        <input disabled class="optional-txt form-control form-control-sm" type="text" placeholder="Дисклеймер">
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
    //console.log(item);
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
    let forConstruct = `<div class="wrapper"><div class="title-line"><div class="left-title"><h5 class="video-slide__number">${number}</h5><select class="video-slide__change form-control form-control-sm"><option value="stimul" ${stimulPhrs}>Побуждающая фраза</option><option value="logo" ${logo}>Логотип</option><option value="product" ${productPrice}>Товар-Цена</option><option value="service" ${serviceDescription}>Услуга-Описание</option><option value="stock" ${stock}>Акция</option><option value="contact" ${contacts}>Контакты</option></select></div><div class="right-title"><h6 class="duration-title">Длительность</h6><div class="counter qty stimul-phrase"><span class="minus bg-dark">-</span><input type="number" class="count" name="qty" value="5" disabled="true"><span class="plus bg-dark">+</span></div></div></div></div>`
    return forConstruct;
  }

  //ФУНКИЦЯ СОЗДАНИЯ ТЕЛА ВТОРОЙ ЧАСТИ СЛАЙДА
  function createSecondPartHtml(nameForInitSlider, optionalContact, optionalDisclaimer) {
    let textZoneHtml_1 = `<div class="text-zone">
       <input class="text-field form-control" type="text" placeholder="Введите текст">
       <div class="more-colors optional-field form-check">
         <input class="form-check-input optional-checkbox" type="checkbox" value="" id="defaultCheck1">
         <label class="form-check-label" for="defaultCheck1">
           <input class="optional-txt form-control form-control-sm" type="text" placeholder="Добавить еще текст">
         </label>
       </div>
     </div>`;
    let textZoneHtml_2 = `<div class="text-zone">
     <div class="solo-check form-check">
       <input class="form-check-input optional-checkbox" type="checkbox" value="" id="defaultCheck1">
       <label class="form-check-label" for="defaultCheck1">
       <input disabled class="optional-txt form-control form-control-sm" type="text" placeholder="Добавить слоган или фразу">
       </label>
     </div>
   </div>`;

    let textForContact = `<div class="option-contact solo-check form-check">
   <input class="form-check-input optional-checkbox" type="checkbox" value="" id="defaultCheck1">
   <label class="form-check-label" for="defaultCheck1">
     <input class="optional-txt form-control form-control-sm" type="text" placeholder="Добавить слоган или фразу" disabled="true">
   </label>
   </div>`

    let textStockHtml = `<div class="text-zone">
        <textarea class="form-control stock-text" id="textarea3" placeholder="Текст акции" rows="1"></textarea>
   </div>`;

    let nameAttach;
    let attachHtml;

    function getAttachHtml(name) {
      let attach = `<div class="attach-block for-logo">
    <label class="my-file-input" for="exampleFormControlFile1"><ion-icon size="large" name="attach-outline"></ion-icon><p>${name}</p></label>
    <input type="file" class="form-control-file" id="exampleFormControlFile1">
    </div>`
      return attach;
    };

    let productZoneHtml = `<div class="product-block mini-block" id="product-1">
      <div class="form-row">
        <div class="col-12 col-sm-8 col-md-8 col-lg-8">
          <input type="text" class="form-control  form-control-sm" placeholder="Название товара">
        </div>
        <div class="col">
          <input type="text" class="form-control  form-control-sm" placeholder="Цена">
        </div>
      </div>
      <div class="form-row">
        <div class="col-12 col-sm-8 col-md-8 col-lg-8">
          <input type="text" class="form-control  form-control-sm" placeholder="Описание товара">
        </div>
        <div class="col">
          <div class="attach-block for-product">
            <label class="my-file-input" for="exampleFormControlFile1">
              <ion-icon size="large" name="image-outline"></ion-icon>
              <p>Изображение</p>
            </label>
            <input type="file" class="form-control-file" id="exampleFormControlFile1">
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
          <input type="text" class="form-control  form-control-sm" placeholder="Название услуги">
        </div>
        <div class="col">
          <input type="text" class="form-control  form-control-sm" placeholder="Цена">
        </div>
      </div>
      <div class="form-row">
        <div class="col-12 col-sm-8 col-md-8 col-lg-8">
          <input type="text" class="form-control  form-control-sm" placeholder="Описание услуги">
        </div>
        <div class="col">
          <div class="attach-block for-product">
            <label class="my-file-input" for="exampleFormControlFile1">
              <ion-icon size="large" name="image-outline"></ion-icon>
              <p>Изображение</p>
            </label>
            <input type="file" class="form-control-file" id="exampleFormControlFile1">
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

    let carouselHtml = `<h6 class="duration-title">Настроить анимацию</h6>
     <div class="chooseAnimation-zone">
       <div class="${nameForInitSlider}">
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
     </div>`;

    let optionalFieldHtml = `<div class="optional-contact__wrapp">${optionalContact}</div>
     <div class="optional-disclaimer__wrapp">${optionalDisclaimer}</div>`;

    let removeSlideHtml = `<div class="btn-zone"><button type="button" class="btn-remove-slide btn btn-outline-danger btn-sm"><ion-icon name="trash-bin-outline"></ion-icon><p>Удалить слайд</p></button></div>`;

    let insideHtml;

    switch (true) {
      case /logo-part_slider/i.test(nameForInitSlider):
        nameAttach = 'Прикрепить логотип';
        attachHtml = getAttachHtml(nameAttach);
        insideHtml = `${attachHtml}${textZoneHtml_2}${carouselHtml}${optionalFieldHtml}${removeSlideHtml}`;
        break;
      case /stimul-part_slider/i.test(nameForInitSlider):
        insideHtml = `${textZoneHtml_1}${carouselHtml}${optionalFieldHtml}${removeSlideHtml}`;
        break;
      case /product-part_slider/i.test(nameForInitSlider):
        insideHtml = `${productZoneHtml}${carouselHtml}${optionalFieldHtml}${removeSlideHtml}`;
        break;
      case /service-part_slider/i.test(nameForInitSlider):
        insideHtml = `${serviceZoneHtml}${carouselHtml}${optionalFieldHtml}${removeSlideHtml}`;
        break;
      case /stock-part_slider/i.test(nameForInitSlider):
        nameAttach = 'Прикрепить изображение';
        attachHtml = getAttachHtml(nameAttach);
        insideHtml = `${attachHtml}${textStockHtml}${carouselHtml}${optionalFieldHtml}${removeSlideHtml}`;
        break;
      case /contact-part_slider/i.test(nameForInitSlider):
        nameAttach = 'Прикрепить фото фасада';
        attachHtml = getAttachHtml(nameAttach);
        insideHtml = `${attachHtml}${textForContact}${carouselHtml}${optionalFieldHtml}${removeSlideHtml}`;
        break;
    }
    //console.log(insideHtml);
    return insideHtml;

  };


  function setStimulHtmlWithSlider(name, optionalContact, howDisplayContact, optionalDisclaimer, howDisplayDisclaimer) {
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
<div class="optional-contact__wrapp">${optionalContact}</div>
<div class="optional-disclaimer__wrapp">${optionalDisclaimer}</div>
<div class="btn-zone"><button type="button" class="btn-remove-slide btn btn-outline-danger btn-sm"><ion-icon name="trash-bin-outline"></ion-icon><p>Удалить слайд</p></button></div>`
    return insideHtmlStimulPrase;
  };

  let nameSlider;

  function setLogoHtmlWithSlider(name, optionalContact, howDisplayContact, optionalDisclaimer, howDisplayDisclaimer) {
    let insideHtmlLogo = `
    <div class="attach-block for-logo">
    <label class="my-file-input" for="exampleFormControlFile1"><ion-icon size="large" name="attach-outline"></ion-icon><p>Прикрепить логотип</p></label>
    <input type="file" class="form-control-file" id="exampleFormControlFile1">
    </div>
    <div class="text-zone">
    <div class="solo-check form-check">
      <input class="form-check-input optional-checkbox" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
      <input disabled class="optional-txt form-control form-control-sm" type="text" placeholder="Добавить слоган или фразу">
      </label>
    </div>
  </div>
  <h6 class="duration-title">Настроить анимацию</h6>
  <div class="chooseAnimation-zone">
    <div class="${name} hide">
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
  <div class="optional-contact__wrapp">${optionalContact}</div>
  <div class="optional-disclaimer__wrapp">${optionalDisclaimer}</div>
  <div class="btn-zone"><button type="button" class="btn-remove-slide btn btn-outline-danger btn-sm"><ion-icon name="trash-bin-outline"></ion-icon><p>Удалить слайд</p></button></div>`
    return insideHtmlLogo;
  };

  function setProductHtmlWithSlider(name, optionalContact, optionalDisclaimer) {
    let insideHtmlLogo = `
    <div class="product-block mini-block" id="product-1">
    <div class="form-row">
      <div class="col-12 col-sm-8 col-md-8 col-lg-8">
        <input type="text" class="form-control  form-control-sm" placeholder="Название товара">
      </div>
      <div class="col">
        <input type="text" class="form-control  form-control-sm" placeholder="Цена">
      </div>
    </div>
    <div class="form-row">
      <div class="col-12 col-sm-8 col-md-8 col-lg-8">
        <input type="text" class="form-control  form-control-sm" placeholder="Описание товара">
      </div>
      <div class="col">
        <div class="attach-block for-product">
          <label class="my-file-input" for="exampleFormControlFile1">
            <ion-icon size="large" name="image-outline"></ion-icon>
            <p>Изображение</p>
          </label>
          <input type="file" class="form-control-file" id="exampleFormControlFile1">
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
  <div class="optional-contact__wrapp">${optionalContact}</div>
  <div class="optional-disclaimer__wrapp">${optionalDisclaimer}</div>
  <div class="btn-zone"><button type="button" class="btn-remove-slide btn btn-outline-danger btn-sm"><ion-icon name="trash-bin-outline"></ion-icon><p>Удалить слайд</p></button></div>`
    return insideHtmlLogo;
  };

  function createSecondPart(wrapp, part2, classPart, funcHtmlSlider) {
    part2 = document.createElement('div');
    part2.classList.add(classPart);
    part2.innerHTML = funcHtmlSlider;
    wrapp.append(part2);
  };

  function addProduct(insideSlideWrapp) {
    insideSlideWrapp.querySelector('.add-item').addEventListener('click', (elem) => {
      let target = elem.target;
      let allProducts = insideSlideWrapp.querySelectorAll('.product-block');
      let nextProduct = allProducts[allProducts.length - 1].cloneNode(true);
      let productNumb = +nextProduct.id.split("-")[1];
      let nextProductId = `${nextProduct.id.split("-")[0]}-${productNumb + 1}`;
      nextProduct.id = nextProductId;
      console.log(target.parentElement.parentElement);
      target.parentElement.parentElement.before(nextProduct);

      nextProduct.querySelector(".close").addEventListener('click', () => {
        if (insideSlideWrapp.querySelectorAll('.product-block').length > 1) {
          nextProduct.remove();
        }
      });
    });
  };

  function deleteSlide(btn) {
    btn.addEventListener('click', () => {
      console.log("Удаляем Слайд")
      if (confirm("После удаления слайда данные не сохранятся. Удалить?")) {
        const targetVideoSlide = btn.parentNode.parentNode.parentNode.parentNode;
        targetVideoSlide.remove();
        let i = 1;
        let allSlides = document.querySelectorAll('.video-slide.block');
        document.querySelectorAll('.video-slide__number').forEach((item) => {
          allSlides[i - 1].classList = `video-slide block added-${i}`;
          item.textContent = i++;
        })
        //slideNumber = +document.querySelectorAll('.video-slide__number').length - 1;
        if (document.querySelectorAll('.video-slide').length === 5) {
          document.querySelector('.add-item-block.add-slide').style.display = 'block';
        }
      }
    });
  };

  function initCarousel(carouselClass) {
    $(carouselClass).slick({
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
  };

  //----MAIN---// динамическое добавление Побуждающей фразы на существующий
  document.querySelectorAll('.video-slide__change').forEach((item) => {
    let insideSlideWrapp, secondPart, optionalField;

    switch (item.value) {
      case 'stimul':
        console.log('перебор нашел Побуждающую фразу и создает оставшуюся часть слайда')
        insideSlideWrapp = item.parentNode.parentNode.parentNode;

        createSecondPart(insideSlideWrapp, secondPart, 'stimul-part', setStimulHtmlWithSlider("sl1", optionalContact, howDisplayContact, optionalDisclaimer, howDisplayDisclaimer));
        //добавляем работу доп. форм
        optionalField = document.querySelectorAll(".optional-field");
        optionalField.forEach(function (item) {
          createOptionalFiled(item);
        })
        insideSlideWrapp.querySelectorAll(".solo-check").forEach(function (item) {
          turnForm(item);
        })

        break;
      case 'logo':
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
    };
  });

  //иницианализируем карусель
  initCarousel('.sl1');

  //иницинализируем функцию удаления слайда - идет после того как сформировалась
  deleteSlide(document.querySelector('.btn-remove-slide'));


  document.querySelectorAll(".counter").forEach(function (item) {
    if (item.classList.contains('main-counter')) {
      changeValCount(item, 40, 5, 5);
    }
    if (item.classList.contains('stimul-phrase')) {
      changeValCount(item, 8, 2, 1);
    }

  })

  //----SLIDERS----//

  function getNextName(arr) {
    document.querySelectorAll('.video-slide__change.form-control').forEach((el) => {
      console.log(arr.filter(item => item != el.value));
      arr = arr.filter(item => item != el.value);
    });
    return arr.shift();
  };

  // ----- Cоздать новый слайд по клику PRODUCT-PRICE  - МОЖЕМ МЕНЯТЬ НЕЙМ и НОВЫЙ БУДЕТ ЛИБО ЛОГО либо ТОВАР-цена
  document.querySelector(".add-slide .add-item").addEventListener("click", () => {
    let slidesArr = ['stimul', 'logo', 'product', 'service', 'stock', 'contact'];
    let namePart = getNextName(slidesArr);

    let allSlidesNumb = document.querySelectorAll('.video-slide__number');
    console.log(allSlidesNumb);
    let slideNumber = +allSlidesNumb[allSlidesNumb.length - 1].textContent + 1;
    console.log(slideNumber);

    let constructSlide = document.createElement("div");
    constructSlide.classList = `video-slide block added-${slideNumber}`
    constructSlide.innerHTML = setSlideHtmlWithSelector(slideNumber, namePart); // <--------------- ЧТОБЫ ПОМЕНЯТЬ СЛАЙД
    let main = document.querySelector('.add-slide');
    main.before(constructSlide);

    let insideSlideWrapp, secondPart;
    insideSlideWrapp = document.querySelector(`.added-${slideNumber} .wrapper`);
    const nameCarousel = namePart + '-part_slider';
    namePart = namePart + '-part';
    createSecondPart(insideSlideWrapp, secondPart, namePart, createSecondPartHtml(nameCarousel, optionalContact, optionalDisclaimer));

    console.log(insideSlideWrapp);

    // ЕСЛИ ЛОГО добавляем работу доп. форм(Нужно для: побуждающей, лого)
    if (namePart === 'logo-part') {
      let optionalField = document.querySelectorAll(".logo-part .optional-field");
      optionalField.forEach(function (item) {
        createOptionalFiled(item);
      });
    }

    //добавляем работу дизэйбл энэйбл для Соло форм
    insideSlideWrapp.querySelectorAll(".solo-check").forEach(function (item) {
      turnForm(item);
    })

    // ЕСЛИ ТОВАР-цена , услуга - добавить товар на страницу
    if (namePart === 'service-part' || namePart === 'product-part') { //<--------- ДЛЯ ТОВАР-ЦЕНА и УСЛУГА ЦЕНА
      addProduct(insideSlideWrapp);
      //УДАЛЕНИЕ ТОВАРА
      insideSlideWrapp.querySelector(".close").addEventListener('click', () => {
        if (insideSlideWrapp.querySelectorAll('.product-block').length < 2) {
          console.log(insideSlideWrapp.querySelectorAll('.product-block').length);
        } else {
          console.log('удаляем товар или услугу');
          insideSlideWrapp.querySelector(".close").parentElement.parentElement;
          insideSlideWrapp.querySelector('.product-block').remove();
        }
      })
    }

    //иницинализируем слайд
    initCarousel(`.${nameCarousel}`);

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

    //Либо удаляем кнопку Добавить слайд , либо перемещаем последний блок
    if (slideNumber === 6) {
      document.querySelector('.add-item-block.add-slide').style.display = 'none';
    };

    //иницинализируем удаление слайда
    deleteSlide(insideSlideWrapp.querySelector(".btn-remove-slide"));

    //перемещаем кнопку добавить слайд
    document.querySelector('.last-main-block').before(document.querySelector(".add-slide"));
  });

  function changeSlide(elem) {
    elem.addEventListener('change', () => {
        const firstPart = elem.parentElement.parentElement;
        firstPart.nextElementSibling.remove();
        let secondPart, classForSecondP;
        switch (elem.value) {
          case "logo":
            classForSecondP = "logo-part";
            console.log(optionalContact);
            console.log(optionalDisclaimer);
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
        console.log(constructSlide)

        //добавляем работу доп. форм(Нужно для: побуждающей)
        if (classForSecondP === 'stimul-part') {
          let optionalField = constructSlide.querySelectorAll(".stimul-part .optional-field");
          optionalField.forEach(function (item) {
            createOptionalFiled(item);
          });
        }

        let insideSlideWrapp = firstPart.parentNode;

        //добавляем работу дизэйбл энэйбл для Соло форм
        insideSlideWrapp.querySelectorAll(".solo-check").forEach(function (item) {
          turnForm(item);
        })

        // ЕСЛИ ТОВАР-цена , услуга - добавить товар на страницу
        if (classForSecondP === 'service-part' || classForSecondP === 'product-part') { //<--------- ДЛЯ ТОВАР-ЦЕНА и УСЛУГА ЦЕНА
          addProduct(insideSlideWrapp);
          //УДАЛЕНИЕ ТОВАРА
          insideSlideWrapp.querySelector(".close").addEventListener('click', () => {
            if (insideSlideWrapp.querySelectorAll('.product-block').length < 2) {
              console.log(insideSlideWrapp.querySelectorAll('.product-block').length);
            } else {
              console.log('удаляем товар или услугу');
              insideSlideWrapp.querySelector(".close").parentElement.parentElement;
              insideSlideWrapp.querySelector('.product-block').remove();
            }
          })
        }

        //иницинализируем слайд
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

      })
  }
  changeSlide(document.querySelector('.video-slide__change'));



})