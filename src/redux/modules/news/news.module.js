export * from './news.actions.js';

export default function OTP (state = {
  showSpinner: false,
  data: []
}, action = null) {
  switch (action.type) {

  case 'SEARCH_NEWS_FULFILLED':
  case 'FETCH_TOP_NEWS_FULFILLED':
    return {
      ...state,
      data: action.payload.articles,
      showSpinner: false
    };

  case 'SEARCH_NEWS_PENDING':
  case 'FETCH_TOP_NEWS_PENDING':
    return {
      ...state,
      showSpinner: true
    };

  case 'SEARCH_NEWS_REJECTED':
  case 'FETCH_TOP_NEWS_REJECTED':
    return {
      ...state,
      showSpinner: false
    };

  default:
    return state;
  }
}
