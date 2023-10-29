import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";

import { getProducts } from "../actions/productsAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/Loader";
import Product from "./Product/Product";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagniation from "react-js-pagination";

const Home = () => {
  const dispatch = useDispatch();
  const { products, productsCount, loading, error, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrrentPage] = useState(1);
  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }

    dispatch(getProducts(null, currentPage));
  }, [dispatch, error, currentPage]);
  const setCurrrentPageNo = (pageNo) => {
    setCurrrentPage(pageNo);
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Product"} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="d-flex justify-content-center mt-5">
              <Pagniation
                activePage={currentPage}
                onChange={setCurrrentPageNo}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
