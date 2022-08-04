(function() {
  const headerOpen = document.querySelector('.header__open')
  const headerClose = document.querySelector('.header__close')
  const headerList = document.querySelector('.header__collapse')

  headerOpen.addEventListener('click', () => {
    headerList.classList.add('header__collapse--open')
    scrollLock.disablePageScroll()
  })

  headerClose.addEventListener('click', () => {
    headerList.classList.remove('header__collapse--open')
    scrollLock.enablePageScroll()
  })
})();
