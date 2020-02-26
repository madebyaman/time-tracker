import React, { useState } from "react";
import Blocks from "./components/Blocks";
import { Router } from "@reach/router";
import Chart from "./components/Chart";
import moment from "moment";

// TODO
// 1. Create a selector for selecting time slots duration
// 2. Change the time duration accordingly for all blocks, if someone changes the block during any time
// 3. Make chart synchronize with it
// 4. Create categories page wiht chart and some selection to change it
// 5. Design the app

const Navigation = () => {
  const [categories, setCategories] = useState([
    {
      name: "Sleep",
      id: "f2uojasd",
      color: "#FEB2B2",
      blocks: {
        "Feb 27, 2020": {
          slots: [
            {
              from: 0,
              to: 15
            }
          ]
        }
      }
    },
    {
      name: "Rest",
      id: "s09238ir",
      color: "#FBD38D"
    },
    {
      name: "Coding",
      id: "uojifo8",
      color: "#FAF089"
    },
    {
      name: "Study",
      id: "2930ruj",
      color: "#9AE6B4"
    }
  ]);
  const updateCategory = (index, val, time) => {
    const unMatchedCategories = categories.filter(
      category => category.id !== index
    );
    const matchedCategory = categories.filter(
      category => category.id === index
    );
    if (matchedCategory.length > 0 && unMatchedCategories.length > 0) {
      const date = moment().format("ll");
      // If blocks, or date, or slots property doesn't exist in this category then create it.
      matchedCategory[0].blocks = matchedCategory[0].blocks || {};
      matchedCategory[0].blocks[`${date}`] =
        matchedCategory[0].blocks[`${date}`] || {};
      matchedCategory[0].blocks[`${date}`].slots =
        matchedCategory[0].blocks[`${date}`].slots || [];
      updateItem(matchedCategory[0].blocks[`${date}`].slots, val, time);
      setCategories([...unMatchedCategories, matchedCategory[0]]);
    }
  };

  const updateItem = (array, val, time) => {
    if (val === 1) {
      array.push(time);
    } else if (val === -1) {
      const itemToDelete = array.filter(item => item.from === time.from);
      if (itemToDelete.length > 0) {
        // 1. Delete slot from category
        array.splice(array.indexOf(itemToDelete), 1);
      }
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
