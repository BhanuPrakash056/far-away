import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleRemoveItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function removeAllItems() {
    const confirm = window.confirm(
      "Are you sure you want to remove all items?"
    );
    if (confirm) {
      setItems([]);
    }
  }
  return (
    <div className="App">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        handleRemoveItem={handleRemoveItem}
        handleToggleItem={handleToggleItem}
        removeAllItems={removeAllItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ handleAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) {
      return;
    }
    const newItem = { description, quantity, package: false, id: Date.now() };
    handleAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want for your trips ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={description}
        placeholder="Item..."
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({
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

function Item({ item, handleRemoveItem, handleToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          handleToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button
        onClick={() => {
          handleRemoveItem(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}

function Stats({ items }) {
  if (items.length === 0)
    return (
      <p className="stats">
        <em>Start Adding Items</em>
      </p>
    );
  const numItems = items.length;
  const numOfPacked = items.filter((item) => item.packed).length;
  const numOfPackedPercentage = Math.round((numOfPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {numOfPackedPercentage === 100
          ? "You are ready to go!"
          : `You have ${numItems} items on your list, and you already packed
        ${numOfPacked}(${numOfPackedPercentage}%)`}
      </em>
    </footer>
  );
}
export default App;
