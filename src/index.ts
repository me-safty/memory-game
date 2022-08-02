// make images clickable with adding animation
const boxs = document.querySelectorAll(".box") as NodeListOf<HTMLDivElement>;

boxs.forEach((box) => {
  box.addEventListener("click", (_) => {
    box.style.animation = "rotate .3s both";
    const img = box.childNodes[1] as HTMLImageElement;
    img.style.animation = "op .3s both";
  });
});

// randomise images
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const imags = document.querySelectorAll("img") as NodeListOf<HTMLImageElement>;

for (let i = 0; i < 20; i++) {
  const random: number = Math.floor(Math.random() * arr.length);
  imags[i].src = `images/${arr[random]}.jpg`;
  let index: number = arr.indexOf(arr[random]);
  arr.splice(index, 1);
}
