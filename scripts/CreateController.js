import fs from "fs";
import cf from "../utils/fc.js";
import getNames from "../utils/getNames.js";

const [moduleName, modelName] = getNames();

const controllerContent = `import {${modelName}}from "./Model.js"
    
 /**
  * @description Get all ${modelName}s
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  */
 export const index = async (req, res, next) => {
   try {
     const ${moduleName} = await ${modelName}.findAll();
     res.status(200).json(${moduleName});
   } catch (error) {
     next(error);
   }
 };
 
 /**
  * @description Get a single ${modelName}
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  * @returns {Promise<void>}
  */
 export const show = async (req, res, next) => {
   try {
     const ${moduleName} = await ${modelName}.findByPk(req.params.id);
     if (!user) {
       throw { status: 404, message: "User not found" };
     }
     res.status(200).json(${moduleName});
   } catch (error) {
     next(error);
   }
 };
 
 /**
  * @description Create a new ${modelName}
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  * @returns {Promise<void>}
  */
 export const store = async (req, res, next) => {
   try {
     const ${moduleName} = await ${modelName}.create(req.body, {
       validate: true,
     });
     res.status(201).json(${moduleName});
   } catch (error) {
     next(error);
   }
 };
 
 /**
  * @description Update a ${modelName}
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  * @returns {Promise<void>}
  */
 export const update = async (req, res, next) => {
   try {
     const ${moduleName} = await User.findByPk(req.params.id);
     if (!${moduleName}) {
       throw { status: 404, message: "${modelName} not found" };
     }
     await ${modelName}.update(req.body);
     res.status(200).json(${moduleName});
   } catch (error) {
     next(error);
   }
 };
 
 /**
  * @description Delete a ${modelName}
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  * @returns {Promise<void>}
  */
 
 export const destroy = async (req, res, next) => {
   try {
     const ${moduleName} = await ${modelName}.findByPk(req.params.id);
     if (!${moduleName}) {
       throw { status: 404, message: "${modelName} not found" };
     }
     await ${modelName}.destroy();
     res.status(204).json();
   } catch (error) {
     next(error);
   }
 };
 
 export default { index, show, store, update, destroy };

`;

const emptyControllerContent = `
   /**
  * @description Get all ${modelName}s
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  */
 export const index = async (req, res, next) => {
   try {
     res.status(200).json({data: "All ${modelName}s"});
   } catch (error) {
     next(error);
   }
 };
 
 /**
  * @description Get a single ${modelName}
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  * @returns {Promise<void>}
  */
 export const show = async (req, res, next) => {
   try {
     res.status(200).json({data: "Single ${modelName}"});
   } catch (error) {
     next(error);
   }
 };
 
 /**
  * @description Create a new ${modelName}
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  * @returns {Promise<void>}
  */
 export const store = async (req, res, next) => {
   try {
     res.status(201).json({data: "Create new ${modelName}"});
   } catch (error) {
     next(error);
   }
 };
 
 /**
  * @description Update a ${modelName}
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  * @returns {Promise<void>}
  */
 export const update = async (req, res, next) => {
   try {
     res.status(200).json({data: "Update ${modelName}"});
   } catch (error) {
     next(error);
   }
 };
 
 /**
  * @description Delete a ${modelName}
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  * @returns {Promise<void>}
  */
 
 export const destroy = async (req, res, next) => {
   try {
     res.status(204).json({data: "Delete ${modelName}"});
   } catch (error) {
     next(error);
   }
 };


export default { index, show, store, update, destroy };
`;

const content = fs.existsSync(`src/modules/${modelName}/Model.js`) ? controllerContent : emptyControllerContent;


cf(`src/modules/${modelName}`, "Controller.js", content);

console.log( `Controller created successfully at src/modules/${modelName}/Controller.js`);
