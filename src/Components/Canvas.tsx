import React, { useRef, useState, useEffect } from 'react';
import tile from "../Tiles/tile.png";

 const nbTilesWidth = 5;
 const nbTilesHeight = 5;

interface TileData {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
}

function Canvas() {
  const [background, setBackground] = useState<string>("#FF9915");
  const ref = useRef<HTMLCanvasElement>(null);
  const [tiles, setTiles] = useState<TileData[]>([]);


  useEffect(() => {
    const { current } = ref;
    if(current) {
      const { width, height } = current;
      const image = new Image();
      image.src = tile;
      image.onload = () => {
        let context = current.getContext("2d");
        generateArtwork(context, image);
      };
    }
  }, []);

  useEffect(() => {
    if(!ref) {
      return;
    }
    let context = ref.current!.getContext("2d");
    renderArtwork(context);
    
  }, [tiles])


  function generateArtwork(context: CanvasRenderingContext2D | null, image: HTMLImageElement, gap : number = 0) {
    if(!context) {
      return;
    }
    const { width, height } = ref.current!;
    const widthTile = (width - (2 * gap)) / nbTilesWidth;
    const heightTile = (height - (2 * gap)) / nbTilesHeight;

    const tiles : TileData[] = [];

    for(let x = 0; x < width; x += widthTile) {
      for(let y = 0; y < height; y += heightTile) {
        tiles.push({x, y, width: widthTile, height: heightTile, image })
        context.drawImage(image, x, y, widthTile, heightTile);
      }
    }
    setTiles(tiles);
  }

  function renderArtwork(context: CanvasRenderingContext2D| null) {
    if(!context) {
      return null;
    }
    tiles.forEach(({image, x, y, width, height}) => {
      context.drawImage(image, x, y, width, height);
    })
  }


  return (
    <canvas ref={ref} className="border rounded-lg" style={{ width: 1000, height: 1000, background }}>
    </canvas>
  );
}

export default Canvas;
