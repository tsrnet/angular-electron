export class SuperObject {

    public static isEquals(itemToCompare: any, sample: any): boolean {
        return (JSON.stringify(sample) == JSON.stringify(itemToCompare));
    }

    public static clone(sample: any): any {
        let clone: string = JSON.stringify(sample);
        return JSON.parse(clone);
    }

    public static encodeBase64(rawString: string): string {
        return btoa(rawString);
    }

    public static decodeBase64(encodedString: string): string {
        return atob(encodedString);
    }

}