import React, { useState, useEffect } from "react";
import { useTransition, animated, config } from "react-spring";
import { crossfadeInterval } from "./App";
import images from "./images";

const imageList = images.map((image, i) => ({ id: i, src: image }));

const CrossfadeImage = ({ startIdx, on, delay, setVisible }) => {
  const [index, set] = useState(startIdx);
  const transitions = useTransition(imageList[index], (item) => item.id, {
    initial: { opacity: 1 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
    leave: ({ id }) => {
      setVisible((visible) => new Set([...visible].filter((x) => x !== id)));
    },
    enter: ({ id }) => {
      setVisible((visible) => new Set([...visible, id]));
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setInterval(() => {
        set((val) => (val + 2) % imageList.length);
      }, crossfadeInterval);
    }, delay);
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
    <img className="image" src={images[startIdx]} />
  );
};

export default CrossfadeImage;