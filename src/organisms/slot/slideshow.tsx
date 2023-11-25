import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/joy/IconButton";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { wrap } from "popmotion";
import { useState } from "react";

import { Box } from "@/molecules/box";
import { SanityNextImage } from "@/molecules/image";
import { isPost } from "~/sanity/lib/types";
import type { PostModel, SlideshowSlot, StageModel } from "~/sanity/lib/types";

export const variants = {
	enter(direction: number) {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit(direction: number) {
		return {
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
};
export const swipeConfidenceThreshold = 10_000;

export function swipePower(offset: number, velocity: number) {
	return Math.abs(offset) * velocity;
}

export function Slideshow({ slot }: { slot: SlideshowSlot }) {
	const [[page, direction], setPage] = useState([0, 0]);
	const imageIndex = wrap(0, slot.slides.length, page);

	function paginate(newDirection: number) {
		setPage([page + newDirection, newDirection]);
	}

	const currentSlide = slot.slides[imageIndex];

	return (
		<Box sx={{ position: "relative", aspectRatio: 16 / 9, overflow: "visible" }}>
			<AnimatePresence initial={false} custom={direction}>
				<motion.div
					key={page}
					custom={direction}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					drag="x"
					style={{ position: "absolute", inset: 0 }}
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={1}
					transition={{
						x: { type: "spring", stiffness: 300, damping: 30 },
						opacity: { duration: 0.2 },
					}}
					onDragEnd={(_event, { offset, velocity }) => {
						const swipe = swipePower(offset.x, velocity.x);

						if (swipe < -swipeConfidenceThreshold) {
							paginate(1);
						} else if (swipe > swipeConfidenceThreshold) {
							paginate(-1);
						}
					}}
				>
					{imageIndex}
					<SanityNextImage
						image={
							(currentSlide as PostModel).mainImage ??
							(currentSlide as StageModel).darkImage
						}
					/>
					{isPost(currentSlide) ? (
						<Link passHref legacyBehavior href={`/blog/${currentSlide.slug}`}>
							<Sheet
								component="a"
								sx={{ position: "absolute", left: 0, bottom: 0, m: 2, p: 2 }}
							>
								<Typography level="h1" component="h2">
									{currentSlide.headline}
								</Typography>
							</Sheet>
						</Link>
					) : (
						<Sheet sx={{ position: "absolute", left: 0, bottom: 0, m: 2, p: 2 }}>
							<Typography level="h1" component="h2">
								{currentSlide.headline}
							</Typography>
						</Sheet>
					)}
				</motion.div>
			</AnimatePresence>
			<IconButton
				sx={{
					position: "absolute",
					top: "50%",
					left: 0,
					zIndex: 1,
					borderRadius: 0,
					transform: "translateY(-50%)",
				}}
				onClick={() => paginate(-1)}
			>
				<ArrowBackIosNewIcon />
			</IconButton>
			<IconButton
				sx={{
					position: "absolute",
					top: "50%",
					right: 0,
					zIndex: 1,
					borderRadius: 0,
					transform: "translateY(-50%)",
				}}
				onClick={() => paginate(1)}
			>
				<ArrowForwardIosIcon />
			</IconButton>
		</Box>
	);
}
