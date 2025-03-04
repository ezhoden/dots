import { App } from "astal/gtk4"
import style from "./style.scss"
import Bar from "./widgets/Bar/Bar"
import AppLauncher from "./widgets/AppLauncher/AppLauncher"
import Notifications from "./widgets/Notifications/Notifications"

App.start({
    css: style,
    main() {
        Bar(App.get_monitors()[0])
		AppLauncher()
        //Notifications(App.get_monitors()[0])
    },
})
