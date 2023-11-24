'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../styles/HomeContent.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import CardsPage from '../Function/Cards/page';
import Footer from '../components/footer/footer';
import { gerarCor } from '../Function/Colors/colors';
import Menu from '../components/menu/page';
import Contents from '../components/Content/page';

function Content() 
{
  const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF');
  
  useEffect(() => {
    const cor = gerarCor();
    setBackgroundColor(cor);
  }, []);

  return (
    <main>
        <Menu />
        <Contents/>
    </main>
  );
}

export default Content;
