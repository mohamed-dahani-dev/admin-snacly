/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import "./List.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const List = ({url}) => {

  const [list, setList] = useState([]);

  // get all data from backend
  const fetchList = async () => {
    const response = await axios.get(`${url}/food`);
    if (response.data.success) {
      setList(response.data.data);
    }
  };

  // delete food from list and backend
  const deleteFood = async (foodId) => {
    const response = await axios.post(`${url}/food/delete`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.errorMessage);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <h3>All Food List</h3>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}$</p>
              <span
                onClick={() => deleteFood(item._id)}
                className="icon-close"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
