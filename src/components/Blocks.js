import React, { useState } from "react";
import Block from "./Block.js";

const Blocks = ({ categories, setCategories, updateCategory }) => {
  const [allBlocks, setAllBlocks] = useState(96);
  return (
    <div className="blocks-container">
      <div className="row">
        <div>15min</div>
        <div>30min</div>
        <div>45min</div>
        <div>60min</div>
      </div>
      <div className="nothing"></div>
      <div className="blocks">
        {Array.apply(null, Array(allBlocks)).map((block, i) => (
          <Block
            key={i}
            categories={categories}
            setCategories={setCategories}
            updateCategory={updateCategory}
          />
        ))}
      </div>
      <div className="columns">
        {Array.apply(null, Array(24)).map((hour, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
    </div>
  );
};

export default Blocks;
