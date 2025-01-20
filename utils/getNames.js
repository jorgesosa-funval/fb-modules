export function getNames() {
  const moduleName = process.argv[2].toLocaleLowerCase();

  if (!moduleName) {
    console.error("Please provide a module name");
    process.exit(1);
  }

  const modelName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

  return [moduleName, modelName];
}
 

export default getNames;

