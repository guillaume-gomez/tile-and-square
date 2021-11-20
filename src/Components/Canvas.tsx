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
  play: boolean
  reset: boolean;
  speed: number;
  backgroundColorClass: string;
}

function Canvas({speed, reset, play, backgroundColorClass } : CanvasInterface) {
  const ref = useRef<HTMLCanvasElement>(null);
  const tilesRef = useRef<TileData[]>([]);

  const {play: playFn, stop } = useAnimationFrame(animate);

  useEffect(() => {
    play === true ? playFn() : stop();
  }, [play])


  useEffect(() => {
    stop();
    playFn();
  }, [speed])

  useEffect(()=> {
    if(ref.current) {
      resetPosition();
      const context = ref.current.getContext("2d");
      renderArtwork(context);
    }

  },[reset])


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

  function animate(deltaTime: number) {
    if(ref.current) {
      const context = ref.current.getContext("2d");
      moves(deltaTime);
      renderArtwork(context);
    }
  }

  function generateArtwork(context: CanvasRenderingContext2D | null) {
    if(!context) {
      return;
    }
    const { width, height } = ref.current!;
    const widthTile = width / nbTilesWidth;
    const heightTile = height / nbTilesHeight;

    const tiles : TileData[] = [];
    const promises = [];

    for(let x = 0; x < width; x += widthTile) {
      for(let y = 0; y < height; y += heightTile) {

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

  function resetPosition() {
    if(tilesRef.current.length === 0) {
      return;
    }

    const { width, height } = ref.current!;
    const widthTile = width  / nbTilesWidth;
    const heightTile = height / nbTilesHeight;

    const tiles : TileData[] = []
    let index = 0;
    for(let x = 0; x < width; x += widthTile) {
      for(let y = 0; y < height; y += heightTile) {
        tiles.push({...tilesRef.current[index], x, y });
        index += index;
      }
    }
    tilesRef.current = tiles;
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
    let newX = x + ( vx * (speed/100) * deltaTime );
    let newY = y + (vy * (speed/100) * deltaTime );
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
    <canvas ref={ref} className={`border-2 rounded-lg bg-${backgroundColorClass}`}>
    </canvas>
  );
}

export default Canvas;
