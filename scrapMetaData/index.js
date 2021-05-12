const ogs = require("open-graph-scraper");
const got = require("got");
const metascraper = require("metascraper")([
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-title")()
]);

module.exports = async function(context, req) {
  const { body: html, url } = await got(context.req.body.url).catch(err => {
    context.res = {
      status: 404,
      body: "Please check the URL",
      headers: {
        "Content-Type": "application/json"
      }
    };
  });

  const options = { url: url };

  ogs(options)
    .then(async data => {
      if (data.error == false && data.result.success == true) {
        if (
          data.result.ogTitle.og == undefined ||
          data.result.ogUrl == undefined ||
          data.result.ogDescription == undefined
        ) {
          await metascraper({ html, url }).then(metadata => {
            let responseData = {};

            responseData.title = metadata.title;
            responseData.description = metadata.description;
            responseData.images = metadata.image;

            context.res = {
              status: 200,
              body: responseData,
              headers: {
                "Content-Type": "application/json"
              }
            };
          });
        } else {
          let responseData = {};

          responseData.title = data.result.ogTitle;
          responseData.description = data.result.ogDescription;
          responseData.images = data.result.ogImage.url;

          context.res = {
            status: 200,
            body: responseData,
            headers: {
              "Content-Type": "application/json"
            }
          };
        }
      } else {
        context.res = {
          status: 204,
          body: "Something went wrong",
          headers: {
            "Content-Type": "application/json"
          }
        };
      }
    })
    .catch(err => {
      context.res = {
        status: 500,
        body: "Something went wrong",
        headers: {
          "Content-Type": "application/json"
        }
      };
    });
};
