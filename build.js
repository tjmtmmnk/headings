const path = require("path");

const srcDir = path.join(__dirname, "src");

require("esbuild")
  .build({
    define: { "process.env.NODE_ENV": process.env.NODE_ENV ? true : false },
    target: "es2020",
    platform: "browser",
    entryPoints: [
      path.join(srcDir, "popup.tsx"),
      path.join(srcDir, "options.tsx"),
      path.join(srcDir, "background.ts"),
      path.join(srcDir, "content_script.tsx"),
    ],
    outdir: path.join(__dirname, "public/js"),
    bundle: true,
    minify: true,
    watch: {
      onRebuild(error, result) {
        if (error) console.error("build failed:", error);
        else console.log("build succeeded");
      },
    },
  })
  .catch((err) => console.log(err));
