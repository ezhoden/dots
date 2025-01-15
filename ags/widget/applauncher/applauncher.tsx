import { App, Astal, Gtk, Gdk } from "astal/gtk3"

export default function AppLauncher(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    return <window
        name="AppLauncher"
        className="AppLauncher"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}
		>
        <centerbox>
			<box halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} vertical>
                <label className="title" label="TEST" />
            </box>
        </centerbox>
    </window>
}
