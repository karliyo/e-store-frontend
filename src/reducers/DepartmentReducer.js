import { fetchActionTypes } from '@actionTypes';

export const initialState = {
  departments: [],
  isFetching: false,
  error: false,
};

export default function products(state = initialState, action) {
  const { FETCH_START, FETCH_SUCCESS, FETCH_ERROR } = fetchActionTypes('DEPARTMENT');
  switch (action.type) {
    case FETCH_START.type:
      return { ...state, isFetching: true };
    case FETCH_SUCCESS.type:
      return { ...state, departments: action.data.content, isFetching: false };
    case FETCH_ERROR.type:
      return { ...state, isFetching: false, error: true };
    default:
      return state;
  }
}
