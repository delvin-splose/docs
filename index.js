const fs = require("fs");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

function parseGroupName(name) {
  const result = name.replaceAll("-", " ").toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
}

async function run() {
  const output = await exec("npm run generate");
}

run();
