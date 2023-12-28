import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleRemoveItem(id) {
    setItems((items) => items.filter(item => item.id !== id));
  }
  return (
    <div className="App">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList items={items} handleRemoveItem={handleRemoveItem} />
      <Stats />
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
    console.log(newItem);
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

function PackingList({ items,handleRemoveItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} handleRemoveItem={handleRemoveItem}/>
        ))}
      </ul>
    </div>
  );
}

function Item({ item,handleRemoveItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={()=>{handleRemoveItem(item.id)}}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed x </em>
    </footer>
  );
}
export default App;
