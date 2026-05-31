declare module 'locomotive-scroll' {
  interface LocomotiveScrollOptions {
    el: HTMLElement;
    smooth?: boolean;
    multiplier?: number;
    class?: string;
    smartphone?: { smooth?: boolean };
    tablet?: { smooth?: boolean };
    [key: string]: unknown;
  }

  interface ScrollInstance {
    y: number;
    x: number;
  }

  type ScrollCallback = (instance: ScrollInstance) => void;

  class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    on(event: string, callback: ScrollCallback): void;
    scrollTo(target: string | number | HTMLElement, options?: Record<string, unknown>): void;
    update(): void;
    destroy(): void;
    scroll: ScrollInstance;
  }

  export = LocomotiveScroll;
}
