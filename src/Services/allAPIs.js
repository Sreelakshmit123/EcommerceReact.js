import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverUrl";

//send OTP
export const sendVerificationAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/user/send-verification/`, reqBody);
}

//verify - token
export const verifyTokenAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/user/verify-token/`, reqBody)
}

// Register User
export const registerAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/user/register/`, reqBody);
};

// login User
export const loginAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/user/login/`, reqBody);
};

// highlight deals of week
export const highlightDealsAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/api/HighlightProducts/`);
};

// deals of day
export const dealsOfTheDayAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/api/dealOfTheDay/`);
};

// popular items
export const popularProductsAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/api/trendingProducts/`);
};

// spotlighted products
export const spotlightedAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/api/featuredProducts/`);
};

// related products
export const RelatedProductsAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/api/RelatedProducts/?product_id=1`);
};

// brand List
export const BrandListAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/api/BrandList/`);
};

// MobileProduct List Cards
export const MobileProductListAPI = async (query = '') => {
    return await commonAPI("GET", `${SERVER_URL}/api/product-list/${query}`);
};

// MobileProduct List view
export const MobileProductViewAPI = async (product_id, skuId) => {
  return await commonAPI("GET", `${SERVER_URL}/api/product-detail/${product_id}/${skuId}/`);
};

//Add wishlist
export const wishlistAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/api/add-wishlist/`, reqBody, reqHeader);
};

//list wishlist
export const listWishlistAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/api/list-wishlist/`, "", reqHeader);
};

//Remove from wishlist
export const removeWishlistAPI = async (wishlist_ids, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/api/remove-wishlist/`, { wishlist_ids }, reqHeader)
}

//move Wishlist to cart
export const moveToCartAPI = async (wishlist_ids, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/api/move-wishlist-to-cart/`, { wishlist_ids }, reqHeader)
}

//Add Cart
export const addToCartAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/api/addtocart/`, reqBody, reqHeader);
};

//list cart
export const listCartAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/api/cartList/`, "", reqHeader);
};

//remove from cart
export const removeCartAPI = async (reqBody,reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/api/RomoveFromcart/?product_id&skuid`,reqBody ,reqHeader)
}

// remove all from cart 
export const removeAllCartAPI = async (reqBody,reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/api/remove-all-from-carts/`,reqBody ,reqHeader)
}

// move cart to wishlist 
export const moveToWishlistAPI = async (products,reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/api/move-cart-to-wishlist/`,{products}, reqHeader)
}

//.......................................................................................//

//search product list 
export const searchProductAPI = async (searchText,reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/api/search-products/?search_text=${encodeURIComponent(searchText)}"`,null, reqHeader)
}

//footer banner
export const footerBannersAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/api/footerBanners/`, reqHeader)
}

//google login
export const googleLoginAPI = async (reqBody) =>{
  return await commonAPI("POST", `${SERVER_URL}/user/continue-with-google/`, reqBody)
}

///////////////////////////////////////////////////////////////////////////////////////////////////

//HomeList Api
export const HomeListAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/api/homeList/`, reqHeader)
}
//Price List (filter) Api
export const filterPriceListAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/api/PriceList/`, reqHeader)
}