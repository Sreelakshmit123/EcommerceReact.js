import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { NavDropdown } from 'react-bootstrap';
import { HomeListAPI, searchProductAPI } from '../Services/allAPIs';

function Header() {
    const [name, setName] = useState("")
    const [logoutStatus, setLogoutStatus] = useState(false);
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    const [homeList, setHomeList] = useState([]);

    const handleSearch = async (e) => {
        const text = e.target.value;
        setSearchText(text);

        if (text.trim() === '') {
            setSearchResults([]);
            return;
        }

        try {
            const response = await searchProductAPI(text);
            if (response.status === 200) {
                setSearchResults(response.data?.data || []);
                // optionally: navigate(`/search-results?query=${text}`)
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Search failed:', error);
            setSearchResults([]);
        }
    };
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
    return (
        <>
            {/* Navbar */}
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
            {/* search bar */}

            <div className='searchbarSection '>
                <div className='search-wrapper '>
                    <FaSearch id="search-icon" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchText}
                        onChange={handleSearch}
                        className="searchbar mr-sm-2" />
                </div>
                <button className='navbarbtns btn'><i className="fontBtnPopular fa-solid fa-fire me-2"></i> Most Popular</button>
                <button className='navbarbtns btn'><i class="fontBtnfilter fa-solid fa-sliders me-2"></i> Filters</button>

            </div>

            {/* category button */}

            <div className='row'>
                <div className='categoryButton  col-lg-6 '>
                    <Link to={"/category1"}><button className='Categorybtn btn btn-outline-dark'>category</button></Link>
                    <Link to={"/category2"}><button className='Categorybtn btn btn-outline-dark'>category</button></Link>
                    <Link to={"/category3"}><button className='Categorybtn btn btn-outline-dark'>category</button></Link>
                    <Link to={"/category4"}><button className='Categorybtn btn btn-outline-dark'>category</button></Link>
                </div>
            </div>

        </>
    )
}

export default Header