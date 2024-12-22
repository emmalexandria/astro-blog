import { persistentMap, setPersistentEngine } from "@nanostores/persistent";
import anime from "animejs";

type VisitedMap = { [key: string]: boolean }

export const visitedMap = persistentMap<VisitedMap>('visited:', {}, {
	encode(value) {
		return value.toString()
	},
	decode(encoded: string) {
		return encoded === "true" ? true : false
	}
})

const events = {
	addEventListener(key: string, callback: any) { },
	removeEventListener(key: string, listener: any) { }
}

setPersistentEngine(sessionStorage, events)

export const setCurrentVisited = () => {
	//visitedMap.setKey(window.location.href, true)
}

export const isVisited = (): boolean => {
	return visitedMap.get()[window.location.href] ?? false
}

const getElement = <E extends Element>(element: string | E): E | undefined => {
	if (typeof element === "string") {
		let queryEl = document.querySelector<E>(element);
		if (!queryEl) {
			return
		}
		return queryEl
	}
	return element
}

export const reduceMotion = window.matchMedia('(prefers-reduced-motion').matches


export const animateSvg = (svg: string | SVGElement, timing: { duration: number, strokeDelay: number } = { duration: 1000, strokeDelay: 5 }) => {
	const target = getElement(svg)
	if (!target || reduceMotion) {
		return
	}

	const paths: NodeListOf<SVGPathElement> = target.querySelectorAll('path');
	for (let p of Array.from(paths)) {
		var len = Math.round(p.getTotalLength())
		p.style.strokeDasharray = len.toString();
		p.style.strokeDashoffset = len.toString();
	}

	anime({
		targets: paths,
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: 'easeInOutSine',
		duration: timing.duration,
		delay: (el, i) => i * (timing.duration / timing.strokeDelay)
	})
}

export const hoverSlamAnimate = (target: string | Element, duration: number) => {
	const element = getElement(target);
	if (!element || reduceMotion) {
		return
	}

	anime({
		targets: element,
		opacity: [0, 1],
		translateY: [-100, 0],
		duration: duration,
		easing: 'easeOutQuad'
	})
}

export const animateFade = (element: string | Element, duration: number = 500, delay: number = 0) => {
	const target = getElement(element);
	if (!target || reduceMotion) {
		return
	}

	anime({
		targets: target,
		opacity: [0, 1],
		duration: duration,
		delay: delay,
		easing: 'linear'
	})
}

export const animateSlide = (open: boolean, root: Element, navItems: Element[]) => {

	const toggleClasses = () => {
		let addClass = open ? "flex" : "hidden"
		let removeClass = open ? "hidden" : "flex"
		root.classList.add(addClass)
		root.classList.remove(removeClass)
	}

	if (open) {
		anime({
			targets: root,
			opacity: [0, 1],
			duration: 200,
			easing: 'linear'
		})

		anime({
			targets: navItems,
			opacity: [0, 1],
			duration: 200,
			delay: (el, i) => 200 + 100 * i,
			easing: 'easeInOutCubic'
		})
		toggleClasses()
	} else {

		anime({
			targets: root,
			opacity: [1, 0],
			duration: 200,
			easing: 'linear',
		})
	}
}


