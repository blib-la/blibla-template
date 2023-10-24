import { Then } from "@cucumber/cucumber";

Then("debug", async () => {
	// eslint-disable-next-line no-debugger
	debugger;
});
