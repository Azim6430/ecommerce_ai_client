import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../App";
import {
  ShoppingBag, Minus, Plus, X, CreditCard, ArrowLeft,
} from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleCheckout = () => {
    setCheckoutLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      alert("Checkout successful! (This is a demo)");
      clearCart();
      setCheckoutLoading(false);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="empty-cart">
          <ShoppingBag size={64} className="empty-cart-icon" />
          <h2>Your cart is empty</h2>
          <p>Add some products to get started</p>
          <a href="/collections" className="btn-primary">
            Browse Collections
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="cart-page">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <span className="cart-items-count">{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <div className="cart-item-img">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-brand">{item.brand}</p>
                  <p className="cart-item-size">Size: {item.size}</p>
                  <p className="cart-item-price">${item.price}</p>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal ({totalItems} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="btn-primary checkout-btn"
              onClick={handleCheckout}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? (
                <>Processing...</>
              ) : (
                <>
                  <CreditCard size={18} />
                  Checkout
                </>
              )}
            </button>
            <button className="btn-outline clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}