import fs from "fs";
import fc from "../utils/fc.js";
import registerRoute from "../utils/registerItem.js";
import getNames from "../utils/getNames.js";

const [moduleName, modelName] = getNames();

const routerContent = `import { Router } from "express";
import { index, show, store, update, destroy } from "./Controller.js";

export const ${moduleName}Router = Router();

${moduleName}Router.get("/", index);
${moduleName}Router.get("/:id", show);
${moduleName}Router.post("/", store);
${moduleName}Router.put("/:id", update);
${moduleName}Router.delete("/:id", destroy); 
`;


const emptyRouterContent = `import { Router } from "express";

export const ${moduleName}Router = Router();

${moduleName}Router.get("/", (req, res, next) => {
   try {
     res.status(200).json({data: "All ${modelName}s"});
   } catch (error) {
     next(error);
   }
 });

${moduleName}Router.get("/:id", (req, res, next) => {
   try {   
     res.status(200).json({data: "${modelName}"});
   } catch (error) {
     next(error);
   }
 });

${moduleName}Router.post("/", (req, res, next) => {
   try {
     res.status(201).json({data: "New ${modelName} created"});
   } catch (error) {
     next(error);
   }
 });

${moduleName}Router.put("/:id", (req, res, next) => {
   try {
     res.status(200).json({data: "${modelName} updated"});
   } catch (error) {
     next(error);
   }
 });

${moduleName}Router.delete("/:id", (req, res, next) => {
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
