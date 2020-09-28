import './bulk-pages.scss';

export function BulksInit() {
  const obj = { bulk: true, str: 'bulks done!' };
  console.info(JSON.stringify({ obj }, null, 2));
}

window.onload = new BulksInit();
