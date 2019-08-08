import { API_PATH } from '@constants/paths';
import { getUrl } from '@components/goodies/helpers/UrlHelper';
import { fetchActionTypes } from '@actionTypes';

export function fetchInternal(url) {
  return fetch(`${API_PATH}${url}`, {
    method: 'GET',
  });
}

function helper(actionType, type, props) {
  return (dispatch) => {
    const fetchType = fetchActionTypes(actionType);
    dispatch(fetchType.FETCH_START);
    fetchInternal(`${type}/get?${getUrl(props)}`)
      .then(res => res.json())
      .catch((error) => {
        console.error('FETCH ERROR', error);
      })
      .then((data) => {
        dispatch({ ...fetchType.FETCH_SUCCESS, data });
      })
      .catch((err) => {
        console.error('ERROR', err);
      });
  };
}

export const fetchProducts = props => helper('PRODUCT', 'products', props);
export const fetchStores = props => helper('STORE', 'stores', props);
export const fetchDepartments = props => helper('DEPARTMENT', 'departments', props);
