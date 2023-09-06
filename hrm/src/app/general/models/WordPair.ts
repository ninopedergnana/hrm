export interface WordPair {
    english: string,
    german: string,
    answeredCorrectly: boolean,
    amountOfRightAnswers: number | null,
    amountOfWrongAnswers: number | null,
}