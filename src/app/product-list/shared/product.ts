export class Product {
    title: string;
    size: string;
    price: any;
    file: File;
    category: string;
    url: string;
    constructor(file: File) {
        this.file = file;
    }
}

