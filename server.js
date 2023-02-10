const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: 'config.env' });
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');

// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);

app.all("*", (req, res, next) => {
    next(new ApiError(`Con't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

process.on("unhandledRejection", err => {
    console.error(`UnhandledRejection Error: ${err.name} | ${err.message}`);
    server.close(() => {
        console.error(`Shutting down...`);
        process.exit(1);
    });
});