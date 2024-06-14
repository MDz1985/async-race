declare module '*.svg' {
  const content: SVGElement;
  export default content;
}

declare module '*.html' {
  const content: string;
  export default content;
}
