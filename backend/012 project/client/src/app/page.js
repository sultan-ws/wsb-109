"use client"
import React, { useEffect } from "react";
import Banner from "./HomeComponents/Banner";
import FeaturedCategories from "./HomeComponents/FeaturedCategories";
import ThisJustIn from "./HomeComponents/ThisJustIn";
import ProductReview from "./HomeComponents/ProductReview";
import BetterLiving from "./HomeComponents/BetterLiving";
import TextSlider from "./common/TextSlider";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./redux/slices/productSlice";



export default function Home() {
  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   console.log('home loaded');
  //   dispatch(fetchProducts());
  // },[dispatch]);
  return (
    <>
    {/* <TextSlider/> */}
    <Banner/>
    <FeaturedCategories/>
    {/* <ThisJustIn/> */}
    <ProductReview/>
    <BetterLiving/>
    </>
  );
}
