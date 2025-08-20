// types.ts
export interface Answer {
    text: string;
    isCorrect: boolean;
}

export interface Question {
    q: string;
    answers: Answer[];
    points?: number;
}

export interface ImageData {
    imageUrl: string;
    thumbnailUrl: string;
    altText: string;
    photographer: string;
    photographerUrl: string;
}