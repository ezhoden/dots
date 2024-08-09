const bluetooth = await Service.import("bluetooth")

function BluetoothDevices() {
	return Widget.Label({
		label: bluetooth.devices.join(', ')
	})
}

export function Bluetooth() {
	return Widget.Button({
		className: 'bluetooth',
		label: bluetooth.state,
		onHover: prop => {
			console.log(prop)
		}
	})
}
