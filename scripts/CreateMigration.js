import fs from "fs";
import getNames from "../utils/getNames.js";
import registerItem from "../utils/registerItem.js";

const [_, modelName] = getNames();

if (!fs.existsSync(`src/modules/${modelName}/Model.js`)) {
  console.error("Model does not exist. Please create a model first");
  process.exit(1);
}

registerItem(`src/database/migrations/migrations.js`, "migrations", modelName);
