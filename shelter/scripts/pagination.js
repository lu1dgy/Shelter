import { pets } from '../db.js'
import { shuffle } from '../utils/shuffleArr.js'
import { createCardTemplate } from '../utils/createCard.js'

const cards = document.querySelector('.cards_pets')
const pageNumberText = document.querySelector('.slider_arrow_active')
const prevButton = document.querySelector('.prev')
const nextButton = document.querySelector('.next')
const lastPage = document.querySelector('.last')
const firstPage = document.querySelector('.first')
let pageNumber = 1
let innerWidth = window.innerWidth
let cardsPerPage = innerWidth > 1280 ? 8 : innerWidth > 768 ? 6 : 3
let pagesNumber = innerWidth > 1280 ? 6 : innerWidth > 768 ? 8 : 16
const setPageNumberText = (pageNumber) => (pageNumberText.innerHTML = `${pageNumber}`)

const generateInitData = (data, numArrays, itemsPerArray) => {
  const shuffledData = shuffle(data)
  const arr = []
  let id = 1
  for (let i = 0; i < numArrays; i++) {
    const page = []
    for (let b = 0; b < itemsPerArray; b++) {
      const copy = JSON.stringify(shuffledData[b])
      const copyObj = JSON.parse(copy)
      copyObj.id = id
      id++
      page.push(copyObj)
    }
    arr.push(shuffle(page))
  }
  return arr
}

let data = generateInitData(pets, pagesNumber, cardsPerPage)

const generateCards = (numCards, n) => {
  cards.innerHTML = ''
  for (let i = 0; i < numCards; i++) {
    const pet = data[n - 1][i]
    const card = createCardTemplate(pet.name, pet.img, '.')
    cards.appendChild(card)
  }
  checkButtons()
}

function checkButtons() {
  firstPage.disabled = pageNumber === 1
  prevButton.disabled = pageNumber === 1
  lastPage.disabled = pageNumber === data.length
  nextButton.disabled = pageNumber === data.length
}

const clickNextPage = () => {
  pageNumber++
  generateCards(cardsPerPage, pageNumber)
  setPageNumberText(pageNumber)
}

const clickPrevPage = () => {
  pageNumber--
  generateCards(cardsPerPage, pageNumber)
  setPageNumberText(pageNumber)
}

const clickLastPage = () => {
  pageNumber = data.length
  generateCards(cardsPerPage, pageNumber)
  setPageNumberText(pageNumber)
}

const clickFirstPage = () => {
  pageNumber = 1
  generateCards(cardsPerPage, pageNumber)
  setPageNumberText(pageNumber)
}

nextButton.addEventListener('click', clickNextPage)
prevButton.addEventListener('click', clickPrevPage)
lastPage.addEventListener('click', clickLastPage)
firstPage.addEventListener('click', clickFirstPage)

const handleResize = () => {
  innerWidth = window.innerWidth
  cardsPerPage = innerWidth > 1280 ? 8 : innerWidth > 768 ? 6 : 3
  pagesNumber = innerWidth > 1280 ? 6 : innerWidth > 768 ? 8 : 16
  const prev = data.length
  data = generateInitData(pets, pagesNumber, cardsPerPage)
  if (data.length === prev) return
  pageNumber = 1
  pageNumberText.innerHTML = `${pageNumber}`
  generateCards(cardsPerPage, pageNumber)
}

window.addEventListener('resize', handleResize)
generateCards(cardsPerPage, pageNumber)
