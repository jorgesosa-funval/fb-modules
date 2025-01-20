import fs from "fs";
import fc from "./fc.js";

/**
 * @description Registers an item in an array in a file
 * @param {String} filePath 
 * @param {String} arrayName 
 * @param {String} itemName 
 */

export function registerItem(filePath, arrayName, itemName) {
  const fileName = filePath.split("/").pop();
  const path = filePath.split("/").slice(0, -1).join("/");

  if (!fs.existsSync(filePath)) {
    fc(path, fileName, `export const ${arrayName} = [\n];`);
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const fileLines = fileContent.split("\n");
 
  const itemIndex = fileLines.findIndex((line) =>
    line.includes(`"${itemName}"`)
  );

  if (itemIndex !== -1) {
    console.error(`${itemName} is already registered in ${arrayName}`);
    process.exit(1);
  }

  const arrayIndex = fileLines.findIndex((line) =>
    line.includes(`const ${arrayName} = [`)
  );

  let endOfArrayIndex = fileLines.findIndex(
    (line, index) => index > arrayIndex && line.includes("];")
  );

  if (endOfArrayIndex === -1) {
    const singleLineArrayIndex = fileLines.findIndex(
      (line) => line.includes(`const ${arrayName} = [`) && line.includes("];")
    );
    if (singleLineArrayIndex !== -1) {
      const line = fileLines[singleLineArrayIndex];
      const newLine = line.replace("];", ` "${itemName}", ];`);
      fileLines[singleLineArrayIndex] = newLine;
    }
  } else {
    fileLines.splice(endOfArrayIndex, 0, ` "${itemName}",`);
  }

  fs.writeFileSync(filePath, fileLines.join("\n"));
  console.log(`${itemName} registered successfully in ${arrayName}`);
}

export default registerItem; 
