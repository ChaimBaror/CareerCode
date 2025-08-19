import React, { Suspense } from 'react';
import QuizClient from "./QuizClient";

export default function QuizPage() {
    return (
        <Suspense fallback={<div>Loading quiz...</div>}>
            <QuizClient />
        </Suspense>
    );
}
