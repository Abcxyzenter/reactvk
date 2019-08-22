import React from "react";
import style from './news.styl';
import {useStore} from "react-redux";
import { wallCount } from '../settings/settings'
function News() {
    const store = useStore();
    const data = store.getState();
    if (data !== undefined){
        let infinityPageCounter = data.infinityPage;
        let tryCounter = 0;
        return (
            <>
                <div className={style.wrapper}>
                    {
                        data.content.map((item,key)=>{
                            let pageId = '';
                            if (tryCounter === 0 && data.infinityScroll){
                                let pageNumber = 'page_'+infinityPageCounter;
                                pageId = <span className={style.hidden} id={pageNumber}></span>;
                            }
                            if(tryCounter<wallCount){
                                tryCounter++;
                            }
                            else{
                                tryCounter = 0;
                                infinityPageCounter++;
                            }
                            return <div key={key} className={style.item}>
                                        <div className={style.itemContent}>
                                            <div className={style.imageClipWrapper}>
                                                <div className={style.itemImageWrapper}>
                                                    <img src={item.image}/>
                                                </div>
                                            </div>
                                            <div className={style.itemLinkClipWrapper}>
                                                <div className={style.itemLink}>
                                                    <a href={item.link}>{item.title}</a>
                                                </div>
                                            </div>
                                        </div>
                                        {pageId}
                                    </div>
                        })
                    }
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <p>Новостей нет</p>
            </>
        );
    }
}
export default News;
