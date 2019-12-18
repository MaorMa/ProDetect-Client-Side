import { Nutrient } from './nutrient';
import { ResearchProduct } from './research-product';

export class MetaData {
    private sID: string;
    private description: string;
    private quantity: string;
    private price: string;
    private productNameChosen: string;
    // private nutrients: Nutrient[];
    // private optionalProducts: ResearchProduct[];
    private validProduct: boolean;

    deserialize(input: any): this {
        this.sID = input.sID;
        this.description = input.description;
        this.quantity = input.quantity;
        this.price = input.price;
        // this.nutrients = [];
        // for (let nutrient of input.nutrients)
        //     this.nutrients.push(new Nutrient().deserialize(nutrient));
        // this.optionalProducts = [];
        // for (let optionalProduct of input.optionalProducts)
        //     this.optionalProducts.push(new ResearchProduct().deserialize(optionalProduct));
        this.validProduct = input.validProduct;
        return this;
    }

    getsID() {
        return this.sID;
    }

    getDescription() {
        return this.description;
    }

    getQuantity() {
        return this.quantity;
    }

    getPrice() {
        return this.price;
    }

    setProductNameChosen(name: string) {
        // console.log(name ? name : "")
        this.productNameChosen = name ? name : "";
    }
}
