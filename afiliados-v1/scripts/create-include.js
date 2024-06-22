const args = process.argv.slice(2);
const htmlDefault = ``;

const fs = require("fs");
fs.writeFile(`./includes/${args[0]}.html`, htmlDefault, function (err) {
	if (err) {
		return console.log(err);
	}
});
fs.writeFile(
	`./scss/components/${args[0]}.scss`,
	`@import '../main/variables';
  @import '../main/mixins';`,
	function (err) {
		if (err) {
			return console.log(err);
		}
	}
);
fs.writeFile(`./js/components/${args[0]}.js`, '"use strict";', function (err) {
	if (err) {
		return console.log(err);
	}
});

console.log("Arquivos criados");
