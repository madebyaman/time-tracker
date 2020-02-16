import React, { useState } from "react";
import Blocks from "./components/Blocks";
import { Router } from "@reach/router";
import Chart from "./components/Chart";

const Navigation = () => {
  const [categories, setCategories] = useState([
    {
      name: "Sleep",
      id: "f2uojasd",
      color: "#FEB2B2",
      blocks: 20
      // To do: Blocks should keep an account of
      // 1. Date
      // 2. Time slots
      // 3. Total blocks for that day
    },
    {
      name: "Rest",
      id: "s09238ir",
      color: "#FBD38D",
      blocks: 12
    },
    {
      name: "Coding",
      id: "uojifo8",
      color: "#FAF089",
      blocks: 8
    },
    {
      name: "Study",
      id: "2930ruj",
      color: "#9AE6B4",
      blocks: 24
    }
  ]);
  const updateCategory = (index, val) => {
    const unMatchedCategories = categories.filter(
      category => category.id !== index
    );
    const matchedCategory = categories.filter(
      category => category.id === index
    );
    if (matchedCategory.length > 0 && unMatchedCategories.length > 0) {
      matchedCategory[0].blocks += val;
      setCategories([...unMatchedCategories, ...matchedCategory]);
    }
  };

  return (
    <Router>
      <Blocks
        path="/"
        categories={categories}
        setCategories={setCategories}
        updateCategory={updateCategory}
      />
      <Chart path="analytics" categories={categories} />
    </Router>
  );
};

export default Navigation;
