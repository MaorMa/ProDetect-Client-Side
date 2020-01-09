import { MetaData } from './meta-data';

export class ReceiptToReturn {
    public receiptID: string;//TODO getters
    public marketID: string;
    public image: string;
    public status: string;
    public uploadTime: string;
    public products: MetaData[];

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
