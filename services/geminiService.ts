
import { GoogleGenAI, Modality } from "@google/genai";
import type { EditedImage } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function dataUrlToInlineData(dataUrl: string): { mimeType: string; data: string } {
    const parts = dataUrl.split(';base64,');
    if (parts.length !== 2) {
        throw new Error('Invalid data URL format');
    }
    const mimeType = parts[0].split(':')[1];
    const data = parts[1];
    return { mimeType, data };
}

export async function editImage(base64ImageDataUrl: string, prompt: string): Promise<EditedImage> {
    const { mimeType, data: base64ImageData } = dataUrlToInlineData(base64ImageDataUrl);

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: {
            parts: [
                {
                    inlineData: {
                        data: base64ImageData,
                        mimeType: mimeType,
                    },
                },
                {
                    text: prompt,
                },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    if (!response.candidates || response.candidates.length === 0) {
        throw new Error('No response candidates found from the API.');
    }
    
    const result: EditedImage = { image: null, text: null };
    let imageFound = false;

    for (const part of response.candidates[0].content.parts) {
        if (part.text) {
            result.text = part.text;
        } else if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            const imageMimeType = part.inlineData.mimeType;
            result.image = `data:${imageMimeType};base64,${base64ImageBytes}`;
            imageFound = true;
        }
    }
    
    if (!imageFound) {
        throw new Error('API response did not contain an image. The model may have refused the request.');
    }

    return result;
}
