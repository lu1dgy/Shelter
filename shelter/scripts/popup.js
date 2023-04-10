import { pets } from '../db.js'

const closeBtn = document.querySelector('.popup__close-btn')
const popup = document.querySelector('.popup')
const popupName = document.querySelector('.popup__name')
const popupImg = document.querySelector('.popup__img')
const popupType = document.querySelector('.popup__function')
const popupText = document.querySelector('.popup__text')
const popupAge = document.querySelector('.popup__age')
const popupInoculations = document.querySelector('.popup__inoculations')
const popupDiseases = document.querySelector('.popup__diseases')
const popupParasites = document.querySelector('.popup__parasites')
const popupOverlay = document.querySelector('.popup__overlay')

const handleClose = () => {
  popup.classList.remove('popup_opened')
  document.body.style.overflow = 'visible'
}

const createListText = (list) => {
  let text = ''
  for (let i = 0; i < list.length; i++) {
    if (i === 0) {
      text += list[i]
      continue
    }
    text += `, ${list[i]}`
  }
  return text
}
const handlePopupClick = (e) => {
  if (e.target === popupOverlay) {
    handleClose()
  }
}

export const addCardListener = (card) => {
  const handleCardClick = (e) => {
    const cardName = e.target.closest('.card')?.querySelector('.card__name').textContent
    if (cardName) {
      const card = pets.find((pet) => pet.name === cardName)
      popupName.textContent = card.name
      popupType.textContent = card.type + ' - ' + card.breed
      popupText.textContent = card.description
      popupImg.src = card.img
      popupAge.textContent = card.age
      popupInoculations.textContent = createListText(card.inoculations)
      popupDiseases.textContent = createListText(card.diseases)
      popupParasites.textContent = createListText(card.parasites)
      document.body.style.overflow = 'hidden'
      popup.classList.add('popup_opened')
    }
  }
  card.addEventListener('click', handleCardClick)
}

popup.addEventListener('click', handlePopupClick)
closeBtn.addEventListener('click', handleClose)
