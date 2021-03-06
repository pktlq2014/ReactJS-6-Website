export default (query) => {
    if(query) {
        const queryString = query.split("?")[1];
        console.log(queryString);
        if(queryString.length > 0) {
            const params = queryString.split("&");
            console.log(params);
            const paramsObj = {};
            params.forEach(param => {
                const keyValue = param.split("=");
                console.log(keyValue);
                paramsObj[keyValue[0]] = keyValue[1];
            }); 
            return paramsObj;
        }
    }
    return {};
}