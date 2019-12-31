import { ReceiptToReturn } from './receipt-to-return';

export class ReceiptToReturnList {
    // public Key: string;//family
    public Value: ReceiptToReturn[];


    deserialize(input: any): this {
        // this.Key = input['Key'];
        // console.log(input)
        this.Value = [];
        for(let receipt of input){
            // console.log(receipt);
            this.Value.push(new ReceiptToReturn().deserialize(receipt));
        }
        return this;
    }
}
