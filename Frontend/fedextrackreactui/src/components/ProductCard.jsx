import React from 'react'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import '../App.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const handleTrackReq = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/fedex/track', 
      {
        trackingNumber: product.trackingNumber
      });
      console.log(res);
      navigate(`/track/${product.trackingNumber}`, { state: { data: res.data } });
    } catch (error) {
      console.log("Error fetching tracking details");
      window.alert('Backend service not working');
    } finally{
      setLoading(false);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-md p-4 flex justify-around">
      <img src={product.pic} alt="" width="80px" />
      <div>
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <h2 className="text-sm font-semibold">{product.description}</h2>
      </div>
      <p className="text-gray-500">₹{product.price}</p>
      {/* <Link to={`/track/${product.trackingNumber}`} className="mt-4 text-sm bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-md">Track Order</Link> */}
      <button onClick={handleTrackReq}>Track Order</button>
      {loading && <div className="preloader"><ClipLoader color="#ffffff" size={50} /></div>}
    </div>
  )
}

export default ProductCard