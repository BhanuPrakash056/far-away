export default function Stats({ items }) {
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
