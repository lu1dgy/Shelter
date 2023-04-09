import { pets } from '../db.js';

const burgerMenu = document.querySelector('.header__burger');
const leftArrows = document.querySelectorAll("#btn-left");
const rightArrows = document.querySelectorAll("#btn-right");
const carousel = document.querySelector("#carousel");
const leftItem = document.querySelector("#item-left");
const rightItem = document.querySelector("#item-right");
const cardsContainer = document.querySelector('.cards__wrapper')
const activeItem = document.querySelector("#item-active")

const addTransition = (direction) => {
  carousel.classList.add(`transition-${direction}`);
  unlistenArrows();
};
const moveLeft = () => addTransition("left");
const moveRight = () => addTransition("right");
const listenArrows = () => {
  leftArrows.forEach(el => el.addEventListener('click', moveLeft))
  rightArrows.forEach(el => el.addEventListener('click', moveRight))
}
const unlistenArrows = () => {
  leftArrows.forEach(el => el.removeEventListener('click', moveLeft))
  rightArrows.forEach(el => el.removeEventListener('click', moveRight))
}

const createCardTemplate = (name, imageSrc) => {
  const card = document.createElement('div');
  card.classList.add('card');
  const image = document.createElement('img');
  image.classList.add('card__image');
  image.setAttribute('src', imageSrc);
  image.setAttribute('alt', 'petImage');
  const nameElement = document.createElement('p');
  nameElement.classList.add('card__name');
  nameElement.textContent = name;
  const button = document.createElement('button');
  button.classList.add('card__btn');
  button.textContent = 'Learn more';
  card.appendChild(image);
  card.appendChild(nameElement);
  card.appendChild(button);
  return card;
};

const generateCards = (numCards) => {
  for (let i = 0; i < numCards; i++) {
    const pet = pets[i];
    const leftCard = createCardTemplate(pet.name, pet.img);
    leftItem.appendChild(leftCard);
    const rightCard = createCardTemplate(pet.name, pet.img);
    rightItem.appendChild(rightCard);
    const activeCard = createCardTemplate(pet.name, pet.img);
    activeItem.appendChild(activeCard);
  }
}
const deleteCards = () => {
  leftItem.innerHTML = ''
  rightItem.innerHTML = ''
  activeItem.innerHTML = ''
} 

//take number of cards in container
const getWidth = () => document.querySelector('.pets__container').offsetWidth;
const number = () => {
  const width = getWidth();
  switch (width) {
    case 1280:
      return 3;
    case 768:
      return 2;
    case 320:
      return 1;
    default:
      return 3;
  }
};

//generate start cards
generateCards(number())

//return random shuffled array
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
carousel.addEventListener("animationend", (animationEvent) => {
  const cardsPerContainer = number();
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



const handleResize = () => {
  deleteCards()
  generateCards(number())
}
window.addEventListener('resize', handleResize)

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
});

listenArrows()
