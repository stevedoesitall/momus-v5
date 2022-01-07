import child_process from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

// Remove the build folder
fs.rmSync("./build", {
  recursive: true,
  force: true
});

// Compile to TypeScript
child_process.execSync("tsc");

// Build the public direectory
fs.mkdirSync("./build/public/");
fs.copyFileSync("./web/index.html", "./build/public/index.html");

// Convert SCSS files
child_process.execSync(
  "sass web/public/styles/scss/global.scss web/public/styles/css/global.css"
);

// Remove unnecessary CSS
fs.mkdirSync("./build/public/assets/");
fs.unlinkSync("./web/public/styles/index.css");
fs.mkdirSync("./web/public/styles/purged");

child_process.execSync(
  "purgecss --css web/public/styles/css/*.css --content web/index.html web/src/App.svelte web/src/**/*.svelte --output web/public/styles/purged"
);

// Concatenate the purged CSS files
fs.writeFileSync("./web/public/styles/index.css", "");

const publicStyleFiles = fs.readdirSync("./web/public/styles/css/");

publicStyleFiles.forEach((file) => {
  if (!file.includes("final.") && !file.includes(".map")) {
    const filePathPurged = `./web/public/styles/purged/${file}`;
    const contents = fs.readFileSync(filePathPurged, "utf-8");
    fs.appendFileSync("./web/public/styles/index.css", contents + "\n");
  }

  if (file.includes("global.css")) {
    const filePath = `./web/public/styles/css/${file}`;
    fs.unlinkSync(filePath);
  }
});

// Delete the purged folder
fs.rmSync("./web/public/styles/purged", {
  recursive: true,
  force: true
});

// Bundle JS and CSS files
build({
  entryPoints: ["./web/src/main.js"],
  bundle: true,
  minify: true,
  outfile: "./build/public/assets/bundle.js",
  sourcemap: true,
  platform: "browser",
  plugins: [
    esbuildSvelte({
      preprocess: sveltePreprocess()
    })
  ]
}).catch(() => process.exit(1));

// Copy images folder
const copyFolderSync = (from, to) => {
  fs.mkdirSync(to);
  fs.readdirSync(from).forEach((file) => {
    if (fs.lstatSync(path.join(from, file)).isFile()) {
      fs.copyFileSync(path.join(from, file), path.join(to, file));
    } else {
      copyFolderSync(path.join(from, file), path.join(to, file));
    }
  });
};

copyFolderSync("./web/public/images/", "./build/public/images/");