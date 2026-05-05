const menus = []
const addMenu = (menu) => {
	menus.push(menu)
}

const addSubMenu = (label, subMenu, menu = menus) => {
	for (const item of menu) {
		if (item.label === label) {
			item.subMenus.push(subMenu);
			return;
		}
		if (item.subMenus) {
			addSubMenu(label, subMenu, item.subMenus);
		}
	}
}

export const settingsMenu = [
	{
		id: 'pengaturan',
		route: '#',
		label: 'Pengaturan',
		permission: 'administrator',
		subMenus: [
			{
				id: 'pengaturan-tampilan',
				route: '/settings/appearance',
				label: 'Pengaturan Tampilan',
				permission: 'administrator',
			},
			{
				id: 'pengaturan-role',
				route: '/settings/role',
				label: 'Pengaturan Role',
				permission: 'administrator',
			},
			{
				id: 'pengaturan-user',
				route: '/settings/user',
				label: 'Pengaturan User',
				permission: 'administrator',
			},
		]
	},
]

export default menus