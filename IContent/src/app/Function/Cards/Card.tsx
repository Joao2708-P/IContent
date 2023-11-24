import React from 'react';
import { CardData } from './types';
import { useEffect, useState } from 'react';
import styles from '../../../styles/Modules/FunctionCards.module.scss';
import Link from 'next/link';
import { Car } from 'lucide-react';

interface CardProps {
  card: CardData;
  backgroundColor: string;
}

const Card: React.FC<CardProps> = ({ card, backgroundColor}) => {
  
  return (
    <div className={styles.corp}>
      <Link key={card.id} href={`/Content/{${card.body}?id=${card.id}`}>
        <div className={styles.card}>
          <div className={styles.content}>
            <h1 className={styles.h1}>{card.title}</h1>
            <p>{card.description}</p>
          </div>
          <div className={styles.circle} style={{ backgroundColor }}></div>
        </div>
      </Link>
    </div>
  );
}

export default Card;