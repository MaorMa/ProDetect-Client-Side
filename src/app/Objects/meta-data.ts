import { Nutrient } from './nutrient';
import { ResearchProduct } from './research-product';

export class MetaData {
    private sID: string;
    private description: string;
    private quantity: string;
    private price: string;
    private validProduct: boolean;
    private yCoordinate: number = 0;
    private nutrients: Nutrient[];
    private optionalProducts: ResearchProduct[] = [];
    private optionalProductsChosen: ResearchProduct

    deserialize(input: any): this {
        this.sID = input.sID;
        this.description = input.description;
        this.quantity = input.quantity;
        this.price = input.price;
        this.validProduct = input.validProduct;
        this.nutrients = [];
        // console.log(input.nutrients)
        if (input.nutrients && input.nutrients.length != 0) {
            input.nutrients.splice(0,2);
            // console.log(input.nutrients)
            input.nutrients.forEach((nutrient, index) => {
                this.nutrients.push(new Nutrient().deserialize(nutrient, index));
            });
        }
        if (input.optionalProducts) {
            if (input.optionalProducts.length == 0) {
                this.optionalProducts = [new ResearchProduct()];
            }
            else {
                for (let optionalProduct of input.optionalProducts)
                    this.optionalProducts.push(new ResearchProduct().deserialize(optionalProduct));
            }
            this.optionalProductsChosen = this.optionalProducts[0];
        }
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
}
