// Global type declarations to resolve D3 type issues
declare module 'd3-array' {}
declare module 'd3-color' {}
declare module 'd3-ease' {}
declare module 'd3-interpolate' {}
declare module 'd3-path' {}
declare module 'd3-shape' {}
declare module 'd3-time' {}
declare module 'd3-timer' {}
declare module 'd3-scale' {}

// Global type declarations for other libraries
declare module 'estree' {}
declare module 'node' {}

// React module declarations
declare module 'react' {
  export = React;
  export as namespace React;
}

declare module 'react-dom' {
  export = ReactDOM;
  export as namespace ReactDOM;
} 