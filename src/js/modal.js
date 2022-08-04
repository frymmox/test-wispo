(function() {
  if (document.querySelector('.modal')) {
    document.querySelectorAll('.js-modal-open').forEach((el) => {
      el.addEventListener('click', () => {
        const selector = el.getAttribute('data-target');

        document.querySelector(selector).classList.add('modal--show');
        scrollLock.disablePageScroll();
      });
    });

    document.querySelectorAll('.js-modal-close').forEach((el) => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach((modal) => {
          modal.classList.remove('modal--show');
          scrollLock.enablePageScroll();
        })
      });
    });

    document.querySelectorAll('.modal__overlay').forEach((el) => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach((modal) => {
          modal.classList.remove('modal--show');
          scrollLock.enablePageScroll();
        });
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        document.querySelectorAll('.modal').forEach((el) => {
          el.classList.remove('modal--show');
          scrollLock.enablePageScroll();
        })
      }
    });
  }
})();