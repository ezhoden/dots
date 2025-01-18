import { App } from "astal/gtk4"
import style from "./style.scss"
import Bar from "./widgets/Bar/Bar"

App.start({
    css: style,
    main() {
        App.get_monitors().map(Bar)
    },
})
