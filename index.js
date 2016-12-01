'use strict'

const onPrint = require('window-on-print')

const print = (html, cb, delay) => {
	const iframe = document.createElement('iframe')
	iframe.setAttribute('sandbox', 'allow-modals allow-same-origin allow-scripts')
	iframe.setAttribute('src', '/print.html')
	iframe.setAttribute('style', 'display: none')

	document.body.appendChild(iframe)
	const teardown = () => {
		// Safari crashes without a timeout.
		setTimeout(() => document.body.removeChild(iframe), 0)
		if (typeof cb === 'function') cb()
	}

	setTimeout(() => {
		iframe.contentDocument.write(html)

		setTimeout(() => {
			onPrint.after(iframe.contentWindow, teardown)
			iframe.contentWindow.focus()
			iframe.contentWindow.print()
		}, delay || 50)
	}, 0)
}

module.exports = print
