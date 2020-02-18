/* eslint-disable @typescript-eslint/no-var-requires */
function bindings(pkg) {
  return require(`../build/Release/${pkg}.node`);
}
export default bindings;
