import { createServer } from "vite";
import { join } from "path";

const startServer = async () => {
  const server = await createServer({
    configFile: join(process.cwd(), "vite.config.ts"),
    server: {
      host: "0.0.0.0",
      port: 5000,
    },
  });

  await server.listen();
  console.log("Frontend server running on http://localhost:5000");
};

startServer().catch(console.error);
