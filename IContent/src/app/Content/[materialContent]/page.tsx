'use client';
import style from '../../../styles/Modules/materialContent.module.scss'
import { useEffect, useState, useRef } from 'react';
import { getUniqueContent } from '@/app/api/api'
import { Content } from '@/app/api/api'
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function material({searchParams}: { searchParams: { [key: string]: string }})
{
  const [contents, setContents] = useState<Content | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePDFDocumentDonwload = async () => {
     setIsRendering(true);

     await html2canvas(contentRef.current!).then((canvas) => {
      const scale = 0.6;
      const contentWidth = canvas.width * scale;
      const contentHeight = canvas.height * scale;

      const pageData = canvas.toDataURL('image/jpeg', 0.8);
      // create a new PDF document  
      var doc = new jsPDF('p', 'pt', [contentWidth, contentHeight]);
      const marginLeft = 0;
      const marginTop = 0;

      doc.addImage(pageData, 'JPEG', marginLeft, marginTop, contentWidth, contentHeight, 'FAST');
      doc.save(`${contents?.title}.pdf`);

      setIsRendering(false);
    })
  }

    useEffect(() => {
        const fetchUniquePosts = async () => {
          try 
          {
            if(!searchParams === undefined)
            {
              return(
                <h1>Parâmetros de conteúdo indefinidos</h1>
              );
            }
            else
            {
                const contentss = await getUniqueContent(searchParams!.id!);
                setContents(contentss as Content);
            }
          } 
          catch (error) 
          {
            console.error('Erro ao buscar conteúdo: ', error);
          }
        };
      
        fetchUniquePosts();
      }, [searchParams]);

      const [isClient, setIsClient] = useState(false)
 
        useEffect(() => {
          setIsClient(true)
       },[])
        
  return(
      <main className={style.main}>
            <section className={style.section}>
                <div className={style.moldure}>
                    <div className={style.cardMoldure}>
                        <button className={style.downloadButton} onClick={handlePDFDocumentDonwload} disabled={isRendering}>
                            <Download className={style.Download} width={30} height={30}/>
                        </button>
                        {isClient && (
                            <div className={style.boxDonwload}>
                              {isRendering ? (
                                    <p className={style.p}>Renderizando PDF...</p>) : (<p className={style.p}>Baixar em PDF</p>)}
                            </div>
                        )}
                          <>
                          <div ref={contentRef}>
                            <h1 className={style.tittle}>{contents?.title}</h1>
                                <div className={style.content}>
                                  <p className={style.paragrafe}>
                                      {contents?.body}
                                  </p>
                                  <img className={style.image} src={contents?.image_content} alt='image' width={500} height={500}/>
                              </div>
                          </div>
                        </>
                    </div>
                </div>
            </section>
      </main>
    )
}

export default material