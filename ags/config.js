import { applauncher } from './modules/applauncher.js'
import { NotificationPopups } from './modules/notifications.js'

const myLabel = Widget.Label({
	label: 'ezhoden'
})

const myBar = Widget.Window({
	name: 'bar',
	anchor: ['top', 'left', 'right'],
	child: myLabel,
})

Utils.timeout(100, () => Utils.notify({
    summary: "Notification Popup Example",
    iconName: "info-symbolic",
    body: "Lorem ipsum dolor sit amet, qui minim labore adipisicing "
        + "minim sint cillum sint consectetur cupidatat.",
    actions: {
        "Cool": () => print("pressed Cool"),
    },
}))

App.config({
	style: App.configDir + "/style.css",
	windows: [
		myBar,
		applauncher,
		NotificationPopups(),
	]
})
