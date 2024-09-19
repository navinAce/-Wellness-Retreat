import './Product.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const isSubscriptionActive = false; // Replace this with your actual condition

  useEffect(() => {
    if (isSubscriptionActive) {
      fetch('https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats')
        .then(response => response.json())
        .then(data => {
          setProduct(data);
          setFilteredProducts(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [isSubscriptionActive]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLocationSearch = (event) => {
    const searchLocationTerm = event.target.value.toLowerCase();
    const filtered = product.filter(pro =>
      pro.location.toLowerCase().includes(searchLocationTerm)
    );
    setFilteredProducts(filtered);
  };

  const handleTitleSearch = (event) => {
    const searchTitleTerm = event.target.value.toLowerCase();
    const filtered = product.filter(pro =>
      pro.title.toLowerCase().includes(searchTitleTerm)
    );
    setFilteredProducts(filtered);
  };

  const handleOrder = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Location"
        onChange={handleLocationSearch}
      />
      <input
        type="text"
        placeholder="Title"
        onChange={handleTitleSearch}
      />
      <div className="products-container">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map(pro => (
            <div key={pro.id} className="product-container">
              <div className="product-item">
                <img src={pro.image} alt={pro.title} />
                <h3>{pro.title}</h3>
                <p>{pro.description}</p>
                <p>Date: {formatDate(pro.date)}</p>
                <p>Location: {pro.location}</p>
                <p>Price: {pro.price}</p>
                <button onClick={() => handleOrder(pro.id)}>Place order</button>
              </div>
            </div>
          ))
        ) : (
          <p>{isSubscriptionActive ? 'Loading products...' : 'No products available.'}</p>
        )}
      </div>
    </div>
  );
};

export default Products;
