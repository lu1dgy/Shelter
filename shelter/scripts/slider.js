import { pets } from '../db.js';
import {shuffle} from '../utils/shuffleArr.js'
import {createCardTemplate} from '../utils/createCard.js'

const burgerMenu = document.querySelector('.header__burger');
const leftArrows = document.querySelectorAll("#btn-left");
const rightArrows = document.querySelectorAll("#btn-right");
const carousel = document.querySelector("#carousel");
const leftItem = document.querySelector("#item-left");
const rightItem = document.querySelector("#item-right");
const activeItem = document.querySelector("#item-active")
const breakpoints = {
  320: 1,
  768: 2,
  1280: 3,
};

const addTransition = (direction) => {
  carousel.classList.add(`transition-${direction}`)
  unlistenArrows();
};
const moveLeft = () => addTransition("left")
const moveRight = () => addTransition("right")
const listenArrows = () => {
  leftArrows.forEach(el => el.addEventListener('click', moveLeft))
  rightArrows.forEach(el => el.addEventListener('click', moveRight))
}
const unlistenArrows = () => {
  leftArrows.forEach(el => el.removeEventListener('click', moveLeft))
  rightArrows.forEach(el => el.removeEventListener('click', moveRight))
}

const generateCards = (numCards) => {
  const shuffledPets = shuffle(pets);
  for (let i = 0; i < numCards; i++) {
    const pet1 = shuffledPets[i];
    const pet2 = shuffledPets[i + 1];
    const pet3 = shuffledPets[i + 2];
    const leftCard = createCardTemplate(pet1.name, pet1.img);
    leftItem.appendChild(leftCard);
    const rightCard = createCardTemplate(pet2.name, pet2.img);
    rightItem.appendChild(rightCard);
    const activeCard = createCardTemplate(pet3.name, pet3.img);
    activeItem.appendChild(activeCard);
  }
}

const deleteCards = () => {
  leftItem.innerHTML = ''
  rightItem.innerHTML = ''
  activeItem.innerHTML = ''
} 

//give container width
const getWidth = () => document.querySelector('.pets__container').offsetWidth;

//give number of cards in container
let currentWidth = getWidth();
let currentCardsPerContainer = breakpoints[currentWidth];
//generate start cards
generateCards(currentCardsPerContainer)

const handleResize = () => {
  const newWidth = getWidth();
  if (newWidth !== currentWidth) {
    currentWidth = newWidth;
    currentCardsPerContainer = breakpoints[currentWidth];
    deleteCards();
    generateCards(currentCardsPerContainer);
  }
};

carousel.addEventListener("animationend", (animationEvent) => {
  const cardsPerContainer = currentCardsPerContainer;
  let changedItem;
  if (animationEvent.animationName === "move-left") {
    carousel.classList.remove("transition-left");
    changedItem = leftItem;
    activeItem.innerHTML = leftItem.innerHTML;
  } else {
    carousel.classList.remove("transition-right");
    changedItem = rightItem;
    activeItem.innerHTML = rightItem.innerHTML;
  }
  changedItem.innerHTML = "";
  const shuffledPets = shuffle(pets);
  const selectedPets = shuffledPets.slice(0, cardsPerContainer);
  selectedPets.forEach((pet) => {
    const card = createCardTemplate(pet.name, pet.img);
    changedItem.appendChild(card);
  });
  listenArrows();
});

window.addEventListener('resize', handleResize);

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
});

listenArrows()
