'use strict';


document.addEventListener('DOMContentLoaded', function () {

    // COUNTER
    const changeValCount = function(item,max,min,step) {
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
            changeValCount(item,40,5,5);
        }   else {
            changeValCount(item,8,2,1);
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

    formatVideoSelect.addEventListener('click', () => {
        if (formatVideoSelect.value != pickedVideoFormat) {
            pickedVideoFormat = formatVideoSelect.value;
            console.log(formatVideoSelect.value);
            createPreview(formatVideoZone, formatPreview, pickedVideoFormat);

        }
    })

    //MORE-COLOR

    const moreColorsCheckbox = document.querySelector("#defaultCheck1"),
            moreColorsInpt = document.querySelector("#moreColorsInpt")

    moreColorsCheckbox.addEventListener('click', function(){
        console.log('click')
        if(moreColorsCheckbox.checked){
            moreColorsInpt.removeAttribute('disabled', false);
        } else {
            moreColorsInpt.setAttribute('disabled', true);
        }
    })

    if(!moreColorsCheckbox.checked){
        moreColorsInpt.setAttribute('disabled', true);
        
    }
})