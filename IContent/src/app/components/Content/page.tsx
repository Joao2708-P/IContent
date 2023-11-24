'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../styles/Modules/Content.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import CardsPage from '../../Function/Cards/page';
import Footer from '../../components/footer/footer';
import { gerarCor } from '../../Function/Colors/colors';
import Menu from '../../components/menu/page';

function Contents() 
{
  const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF');
  
  useEffect(() => {
    const cor = gerarCor();
    setBackgroundColor(cor);
  }, []);

  return (
    <main>
      <Menu />
      <section className={styles.section}>
          <div className={styles.tittleMaterial} style={{ backgroundColor }}>
              <h2 className={styles.h2}>Matérias</h2>
          </div>
          <CardsPage backgroundColor={backgroundColor} />
          <Footer />
      </section>
    </main>
  );
}

export default Contents;
