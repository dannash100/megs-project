import React, { useState } from "react";
import "./App.css";
import CrossfadeImage from "./CrossfadeImage";

import logo from "./images/cnz_logo_png_white.png";


/**
 * <iframe src="https://g3.ipcamlive.com/player/player.php?alias=5f6417bdb19d7" width="800px" height="450px" 
frameborder="0" allowfullscreen></iframe>

<iframe src="https://g3.ipcamlive.com/player/player.php?alias=5f685b9105a1d" width="800px" height="450px" 
frameborder="0" allowfullscreen></iframe>

<iframe src="https://g3.ipcamlive.com/player/player.php?alias=5f685bd3cf2c3" width="800px" height="450px" 
frameborder="0" allowfullscreen></iframe>

Parameters:
- alias: alias of your camera
- skin: orange/white (orange is the default)
- autoplay=1: start video automatically (this parameter works on desktop computers only)
- mute=1: mute the audio 
- disablefullscreen=1: disable full screen button
- disablevideofit=1: disable video fit button
- timelapseplayerenabled=1: enable the Time-lapse Hub on the player
- disabledownloadbutton=1: disable time-lapse download button in time-lapse mode

Don't forget to adjust the height of the IFRAME according to the ASPECT RATIO of your camera! 
 */

export const crossfadeInterval = 8000;
const delayOptions = 4;

const delays = [...Array(delayOptions).keys()].map(
  (i) => (crossfadeInterval / delayOptions) * (i + 1)
);

const randomDelay = () => delays[Math.floor(Math.random() * delays.length)];

const get4x4Matrix = () => {
  const matrix = [];
  let count = 0;
  for (var i = 0; i < 4; i++) {
    matrix[i] = [];
    for (var j = 0; j < 4; j++) {
      matrix[i][j] = count % 14;
      count++;
    }
  }
  return matrix;
};

function App() {
  const [matrix, setMatrix] = useState(get4x4Matrix());
  return (
    <div className="App">
      <div id="container">
        {matrix.map((row) => (
          <div className="row">
            {row.map((key) => (
              <div className="box">
                <CrossfadeImage on delay={randomDelay()} startIdx={key} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <img className="logo" src={logo} />
    </div>
  );
}

export default App;
