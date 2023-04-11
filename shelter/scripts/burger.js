const burgerMenu = document.querySelector('.header__burger')
const navBar = document.querySelector('.header__list')
const navLinks = document.querySelectorAll('.header__nav a')

const handleBurger = () => {
  burgerMenu.classList.toggle('active')
  navBar.classList.toggle('header__list_visible')
  document.body.style.overflow = navBar.classList.contains('header__list_visible') ? 'hidden' : 'visible'
}

const closeNav = () => {
  burgerMenu.classList.remove('active')
  navBar.classList.remove('header__list_visible')
  document.body.style.overflow = 'visible'
}

burgerMenu.addEventListener('click', handleBurger)

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeNav()
  })
})


const handleOutsideClick = (e) => {
  if(burgerMenu.classList.contains('active')) {
    if (e.target !== navBar && !navBar.contains(e.target) && e.target !== burgerMenu) {
      closeNav()
    }
  }
}
document.addEventListener('click', handleOutsideClick)
