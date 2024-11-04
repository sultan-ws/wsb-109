import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import Swal from 'sweetalert2';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { BiRecycle } from "react-icons/bi";
import { IoTrashBin } from "react-icons/io5";

const ViewCategory = () => {
  let [show1, setShow1] = useState(false);
  let [show2, setShow2] = useState(false);
  let [show3, setShow3] = useState(false);
  let [show4, setShow4] = useState(false);

  const [open, setOpen] = useState(false);


  const [categories, setCategories] = useState([]);
  const [deletedCategories, setDeletedCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [ifAllchecked, setAllChecked] = useState(false);

  const handleCheckCategory = (e)=>{
    if(e.target.checked){
      setCheckedCategories([...checkedCategories, e.target.value]);
    } else{
      setCheckedCategories((pre)=>(
        pre.filter((item)=>item !== e.target.value)
      ))
    }
  };

  const handleCheckAll = (e)=>{
    setAllChecked(e.target.checked);
    if(e.target.checked){
      setCheckedCategories([...categories.map((item)=>item._id)]);
    }
    else{
      setCheckedCategories([]);
    }
  };

  useEffect(()=>{
    setAllChecked(categories.length === checkedCategories.length && checkedCategories.length !== 0);
  },[checkedCategories]);

  const fetchCategories = () => {
    axios.get('http://localhost:4400/api/admin-panel/parent-category/read-categories')
      .then((response) => {
        // console.log(response.data);
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const fetchDeletedCategories = () => {
    axios.get('http://localhost:4400/api/admin-panel/parent-category/deleted-categories')
      .then((response) => {
        console.log(response.data);
        setDeletedCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(() => { fetchCategories(); fetchDeletedCategories(); }, []);

  const handleUpdateStatus = (e) => {
    // console.log(e.target.value, e.target.textContent);
    const status = (e.target.textContent !== 'Active')

    axios.put(`http://localhost:4400/api/admin-panel/parent-category/update-status/${e.target.value}`, { status })
      .then((response) => {
        console.log(response.data);
        // fetchCategories();

        setCategories((pre) => (
          pre.map((category) => {
            if (category._id === e.target.value) {
              return { ...category, status: status }
            }
            else {
              return category
            }
          })
        ))
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleDeleteCategory = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.put(`http://localhost:4400/api/admin-panel/parent-category/delete-category/${id}`)
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            fetchCategories();
          })
          .catch((error) => {
            console.log(error);
          })


      }
    });


  };

  const handleMultiDelete = ()=>{
    console.log(checkedCategories);

    // return;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.put(`http://localhost:4400/api/admin-panel/parent-category/delete-categories`,{checkedCategories})
          .then((response) => {
            console.log(response.data);
            setCheckedCategories([]);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            fetchCategories();
          })
          .catch((error) => {
            console.log(error);
          })


      }
    });
  };

  const handleRecoverCategory = (id)=>{
    axios.put(`http://localhost:4400/api/admin-panel/parent-category/recover-category/${id}`)
      .then((response) => {
        console.log(response.data);
        setOpen(false);
        
        Swal.fire({
          title: "Category  Recovered!",
          text: "Your file has been recovered.",
          icon: "success"
        });
        fetchCategories();
       fetchDeletedCategories();
      })
      .catch((error) => {
        console.log(error);
      })
  };


  const handleDeletePermanent = (id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete(`http://localhost:4400/api/admin-panel/parent-category/permanent-delete-category/${id}`)
          .then((response) => {
            console.log(response.data);

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            fetchCategories();
          })
          .catch((error) => {
            console.log(error);
          })


      }
    });
  }

  const handleSearchCategories = (e)=>{
    console.log(e.target.value);

    if(e.target.value === '') return fetchCategories();

    axios.get(`http://localhost:4400/api/admin-panel/parent-category/search-category/${e.target.value}`)
    .then((response) => {
      console.log(response.data);

      if(response.data.data.length !== 0 ) return setCategories(response.data.data);

      Swal.fire({
        title: "No Data?",
        text: "No match category found",
        icon: "question"
      });

      fetchCategories();
      
    })
    .catch((error)=>{
      console.log(error);
    })
  };


  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="flex justify-between h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Category
        <IoTrashBin className="cursor-pointer" onClick={()=>{setOpen(true)}} />
      </span>
      
      <Modal open={open} onClose={() => setOpen(false)} center>

      
      <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button
                  className="bg-red-400 rounded-sm px-2 py-1"
                >Empty Bin</button>
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              deletedCategories.map((category, index) => (
                <tr className="border-b" key={index}>
                  <td>
                   
                  </td>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" onClick={()=>{handleDeletePermanent(category._id)}} />{" "}
                    |{" "}

                      <BiRecycle onClick={()=>{handleRecoverCategory(category._id)}} className="my-[5px] text-yellow-500 cursor-pointer inline" />

                  </td>
                </tr>
              ))
            }




          </tbody>
        </table>
      </Modal>
      <div className="w-[90%] mx-auto my-[20px]">
      <div>
        <input type="text" className="w-full p-2 my-2 border" onInput={handleSearchCategories} />
      </div>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button
                  className="bg-red-400 rounded-sm px-2 py-1"
                  onClick={handleMultiDelete}
                >Delete</button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  onClick={handleCheckAll}
                  className="accent-[#5351c9]"
                  checked={ifAllchecked}
                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map((category, index) => (
                <tr className="border-b" key={index}>
                  <td>
                    <input
                      type="checkbox"
                      name="delete"
                      id="delete1"
                      value={category._id}
                      onClick={handleCheckCategory}
                      className="accent-[#5351c9] cursor-pointer"
                      checked={checkedCategories.includes(category._id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td className="w-[200px] flex-wrap p-1">
                    {category.description}
                    <span
                      onClick={() => setShow1(!show1)}
                      className={
                        show1 === true ? "hidden" : "font-bold cursor-pointer"
                      }
                    >
                      ...Read
                    </span>
                    {show1 === false ? (
                      " "
                    ) : (
                      <span>
                        Deserunt nam est delectus itaque sint harum architecto.
                      </span>
                    )}
                  </td>
                  <td>
                    <MdDelete onClick={() => { handleDeleteCategory(category._id) }} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                    <Link to={`/dashboard/category/update-category/${category._id}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td>
                    <Tooltip id="status-tooltip" />
                    <button
                      value={category._id}
                      onClick={handleUpdateStatus}
                      data-tooltip-id="status-tooltip" data-tooltip-content={(!category.status) ? 'Click to Active' : 'Click to Inactive'}
                      className={`p-[4px_10px] rounded-sm  text-white ${(category.status) ? 'bg-green-400' : 'bg-red-400'}`}
                    >
                      {(category.status) ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                </tr>
              ))
            }




          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCategory;
