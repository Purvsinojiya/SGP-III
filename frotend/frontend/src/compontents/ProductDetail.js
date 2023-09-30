import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from './CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { cartState, dispatch } = useCart();

  useEffect(() => {
    // Fetch the product data based on the ID from the backend server
    fetch(`http://localhost:7000/apoo/home/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  useEffect(() => {
    // Check if the product is already in the cart and update quantity
    const cartItem = cartState.cartItems.find((item) => item.id === id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartState.cartItems, id]);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
  };

  const handleBuyNow = () => {
    setIsBuying(true);
    // Add logic to handle the purchase, e.g., redirect to a checkout page or show a modal
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const totalPrice = product.productPrice * quantity;

  return (
    <div className="max-w-md mx-auto mt-8 p-8 border shadow-md rounded-lg bg-orange-300">
      <h2 className="text-2xl font-bold mb-4">{product.productName}</h2>
      <img src={product.imageUrl} alt={product.productName} className="w-full h-64 object-cover mb-4 rounded" />
      <p className="text-lg font-bold mb-2">Price: ${product.productPrice}</p>
      <p className="mb-4">{product.productDescription}</p>
      <div className="quantity-container flex items-center mb-4">
        <button
          onClick={() => setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))}
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          -
        </button>
        <span className="mx-2">{quantity}</span>
        <button
          onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          +
        </button>
      </div>
      <p className="text-lg font-bold mb-4">Total Price: ${totalPrice}</p>
      <div className="button-container">
        <Link to="/cart">
          <button
            onClick={handleAddToCart}
            disabled={isAddedToCart}
            className={`px-4 py-2 rounded-md ${
              isAddedToCart
                ? 'bg-blue-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
            } text-white`}
          >
            {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </Link>
        <Link to='/checkout'>
        <button
          onClick={handleBuyNow}
          disabled={isBuying}
          className={`px-4 py-2 rounded-md ${
            isBuying
              ? 'bg-blue-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
          } text-white`}
        >
          {isBuying ? 'Processing...' : 'Buy Now'}
        </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;
