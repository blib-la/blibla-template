function getWorldParameters() {
	return {
		foo: "bar",
	};
}

const config = {
	requireModule: ["ts-node/register"],
	require: ["cucumber/**/*.ts"],
	format: [
		"json:reports/cucumber-report.json",
		"html:reports/report.html",
		"summary",
		"progress-bar",
	],
	formatOptions: { snippetInterface: "async-await" },
	worldParameters: getWorldParameters(),
};

config.format.push("@cucumber/pretty-formatter");

export default config;
