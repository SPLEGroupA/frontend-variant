const menus = [];
const addMenu = (menu) => {
  menus.push(menu);
};

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
};

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

export default menus;

addMenu({
	id: '_TKA_MN_MKP',
	route: '/produk',
    label: 'KatalogProduk',
    permission: '',
	subMenus: [],
})

addMenu({
	id: '_TKA_MN_MKB',
	route: '/keranjang',
    label: 'KeranjangBelanja',
    permission: '',
	subMenus: [],
})

addMenu({
	id: '_TKA_MN_MAP',
	route: '/akun',
    label: 'AkunPengguna',
    permission: '',
	subMenus: [],
})

addMenu({
	id: '_TKA_MN_DRR',
	route: '/produk-rating',
    label: 'ReviewRating',
    permission: '',
	subMenus: [],
})
