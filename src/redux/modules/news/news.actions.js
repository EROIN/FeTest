import {callApi, getEndpoint} from '../../../utils/api';
import {createAction} from 'redux-actions';

export const searchNews = (query) => {
  return (dispatch) => {
    const action = createAction('SEARCH_NEWS')(callApi(`${getEndpoint('news')}/search`, {
      method: 'GET',
      query: {
        query
      }
    }));
    return dispatch(action);
  };
};

export const getTopNews = () => {
  return (dispatch) => {
    const action = createAction('FETCH_TOP_NEWS')(callApi(`${getEndpoint('news')}/top`, {
      method: 'GET',
    }));
    return dispatch(action);
  };
};
