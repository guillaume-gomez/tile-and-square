export type strategyType = "horizontal"| "vertical" | "southEast" | "northEast" | "southWest" | "northWest";

export interface TileData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  image: HTMLImageElement;
}

export interface ExternalActionInterface {
  play: () => void;
  pause: () => void;
  resetPosition: () => void;
  resetAll: () => void;
  resize:(width: number, height: number) => void;
  scrollTo:() => void;
}
