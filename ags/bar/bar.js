import { Bluetooth } from '../bluetooth/bluetooth.js'

const hyprland = await Service.import("hyprland")
const mpris = await Service.import("mpris")
const audio = await Service.import("audio")
const battery = await Service.import("battery")
const systemtray = await Service.import("systemtray")

const date = Variable("", {
    poll: [1000, 'date "+%H:%M    %e %b %y"'],
})

// widgets can be only assigned as a child in one container
// so to make a reuseable widget, make it a function
// then you can simply instantiate one by calling it

function Workspaces() {
	const activeId = hyprland.active.workspace.bind("id")

	const workspaces = hyprland.bind("workspaces")
		.as(ws => ws
			.sort((a, b) => a.id - b.id)
			.map(({ id }) => Widget.Button({
				onClicked: () => hyprland.messageAsync(`dispatch workspace ${id}`),
				child: Widget.Label(`${id}`),
				className: activeId.as(i => `${i === id ? "focused" : ""}`),
		})))
    return Widget.Box({
	    className: "workspaces",
	    children: workspaces,
    })
}


function ClientTitle() {
    return Widget.Label({
        className: "client-title",
        label: hyprland.active.client.bind("title"),
    })
}


function Clock() {
    return Widget.Label({
        className: "clock",
        label: date.bind(),
    })
}

function Media() {
    const label = Utils.watch("", mpris, "player-changed", () => {
        if (mpris.players[0]) {
            const { track_artists, track_title } = mpris.players[0]
            return `${track_artists.join(", ")} - ${track_title}`
        } else {
            return "Nothing is playing"
        }
    })

    return Widget.Button({
        className: "media",
        onPrimaryClick: () => mpris.getPlayer("")?.playPause(),
        onSecondaryClick: () => mpris.getPlayer("")?.next(),
        onMiddleClick: () => mpris.getPlayer("")?.previous(),
        child: Widget.Label({ label }),
    })
}


function Volume() {
    const icons = {
        101: "overamplified",
        67: "high",
        34: "medium",
        1: "low",
        0: "muted",
    }

    function getIcon() {
        const icon = audio.speaker.is_muted ? 0 : [101, 67, 34, 1, 0].find(
            threshold => threshold <= audio.speaker.volume * 100)

        return `audio-volume-${icons[icon]}-symbolic`
    }

    const icon = Widget.Icon({
        icon: Utils.watch(getIcon(), audio.speaker, getIcon),
    })

    const slider = Widget.Slider({
        hexpand: true,
        draw_value: false,
        on_change: ({ value }) => audio.speaker.volume = value,
        setup: self => self.hook(audio.speaker, () => {
            self.value = audio.speaker.volume || 0
        }),
    })

    return Widget.Box({
        className: "volume",
        css: "min-width: 180px",
        children: [icon, slider],
    })
}


function BatteryLabel() {
    const value = battery.bind("percent").as(p => p > 0 ? p / 100 : 0)
    const icon = battery.bind("percent").as(p =>
        `battery-level-${Math.floor(p / 10) * 10}-symbolic`)

    return Widget.Box({
        className: "battery",
        visible: battery.bind("available"),
        children: [
            Widget.Icon({ icon }),
            Widget.LevelBar({
                widthRequest: 100,
                vpack: "center",
                value,
            }),
        ],
    })
}

function Language() {
	return Widget.Label({
		setup: self => self.hook(hyprland, (self, device, value) => {
			self.label = value.slice(0, 2).toLowerCase()
		}, 'keyboard-layout')
	})
}


function SysTray() {
    const items = systemtray.bind("items")
        .as(items => items.map(item => Widget.Button({
            child: Widget.Icon({ icon: item.bind("icon") }),
            onPrimaryClick: (_, event) => item.activate(event),
            onSecondaryClick: (_, event) => item.openMenu(event),
            tooltip_markup: item.bind("tooltip_markup"),
        })))

    return Widget.Box({
        children: items,
    })
}


// layout of the bar
function Left() {
    return Widget.Box({
        spacing: 8,
        children: [
            Clock(),
            Workspaces(),
            //ClientTitle(),
			//Bluetooth(),
        ],
    })
}

function Center() {
    return Widget.Box({
        spacing: 8,
        children: [
            Media(),
        ],
    })
}

function Right() {
    return Widget.Box({
        hpack: "end",
        spacing: 8,
        children: [
            Volume(),
            //BatteryLabel(),
			Language(),
            SysTray(),
        ],
    })
}

export function Bar(monitor = 0) {
    return Widget.Window({
        name: `bar-${monitor}`, // name has to be unique
        className: "bar",
        monitor,
        anchor: ["top", "left", "right"],
		margins: [8, 8, 0, 8],
		heightRequest: 32,
        exclusivity: "exclusive",
        child: Widget.CenterBox({
            startWidget: Left(),
            centerWidget: Center(),
            endWidget: Right(),
        }),
    })
}
