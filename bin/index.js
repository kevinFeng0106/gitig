var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_cac = __toESM(require("cac"));
var import_node_fetch = __toESM(require("node-fetch"));
var import_fs = __toESM(require("fs"));
var cli = (0, import_cac.default)("gitig");
var genTypeWhiteList = ["frontend"];
var RAW_FILE_URL = "https://gitee.com/lord-moon/gitig-template/raw/master";
cli.command("gen <type>", "Create a new .gitignore file with the specified type").action(async (type) => {
  console.log("[gitig]: Generating .gitignore file with type " + type + " ...");
  if (!genTypeWhiteList.includes(type)) {
    throw new Error("[gitig]: Invalid type, please check the type list.");
  }
  ;
  const targetRawFileUrl = `${RAW_FILE_URL}/${type}/general_gitignore.txt`;
  console.log(`[gitig]: Downloading .gitignore file from ${targetRawFileUrl} ...`);
  const reponse = await (0, import_node_fetch.default)(targetRawFileUrl, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain"
    }
  });
  const text = await reponse.text();
  const cwd = process.cwd();
  console.log("[gitig]: Writing .gitignore file to " + cwd + " ...");
  import_fs.default.writeFileSync(`${cwd}/.gitignore`, text);
});
cli.help();
cli.parse();
