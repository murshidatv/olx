import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import FirebaseContext from '../../store/FirebaseContext';
import { AuthContext } from '../../store/AuthContext';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
  });

  const { db } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'myuploadpreset'); 
    formData.append('folder', 'myimages'); 

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dshlmbnb4/image/upload',
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error.response?.data || error.message);
      throw error;
    }
  };

  const handleSubmit = async () => {
    // Basic form validation
    let formErrors = {
      name: '',
      category: '',
      price: '',
      image: '',
    };

    if (!name) formErrors.name = 'Name is required';
    if (!category) formErrors.category = 'Category is required';
    if (!price || isNaN(price)) formErrors.price = 'Please enter a valid price';
    if (!image) formErrors.image = 'Please upload an image';

    if (formErrors.name || formErrors.category || formErrors.price || formErrors.image) {
      setErrors(formErrors);
      return;
    }

    try {
      if (image && user) {
        const uploadedImageUrl = await handleImageUpload();
        setImageUrl(uploadedImageUrl);

        await addDoc(collection(db, 'products'), {
          name,
          category,
          price,
          imageUrl: uploadedImageUrl,
          createdBy: user.uid,
          createdAt: Timestamp.fromDate(new Date()),
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="input"
            type="text"
            id="name"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            className="input"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="Category"
          />
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            className="input"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="Price"
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          {image && (
            <img
              alt="Preview"
              width="200px"
              height="200px"
              src={URL.createObjectURL(image)}
            />
          )}
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
          />
          {errors.image && <span className="error">{errors.image}</span>}
        </div>

        <button onClick={handleSubmit} className="uploadBtn">
          Upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
