import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider, connect} from "react-redux"
import {store} from './redux/store'

const mapStateToProps = (store) => {
    return {
        state: store
    }
};

const Application = connect(mapStateToProps)(App);

ReactDOM.render(<Provider store={store}><Application /></Provider>, document.getElementById('root'));
serviceWorker.unregister();
