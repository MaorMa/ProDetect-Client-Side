export class Nutrient {
    private code: string;
    private value: number;
    
    deserialize(input: any): this {
        this.code = input.code;
        this.value = input.value;
        return this;
    }

    //#region 
    /**
     * Getter $code
     * @return {string}
     */
	public get $code(): string {
		return this.code;
	}

    /**
     * Getter $value
     * @return {number}
     */
	public get $value(): number {
		return this.value;
	}

    /**
     * Setter $code
     * @param {string} value
     */
	public set $code(value: string) {
		this.code = value;
	}

    /**
     * Setter $value
     * @param {number} value
     */
	public set $value(value: number) {
		this.value = value;
	}
    //#endregion
}
