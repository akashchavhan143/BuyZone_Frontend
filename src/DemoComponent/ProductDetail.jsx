import { useState } from "react";

function ProductDetail() {
  // Hardcoded product data for testing
  const product = {
    id: 1,
    title: "Sample Product",
    description: "This is a sample product description.",
    category: "Electronics",
    price: 100,
    stock: 50,
    discount: 10,
    discountedPrice: 90,
    imageNames: [
      "Designer (1).jpeg",
      "Designer (2).jpeg",
      "Designer (3).jpeg",
      "Designer (4).jpeg",
      "Designer (5).jpeg",
      "vite.svg",
    ],
  };

  // Set the first image as the default main image
  const [mainImage, setMainImage] = useState(product.imageNames[0]);

  const handleImageHover = (imageName) => {
    setMainImage(imageName);
  };

  return (
    <div className="m-5 " style={{ display: "flex" }}>
      <div className="" style={{ display: "flex", flexDirection: "column" }}>
        {product.imageNames.map((imageName, index) => (
          <div
            className="mb-3 p-1 border border-success border-3 hover-effect"
            key={index}
          >
            <img
              src={`/${imageName}`} // Update this path to the static images directory
              alt={`Thumbnail ${index}`}
              style={{ width: "100px", cursor: "pointer" }}
              onMouseEnter={() => handleImageHover(imageName)}
              onClick={() => handleImageHover(imageName)}
            />
          </div>
        ))}
      </div>
      <div style={{ marginLeft: "20px" }}>
        <img
          src={`/${mainImage}`} // Update this path to the static images directory
          alt="Main"
          style={{ width: "400px" }}
        />
        <div>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <p>Price: {product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>Discount: {product.discount}%</p>
          <p>Discounted Price: {product.discountedPrice}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
