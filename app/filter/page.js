"use client";

import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

const Filter = () => {
  const [text, setText] = useState("hello people of the world");

  return (
    <div id="container" className="mt-20">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .changeDelay(30)
            .typeString(
              "<p> sample test are created to show what it is capable of </p><pre class='p-3 text-white bg-gray-700 m-3 rounded-lg'><code>let channel = 'youtebe' \n function create(){\n console.log('create') \n }"
            )
            .callFunction(() => {
              console.log("String typed out!");
            })
            .start();
        }}
      />
    </div>
  );
};

export default Filter;
