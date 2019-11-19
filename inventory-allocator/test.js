const assert = require('assert')
const InventoryAllocator = require('./src/InventoryAllocator')

describe('Test Cases for valid orders', function(){


    it('should work with exact match', function(){
        const order = { apple: 1 };
        const inventory = [{ name: "first", inventory: { apple: 1 } }];
        const inventoryAllocator = new InventoryAllocator(order, inventory);
        const cheapest = inventoryAllocator.findCheapest();
        assert.deepEqual(cheapest, [{ first: { apple: 1 } }])
    })

    it('should return first cheapest warehouse to ship from', function(){
        const order = { apple: 1 };
        const inventory = [{ name: "first", inventory: { apple: 1 } }, { name: "second", inventory: { apple: 1 } }];
        const inventoryAllocator = new InventoryAllocator(order, inventory);
        const cheapest = inventoryAllocator.findCheapest();
        assert.deepEqual(cheapest, [{ first: { apple: 1 } }])
    })

    it('should return multiple warehouses to ship from', function(){
        const order = { apple: 2 };
        const inventory = [{ name: "first", inventory: { apple: 1 } }, { name: "second", inventory: { apple: 1 } }];
        const inventoryAllocator = new InventoryAllocator(order, inventory);
        const cheapest = inventoryAllocator.findCheapest();
        assert.deepEqual(cheapest, [{ first: { apple: 1 }}, { second: { apple: 1 } }])
    })

    it('should return multiple warehouses to ship from in correct order', function(){
        const order = { apple: 2 };
        const inventory = [{ name: "first", inventory: { apple: 1 } }, { name: "second", inventory: { banana: 1 } }, { name: "third", inventory: { apple: 1 } }];
        const inventoryAllocator = new InventoryAllocator(order, inventory);
        const cheapest = inventoryAllocator.findCheapest();
        assert.deepEqual(cheapest, [{ first: { apple: 1 }}, { third: { apple: 1 } }])
    })

    it('should return multiple warehouses to ship from with correct quantity', function(){
        const order = { apple: 5 };
        const inventory = [{ name: "first", inventory: { apple: 2 } }, { name: "second", inventory: { banana: 1 } }, { name: "third", inventory: { apple: 3 } }];
        const inventoryAllocator = new InventoryAllocator(order, inventory);
        const cheapest = inventoryAllocator.findCheapest();
        assert.deepEqual(cheapest, [{ first: { apple: 2 }}, { third: { apple: 3 } }])
    })

    it('should return different products from warehouses to ship from with correct quantity', function(){
        const order = { apple: 2, banana:1 };
        const inventory = [{ name: "first", inventory: { apple: 2 } }, { name: "second", inventory: { banana: 1 } }, { name: "third", inventory: { apple: 3 } }];
        const inventoryAllocator = new InventoryAllocator(order, inventory);
        const cheapest = inventoryAllocator.findCheapest();
        assert.deepEqual(cheapest, [{ first: { apple: 2 }}, { second: { banana: 1 } }])
    })

    it('should return multiple products from warehouses to ship from with correct quantity', function(){
        const order = { apple: 3, banana:3 };
        const inventory = [{ name: "first", inventory: { apple: 2, banana:1 } }, { name: "second", inventory: { banana: 1 } }, { name: "third", inventory: { apple: 3, banana:1 } }];
        const inventoryAllocator = new InventoryAllocator(order, inventory);
        const cheapest = inventoryAllocator.findCheapest();
        assert.deepEqual(cheapest, [{ first: { apple: 2, banana:1 }}, { third: { apple: 1, banana: 1 } }, { second: { banana: 1 }}])
    })
})

describe('Test Cases for invalid orders', function(){


    it('should return empty array if no inventory', function(){
        const order = { apple: 1 };
        const inventory = [];
        const inventoryAllocator = new InventoryAllocator(order, inventory);
        const cheapest = inventoryAllocator.findCheapest();
        assert.deepEqual(cheapest, [])
    })

    it('should return empty array if not enough inventory', function(){
        const order = { apple: 3 };
        const inventory = [{ name: "first", inventory: { apple: 1 } }, { name: "second", inventory: { banana: 1 } }, { name: "third", inventory: { apple: 1 } }];
        const inventoryAllocator = new InventoryAllocator(order, inventory);
        const cheapest = inventoryAllocator.findCheapest();
        assert.deepEqual(cheapest, [])
    })

    it('should return empty array if item not in inventory', function(){
        const order = { apple: 1 };
        const inventory = [{ name: "first", inventory: { banana: 1 } }];
        const inventoryAllocator = new InventoryAllocator(order, inventory);
        const cheapest = inventoryAllocator.findCheapest();
        assert.deepEqual(cheapest, [])
    })

    it('should return empty array if one item is and one item is not in inventory', function(){
        const order = { apple: 1, banana: 1 };
        const inventory = [{ name: "first", inventory: { banana: 1 } }];
        const inventoryAllocator = new InventoryAllocator(order, inventory);
        const cheapest = inventoryAllocator.findCheapest();
        assert.deepEqual(cheapest, [])
    })
})

