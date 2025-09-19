import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./style.css";

const ArmList = () => {
  const [arms, setArms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  // Add product to cart
  const addToCart = async (productId) => {
    if (!userInfo) {
      alert("❌ You must be logged in to add items to cart!");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ send JWT cookie
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("✅ Added to cart!");
      } else {
        alert(`❌ Failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("❌ Error adding to cart. See console.");
    }
  };

  // Debug login info
  const testLoginStatus = () => {
    if (!userInfo) {
      alert("User is NOT logged in");
      console.log("User is NOT logged in");
    } else {
      alert(`User is logged in as ${userInfo.name || userInfo.id}`);
      console.log("User is logged in:", userInfo);
    }
  };

  // Fetch arm products
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

      <button onClick={testLoginStatus}>Test Login Status</button>

      <div className="arm-grid">
        {arms.map((product) => (
          <div key={product.id} className="arm-card">
            <img src={product.photo} alt={product.name} className="arm-image" />

            <h3
              className="arm-name"
              style={{ cursor: "pointer", color: "#007bff" }}
              onClick={() => navigate(`/product/arms/${product.id}`)}
            >
              {product.name}
            </h3>

            <p className="arm-price">${product.price}</p>
            <p className="arm-details">{product.details}</p>
            <button className="arm-btn" onClick={() => addToCart(product.id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArmList;
