import { Binding, Variable } from "astal";
import { App, Astal, Gdk, Widget } from "astal/gtk4";
import Apps from "gi://AstalApps"

function AppLauncherInput(text: Variable<string>) {
	return Widget.Entry({
		cssClasses: ["AppLauncherInput"],
		placeholderText: "Search",
		// TODO: with .get() it doesn't clear text on hide, but without it has recursion and cursor is always at the start, so input works backwards
		text: text().get(),
		onChanged: self => text.set(self.text),
	});
}

function hide() {
    App.get_window("AppLauncher")?.hide()
}

function AppButton(app: Apps.Application) {
	return Widget.Button({
		label: app.name,
		onClicked: () => {
			app.launch();
			hide();
		},
	});
}

function AppLauncherApps(list: Binding<Apps.Application[]>) {
	return Widget.Box({
		cssClasses: ["AppLauncherApps"],
		vertical: true,
		children: list.as(list => list.map(app => AppButton(app))),
	});
}

function AppLauncherContent(text: Variable<string>) {
	const apps = new Apps.Apps()
	const list = text(text => apps.exact_query(text).splice(0, 10))

	return Widget.Box({
		cssClasses: ["AppLauncherContent"],
		vertical: true,
		children: [AppLauncherInput(text), AppLauncherApps(list)],
	});
}

export default function AppLauncher() {
	const text = Variable<string>('');

	return Widget.Window({
		name: "AppLauncher",
		application: App,
		cssClasses: ["AppLauncher"],
		exclusivity: Astal.Exclusivity.IGNORE,
		child: AppLauncherContent(text),
		keymode: Astal.Keymode.ON_DEMAND,
		onHide: () => text.set(''),
		onKeyPressed: (self, keyval) => {
			if (keyval === Gdk.KEY_Escape) {
				self.hide();
			}
		},
	});
}
