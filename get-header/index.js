require("ts-node/register");
const { getPNG } = require("bannergen");
module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.text || (req.body && req.body.text)) {
        const text = req.query.text || req.body.text;
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + text
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass text on the query string or in the request body"
        };
    }
    context.done();
};