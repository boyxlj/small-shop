import React, { Component, useState, useEffect } from "react";

import { Offscreen } from "react-stillness-component";
import { useOutlet, useLocation } from "react-router-dom";

const StillnessOutLets = () => {
  const [outlets, setOutlets] = useState([]);
  let location = useLocation();
  const outlet = useOutlet();
  let locationPathname = location.pathname;
  let locationKey = location.key;

  useEffect(() => {
    const result = outlets.some((o) => {
      if (o.pathname === locationPathname) {
        return true;
      }
    });

    if (!result) {
      setOutlets([
        ...outlets,
        {
          key: locationKey,
          pathname: locationPathname,
          outlet
        }
      ]);
    }
  }, [locationPathname]);

  return (
    <>
      {outlets.map((o, i) => {
        return (
          <Offscreen key={o.key} visible={locationPathname === o.pathname}>
            {o.outlet}
          </Offscreen>
        );
      })}
    </>
  );
};

export default StillnessOutLets;
