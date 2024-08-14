import { Router } from "express";
import { Authroutes } from "./auth/routes";
import { Productsroutes } from "./products/routes";

export class AppRoutes{
    static get routes():Router{

        const router = Router();

        //Definir rutas

        router.use('/api/auth',Authroutes.routes)
        router.use('/api/products', Productsroutes.routes)

        return router;

    }
}