import 'jquery';
import '../scss/main.scss';
import '../scss/fonts.scss';
import './quiz.scss';

export function Init() {
  console.info('················· quiz done!');
  const elm = document.getElementsByClassName('load')[0];
  if (elm) {
    elm.classList.add('show');
  }
}

window.onload = new Init();
