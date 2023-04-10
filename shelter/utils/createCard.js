import { addCardListener } from '../scripts/popup.js'

export const createCardTemplate = (name, imageSrc) => {
  const card = document.createElement('div')
  card.classList.add('card')
  const image = document.createElement('img')
  image.classList.add('card__image')
  image.setAttribute('src', `${imageSrc}`)
  image.setAttribute('alt', 'petImage')
  const nameElement = document.createElement('p')
  nameElement.classList.add('card__name')
  nameElement.textContent = name
  const button = document.createElement('button')
  button.classList.add('card__btn')
  button.textContent = 'Learn more'
  card.appendChild(image)
  card.appendChild(nameElement)
  card.appendChild(button)
  addCardListener(card)
  return card
}
