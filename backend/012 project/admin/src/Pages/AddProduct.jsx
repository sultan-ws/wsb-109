import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from 'react-select'
import Swal from "sweetalert2";

const AddProduct = () => {

  const [parentCategory, setParentCategory] = useState([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState('');
  const [productCategories, setProductCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState(null);

  const fetchParentCategory = () => {
    axios.get(`http://localhost:4400/api/admin-panel/parent-category/active-category`)
      .then((response) => {
        console.log(response.data);
        setParentCategory(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const fetchProductCategories = () => {
    if (!selectedParentCategory) return;
    axios.get(`http://localhost:4400/api/admin-panel/product-category/active-categories/${selectedParentCategory}`)
      .then((response) => {
        console.log(response.data);
        setProductCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const fetchColors = () => {
    axios.get(`http://localhost:4400/api/admin-panel/colors/active-colors`)
      .then((response) => {
        console.log('colors', response.data);

        const newArr = response.data.data.map((color) => ({ ...color, value: color._id, label: color.name }));

        setColors(newArr);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const fetchSizes = () => {
    axios.get(`http://localhost:4400/api/admin-panel/sizes/active-sizes`)
      .then((response) => {
        console.log('sizes', response.data);
        const newArr = response.data.data.map((size) => ({ ...size, value: size._id, label: size.name }));
        setSizes(newArr);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    fetchParentCategory();
    fetchColors();
    fetchSizes();
  }, []);
  useEffect(() => { fetchProductCategories(); }, [selectedParentCategory]);

  const colourStyles = {
    option: (provided, state) => (
      {
        ...provided,
        color: state.data.code,
      }
    ),
    multiValue: (provided, state) => (
      {
        ...provided,
        backgroundColor: state.data.code,
      }
    ),
  }

  const handlePreview = (e) => {
    console.log(e.target.name);

    //  if(e.target.name === 'thumbnail'){
    //   const url = URL.createObjectURL(e.target.files[0]);

    //   console.log(url);
    //  }
  }

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (e.target.parent_category.value === 'default' || e.target.product_category.value === 'default') {
      Swal.fire({
        title: "Category?",
        text: "Please select parent cetegory and product category",
        icon: "question"
      });
      return;
    }

    axios.post(`http://localhost:4400/api/admin-panel/products/create-product`, e.target)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }



  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block border-b bg-[#f8f8f9] text-[#303640] text-[20px] font-bold p-[8px_16px] h-[40px] rounded-[10px_10px_0_0]">
        Product Details
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleAddProduct}>
          <div className="w-full my-[10px]">
            <label htmlFor="product_name" className="block text-[#303640]">
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              placeholder="Name"
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_desc" className="block text-[#303640]">
              Product Description
            </label>
            <textarea
              id="product_desc"
              name="product_desc"
              placeholder="Description"
              rows={3}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="product_short_desc"
              className="block text-[#303640]"
            >
              Short Description
            </label>
            <textarea
              id="product_short_desc"
              name="product_short_desc"
              placeholder="Short Description"
              rows={2}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_img" className="block text-[#303640]">
              Product Image
            </label>
            <input
              type="file"
              id="product_img"
              name="thumbnail"
              className="w-full input border rounded-[5px] my-[10px] category"
              onChange={handlePreview}
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="image_animation" className="block text-[#303640]">
              Image Animation
            </label>
            <input
              type="file"
              id="image_animation"
              name="image_animation"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_gallery" className="block text-[#303640]">
              Product Gallery
            </label>
            <input
              type="file"
              id="product_gallery"
              name="product_gallery"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px] grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="product_price" className="block text-[#303640]">
                Price
              </label>
              <input
                type="text"
                id="product_price"
                name="product_price"
                placeholder="Product Price"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
            <div>
              <label htmlFor="product_mrp" className="block text-[#303640]">
                MRP
              </label>
              <input
                type="text"
                id="product_mrp"
                name="product_mrp"
                placeholder="Product MRP"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="parent_category" className="block text-[#303640]">
              Select Parent Category
            </label>
            <select
              id="parent_category"
              name="parent_category"
              className="w-full input border p-2 rounded-[5px] my-[10px] cursor-pointer"
              onChange={(e) => { setSelectedParentCategory(e.target.value) }}
            >
              <option value="default" selected>
                --Select Parent Category--
              </option>
              {
                parentCategory.map((category) => (
                  <option value={category._id}>{category.name}</option>
                ))
              }
            </select>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_category" className="block text-[#303640]">
              Select Product Category
            </label>

            <select
              id="product_category"
              name="product_category"
              className="w-full input border p-2 rounded-[5px] my-[10px] cursor-pointer"
            >
              <option value="default" selected>
                --Select Product Category--
              </option>
              {
                productCategories.map((category) => (
                  <option value={category._id} selected>
                    {
                      category.name
                    }
                  </option>
                ))
              }
            </select>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="stock" className="block text-[#303640]">
                Manage Stock
              </label>
              <select
                name="stock"
                id="stock"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              >
                <option value="default" selected disabled hidden>
                  --Select Stock--
                </option>
                <option value={true}>In Stock</option>
                <option value={false}>Out of Stock</option>
              </select>
            </div>
            <div>
              <label htmlFor="brand" className="block text-[#303640]">
                Brand Name
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Brand"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              />
            </div>
          </div>
          {/* <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="size" className="block text-[#303640]">
                Size
              </label>
              <select
                name="size"
                id="size"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              >
                <option value="default" selected disabled hidden>
                  --Select Size--
                </option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </select>
            </div>
            <div>
              <label htmlFor="color" className="block text-[#303640]">
                Color
              </label>
              <select
                name="color"
                id="color"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              >
                <option value="default" selected disabled hidden>
                  --Select Color--
                </option>
                <option value="red">Red</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="white">White</option>
              </select>
            </div>
          </div> */}
          <div className="">
            <label htmlFor="color" className="block mb-2 text-[#303640]">
              Color
            </label>
            <Select
              name="colors"
              defaultValue={selectedColors}
              onChange={setSelectedColors}
              options={colors}
              isMulti
              styles={colourStyles}
            />
          </div>

          <div className="">
            <label htmlFor="size" className="block m-3 text-[#303640]">
              Sizes
            </label>
            <Select
              name="sizes"
              defaultValue={selectedSizes}
              onChange={setSelectedSizes}
              options={sizes}
              isMulti
            />
          </div>
          <div className="w-full my-[10px] ">
            <label htmlFor="status" className="text-[#252b36f2] mr-[30px]">
              Status
            </label>
            <input
              type="radio"
              name="status"
              id="status"
              value="0"
              className="my-[10px] mx-[20px] accent-[#5351c9]"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="status"
              value="1"
              className="my-[10px] mx-[20px] accent-[#5351c9]"
              checked
            />
            <span>Hide</span>
          </div>
          <div className="w-full p-[8px_16px] my-[30px] ">
            <button className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
