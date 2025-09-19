import React, { useEffect, useState } from 'react';
import HomeSlider from '../../components/HomeSlider';
import { LiaShippingFastSolid } from "react-icons/lia";
import './style.css';
import AdsBannerSlider from '../../components/AdsBannerSlider';
import ProductList from '../../components/ProductItem/ProductList'; // grid version
import Footer from '../../components/Footer';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/home"); // 👈 your backend endpoint
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div>
      {/* ==== Home Slider ==== */}
      <HomeSlider />

      {/* ==== Featured Section ==== */}
      <section className="featured-section">
        <div className="container">
          <div className="featured-header">
            <h2 className="featured-title">Featured Products</h2>
            <p className="featured-subtitle">
              Check & Get Your Desired Product!
            </p>
          </div>

          {/* Grid of products */}
          <div className="featured-products-box">
            <ProductList products={products} />
          </div>
        </div>
      </section>

      {/* ==== Shipping Section ==== */}
      <section className="shipping-section">
        <div className="container">
          <div className="free-shipping">
            <div className="shipping-col1">
              <LiaShippingFastSolid className="shipping-icon" />
              <span className="shipping-title">Free Shipping</span>
            </div>
            <div className="shipping-col2">
              <p className="shipping-text">Free Shipping on Special Items</p>
            </div>
            <p className="shipping-price">Order Now</p>
          </div>

          <AdsBannerSlider items={4} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
