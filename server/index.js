const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { MONGO_URL, REFRESH_TOKEN_SECRET } = require("./config");
const problem = require("./graphql/typeDefs/problem");
const user = require("./graphql/typeDefs/user");
const resolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");
const cors = require("cors");
const { sendRefreshToken, createAccessToken } = require("./utils/auth");

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs: [problem, user],
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/uploads", express.static(__dirname));
app.use(isAuth);
server.applyMiddleware({ app, cors: false });

app.post("/refresh_token", async (req, res) => {
  const token = req.cookies["refreshToken"];
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload;
  try {
    payload = verify(token, REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }

  // valid token, hence send Access Token
  const user = await User.findOne({ id: payload.userID });

  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createAccessToken(user) });
});

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected...");
    return app.listen({ port: PORT });
  })
  .then(() => {
    console.log(`Server is ready at : ${PORT}`);
  })
  .catch((err) => console.log(err));
