export interface TestObject {
    category_id : number,
    category: string,
    question: string,
    answer : {
        content: string,
        value: number
    }
}