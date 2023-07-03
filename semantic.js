/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* jshint esversion: 9 */

// close dropdowns when clicking outside
document.addEventListener('mouseup', (event) => {
  let ele = event.target;
  while (ele.tagName && ele.tagName !== 'BODY' && ele.tagName !== 'DETAILS') {
    ele = ele.parentNode;
  }
  if (ele.tagName === 'DETAILS') {
    return;
  }

  try {
    document.querySelectorAll('details[role=list][open]').forEach((details) => {
      details.removeAttribute('open');
    });
  } catch (er) {}
});


(function (modal, undefined) {
  const clickClose = (event) => {
    event = event || window.event;
    if (event.target.tagName.toLowerCase() === 'dialog' && event.target.getAttribute('open') === 'true') {
      document.querySelector('dialog[open]').removeAttribute('open');
      document.documentElement.classList.remove('no-scollbars');

      document.removeEventListener('click', clickClose);
      document.removeEventListener('keydown', escClose);
    }
  };
  const escClose = (event) => {
    event = event || window.event;
    if (event.key === 'Escape') {
      document.querySelector('dialog[open]').removeAttribute('open');
      document.documentElement.classList.remove('no-scollbars');

      document.removeEventListener('click', clickClose);
      document.removeEventListener('keydown', escClose);
    }
  };

  modal.show = (event, allowCloseOutside = true) => {
    let dialog;
    if (typeof event === 'string') {
      dialog = document.getElementById(event);
    } else {
      event = event || window.event;
      event.preventDefault();
      dialog = document.getElementById(event.currentTarget.getAttribute('data-target'));
    }

    dialog.setAttribute('open', true);
    document.documentElement.classList.add('no-scollbars');

    if (allowCloseOutside) {
      document.addEventListener('click', clickClose);
      document.addEventListener('keydown', escClose);
    }
  };

  modal.hide = (event) => {
    let dialog;
    if (typeof event === 'string') {
      dialog = document.getElementById(event);
    } else {
      event = event || window.event;
      dialog = document.getElementById(event.currentTarget.getAttribute('data-target'));
      if (event.target.href.split('#').pop() === dialog)
        event.preventDefault();
    }
    dialog.removeAttribute('open');
    document.documentElement.classList.remove('no-scollbars');

    document.removeEventListener('click', clickClose);
    document.removeEventListener('keydown', escClose);
  };

  modal.toggle = (event, allowCloseOutside = true) => {
    let dialog;
    if (typeof event === 'string') {
      console.log(event);
      dialog = document.getElementById(event);
    } else {
      event = event || window.event;
      event.preventDefault();
      dialog = document.getElementById(event.currentTarget.getAttribute('data-target'));
    }
    if (dialog.getAttribute('open') !== 'true') {
      modal.show(event, allowCloseOutside);
    } else {
      modal.hide(event);
    }
  };
}(window.modal = window.modal || {}));

