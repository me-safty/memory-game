// make images clickable with adding animation
const boxs = document.querySelectorAll(".box") as NodeListOf<HTMLDivElement>;
const imgs = document.querySelectorAll("img") as NodeListOf<HTMLImageElement>;

const high = document.querySelectorAll(
  ".header p span"
) as NodeListOf<HTMLSpanElement>;

if (localStorage.high_score) {
  high[1].innerHTML = `${localStorage.high_score}`;
}

const fin = document.querySelector(".finsh") as HTMLDivElement;
const finBox = document.querySelector(".finBox") as HTMLDivElement;
const finBoxYour = document.querySelectorAll(".finBox p")[1]
  .children[0] as HTMLSpanElement;
const finBoxHigh = document.querySelectorAll(".finBox p")[2]
  .children[0] as HTMLSpanElement;
const btn = document.querySelector(".finBox button") as HTMLButtonElement;
btn.addEventListener("click", () => location.reload());

setTimeout(() => {
  imgs.forEach((e) => (e.style.opacity = "1"));
  fin.style.display = "block";
}, 500);
setTimeout(() => {
  imgs.forEach((e) => (e.style.opacity = "0"));
  fin.style.display = "none";
}, 2500);

let wrongTreis: number = 0;

boxs.forEach((box) => {
  box.addEventListener("click", (_) => {
    if (box.classList.contains("done") === false) {
      box.style.animation = "rotate .3s both";
      const img = box.childNodes[1] as HTMLImageElement;
      img.style.display = "block";
      img.style.opacity = "1";
      img.classList.add("active");
      //=======////
      const imgActive = document.querySelectorAll(
        ".active"
      ) as NodeListOf<HTMLImageElement>;
      if (imgActive.length === 2) {
        const img1 = imgActive[0]
          .getAttribute("src")
          ?.split("/")[1]
          .split(".")[0] as string;
        const img2 = imgActive[1]
          .getAttribute("src")
          ?.split("/")[1]
          .split(".")[0] as string;
        setTimeout(() => {
          if (img1 != img2) {
            imgActive[0].style.display = "none";
            imgActive[1].style.display = "none";
            const one = imgActive[0].parentElement as HTMLDivElement;
            const two = imgActive[1].parentElement as HTMLDivElement;
            one.style.animation = "wrongRotate .3s both";
            two.style.animation = "wrongRotate .3s both";
            wrongTreis++;
            const wrongTreisP = document.querySelectorAll(
              ".header p span"
            ) as NodeListOf<HTMLSpanElement>;
            wrongTreisP[2].innerHTML = `${wrongTreis}`;
          } else {
            imgActive[0].parentElement?.classList.add("done");
            imgActive[1].parentElement?.classList.add("done");
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
  const boxsDone = document.querySelectorAll(
    ".done"
  ) as NodeListOf<HTMLDivElement>;
  if (boxsDone.length == 20) {
    if (!localStorage.high_score) {
      window.localStorage.setItem("high_score", `${wrongTreis}`);
    }
    if (localStorage.high_score) {
      if (+localStorage.high_score > wrongTreis) {
        high[1].innerHTML = `${wrongTreis}`;
      } else {
        high[1].innerHTML = `${localStorage.high_score}`;
      }
    } else {
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

  const imags = document.querySelectorAll(
    "img"
  ) as NodeListOf<HTMLImageElement>;

  for (let i = 0; i < 20; i++) {
    const random: number = Math.floor(Math.random() * arr.length);
    imags[i].src = `images/${arr[random]}.jpg`;
    let index: number = arr.indexOf(arr[random]);
    arr.splice(index, 1);
  }
};
