import './plover.scss';

export function Init() {
  const obj = { plover: true, str: 'plover done!' };
  console.info(JSON.stringify({ obj }, null, 2));
}

window.onload = new Init();
