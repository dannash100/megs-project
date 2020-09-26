import React, { useState, createContext, useEffect } from "react";
import CrossfadeImage from "react-crossfade-image";
import { fixedShuffleIndex } from "./utils";

import logo from "./images/cnz_logo_png_white.png";
import images from "./images";

import "./App.css";

/** Start Config */

// Crossfade settings
const crossfadeTimingFunction = "cubic-bezier(0, 0.55, 0.45, 1)";
const crossfadeDuration = 900;
const crossfadeStyles = { width: "100%", height: "100%" };

// Variations in which images will crossfade on interval
const patternVariations = 30;

// Livestream
const livestreamPositions = [
  { x: 2, y: 1 },
  { x: 0, y: 2 },
  { x: 3, y: 3 },
];

// Update time
const minDelay = 3;
const maxDelay = 6;
/** End Config */

const livestreamCodes = ["5f6417bdb19d7", "5f685b9105a1d", "5f685bd3cf2c3"];

const Crossfade = ({ src }) => (
  <CrossfadeImage
    style={crossfadeStyles}
    timingFunction={crossfadeTimingFunction}
    duration={crossfadeDuration}
    src={src}
  />
);

const Livestream = ({ code }) => (
  <div>
    <iframe
      key={code}
      title={code}
      src={`https://g3.ipcamlive.com/player/player.php?alias=${code}&autoplay=1&skin=white`}
      width="auto"
      height="100%"
      frameBorder="0"
    />
  </div>
);

const Section = ({ src, pos }) => {
  const { x, y } = pos;
  const livestreamIndex = livestreamPositions.findIndex(
    (lsPos) => lsPos.x == x && lsPos.y == y
  );
  if (livestreamIndex === -1) {
    return <Crossfade src={src} />;
  } else {
    return <Livestream code={livestreamCodes[livestreamIndex]} />;
  }
};

const lists = [...Array(patternVariations).keys()].map(() =>
  [...Array(images.length).keys()].map(() => Math.random() >= 0.5)
);

let noChangeList = lists[0];

function App() {
  const [imagez, setImages] = useState(images);

  const update = () => {
    const random = Math.round(
      Math.random() * Math.abs(maxDelay - minDelay) + minDelay
    );
    setTimeout(function () {
      setImages((oldVal) => fixedShuffleIndex(oldVal, noChangeList));
      console.log("Delayed " + random + " secs.");
      update();
    }, random * 1000);
  };

  useEffect(update, []);

  useEffect(
    () =>
      void setInterval(
        () => (noChangeList = lists[Math.floor(Math.random() * lists.length)]),
        2000
      ),
    []
  );

  return (
    <div className="App">
      <div id="container">
        <div className="row">
          <Section pos={{ x: 0, y: 0 }} src={imagez[0]} />
          <Section pos={{ x: 1, y: 0 }} src={imagez[1]} />
          <Section pos={{ x: 2, y: 0 }} src={imagez[2]} />
          <Section pos={{ x: 3, y: 0 }} src={imagez[3]} />
        </div>
        <div className="row">
          <Section pos={{ x: 0, y: 1 }} src={imagez[4]} />
          <Section pos={{ x: 1, y: 1 }} src={imagez[5]} />
          <Section pos={{ x: 2, y: 1 }} src={imagez[6]} />
          <Section pos={{ x: 3, y: 1 }} src={imagez[7]} />
        </div>
        <div className="row">
          <Section pos={{ x: 0, y: 2 }} src={imagez[8]} />
          <Section pos={{ x: 1, y: 2 }} src={imagez[9]} />
          <Section pos={{ x: 2, y: 2 }} src={imagez[10]} />
          <Section pos={{ x: 3, y: 2 }} src={imagez[11]} />
        </div>
        <div className="row">
          <Section pos={{ x: 0, y: 3 }} src={imagez[12]} />
          <Section pos={{ x: 1, y: 3 }} src={imagez[13]} />
          <Section pos={{ x: 2, y: 3 }} src={imagez[14]} />
          <Section pos={{ x: 3, y: 3 }} src={imagez[1]} />
        </div>
      </div>

      <img className="logo" src={logo} />
    </div>
  );
}

export default App;
