import path from "path";
import { pathToFileURL } from "url";

const migrationsPath = path.resolve("src/database/migrations/migrations.js");
const { migrations } = await import(pathToFileURL(migrationsPath).href);
const [, , migration, method] = process.argv;
const methods = ["--up", "--down", "--refresh"];

/**
 * Runs the database migrations for a specified model.
 *
 * @async
 * @function runMigrations
 * @param {string} migration - The name of the migration/model to be synchronized.
 * @returns {Promise<void>} Resolves when the migration is successfully run.
 * @throws {Error} Logs an error if the migration process fails.
 */
export const runMigrations = async (migration) => {
  try {
    const modulePath = path.resolve(`src/modules/${migration}/Model.js`);
    const moduleURL = pathToFileURL(modulePath).href;
    const module = await import(moduleURL);
    const model = module[migration];
    await model.sync({ force: true });

    // Check if the column 'created_at' exists before altering it
    const [results] = await model.sequelize.query(
      `SHOW COLUMNS FROM ${model.getTableName()} LIKE 'created_at'`
    );

    if (results.length > 0) {
      // Alter column created_at to have CURRENT_TIMESTAMP as default
      await model.sequelize.query(
        `ALTER TABLE ${model.getTableName()} MODIFY created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
      );

      // Alter column updated_at to have CURRENT_TIMESTAMP as default
      await model.sequelize.query(
        `ALTER TABLE ${model.getTableName()} MODIFY updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`
      );
    }

    console.log(`✅ The table for the ${migration} model was just created!`);
  } catch (error) {
    console.error(
      `❌ Unable to synchronize the models for ${migration}:`,
      error.message
    );
  }
};

/**
 * Deletes the database table associated with the specified migration model.
 *
 * @async
 * @function downMigrations
 * @param {string} migration - The name of the migration model to be dropped.
 * @returns {Promise<void>} Resolves when the table is successfully deleted.
 * @throws {Error} Logs an error message if the table cannot be dropped.
 */
export const downMigrations = async (migration) => {
  try {
    const modulePath = path.resolve(`src/modules/${migration}/Model.js`);
    const moduleURL = pathToFileURL(modulePath).href;
    const module = await import(moduleURL);
    const model = module[migration];

    // Drop the table
    await model.drop({ cascade: true });

    console.log(`✅ The table for the ${migration} model was just deleted!`);
  } catch (error) {
    console.error(
      `❌ Unable to drop the models for ${migration}:`,
      error.message
    );
  }
};

/**
 * Executes database migration scripts based on the specified method.
 *
 * @param {string} migration - The name or path of the migration to be executed.
 * @param {string} method - The migration method to execute.
 */
export async function run(migration, method) {
  try {
    switch (method) {
      case "--up":
        await runMigrations(migration);
        break;
      case "--down":
        await downMigrations(migration);
        break;
      case "--refresh":
        await downMigrations(migration);
        await runMigrations(migration);
        break;
      default:
        console.error(
          "❌ Invalid method. Please use one of the following: --up, --down, --refresh"
        );
    }
  } catch (error) {
    console.error(
      `❌ An error occurred while running the migration for ${migration}:`,
      error.message
    );
  }
}

/**
 * Validates the provided migration method and migration name, and executes the appropriate migration(s).
 */
export async function validate() {
  try {
    let selectedMethod = method || "--up";

    if (method && !methods.includes(method)) {
      console.error(
        "❌ Invalid method. Please provide one of the following: --up, --down, --refresh"
      );
      return;
    }

    if (!migration || migration.includes("--")) {
      const array =
        selectedMethod === "--up" ? migrations : migrations.reverse();
      for (const migration of array) {
        await run(migration, selectedMethod);
      }
      return;
    }

    if (!migrations.includes(migration)) {
      console.error(
        "❌ Invalid migration name. Please provide a valid migration."
      );
      return;
    }

    await run(migration, selectedMethod);
  } catch (error) {
    console.error(
      "❌ An unexpected error occurred during validation:",
      error.message
    );
  }
}

await validate();
