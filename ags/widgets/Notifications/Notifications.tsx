import { bind, timeout, Variable } from "astal";
import { Subscribable } from "astal/binding";
import { App, Astal, Gdk, Gtk, Widget } from "astal/gtk4";
import Notifd from "gi://AstalNotifd"

const TIMEOUT_DELAY = 1000;

interface NotificationProps {
	notification: Notifd.Notification,
	onKeyPressed: () => void,
	setup: () => void,
}

// The purpose if this class is to replace Variable<Array<Widget>>
// with a Map<number, Widget> type in order to track notification widgets
// by their id, while making it conviniently bindable as an array
class NotifiationMap implements Subscribable {
    // the underlying map to keep track of id widget pairs
    private map: Map<number, Gtk.Widget> = new Map()

    // it makes sense to use a Variable under the hood and use its
    // reactivity implementation instead of keeping track of subscribers ourselves
    private var: Variable<Array<Gtk.Widget>> = Variable([])

    // notify subscribers to rerender when state changes
    private notifiy() {
        this.var.set([...this.map.values()].reverse())
    }

    constructor() {
        const notifd = Notifd.get_default()

        /**
         * uncomment this if you want to
         * ignore timeout by senders and enforce our own timeout
         * note that if the notification has any actions
         * they might not work, since the sender already treats them as resolved
         */
        // notifd.ignoreTimeout = true

        notifd.connect("notified", (_, id) => {
            this.set(id, Notification({
                notification: notifd.get_notification(id)!,

                // once hovering over the notification is done
                // destroy the widget without calling notification.dismiss()
                // so that it acts as a "popup" and we can still display it
                // in a notification center like widget
                // but clicking on the close button will close it
                onKeyPressed: () => this.delete(id),

                // notifd by default does not close notifications
                // until user input or the timeout specified by sender
                // which we set to ignore above
                setup: () => timeout(TIMEOUT_DELAY, () => this.delete(id)),
            }))
        })

        // notifications can be closed by the outside before
        // any user input, which have to be handled too
        notifd.connect("resolved", (_, id) => {
            this.delete(id)
        })
    }

    private set(key: number, value: Gtk.Widget) {
        // in case of replacecment destroy previous widget
		console.log('set', key)
		this.map.get(key)?.emit('destroy');
        this.map.set(key, value)
        this.notifiy()
    }

    private delete(key: number) {
		console.log('delete', key)
		this.map.get(key)?.emit('destroy');
        this.map.delete(key)
        this.notifiy()
    }

    // needed by the Subscribable interface
    get() {
        return this.var.get()
    }

    // needed by the Subscribable interface
    subscribe(callback: (list: Array<Gtk.Widget>) => void) {
        return this.var.subscribe(callback)
    }
}

function Notification(props: NotificationProps) {
	const { notification, onKeyPressed, setup } = props; 
	return Widget.Box({
		cssClasses: ["Notification"],
		vertical: true,
		children: [
			Widget.Label({ label: notification.appName }),
			Widget.Label({ label: notification.summary }),
		],
		setup,
	});
}

function NotificationsList() {
	const notifs = new NotifiationMap();

	return Widget.Box({
		cssClasses: ["NotificationsList"],
		vertical: true,
		children: bind(notifs),
	});
}

export default function Notifications(gdkmonitor: Gdk.Monitor) {
	const { TOP, RIGHT } = Astal.WindowAnchor

	return Widget.Window({
		visible: true,
		cssClasses: ["Notifications"],
		gdkmonitor: gdkmonitor,
		exclusivity: Astal.Exclusivity.EXCLUSIVE,
		anchor: TOP | RIGHT,
		application: App,
		child: NotificationsList(),
	});
}
