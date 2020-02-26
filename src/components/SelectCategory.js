import React, { useState, useEffect } from "react";

const SelectCategory = ({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
  hideComponent,
  updateCategory,
  time
}) => {
  const [input, setInput] = useState("");
  const [matchedCategories, setMatchedCategories] = useState([]);

  useEffect(() => {
    setMatchedCategories(categories);
    if (selectedCategory !== null && selectedCategory.name) {
      setInput(selectedCategory.name);
    }
  }, [categories, selectedCategory]);

  const showOnChange = e => {
    setInput(e.target.value);
    const filteredCategories = categories.filter(category => {
      return category.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setMatchedCategories(filteredCategories);
  };

  const createNewCategory = () => {
    const randomNumber = () => {
      return parseInt(Math.floor(Math.random() * 360));
    };
    const newCategory = {
      name: input,
      id: new Date().getUTCMilliseconds(),
      color: `hsl(${randomNumber()}, 60%, 75%)`,
      blocks: 1
    };
    setCategories([...categories, newCategory]);
    setSelectedCategory(newCategory);
    hideComponent(false);
  };

  const checkNewCategory = () => {
    if (input) {
      const matchedCategory = categories.filter(
        category => category.name.toLowerCase() === input.toLowerCase()
      );
      if (matchedCategory.length === 1) {
        return;
      } else {
        return (
          <li key={input.toLowerCase()} onClick={createNewCategory}>
            Create a new category "{input}"
          </li>
        );
      }
    } else {
      return;
    }
  };

  const handleCategoryClick = category => {
    hideComponent(false);
    if (selectedCategory !== null) {
      updateCategory(selectedCategory.id, -1, time);
      updateCategory(category.id, +1, time);
      setSelectedCategory(category);
    } else {
      setSelectedCategory(category);
      updateCategory(category.id, +1, time);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={e => showOnChange(e)}
        autoFocus={true}
      />
      <ul className="matched-categories">
        {matchedCategories.map(category => {
          return (
            <li key={category.id} onClick={() => handleCategoryClick(category)}>
              {category.name}
            </li>
          );
        })}
        <>{checkNewCategory()}</>
      </ul>
    </div>
  );
};

export default SelectCategory;
