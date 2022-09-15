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
							$el.setAttribute('data-seo-click', name);
							if (element.name) {
								$el.setAttribute('data-seo-click-name', clickName);
							}
						}
					});
				} else {
					const $el = document.querySelector(element.selector);
					if ($el) {
						$el.setAttribute('data-seo-click', name);
						if (clickName) {
							$el.setAttribute('data-seo-click-name', clickName);
						}
					}
				}
			});
		});
	}
}

module.exports = DataSeo;