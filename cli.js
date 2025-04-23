#!/usr/bin/env node

import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const [, , command, ...args] = process.argv;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const resolveScriptPath = (scriptName) => 
  path.resolve(__dirname, "../fb-modules/scripts", scriptName);

const commands = {
  "make:module": "CreateModule.js",
  "make:controller": "CreateController.js",
  "make:model": "CreateModel.js",
  "make:router": "CreateRouter.js",
  "db:migrate": "RunMigration.js",
};

try {
  if (commands[command]) {
    const scriptPath = resolveScriptPath(commands[command]);
    const escapedScriptPath = `"${scriptPath}"`;
    const escapedArgs = args.map(arg => `"${arg}"`).join(" ");

    execSync(
      `node ${escapedScriptPath} ${escapedArgs}`,
      { stdio: "inherit" }
    );
  } else {
    console.error(`Unknown command: ${command}`);
    process.exit(1);
  }
} catch (error) {
  console.error(`Error executing command: ${command}`);
  console.error(error.message);
  process.exit(1);
}
