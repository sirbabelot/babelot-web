// messenger.init();

function go(state) {
  if (state == 'about') {
    document.querySelector('.bablot-contact').style.display = 'none';
    document.querySelector('.bablot-about').style.display = 'inline-block';
  } else if (state == 'contact') {
    document.querySelector('.bablot-contact').style.display = 'inline-block';
    document.querySelector('.bablot-about').style.display = 'none';
  } else if (state == 'chat') {
    document.querySelector('.bablot-contact').style.display = 'none';
    document.querySelector('.bablot-about').style.display = 'none';
  }
}
