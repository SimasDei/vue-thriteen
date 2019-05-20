module.exports = {
	env: {
		browser: true,
		commonjs: true,
		node: true,
	},
	extends: "eslint:recommended",
	parser: "babel-eslint",
	parserOptions: {
		ecmaVersion: 5,
	},
	rules: {
		"no-console": 0,
		"no-undef": 0,
		indent: ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
	plugins: ["html"],
};
