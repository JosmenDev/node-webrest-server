import { envs } from "./config/plugins/envs.plugins";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async()=> {
    main();
})();

function main () {
    const server = new Server({
        port: envs.PORT, 
        routes: AppRoutes.routes,
        public_path: envs.PUBLIC_PATH});
    server.start();
}