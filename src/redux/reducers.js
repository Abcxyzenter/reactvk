import {  SUCCESS, FAILURE, ALLOW_INFINITY_SCROLL,  SET_PAGE_NUMBER, SET_SCROLL_DATA} from './actions';
import {willGetDomain, wallCount} from '../settings/settings'

const emptyInitialState = {
    infinityScroll:true,
    infinityPage:0,
    page:0,
    offset:0,
    minPageCount:1,
    maxPageCount:10,
    prevScroll:0,
    content:[],
    err: ''
};

export default function reducer(state= emptyInitialState, action) {

    let thisStore = state;

    switch (action.type) {
        case SET_PAGE_NUMBER:
            let pageNum = action.payload;
            let offsetNum = pageNum * wallCount;
            let minPage = thisStore.minPageCount;
            let maxPage = thisStore.maxPageCount;
            if (maxPage - pageNum !== 5 && pageNum-4 > 0){
                maxPage = pageNum+5;
                minPage = pageNum-4;
            }
            return {
                ...state,
                offset:offsetNum,
                page:pageNum,
                minPageCount:minPage,
                maxPageCount:maxPage
            };
        case SET_SCROLL_DATA:
            return {
                ...state,
                prevScroll:action.payload,
            };
        case ALLOW_INFINITY_SCROLL:
            if(!action.infinityScroll){
                return {
                    ...state,
                    infinityScroll:action.infinityScroll,
                    infinityPage:action.infinityPage,
                    prevScroll:0
                };
            }else{
                return {
                    ...state,
                    infinityScroll:action.infinityScroll,
                    page:action.infinityPage,
                    infinityPage:action.infinityPage,
                    prevScroll:0
                };
            }
        case FAILURE:
            console.log('can\'t fetch');
            return {
                ...state
            };
        case SUCCESS:
            let responsedContent = action.payload.items;
            let contentData = [];
            let newContentArray = thisStore.content;
            for (let i = 0; i < responsedContent.length; i++) {
                let itemName = responsedContent[i].text.length > 70 ? responsedContent[i].text.slice(0, 70)+' [подробнее]' : responsedContent[i].text;
                if (responsedContent[i].text.split('http')[1]){
                    itemName = 'http'+responsedContent[i].text;
                }
                let itemLink = 'https://vk.com/' + willGetDomain + '?w=wall' + responsedContent[i].owner_id + '_' + responsedContent[i].id;
                let imageUrl = 'https://natureproducts.com.ua/userfiles/shop/large/100_shinka-posolska-vk-vs-.jpg';
                if (responsedContent[i].attachments !== undefined && responsedContent[i].attachments[0].photo !== undefined) {
                    if (responsedContent[i].attachments[0].photo.sizes[4].url !== undefined) {
                        imageUrl = responsedContent[i].attachments[0].photo.sizes[4].url;
                    }
                    else if (responsedContent[i].attachments[0].photo.sizes[0].url !== undefined) {
                        imageUrl = responsedContent[i].attachments[0].photo.sizes[0].url;
                    }
                    else {
                        imageUrl = 'https://natureproducts.com.ua/userfiles/shop/large/100_shinka-posolska-vk-vs-.jpg';
                    }
                }
                let noData = false;
                if (itemName.length < 1 || itemLink.length < 1) {
                    noData = true;
                }
                if (!noData) {
                    let tmp = {
                        image: imageUrl,
                        title: itemName,
                        link: itemLink
                    };
                    if (thisStore.infinityScroll) {
                        newContentArray.push(tmp);
                    }
                    else{
                        contentData.push(tmp);
                    }
                }
            }
            if (thisStore.infinityScroll) {
                return {
                    ...state,
                    content: newContentArray
                }
            }
            else{
                return {
                    ...state,
                    infinityPage:thisStore.page,
                    content:contentData
                }
            }
    }
}