import fs from "fs";

/**
 * @description Creates a file with the given content
 * @param {String} path
 * @param {String} fileName
 * @param {String} content
 */

export function CreatFile(path, fileName, content) {
  path = path.split("/");
  path = path.filter((dir) => dir !== "");
  let dir = "";
  path.forEach((folder) => {
    dir += `${folder}/`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  });

  if (fs.existsSync(`${dir}/${fileName}`)) {
    console.error(`${fileName} already exists`);
    process.exit(1);
  }

  fs.writeFileSync(`${dir}/${fileName}`, content);
}

export default CreatFile;
