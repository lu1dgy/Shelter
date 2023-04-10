const burgerMenu = document.querySelector('.header__burger')
const navBar = document.querySelector('.header__nav')
const navLinks = document.querySelectorAll('.header__nav a')

const handleBurger = () => {
  burgerMenu.classList.toggle('active')
  navBar.classList.toggle('header__nav_visible')
  document.body.style.overflow = navBar.classList.contains('header__nav_visible') ? 'hidden' : 'visible'
}

const closeNav = () => {
  burgerMenu.classList.remove('active')
  navBar.classList.remove('header__nav_visible')
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
