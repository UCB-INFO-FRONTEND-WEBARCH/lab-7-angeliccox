import { useState, useMemo, useCallback } from "react";
import { products as initialProducts } from "./data";
import ProductTable from "./ProductTable";

function ProductDashboard() {
  const [filterText, setFilterText] = useState("");
  const [category, setCategory] = useState("all");
  const [items, setItems] = useState(initialProducts);
  const [showHelp, setShowHelp] = useState(false);

  console.log("Dashboard render");

  // TODO 1: COMPLETE
  const filteredProducts = useMemo(() => {
    console.log("Filtering products...");
    return items
      .filter((p) =>
        p.name.toLowerCase().includes(filterText.toLowerCase())
      )
      .filter((p) =>
        category === "all" ? true : p.category === category
      );
  }, [items, filterText, category]);

  // TODO 2: COMPLETE
  const totalPrice = useMemo(() => {
    console.log("Computing total price...");
    return filteredProducts.reduce((sum, p) => {
      // Artificial heavy computation
      let fake = 0;
      for (let i = 0; i < 5000; i++) {
        fake += Math.sqrt(p.price) * Math.random();
      }
      return sum + p.price;
    }, 0);
  }, [filteredProducts]);

  // TODO 3
  const handleToggleFavorite = useCallback((id) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, favorite: !p.favorite } : p
      )
    );
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Dashboard</h1>

      <button
        onClick={() => setShowHelp((prev) => !prev)}
        style={{ marginBottom: "8px" }}
      >
        Toggle Help
      </button>
      {showHelp && (
        <p style={{ marginBottom: "16px" }}>
          This is a help text.
        </p>
      )}

      <div style={{ marginBottom: "16px" }}>
        <input
          placeholder="Search…"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{ marginRight: "12px" }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="book">Book</option>
          <option value="device">Device</option>
          <option value="etc">Etc</option>
        </select>
      </div>

      <p>Showing {filteredProducts.length} items</p>
      <p>Total price: {totalPrice.toFixed(2)}</p>

      <ProductTable
        products={filteredProducts}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}

export default ProductDashboard;