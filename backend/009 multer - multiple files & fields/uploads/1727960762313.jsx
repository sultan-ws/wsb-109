import React, { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
          (currentPage - 1) * productsPerPage
        }`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / productsPerPage));
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
