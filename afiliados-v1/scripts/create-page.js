const args = process.argv.slice(2);
const htmlDefault = `
@@include('./includes/header.html', {"style": "href='./css/pages/${args[0]}.css'",
"title": "${args[0]}"})

@@include('./includes/footer.html', {"script": "src='./js/pages/${args[0]}.js'"})
`;

const fs = require("fs");
fs.writeFile(`./${args[0]}.html`, htmlDefault, function (err) {
	if (err) {
		return console.log(err);
	}
});
fs.writeFile(
	`./scss/pages/${args[0]}.scss`,
	`@import '../main/variables';
  @import '../main/mixins';`,
	function (err) {
		if (err) {
			return console.log(err);
		}
	}
);
fs.writeFile(`./js/pages/${args[0]}.js`, '"use strict";', function (err) {
	if (err) {
		return console.log(err);
	}
});

console.log("Arquivos criados");
