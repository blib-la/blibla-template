import dynamic from "next/dynamic";

import type { PageDocument } from "~/sanity/lib/types";

const LandingPageTemplate = dynamic(() =>
	import("@/templates/landing-page").then(module_ => module_.LandingPageTemplate)
);
const TextPageTemplate = dynamic(() =>
	import("@/templates/text-page").then(module_ => module_.TextPageTemplate)
);
const ParentPageTemplate = dynamic(() =>
	import("@/templates/parent-page").then(module_ => module_.ParentPageTemplate)
);

export function TemplateSwitch({ page }: { page: PageDocument }) {
	switch (page.template) {
		case "0": {
			return <TextPageTemplate page={page} />;
		}

		case "1": {
			return <LandingPageTemplate page={page} />;
		}

		case "2": {
			return <ParentPageTemplate page={page} />;
		}

		default: {
			return <div>No template available</div>;
		}
	}
}
