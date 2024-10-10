import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function App() {
  const nav = useNavigate();

  const [user, setUser] = useState({});

  useEffect(()=>{
    let adminData = Cookies.get('admin_109');

    if(adminData) return nav('/dashboard');
  },[]);


 const handleLogin = ()=>{

  axios.post('http://localhost:4400/api/admin-panel/admin/login', user)
  .then((response)=>{
    console.log(response.data);

    Cookies.set('admin_109', JSON.stringify(response.data.data));

    nav('/dashboard');
  })
  .catch((error)=>{
    // alert(response.data.message)
    // if()
    alert(error.response.data.message);
  })
 }


  return (
    <div className="mx-auto my-[100px] bg-white rounded-[10px] w-[40%] h-[400px] p-[20px] border">
      <h1 className="text-[#303640] font-semibold text-[40px] mt-[30px] p-[0_10px]">
        Login
      </h1>
      <h3 className="text-[#303640c2] text-[14px] p-[0_10px] mb-[30px]">
        Sign-in to your account
      </h3>
      <form>
        <div className="w-full  grid grid-cols-[20%_auto] my-[10px]">
          <label htmlFor="name" className="py-[8px] px-[10px] text-[#303640]">
            User Name
          </label>
          <input
            name="email"
            id="name"
            type="text"
            placeholder="Enter your email"
            className="p-[10px] rounded-[5px] border input"
            onChange={(e)=>{setUser({...user, email:e.target.value})}}
          />
        </div>
        <div className="w-full  grid grid-cols-[20%_auto] my-[10px]">
          <label
            htmlFor="password"
            className="py-[8px] px-[10px] text-[#303640]"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="p-[10px] input border rounded-[5px]"
            onChange={(e)=>{setUser({...user, password:e.target.value})}}
          />
        </div>
        <div className="w-full my-[50px] flex justify-between items-center">
            <button
              type="button"
              onClick={handleLogin}
              className="w-[130px] bg-purple-600 text-white h-[40px] rounded-[5px] text-[18px] font-[400]"
            >
          
              Login
            </button>

          <Link to="/reset-password">
            <span className="text-[#5351c9] mr-[50px]">Forgot password?</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default App;
