var messenger = require('./Messenger.js');
var littleKing = require('./assets/little-king3.svg')

var input = document.getElementById('bablot-chat-input-field');
var messageListElement = document.querySelector('.bablot-chat--messages');

document.querySelector('.bablot-chat--input-form').addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var msgText = input.value;
    var chatBubbleTemplate = `
      <div class="bablot-chat--message bablot-chat--message--sent">
        <div class="bablot-chat--message--content">
          <div class="bablot-chat--message--text">
            ${msgText}
          </div>
        </div>
      </div>
    `;
    input.value = "";
    var div = document.createElement('div');
    div.innerHTML = chatBubbleTemplate;
    messageListElement.appendChild(div.firstElementChild);

    messenger.sendMessage(msgText);
});

document.addEventListener(messenger.EVENTS.client.nowOnline, function (e) {
  console.log('This twice.');
  // document.querySelector('#nickname').innerHTML = e.detail.nickname;
}, false);

document.addEventListener(messenger.EVENTS.business.statusChanged, function (e) {
  if(e.detail.status=='offline'){
    console.log('Now offline');
    document.querySelector('.bablot-chat--status').classList.add('bablot-chat--status-offline');
  }else{
    console.log('Now online');
    document.querySelector('.bablot-chat--status').classList.remove('bablot-chat--status-offline');
  }
}, false);


document.addEventListener(messenger.EVENTS.directMessage, function (e) {
    e.preventDefault();
    e.stopPropagation();
    var msgText = e.detail.message;
    var chatBubbleTemplate = `
        <div class="bablot-chat--message bablot-chat--message--received">
          <div class="bablot-chat--message--content">
            <img src="${littleKing}"/>
            <div class="bablot-chat--message--text">
              ${msgText}
            </div>
          </div>
        </div>
    `;
    input.value = "";
    var div = document.createElement('div');
    div.innerHTML = chatBubbleTemplate;
    messageListElement.appendChild(div.firstElementChild);
}, false);
