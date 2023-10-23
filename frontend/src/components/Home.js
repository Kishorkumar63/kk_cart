import React, { Fragment, useEffect } from "react";
import MetaData from "./layouts/MetaData";

import { getProducts } from "../actions/productsAction"
import { useDispatch, useSelector } from "react-redux"
import Loader from "./layouts/Loader";
import Product from "./Product/Product";

import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  const dispatch = useDispatch();
  const { products, loading ,error} = useSelector((state)=>state.productsState)

  useEffect(() => {
    if(error)
    {
     return  toast.error(error,{
        position:toast.POSITION.BOTTOM_CENTER
      })
    }
  
    dispatch(getProducts)
  }, [dispatch,error])
return (
  <Fragment>

    {
      loading?<Loader/>:
 
    <Fragment>
      <MetaData title={"Buy Best Product"} />
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">


       {products && products.map(product => (
        <Product product={product}/>
          ))}
</div> 
</section>
    </Fragment>
       }
 
    </Fragment>
  );
};

export default Home;
