import express, { Router } from 'express';
import path from 'path';
import { json } from 'stream/consumers';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {
    
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options){
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }
    
    async start() {
        
        // Middlewares: funciones que se ejecutan en todo momento que pasa por una ruta
        this.app.use(express.json());   // raw
        this.app.use(express.urlencoded({extended: true})); //x-www-form-urlencoded

        // Public folder
        // En una primera instancia carga en una ruta que esta dentro de public
        this.app.use(express.static(this.publicPath));

        // Routes
        this.app.use(this.routes);

        // Cuando se recarga la pagina y no encuentra la ruta del archivo dentro de public
        // Entonces pasa aqui
        // SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return;
        })

        // console.log('Server running');
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${3000}`);
        });
    }
}