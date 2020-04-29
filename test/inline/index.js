import './inline.scss';

export function Init() {
  const obj = { inline: true, str: 'inline done!' };
  console.info(JSON.stringify({ obj }, null, 2));
}

window.onload = new Init();
