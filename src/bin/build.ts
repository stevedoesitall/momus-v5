import child_process from "node:child_process";
import fs from "node:fs";
import path from "node:path";

// Remove the build folder
fs.rmSync("./build", {
  recursive: true,
  force: true
});

// Compile to TypeScript
child_process.execSync("tsc");

// Convert SCSS files
child_process.execSync(
  "sass public/styles/scss/global.scss public/styles/css/global.css"
);

// Remove unnecessary CSS
fs.mkdirSync("./build/public/styles/");
fs.unlinkSync("./public/styles/index.css");
fs.mkdirSync("./public/styles/purged");

child_process.execSync(
  "purgecss --css public/styles/css/*.css --content views/layout.ejs views/**/*.ejs --output public/styles/purged"
);

// Concatenate the purged CSS files
fs.writeFileSync("./public/styles/index.css", "");

const publicStyleFiles = fs.readdirSync("./public/styles/css/");

publicStyleFiles.forEach((file) => {
  if (!file.includes("final.") && !file.includes(".map")) {
    const filePathPurged = `./public/styles/purged/${file}`;
    const contents = fs.readFileSync(filePathPurged, "utf-8");
    fs.appendFileSync("./public/styles/index.css", contents + "\n");
  }

  if (file.includes("global.css")) {
    const filePath = `./public/styles/css/${file}`;
    fs.unlinkSync(filePath);
  }
});

// Delete the purged folder
fs.rmSync("./public/styles/purged", {
  recursive: true,
  force: true
});

// Bundle JS and CSS files
child_process.execSync(
  "esbuild ./build/public/scripts/index.js --bundle --outfile=./build/public/scripts/bundle.js --minify --sourcemap --target=chrome58,firefox57,safari11,edge16 --format=esm"
);
child_process.execSync(
  "esbuild ./public/styles/index.css --bundle --outfile=./build/public/styles/bundle.css --minify --sourcemap"
);

// Remove unnecessary files after bundling
const buildStyleFiles = fs.readdirSync("./build/public/styles/");

buildStyleFiles.forEach((file) => {
  const filePath = `./build/public/styles/${file}`;
  if (!file.includes("bundle.")) {
    fs.unlinkSync(filePath);
  }
});

const buildScriptFiles = fs.readdirSync("./build/public/scripts/ts");

buildScriptFiles.forEach((file) => {
  const filePath = `./build/public/scripts/ts/${file}`;
  if (!file.includes("bundle.")) {
    fs.unlinkSync(filePath);
  }
});

// Copy images and views folders
const copyFolderSync = (from: string, to: string): void => {
  fs.mkdirSync(to);
  fs.readdirSync(from).forEach((element) => {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
};

copyFolderSync("./public/images/", "./build/public/images/");
copyFolderSync("./views/", "./build/views/");
