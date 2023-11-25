import humanizeString from "humanize-string";
import dynamic from "next/dynamic";

import type { Slot } from "~/sanity/lib/types";

const SimpleText = dynamic(() =>
	import("@/organisms/slot/simple-text").then(module_ => module_.SimpleText)
);
const RichText = dynamic(() =>
	import("@/organisms/slot/rich-text").then(module_ => module_.RichText)
);
const Spotlight = dynamic(() =>
	import("@/organisms/slot/spotlight").then(module_ => module_.Spotlight)
);
const SpotImage = dynamic(() =>
	import("@/organisms/slot/spot-image").then(module_ => module_.SpotImage)
);
const Promoted = dynamic(() =>
	import("@/organisms/slot/promoted").then(module_ => module_.Promoted)
);
const Slideshow = dynamic(() =>
	import("@/organisms/slot/slideshow").then(module_ => module_.Slideshow)
);

const Tiles = dynamic(() => import("@/organisms/slot/tiles").then(module_ => module_.Tiles));

export function SlotSwitch({ slot, even }: { slot: Slot; even?: boolean }) {
	switch (slot._type) {
		case "simpleText": {
			return <SimpleText slot={slot} />;
		}

		case "richText": {
			return <RichText slot={slot} />;
		}

		case "spotlight": {
			return <Spotlight slot={slot} even={even} />;
		}

		case "promoted": {
			return <Promoted slot={slot} />;
		}

		case "slideshow": {
			return <Slideshow slot={slot} />;
		}

		case "spotImage": {
			return <SpotImage slot={slot} />;
		}

		case "tiles": {
			return <Tiles slot={slot} />;
		}

		default: {
			return <div>No slot available for {humanizeString((slot as Slot)._type)}</div>;
		}
	}
}
