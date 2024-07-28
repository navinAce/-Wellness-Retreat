import './singlePage.css';
import banner from '/banner.png';
import Products from '../product/Product';

const SinglePage = () => {
  return (

    <div className="single-page">
    <img src={banner} alt="Banner" />

    <div className="retreat">
      <div className="retreat-center">
      <h1>Retreats</h1>
      </div>
    </div>

    <Products/>

    

    
    </div>
    
    

  );
};

export default SinglePage;
