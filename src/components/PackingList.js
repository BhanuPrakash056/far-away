import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  handleRemoveItem,
  handleToggleItem,
  removeAllItems,
}) {
  const [sortedBy, setSortedBy] = useState("input");
  let sortedItem;
  if (sortedBy === "input") {
    sortedItem = items;
  }
  if (sortedBy === "description") {
    sortedItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortedBy === "packed") {
    sortedItem = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Item
            item={item}
            key={item.id}
            handleRemoveItem={handleRemoveItem}
            handleToggleItem={handleToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortedBy} onChange={(e) => setSortedBy(e.target.value)}>
          <option value="input">Sort By Input By order</option>
          <option value="description">Sort By Description</option>
          <option value="packed">Sort By Packed status</option>
        </select>
        <button onClick={removeAllItems}>clear list</button>
      </div>
    </div>
  );
}
