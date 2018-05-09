import products from '../mock/mock_items_less.json';
import axios from "axios/index";

// Sends a GET request for items data to API.
function getStoreItems() {
    let API_KEY = 'fae7b9f6-6363-45a1-a9c9-3def2dae206d';
    let config = {'AUTH': { API_KEY }};
    axios.get('http://erply-challenge.herokuapp.com/list', config).
    then((res) => {
        console.log(res);
        return res;
    }).catch((err) => {
        console.log(err);
    });
}

// Initially the cart is empty.
// Products are fetched from API.
export default {
    cart: [],
    products: products
}
