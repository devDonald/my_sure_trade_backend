import express from 'express';
import morgan from 'morgan';
import UserRoute from "./routes/user-route.js";
import GiftCardRoute from "./routes/gift-card-route.js";
import {
    BANK_DETAILS_BASE_ROUTE,
    CURRENCY_BASE_ROUTE,
    GIFT_CARD_BASE_ROUTE,
    GIFT_CARD_RATE_BASE_ROUTE,
    GIFT_CARD_TRANSACTION_BASE_ROUTE, PAYMENT_BASE_ROUTE,
    USER_BASE_ROUTE
} from "./constants/base-route.js";
import {morganErrorHandler, morganSuccessHandler} from "./config/logger/MorganConfig.js";
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from "swagger-jsdoc";
import options from "./config/swagger/swagger-config.js";
import jsonErrorHandler from "express-json-error-handler";
import corsConfig from "../src/constants/cors-config.js";
import GiftCardTransactionRoute from "./routes/gift-card-transaction-route.js";
import GiftCardRateRoutes from "./routes/gift-card-rate-routes.js";
import CurrencyRoutes from "./routes/currency-routes.js";
import PaymentRoutes from "./routes/payment-routes.js";
import BankDetailRoutes from "./routes/bank-detail-routes.js";
dotenv.config();
const app = express();
const userRoute = new UserRoute();
const giftCardRoute = new GiftCardRoute();
const transactionRoute = new GiftCardTransactionRoute();
const giftCardRateRoute = new GiftCardRateRoutes();
const currencyRoute = new CurrencyRoutes();
const paymentRoute = new PaymentRoutes();
const bankDetailsRoute = new BankDetailRoutes();
const userRouter = await userRoute.routes();
const giftCardRouter = await giftCardRoute.routes();
const transactionRouter = await transactionRoute.routes();
const giftCardRateRouter = await giftCardRateRoute.routes();
const currencyRouter = await currencyRoute.routes();
const paymentRouter = await paymentRoute.routes();
const bankDetailsRouter = await bankDetailsRoute.routes();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors(corsConfig));
app.use(USER_BASE_ROUTE, userRouter);
app.use(GIFT_CARD_BASE_ROUTE, giftCardRouter);
app.use(GIFT_CARD_TRANSACTION_BASE_ROUTE, transactionRouter);
app.use(GIFT_CARD_RATE_BASE_ROUTE, giftCardRateRouter);
app.use(CURRENCY_BASE_ROUTE, currencyRouter);
app.use(PAYMENT_BASE_ROUTE, paymentRouter);
app.use(BANK_DETAILS_BASE_ROUTE, bankDetailsRouter);
app.use(morganErrorHandler)
app.use(morganSuccessHandler)
app.use(jsonErrorHandler());
export default app;

