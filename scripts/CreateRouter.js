import fs from "fs";
import fc from "../utils/fc.js";
import registerRoute from "../utils/registerItem.js";
import getNames from "../utils/getNames.js";

const [moduleName, modelName] = getNames();

const routerContent = `import { Router } from "express";
import { index, show, store, update, destroy } from "./Controller.js";

export const ${moduleName}Router = Router();

${moduleName}Router.get("/${moduleName}", index);
${moduleName}Router.get("/${moduleName}/:id", show);
${moduleName}Router.post("/${moduleName}", store);
${moduleName}Router.put("/${moduleName}/:id", update);
${moduleName}Router.delete("/${moduleName}/:id", destroy); 
`;


const emptyRouterContent = `import { Router } from "express";

export const ${moduleName}Router = Router();

${moduleName}Router.get("/${moduleName}", (req, res, next) => {
  try {
    res.status(200).json({data: "All ${modelName}s"});
  } catch (error) {
    next(error);
  }
 });

${moduleName}Router.get("/${moduleName}/:id", (req, res, next) => {
  try {   
    res.status(200).json({data: "${modelName}"});
  } catch (error) {
    next(error);
  }
 });

${moduleName}Router.post("/${moduleName}", (req, res, next) => {
  try {
    res.status(201).json({data: "New ${modelName} created"});
  } catch (error) {
    next(error);
  }
 });

${moduleName}Router.put("/${moduleName}/:id", (req, res, next) => {
  try {
    res.status(200).json({data: "${modelName} updated"});
  } catch (error) {
    next(error);
  }
 });

${moduleName}Router.delete("/${moduleName}/:id", (req, res, next) => {
  try {
    res.status(204).json();
  } catch (error) {
    next(error);
  }
 });

export default ${moduleName}Router;
 
`;



const content = fs.existsSync(`src/modules/${modelName}/Controller.js`) ? routerContent : emptyRouterContent;


fc(`src/modules/${modelName}`, "Router.js", content);
console.log( `Router created successfully at src/modules/${modelName}/Router.js`);

registerRoute(`src/routes/routes.js`, "routes", modelName);
