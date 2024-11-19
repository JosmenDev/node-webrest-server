import express from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
}

export class Server {
    
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options: Options){
        const { port, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
    }
    
    async start() {
        
        // Middlewares: funciones que se ejecutan en todo momento que pasa por una ruta


        // Public folder
        // En una primera instancia carga en una ruta que esta dentro de public
        this.app.use(express.static(this.publicPath));

        // Cuando se recarga la pagina y no encuentra la ruta del archivo dentro de public
        // Entonces pasa aqui
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