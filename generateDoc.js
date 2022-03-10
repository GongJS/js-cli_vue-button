var fs = require("fs");
var log = require("npmlog");
var exec = require("child_process").exec;
var del = require("del");
function execute(command, callback) {
  exec(command, function (error, stdout, stderr) {
    callback(stdout);
  });
}
function walkSync(currentDirPath, callback) {
  var fs = require("fs"),
    path = require("path");
  fs.readdirSync(currentDirPath).forEach(function (name) {
    var filePath = path.join(currentDirPath, name);
    var stat = fs.statSync(filePath);
    if (stat.isFile()) {
      callback(filePath, stat);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}
execute("npx vuese gen", function (data) {
  walkSync("website/components", function (filePath, stat) {
    if (!filePath.includes("Layout.md")) {
      let data = fs.readFileSync(`./${filePath}`, "utf8");
      data = data.replace(/<!-- @vuese.*-->/g, "");
      fs.writeFile("./README.md", data, function (err) {
        if (err) {
          throw err;
        }
        log.info("Docgen", "README.MD 文档生成成功");
        del.sync(["website"]);
      });
    }
  });
});
