#!/usr/bin/env node

import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const [, , command, ...args] = process.argv;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scriptsPath = path.resolve(__dirname, "../fun-modules/scripts");

const commands = {
  "create:module": "CreateModule.js",
  "create:controller": "CreateController.js",
  "create:model": "CreateModel.js",
  "create:router": "CreateRouter.js",
};

try {
  if (commands[command]) {
    execSync(
      `node ${path.join(scriptsPath, commands[command])} ${args.join(" ")}`,
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
