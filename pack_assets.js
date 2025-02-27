const fs = require("fs/promises");

async function fileToBase64(filePath) {
    try {
        // Read the file as a buffer
        const fileBuffer = await fs.readFile(filePath);

        // Convert to Base64
        const base64String = fileBuffer.toString("base64");

        //console.log("Base64 Output:", base64String);
        return base64String;
    } catch (error) {
        console.error("Error reading file:", error);
    }
}

// Example usage
let bunRuntime =  await fileToBase64("assets/bun")
//console.log("Base64 Output:", bunRuntime);
let a="d"
await Bun.write("loader.js", `
async function saveBase64ToFile(base64String, outputPath) {
  const binaryData = Buffer.from(base64String, "base64");
  await Bun.write(outputPath, binaryData);
  console.log("File saved successfully: " + outputPath);
}

const base64Data = "SGVsbG8gd29ybGQ=";
saveBase64ToFile(base64Data, "output.txt");

let x="${bunRuntime}"
//await Bun.write("bun","ls")
saveBase64ToFile(x, "bun");
const process = Bun.spawn(["chmod", "+x", "bun"], {
  stdout: "pipe",
  stderr: "pipe",
});

const output = await new Response(process.stdout).text();
console.log(output);

`
);
console.log("File saved successfully!");
