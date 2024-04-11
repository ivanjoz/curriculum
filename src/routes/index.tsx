import { JSX, Show, createEffect, createSignal, on } from "solid-js"
import { ITechnologies, IWordExperience, foda, technologies, studies, workExperience, skills, diaHabitual, IStudy, experienciaAdicional, socialNetworks, ultimosProyectos, mainContent } from "~/content"
import style from "../styles/main.module.css"
import icon_location from '../../public/images/icon-location.svg?raw'
import icon_email from '../../public/images/email-icon.svg?raw'
import { IContent, getContent, parseSVG, parseYear } from "~/helpers"
import { Spinner } from "~/components/Counter"

interface ISkillsColumns {
  name: string
  setContent: (e: ITechnologies) => string | JSX.Element
  headerCss?: string
  cellCss?: string
}

const yearInicio = 17
const yearFin = 24

export default function Home() {
  const [downloadStartKey,setDownloadStartKey] = createSignal(0)

  const columns: ISkillsColumns[] = [
    { name: "", setContent: e => <div class={style.table_cell_1}>{e.name}</div> }, 
  ]

  for(let year = yearInicio; year <= yearFin; year++) {
    columns.push({ 
      name: `${year}`, 
      headerCss: style.table_header,
      cellCss: style.table_cell,
      setContent: e => {
        const yearPoint = e.years.find(x => x[0] === year)
        if(!yearPoint){ return null }

        let height = 0
        height = (yearPoint[1] - 1) * 2
        if(height < 3){ height = 3 } 
        if(height > 18){ height = 18 } 

        return <div style={{ height: '100%', position:'relative' }}>
           <div class={style.cell_line} style={{ height: `${height}px` }}>
           </div>
        </div>
      }
    })
  }

  return <div class={style.main}>
    <AboutMeLayer css={style.about_me_layer}/>
    <AboutMeLayer css={style.about_me_layer_inline}/>
    <div class={style.content}>
      <div class="flex jc-between" style={{ "margin-bottom": '-0.8rem' }}>
        <div></div>
        <div>
          <button onClick={ev => {
            ev.stopPropagation()
            setDownloadStartKey(Date.now())
          }}>Descarga</button>
        </div>
      </div>
      <DownloadPdfCard downloadStartKey={downloadStartKey()} />
      <h2 class={`bold ${style.title}`}>
        { getContent(mainContent.tecnologias )}
      </h2>
      <div class={`flex w100 ${style.tecnologias_container}`}>
        <div class={style.table_main_container}>
          <table class={`w100 ${style.table_main}`}>
            <thead>
              <tr>
                {columns.map(e => <th>
                  <div class={e.headerCss}>{e.name}</div>
                </th>)}
              </tr>
            </thead>
            <tbody>
              {technologies.map(e => {
                return <tr>
                { columns.map(c => {
                  return <td class={c.cellCss}>
                      {c.setContent(e)}
                    </td>
                  }) 
                }
                </tr>
              })}
            </tbody>
          </table>
        </div>
        <div class={`flex ${style.experiencia_container}`}>
          <div class={`bold h3 tt-c1 mb-06 ${style.subtitle}`}>
            {getContent(mainContent.sub1)}
          </div>
          <div class="w100 block-margin">
          { experienciaAdicional.map((e,i) => {
              return LineCard(e,i)
            })
          }
          </div>
          <div class={`${style.line_border}`}>
          </div>
          <div class={`bold h3 tt-c1 mb-06 ${style.subtitle}`}>
            {getContent(mainContent.sub2)}
          </div>
          <table>
            <tbody>
            { diaHabitual.map(e => {
                return <tr>
                  <td class="bold h3">{`${e.percent}%`}</td>
                  <td class="">{getContent(e.content)}</td>
                </tr>
              })
            }
            </tbody>
          </table>
        </div>
      </div>
      <h2 class={`bold ${style.title}`}>{getContent(mainContent.sub3)}</h2>
      <div class={`flex ${style.skill_card_container}`}>
        { skills.map(e => {
            return <div class={`${style.skill_card}`}>
              <img class={`${style.skill_image}`} alt="" src={parseSVG(e.icon as string)}/>
              <div class={`${style.skill_descrip}`}>{getContent(e.desc)}</div>
            </div>
          })
        }
      </div>
      <h2 class={`bold ${style.title}`}>{getContent(mainContent.sub4)}</h2>
      {/* EXPERIENCIA LABORAL */}
      <div class={style.table_card_container}>
        { workExperience.map(e => {
            return <WordExperienceCard args={e} />
          })
        }
      </div>
      <h2 class={`bold ${style.title}`}>{getContent(mainContent.sub5)}</h2>
      <div class="block-margin" style={{ "padding-left": '0.8rem' }}>
        { ultimosProyectos.map((e,i) => {
            return LineCard(e,i)
          })
        }
      </div>
      <h2 class={`bold ${style.title}`}>{getContent(mainContent.sub6)}</h2>
      <div class={`${style.table_card_container}`}>
        { foda.map(item => {
            return <div class={`block-margin4 ${style.foda_card}`}>
              <div class="bold h5 tt-c1 w100 ta-c">{item.name}</div>
              { item.list.map(text => {
                  return <div class="flex ai-start"><div class={`${style.dot_static}`} /> {text}</div>
              })
              }
            </div>
          })
        }
      </div>
      <h2 class={`bold ${style.title}`}>{getContent(mainContent.sub7)}</h2>
      <div class={style.table_card_container}>
        { studies.map(e => {
            return <StudyCard args={e} />
          })
        }
      </div>
    </div>
  </div>
}

interface IAboutMeLayer {
  css: string
}

const AboutMeLayer = (props: IAboutMeLayer) => {
  return <div class={props.css}>
    <div>
      <div class={style.photo_circle}>
        <img src="images/ivan-angulo-profile.webp" alt="ivan angulo reyna profile" />
      </div>
      <div class={`${style.letter}`}>
        <h1 class={`h1 bold ${style.ivan_nombre}`}>Iván J. Angulo</h1>
      </div>
      <div class={`flex ${style.location_container}`}>
        <img src={parseSVG(icon_location)} alt="" 
          style={{ "margin-right": '3px', width: '1rem', height: '1rem' }} />
        <div class={`${style.location}`}>Trujillo - Perú</div>
      </div>
    </div>
    <div>
      <div class={`${style.letter} ${style.developer}`}>
        <h2 class={`h22 bold ${style.experiencia1}`}>Software Developer FullStack</h2>
      </div >
      <div class={`${style.letter} ${style.about_me}`} style={{ padding: '0.7vh', "text-align": 'center' }}>
        { getContent(mainContent.descripcion) }
      </div>
      <div class="flex">
      { socialNetworks.map(e => {
          return <div class={style.social_icon} onclick={ev => {
            ev.stopPropagation()
            window.open(e.url)
          }}>
            <img src={parseSVG(e.icon)} alt="" />
          </div>
        })
      }
      </div>
      <div class={`flex ${style.email_icon}`}>
        <img src={parseSVG(icon_email)} alt="" 
            style={{ "margin-right": '6px', width: '1rem', height: '1rem' }} />
        <div class={`h3 ${style.location}`}>
          <a href="mailto:ivan@un.pe" class={`${style.email}`}>ivan@un.pe</a>
        </div>
      </div>
    </div>
  </div>
}

interface IWordExperienceCard {
  args: IWordExperience
}

const WordExperienceCard = (props: IWordExperienceCard) => {

  return <div class={style.table_card}>
    <div style={{ display: 'flex' }}>
      <div class={style.table_card_image_ctn}>
        <img class={style.table_card_image} alt="" 
          src={props.args.logoImg || parseSVG(props.args.logo as string)}/>
      </div>
      <div>
        <div class="h2 bold tt-c1">{props.args.company}</div>
        <div>{props.args.role}</div>
        <div class={`bold ${style.work_year}`}>
          {`${parseYear(props.args.years[0])} - ${parseYear(props.args.years[1])}`}
        </div>
      </div>
    </div>
    <div class="block-margin">
    { props.args.description.map(e => {
        return <div class="flex ai-start"><div class={`${style.dot_static}`} /> {e}</div>
      })
    }
    </div>
  </div>
}

interface IStudyCard {
  args: IStudy
}

const StudyCard = (props: IStudyCard) => {
  
  return <div class={style.table_card}>
    <div style={{ display: 'flex' }}>
      <div class={style.table_card_image_ctn}>
        <img class={style.table_card_image} alt="" src={parseSVG(props.args.logo as string)}/>
      </div>
      <div>
        <div class="h2 bold tt-c1">{props.args.name}</div>
        <div>{props.args.carrer}</div>
        <div class={`bold ${style.work_year}`}>
          {props.args.years}
        </div>
      </div>
    </div>
    <div class="block-margin4">
      { props.args.content.map(e => {
          return <div class="flex ai-start"><div class={`${style.dot_static}`} /> {e}</div>
        })
      }
    </div>
  </div>
}

const LineCard = (text: IContent, i?: number) => {
  return <div class={`flex ai-start ${style.dot_container}`}>
    { i !== 0 && <div class={`${style.dot_line}`}/>  }
    <div class={`${style.dot}`} />{getContent(text)}
  </div>
}

export interface IDownloadPdfCard {
  downloadStartKey: number
}

const DownloadPdfCard = (props: IDownloadPdfCard) => {

  const [startDownloadPDF,setStartDownloadPDF] = createSignal(false)

  createEffect(on(() => props.downloadStartKey, () => {
    if(startDownloadPDF() || !props.downloadStartKey){ return }
    localStorage.removeItem("b64Pdf")
    setStartDownloadPDF(true)

    const downloadWait = setInterval(() => {
      // console.log("download in progress...")
      let b64Pdf = localStorage.getItem("b64Pdf")
      if(b64Pdf){
        localStorage.removeItem("b64Pdf")

        b64Pdf = atob(b64Pdf.split('base64,')[1])
        const pdfArray = new Uint8Array(b64Pdf.length)
        for (let i = 0; i < b64Pdf.length; i++){
          pdfArray[i] = b64Pdf.charCodeAt(i)
        }
        const blob = new Blob([pdfArray], { type: 'application/pdf' })
        
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = "ivan_angulo_cv.pdf"
        a.click()
        a.remove()
 
        clearInterval(downloadWait)
        setStartDownloadPDF(false)
      }
    },50)
  }))

  return <Show when={startDownloadPDF()}>
    <iframe src={window.origin + "/pdf?accion=download"} class="w100" 
      style={{ height: '200px', display: 'none' }} 
    />
    <Spinner className="card-c3"> 
      <div class="bold h3">Generando Documento PDF...</div>
      <div class="h5">Usando pdfmake y D3</div>
    </Spinner>
  </Show>
}