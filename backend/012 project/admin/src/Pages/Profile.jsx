import React, { useEffect, useState, CSSProperties } from "react";
import { RiFacebookFill } from "react-icons/ri";
import { CiInstagram } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%, -50%)'
};

function Profile() {
  const nav = useNavigate();

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");



  const [show, setShow] = useState(false);

  const [admin, setAdmin] = useState({});
  const [imgPre, setImgPre] = useState({});
  const [sentOtp, setSentOtp] = useState(false);
  const [otpBtnText, setOtpBtnText] = useState('Genrate OTP')

  useEffect(() => {
    const adminData = JSON.parse(Cookies.get('admin_109'));
    console.log(adminData);
    setAdmin(adminData);

  }, []);

  const handlePreview = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setImgPre({ ...imgPre, [e.target.name]: reader.result });
    }
  };

  const handleUpdateAdmin = (e) => {
    e.preventDefault();

    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/admin/update-admin/${admin._id}`, e.target)
      .then((response) => {
        console.log(response.data);

        let timerInterval;
        Swal.fire({
          title: "Admin updated",
          html: "You will be logged out in <b></b> milliseconds.",
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
          Cookies.remove('admin_109');
          nav('/');

        });
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handleGenrateOtp = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_API_URL}/api/admin-panel/admin/genrate-otp`, { email: admin.email })
      .then((response) => {
        console.log(response.data);
        setLoading(false);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "OTP has been sent to current email",
          showConfirmButton: false,
          timer: 600
        });

        setSentOtp(true)

        let counter = 120;

        setOtpBtnText(`Regenrate OTP in ${counter}s`);

        const timeIntervel = setInterval(() => {
          counter--;
          setOtpBtnText(`Regenrate OTP in ${counter}s`);

          if (counter < 1) {
            clearInterval(timeIntervel);
            setOtpBtnText('Genrate OTP');
            setSentOtp(false)
          }
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });

  };

  const handleUpdateEmail = ()=>{
    axios.post(`${process.env.REACT_APP_API_URL}/api/admin-panel/admin/update-email`, admin)
    .then((response)=>{
      console.log(response.data);
      let timerInterval;
      Swal.fire({
        title: "Email updated",
        html: "You will be logged out in <b></b> milliseconds.",
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
        Cookies.remove('admin_109');
        nav('/');

      });
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  return (
    <div>
      <div className={`w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.6)] fixed top-0 left-0` } 
      style={{
        display: (!loading) ? 'none' : 'block'
      }}
      ></div>
      <div className="w-[90%] mx-auto mt-[140px] mb-[20px] bg-white border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Profile
        </span>
        <div className="w-full grid grid-cols-[2fr_2fr]">
          <div className="p-[10px]">
            <form method="post" onSubmit={handleUpdateAdmin}>
              <div className="w-full ">
                <span className="block m-[15px_0]">Name</span>
                <input
                  type="text"
                  value={admin.name}
                  name="name"
                  onChange={(e) => { setAdmin({ ...admin, name: e.target.value }) }}
                  className="w-full border h-[35px] rounded-[5px] p-2 input"
                />
              </div>
              <div className="w-full ">
                <span className="block m-[15px_0]">Social Link</span>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <RiFacebookFill />
                  </span>
                  <input
                    type="text"
                    value={admin.fb}
                    name="fb"
                    onChange={(e) => { setAdmin({ ...admin, fb: e.target.value }) }}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <CiInstagram />
                  </span>
                  <input
                    type="text"
                    value={admin.insta}
                    name="insta"
                    onChange={(e) => { setAdmin({ ...admin, insta: e.target.value }) }}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <FaYoutube />
                  </span>
                  <input
                    type="text"
                    value={admin.youtube}
                    name="youtube"
                    onChange={(e) => { setAdmin({ ...admin, youtube: e.target.value }) }}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <FaXTwitter />
                  </span>
                  <input
                    type="text"
                    value={admin.twitter}
                    name="twitter"
                    onChange={(e) => { setAdmin({ ...admin, twitter: e.target.value }) }}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Logo</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img src={imgPre.logo || admin.logo} alt="Logo" className="w-full h-full" />
                </div>
                <input
                  type="file"
                  name="logo"
                  className="input border w-full m-[10px_0] category"
                  onChange={handlePreview}
                />
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Fav Icon</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img
                    alt="Favicon"
                    className="w-full h-full"
                    src={imgPre.favicon || admin.favicon}
                  />
                </div>
                <input
                  type="file"
                  name="favicon"
                  className="input border w-full m-[10px_0] category"
                  onChange={handlePreview}
                />
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Footer Logo</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img
                    src={imgPre.footer_icon || admin.footer_icon}
                    alt="Footer_icon"
                    className="w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  name="footer_icon"
                  className="input border w-full m-[10px_0] category"
                  onChange={handlePreview}
                />
              </div>
              <div className="w-full my-[20px] relative ">
                <span className="block m-[15px_0]">Password</span>
                <input
                  type={show === false ? "password" : "text"}
                  value={admin.password}
                  name="password"
                  onChange={(e) => { setAdmin({ ...admin, password: e.target.value }) }}
                  className="w-full border h-[35px] rounded-[5px] p-2 input"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-[20px] bottom-[10px] cursor-pointer text-[#303640]"
                >
                  {show === false ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <div className="flex flex-col justify-center p-[10px] box-border items-center gap-[10px] h-[400px]">
                <div className="border border-slate-300 w-[200px] h-[200px] rounded-[50%] object-contain">
                  <img
                    src={imgPre.thumbnail || admin.thumbnail}
                    alt="profile img"
                    className="w-full h-full rounded-[50%]"
                  />
                </div>
                <div>
                  <input
                    type='file'
                    onChange={handlePreview}
                    name="thumbnail"

                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
              </div>
              <button type="submit" className="w-[150px] h-[40px] rounded-md text-white bg-[#5351c9] my-[30px]">
                Update
              </button>
            </form>
          </div>

        </div>
      </div>
      <div className="mb-[80px] w-[90%] mx-auto border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Update Email
        </span>
        <div className="w-full p-[30px]">
          <form method="post">
            <div className="w-full mb-[10px]">
              <span className="block m-[15px_0]">Current Email</span>
              <input
                type="email"
                value={admin.email}
                readOnly
                name="email"
                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
            </div>
            <button
              type="button"
              onClick={handleGenrateOtp}
              disabled={sentOtp}
              className={`px-3 h-[40px] ${(sentOtp) ? 'bg-blue-300' : 'bg-blue-600'} rounded-md text-white  my-[30px]`}>
              {otpBtnText}
            </button>
            <div className="w-full mb-[10px]" style={
              {
                display: (sentOtp) ? '' : 'none'
              }
            }>
              <input
                type="text"
                placeholder="Enter OTP"
                name='otp'
                value={admin.otp}
                onChange={(e)=>{setAdmin({...admin, otp:e.target.value})}}
                className="w-full border h-[35px] rounded-[5px] p-2 input my-2"
              />
              <input
                type="text"
                placeholder="Enter new email"
                name='newemail'
                value={admin.newemail}
                onChange={(e)=>{setAdmin({...admin, newemail:e.target.value})}}
                className="w-full border h-[35px] rounded-[5px] p-2 input my-2"
              />

              <button

                type="button"
                onClick={handleUpdateEmail}
                className={`w-[150px] block h-[40px] rounded-md text-white bg-[#5351c9]  my-[30px]`}>
                Update Email
              </button>
            </div>

            <ClipLoader
              color={color}
              loading={loading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
              // style={{
              //   position:'fixed',
              //   top:'50%',
              //   left:'50%',
              //   transform:'translate(-50%, -50%)'
              // }}
            />

          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
