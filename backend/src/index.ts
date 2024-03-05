import { createApplication, createConfig } from "./app.js";

async function main() {
  try {
    const config = createConfig(3000, "development");
    const application = await createApplication(config);
    application.listenAndServe();
  } catch (error) {
    console.error("Error starting application:", error);
    process.exit(1);
  }
}

main();
