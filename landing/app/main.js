// messenger.init();

window.onload = function () {
  var messages = document.querySelector('.bablot-chat--messages');
  for(let i = 0; i <=50; i++) {
    var e = document.createElement('div');
    e.innerHTML = `<img src="assets/king3.png"/>
      <div class="bablot-chat--message--text">I am a blab</div>`;
    e.className += 'bablot-chat--message--received';
    messages.appendChild(e);
  }

};
function go(state) {
  var chatPanel = document.querySelector('.bablot-chat-panel');
  var aboutPanel = document.querySelector('.bablot-about-panel');
  var contactPanel = document.querySelector('.bablot-contact-panel');
  var wrap = document.querySelector('.bablot-wrapper');

  if (state == 'about') {
    chatPanel.style.animation = "slide-left 1s forwards"
    aboutPanel.style.display = 'block';
    aboutPanel.style.opacity = '1';
    contactPanel.style.opacity = '0';

  } else if (state == 'contact') {
    chatPanel.style.animation = "slide-left 1s forwards"
    contactPanel.style.display = 'block';
    contactPanel.style.opacity = '1';
    aboutPanel.style.opacity = '0';

  } else if (state == 'chat') {
    // Needed to prevent the animation from firing
    // if nothing has been clicked yet
    if (chatPanel.style.animation !== '') {
      chatPanel.style.animation = "slide-right 1s forwards"
    }
    aboutPanel.style.opacity = '0';
    contactPanel.style.opacity = '0';
  }
}
