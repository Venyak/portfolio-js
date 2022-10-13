const disableScroll = () => {
  const widthScroll = window.innerWidth - document.body.offsetWidth;

  document.body.scrollPosition = window.scrollY;

  document.body.style.cssText = `
		overflow: hidden;
		position: fixed;
		top: -${document.body.scrollPosition}px;
		left: 0;
		height: 100vh;
		width: 100vw;
		padding-right: ${widthScroll}px;
	`;
};

const enableScroll = () => {
  document.body.style.cssText = 'position: relative';
  window.scroll({ top: document.body.scrollPosition });
};

{
  // Модальное окно
  const presentOrderBtn = document.querySelector('.present__order-btn');
  const pageOverlayModal = document.querySelector('.page__overlay_modal');
  const modalClose = document.querySelector('.modal__close');

  const handlerModal = (openBtn, modal, openSelector, closeBtn, speed) => {
    let opacity = 0;

    const openModal = () => {
      disableScroll();
      modal.style.opacity = opacity;

      modal.classList.add(openSelector);

      const timer = setInterval(() => {
        opacity += 0.05;
        modal.style.opacity = opacity;
        if (opacity >= 1) clearInterval(timer);
      }, speed);
    };

    const closeModal = () => {
      enableScroll();
      modal.style.opacity = opacity;

      const timer = setInterval(() => {
        opacity -= 0.05;
        modal.style.opacity = opacity;
        if (opacity <= 0) {
          clearInterval(timer);
          modal.classList.remove(openSelector);
        }
      }, speed);
    };

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  };

  handlerModal(presentOrderBtn, pageOverlayModal, 'page__overlay_modal_open', modalClose, 6);
}

{
  // Бургер-меню
  const headerContactsBurger = document.querySelector('.header__contacts-burger');
  const headerContacts = document.querySelector('.header__contacts');

  const handlerBurger = (openBtn, menu, openSelector) => {
    openBtn.addEventListener('click', () => {
      if (menu.classList.contains(openSelector)) {
        menu.style.height = '';
        menu.classList.remove(openSelector);
      } else {
        menu.style.height = menu.scrollHeight + 'px';
        menu.classList.add(openSelector);
      }
    });
  };

  handlerBurger(headerContactsBurger, headerContacts, 'header__contacts_open');
}

{
  // Галерея

  const portfolioList = document.querySelector('.portfolio__list');
  const pageOverlay = document.createElement('div');
  pageOverlay.classList.add('page__overlay');

  portfolioList.addEventListener('click', (event) => {
    const card = event.target.closest('.card');

    if (card) {
      disableScroll();
      document.body.append(pageOverlay);
      const title = card.querySelector('.card__client');

      const picture = document.createElement('picture');

      picture.style.cssText = `
				position: absolute;
				top: 20px;
				left: 50%;
				transform: translateX(-50%);
				width: 90vw;
				max-width: 1440px;
			`;

      picture.innerHTML = `
				<source srcset="${card.dataset.fullImage}.avif" type="image/avif">
				<source srcset="${card.dataset.fullImage}.webp" type="image/webp">
				<img src="${card.dataset.fullImage}.jpg" alt="${title.textContent}" >
			`;

      pageOverlay.append(picture);

      console.log(card.dataset.fullImage + '.jpg');
    }
  });

  pageOverlay.addEventListener('click', () => {
    enableScroll();
    pageOverlay.remove();
    pageOverlay.textContent = '';
  });
}
