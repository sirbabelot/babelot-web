// messenger.init();

function go(state) {
  var chat = document.querySelector('.bablot-chat');
  var about = document.querySelector('.bablot-about');
  var contact = document.querySelector('.bablot-contact');
  var wrap = document.querySelector('.bablot-wrapper');

  if (state == 'about') {
    chat.style.animation = "slide-left 1s forwards"
    about.style.display = 'block';
    about.style.opacity = '0.5';
    contact.style.opacity = '0';

  } else if (state == 'contact') {
    chat.style.animation = "slide-left 1s forwards"
    contact.style.display = 'block';
    contact.style.opacity = '0.5';
    about.style.opacity = '0';

  } else if (state == 'chat') {
    // Needed to prevent the animation from firing
    // if nothing has been clicked yet
    if (chat.style.animation !== '') {
      chat.style.animation = "slide-right 1s forwards"
    }
    about.style.opacity = '0';
    contact.style.opacity = '0';
  }
}
