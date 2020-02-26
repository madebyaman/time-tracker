import React, { useState, useEffect, useRef } from "react";
import SelectCategory from "./SelectCategory";
import moment from "moment";

function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef(null);
  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    } else {
      setIsComponentVisible(true);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
  return { ref, isComponentVisible, setIsComponentVisible };
}
const Block = ({ categories, setCategories, updateCategory, time }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false);

  useEffect(() => {
    // Here I need to get the time of this block and check if any category has been defined here
    const date = moment().format("ll");
    categories.filter(category => {
      if (category && category.hasOwnProperty("blocks")) {
        if (category.blocks && category.blocks.hasOwnProperty(date)) {
          if (
            category.blocks[`${date}`] &&
            category.blocks[`${date}`].hasOwnProperty("slots")
          ) {
            category.blocks[date].slots.filter(slot => {
              if (slot.from === time.from) {
                setSelectedCategory(category);
              }
            });
          }
        }
      }
    });
  }, [categories, time]);

  const showCategory = () => {
    if (selectedCategory !== null) {
      return (
        <div
          className="selected"
          style={{ backgroundColor: selectedCategory.color }}
        >
          {selectedCategory.name}
        </div>
      );
    } else {
      return <div className="unselected">Pick a category</div>;
    }
  };

  return (
    <div className="block" ref={ref}>
      {isComponentVisible ? (
        <div>
          <SelectCategory
            categories={categories}
            setCategories={setCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            hideComponent={setIsComponentVisible}
            updateCategory={updateCategory}
            time={time}
          />
        </div>
      ) : (
        <div>{showCategory()}</div>
      )}
    </div>
  );
};

export default Block;
