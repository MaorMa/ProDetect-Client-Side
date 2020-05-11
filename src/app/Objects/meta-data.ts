import { Nutrient } from './nutrient';
import { ResearchProduct } from './research-product';

export class MetaData {
    sID: string;
    description: string;
    quantity: string;
    price: string;
    validProduct: boolean;
    yCoordinate: number = 0;
    nutrients: Nutrient[];
    optionalProducts: ResearchProduct[] = [];
    optionalProductsChosen: ResearchProduct = new ResearchProduct();

    deserialize(input: any): this {
        this.sID = input.sID;
        this.description = input.description;
        this.quantity = input.quantity;
        this.price = input.price;
        this.validProduct = input.validProduct;
        this.nutrients = [];
        // console.log(input.nutrients)
        if (input.nutrients && input.nutrients.length != 0) {
            input.nutrients.forEach((nutrient) => {
                this.nutrients.push(new Nutrient().deserialize(nutrient));
            });
        }
        if (input.optionalProducts) {
            for (let optionalProduct of input.optionalProducts)
                this.optionalProducts.push(new ResearchProduct().deserialize(optionalProduct));
            // }
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

    getNutrients() {
        return this.nutrients;
    }

    setOptionalProducts(input: any) {
        if (input) {
            for (let optionalProduct of input)
                this.optionalProducts.push(new ResearchProduct().deserialize(optionalProduct));
            this.optionalProductsChosen = this.optionalProducts[0];
        }
    }
}
