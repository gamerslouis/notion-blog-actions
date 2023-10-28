const { extname, join } = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { Request } = require("picgo");

function LocalMigrate(conf) {
  this.log = {
    info: console.log,
    success: console.log,
    error: console.error,
    warn: console.warn,
  };
  this.getConfig = () => undefined;
  this.setConfig = (cfg) => undefined;
  this.upload = (toUploadImgs) => {
    return toUploadImgs.map((item) => {
      console.log(item)
      let ext = extname(item.fileName);
      item.fileName =
      crypto.createHash("md5").update(item.buffer).digest("hex") + ext;
      
      fs.mkdirSync(conf.local.path, { recursive: true }, (err) => {
        if (err) throw err;
      });
      
      fs.writeFileSync(join(conf.local.path, item.fileName), item.buffer);
      
      let urlBase = conf.local.urlBase;
      if (!urlBase.endsWith("/")) {
        urlBase += "/";
      }
      
      return {
        origin: item.origin,
        imgUrl: urlBase + item.fileName,
      };
    });
  };
  let r = new Request(this)
  this.request = r.request.bind(r);
}

module.exports = LocalMigrate;
