export function getNames() {
  const moduleName = process.argv[2].toLocaleLowerCase();

  if (!moduleName) {
    console.error("Please provide a module name");
    process.exit(1);
  }

  const modelName = moduleName.includes('_')
    ? moduleName.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('_')
    : moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

  return [moduleName, modelName];
}
 

export default getNames;

