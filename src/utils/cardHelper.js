// src/utils/cartHelper.js

const CART_KEY = "guest_cart";

// ✅ Custom event for same-tab updates
const fireCartEvent = () => {
  window.dispatchEvent(new Event("cartUpdated"));
};

// ✅ Get cart
export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (err) {
    return [err];
  }
};

// ✅ Save cart
export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  fireCartEvent();
};

// ✅ Get total cart count
export const getCartCount = () => {
  return getCart().reduce((acc, item) => acc + (item.qty || 0), 0);
};

// ✅ Get qty of a product
export const getProductQty = (productId) => {
  const cart = getCart();
  const item = cart.find((i) => i.productId === productId);
  return item ? item.qty : 0;
};

// ✅ Add to cart (increase if already exists)
export const addToCart = (product) => {
  if (!product?._id) return;

  const cart = getCart();
  const index = cart.findIndex((i) => i.productId === product._id);

  if (index > -1) {
    cart[index].qty += 1;
  } else {
    cart.push({
      productId: product._id,
      name: product.name,
      price: Number(product.price) || 0,
      image: product.image || "",
      qty: 1,
    });
  }

  saveCart(cart);
};

// ✅ Update qty
export const updateQty = (productId, qty) => {
  const cart = getCart();

  const updated = cart
    .map((item) => {
      if (item.productId === productId) {
        return { ...item, qty: Number(qty) };
      }
      return item;
    })
    .filter((item) => item.qty > 0);

  saveCart(updated);
};

// ✅ Remove item
export const removeItem = (productId) => {
  const cart = getCart();
  const updated = cart.filter((i) => i.productId !== productId);
  saveCart(updated);
};

// ✅ Clear cart
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  fireCartEvent();
};