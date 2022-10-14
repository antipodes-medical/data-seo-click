class DataSeo {
	constructor(dataSeosJson) {
		this.dataSeos = JSON.parse(dataSeosJson);

		const style = document.createElement('style');
		style.textContent = '[data-seo-click] * { pointer-events: none!important; }';
		document.head.appendChild(style);

		this.dataSeos.forEach(dataSeo => {
			const name = dataSeo.name;

			dataSeo.elements.forEach(element => {
				const clickName = element.name;

				if (typeof element.selector === 'object') {
					element.selector.forEach(selector => {
						const $el = document.querySelector(selector);

						if ($el) {
							this._addDataAttributes($el, name, element.name ? clickName : null);
						}
					});
				} else {
					const $el = document.querySelector(element.selector);
					if ($el) {
						this._addDataAttributes($el, name, clickName);
					}
				}
			});
		});
	}

	/**
   * Add data attributes to an element.
   *
   * @param {HTMLElement} $element
   * @param {string} click
   * @param {string} clickName
   * @private
   */
	_addDataAttributes($element, click, clickName) {
		if ($element.tagName === 'ROLL-HOVER-BUTTON') {
			$element = $element.children[0];
		}

		$element.setAttribute('data-seo-click', click);
		if (clickName) {
			$element.setAttribute('data-seo-click-name', clickName);
		}
	}
}

module.exports = DataSeo;