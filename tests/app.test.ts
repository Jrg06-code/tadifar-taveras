import { Server } from '../src/presentation/server';
import { MongoDatabase } from '../src/data/mongo/init';
import { main } from '../src/app';
import { envs } from '../src/config/envs';

jest.mock('../src/presentation/server');
jest.mock('../src/data/mongo/init');

describe("Testing App.ts", () => {

    test("should connect to MongoDB", async () => {
        // Ejecuta manualmente la función principal
        await main();

        // Verifica que se llamó a la función de conexión de MongoDB.
        expect(MongoDatabase.connect).toHaveBeenCalledTimes(1);
        expect(MongoDatabase.connect).toHaveBeenCalledWith({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        });
    });

    test("should initialize and start the server", async () => {
        // Ejecuta manualmente la función principal
        await main();

        // Verifica que se inicializó y se llamó al método start del servidor.
        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledWith({
            port: envs.PORT,
            public_path: './public',
            routes: expect.any(Function)
        });
        

        expect(Server.prototype.start).toHaveBeenCalledTimes(1);
    });
});
