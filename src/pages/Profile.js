import { useContext, useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ResetPassword from '../components/ResetPassword';
import UpdateProfile from '../components/UpdateProfile';

export default function Profile() {
    const { user } = useContext(UserContext);
    const [details, setDetails] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data.user !== "undefined") {
                setDetails(data.user);
            } else if (data.error === "User not found") {
                Swal.fire({
                    title: "User not found",
                    icon: "error",
                    text: "Something went wrong, kindly contact us for assistance."
                });
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Something went wrong, kindly contact us for assistance."
                });
            }
        });
    }, []);

    const handleProfileUpdate = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data.user !== "undefined") {
                setDetails(data.user);
            } else if (data.error === "User not found") {
                Swal.fire({
                    title: "User not found",
                    icon: "error",
                    text: "Something went wrong, kindly contact us for assistance."
                });
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Something went wrong, kindly contact us for assistance."
                });
            }
        });
    };

    return (
        (user.id === null) ? <Navigate to="/products" /> :
        <>
        <div className="bg-dark text-light">
            <Row>
                <Col className="p-5" >
                    <h1 className="my-5">Profile</h1>
                    <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
                    <hr />
                    <h4>Contacts</h4>
                    <ul>
                        <li>Email: {details.email}</li>
                        <li>Mobile No: {details.mobileNo}</li>
                    </ul>
                </Col>
            </Row>
            <hr />
            <Row className="pt-4 mt-4">
            
                <Col>
                    <ResetPassword />
                </Col>
            </Row>
            <Row className="pt-4 mt-4">
            <hr />
                <Col>
                    <UpdateProfile onUpdateProfile={handleProfileUpdate} />
                </Col>
            </Row>
        </div>
        </>
    );
}