import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widget/Bar"
import AppLauncher from "./widget/applauncher/applauncher"

App.start({
    css: style,
    main() {
        Bar(App.get_monitors()[0])
    },
})
