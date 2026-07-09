# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.

include $(TOPDIR)/rules.mk

LUCI_TITLE:=Neon Theme
LUCI_DEPENDS:=+luci-base
LUCI_PKGARCH:=all
LUCI_THEMES:=neon
PKG_VERSION:=2.0
PKG_RELEASE:=202202260758
PKG_MAINTAINER:=PeDitX

include $(TOPDIR)/feeds/luci/luci.mk

# Set the theme on install (uci-defaults only runs on first boot, not on opkg install)
define Package/luci-theme-neon/postinst
#!/bin/sh
[ -n "$$IPKG_INSTROOT" ] || {
	uci -q batch <<-EOF
		set luci.themes.Neon=/luci-static/neon
		set luci.main.mediaurlbase=/luci-static/neon
		commit luci
	EOF
}
exit 0
endef

# call BuildPackage - OpenWrt buildroot signature