import { isSharedBannerOpen, sharedBannerContent } from "./stores"

export const initHeadingLinkHandlers = () => {
	///This is ugly but it works
	const links = document.querySelectorAll<HTMLAnchorElement>(`.heading-link a`)

	links.forEach((l) => {
		l.addEventListener('click', (e) => {
			///Cast HTML anchor element, because we know for a fact that currentTarget will always be <a>
			if (e.currentTarget instanceof HTMLAnchorElement) {
				e.preventDefault()
				navigator.clipboard.writeText(e.currentTarget.href)
				isSharedBannerOpen.set(true)
				sharedBannerContent.set("Link copied to clipboard")
			}
		})
	})
}




