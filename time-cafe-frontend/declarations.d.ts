declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.sass' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.scss' {
  const classes: { 
    [key: string]: string;
    // Динамические классы для БЭМ
    [key: `${string}--${string}`]: string;
    [key: `${string}__${string}`]: string;
    [key: `${string}__${string}--${string}`]: string;
  };
  export default classes;
}
