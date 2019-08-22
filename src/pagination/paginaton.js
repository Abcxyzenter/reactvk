import React from "react";
import {useStore, useDispatch} from "react-redux";
import style from './pagination.styl';
import {getContent} from "../redux/actions";
import Scroll from '../scroll/scroll'

function Pagination() {
    const store = useStore();
    const data = store.getState();
    const dispatch = useDispatch();
    let pageNumbers = [];
    if (data !== undefined) {
        let pageClass = style.pageLink;
        if (!data.infinityScroll){
            for (let i = data.minPageCount; i<= data.maxPageCount; i++ ){
                pageNumbers.push(i);
            }
            return (
                <>
                    <div className={style.paginationWrapper}>
                        <Scroll/>
                        <div className={style.paginationWrapperInner}>
                            {
                                pageNumbers.map((item,key)=>{
                                    if (item-1 === data.page){
                                        pageClass = style.pageLinkActive;
                                    }
                                    else{
                                        pageClass = style.pageLink;
                                    }
                                    return <div className={pageClass} key={key} onClick={()=> {dispatch(getContent(data, item-1))}}>
                                        {item}
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </>
            )
        }
        else {
            for (let i = data.infinityPage+1; i<= data.page+1; i++ ){
                pageNumbers.push(i);
            }
            return (
                <>
                    <div className={style.paginationWrapper}>
                        <Scroll/>
                        <div className={style.paginationWrapperInner}>
                        {
                            pageNumbers.map((item,key)=>{
                                if (item-1 === data.page){
                                    pageClass = style.pageLinkActive;
                                }
                                else{
                                    pageClass = style.pageLink;
                                }
                                let pagelink = "#page_"+(item-1);
                                return <div className={pageClass} key={key}>
                                    <a href={pagelink}>{item}</a>
                                </div>
                            })
                        }
                        </div>
                    </div>
                </>
            )
        }
    }
    else {
        return (
            <>
            </>
        );
    }
}
export default Pagination;