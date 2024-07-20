import { applauncher } from './applauncher/applauncher.js'
import { Bar } from './bar/bar.js'
import { NotificationPopups } from './notifications/notifications.js'

App.config({
	style: "./styles.css",
	windows: [
		applauncher,
		Bar(),
		NotificationPopups(),
	]
})
