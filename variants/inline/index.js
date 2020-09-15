import './inline.scss';

export function Init() {
  const obj = { inline: true, str: 'inline done!' };
  console.info(JSON.stringify({ obj }, null, 2));
  const elm = document.getElementsByClassName('iframe')[0];
  if (elm) {
    elm.classList.add('show');
  }
}

window.onload = new Init();
