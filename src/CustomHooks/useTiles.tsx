import { useState } from "react"
import { createContainer } from "unstated-next"

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

import geologyFirst from "../Tiles/geology_1.png";
import geologySecond from "../Tiles/geology_2.png";
import geologyThird from "../Tiles/geology_3.png";
import geologyFourth from "../Tiles/geology_4.png";
import geologyFifth from "../Tiles/geology_5.png";
import geologySixth from "../Tiles/geology_6.png";


const TILES = [zero, one, second, third, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, forteen, fifteen, sixteen, seventeen];
const GEOLOGY_TILES = [geologyFirst, geologySecond, geologyThird, geologyFourth, geologyFifth, geologySixth];

function useTiles(initialTiles : string[] = TILES ) {
  const [tiles, setTiles] = useState<string[]>(initialTiles)
  
  function reset() {
    setTiles([]);
  }

  function addTile(tile: string) {
    const tilesCopy = tiles.slice();
    tilesCopy.push(tile);

    setTiles(tilesCopy);
  }

  function addTiles(tiles: string[]) {
    const tilesCopy = tiles.slice();
    setTiles(tilesCopy.concat(tiles));
  }

  function setTileFromTheme(theme: string) {
    switch(theme) {
      case "geology":
        setTiles(GEOLOGY_TILES)
        return
      case "geology":
      default:
        setTiles(TILES);
        return

    }
  }

  return { tiles, reset, addTile, addTiles, setTileFromTheme }
}

export const Tiles = createContainer(useTiles);