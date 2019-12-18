import { Nutrient } from './nutrient';
import { ResearchProductName } from './research-product-name';

export class MetaData {
    private sID: string;
    private description: string;
    private quantity: string;
    private price: string;
    private nutrients: Nutrient[];
    private optionalProductNames: ResearchProductName[];
    private validProduct: boolean;

    deserialize(input: any): this {
        this.sID = input.sID;
        this.description = input.description;
        this.quantity = input.quantity;
        this.price = input.price;
        this.optionalProductNames = input.optionalProductNames;
        this.nutrients = [];
        for(let nutrient of input.nutrients)
            this.nutrients.push(new Nutrient().deserialize(nutrient));
        this.validProduct = input.validProduct;
        return this;
    }

    getsID(){
        return this.sID;
    }

    getDescription(){
        return this.description;
    }

    getQuantity(){
        return this.quantity;
    }

    getPrice(){
        return this.price;
    }
}
