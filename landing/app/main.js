// messenger.init();

function go(state) {
  var chat = document.querySelector('.bablot-chat');
  var about = document.querySelector('.bablot-about');
  var wrap = document.querySelector('.wrapper');
  var contact = document.querySelector('.bablot-contact');

  if (state == 'about') {
    chat.style.animation = "slide-left 2s forwards"
    about.style.display = 'block';
    about.style.opacity = '0.5';
    contact.style.opacity = '0';

  } else if (state == 'contact') {
    chat.style.animation = "slide-left 2s forwards"
    contact.style.display = 'block';
    contact.style.opacity = '0.5';
    about.style.opacity = '0';

  } else if (state == 'chat') {
    chat.style.animation = "slide-right 2s forwards"
    about.style.opacity = '0';
    contact.style.opacity = '0';
  }
}
