'use strict';
'require baseclass';
'require ui';

return baseclass.extend({
	__init__() {
		ui.menu.load().then((tree) => this.render(tree));
	},

	render(tree) {
		let node = tree;
		let url = '';

		this.renderMainMenu(tree, '');

		// Render tab menu when we have enough dispatch path depth
		// Also render main menu when dispatchpath is empty (root/admin pages)
		if (L.env.dispatchpath.length >= 3) {
			for (var i = 0; i < 3 && node; i++) {
				node = node.children[L.env.dispatchpath[i]];
				url = url + (url ? '/' : '') + L.env.dispatchpath[i];
			}

			if (node)
				this.renderTabMenu(node, url);
		}

		document.querySelector('.showSide')
			.addEventListener('click', ui.createHandlerFn(this, 'handleSidebarToggle'));

		document.querySelector('.darkMask')
			.addEventListener('click', ui.createHandlerFn(this, 'handleSidebarToggle'));

		document.querySelector(".main > .loading").style.opacity = '0';
		document.querySelector(".main > .loading").style.visibility = 'hidden';

		if (window.innerWidth <= 1152)
			document.querySelector('.main-left').style.width = '0';

		window.addEventListener('resize', this.handleSidebarToggle, true);
	},

	handleSidebarToggle() {
		const mainLeft = document.querySelector('.main-left');
		const darkMask = document.querySelector('.darkMask');
		if (mainLeft.style.width === '0' || !mainLeft.style.width) {
			darkMask.style.display = 'block';
			mainLeft.style.width = '20rem';
		} else {
			darkMask.style.display = 'none';
			mainLeft.style.width = '0';
		}
	},

	handleMenuExpand(ev) {
		const a = ev.target;
		const ul1 = a.parentNode;
		const ul2 = a.nextElementSibling;

		document.querySelectorAll('li.slide.active').forEach(function(li) {
			if (li !== ul1) {
				li.classList.remove('active');
				li.childNodes[0].classList.remove('active');
			}
			if (li == ul1)
				return;
		});

		if (!ul2)
			return;

		if (ul2.parentNode.offsetLeft + ul2.offsetWidth <= ul1.offsetLeft + ul1.offsetWidth)
			ul2.classList.add('align-left');

		ul1.classList.add('active');
		a.classList.add('active');
		a.blur();

		ev.preventDefault();
		ev.stopPropagation();
	},

	renderMainMenu(tree, url, level) {
		const l = (level || 0) + 1;
		const ul = E('ul', { 'class': level ? 'slide-menu' : 'nav' });
		const children = ui.menu.getChildren(tree);

		if (children.length == 0 || l > 2)
			return E([]);

		children.forEach(child => {
			const submenu = this.renderMainMenu(child, url + '/' + child.name, l);
			const isActive = (L.env.dispatchpath[l] == child.name);
			const hasChildren = submenu.children.length;

			ul.appendChild(E('li', { 'class': (hasChildren ? 'slide' + (isActive ? ' active' : '') : (isActive ? ' active' : ''))}, [
				E('a', {
					'href': hasChildren ? '#' : L.url(url, child.name),
					'class': hasChildren ? 'menu' + (isActive ? ' active' : '') : '',
					'click': hasChildren ? ui.createHandlerFn(this, 'handleMenuExpand') : '',
					'data-title': hasChildren ? '' : _(child.title),
				}, [
					_(child.title)
				]),
				submenu
			]));
		});

		if (l == 1) {
			var container = document.querySelector('#mainmenu');
			container.appendChild(ul);
			container.style.display = '';
		}

		return ul;
	},

	renderTabMenu(tree, url, level) {
		const container = document.querySelector('#tabmenu');
		const l = (level || 0) + 1;
		const ul = E('ul', { 'class': 'tabs' });
		const children = ui.menu.getChildren(tree);
		let activeNode = null;

		if (children.length == 0)
			return E([]);

		children.forEach(child => {
			const isActive = (L.env.dispatchpath[l + 2] == child.name);
			const activeClass = isActive ? ' active' : '';
			const className = 'tabmenu-item-%s %s'.format(child.name, activeClass);

			ul.appendChild(E('li', { 'class': className }, [
				E('a', { 'href': L.url(url, child.name) }, [
					_(child.title)
				]),
			]));

			if (isActive) activeNode = child;
		});

		if (ul.children.length == 0)
			return E([]);

		container.appendChild(ul);
		container.style.display = '';

		if (activeNode)
			this.renderTabMenu(activeNode, url + '/' + activeNode.name, (level || 0) + 1);

		return ul;
	}
});