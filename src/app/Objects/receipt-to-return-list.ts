import { ReceiptToReturn } from './receipt-to-return';

export class ReceiptToReturnList {
    public Key: string;//family
    public Value: ReceiptToReturn[];


    deserialize(input: any): this {
        this.Key = input['Key'];
        this.Value = [];
        for(let receipt of input['Value'])
            this.Value.push(new ReceiptToReturn().deserialize(receipt));
        return this;
    }
}
