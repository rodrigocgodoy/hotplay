/* eslint-disable no-undef */
const { name } = require("browser-sync");
const packageJson = require("./package.json");
const fs = require("fs");
const path = require("path");
const directoryPath = path.join(__dirname, "");
const includeDirectoryPath = path.join(__dirname, "/includes");

fs.readdir(directoryPath, (err, files) => {
	files = files.filter((x) => x.includes(".html"));

	const filesToExclude = ["header.html", "footer.html", "404.html"];
	for (let index = 0; index < files.length; index++) {
		let file = files[index];
		let text = fs.readFileSync(file).toString("utf-8");
		// #region adiciona comandos padroes do php ao codigo, com exceção de algumas paginas
		if (!file.includes(filesToExclude)) {
			let outputName = file.replace(".html", "").replace("-", " ");
			let fileName = file.replace(".html", "");

			outputName = outputName + outputName.slice(1);
			if (
				outputName != "header" &&
				outputName != "footer" &&
				outputName != "404"
			) {
				const indexInclude = text.indexOf('"})');
				text = text.slice(indexInclude + 3, text.length);

				text = `<?php
        // Template Name: ${outputName}
     ?>

     <?php get_header('', array('style' => '${fileName}')); ?>

     ${text}

     <?php get_footer(); ?>
     `;
			}
		}
		// #endregion
		text = text.replace("@@include('./includes/footer.html')", "");
		text = text.replace(/.min.css"/gi, '.css"');
		text = text.replace(/.css"/gi, '.min.css"');
		text = text.replace(/.min.js"/gi, '.js"');
		text = text.replace(/.js"/gi, '.min.js"');
		file = file.replace("html", "php");
		fs.writeFileSync(file, text);
		console.log(`${file} convertido`);
		file = file.replace("php", "html");
		fs.unlinkSync(file);
	}

	const fileFunctions = `<?php

  // Funções para Limpar o Header
  remove_action('wp_head', 'rsd_link');
  remove_action('wp_head', 'wlwmanifest_link');
  remove_action('wp_head', 'start_post_rel_link', 10, 0 );
  remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
  remove_action('wp_head', 'feed_links_extra', 3);
  remove_action('wp_head', 'wp_generator');
  remove_action('wp_head', 'print_emoji_detection_script', 7);
  remove_action('admin_print_scripts', 'print_emoji_detection_script');
  remove_action('wp_print_styles', 'print_emoji_styles');
  remove_action('admin_print_styles', 'print_emoji_styles');

?>`;
	fs.writeFileSync("functions.php", fileFunctions);
	const fileStyleCss = `/*
    Theme Name: ${packageJson.name}
    Theme URI: Url do Projeto
    Author: ${packageJson.author}
    Author URI: Site do Autor
    Description: ${packageJson.description}
*/`;
	fs.writeFileSync("style.css", fileStyleCss);
});

fs.readdir(includeDirectoryPath, (err, includeFiles) => {
	includeFiles = includeFiles.filter((x) => x.includes(".html"));

	for (let index = 0; index < includeFiles.length; index++) {
		let file = "./includes/" + includeFiles[index];
		let backupFile = "./includes/" + includeFiles[index];

		let text = fs.readFileSync(file).toString("utf-8");

		text = text.replace(/.min.css"/gi, '.css"');
		text = text.replace(/.css"/gi, '.min.css"');
		text = text.replace(/.min.js"/gi, '.js"');
		text = text.replace(/.js"/gi, '.min.js"');
		file = file.replace("html", "php");

		if (file.includes("header.php") || file.includes("footer.php")) {
			file = file.replace("./includes/", "");

			if (file.includes("header.php")) {
				const index = text.indexOf("</head>");

				text =
					text.slice(0, index) +
					"<?php wp_head() ?>" +
					text.slice(index);

				//text = text.replace("@@style", '<?php echo $args["style"]; ?>');
				text = text.replace('@@style', '<?php echo get_template_directory_uri() . "/css/pages/" . $args["style"] . ".min.css"; ?>');
				text = text.replace("@@title", "");
			}

			if (file.includes("footer.php")) {
				const index = text.indexOf("</body>");
				text =
					text.slice(0, index) +
					"<?php wp_footer() ?>" +
					text.slice(index);
			}
		}

		fs.writeFileSync(file, text);
		console.log(`${file} convertido`);

		fs.unlinkSync(backupFile);
	}
});
