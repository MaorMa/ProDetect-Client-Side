import { MetaData } from './meta-data';

export class ReceiptToReturn {
    public receiptID: string;//TODO getters
    private marketID: string;
    private image: string;
    public status: string;
    private uploadTime: Date;
    private products: MetaData[];

    deserialize(input: any): this {
        this.receiptID = input['receiptID'];
        this.marketID = input['marketID'];
        this.image = input['image'];
        this.status = input['status'];
        this.uploadTime = input['uploadTime']
        this.products = [];
        for(let metaData of input['products']){
            this.products.push(new MetaData().deserialize(metaData));
        }
        return this;
    }
}
