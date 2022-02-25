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
    const nextIndex = (isDotButtonClicked ? dotIndex : (currentIndex + 1) % imgIdArray.length);
    upcomingImageHandler("next", nextIndex);
  } else {
    const previousIndex = (isDotButtonClicked ? dotIndex : (currentIndex + 3) % imgIdArray.length);
    upcomingImageHandler("previous", previousIndex);
  }
}
function upcomingImageHandler(type, upcomingIndex) {
  const upcomingImg = document.querySelector("#" + imgIdArray[upcomingIndex]);
  const upcomingDot = document.querySelector("#" + dotIdArray[upcomingIndex]);
  upcomingImg.classList.toggle("img--activate");
  upcomingDot.classList.toggle("dot--activate");
  upcomingImg.style.animation = (type == "next" ? "animate-in-left 0.5s linear forwards" : "animate-in-right 0.5s linear forwards");
  currentIndex = upcomingIndex;
}