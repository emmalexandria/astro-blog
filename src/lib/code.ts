import { isSharedBannerOpen, sharedBannerContent } from "./stores";

export const addCopyButtonToCodeBlocks = () => {
	const codeWrappers = document.querySelectorAll<HTMLDivElement>(".astro-code-wrapper");
	codeWrappers.forEach((cw) => {
		cw.classList.add("group")
		const preEl = cw.querySelector<HTMLPreElement>(".astro-code");
		const codeEl = preEl?.querySelector("code");
		if (preEl) {
			const button = document.createElement("button");
			button.classList.add("absolute", "opacity-0", "group-hover:opacity-100", "transition-all", "top-2", "right-2", "px-2", "py-1", "bg-mono-100", "rounded", "font-body")
			button.textContent = "Copy";
			button.addEventListener("click", (evt) => {
				evt.preventDefault();
				if (codeEl?.textContent) {
					navigator.clipboard.writeText(codeEl.textContent)
					isSharedBannerOpen.set(true)
					sharedBannerContent.set("Code copied to clipboard")
				}
			})
			preEl.appendChild(button)
		}
	})

}


