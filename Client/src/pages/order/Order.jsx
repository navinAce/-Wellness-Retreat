import './Order.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Order() {
  const { id } = useParams(); // Extract the id from the URL
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    console.log('Retrieved ID:', id); // Log the ID to check if it's correct

    if (id) {
      fetch(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Fetch error:', err);
          setError('Failed to fetch data. Please try again later.');
          setLoading(false);
        });
    } else {
      setError('No ID provided in the URL.');
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully!');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="final-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="products1-container">
            <div className="product">
              {Array.isArray(data) ? (
                data.map(pro => (
                  <div key={pro.id} className="item">
                    <img src={pro.image} alt="Product" />
                    <h3>Title: {pro.title}</h3>
                    <p>Description: {pro.description}</p>
                    <p>Date: {pro.date}</p>
                    <p>Location: {pro.location}</p>
                    <p>Price: {pro.price}</p>
                    <p>Type: {pro.type}</p>
                    <p>Condition: {pro.condition}</p>
                    <p>Duration: {pro.duration}</p>
                  </div>
                ))
              ) : (
                <div className="item">
                  <img src={data.image} alt="Product" />
                  <h3>Title: {data.title}</h3>
                  <p>Description: {data.description}</p>
                  <p>Date: {formatDate(data.date)}</p>
                  <p>Location: {data.location}</p>
                  <p>Price: {data.price}</p>
                  <p>Type: {data.type}</p>
                  <p>Condition: {data.condition}</p>
                  <p>Duration: {data.duration}</p>
                </div>
              )}
            </div>
          </div>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
