class Calculator {
	constructor(menu, bundleItems) {
		this.menu = menu;
		this.bundleItems = bundleItems || ["Orange", "Pink", "Green"];
	}

	calculateOrder(order, memberShip = false) {
		const itemCounts = this._countItems(order);
		let total = 0;

		for (const [item, count] of Object.entries(itemCounts)) {
			total += this._calculateItemPrice(item, count);
		}

		return this._applyMembershipDiscount(total, memberShip);
	}

	_countItems(order) {
		return order.reduce((acc, item) => {
			if (!this.menu[item]) {
				throw new Error(`Item not found.`);
			}
			acc[item] = (acc[item] || 0) + 1;
			return acc;
		}, {});
	}

	_calculateItemPrice(item, count) {
		const unitPrice = this.menu[item];
		let price = unitPrice * count;

		if (this.bundleItems.includes(item)) {
			const pairsItem = Math.floor(count / 2);
			const discount = pairsItem * (unitPrice * 2) * 0.05;
			price -= discount;
		}

		return price;
	}

	_applyMembershipDiscount(total, memberShip) {
		if (memberShip) {
			return total * 0.9;
		}
		return total;
	}
}

module.exports = Calculator;
