import './App.css';
import Nav from './component/Nav';
import Footer from './component/Footer';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignUp from './component/SignUp';
import PrivateComp from "./component/PrivateComp"
import Login from "./component/Login"
import AddProduct from "./component/AddProduct"
import ProductList from './component/ProductList';
import UpdateProduct from './component/UpdateProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Nav />
      <Routes>
      
      <Route element={<PrivateComp />} >
      <Route path="/" element={<ProductList />}/>
      <Route path="/add"  element={<AddProduct />}/>
      <Route path="/update/:id" element={<UpdateProduct />}/>
      <Route path="/delete" element={<h1> Delete the Product Component</h1>}/>
      <Route path="/logout" element={<h1>Logout...</h1>}/>
      <Route path="/profile" element={<h1> Profile Product Component</h1>}/>
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login"  element={<Login />} />
      </Routes>
      </BrowserRouter> 
      <Footer />
    </div>
  );
}
export default App;
