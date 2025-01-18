import { App, Astal, Gtk, Gdk, Widget } from "astal/gtk4";
import { bind, execAsync, GLib, Variable } from "astal";
import Hyprland from "gi://AstalHyprland";
import Battery from "gi://AstalBattery";

// TODO: find better format for date (maybe with day of the week and/or date)
//const BAR_DATE_FORMAT = '%a %e %b - %H:%M';
const BAR_DATE_FORMAT = '%H:%M';

function numberToIcon(n: number, isFilled = false): string {
	// 0xf0c9e - it's the codepoint of the filled number 1 icon - 2
	// we use it as a base to calculate the utf icon for any number from 1 to 9
	return String.fromCodePoint(0xf0c9e + n * 2 + (isFilled ? 0 : 1));
};

// Battery module returns percentage as a number in range [0, 1]
const BATTERY_TRESHOLDS: number[] = [0.2, 0.4, 0.6, 0.8, 1];

// TODO: find better icons for battery
const BATTERY_ICONS: string[] = ['', '', '', '', ''];

function TimeWidget() {
	const time = Variable<string>('').poll(1000, () => GLib.DateTime.new_now_local().format(BAR_DATE_FORMAT)!)

	return Widget.Label({
		cssClasses: ["Widget", "Time"],
		hexpand: true,
		halign: Gtk.Align.START,
		label: time(),
		onDestroy: () => time.drop(),
	});
}

function WorkspacesWidget() {
	const hypr = Hyprland.get_default();
	const activeId = bind(hypr, 'focusedWorkspace').as(ws => ws.id);
	const workspaces = bind(hypr, 'workspaces')
		.as(workspaces =>
			workspaces
				.filter(ws => !(ws.id >= -99 && ws.id <= -2)) // filter out special workspaces
				.sort((a, b) => a.id - b.id)
				.map(ws => Widget.Button({
					cssClasses: bind(activeId).as(id => ws.id === id ? ["Workspace", "Workspace_focused"] : ["Workspace"]),
					onClicked: () => ws.focus(),
					label: bind(activeId).as(id => numberToIcon(ws.id, ws.id === id)),
				}))
		);

	return Widget.Box({
		cssClasses: ["Widget", "Workspaces"],
		children: workspaces,
	});
}

function MediaWidget() {
	return Widget.Box({
	});
}

function AudioWidget() {
	return Widget.Box({
	});
}

function WifiWidget() {
	return Widget.Box({
	});
}

function TrayWidget() {
	return Widget.Box({
	});
}

function BatteryWidget() {
	const battery = Battery.get_default();

	const percentageToIcon = (percentage: number) => {
		return BATTERY_ICONS[BATTERY_TRESHOLDS.findIndex(t => percentage <= t)] || '❓';
	}

	return Widget.Label({
		cssClasses: ["Widget", "Battery"],
		label: bind(battery, 'percentage').as(percentageToIcon),
	});
}

function LanguagesWidget() {
	const hypr = Hyprland.get_default();

	const lang = Variable<string>('');
	hypr.connect('keyboard-layout', (_, __, l) => lang.set(l.slice(0, 2).toUpperCase()));
	// we need to call the command to get the initial value, because the signal is not emitted on startup,
	// but I still want English to be the default, so I call switchxkblayout again to set it back to English
	execAsync('hyprctl switchxkblayout current next').then(() => execAsync('hyprctl switchxkblayout current 0')).catch(console.error);

	return Widget.Button({
		cssClasses: ["Widget", "Language"],
		label: bind(lang),
		onClicked: () => execAsync('hyprctl switchxkblayout current next'),
		onDestroy: () => lang.drop(),
	});
}

function BarContentLeft() {
	return Widget.Box({
		cssClasses: ["BarContentLeft"],
		halign: Gtk.Align.START,
		children: [TimeWidget(), WorkspacesWidget()],
	});
}

function BarContentCenter() {
	return Widget.Box({
		cssClasses: ["BarContentCenter"],
		halign: Gtk.Align.CENTER,
		children: [MediaWidget()],
	});
}

function BarContentRight() {
	return Widget.Box({
		cssClasses: ["BarContentRight"],
		halign: Gtk.Align.END,
		children: [TrayWidget(), WifiWidget(), AudioWidget(), LanguagesWidget(), BatteryWidget()],
	});
}

function BarContent() {
	return Widget.Box({
		cssClasses: ["BarContent"],
		children: [BarContentLeft(), BarContentCenter(), BarContentRight()],
	});
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
	const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

	return Widget.Window({
		visible: true,
		cssClasses: ["Bar"],
		gdkmonitor: gdkmonitor,
		exclusivity: Astal.Exclusivity.EXCLUSIVE,
		anchor: TOP | LEFT | RIGHT,
		application: App,
		child: BarContent(),
	});
}
