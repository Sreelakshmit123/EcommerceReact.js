import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import WishlistCard from '../Pages/WishlistCard';
import { HomeListAPI, listWishlistAPI, removeWishlistAPI } from '../Services/allAPIs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Wishlist() {
    const [name, setName] = useState("")
    const [logoutStatus, setLogoutStatus] = useState(false);
    const navigate = useNavigate()
    const [homeList, setHomeList] = useState([]);
    useEffect(() => {
        fetchHomeData()
        if (localStorage.getItem("access_token")) {
            setLogoutStatus(true);
            const firstName = localStorage.getItem("firstname");
            const userEmail = localStorage.getItem("email");
            const fallbackName = localStorage.getItem("name");

            setName(firstName || fallbackName || userEmail);
        } else {
            setLogoutStatus(false);
        }
    }, []);
    const logout = () => {
        localStorage.clear();
        setLogoutStatus(false);
        navigate('/');
    };
    const [wishlistedItems, setWishlistedItems] = useState([]);
    // homelist data
    const fetchHomeData = async () => {
        try {
            const res = await HomeListAPI();
            console.log("Home list API full response:", res);
            if (res?.status === 200) {
                setHomeList(res.data.main_categories || []);
            } else {
                console.warn('Home list API failed');
            }
        } catch (error) {
            console.error('Home list fetch error:', error);
        }
    };

    // get the wishlist in the wishlist page
    const getlistWishlist = async () => {
        console.log("inside favourites");
        const token = localStorage.getItem("access_token")
        if (!token) return;

        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        };
        try {
            const result = await listWishlistAPI(reqHeader);
            if (result.status === 200) {
                const apiWishlist = result.data.data;
                setWishlistedItems(apiWishlist);
                localStorage.setItem("wishlist", JSON.stringify(apiWishlist));
            }
        } catch (err) {
            console.error("Failed to sync wishlist", err);
        }
    }
    console.log(wishlistedItems);

    useEffect(() => {
        getlistWishlist()
    }, []);
    // remove wishlisted items by their id 
    const handleWishlistRemove = async (wishlistItemId) => {
        const token = localStorage.getItem("access_token");

        const updated = wishlistedItems.filter(item => item.id !== wishlistItemId);
        setWishlistedItems(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));

        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await removeWishlistAPI([wishlistItemId], reqHeader);
                if (result.status === 200) {
                    toast.success("This item was removed successfully");
                    getlistWishlist(); // refresh
                } else {
                    toast.warning(result.data);
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to remove item from wishlist");
            }
        }
    }

    const removeFromWishlistUI = (id) => {
        const updated = wishlistedItems.filter(item => item.id !== id);
        setWishlistedItems(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };
    // remove all wishlisted items
    const handleRemoveAll = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        try {
            const result = await removeWishlistAPI(wishlistedItems.map(item => item.id), reqHeader);

            if (result.status === 200) {
                toast.success("All wishlisted items are removed!");
                setWishlistedItems([]);
                localStorage.setItem("wishlist", JSON.stringify([]));
            } else {
                toast.error("Failed to remove all items");
            }
        } catch (err) {
            console.error("Error removing all wishlist items", err);
            toast.error("Something went wrong");
        }
    };




    return (
        <>
            {/* Navbar */}
            <div className='container-fluid' id='Container'>
                <Navbar collapseOnSelect expand="lg">
                    <Link className='text-decoration-none' to={"/"}><Navbar.Brand className='brandname fw-bold'><b>EBrands</b></Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="navsection  me-auto ">
                            <Nav.Link><Link to={"/"} className='navsection'>Home</Link></Nav.Link>
                            <NavDropdown title="Collection" id="basic-nav-dropdown" className="navsection">
                                {homeList.map((category) => (
                                    <div key={category.id} className="dropdown-submenu px-2">
                                        <NavDropdown title={category.name} drop="end" className="navsection-dropdown">
                                            {category.subcategories && category.subcategories.map((sub) => (
                                                <NavDropdown.Item
                                                    key={sub.id}
                                                    as={Link}
                                                    to={`/mobiletablet?page=1&category=${category.id}&subcategory=${sub.id}`}
                                                    className="navsection-dropdown"
                                                >
                                                    {sub.name}
                                                </NavDropdown.Item>
                                            ))}
                                        </NavDropdown>
                                    </div>
                                ))}
                            </NavDropdown>
                            <Nav.Link><Link to={"/sale"} className='navsection'>Sale</Link></Nav.Link>
                            <Nav.Link><Link to={"/faq"} className='navsection'>FAQ</Link></Nav.Link>
                        </Nav>
                        <Nav className=''>
                            <Nav.Link><Link to={"/shoppingCart"}><button className='cartbtn btn btn-outline-dark '><i className="fa-solid fa-cart-shopping me-2"></i>ShoppingCart</button></Link></Nav.Link>
                            <Nav.Link><Link to={"/wishlist"}><button className='Whishlistbtn btn btn-outline-dark '>Wishlist</button></Link></Nav.Link>
                        </Nav>
                        <Nav>
                            {logoutStatus ? (<Nav.Link><Link to={"/"}><button className='signUp-btn btn ' onClick={logout}> LogOut <i class="fa-solid fa-arrow-right"></i></button></Link></Nav.Link>) : (<Nav.Link><Link to={"/register"}><button className='signUp-btn btn '>Sign in <i class="fa-solid fa-arrow-right"></i></button></Link></Nav.Link>)}
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>

                {/* whishlist */}
                <div className='row selectAllOption'>
                    <div className='col-lg-4 checkboxes '>
                        <label for="checkbox1" class="checkboxes gap-3 "><input type="checkbox" id="checkbox1" name="checked" value="yes" class="checkbox-wishlist" />
                            Select All</label>
                    </div>

                    <div className='col-lg-5 pt-2'>
                        <button className='btn wishlist-btns'>ADD TO CART(ALL)</button>
                        <button onClick={handleRemoveAll} className='btn wishlist-btns ms-5 '>REMOVE ALL</button>
                    </div>
                    <div className="col-lg-3"></div>
                </div>

                {/* wishlist cards */}

                {wishlistedItems.length === 0 ? (
                    <p className="text-center fs-1 text-danger mt-5">No items in wishlist.</p>
                ) : (
                    wishlistedItems.map(item => (
                        <WishlistCard key={item.id} product={item} onClick={() => handleWishlistRemove(item.id)} removeFromWishlistUI={removeFromWishlistUI} />
                    ))
                )}
            </div>
            <ToastContainer autoClose={3000} />
        </>

    )
}

export default Wishlist