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

    const optionalField = document.querySelectorAll(".optional-field");

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

    optionalField.forEach(function (item) {
        createOptionalFiled(item)
    })

    // CAROUSEL - external plugin
    $(document).ready(function () {
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

//получение выбранной анимации
    const slickSlide = document.querySelector('.sl');
   
    slickSlide.addEventListener('click', () => {

        let txtSlide = document.querySelector('.slick-current p');
    
            console.log(txtSlide)

    })



})