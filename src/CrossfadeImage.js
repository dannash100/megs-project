import React, { useState, useEffect } from "react";
import { useTransition, animated, config } from "react-spring";
import images from "./images";

const imageList = images.map((image, i) => ({ id: i, src: image }));

const CrossfadeImage = ({ i, on }) => {
  const [index, set] = useState(i);
  const transitions = useTransition(imageList[index], (item) => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  });
  useEffect(() => {
    setTimeout(() => {});
    setInterval(() => set(Math.floor(Math.random() * imageList.length)), 8000);
  }, []);
  return on ? (
    transitions.map(({ item, props, key }) => {
      return (
        <animated.img
          key={key}
          className="image"
          src={item.src}
          style={{ ...props }}
        />
      );
    })
  ) : (
    <img className="image" src={images[i]} />
  );
};

export default CrossfadeImage;
