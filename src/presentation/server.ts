import express, { Router } from 'express';
import fileUpload from 'express-fileupload'

interface Options {
    port:number,
    routes: Router,
    public_path?:string;
}
export class Server {
    
    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;
    private readonly public_path:string;
    private readonly routes:Router;

    constructor(options:Options){
        const {port,routes,public_path = 'public'} = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes
    }

    async start(){

        //* Middlewares
        this.app.use(express.json())
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : './uploads'
        }));
          


        //* PublicFolder
        this.app.use(express.static(this.public_path))

        //* Routes
        this.app.use(this.routes)

        this.serverListener = this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${this.port}`)
        })
    }


}