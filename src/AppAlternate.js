import React, { useState, createContext, useEffect } from "react";
import "./App.css";
// import CrossfadeImage from "./CrossfadeImage";
import CrossfadeImage from "react-crossfade-image";

import logo from "./images/cnz_logo_png_white.png";
import livestreams from "./livestreams";

import { useTransition, animated, config } from "react-spring";
import images from "./images";

const shuffle = (a) => {
  return a.reduce((l, e, i) => {
    const j = Math.floor(Math.random() * (a.length - i) + i); // j is in [i, a.length[
    [a[i], a[j]] = [a[j], a[i]];
    return a;
  }, a);
};

const fixedShuffleIndex = (a, f) => {
  const w = shuffle(
    a.reduce((acc, e, i) => {
      if (!f[i]) {
        acc.push(e);
      }
      return acc;
    }, [])
  );
  return f.reduce((acc, e, i) => {
    if (e) {
      acc.splice(i, 0, a[i]);
    }
    return acc;
  }, w);
};

/** config */
const variations = 30;
/** */

const lists = [...Array(variations).keys()].map(() =>
  [...Array(images.length).keys()].map(() => Math.random() >= 0.5)
);

let noChangeList = lists[0];

function App() {
  const [imagez, setImages] = useState(images);

  const update = () => {
    console.log(noChangeList);
    setImages((oldVal) => fixedShuffleIndex(oldVal, noChangeList));
  };

  useEffect(() => void setInterval(update, 2000), []);

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
          <CrossfadeImage
            style={{ width: "100%", height: "100%" }}
            src={imagez[0]}
          />
          <CrossfadeImage
            style={{ width: "100%", height: "100%" }}
            src={imagez[1]}
          />
          <CrossfadeImage
            style={{ width: "100%", height: "100%" }}
            src={imagez[2]}
          />
          <CrossfadeImage
            style={{ width: "100%", height: "100%" }}
            src={imagez[3]}
          />
        </div>
        <div className="row">
          <CrossfadeImage
            style={{ width: "100%", height: "100%" }}
            src={imagez[4]}
          />
          <CrossfadeImage
            style={{ width: "100%", height: "100%" }}
            src={imagez[5]}
          />
          <CrossfadeImage
            style={{ width: "100%", height: "100%" }}
            src={imagez[6]}
          />
          <CrossfadeImage
            style={{ width: "100%", height: "100%" }}
            src={imagez[7]}
          />
        </div>
        <div className="row">
          <CrossfadeImage
            style={{ width: "100%", height: "100%" }}
            src={imagez[8]}
          />
          <CrossfadeImage
            style={{ width: "100%", height: "100%" }}
            src={imagez[9]}
          />
          <CrossfadeImage
            style={{ width: "100%", height: "100%" }}
            src={imagez[10]}
          />
          <CrossfadeImage
            style={{ width: "100%", height: "100%" }}
            src={imagez[11]}
          />
        </div>
        <div className="row">
          <CrossfadeImage
            style={{ width: "100%", height: "100%" }}
            src={imagez[12]}
          />
          <CrossfadeImage
            style={{ width: "100%", height: "100%" }}
            src={imagez[13]}
          />
          <CrossfadeImage
            style={{ width: "100%", height: "100%" }}
            src={imagez[14]}
          />
          <CrossfadeImage
            style={{ width: "100%", height: "100%" }}
            src={imagez[1]}
          />
        </div>
      </div>

      <img className="logo" src={logo} />
    </div>
  );
}

export default App;
