export class Nutrient {

    private code: string;
    private value: number;
    
    deserialize(input: any): this {
        // console.log(input)
        this.code = input.Code;
        this.value = input.Value;
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
     * @return {string}
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
     * @param {string} value
     */
	public set $value(value: number) {
		this.value = value;
	}
    //#endregion
}
