export default `
const getJSON = require("async-get-json");

await getJSON("https://storage.googleapis.com/maps-devrel/google.json");
`;