import {
    LOADING,
    SYSTEM_LOADING,
    UPDATE_FORM_LOADING
} from "../actions/LoadingAction";

const initialState = {
    isLoading: false,
    systemLoading: false,
    updateFormLoading: false
};

const LoadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING: {
            return {
                ...state,
                isLoading: action.payload,
            };
        }
        case SYSTEM_LOADING: {
            return {
                ...state,
                systemLoading: action.payload,
            };
        }
        case UPDATE_FORM_LOADING: {
            return {
                ...state,
                updateFormLoading: action.payload,
            };
        }

        default:
            return state;
    }
};
export default LoadingReducer;
