import React, { useState } from "react";
import axios from "axios";

const AddOrder = () => {
  const [formData, setFormData] = useState({
    userId: "",
    orderName: "",
    orderPrice: "",
    trackingNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
      const response = await axios.post("http://localhost:3000/fedex/addOrders", formData);
      alert("Order added successfully: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error adding order:", error);
      alert("Failed to add order.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Order Name:</label>
        <input
          type="text"
          name="orderName"
          value={formData.orderName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Order Price:</label>
        <input
          type="number"
          name="orderPrice"
          value={formData.orderPrice}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Tracking Number:</label>
        <input
          type="text"
          name="trackingNumber"
          value={formData.trackingNumber}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Order</button>
    </form>
  );
};

export default AddOrder;
