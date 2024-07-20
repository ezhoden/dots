import { applauncher } from './modules/applauncher/applauncher.js'
//import { Bar } from './modules/bar/bar.js'
//import { NotificationPopups } from './modules/notifications/notifications.js'

App.config({
	style: "./styles.css",
	windows: [
		applauncher,
		//Bar(),
		//NotificationPopups(),
	]
})
