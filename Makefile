# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.

include $(TOPDIR)/rules.mk

LUCI_TITLE:=Neon Theme
LUCI_DEPENDS:=+luci-base +luci-mod-admin-full
LUCI_PKGARCH:=all
LUCI_THEMES:=neon
PKG_VERSION:=2.0.12
PKG_RELEASE:=1
PKG_MAINTAINER:=PeDitX

include $(TOPDIR)/feeds/luci/luci.mk

# Apply theme on install (postinst runs on every install, not just first boot)
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

# Install all theme files
define Package/luci-theme-neon/install
	$(INSTALL_DIR) $(1)/www/luci-static/neon
	$(CP) $(PKG_BUILD_DIR)/htdocs/luci-static/neon/* $(1)/www/luci-static/neon/
	
	$(INSTALL_DIR) $(1)/www/luci-static/resources
	$(CP) $(PKG_BUILD_DIR)/htdocs/luci-static/resources/menu-neon.js $(1)/www/luci-static/resources/
endef

# call BuildPackage - OpenWrt buildroot signature