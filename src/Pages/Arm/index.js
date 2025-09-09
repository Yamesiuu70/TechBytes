import React, { useEffect, useState } from "react";
import "./style.css";  // ✅ your custom styles

const ArmList = () => {
  const [arms, setArms] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👤 Temporary: hardcode a userId (replace later with logged-in user)
  const userId = "68bbfc3eabfa1a175edb147e";

  // ✅ Function to add a product to the cart
  const addToCart = async (productId) => {
    try {
      const res = await fetch("http://localhost:8000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Added to cart!");
      } else {
        alert("❌ Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // ✅ Fetch products when component loads
  useEffect(() => {
    const fetchArms = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/arm");
        const data = await res.json();
        setArms(data);
      } catch (error) {
        console.error("Error fetching arm products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArms();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="arm-container">
      <h2 className="arm-title">Arm Prosthetics</h2>
      <div className="arm-grid">
        {arms.map((product) => (
          <div key={product._id} className="arm-card">
            <img src={product.photo} alt={product.name} className="arm-image" />
            <h3 className="arm-name">{product.name}</h3>
            <p className="arm-price">${product.price}</p>
            <p className="arm-details">{product.details}</p>
            <button
              className="arm-btn"
              onClick={() => addToCart(product.id)}  // ✅ connect button
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArmList;
