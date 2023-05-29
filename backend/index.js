const app = require("./app");

// handling uncaught exceptions
app.on("uncaughtException", function (err) {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting doen the server for handling uncaught exception`);
});

// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting doen the server for handling unhandled rejection`);

  server.close(() => {
    process.exit(1);
  });
});
