import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(" http://localhost:4000/items")
      .then(r => r.json())
      .then(items => setItems(items))
  }, [])
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id)
    setItems(updatedItems)
    console.log("in shopping cart", deletedItem)
  }
  function handleUpdatedItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem
      } else {
        return item
      }
    })
    setItems(updatedItems)
    console.log("in shopping Cart", updatedItem)
  }

  function handleAddItem(newItem) {
    setItems([...items, newItem])
    console.log("in shopping list:", newItem)
  }
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdatedItem} onDeleteItem={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;