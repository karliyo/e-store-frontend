import { fetchActionTypes } from '@actionTypes';

export const initialState = {
  stores: [],
  isFetching: false,
  error: false,
};

export default function products(state = initialState, action) {
  const { FETCH_START, FETCH_SUCCESS, FETCH_ERROR } = fetchActionTypes('STORE');
  switch (action.type) {
    case FETCH_START.type:
      return { ...state, isFetching: true };
    case FETCH_SUCCESS.type:
      return { ...state, stores: action.data.content, isFetching: false };
    case FETCH_ERROR.type:
      return { ...state, isFetching: false, error: true };
    default:
      return state;
  }
}
