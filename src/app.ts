import { envs } from "./config/plugins/envs.plugins";
import { Server } from "./presentation/server";

(async()=> {
    main();
})();

function main () {
    const server = new Server({
        port: envs.PORT, 
        public_path: envs.PUBLIC_PATH});
    server.start();
}