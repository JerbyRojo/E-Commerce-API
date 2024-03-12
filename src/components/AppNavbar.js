// React Bootstrap Components
/*
	- Syntax
		- import moduleName from 'filePath'
*/
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { Link, NavLink } from 'react-router-dom';
import { useState, useContext } from 'react';
import UserContext from '../UserContext';

export default function AppNavbar(){
	// State to store the user information stored in the login page.
	// const [user, setUser] = useState(localStorage.getItem("token"));
	// checking if we received the login token
	// console.log(user); 
	const { user } = useContext(UserContext);

	return (
		<Navbar sticky="top" bg="light" expand="lg">
			<Container fluid>
				<Navbar.Brand as={Link} to="/home">B384</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{/*The 'as' prop allows components to be treated as if they are different component gaining access to it's properties and functionalities*/}
						{/*The "to" prop is use in place of the "href" prop for providing the URL for the page.*/}
						{/*The "exect" prop is used to highlight the active NavLink component that matches the URL*/}
						
						<Nav.Link as={NavLink} to="/home" exact="true">Home</Nav.Link>
						
						{(user.id !== null) ? 

							user.isAdmin 
							?
							<>
								<Nav.Link as={Link} to="/products">Products</Nav.Link>
								<Nav.Link as={Link} to="/update">Actions</Nav.Link>
								<Nav.Link as={Link} to="/orders">Orders</Nav.Link>
								<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
							</>
							:
							<>
								<Nav.Link as={NavLink} to="/products">Shop</Nav.Link>
								<Nav.Link as={NavLink} to="/cart">Carts</Nav.Link>
								<Nav.Link as={Link} to="/orders">Orders</Nav.Link>
								<Nav.Link as={Link} to="/profile">Profile</Nav.Link>
								<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
							</>
						: 
							<>
								<Nav.Link as={Link} to="/products">Products</Nav.Link>
								<Nav.Link as={Link} to="/">Register</Nav.Link>
								<Nav.Link as={Link} to="/login">Login</Nav.Link>
							</>
							}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}