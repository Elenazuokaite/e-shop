export class Product {
    title: string;
    size: string;
    price: any;
    file: File;
    category: string;
    url: string;
    progress: number;
    name: string;

    constructor(file: File) {
        this.file = file;
    }
}

