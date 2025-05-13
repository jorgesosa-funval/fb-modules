import cf from "../utils/fc.js";
import getNames from "../utils/getNames.js";
import registerItem from "../utils/registerItem.js";

const [moduleName, modelName] = getNames();

const modelContent = `import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../database/sequelize.js";

export class ${modelName} extends Model {}

${modelName}.init(
    {
        id: {
            /**
             * Configuración del campo id: 🚀
             * - **type**: 'DataTypes.BIGINT.UNSIGNED' 🛠️
             *   - Utilizado para almacenar números enteros grandes. 📊
             *   - 'UNSIGNED' permite solo valores positivos. ➕
             *   - Nota: Usa el mismo tipo de dato para llaves foráneas (ej: 'id BIGINT UNSIGNED'). 🔑
             * - **autoIncrement**: true 🔄
             *   - Incrementa automáticamente el valor cada vez que se inserta un nuevo registro. 📈
             * - **primaryKey**: true 🏷️
             *   - Define este campo como la clave primaria de la tabla. 🗂️
            */
          
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },

        // add your columns here ✍️

        created_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false, 
        },

        updated_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"), 
            allowNull: false, 
        },

    },
    {
        sequelize,
        modelName: "${moduleName}",
        timestamps: false, 
    }
);
`;

cf(`src/modules/${modelName}`, "Model.js", modelContent);

console.log(`Model created successfully at src/modules/${modelName}/Model.js`);

registerItem(`src/database/migrations/migrations.js`, "migrations", modelName);
