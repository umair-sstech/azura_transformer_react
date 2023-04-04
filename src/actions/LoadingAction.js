export const LOADING = "loadingReducer/LOADING";
export const SYSTEM_LOADING = "loadingReducer/SYSTEM_LOADING";
export const UPDATE_FORM_LOADING = "loadingReducer/UPDATE_FORM_LOADING";

export const onLoading = (val) => {
    return (disptch) => {
        disptch({
            type: LOADING,
            payload: val
        });
    }
};

export const onSystemLoading = (val) =>
{
    return (disptch) =>
    {
        disptch({
            type: SYSTEM_LOADING,
            payload: val
        });
    }
};

export const onUpdateFormLoading = (val) =>
{
    return (disptch) =>
    {
        disptch({
            type: UPDATE_FORM_LOADING,
            payload: val
        });
    }
};