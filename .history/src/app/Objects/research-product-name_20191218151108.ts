export class ResearchProduct {
    private sID: string;
    private name: string;

    deserialize(input: any): this {
        this.sID = input.sID;
        this.name = input.name;
        return this;
    }

    //#region
    /**
     * Getter $sID
     * @return {string}
     */
	public get $sID(): string {
		return this.sID;
	}

    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
		return this.name;
	}

    /**
     * Setter $sID
     * @param {string} value
     */
	public set $sID(value: string) {
		this.sID = value;
	}

    /**
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
	}
    //#endregion

}
