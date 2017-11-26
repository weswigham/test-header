const { getPNG } = require("./bannergen/index.js");
module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.text || (req.body && req.body.text)) {
        const text = req.query.text || req.body.text;
        getPNG(text).then(buf => {
            context.res = {
                body: buf,
                headers: {
                    "Content-Type": "image/png"
                }
            };
            context.done();
        }).catch(err => {
            context.res = {
                status: 500,
                body: "Internal Server Error"
            };
            console.log(err);
            context.done()
        })

    }
    else {
        context.res = {
            status: 400,
            body: "Please pass text on the query string or in the request body"
        };
        context.done();
    }
};