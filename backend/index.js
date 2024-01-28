const express = require('express');
const app = express();
const rootRouter = require('./routes/index')

app.use(express.json());

// router.use("/api/v1",rootRouter); // here router.use won't work i dont't know why , that is why i use app.use
// get info about app.use vs router.use? .As here we need to reroute the prefixed request.. in the very first route the route.use wont work ? YES,in first route it should be app.use

// So app.use is used to route the requests which starts from certain preffix.

app.use("/api/v1",rootRouter);

app.listen(3000);