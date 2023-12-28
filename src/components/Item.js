export default function Item({ item, handleRemoveItem, handleToggleItem }) {
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
