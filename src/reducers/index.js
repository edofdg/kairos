import { combineReducers } from 'redux';

// calling the default reducer to create a link
import registerReducer from './register-reducer';
import recognizeReducer from './recognize-reducer';
// import galleryReducer from './gallery-reducer';

const rootReducers = combineReducers({
    // add reducer files references here
    regData: registerReducer,
    detData: recognizeReducer,
    // galleryData: galleryReducer,
});

export default rootReducers;