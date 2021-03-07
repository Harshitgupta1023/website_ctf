const path = require("path");
const fs = require("fs");
function generateRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = async (file, folder) => {
  if (file) {
    const { createReadStream, filename } = await file;
    const { ext } = path.parse(filename);
    const randomName = generateRandomString(12) + ext;
    const stream = createReadStream();
    const pathName = path.join(
      __dirname,
      `../../static/${folder}/${randomName}`
    );
    await stream.pipe(fs.createWriteStream(pathName));
    return `static/${folder}/${randomName}`;
  } else {
    throw new Error("No file given");
  }
};
