import React, { useEffect, useState } from 'react';
import Card from './Card';
import { generateCards } from './[search]/generateCards';
import { CardData } from './types';
import { useRouter } from 'next/router';

interface CardsPageProps {
  backgroundColor: string;
}

const CardsPage: React.FC<CardsPageProps> = ({ backgroundColor }) => 
{
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        const generatedCards = await generateCards();
        setCards(generatedCards);
      } catch (error) {
        console.error('Erro ao gerar os cards:', error);
      }
    }

    fetchCards();
  }, []);

  return (
    <div>
      {cards.map((card) => (
        <>
          <Card key={card.id} card={card} backgroundColor={backgroundColor} />
        </>
      ))}
    </div>
  );
}

export default CardsPage;
