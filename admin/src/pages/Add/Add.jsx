import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ url }) => {
  const [image, setImage] = useState([]) // multiple images
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Mens',
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  // handle multiple file select
  const onImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImage(files)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', Number(data.price))
    formData.append('category', data.category)

    // append multiple images
    image.forEach((img) => {
      formData.append('image', img)
    })

    try {
      const response = await axios.post(`${url}/api/product/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (response.data.success) {
        setData({ name: '', description: '', price: '', category: 'Mens' })
        setImage([])
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error('Upload failed!')
    }
  }

  return (
    <div>
      <div className="add">
        <div className="add-title">
          <p></p>
          <h1>Add Items</h1>
        </div>
        <hr className="navbar-bottom-line" />
      </div>

      <div className="main-add">
        <form className="flex-col" onSubmit={onSubmitHandler}>



<div className="add-image-upload flex-col">
  <p>Upload Images</p>

  <label htmlFor="image" className="upload-label">
    {image.length > 0 ? (
      <div className="image-preview-grid">
        {image.map((img, index) => (
          <img key={index} src={URL.createObjectURL(img)} alt="" />
        ))}
        <div className="add-more">
          <span>+</span>
        </div>
      </div>
    ) : (
      <img src={assets.upload_area} alt="upload" />
    )}
  </label>

  <input
    onChange={(e) => {
      const files = Array.from(e.target.files)
      setImage((prev) => [...prev, ...files]) // append new images
    }}
    type="file"
    id="image"
    hidden
    multiple
    required={image.length === 0} // require only if no images
  />
</div>


          <div className="add-product-name flex-col">
            <p>Product name</p>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              name="name"
              placeholder="Type Here"
              required
            />
          </div>

          <div className="add-product-description">
            <p>Product description</p>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              name="description"
              rows="6"
              placeholder="Write Content Here"
              required
            ></textarea>
          </div>

          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product Category</p>
              <select onChange={onChangeHandler} name="category">
                <option value="Mens">Mens</option>
                <option value="Women">Women</option>
                <option value="Shoes">Shoes</option>
                <option value="Watch">Watch</option>
              </select>
            </div>

            <div className="add-price flex-col">
              <p>Product Price</p>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="number"
                name="price"
                placeholder="Add Price"
                autoComplete="off"
              />
            </div>
          </div>

          <button type="submit" className="add-btn">
            ADD
          </button>
        </form>
      </div>
    </div>
  )
}

export default Add
