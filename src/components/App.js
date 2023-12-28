import { useState } from "react";
import  Logo from "./Logo";
import Form  from "./Form";
import  PackingList  from "./PackingList";
import  Stats  from "./Stats";

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

export default App;
