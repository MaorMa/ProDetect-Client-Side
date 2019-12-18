export class Nutrient {
    private code: string;
    private name: string;
    private value: number;
    //#region 
    /**
     * Getter $code
     * @return {string}
     */
	public get $code(): string {
		return this.code;
	}

    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
		return this.name;
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
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
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
