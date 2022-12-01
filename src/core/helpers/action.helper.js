
const actionFetch = (fetch, dispatch, request, success, failure, requestContent, finishLoad) => {
    dispatch(requestContent());
    dispatch(request());

    return fetch()
        .then(response => {
            if (response.error || response.errors) {
                dispatch(failure(response));
            } else if (!response.error && !response.errors) {
                dispatch(success(response));
            };
            dispatch(finishLoad());
        })
        .catch(error => {
            console.log(error)
            if(error?.data == undefined) {
                dispatch(failure({
                        error: true,
                        code: "REQUEST_TYPE_ERROR",
                        message: "Falha ao se comunicar com servidor!"
                }));
            } else {
                dispatch(failure(error.data));
            }
            dispatch(finishLoad());
        });
};

export { actionFetch };