module.exports = class InventoryAllocator{
    constructor(order, warehouses){
        this.itemsToOrder = order;
        this.warehouses = warehouses;
        this.warehousesToShip = {};
    }

    findCheapest(){
        for(const item in this.itemsToOrder){
            let itemAllocated = false;
            for(let warehouse of this.warehouses){
                if(item in warehouse.inventory){
                    itemAllocated = this.updateInventoryAndShipping(item, this.itemsToOrder[item], warehouse)
                }
                if(itemAllocated){
                    break;
                }
            }
        }

        for(const item in this.itemsToOrder){
            if(this.itemsToOrder[item] !== 0){
                return [];
            }
        }
        const shippingPlan = this.createShippingPlan();
        return shippingPlan;
    }


    updateInventoryAndShipping(item, amount, warehouse){
        const quantityToOrder = Math.min(amount, warehouse.inventory[item])
        this.itemsToOrder[item] -= quantityToOrder;
        const indexOfWarehouse = this.warehouses.indexOf(warehouse)
        this.warehouses[indexOfWarehouse].inventory[item] -= quantityToOrder;
        if(warehouse.name in this.warehousesToShip){
            this.warehousesToShip[warehouse.name][item] = quantityToOrder;
        }
        else{
            this.warehousesToShip[warehouse.name] = {[item]: quantityToOrder}
        }

        return this.itemsToOrder[item] === 0;
    }

    createShippingPlan(){
        let shippingPlan = [];
        for(const warehouse in this.warehousesToShip){
            shippingPlan.push({[warehouse]: this.warehousesToShip[warehouse]});
        }
        return shippingPlan;
    }

}