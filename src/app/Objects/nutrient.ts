export class Nutrient {
    private codes: string[] = ['nut203','nut204','nut205','nut208','nut221','nut255','nut291','nut301','nut303','nut304',
    'nut305','nut306','nut307','nut309','nut312','nut318','nut320','nut321','nut323','nut401','nut404','nut405','nut406',
    'nut415','nut417','nut418','nut601','nut606','nut607','nut608','nut609','nut610','nut611','nut612','nut613','nut614',
    'nut617','nut618','nut619','nut620','nut621','nut622','nut623','nut628','nut625','nut630','nut631','nut645','nut646',
    'nut324','nut269','nut605'
    ]
    private code: string;
    private value: string;
    
    deserialize(input: any, index: number): this {
        // console.log(input)
        this.code = this.codes[index];
        this.value = input;
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
	public get $value(): string {
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
	public set $value(value: string) {
		this.value = value;
	}
    //#endregion
}
