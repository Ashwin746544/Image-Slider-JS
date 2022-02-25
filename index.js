const imgIdArray = ['img-1', "img-2", "img-3", "img-4"];
const dotIdArray = ['dot-1', "dot-2", "dot-3", "dot-4"];
let currentIndex = 0;
const buttons = document.querySelectorAll(".slider__btn");
const sliderDots = document.querySelectorAll(".slider__dot");
buttons.forEach((btn) => btn.addEventListener("click", function () { return animationHandler(this) }));
sliderDots.forEach((dot) => dot.addEventListener("click", function () { return animationHandler(this) }));

function animationHandler(btn) {
  let dotIndex, isNext, isPrevious;
  const currentImg = document.querySelector("#" + imgIdArray[currentIndex]);
  const currentDot = document.querySelector("#" + dotIdArray[currentIndex]);
  const isDotButtonClicked = btn.id.includes("dot");
  if (isDotButtonClicked) {
    dotIndex = Number(btn.getAttribute("data-dot-index"));
    if (currentIndex == dotIndex) return;
  }
  if (isDotButtonClicked) {
    isNext = (dotIndex > currentIndex);
    isPrevious = (dotIndex < currentIndex);
  } else {
    isNext = (btn.id == "next");
    isPrevious = (btn.id == "previous");
  }
  currentImg.style.animation = `${isNext ? "animate-out-left" : "animate-out-right"} 0.5s linear forwards`;
  if (!isDotButtonClicked) btn.style.pointerEvents = 'none';
  setTimeout(() => {
    if (!isDotButtonClicked) btn.style.pointerEvents = 'auto';
    currentImg.classList.toggle("img--activate");
  }, 500);
  currentDot.classList.toggle("dot--activate");
  if (isNext) {
    let nextIndex;
    if (isDotButtonClicked) {
      nextIndex = dotIndex;
    } else {
      nextIndex = (currentIndex + 1) % imgIdArray.length;
    }
    const nextImg = document.querySelector("#" + imgIdArray[nextIndex]);
    const nextDot = document.querySelector("#" + dotIdArray[nextIndex]);
    nextImg.classList.toggle("img--activate");
    nextDot.classList.toggle("dot--activate");
    nextImg.style.animation = "animate-in-left 0.5s linear forwards";
    currentIndex = nextIndex;
  } else {
    let previousIndex;
    if (isDotButtonClicked) {
      previousIndex = dotIndex;
    } else {
      previousIndex = (currentIndex + 3) % imgIdArray.length;
    }
    const previousImg = document.querySelector("#" + imgIdArray[previousIndex]);
    const previousDot = document.querySelector("#" + dotIdArray[previousIndex]);
    previousImg.classList.toggle("img--activate");
    previousDot.classList.toggle("dot--activate");
    previousImg.style.animation = "animate-in-right 0.5s linear forwards";
    currentIndex = previousIndex;
  }
}