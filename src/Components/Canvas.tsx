/* eslint-disable react/prop-types */
import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import useAnimationFrame from "../CustomHooks/useAnimationFrame";
import {useWindowSize} from "rooks";
import { sample } from "lodash";
import { TileData, strategyType, ExternalActionInterface } from "../interfaces";


interface EngineInterface {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface CanvasInterface {
  speed: number;
  backgroundColorClass: string;
  nbTilesWidth: number;
  tileCollection: string[];
}

const Canvas = forwardRef<ExternalActionInterface, CanvasInterface>(({speed, backgroundColorClass, nbTilesWidth, tileCollection }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { innerWidth, innerHeight } = useWindowSize();
  const tilesRef = useRef<TileData[]>([]);
  const { play, stop } = useAnimationFrame(animate);

  useEffect(() => {
    const { current } = canvasRef;
    if(current && innerWidth && innerHeight) {
      // divide by two is arbitrary
      const value = Math.min(innerWidth, innerHeight) - 25;
      current.width = value;
      current.height = value;
      console.log(nbTilesWidth)
      resizeTiles(current.width, current.height);
      resetPosition();
      const context = current.getContext("2d");
      renderArtwork(context);
    }
  }, [ innerWidth, innerHeight]);

  useEffect(() => {
    const { current } = canvasRef;
    if(current) {
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
      },

      resize(width: number, height: number) {
        const { current } = canvasRef;
        if(current) {
          current.width = width;
          current.height = height;
          resizeTiles(width, height);
          resetPosition();
        }
      },
      
      scrollTo(){
        if(canvasRef && canvasRef.current) {
          canvasRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
    const imageIndex = Math.floor(Math.random() * tileCollection.length);
    return tileCollection[imageIndex];
  }

  function resizeTiles(width: number, height: number) {
    const widthTile = width / nbTilesWidth;
    const heightTile = height / nbTilesWidth;
    const newTiles = tilesRef.current.map(tile => ({...tile, width: widthTile, height: heightTile}));
    tilesRef.current = newTiles;
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
    const { width, height } = canvasRef.current!;
    context.clearRect(0,0, width, height);
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
