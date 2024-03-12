import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Profile from './pages/Profile';
import ProductView from './pages/ProductView';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import Order from './pages/Order';
import UpdateUserAdmin from './pages/UpdateUserAdmin';

import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';

// ReactJS is a single page application (SPA)
// Whenever a link is clicked, it functions as if the page is being reloaded but what it actually does is it goes through the process of rendering, mounting, rerendering and unmounting components
// When a link is clicked, React JS changes the URL of the application to mirror how HTML accesses its URLS
// It renders the component executing the function component and it's expressions
// After rendering, it mounts the component displaying the elements
// Whenever a state is updated or changes are made with ReactJS, it rerenders the component
// Lastly, when a different page is loaded, it unmounts the component and repeats this process
// The updating of the user interface closely mirrors that of how HTML deals with page navigation with the exception that React JS does not reload the whole page 
function App() {
  // State hook for the user state that's defined here for a global scope
  // Initialized as an object with properties from the localStorage
  // This will be used to store the user information and will be used for validating if a user is logged in on the app or not
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  // Function for clearing localStorage on logout
  const unsetUser = () => {
      localStorage.clear();
  }

  // Used to check if the user information is properly stored upon login and the localStorage information is cleared upon logout
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      
      if(typeof data.user !== "undefined"){
        
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        });
      } else {
        setUser({
          id: null,
          isAdmin: null
        })
      }
    })
  }, [])

  return (
    // The 'BrowserRouter (Router)' component will enable us to simpulate pag navigation by synchronizing the shown content and the shown URL in the web browser.
    // Storing information in a context object is done by providing the information ussing the corresponding "Provider" component and passing the information via the "value" prop
    // All the information provided to the Provider component can be accessed later on from the context object as properties
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Container fluid>
            <AppNavbar />
            {/*The "Routes" component holds all our Route components. It selects which 'Route' component to show based on the URL endpoint.*/}
            <Routes>
                <Route path="/home" element={<Home />}/>
                <Route path="/products" element={<Products />}/>
                <Route path="/products/:productId" element={<ProductView />}/>
                <Route path="/update" element={<UpdateUserAdmin />}/>
                <Route path="/cart" element={<Cart />}/>
                <Route path="/orders" element={<Order />}/>
                <Route path="/" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/addProduct" element={<AddProduct />}/>
                <Route path="/logout" element={<Logout />}/>
                <Route path="*" element={<Error />}/>
            </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;