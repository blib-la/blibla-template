/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/admin/[[...index]].tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { internationalizedArray } from "sanity-plugin-internationalized-array";

import index18Next from "./next-i18next.config";

import { apiVersion, dataset, projectId } from "~/sanity/lib/api";
import { schema } from "~/sanity/schemas";

const languages = index18Next.i18n.locales.map(locale => ({
	id: locale,
	title: locale.toUpperCase(),
}));

export default defineConfig({
	basePath: "/admin",
	name: "blibla-template",
	title: "Blibla",
	projectId,
	dataset,
	// Edit schemas in './src/ions/sanity/schemas'
	schema,
	plugins: [
		deskTool({
			// `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
			// You can add any React component to `S.view.component` and it will be rendered in the pane
			// and have access to content in the form in real-time.
			// It's part of the Studio's “Structure Builder API” and is documented here:
			// https://www.sanity.io/docs/structure-builder-reference
		}),
		// Vision lets you query your content with GROQ in the studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
		internationalizedArray({
			languages,
			// See: https://github.com/sanity-io/sanity-plugin-internationalized-array/issues/47
			// defaultLanguages: [index18Next.i18n.defaultLocale],
			fieldTypes: ["string", "text", "seo", "blockContent"],
		}),
	],
});
