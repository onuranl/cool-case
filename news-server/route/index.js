const generate_routes = require("./generate_routes");

const verifyToken = require("../middlewares/verify-token");

const auth_controller = require("../controllers/auth-controller");
const news_controller = require("../controllers/news-controller");

const routes = [
  {
    path: "/auth",
    children: [
      {
        path: "/login",
        handler: auth_controller.login,
        method: "post",
      },
    ],
  },
  {
    path: "/news",
    children: [
      {
        path: "/:query",
        handler: news_controller.getNews,
        method: "get",
        middleware: verifyToken,
      },
    ],
  },
];

module.exports = generate_routes(routes);
