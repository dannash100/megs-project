import React, { useState } from "react";
import "./App.css";
import CrossfadeImage from "./CrossfadeImage";

import logo from "./images/cnz_logo_png_white.png";

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
                <CrossfadeImage on={false} i={key} />
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
