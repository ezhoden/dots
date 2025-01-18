import { App } from "astal/gtk4"
import style from "./style.scss"
import Bar from "./widgets/Bar/Bar"
import AppLauncher from "./widgets/AppLauncher/AppLauncher"

App.start({
    css: style,
    main() {
        App.get_monitors().map(Bar)
		AppLauncher()
    },
})
