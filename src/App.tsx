import { useEffect } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import Product from './pages/Product';
import ProductEditPage from './pages/ProductEdit';
import axios from 'axios';
import { setAppState } from './redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Link to='/product'>product</Link>
  },
  {
    path: "product",
    element: <Product />,
  },
  {
  path: "product/edit",
  element: <ProductEditPage />,
  },
]);

function App() {
  const dispatch = useDispatch()
  const values:any = useSelector(state => state)

  useEffect(()=>{
    const fetchAppConfig = async () => {
      const response = await axios(
        'https://api-test.innoloft.com//configuration/1/'
        );
        if(!values?.id) {
          dispatch(setAppState(response.data))
        }
      }

      fetchAppConfig()
      
  },[])
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
