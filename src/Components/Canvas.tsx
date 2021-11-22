/* eslint-disable react/prop-types */
import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import useAnimationFrame from "../CustomHooks/useAnimationFrame";
import { sample } from "lodash";
import { TileData, strategyType, ExternalActionInterface } from "../interfaces";

import zero from "../Tiles/tile_0.png";
import one from "../Tiles/tile_1.png";
import second from "../Tiles/tile_2.png";
import third from "../Tiles/tile_3.png";
import four from "../Tiles/tile_4.png";
import five from "../Tiles/tile_5.png";
import six from "../Tiles/tile_6.png";
import seven from "../Tiles/tile_7.png";
import eight from "../Tiles/tile_8.png";
import nine from "../Tiles/tile_9.png";
import ten from "../Tiles/tile_10.png";
import eleven from "../Tiles/tile_11.png";
import twelve from "../Tiles/tile_12.png";
import thirteen from "../Tiles/tile_13.png";
import forteen from "../Tiles/tile_14.png";
import fifteen from "../Tiles/tile_15.png";
import sixteen from "../Tiles/tile_16.png";
import seventeen from "../Tiles/tile_17.png";

const TILES = [zero, one, second, third, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, forteen, fifteen, sixteen, seventeen];


interface EngineInterface {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface CanvasInterface {
  speed: number;
  backgroundColorClass: string;
  nbTilesWidth: number
}

const Canvas = forwardRef<ExternalActionInterface, CanvasInterface>(({speed, backgroundColorClass, nbTilesWidth }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tilesRef = useRef<TileData[]>([]);
  const { play, stop } = useAnimationFrame(animate);

  useEffect(() => {
    const { current } = canvasRef;
    if(current) {
      current.width = current.parentElement!.offsetWidth / 2;
      current.height = current.parentElement!.offsetWidth / 2;
      generateArtwork();
    }
  }, []);

  useEffect(() => {
    stop();
    play();
  }, [speed])


  useEffect(() => {
    generateArtwork();
  }, [nbTilesWidth])


  useImperativeHandle(ref, () => ({
      play() {
        play();
      },

      pause() {
          stop();
      },

      resetPosition() {
        resetPosition();
        if(canvasRef && canvasRef.current) {
          const context = canvasRef.current.getContext("2d");
          renderArtwork(context);
        }
      },

      resetAll() {
        generateArtwork().then(() => {
          if(canvasRef && canvasRef.current) {
            const context = canvasRef.current.getContext("2d");
            renderArtwork(context);
          }
        });
      }
    }));

  function computeVelocityByStrategy(strategyName: strategyType) : [number, number] {
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
    if(canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      moves(deltaTime);
      renderArtwork(context);
    }
  }

  async function generateArtwork() : Promise<void> {
    const { width, height } = canvasRef.current!;
    const widthTile = width / nbTilesWidth;
    const heightTile = height / nbTilesWidth;

    const tiles : TileData[] = [];
    const promises : Promise<TileData>[] = [];

    const strategyName = sample(["horizontal","vertical", "southEast", "northEast" , "southWest" , "northWest"]) as strategyType;

    for(let x = 0; x < width; x += widthTile) {
      for(let y = 0; y < height; y += heightTile) {

        const image = new Image();
        image.src = pickImage();
        const promise = new Promise<TileData>((resolve, reject) => { 
          image.onload = () => {
            const [vx, vy] = computeVelocityByStrategy(strategyName);
            resolve({x, y , vx, vy, width: widthTile, height: heightTile, image });
          }
        });
        promises.push(promise);
      }
    }

    return new Promise<void>((resolve) => {
      Promise.all(promises)
      .then(
        (tiles) => {
          tilesRef.current = tiles as TileData[];
          resolve();
      });
    });
  }

  function resetPosition() {
    if(tilesRef.current.length === 0) {
      return;
    }

    const { width, height } = canvasRef.current!;
    const widthTile = width  / nbTilesWidth;
    const heightTile = height / nbTilesWidth;

    const tiles : TileData[] = []
    let index = 0;
    for(let x = 0; x < width; x += widthTile) {
      for(let y = 0; y < height; y += heightTile) {
        tiles.push({...tilesRef.current[index], x, y });
        index = index +1;
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

    const widthCanvas = canvasRef!.current!.width;
    const heightCanvas = canvasRef!.current!.height;

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

      // customise color
/*      context.fillStyle = "grey";
      context.fillRect(x, y, width, height);
      context.globalCompositeOperation = "destination-out";*/
      
      context.drawImage(image, x, y, width, height);
      context.restore();
    })
  }

  const colorClass = `bg-${backgroundColorClass}`
  return (
    <canvas ref={canvasRef} className={`border-2 rounded-lg ${colorClass}`}>
    </canvas>
  );
});

export default Canvas;