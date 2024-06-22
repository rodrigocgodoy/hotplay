const { exec } = require("child_process");
const fs = require("fs");

fs.rm("./build", { recursive: true }, (error) => {
	if (error) {
		console.log(`error: ${error.message}`);
		return;
	}

	console.log("Deletado com sucesso");

	exec("yarn gulp build", (error) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		console.log("Comando rodado com sucesso");
	});
});
