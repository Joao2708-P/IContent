import { CardData } from "../types";
import { getContent, Content } from "@/app/api/api";
import { useEffect, useState } from "react";

export async function generateCards(): Promise<CardData[]> 
{
    const cards: CardData[] = [];

    try 
    {
        const contents: Content[] = await getContent();

        for (let i = 0; i < contents.length; i++) 
        {
            const content = contents[i];

            const card: CardData = 
            {
                id: content.id,
                title: content.title,
                description: content.slug,
                body: content.body
            };

            cards.push(card);
        }

        return cards;
    } 
    catch (error) 
    {
        console.error('Erro ao buscar conteúdo:', error);
        throw new Error('Erro ao buscar conteúdo');
    }
}
