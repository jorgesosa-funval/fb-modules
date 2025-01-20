import cf from "../utils/fc.js";
import getNames from "../utils/getNames.js";

const [moduleName, modelName] = getNames();

const modelContent = `import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/sequelize.js";

export class ${modelName} extends Model {}

${modelName}.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // add your columns here
    },
    {
        sequelize,
        modelName: "${moduleName}",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);
`;

cf(`src/modules/${modelName}`, "Model.js", modelContent);

console.log(`Model created successfully at src/modules/${modelName}/Model.js`);
