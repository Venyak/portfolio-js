const presentOrderBtn = document.querySelector('.present__order-btn');
const pageOverlayModal = document.querySelector('.page__overlay_modal');
const modalClose = document.querySelector('.modal__close');
const pageOverlay = document.querySelector('.page__overlay');

const handlerModal = (trigger, modal, openSelector) => {
  trigger.addEventListener('click', () => {
    modal.classList.toggle(openSelector);
  });
};

handlerModal(presentOrderBtn, pageOverlayModal, 'page__overlay_modal_open');
handlerModal(modalClose, pageOverlayModal, 'page__overlay_modal_open');
