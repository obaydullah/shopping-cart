import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetails from "./pages/ProductDetails";
import { store } from "./app/store";
import { Provider } from "react-redux";

//Importing Private Routes
import PrivateLogin from "./privateRoutes/privateLogin";
import PrivateRegister from "./privateRoutes/PrivateRegister";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<PrivateRegister />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/login" element={<PrivateLogin />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
