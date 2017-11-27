const responseCallback = (callback, code, data) => {
    const response = {
        body: JSON.stringify(data),
        statusCode: code,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    };

    return callback(undefined, response);
};

export { responseCallback };
