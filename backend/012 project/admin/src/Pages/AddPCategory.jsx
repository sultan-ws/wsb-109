import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Swal = require('sweetalert2');

const AddPCategory = () => {
  const nav = useNavigate();
  const [parentCategory, setParentCategory] = useState([]);

  const fetchParentCategory = ()=>{
    axios.get(`http://localhost:4400/api/admin-panel/parent-category/active-category`)
    .then((response) => {
      console.log(response.data);
      setParentCategory(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  useEffect(()=>{fetchParentCategory()},[]);

  const handleCreateCategory = (e)=>{
    e.preventDefault();

    axios.post(`http://localhost:4400/api/admin-panel/product-category/create-category`, e.target)
    .then((response) => {
      console.log(response.data);

      let timerInterval;
      Swal.fire({
        title: "Category Created!",
        html: "You are fredirecting to view category in <b></b> milliseconds.",
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        nav('/dashboard/products/view-category');
      });
    })
    .catch((error) => {
      console.log(error);
    })


  }
  

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Add Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleCreateCategory}>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              id="categoryName"
              placeholder="Category Name"
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Category Image
            </label>
            <input
              type="file"
              name="thumbnail"
              id="categoryImg"
              className="input border w-full rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Parent Category
            </label>
            <select name="parent_category"  id="" className="border p-1 w-full rounded-[5px] my-[10px] category input">
              {
                parentCategory.map((category)=>(
                  <option value={category._id}>{category.name}</option>
                ))
              }
             
            </select>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categorySlug" className="block text-[#303640]">
              Category Slug
            </label>
            <input
              type="text"
              name="slug"
              id="categorySlug"
              placeholder="Category Slug"
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Category Description
            </label>
            <textarea
              type="file"
              name="description"
              id="categoryDesc"
              className="input border w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="is_featured"
              className=" text-[#303640] mr-[20px]"
            >
              Is Featured
            </label>
            <input
              type="radio"
              name="is_featured"
              id="is_featured"
              value={true}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Featured category</span>
            <input
              type="radio"
              name="is_featured"
              id="is_featured"
              value={false}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Not Featured category</span>
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="categoryStatus"
              className=" text-[#303640] mr-[20px]"
            >
              Status
            </label>
            <input
              type="radio"
              name="status"
              id="categoryStatus"
              value={true}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="categoryStatus"
              value={false}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[20px] ">
            <button type="submit" className="bg-[#5351c9] rounded-md text-white px-4 h-[35px]">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPCategory;

