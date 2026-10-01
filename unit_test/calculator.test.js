const Calculator = require("../calculator");

const foodMenu = {
	Red: 50,
	Green: 40,
	Blue: 30,
	Yellow: 50,
	Pink: 80,
	Purple: 90,
	Orange: 120,
};

describe("Calculator", () => {
	let calculator;

	beforeEach(() => {
		calculator = new Calculator(foodMenu);
	});

	test("Example 1: set order with Red and Green and without member card", () => {
		const order = ["Red", "Green"];
		const total = calculator.calculateOrder(order, false);
		expect(total).toBe(90);
	});

	test("Example 2: set order with Red and Green and with member card (get 10% discount)", () => {
		const order = ["Red", "Green"];
		const total = calculator.calculateOrder(order, true);
		expect(total).toBe(81);
	});

	test("Example 3: set order with Orange set 5 items (get 5% discount for 4 items (2 pairs))", () => {
		const order = ["Orange", "Orange", "Orange", "Orange", "Orange"];
		const total = calculator.calculateOrder(order, false);
		expect(total).toBe(576);
	});

	test("Test calculate mixed discounts correctly", () => {
		const order = ["Pink", "Pink", "Green", "Green", "Green"];
		const total = calculator.calculateOrder(order, true);
		expect(total).toBeCloseTo(241.2);
	});

	test("Test error if item is not in menu", () => {
		const order = ["Black"];
		expect(() => calculator.calculateOrder(order)).toThrow("Item not found.");
	});
});
