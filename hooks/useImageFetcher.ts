// hooks/useImageFetcher.ts
import { useState } from 'react';
import { ImageData } from '@/types/types';

export function useImageFetcher() {
    const [currentImage, setCurrentImage] = useState<ImageData | null>(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [imageEnabled, setImageEnabled] = useState(false);

    const fetchImageForAnswer = async (answerText: string): Promise<void> => {
        if (!imageEnabled) return;

        setImageLoading(true);
        try {
            const response = await fetch(`/api/get_image?query=${encodeURIComponent(answerText)}`);
            console.log('Fetching image for answer:', response);

            if (response.ok) {
                const imageData = await response.json();
                console.log('Fetched image data:', imageData);
                setCurrentImage(imageData);
            }
        } catch (error) {
            console.warn('Could not fetch image:', error);
        } finally {
            setImageLoading(false);
        }
    };

    const toggleImages = (): void => {
        setImageEnabled(!imageEnabled);
        if (!imageEnabled) {
            console.log('Images enabled');
        }
    };

    return {
        currentImage,
        setCurrentImage,
        imageLoading,
        imageEnabled,
        setImageEnabled,
        fetchImageForAnswer,
        toggleImages
    };
}