//Other Polyfill

if (typeof window !== 'undefined' &&  window.NodeList && !NodeList.prototype.forEach) {

  NodeList.prototype.forEach = function (callback, thisArg) {

      thisArg = thisArg || window;

      for (var i = 0; i < this.length; i++) {

          callback.call(thisArg, this[i], i, this);

      }

  };

}


(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('after')) {
      return;
    }
    Object.defineProperty(item, 'after', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function after() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        
        this.parentNode.insertBefore(docFrag, this.nextSibling);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('before')) {
      return;
    }
    Object.defineProperty(item, 'before', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function before() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        
        this.parentNode.insertBefore(docFrag, this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        
        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);


// --- classlist-Polyfill --- //
if ("document" in window.self) {

  // Full polyfill for browsers with no classList support
  // Including IE < Edge missing SVGElement.classList
  if (!("classList" in document.createElement("_")) 
    || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {
  
  (function (view) {
  
  "use strict";
  
  if (!('Element' in view)) return;
  
  var
      classListProp = "classList"
    , protoProp = "prototype"
    , elemCtrProto = view.Element[protoProp]
    , objCtr = Object
    , strTrim = String[protoProp].trim || function () {
      return this.replace(/^\s+|\s+$/g, "");
    }
    , arrIndexOf = Array[protoProp].indexOf || function (item) {
      var
          i = 0
        , len = this.length
      ;
      for (; i < len; i++) {
        if (i in this && this[i] === item) {
          return i;
        }
      }
      return -1;
    }
    // Vendors: please allow content code to instantiate DOMExceptions
    , DOMEx = function (type, message) {
      this.name = type;
      this.code = DOMException[type];
      this.message = message;
    }
    , checkTokenAndGetIndex = function (classList, token) {
      if (token === "") {
        throw new DOMEx(
            "SYNTAX_ERR"
          , "An invalid or illegal string was specified"
        );
      }
      if (/\s/.test(token)) {
        throw new DOMEx(
            "INVALID_CHARACTER_ERR"
          , "String contains an invalid character"
        );
      }
      return arrIndexOf.call(classList, token);
    }
    , ClassList = function (elem) {
      var
          trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
        , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
        , i = 0
        , len = classes.length
      ;
      for (; i < len; i++) {
        this.push(classes[i]);
      }
      this._updateClassName = function () {
        elem.setAttribute("class", this.toString());
      };
    }
    , classListProto = ClassList[protoProp] = []
    , classListGetter = function () {
      return new ClassList(this);
    }
  ;
  // Most DOMException implementations don't allow calling DOMException's toString()
  // on non-DOMExceptions. Error's toString() is sufficient here.
  DOMEx[protoProp] = Error[protoProp];
  classListProto.item = function (i) {
    return this[i] || null;
  };
  classListProto.contains = function (token) {
    token += "";
    return checkTokenAndGetIndex(this, token) !== -1;
  };
  classListProto.add = function () {
    var
        tokens = arguments
      , i = 0
      , l = tokens.length
      , token
      , updated = false
    ;
    do {
      token = tokens[i] + "";
      if (checkTokenAndGetIndex(this, token) === -1) {
        this.push(token);
        updated = true;
      }
    }
    while (++i < l);
  
    if (updated) {
      this._updateClassName();
    }
  };
  classListProto.remove = function () {
    var
        tokens = arguments
      , i = 0
      , l = tokens.length
      , token
      , updated = false
      , index
    ;
    do {
      token = tokens[i] + "";
      index = checkTokenAndGetIndex(this, token);
      while (index !== -1) {
        this.splice(index, 1);
        updated = true;
        index = checkTokenAndGetIndex(this, token);
      }
    }
    while (++i < l);
  
    if (updated) {
      this._updateClassName();
    }
  };
  classListProto.toggle = function (token, force) {
    token += "";
  
    var
        result = this.contains(token)
      , method = result ?
        force !== true && "remove"
      :
        force !== false && "add"
    ;
  
    if (method) {
      this[method](token);
    }
  
    if (force === true || force === false) {
      return force;
    } else {
      return !result;
    }
  };
  classListProto.toString = function () {
    return this.join(" ");
  };
  
  if (objCtr.defineProperty) {
    var classListPropDesc = {
        get: classListGetter
      , enumerable: true
      , configurable: true
    };
    try {
      objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
    } catch (ex) { // IE 8 doesn't support enumerable:true
      // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
      // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
      if (ex.number === undefined || ex.number === -0x7FF5EC54) {
        classListPropDesc.enumerable = false;
        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
      }
    }
  } else if (objCtr[protoProp].__defineGetter__) {
    elemCtrProto.__defineGetter__(classListProp, classListGetter);
  }
  
  }(window.self));
  
  }
  
  // There is full or partial native classList support, so just check if we need
  // to normalize the add/remove and toggle APIs.
  
  (function () {
    "use strict";
  
    var testElement = document.createElement("_");
  
    testElement.classList.add("c1", "c2");
  
    // Polyfill for IE 10/11 and Firefox <26, where classList.add and
    // classList.remove exist but support only one argument at a time.
    if (!testElement.classList.contains("c2")) {
      var createMethod = function(method) {
        var original = DOMTokenList.prototype[method];
  
        DOMTokenList.prototype[method] = function(token) {
          var i, len = arguments.length;
  
          for (i = 0; i < len; i++) {
            token = arguments[i];
            original.call(this, token);
          }
        };
      };
      createMethod('add');
      createMethod('remove');
    }
  
    testElement.classList.toggle("c3", false);
  
    // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
    // support the second argument.
    if (testElement.classList.contains("c3")) {
      var _toggle = DOMTokenList.prototype.toggle;
  
      DOMTokenList.prototype.toggle = function(token, force) {
        if (1 in arguments && !this.contains(token) === !force) {
          return force;
        } else {
          return _toggle.call(this, token);
        }
      };
  
    }
  
    testElement = null;
  }());
  
  }
  

document.addEventListener('DOMContentLoaded', function () {

  // --- Переменные для задания параметров страницы --- //

  //Переменная для максимальной длины текста (5 * validationLevel )
  const validatonLevel = 13;

  //Доступные форматы видео(значения в будущем классы)  
  let formats = {
    f16x9: "rectangle16x9",
    f1x1: "square",
    f9x16: "rectangle9x16"
  }

  //Функция изменения значения Основного Counter
  function changeValCountMain(item, max, min, step) {
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
      } else {
        min = min - step;
      }
      if (value > min) {
        count.value = value - step;
        value = count.value;
        let amountSlide = document.querySelectorAll('.video-slide').length;
        if (value / amountSlide == step) {
          document.querySelector('.add-item-block.add-slide button').disabled = true;
          minus.classList.add('disabled');
        }
      } else {
      };
      if (count.value == step) { //только если MIN = 5 , а STEP = 10
        console.log('object');
        document.querySelector('.main-counter .minus').classList.remove('disabled');
        document.querySelector('.main-counter .minus').classList.add('disabl');
      }

    })
  };

  //Функция изменения значения counter Слайдов
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

  //запускаем counter общей длины слайда
  changeValCountMain(document.querySelector('.counter.main-counter'), 40, 5, 5);

  //Функция Touchstart and Touchend для counter для сенсорных
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

  //Функция названия поля загрузки файла
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

  //Иницианализируем изменение названия длины
  uploadFile(document.getElementById('extra-files'));

  //Переменные для создания Prewiew
  const formatVideoSelect = document.querySelector(".format-video__change_input"),
      formatPreview = document.createElement("div");
  let formatVideoZone = document.querySelector(".format-video__preview"),
      pickedVideoFormat = formatVideoSelect.value;


  //Функция создания дефолтных prewiew
  function createPreview(zone, item, picked) {
    console.log('вызвали createPreview для format');
    let nameFormatArr = picked.split(":"),
      nameFormat = `f${nameFormatArr[0]}x${nameFormatArr[1]}`;
    item.classList = formats[nameFormat];
    zone.appendChild(item);
  }

  //Функция создания prewiewCustom для format
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
        customSizePreview.style.border = '1px solid #febf00'
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
        customSizePreview.style.border = '1px solid #febf00'
      }
    });
  }

  //Функция удаления Prewiew
  function deletePreviewCustom() {
    const formatVideoZone2 = document.querySelector('.format-video__preview');
    formatVideoZone2.remove();
  }

  // --- Создаем prewiew формата --- //
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

  //Функция disable Enable для чекбоксов и полей
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

  //Функция создания основы слайда
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
    let forConstruct = `<div class="wrapper"><div class="title-line"><div class="left-title"><h5 class="video-slide__number">${number}</h5><select name="slide-${number}" class="video-slide__change form-control form-control-sm"><option value="stimul" ${stimulPhrs}>Побуждающая фраза</option><option value="logo" ${logo}>Логотип</option><option value="product" ${productPrice}>Товар-Цена</option><option value="service" ${serviceDescription}>Услуга-Описание</option><option value="stock" ${stock}>Акция</option><option value="contact" ${contacts}>Контакты</option></select></div><div class="right-title"><h6 class="duration-title">Длительность</h6><div class="counter qty slide-counter"><span class="minus"><i class="fas fa-minus-circle"></i></span><input type="number" class="count" name="qty" value="5" disabled="true"><span class="plus"><i class="fas fa-plus-circle"></i></span></div></div></div></div>`                    
    return forConstruct;
  }

  //Функция создания второй части слайда
  function createSecondPartHtml(nameForInitSlider) {
    let textZoneHtml_1 = `<div class="text-zone">
    <p class="title">Вы можете начать видеоролик с вопроса или фразы призывающей к покупке</p>   
    <input class="text-field form-control" type="text" name="stimul-text" placeholder="Введите текст">
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
        gifName;

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
    <label class="my-file-input" for="exampleFormControlFile1"><p><i name="image-outline" class="far fa-image"></i>${name}</p></label>
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
          <input name="product-1_descript" type="text" class="form-control  description form-control-sm" placeholder="Описание товара">
        </div>
        <div class="col">
          <div class="attach-block for-product">
            <label class="my-file-input" for="product-slider-1_img-1">
            <p>
            <i name="image-outline" class="far fa-image"></i>
            Изображение</p>
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
        <i class="fas fa-plus-circle"></i>
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
          <input name="service-1_descript" type="text" class="form-control description form-control-sm" placeholder="Описание услуги">
        </div>
        <div class="col">
          <div class="attach-block for-product">
            <label class="my-file-input" for="service-slider-1_img-1">
              <p>
              <i name="image-outline" class="far fa-image"></i>
              Изображение</p>
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
      <i class="fas fa-plus-circle"></i>
        <p>Добавить услугу</p>
      </div>
    </div>`;

    let removeSlideHtml = `<div class="btn-zone"><button type="button" class="btn-remove-slide btn btn-outline-danger btn-sm"><i class="far fa-trash-alt"></i><p>Удалить слайд</p></button></div>`;

    let insideHtml,
        nameAnim_1 = "Динамичный",
        nameAnim_2 = "Нежный",
        nameAnim_3 = "Технологичный",
        nameAnim_4 = "Брутальный";
      
    switch (true) {
      case /logo-part_slider/i.test(nameForInitSlider):
        nameAttach = 'Прикрепить логотип';
        gifName='logo';
        carouselHtml = getCarouselHtml(gifName, nameAnim_1, nameAnim_2, nameAnim_3, nameAnim_4);
        insideHtml = `${textZoneHtml_2}${carouselHtml}${removeSlideHtml}`;
        break;
      case /stimul-part_slider/i.test(nameForInitSlider):
        gifName='stimul';
        carouselHtml = getCarouselHtml(gifName, nameAnim_1, nameAnim_2, nameAnim_3, nameAnim_4);
        insideHtml = `${textZoneHtml_1}${carouselHtml}${removeSlideHtml}`;
        break;
      case /product-part_slider/i.test(nameForInitSlider):
        gifName='product';
        carouselHtml = getCarouselHtml(gifName, nameAnim_1, nameAnim_2, nameAnim_3, nameAnim_4);
        insideHtml = `${productZoneHtml}${carouselHtml}${removeSlideHtml}`;
        break;
      case /service-part_slider/i.test(nameForInitSlider):
        gifName='service';
        carouselHtml = getCarouselHtml(gifName, nameAnim_1, nameAnim_2, nameAnim_3, nameAnim_4);
        insideHtml = `${serviceZoneHtml}${carouselHtml}${removeSlideHtml}`;
        break;
      case /stock-part_slider/i.test(nameForInitSlider):
        nameAttach = 'Прикрепить изображение';
        gifName='stock';
        carouselHtml = getCarouselHtml(gifName, nameAnim_1, nameAnim_2, nameAnim_3, nameAnim_4);
        attachHtml = getAttachHtml(nameAttach);
        insideHtml = `${attachHtml}${textStockHtml}${carouselHtml}${removeSlideHtml}`;
        break;
      case /contact-part_slider/i.test(nameForInitSlider):
        nameAttach = 'Прикрепить фото фасада';
        gifName='contact';
        carouselHtml = getCarouselHtml(gifName, nameAnim_1, nameAnim_2, nameAnim_3, nameAnim_4);
        attachHtml = getAttachHtml(nameAttach);
        insideHtml = `${attachHtml}${textForContact}${carouselHtml}${removeSlideHtml}`;
        break;
    }
    return insideHtml;
  };

  //Функция создания верстки первого слайда  
  function setStimulHtmlWithSlider(name) {
    let insideHtmlStimulPrase = `
    <div class="text-zone">
    <p class="title">Вы можете начать видеоролик с вопроса или фразы призывающей к покупке</p>   
    <input class="text-field form-control" type="text" name="stimul-text" placeholder="Введите текст">
     </div>
     <h6 class="duration-title">Выберите анимацию</h6>
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
     <div class="btn-zone"><button type="button" class="btn-remove-slide btn btn-outline-danger btn-sm"><i class="far fa-trash-alt"></i><p>Удалить слайд</p></button></div>`
     return insideHtmlStimulPrase;
  };

  let nameSlider;

  //Функция добавления второй части слайда
  function createSecondPart(wrapp, part2, classPart, funcHtmlSlider) {
    part2 = document.createElement('div');
    part2.classList.add(classPart);
    part2.innerHTML = funcHtmlSlider;
    wrapp.appendChild(part2);
  };

  //Функция для добавления товара или услуги на страницу
  function addProduct(insideSlideWrapp, nameSlider) {
    insideSlideWrapp.querySelector('.add-item').addEventListener('click', (elem) => {
      let target = elem.target;
      let allProducts = insideSlideWrapp.querySelectorAll('.product-block');
      let nextProduct = allProducts[allProducts.length - 1].cloneNode(true);

      console.log(target.parentElement.parentElement);
      console.log(nextProduct);

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
          inpt.previousElementSibling.lastElementChild.innerHTML = '<i name="image-outline" class="far fa-image"></i>Изображение';
        }
      });
      nextProduct.querySelector(".close").addEventListener('click', () => {
        if (insideSlideWrapp.querySelectorAll('.product-block').length > 1) {
          nextProduct.remove();
        }
      });
    });
  };

  //Функция для удаления слайда
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
          allSlides[i - 1].className = `video-slide block added-${i}`;
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

  //Функция иницинализации карусели
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

  //Функция для определения максимальной длины текста
  function getMaxLengthStimulPhrase(slideCounterInput) {
    return +slideCounterInput.value * validatonLevel;
  };

  //Функция валидации длины текста
  function validationText (element = insideSlideWrapp.querySelector('.text-zone .text-field'),
                      elementCounter = insideSlideWrapp.querySelector('.slide-counter input')
    ){
      let invalFeedback = document.createElement('div');
      invalFeedback.classList.add('invalid-feedback');
      console.log(element);
      element.after(invalFeedback);
      element.addEventListener('input', (e) => {
        let maxLengthStimulPhrase = getMaxLengthStimulPhrase(elementCounter);
        if (e.target.value.length > maxLengthStimulPhrase) {
          e.target.classList.add('is-invalid');
          invalFeedback.textContent = `Длина текста ${e.target.value.length} при максимально допустимой в ${maxLengthStimulPhrase}`;
        } else {
          e.target.classList.remove('is-invalid');
          invalFeedback.textContent = '';
        }
      });
  };

  // --- Добавление самого первого слайда --- //
  document.querySelectorAll('.video-slide__change').forEach((item) => {
    let insideSlideWrapp, secondPart, optionalField;
    //первый салйд - побуждающая фраза
    switch (item.value) {
      case 'stimul':
        console.log('перебор нашел Побуждающую фразу и создает оставшуюся часть слайда')
        insideSlideWrapp = item.parentNode.parentNode.parentNode;

        createSecondPart(insideSlideWrapp, secondPart, 'stimul-part', setStimulHtmlWithSlider("stimul-part_slider"));
        //добавлям Touchstart на Counter этого слайда
        counterTouch("video-slide");

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
    };
      //иницианализируем карусель
    initCarousel('.stimul-part_slider');
    //иницинализируем функцию удаления слайда - идет после того как сформировалась
    deleteSlide(document.querySelector('.btn-remove-slide'));
  });

  //Функция плавного появления слайда
  function smoothAppearance (constructSlide){
    let startOpacity = 0.3,
      finishOpacity = 0.99,
      stepOp = 0.02;
    function step() {
      startOpacity = startOpacity + stepOp;
      constructSlide.style.opacity = `${startOpacity}`;
      if (startOpacity < finishOpacity) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }

  // --- Создание нового слайда по клику --- //
  let iArr = 1; //для обхода массива названий слайдов

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
    constructSlide.className = `video-slide block added-${slideNumber}`
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
    createSecondPart(insideSlideWrapp, secondPart, namePart, createSecondPartHtml(nameCarousel));
    console.log(insideSlideWrapp);

    //меняем цвет counter при клике на него на Сенсорных
    counterTouch("", constructSlide);

    // если лого добавляем работу доп. форм(Нужно для: побуждающей, лого)
    if (namePart === 'logo-part') {
      let optionalField = document.querySelectorAll(".logo-part .optional-field");
      optionalField.forEach(function (item) {
        createOptionalFiled(item);
      });
    }
    // устанавливаем id для вложений
    if (namePart != 'stimul-part' && namePart != 'logo-part') {
      uploadFile(insideSlideWrapp.querySelector('.attach-block input'));
    }
    if (namePart === 'contact-part' || namePart === 'stock-part') {
      insideSlideWrapp.querySelector('.attach-block.for-logo input').id = namePart + "_attach-" + number;
      insideSlideWrapp.querySelector('.attach-block.for-logo label').setAttribute('for', namePart + "_attach-" + number);
      insideSlideWrapp.querySelector('.attach-block.for-logo input').setAttribute('name', namePart + "_attach-" + number);
    }

    //добавляем работу дизэйбл энэйбл для Соло форм
    insideSlideWrapp.querySelectorAll(".solo-check").forEach(function (item) {
      turnForm(item);
    })

    // валидация длины текста в полях слайда
    if (namePart === 'stimul-part' || namePart === 'stock-part') {
      validationText(insideSlideWrapp.querySelector('.text-zone .text-field'),
                    insideSlideWrapp.querySelector('.slide-counter input'))
    }
    if (namePart === 'logo-part' || namePart === 'contact-part') {
      validationText(insideSlideWrapp.querySelector('.solo-check .optional-txt'),
                    insideSlideWrapp.querySelector('.slide-counter input'))
    }
    if (namePart === 'product-part' || namePart === 'service-part') {
      validationText(insideSlideWrapp.querySelector('.product-block .description'),
                    insideSlideWrapp.querySelector('.slide-counter input'))
    }

    // если товар-цена , услуга - добавить товар на страницу
    if (namePart === 'service-part' || namePart === 'product-part') { //<--------- ДЛЯ ТОВАР-ЦЕНА и УСЛУГА ЦЕНА
      addProduct(insideSlideWrapp, nameCarousel);
      if (document.querySelectorAll(`.${namePart}`).length > 1) {
        let nameSliderSlim = nameCarousel.replace(/part_/g, "");
        insideSlideWrapp.querySelector('input[type="file"]').id = nameSliderSlim + '_img-1';
        insideSlideWrapp.querySelector('input[type="file"]').setAttribute("name", nameSliderSlim + '_img-1');
        insideSlideWrapp.querySelector('.my-file-input').setAttribute("for", nameSliderSlim + '_img-1');
      }

      //удаление товара
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

    // Перемотка к началу созданого элемента и анимация
    insideSlideWrapp.scrollIntoView();
    smoothAppearance(constructSlide);
  });

  // --- Функция смены слайда через переключатель --- //
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

    let namePart = classForSecondP,
      constructSlide = firstPart.parentElement.parentElement,
      insideSlideWrapp = firstPart.parentNode,
      number = (+document.querySelectorAll(`.${classForSecondP}`).length + 1),
      nameSlider = classForSecondP + "_slider-" + number;

    createSecondPart(firstPart.parentElement, secondPart, classForSecondP, createSecondPartHtml(nameSlider));

    let slideNumber = +constructSlide.querySelector('.video-slide__number').textContent;
    //добавляем работу доп. форм(Нужно для: побуждающей)
    if (classForSecondP === 'stimul-part') {
      let optionalField = constructSlide.querySelectorAll(".stimul-part .optional-field");
      optionalField.forEach(function (item) {
        createOptionalFiled(item);
      });
    }
    // устанавливаем id для вложений
    if (classForSecondP != 'stimul-part' && classForSecondP != 'logo-part' ) {
      uploadFile(insideSlideWrapp.querySelector('.attach-block input'));
    }
    if (classForSecondP === 'contact-part' || classForSecondP === 'stock-part') {
      insideSlideWrapp.querySelector('.attach-block.for-logo input').id = classForSecondP + "_attach-" + number;
      insideSlideWrapp.querySelector('.attach-block.for-logo label').setAttribute('for', classForSecondP + "_attach-" + number);
      insideSlideWrapp.querySelector('.attach-block.for-logo input').setAttribute('name', classForSecondP + "_attach-" + number);
    }

    //добавляем работу дизэйбл энэйбл для Соло форм
    insideSlideWrapp.querySelectorAll(".solo-check").forEach(function (item) {
      turnForm(item);
    })

    // если товар-цена , услуга - добавить товар на страницу
    if (classForSecondP === 'service-part' || classForSecondP === 'product-part') { //<--------- ДЛЯ ТОВАР-ЦЕНА и УСЛУГА ЦЕНА
      addProduct(insideSlideWrapp, nameSlider);

      if (document.querySelectorAll(`.${classForSecondP}`).length > 1) {
        let nameSliderSlim = nameSlider.replace(/part_/g, "");
        insideSlideWrapp.querySelector('input[type="file"]').id = nameSliderSlim + '_img-1';
        insideSlideWrapp.querySelector('input[type="file"]').setAttribute("name", nameSliderSlim + '_img-1');
        insideSlideWrapp.querySelector('.my-file-input').setAttribute("for", nameSliderSlim + '_img-1');
      }

      //удаление товара
      insideSlideWrapp.querySelector(".close").addEventListener('click', () => {
        if (insideSlideWrapp.querySelectorAll('.product-block').length >= 2) {
          console.log('удаляем товар или услугу');
          insideSlideWrapp.querySelector(".close").parentElement.parentElement;
          insideSlideWrapp.querySelector('.product-block').remove();
        };
      });
    };

    //переименовываем counter слайда и меняем Name
    insideSlideWrapp.querySelector('.slide-counter input').className = 'count ' + classForSecondP + '-count-' + number;
    insideSlideWrapp.querySelector('.slide-counter input').setAttribute('name', classForSecondP + '-count-' + number);

    //валидация длины формы
    if (namePart === 'stimul-part' || namePart === 'stock-part') {
      validationText(insideSlideWrapp.querySelector('.text-zone .text-field'),
                    insideSlideWrapp.querySelector('.slide-counter input'))
    }
    if (namePart === 'logo-part' || namePart === 'contact-part') {
      validationText(insideSlideWrapp.querySelector('.solo-check .optional-txt'),
                    insideSlideWrapp.querySelector('.slide-counter input'))
    }
    if (namePart === 'product-part' || namePart === 'service-part') {
      validationText(insideSlideWrapp.querySelector('.product-block .description'),
                    insideSlideWrapp.querySelector('.slide-counter input'))
    }

    //иницинализируем слайдер
    initCarousel(`.${nameSlider}`);

    deleteSlide(insideSlideWrapp.querySelector(".btn-remove-slide"));

    smoothAppearance(constructSlide);
  }

  function changeSlide(elem) {
    elem.addEventListener('change', ()=>{
      eventChangeSlide(elem);
    });
  };

  //Иницианализируем функцию смены слайда с помощью переключателя
  changeSlide(document.querySelector('.video-slide__change'));

  
  // --- Функции анимации --- //
  function toggleClassActive(e) {
    e.classList.toggle('active-anim');
  }
  function addClassOk(e) {
      e.classList.add('finished-anim');
      setTimeout(() => {e.classList.remove('finished-anim');
      e.classList.remove('active-anim');
  }, 4000);
  }
  function addClassFail(e) {
    e.classList.remove('active-anim');
    e.classList.add('fail-anim');
    setTimeout( () => e.classList.remove('fail-anim'), 2000);
  }

  // --- Сборка и отправка формы --- //
  let formElem = document.querySelector('#formElem');

  //Функция сборки и отправки формы
  function submitHandler(e) {
    console.log(e);
    //убираем disabled у Counter
    document.querySelectorAll(".qty .count").forEach((el) => {
      el.removeAttribute("disabled");
    });

    //формируем formData
    let formData = new FormData(formElem);
  /*   for (let [name, value] of formData) {
      console.log(`${name} = ${value}`);
    } */
    //добавляем в formData name Animation
    document.querySelectorAll('.slick-slider').forEach((el) => {
      let parentNameAnimation = el.classList[0];
      let srcSlider = el.querySelector('.slick-current img').getAttribute('src');
      let nameAnimation = srcSlider.replace(/img\//gi, "");
      formData.append(parentNameAnimation, nameAnimation);
    });

 /*    for (let [name1, value1] of formData) {
      console.log(`${name1}=${value1}`);
    }; */
    //возвращаем инпут обратно
    document.querySelectorAll(".qty .count").forEach((el) => {
      el.setAttribute("disabled", "true");
    });
    console.log('идет отправка');
    document.querySelector('.modal .modal-body').textContent = "Отправляем данные... Не закрывайте окно до окончания отправки.";
   
    toggleClassActive(e);
    fetch("send.php", {
        method: "POST",
        body: formData
      })
      .then(response => {
        return response.json()
      })
      .then(function (json) {
        console.log('отправлено');
        
        addClassOk(e)

        document.querySelector('.modal .modal-body').textContent = "Отправлено!"
        $(".modal").modal('show');
        //$("#myModalBox").modal('show');
        /*process your JSON further */
      })
      .catch(function (error) {
        addClassFail(e)
        console.log(error);
        console.log("ошибка отправки");
        document.querySelector('.modal .modal-body').textContent = "Отправка не удалась , попробуйте еще раз.";
        $(".modal").modal('show');
      });
  };

  //Отправка формы
  formElem.addEventListener('submit',(e)=>{
    e.preventDefault();
    e = e.target;
    e = e.querySelector('button[type="submit"]');
    let allDuration = document.querySelector('#main-conter-val').value;
    let slidesDurationArr=[],
        slidesDuration = 0;
    document.querySelectorAll('.slide-counter input').forEach((el)=>{
      slidesDurationArr.push(el.value);
    });

    slidesDurationArr.forEach(element => {
      slidesDuration += (+element);
    });

    if (allDuration >= slidesDuration){
      if (document.querySelector('.duration-message')){
        document.querySelector('.duration-message').remove();
      }
      submitHandler(e);
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

})