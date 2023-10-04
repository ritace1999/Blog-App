import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileRemover = (filename) => {
  fs.unlink(path.join(__dirname, "../uploads", filename), function (err) {
    if (err && err.code == "ENOENT") {
      // if file doesn't exist
      console.log(`File${filename} doesn't exist`);
    } else if (err) {
      console.log(`Error occured while trying to remove file${filename}`);
    } else {
      console.log("File removed");
    }
  });
};

export { fileRemover };
