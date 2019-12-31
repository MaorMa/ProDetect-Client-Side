export class ResearchProduct {
    private sID: string;
    private name: string;
    private similarity: string;

    constructor(){
        this.sID = "";
        this.name = "";
        this.similarity = "";
    }

    deserialize(input: any): this {
        // console.log(input)
        this.sID = input.sID;
        this.name = input.name;
        this.similarity = input.similarity;
        return this;
    }

    //#region
	public getsID(): string {
		return this.sID;
	}

	public getName(): string {
		return this.name;
    }
    
	public getSimilarity(): string {
		return this.similarity;
	}

	public setsID(value: string) {
		this.sID = value;
	}

	public setName(value: string) {
		this.name = value;
    }

	public setSimilarity(value: string) {
		this.similarity = value;
	}
    //#endregion

}
