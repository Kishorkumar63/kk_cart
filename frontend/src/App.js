import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Header from "./components/layouts/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {HelmetProvider} from "react-helmet-async"
import {ToastContainer} from "react-toastify"
import ProductDetail from "./components/Product/ProductDeatils";


function App() {
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
        <Header />
        <div className="container conatiner-fluid">
        <ToastContainer theme="dark"/>
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail/>}></Route>
        </Routes>

        </div>
       
        <Footer />

        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
