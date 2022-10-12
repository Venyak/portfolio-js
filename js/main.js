const presentOrderBtn = document.querySelector('.present__order-btn');
const pageOverlayModal = document.querySelector('.page__overlay_modal');
const modalClose = document.querySelector('.modal__close');
const pageOverlay = document.querySelector('.page__overlay');

const handlerModal = (openBtn, modal, openSelector, closeBtn, speed) => {
  let opacity = 0;

  openBtn.addEventListener('click', () => {
    modal.style.opacity = opacity;

    modal.classList.add(openSelector);

    const timer = setInterval(() => {
      opacity += 0.05;
      modal.style.opacity = opacity;
      if (opacity >= 1) clearInterval(timer);
    }, speed);
  });

  closeBtn.addEventListener('click', () => {
    modal.style.opacity = opacity;

    const timer = setInterval(() => {
      opacity -= 0.05;
      modal.style.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(timer);
        modal.classList.remove(openSelector);
      }
    }, speed);
  });
};

handlerModal(presentOrderBtn, pageOverlayModal, 'page__overlay_modal_open', modalClose, 6);
