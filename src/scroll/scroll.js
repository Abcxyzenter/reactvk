import React from "react";
import {useStore, useDispatch} from "react-redux";
import {allowInfinityScroll} from "../redux/actions";
import style from './scroll.styl';
function Scroll() {

    const dispatch = useDispatch();
    const store = useStore();
    const data = store.getState();
    const allowDisallow = !data.infinityScroll;

    return (
        <>
            <div className={style.allowInfinityScroll} >
                <span>Бесконечный скролл</span>
                <input type="checkbox" defaultChecked={!allowDisallow} onChange={ ()=>{dispatch(allowInfinityScroll(allowDisallow, data.page))}}/>
            </div>
        </>
    )
}
export default Scroll