require('./styles/about.css');
require('./styles/animations.css');
require('./styles/base.css');
require('./styles/chat.css');
require('./styles/contact.css');
require('./styles/footer.css');
require('./styles/header.css');
require('./styles/intro.css');
require('./styles/layout.css');
require('./eventHandler.js');

var messenger = require('./Messenger.js');
messenger.init();

window.onload = function () {
  var messages = document.querySelector('.bablot-chat--messages');

  var observer = new MutationObserver((mutations)=> {
    messages.oldScrollHeight = messages.scrollHeight;
    messages.scrollTop = messages.scrollHeight;
  });

  var config = { childList: true, subtree: true };
  observer.observe(messages, config);
};


window.go = function(state) {
  var chatPanel = document.querySelector('.bablot-chat-panel');
  var aboutPanel = document.querySelector('.bablot-about-panel');
  var contactPanel = document.querySelector('.bablot-contact-panel');
  var intro = document.querySelector('.bablot-intro--mesage');
  var crown = document.querySelector('.bablot-intro img');

  if (state == 'about') {
    chatPanel.style.animation = "slide-left 1s forwards"

    aboutPanel.style.display = 'block';
    window.getComputedStyle(aboutPanel).display;
    aboutPanel.style.opacity = '1';

    contactPanel.style.display = 'none';
    contactPanel.style.opacity = '0';

    intro.style.opacity = '0';

  } else if (state == 'contact') {
    chatPanel.style.animation = "slide-left 1s forwards"

    contactPanel.style.display = 'block';
      window.getComputedStyle(contactPanel).display;
    contactPanel.style.opacity = '1';

    aboutPanel.style.display = 'none';
    aboutPanel.style.opacity = '0';

    intro.style.opacity = '0';

  } else if (state == 'chat') {
    // Needed to prevent the animation from firing
    // if nothing has been clicked yet
    if (chatPanel.style.animation !== '') {
      chatPanel.style.animation = "slide-right 1s forwards"
    }
    aboutPanel.style.opacity = '0';
    contactPanel.style.opacity = '0';
    intro.style.opacity = '1';
    crown.style.opacity = '1';
  }
}
