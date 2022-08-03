"use strict";
// make images clickable with adding animation
const boxs = document.querySelectorAll(".box");
const imgs = document.querySelectorAll("img");
const high = document.querySelectorAll(".header p span");
if (localStorage.high_score) {
    high[1].innerHTML = `${localStorage.high_score}`;
}
const fin = document.querySelector(".finsh");
const finBox = document.querySelector(".finBox");
const finBoxYour = document.querySelectorAll(".finBox p")[1]
    .children[0];
const finBoxHigh = document.querySelectorAll(".finBox p")[2]
    .children[0];
const btn = document.querySelector(".finBox button");
btn.addEventListener("click", () => location.reload());
setTimeout(() => {
    imgs.forEach((e) => (e.style.opacity = "1"));
    fin.style.display = "block";
}, 500);
setTimeout(() => {
    imgs.forEach((e) => (e.style.opacity = "0"));
    fin.style.display = "none";
}, 2500);
let wrongTreis = 0;
boxs.forEach((box) => {
    box.addEventListener("click", (_) => {
        var _a, _b;
        if (box.classList.contains("done") === false) {
            box.style.animation = "rotate .3s both";
            const img = box.childNodes[1];
            img.style.display = "block";
            img.style.opacity = "1";
            img.classList.add("active");
            //=======////
            const imgActive = document.querySelectorAll(".active");
            if (imgActive.length === 2) {
                const img1 = (_a = imgActive[0]
                    .getAttribute("src")) === null || _a === void 0 ? void 0 : _a.split("/")[1].split(".")[0];
                const img2 = (_b = imgActive[1]
                    .getAttribute("src")) === null || _b === void 0 ? void 0 : _b.split("/")[1].split(".")[0];
                setTimeout(() => {
                    var _a, _b;
                    if (img1 != img2) {
                        imgActive[0].style.display = "none";
                        imgActive[1].style.display = "none";
                        const one = imgActive[0].parentElement;
                        const two = imgActive[1].parentElement;
                        one.style.animation = "wrongRotate .3s both";
                        two.style.animation = "wrongRotate .3s both";
                        wrongTreis++;
                        const wrongTreisP = document.querySelectorAll(".header p span");
                        wrongTreisP[2].innerHTML = `${wrongTreis}`;
                    }
                    else {
                        (_a = imgActive[0].parentElement) === null || _a === void 0 ? void 0 : _a.classList.add("done");
                        (_b = imgActive[1].parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("done");
                        finshGame();
                    }
                    imgActive[0].classList.remove("active");
                    imgActive[1].classList.remove("active");
                }, 300);
            }
        }
    });
});
function finshGame() {
    const boxsDone = document.querySelectorAll(".done");
    if (boxsDone.length == 20) {
        if (!localStorage.high_score) {
            window.localStorage.setItem("high_score", `${wrongTreis}`);
        }
        if (localStorage.high_score) {
            if (+localStorage.high_score > wrongTreis) {
                high[1].innerHTML = `${wrongTreis}`;
            }
            else {
                high[1].innerHTML = `${localStorage.high_score}`;
            }
        }
        else {
            high[1].innerHTML = `${wrongTreis}`;
        }
        fin.style.display = "flex";
        fin.style.opacity = "1";
        finBoxHigh.innerHTML = high[1].innerHTML;
        finBoxYour.innerHTML = `${wrongTreis}`;
    }
}
// randomise images
window.onload = (_) => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const imags = document.querySelectorAll("img");
    for (let i = 0; i < 20; i++) {
        const random = Math.floor(Math.random() * arr.length);
        imags[i].src = `images/${arr[random]}.jpg`;
        let index = arr.indexOf(arr[random]);
        arr.splice(index, 1);
    }
};
