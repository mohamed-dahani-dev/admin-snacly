/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Add.css";
import uploadImge from "../../assets/image-upload.png";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yub from "yup";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
    rating: "",
  });

  const [errorValidation, setErrorValidation] = useState("");

  // error validation style
  const errorValidationStyle = {
    marginBottom: "5px",
    color: "red",
    fontSize: "14px",
  };

  // validation
  const validationSchema = Yub.object({
    name: Yub.string()
      .trim()
      .min(3, "length must be at least 3 characters long")
      .max(255, "length must be at most 255 characters long")
      .required("The name is required"),
    description: Yub.string()
      .trim()
      .min(10, "length must be at least 10 characters long")
      .max(255, "length must be at most 255 characters long")
      .required("The description is required"),
    price: Yub.number()
      .min(0, "must be greater than or equal to 0")
      .max(9999, "must be less than or equal to 9999")
      .required("The price is required"),
    rating: Yub.number()
      .min(0, "must be greater than or equal to 0")
      .max(5, "must be less than or equal to 5")
      .required("The rating is required"),
    category: Yub.string()
      .trim()
      .min(3, "length must be at least 3 characters long")
      .max(100, "length must be at most 100 characters long")
      .required("The category is required"),
    image: Yub.string().trim().required("The image is required"),
  });

  // fill the data
  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // add data in the database
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // validation of inputs
    try {
      await validationSchema.validate(data, { abortEarly: false });
    } catch (error) {
      const newError = {};
      error.inner.forEach((err) => {
        newError[err.path] = err.message;
        setErrorValidation(newError);
      });
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("rating", Number(data.rating));
    formData.append("image", image);

    // use axios to get url from backend
    const response = await axios.post(`${url}/food/add`, formData);
    // add the data
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        category: "Salad",
        price: "",
        rating: "",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.errorMessage);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image :</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : uploadImge} alt="" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            hidden
            id="image"
          />
          {!image ? (
            <p style={errorValidationStyle}>{errorValidation.image}</p>
          ) : (
            ""
          )}
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name :</p>
          <input
            type="text"
            name="name"
            placeholder="Add Name of Product"
            onChange={onchangeHandler}
            value={data.name}
          />
          <p style={errorValidationStyle}>{errorValidation.name}</p>
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description :</p>
          <textarea
            name="description"
            id=""
            rows="6"
            placeholder="Add Description of Product"
            onChange={onchangeHandler}
            value={data.description}
          ></textarea>
          <p style={errorValidationStyle}>{errorValidation.description}</p>
        </div>
        <div className="add-category-price-rating">
          <div className="add-category flex-col">
            <p>Add Category :</p>
            <select name="category" onChange={onchangeHandler}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Add Price :</p>
            <input
              type="number"
              name="price"
              placeholder="Add Price $"
              onChange={onchangeHandler}
              value={data.price}
            />
            <p style={errorValidationStyle}>{errorValidation.price}</p>
          </div>
          <div className="add-rating flex-col">
            <p>Add Rating :</p>
            <input
              type="number"
              name="rating"
              placeholder="Add Rating"
              onChange={onchangeHandler}
              value={data.rating}
            />
            <p style={errorValidationStyle}>{errorValidation.rating}</p>
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
