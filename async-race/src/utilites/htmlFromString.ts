export default function(htmlFromString: string): HTMLElement {
  const template = document.createElement('template');
  template.innerHTML = htmlFromString;
  return template as HTMLElement;
}
