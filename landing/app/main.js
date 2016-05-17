// messenger.init();

window.onload = function () {
  var messages = document.querySelector('.bablot-chat--messages');

  var observer = new MutationObserver((mutations)=> {
    messages.oldScrollHeight = messages.scrollHeight;
    messages.scrollTop = messages.scrollHeight;
  });

  var config = { childList: true, subtree: true };
  observer.observe(messages, config);
  for(let i = 0; i <=10; i++) {
    var e = document.createElement('div');
    if (i%2 == 0) {
      e.innerHTML = `
        <div class="bablot-chat--message--received">
          <div class="bablot-chat--message--content">
            <img src="assets/little-king3.svg"/>
            <div class="bablot-chat--message--text">
              I am the blab baby!!
            </div>
          </div>
        </div>
      `;
    } else {
      e.innerHTML = `
        <div class="bablot-chat--message--sent">
          <div class="bablot-chat--message--content">
            <div class="bablot-chat--message--text">
              I am a studly stud I a
            </div>
          </div>
        </div>
      `
    }
    messages.appendChild(e.firstElementChild);
  } //for
};


function go(state) {
  var chatPanel = document.querySelector('.bablot-chat-panel');
  var aboutPanel = document.querySelector('.bablot-about-panel');
  var contactPanel = document.querySelector('.bablot-contact-panel');
  var intro = document.querySelector('.bablot-intro--mesage');
  var crown = document.querySelector('.bablot-intro img');
  var wrap = document.querySelector('.bablot-wrapper');

  if (state == 'about') {
    chatPanel.style.animation = "slide-left 1s forwards"
    aboutPanel.style.display = 'block';
    aboutPanel.style.opacity = '1';
    contactPanel.style.opacity = '0';
    intro.style.opacity = '0';
    crown.style.opacity = '0';

  } else if (state == 'contact') {
    chatPanel.style.animation = "slide-left 1s forwards"
    contactPanel.style.display = 'block';
    contactPanel.style.opacity = '1';
    aboutPanel.style.opacity = '0';
    intro.style.opacity = '0';
    crown.style.opacity = '0';

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
