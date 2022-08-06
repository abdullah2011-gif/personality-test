import createDataContext from '../createDataContext';
import {
    SETDATA
} from './types';


const initialState = {
    testId: "",
    question: {},
    answers: [],
    totalScore: 0
};
const appReducer = (state, {
    type,
    payload
}) => {
    switch (type) {
        case SETDATA:
            return {
                ...state, ...payload
            };
        default:
            return state;
    }
};

const setDataAction = dispatch => async (payload = {}) => {
    try {
        dispatch({
            type: SETDATA,
            payload
        });
    } catch (err) {
        throw err;
    }
};

export const {
    Context,
    Provider
} = createDataContext(
    appReducer,
    initialState, {
    setDataAction
},
);