import cf from "../utils/fc.js";
import getNames from "../utils/getNames.js";
import registerItem from "../utils/registerItem.js";

const [moduleName, modelName] = getNames();

const modelContent = `import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../database/sequelize.js";

export class ${modelName} extends Model {}

/**
     * Configuración del campo id: 🚀
     *   - **type**: 'DataTypes.BIGINT.UNSIGNED' 🛠️
     *   - Utilizado para almacenar números enteros grandes. 📊
     *   - 'UNSIGNED' permite solo valores positivos. ➕
     *   - Nota: Usa el mismo tipo de dato para llaves foráneas (ej: 'id BIGINT UNSIGNED'). 🔑
     *   - **autoIncrement**: true 🔄
     *   - Incrementa automáticamente el valor cada vez que se inserta un nuevo registro. 📈
     *   - **primaryKey**: true 🏷️
     *   - Define este campo como la clave primaria de la tabla. 🗂️
*/
${modelName}.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        // add your columns here ✍️ 

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

registerItem(`src/database/migrations/migrations.js`, "migrations", modelName);
