"use client"
import { BsArrowLeft } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCart, fetchCart, updateCart } from "@/app/redux/slices/cartSlice";
import Cookies from "js-cookie";

export default function Cart({cartStatus,setCartStatus}) {

  const cartData = useSelector((state)=> state.cart.value);


  const [cartProducts, setCartProducts] = useState([]);
  const [filepath, setFilepath] = useState('');
  const [cartLength, setCartLength] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(()=>{
   if(cartData.data) setCartProducts(cartData.data);
   if(cartData.filepath) setFilepath(cartData.filepath);

   if(cartData.data) setCartLength(cartData.data.length);
  if(cartData.data) {
    let sum = 0;
    cartData.data.forEach((item) => {
      sum += item.quentity * item.product.price
    });

    setTotalPrice(sum);
  }
  
    console.log('cartData ======>',cartData)
  },[cartData]);


  const childFunction = ()=>{
    console.log('child funciton called');
  }

 

  return (
    <>
    <section className={`${cartStatus ? "opacity-100 visible" : "opacity-0 invisible"} duration-500`}>
    <div className="bg-[rgba(0,0,0,0.6)] border border-red-700 fixed top-0 z-[9999999] w-full min-h-screen">
      <div className='lg:w-[38%] w-full  fixed top-0 right-0 z-[999999] bg-white'>
        <div onClick={setCartStatus} className='py-3 px-6 flex items-center gap-2 bg-[#F9F9F9] cursor-pointer'>
          <BsArrowLeft className='font-bold' />
          <div className='text-sm font-semibold'>Contine Shopping</div>
        </div>
        <div className=' bg-black text-white text-[12px] text-center font-bold py-1.5'>Free shipping on orders $99+ and free returns</div>
        <div className='md:px-8 px-4 lg:h-screen h-full overflow-y-scroll pb-[220px]'>
          {
            cartProducts.map((cartItem, index)=>(
              <CartProducts key={index} product={cartItem} filepath={filepath} />
            ))
          }
         
        </div>
        <div className="sticky bottom-0 px-8 bg-[#f9f9f9] py-4">
          <div className="flex items-center justify-between">
          <div className="text-[18px] font-semibold">Subtotal <span className="text-[14px] font-semibold text-customGray">({cartLength} items)</span></div>
          <div className="text-[18px] font-semibold">₹ {totalPrice}</div>
          </div>
          <Link href="/checkouts">
          <button className="text-[20px] hover:shadow-[5px_5px_0px_0px_#DDD] font-semibold flex justify-center items-center gap-2 text-white bg-black p-3 w-full mt-5">Secure Checkout <IoLockClosedOutline size={20} /></button>
          </Link>
        </div>
        <div>
        </div>
      </div>
      </div>
      </section>
      </>
  )
}

function CartProducts({product, filepath}) {

  const [quantity, setQuantity] = useState(null);

  useEffect(()=>{setQuantity(product.quentity)},[product]);
  
  const dispatch = useDispatch();

  const updateCartData = (e)=>{
    const cookiedata = Cookies.get('frank_user_109');
    if(!cookiedata) return alert('Please log in');
    const {_id} = JSON.parse(cookiedata);

    console.log('update cart data called', e.target.value, e.target.textContent, quantity);


    if(quantity === 1 && e.target.textContent === '-'){
      dispatch(deleteCart(e.target.value));
      dispatch(fetchCart(_id));   
      
      return
    }

    const newQuentity = (e.target.textContent === '+') ? (quantity + 1) : (quantity - 1);
    setQuantity(newQuentity);

    console.log({_id: e.target.value, newQuentity })
    dispatch(updateCart({_id: e.target.value, newQuentity }));
    dispatch(fetchCart(_id)); 

  }

  return (
    <div className='grid grid-cols-[25%_auto] gap-3 py-5 border-b border-customBorder'>
            <img className='w-full' src={filepath + product.product.thumbnail} alt="" />
            <div className='flex flex-col justify-between'>
              <div>
                <div className='flex items-center justify-between'>
                <h5 className='text-sm font-semibold'>{product.product.name}</h5>
                <MdClose size={20} />
                </div>
                <div className='font-semibold text-[12px] text-customGray'>Size: {product.size.name}</div>
                <div className='text-[12px] mt-1.5 text-customGray font-medium flex items-center gap-1 underline underline-offset-2'>Move to Wishlist <CiHeart size={16} /></div>
              </div>
              <div className='flex items-center justify-between'>
                <div className=''>
                  <button className='px-2.5 py-0.5 text--[20px] border border-customBorder' value={product._id} onClick={updateCartData}>-</button>
                  <button className='px-2.5 py-0.5 border border-customBorder'>{quantity}</button>
                  <button className='px-2.5 py-0.5 text--[20px] border border-customBorder' value={product._id} onClick={updateCartData}>+</button>
                </div>
                <div className='text-[15px] font-semibold'>₹ {product.product.price}</div>
              </div>
            </div>
          </div>
  )
}
