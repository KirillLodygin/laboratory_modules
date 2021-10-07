document.querySelector('.date-and-time__p').textContent =
  'Укажите дату и время';
let modal;

function createModalWindow() {
  modal = $modal({
    title: 'Укажите дату и время',
    content: `<p><input class='date-and-time-input' type='datetime-local' name='date' value='${
      document.querySelector('.date-and-time__p').textContent !==
      'Укажите дату и время'
        ? document.querySelector('.date-and-time__p').textContent
        : ''
    }'></p>`,
    footerButtons: [
      {
        class: 'btn btn__cancel',
        text: 'Отмена',
        handler: 'modalHandlerCancel',
      },
      { class: 'btn btn__ok', text: 'ОК', handler: 'modalHandlerOk' },
    ],
  });
  modal.show();
  document
    .querySelector('.modal__backdrop')
    .addEventListener('click', checkStateOfModalWindow);
}

function destroyModalWindow() {
  modal.hide();
  modal.destroy();
}

function createToast() {
  Toastify({
    text: 'Дата и время не указаны!',
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'left', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)',
    },
    offset: {
      x: 550, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: 320, // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
  }).showToast();
}

function writeDownDateAndTime() {
  if (document.querySelector('.date-and-time-input').value) {
    document.querySelector('.date-and-time__p').textContent =
      document.querySelector('.date-and-time-input').value;
    return;
  }
  document.querySelector('.date-and-time__p').textContent =
    'Дата и время не указаны!';
  document.querySelector('.date-and-time__p').classList.add('color-red');
  setTimeout(() => {
    document.querySelector('.date-and-time__p').textContent =
      'Укажите дату и время';
    document.querySelector('.date-and-time__p').classList.remove('color-red');
  }, 2500);
}

function checkStateOfModalWindow(e) {
  if (e.target.dataset.handler === 'modalHandlerCancel') {
    writeDownDateAndTime();

    let timer = 500;

    if (document.querySelector('.date-and-time-input').value === '') {
      modal.setTitle('Дата и время не указаны!');
      document.querySelector('.modal__title').classList.add('color-red');
      timer = 1500;
    }

    setTimeout(() => {
      document.querySelector('.modal__title').classList.remove('color-red');
      destroyModalWindow();
    }, timer);
  }

  if (e.target.dataset.handler === 'modalHandlerOk') {
    if (!document.querySelector('.date-and-time-input').value) {
      modal.setTitle('Дата и время не указаны!');
      document.querySelector('.modal__title').classList.add('color-red');
      document.querySelector('.modal__content').classList.add('animation');
      createToast();
      setTimeout(
        () =>
          document
            .querySelector('.modal__content')
            .classList.remove('animation'),
        2000,
      );
    } else {
      writeDownDateAndTime();
      destroyModalWindow();
    }
  }
}

document.querySelector('.pencil').addEventListener('click', createModalWindow);
