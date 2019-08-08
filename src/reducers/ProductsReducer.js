import { fetchActionTypes } from '@actionTypes';

export const initialState = {
  items: [],
  isFetching: false,
  error: {
    code: 200,
    message: '',
  },
  pagination: {
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
  },
};

const getPaginationProps = ({ totalPages, totalElements, currentPage }) => ({
  totalPages, totalElements, currentPage,
});

export default function products(state = initialState, action) {
  const { FETCH_START, FETCH_SUCCESS, FETCH_ERROR } = fetchActionTypes('PRODUCT');
  console.log(action.data);
  switch (action.type) {
    case FETCH_START.type:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_SUCCESS.type:
      return {
        ...state,
        items: [...state.items, ...action.data.content],
        isFetching: false,
        ...getPaginationProps(action.data),
      };
    case FETCH_ERROR.type:
      return {
        ...state,
        isFetching: false,
        error: {
          message: action.error,
        },
      };
    default:
      return state;
  }
}
