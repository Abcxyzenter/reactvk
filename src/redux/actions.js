import {willGetDomain, accessToken, wallCount, apiVersion, wallOffset} from '../settings/settings'
import fetchJsonp from "fetch-jsonp";

export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";
export const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";
export const SET_SCROLL_DATA = 'SET_SCROLL_DATA';
export const ALLOW_INFINITY_SCROLL = 'ALLOW_INFINITY_SCROLL';


async function fetchData(contentOffset) {
    const req='https://api.vk.com/method/wall.get?domain='+willGetDomain+'&access_token='+accessToken+'&offset='+contentOffset+'&count='+wallCount+'&v='+apiVersion;
    const result = await fetchJsonp(req)
        .then(function(response) {
            return response.json()
        });
    return result.response
}

export const getContent = (storeData, num) => dispatch => {
    let contentOffset = wallOffset;
    if (storeData !== undefined){
        contentOffset = storeData.offset;
        if(num !== undefined){
            contentOffset = num * wallCount;
        }
    }
    let pageNum = Math.round(contentOffset/wallCount);
    fetchData(contentOffset)
        .then(res => dispatch({ type: SUCCESS, payload: res}))
        .then(() =>  dispatch({ type: SET_PAGE_NUMBER, payload:pageNum}))
        .catch(err => dispatch({ type: FAILURE, payload: err}))
};

export const setScrollData = (prevScroll, storeData) => dispatch => {
    dispatch({ type: SET_SCROLL_DATA, payload:prevScroll})
    let nextPage = storeData.page+1;
    let contentOffset = wallCount*nextPage;
    if (  storeData.offset < contentOffset ){
        fetchData(contentOffset)
            .then(res => dispatch({ type: SUCCESS, payload: res}))
            .then(() =>  dispatch({ type: SET_PAGE_NUMBER, payload:nextPage}))
            .catch(err => dispatch({ type: FAILURE, payload: err}))
    }
};

export const allowInfinityScroll = (trueFalse, infinityPage) => dispatch => {
    dispatch({ type: ALLOW_INFINITY_SCROLL, infinityScroll:trueFalse, infinityPage:infinityPage})
};

