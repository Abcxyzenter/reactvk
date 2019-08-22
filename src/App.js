import React, {  useEffect } from "react";
import {  useStore, useDispatch  } from "react-redux";
import News from './news/news'
import { getContent, setScrollData } from './redux/actions';
import Pagination from './pagination/paginaton'

function App() {

    const state = useStore();
    const dispatch = useDispatch();
    const storeData = state.getState();
    const handleScroll = () => {
        const storeDataContent = state.getState();
        let scrollY = window.pageYOffset || document.documentElement.scrollTop;
        let winHeight = document.body.clientHeight;
        let prevScroll = storeDataContent.prevScroll ? storeDataContent.prevScroll : 0;
        if (scrollY+800 >= winHeight && scrollY - prevScroll>800){
            prevScroll = scrollY;
            dispatch(setScrollData(prevScroll, storeDataContent));
        }
    };
    useEffect(() => {
        dispatch(getContent(storeData));
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return <div >
            <News />
            <Pagination />
          </div>
}

export default App;
