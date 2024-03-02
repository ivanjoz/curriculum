import { JSX } from "solid-js"
import { ITechnologies, IWordExperience, foda, technologies, studies, workExperience, skills, diaHabitual, IStudy, experienciaAdicional, socialNetworks } from "~/content"
import style from "../styles/main.module.css"
import icon_location from '../../public/images/icon-location.svg?raw'
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
    { name: "", setContent: e => e.name }, 
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
    <div class={style.about_me_layer}>
      <div class={style.photo_circle}>
        <img src="images/ivan-angulo-profile.webp" alt="" />
      </div>
      <div class={`${style.letter}`}>
        <h1 class="h1 bold">Iván J. Angulo Reyna</h1>
      </div>
      <div class={`flex ${style.location_container}`}>
        <img src={parseSVG(icon_location)} alt="" 
          style={{ "margin-right": '3px', width: '1rem', height: '1rem' }} />
        <div class={`h3 ${style.location}`}>Trujillo - Perú</div>
      </div>
      <div class={`h3 ${style.location}`}>ivan@un.pe</div>
      <div class={style.letter}>
        <h2 style={{ "margin-bottom": '0' }} class="h2 bold">Software Developer FullStack</h2>
      </div >
      <div class={style.letter} style={{ padding: '8px', "text-align": 'center' }}>
        + 5 años de experiencia desarrollando sistemas cloud con Node.Js, Go y C# y AWS, Linux, frontend con React y bases de datos SQL.
      </div>
      <div class="flex">
      { socialNetworks.map(e => {
          return <div class={style.social_icon}>
            <img src={parseSVG(e.icon)} alt="" />
          </div>
        })
      }
      </div>
    </div>
    <div class={style.content}>
      <h2 class="bold">Tecnologías / Años de Experiencia</h2>
      <div style={{ width: '100%', display: 'flex' }}>
        <table class={style.table_main}>
          <thead>
            <tr>
              {columns.map(e => <th class={e.headerCss}>{e.name}</th>)}
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
        <div style={{ "flex-grow": 1, "margin-left": '1vw', display: 'flex', "flex-direction": 'column' }}>
          <div class="bold h3 tt-c1">
            Experiencia adicional en:
          </div>
          { experienciaAdicional.map(e => {
              return <div class="flex">
                <div style={{ width: '0.8rem' }}>●</div>
                <div>{getContent(e)}</div>
              </div>
            })
          }
          <div style={{ width: "100%", "border-bottom": '1px solid black', margin: '12px 0' }}>
          </div>
          <div class="bold h3 tt-c1">Día de trabajo habitual:</div>
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
      <h2>Skills</h2>
      <div class={`flex ${style.skill_card_container}`}>
        { skills.map(e => {
            return <div class={`${style.skill_card}`}>
              <img class={`${style.skill_image}`} alt="" src={parseSVG(e.icon as string)}/>
              <div class={`${style.skill_descrip}`}>{getContent(e.desc)}</div>
            </div>
          })
        }
      </div>
      <h2 class="bold">Experiencia Laboral</h2>
      {/* EXPERIENCIA LABORAL */}
      <div class={style.table_card_container}>
        { workExperience.map(e => {
            return <WordExperienceCard args={e} />
          })
        }
      </div>
      <h2 class="bold">Últimos Proyectos</h2>
      <div style={{ "padding-left": '0.8rem' }}>
        <div>● Genix: Sistema de gestión para Mypes (Logística, Comercial, Finanzas)</div>
        <div>● Librería de conversación de imagen .webp y .avif en Go con binarios precompilados hechos en Rust.</div>
        <div>● ORM para ScyllaDB / Cassandra hecho en Go.</div>
        <div>● SmartBerry. Sistema de gestión de producción agrícola de Hortifrut.</div>
        <div>● Sistema de componentes frontend en Solid.Js</div>
        <div>● Jobfinder. Sistema de búsqueda de empleos y scraping.</div>
        <div>● Páginas web y CSM con React + Next.js</div>
      </div>
      <h2 class="bold">F.O.D.A</h2>
      <div class={style.table_card_container}>
        { foda.map(item => {
            return <div class={style.foda_card}>
              <div class="bold h5 tt-c1 w100 ta-c">{item.name}</div>
              { item.list.map(text => {
                  return <div>● {text}</div>
              })
              }
            </div>
          })
        }
      </div>
      <h2 class="bold">Estudios</h2>
      <div class={style.table_card_container}>
        { studies.map(e => {
            return <StudyCard args={e} />
          })
        }
      </div>
    </div>
  </div>
}

interface IWordExperienceCard {
  args: IWordExperience
}

const WordExperienceCard = (props: IWordExperienceCard) => {
  console.log("logo:: ", props.args.logo)

  return <div class={style.table_card}>
    <div style={{ display: 'flex' }}>
      <div class={style.table_card_image_ctn}>
        <img class={style.table_card_image} alt="" 
          src={props.args.logoImg || parseSVG(props.args.logo as string)}/>
      </div>
      <div>
        <div class="h2 bold tt-c1">{props.args.company}</div>
        <div>{props.args.role}</div>
      </div>
    </div>
    <div>
    { props.args.description.map(e => {
        return <div>● {e}</div>
      })
    }
    </div>
  </div>
}

interface IStudyCard {
  args: IStudy
}

const StudyCard = (props: IStudyCard) => {
  console.log("logo:: ", props.args.logo)

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