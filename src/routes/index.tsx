import { JSX } from "solid-js"
import { ITechnologies, IWordExperience, foda, technologies, studies, workExperience, skills, diaHabitual, IStudy, experienciaAdicional, socialNetworks, ultimosProyectos } from "~/content"
import style from "../styles/main.module.css"
import icon_location from '../../public/images/icon-location.svg?raw'
import icon_email from '../../public/images/email-icon.svg?raw'
import { parseSVG } from "~/helpers"

interface ISkillsColumns {
  name: string
  setContent: (e: ITechnologies) => string | JSX.Element
  headerCss?: string
  cellCss?: string
}

const yearInicio = 17
const yearFin = 24

const getContent = (content: string | { en?: string, es?: string }): string => {
  if(typeof content === 'string'){
    return content
  } else {
    return (content.es||content.en) as string
  }
}

export default function Home() {

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
      <h2 class={`bold ${style.title}`}>Tecnologías / Años de Experiencia</h2>
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
          <div class="bold h3 tt-c1 mb-06">
            Experiencia adicional en:
          </div>
          { experienciaAdicional.map(e => {
              return <div class="flex ai-start mb-06">
                <div class={`${style.dot}`} />
                <div>{getContent(e)}</div>
              </div>
            })
          }
          <div style={{ width: "100%", "border-bottom": '1px solid black', margin: '12px 0' }}>
          </div>
          <div class="bold h3 tt-c1 mb-06">Día de trabajo habitual:</div>
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
      <h2 class={`bold ${style.title}`}>Skills</h2>
      <div class={`flex ${style.skill_card_container}`}>
        { skills.map(e => {
            return <div class={`${style.skill_card}`}>
              <img class={`${style.skill_image}`} alt="" src={parseSVG(e.icon as string)}/>
              <div class={`${style.skill_descrip}`}>{getContent(e.desc)}</div>
            </div>
          })
        }
      </div>
      <h2 class={`bold ${style.title}`}>Experiencia Laboral</h2>
      {/* EXPERIENCIA LABORAL */}
      <div class={style.table_card_container}>
        { workExperience.map(e => {
            return <WordExperienceCard args={e} />
          })
        }
      </div>
      <h2 class={`bold ${style.title}`}>Últimos Proyectos</h2>
      <div style={{ "padding-left": '0.8rem' }}>
        { ultimosProyectos.map(e => {
            return <div class="flex ai-start">
              <div class={`${style.dot}`} />{getContent(e)}
            </div>
          })
        }
      </div>
      <h2 class={`bold ${style.title}`}>F.O.D.A</h2>
      <div class={style.table_card_container}>
        { foda.map(item => {
            return <div class={style.foda_card}>
              <div class="bold h5 tt-c1 w100 ta-c">{item.name}</div>
              { item.list.map(text => {
                  return <div class="flex ai-start"><div class={`${style.dot}`} /> {text}</div>
              })
              }
            </div>
          })
        }
      </div>
      <h2 class={`bold ${style.title}`}>Estudios</h2>
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
      <div class={`${style.letter} ${style.about_me}`} style={{ padding: '8px', "text-align": 'center' }}>
        5+ años de experiencia desarrollando sistemas cloud con Node.Js, Go y C# y AWS, Linux, frontend con React y bases de datos SQL.
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

const months = {
  '1': { es: 'Ene', en: "Jan" }, 
  '2' : { es: 'Feb', en: "Feb"  },
  '3': { es: 'Mar', en: "Mar" }, 
  '4' : { es: 'Abr', en: "Apr"  },
  '5': { es: 'May', en: "May" }, 
  '6' : { es: 'Jun', en: "Jun"  },
  '7': { es: 'Jul', en: "Jul" }, 
  '8' : { es: 'Ago', en: "Ago"  },
  '9': { es: 'Sep', en: "Sep" }, 
  '10': { es: 'Oct', en: "Oct"  },
  '11':{ es: 'Nov', en: "Nov" }, 
  '12': { es: 'Dic', en: "Dec"  },
} as { [e: string]: { en: string, es: string } }

const parseYear = (yearMon: number) =>{
  if(yearMon === -1){ return "Present" }
  const year = String(yearMon).substring(0,4)
  const month = months[String(parseInt(String(yearMon).substring(4,6)))]

  return `${getContent(month||"")} ${year}`
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
        <div class={`bold h5 ${style.work_year}`}>
          {`${parseYear(props.args.years[0])} - ${parseYear(props.args.years[1])}`}
        </div>
      </div>
    </div>
    <div>
    { props.args.description.map(e => {
        return <div class="flex ai-start"><div class={`${style.dot}`} /> {e}</div>
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
        <div>{props.args.content}</div>
      </div>
    </div>
    <div>
    { props.args.content.map(e => {
        return <div>{e}</div>
      })
    }
    </div>
  </div>
}