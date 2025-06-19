import { Binding, Variable } from "astal";
import { App, Astal, Gdk, Widget } from "astal/gtk4";
import Apps from "gi://AstalApps"

function AppLauncherInput(input: Variable<string>, output: Variable<string>) {
	return Widget.Entry({
		cssClasses: ["AppLauncherInput"],
		placeholderText: "Search",
		text: input(),
		onChanged: self => output.set(self.text),
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

function AppLauncherContent(searchValue: Variable<string>, inputValue: Variable<string>) {
	const apps = new Apps.Apps();
	const list = searchValue(searchValue => apps.exact_query(searchValue).filter(app => app.name.toLowerCase().includes(searchValue.toLowerCase())).splice(0, 10));

	return Widget.Box({
		cssClasses: ["AppLauncherContent"],
		vertical: true,
		children: [AppLauncherInput(inputValue, searchValue), AppLauncherApps(list)],
	});
}

export default function AppLauncher() {
	// we need two inputs to avoid recursion in AppLauncherInput
	const searchValue = Variable<string>('');
	const inputValue = Variable<string>('');

	return Widget.Window({
		name: "AppLauncher",
		application: App,
		cssClasses: ["AppLauncher"],
		exclusivity: Astal.Exclusivity.IGNORE,
		child: AppLauncherContent(searchValue, inputValue),
		keymode: Astal.Keymode.ON_DEMAND,
		onHide: () => {
			// we need to change the input value twice when the window is hidden to trigger input() in entry
			inputValue.set(searchValue.get());
			inputValue.set('');
			searchValue.set('');
		},
		onKeyPressed: (self, keyval) => {
			if (keyval === Gdk.KEY_Escape) {
				self.hide();
			}
		},
	});
}
