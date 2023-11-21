const fs = require("fs");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

function parseGroupName(name) {
  const result = name.replaceAll("-", " ").toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
}

async function run() {
  const output = await exec("npm run generate");
  const suggestions = output.stdout.split("navigation object suggestion:")[1];
  const endpoints = JSON.parse(suggestions);
  for (const endpoint of endpoints) {
    endpoint.group = parseGroupName(endpoint.group);
  }

  const mintJsonTemplate = fs.readFileSync("mint.json.template");
  const mintJson = JSON.parse(mintJsonTemplate);
  const apiReference = mintJson.navigation.find(
    (g) => g.group === "API Reference"
  );
  apiReference.pages = endpoints;

  fs.writeFileSync("mint.json", JSON.stringify(mintJson));
}

run();
