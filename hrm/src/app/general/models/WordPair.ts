export interface WordPair {
    id: number,
    english: string,
    german: string,
    answeredCorrectly: boolean,
    amountOfRightAnswers: number | null,
    amountOfWrongAnswers: number | null,
}