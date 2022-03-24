class Ingredient {

    title: string;
    amount: string;
    id: string;

    constructor(title: string, amount: string) {
        this.title = title;
        this.amount = amount;
        this.id = new Date().toISOString();
    }
}

export default Ingredient;