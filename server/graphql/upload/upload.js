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

module.exports = async (file) => {
  if (file) {
    const { createReadStream, filename } = await file;
    const { ext } = path.parse(filename);
    const randomName = generateRandomString(12) + ext;
    const stream = createReadStream();
    const pathName = path.join(
      __dirname,
      `../../static/problemFiles/${randomName}`
    );
    await stream.pipe(fs.createWriteStream(pathName));
    return "static/problemFiles/" + randomName;
  } else {
    throw new Error("No file given");
  }
};
