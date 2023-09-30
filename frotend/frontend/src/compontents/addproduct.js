import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [product, setProduct] = useState({
    imageUrl: "",
    productName: "",
    productPrice: "",
    productDescription: "",
    sellerPlace: "",
    quantity: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/admin/addProduct",
        product
      );
      console.log("Product added:", response.data);
      // Do something with the response if needed
    } catch (error) {
      console.error("Error adding product:", error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 bg-orange-200">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-neutral-600">
          Add Product
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className="block text-gray-700 font-bold mb-2"
            >
              Image URL:
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              required
              className="w-full shadow p-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-gray-700 font-bold mb-2"
            >
              Product Name:
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              required
              className="w-full shadow p-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="productPrice"
              className="block text-gray-700 font-bold mb-2"
            >
              Product Price:
            </label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              value={product.productPrice}
              onChange={handleChange}
              required
              className="w-full p-2 shadow border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-gray-700 font-bold mb-2"
            >
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
              className="w-full p-2 shadow border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="sellerPlace"
              className="block text-gray-700 font-bold mb-2"
            >
              Seller Place:
            </label>
            <input
              type="text"
              id="sellerPlace"
              name="sellerPlace"
              value={product.sellerPlace}
              onChange={handleChange}
              required
              className="w-full p-2 border shadow rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="productDescription"
              className="block text-gray-700 font-bold mb-2"
            >
              Product Description:
            </label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={product.productDescription}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded shadow focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
