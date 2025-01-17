import { App, Astal, Gtk, Gdk } from "astal/gtk4"
import { GLib, Variable } from "astal"

// TODO: find better format for date (maybe with day of the week and/or date)
//const BAR_DATE_FORMAT = '%a %e %b - %H:%M';
const BAR_DATE_FORMAT = '%H:%M';

function Time() {
	const time = Variable<string>('').poll(1000, () => GLib.DateTime.new_now_local().format(BAR_DATE_FORMAT)!)

	return (
		<label
			hexpand
			halign={Gtk.Align.START}
			label={time()}
			onDestroy={() => time.drop()}
		/>
	);
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
	const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

	return (
		<window
			visible
			cssClasses={["Bar"]}
			gdkmonitor={gdkmonitor}
			exclusivity={Astal.Exclusivity.EXCLUSIVE}
			anchor={TOP | LEFT | RIGHT}
			application={App}
		>
			<centerbox cssName="centerbox">
				<Time />
			</centerbox>
		</window>
	);
}
