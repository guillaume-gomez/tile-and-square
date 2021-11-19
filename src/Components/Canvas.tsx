import React, { useRef, useState, useEffect } from 'react';
import tile_zero from "../Tiles/tile_0.png";
import tile_one from "../Tiles/tile_1.png";
import tile_second from "../Tiles/tile_2.png";
import tile_third from "../Tiles/tile_3.png";
import useAnimationFrame from "../CustomHooks/useAnimationFrame";
import { sample } from "lodash";

const nbTilesWidth = 4;
const nbTilesHeight = 4;
const TILES = [tile_zero, tile_one, tile_second, tile_third];

interface TileData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  image: HTMLImageElement;
}

interface EngineInterface {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface CanvasInterface {
  speed: number;
  running: boolean;
  backgroundColor: string;
}

function Canvas() {
  const [background, setBackground] = useState<string>("#FF9915");
  const ref = useRef<HTMLCanvasElement>(null);
  const tilesRef = useRef<TileData[]>([]);
  
  useAnimationFrame((deltaTime: number) => {
    if(ref.current) {
      const context = ref.current.getContext("2d");
      moves(deltaTime);
      renderArtwork(context);
    }
  });


  useEffect(() => {
    const { current } = ref;
    if(current) {
      current.width = 1000;
      current.height = 1000;
      let context = current.getContext("2d");
      generateArtwork(context);
    }
  }, []);

  function computeVelocityByStrategy(strategyName: string) : [number, number] {
    switch(strategyName) {
      case "horizontal":
      default:
        return [0.1, 0.0];
      case "vertical":
        return [0.0, 0.1];
      case "southEast":
        return [0.1, 0.1];
      case "northEast":
        return [-0.1, 0.1];
      case "southWest":
        return [0.1, -0.1];
      case "northWest":
        return [-0.1, -0.1];
    }
  }

  function generateArtwork(context: CanvasRenderingContext2D | null, gap : number = 0) {
    if(!context) {
      return;
    }
    const { width, height } = ref.current!;
    const widthTile = (width - (2 * gap)) / nbTilesWidth;
    const heightTile = (height - (2 * gap)) / nbTilesHeight;

    const tiles : TileData[] = [];
    const promises = [];

    for(let x = 0; x < width; x += (widthTile + gap)) {
      for(let y = 0; y < height; y += (heightTile + gap)) {

        const image = new Image();
        image.src = pickImage();
        const promise = new Promise((resolve, reject) => { 
          image.onload = () => {
            const [vx, vy] = computeVelocityByStrategy("vertical");
            resolve({x, y , vx, vy, width: widthTile, height: heightTile, image });
          }
        });
        promises.push(promise);
      }
    }

    Promise.all(promises)
    .then(
      (tiles) => {
        tilesRef.current = tiles as TileData[];
    });
  }

  function pickImage() : string {
    const imageIndex = Math.floor(Math.random() * TILES.length);
    return TILES[imageIndex];
  }

  function moves(deltaTime: number) {
    const newTiles = tilesRef.current.map(tile => move(tile, deltaTime));
    tilesRef.current = newTiles;
  }

  function move(tile: TileData, deltaTime: number) : TileData {
    const { x, y, vx, vy } = moveAndCheckCollision(tile, deltaTime);
    return { ...tile, x, y, vx, vy };
  }

  function moveAndCheckCollision({ x, y, vx, vy, width, height }: TileData, deltaTime: number) : EngineInterface {
    let newX = x + ( vx * deltaTime );
    let newY = y + (vy * deltaTime );
    let newVx = vx;
    let newVy = vy;
    let newStrategy = false;

    const widthCanvas = ref!.current!.width;
    const heightCanvas = ref!.current!.height;

    if(newX < 0) {
      newX = 0;
      newVx = - vx;
    }
    else if(newX > (widthCanvas - width)) {
      newX = widthCanvas - width;
      newVx = - vx;
    }

    if(newY < 0) {
      newY = 0;
      newVy = - vy;
    }
    else if(newY > (heightCanvas - height) ) {
      newY = heightCanvas - height;
      newVy = - vy;
    }

    return { x: newX, y: newY, vx: newVx, vy: newVy };
  }

  function renderArtwork(context: CanvasRenderingContext2D| null) {
    if(!context) {
      return null;
    }
    context.clearRect(0,0, 1000, 1000);
    tilesRef.current.forEach(({image, x, y, width, height}) => {
      context.save();
      context.drawImage(image, x, y, width, height);
      context.restore();
    })
  }


  return (
    <canvas ref={ref} className="border rounded-lg">
    </canvas>
  );
}

export default Canvas;
