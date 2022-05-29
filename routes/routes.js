const Task = require("./routes/tasks");
const Auth = require("./routes/auth");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  Auth(app);
  Task(app);
};
