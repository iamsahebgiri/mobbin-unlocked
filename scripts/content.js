const button = document.createElement("button");
button.className =
	"fixed bottom-20 flex h-44 items-center justify-center gap-x-8 px-12 rounded-[22px] bg-bg-tertiary text-fg-primary focus-visible:ring-4 focus-visible:ring-blue-200/50";
button.style.left = "20px";
button.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="h-20 w-20 flex-shrink-0">
    <path fill="currentColor" d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2m6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m0 12H6V10h12z"/>
  </svg>
`;

const hideBanner = () => {
	document.querySelector("aside")?.remove();
};

const upscaleImages = (node) => {
	const images = node.querySelectorAll("img");

	for (let i = 0; i < images.length; i++) {
		const url = new URL(images[i].src);
		if (
			url.hostname === "bytescale.mobbin.com" &&
			url.pathname.includes("app_screens")
		) {
			const modUrl = new URL(url.pathname, url.origin);
			modUrl.searchParams.set("f", "webp");
			modUrl.searchParams.set("w", "1920");
			modUrl.searchParams.set("q", "85");
			modUrl.searchParams.set("fit", "shrink-cover");
			images[i].src = modUrl.toString();

			// get the parent div of the image and remove the blur effect
			const parent = images[i].parentNode;
			parent.className =
				"grow after:absolute after:inset-0 after:rounded-[--border-radius] after:shadow-image-inset";
		}
	}
};

button.onclick = () => {
	//   const lastFlowsGrid = [
	//     ...document.querySelectorAll('[data-sentry-component="FlowsGrid"]'),
	//   ]?.at(-1);
	//   const lastScreenGrid = [
	//     ...document.querySelectorAll('[data-sentry-component="ScreensGrid"]'),
	//   ]?.at(-1);

	const body = document.querySelector("body");

	const observer = new MutationObserver((mutationsList) => {
		for (const mutation of mutationsList) {
			if (mutation.type === "childList") {
				upscaleImages(body);
				hideBanner();
			}
		}
	});

	observer.observe(body, { childList: true, subtree: true });

	//   if (lastFlowsGrid) {
	//     observer.observe(lastFlowsGrid, { childList: true, subtree: true });
	//   }
	//   if (lastScreenGrid) {
	//     observer.observe(lastScreenGrid, { childList: true, subtree: true });
	//   }
};

document.body.appendChild(button);
