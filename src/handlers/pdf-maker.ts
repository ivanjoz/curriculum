import pdf from 'pdfmake/build/pdfmake'
import { Column, Content, TDocumentDefinitions } from 'pdfmake/interfaces'
import * as d3 from "d3";
import { ITechnologies, experienciaAdicional, skills, socialNetworks, technologies, ultimosProyectos, workExperience } from '~/content';
import cabecera_svg from '../images/cabecera_pdf_opt.svg?raw'
import fondo1_svg from '../images/fondo_3.svg?raw'
import icon_location from '../../public/images/icon-location.svg?raw'
import icon_email from '../../public/images/email-icon.svg?raw'
import circle_svg from '../images/circle.svg?raw'
import { getContent, makeCardShadow, parseYear, replaceSVGColor, replaceSVGHeight } from '~/helpers';

export const downloadPdf = async () => {
  localStorage.setItem("_isDownloadInProgress","1")

  pdf.fonts = {
    Roboto: {
      normal: window.origin + '/libs/open-sans-v40-latin-regular.ttf',
      bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.3.0-beta.1/fonts/Roboto/Roboto-Medium.ttf',
      italics: window.origin + '/libs/open-sans-v40-latin-regular.ttf',
      bolditalics: window.origin + '/libs/open-sans-v40-latin-regular.ttf',
    },
  }

  const icon_location_1 = replaceSVGColor(icon_location, ["#435C81"])
  const icon_email_1 = replaceSVGColor(icon_email, ["#435C81"])

  const makeText = (text: string, fontSize: number, lineHeight: number, alignment: string): Content => {
    return {
      text,
      fontSize: fontSize || 10,
      lineHeight: lineHeight || 1,
      alignment,
    } as Content
  }

  const demo1 = replaceSVGHeight(fondo1_svg, [0.8,0.8,0.8,0.8,0.8,0.8])
  console.log(demo1)

  const makeBulletLine = (text: string, lineHeight?: number, marginBottom?: number) => {
    return {
      columns: [
        {                      
          width: 7,
          svg: circle_svg,
          height: 7,
          marginTop: 3.5,
        },                      
        {    
          ...makeText(text, 0, lineHeight || 1, ""),
          width: "*",
          marginLeft: 3,
          marginBottom: marginBottom || 2,
        },
      ]
    }
  }


  const socialIcons: Column[] = [{ width: "*", text: "" }]
  for(let e of socialNetworks){
    socialIcons.push({
      width: 54,
      alignment: 'center',
      stack: [
        {
          svg: e.icon,
          width: 30,
          alignment: 'center',
        },
        {
          alignment: 'center',
          fontSize: 8,
          text: e.user,
          link: e.url,
          marginTop: 2,
          color: 'blue',
        }
      ]
    })  
  }
  socialIcons.push({ width: "*", text: "" })  


  const workExperienceCards: Column[] = []

  for(let we of workExperience){
    if(!we.logo){ continue }

    workExperienceCards.push({
      width: 264,
      unbreakable: true,
      fontSize: 10,
      marginLeft: 7,
      marginRight: 7,
      marginBottom: 14,
      marginTop: 8,
      stack: [
        { svg: makeCardShadow(we.pdfCardHeight), 
          fit: [277,Math.floor(300 * (we.pdfCardHeight||1))],
          relativePosition: { x: -14, y: -12 },
        },
        { 
          marginTop: 2,
          marginLeft: 6,
          marginRight: 6,
          marginBottom: 2,
          columns: [
            { width: 90, fit: [80,50],  svg: we.logo },
            { width: "*", 
              stack: [
                { text: we.company, fontSize: 12,
                  bold: true,
                },
                { text: we.role as string },
                {
                  bold: true,
                  text: `${parseYear(we.years[0])} - ${parseYear(we.years[1])}`,
                  color: "#ca5151",
                }
              ]
            },
          ]
        },
        ...(we.description.map(e => {
          return makeBulletLine(e,0.9)
        }))
      ]
    })
  }

  const workExperienceCardGroupd: Column[][] = [[]]

  for(let we of workExperienceCards){
    let last = workExperienceCardGroupd[workExperienceCardGroupd.length - 1]
    if(last.length === 1){
      last.push({
        width: 16,
        text: ""
      })
    }
    if(last.length === 3){
      last = []
      workExperienceCardGroupd.push(last)
    }
    last.push(we)
  }

  const skillsContent: Content[] = []

  let skillsRemain = [...skills].sort((a,b) => a.order1 - b.order1)

  let tryCount = 0

  while(skillsRemain.length > 0 && tryCount < 8){
    tryCount++
    const group = skillsRemain.slice(0, 2)
    skillsRemain = skillsRemain.filter(e => !group.includes(e))

    const columns: Column[] = []
    for(let sk of group){
      columns.push({
        width: "*",
        marginBottom: 2,
        marginLeft: 4,
        marginRight: 4,
        marginTop: sk.marginTop || 0,
        stack: [
          {
            alignment: 'center',
            svg: sk.icon,
            fit: [36,36],
            marginBottom: 2,
          },
          makeText(sk.desc, 0, 0.9, 'center')
        ]
      })
    }

    if(columns.length === 1){
      columns.push({ width: "*", text: "" })
    }

    skillsContent.push({
      columns,
      marginBottom: 4,
    })
  }

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [ 25, 25, 25, 25 ],
    content: [
      {
        svg: await makeCabecera(),
        width: 595,
        absolutePosition: { x: 0, y: 0 }
      },
      { columns: [
          { width: 200,
            alignment: 'center', 
            stack: [              
              {
                fontSize: 17,
                text: "Iván J. Angulo",
                alignment: 'center',
                marginTop: 155,
                marginLeft: 36,
                bold: true,
              },
            ]
          },
          { width: 30, text: "",

          },
          {
            width: "*",
            fontSize: 14,
            stack: [
              {  
                marginTop: 8,
                alignment: 'center',
                fontSize: 16,
                bold: true,
                text: "Software Developer",
              },
              { 
                marginTop: 12,
                alignment: 'center',
                fontSize: 11,
                text: '5+ años de experiencia desarrollando sistemas cloud con Node.Js, Go y C# y AWS, Linux, frontend con React y bases de datos SQL.',
                marginBottom: 10,
              },
              { columns: socialIcons,
                alignment: 'center',                
              },
              { 
                marginTop: 20,
                alignment: 'center',
                columns: [
                  { width: '*', text: "" },
                  { 
                    width: 120,
                    alignment: 'center',
                    columns: [  
                      { width: '*', text: "" },                    
                      { 
                        marginTop: 3,
                        width: 12,
                        svg: icon_email_1,
                        height: 12,
                      },                      
                      {    
                        width: 70,                  
                        text: 'ivan@un.pe',
                        fontSize: 12,
                        link: 'mailto:ivan@un.pe',
                        color: '#1153B2',
                        marginBottom: 6,
                      },
                      { width: '*', text: "" }, 
                    ]
                  },
                  { 
                    width: 120,
                    alignment: 'center',
                    columns: [        
                      { width: '*', text: "" },              
                      { 
                        width: 12,
                        marginTop: 3,
                        svg: icon_location_1,
                        height: 11,
                      },
                      { 
                        width: 70,
                        text: 'Trujillo, Perú.',
                        fontSize: 11,
                        link: 'mailto:ivan@un.pe',
                      },
                      { width: '*', text: "" }, 
                    ]
                  },
                  { width: '*', text: "" },
                ]
              }
            ]
          },
        ]
      },
      { 
        marginTop: 19,
        marginBottom: 4,
        text: "Tecnologías & Años de Experiencia",
        fontSize: 12,
        bold: true,
      },
      {
        columns: [
          {
            svg: await generateSVGChart(),
            width: 300,
            // absolutePosition: { x: 0, y: 0 }
          },
          { width: "*",
            marginTop: -19,
            stack: [
              { text: "Conocimiento adicional en:", 
                fontSize: 12,
                bold: true,
                marginBottom: 4,
              },
              ...(experienciaAdicional.map(e => {
                return makeBulletLine(e.es,0.9)
              })),
              {
                marginTop: 7,
                marginBottom: 4,
                alignment: 'center',
                table: {
                  widths: [ "*" ],
                  body: [[ {
                    fillColor: "#f4f1ff",
                    text: "Skills",
                    alignment: 'center',
                    fontSize: 12,
                    bold: true,
                    border: [false, false, false, false],
                  } ]]
                }
              },
              ...skillsContent
            ]
          }
        ]
      },
      { 
        marginTop: 0,
        marginBottom: 4,
        text: "Experiencia Laboral",
        bold: true,
        fontSize: 14,
      },
      ...(workExperienceCardGroupd.map(columns => {
        return {          
          columns,
          marginBottom: 12,
        }
      })),
      { 
        marginTop: 8,
        marginBottom: 4,
        text: "Últimos Proyectos",
        bold: true,
        fontSize: 14,
      },
      {
        stack: [
          ...(ultimosProyectos.map((e,i) => {
            return {
              ...makeBulletLine(getContent(e.es),0.9),
              marginLeft: 8,
            }
          }))
        ]
      }
    ],
  }

  const pdfDoc = pdf.createPdf(docDefinition)
  console.log(pdfDoc)
  pdfDoc.download("ivan_angulo_cv_peru.pdf")
  localStorage.setItem("_isDownloadInProgress","")
}

export const makeCabecera = async () => {

  const profilePhotoRequest = await fetch("/images/ivan-angulo-profile.jpeg")
  const profilePhoto = await profilePhotoRequest.blob()

  const profilePhotoB64 = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(profilePhoto)
    reader.onloadend = () => {
      const base64data = reader.result
      resolve(base64data)
    }
  })

  // extrae la image
  const idx1 = cabecera_svg.indexOf('data:image/')
  const idx2 = cabecera_svg.indexOf('"', idx1 + 1)
  const img = cabecera_svg.substring(idx1, idx2)
  const cabecera_svg_new = cabecera_svg.replace(img, profilePhotoB64)

  return cabecera_svg_new
}

export const generateSVGChart = async (): Promise<string> => {

  const container = document.createElement("div")
  const rem = 16
  const rowHeight = Math.floor(rem * 1.6)

  const height = ((technologies.length + 1) * rowHeight)

  const svg = d3.select(container).append("svg")
    .attr("width", 475).attr("height", height).attr("viewBox", `0 0 475 ${height}`)
  
  const cellWidth = rem * 12
  const years = []
  for(let year = 17; year <= 24; year++){
    years.push(year)
  }

  const technologiesRows = [...technologies]
  technologiesRows.unshift({ name: "", isYear: true } as ITechnologies)

  for(let i = 0; i < technologiesRows.length; i++){
    const isEvent = i % 2 === 0
    const fillColor = isEvent ? "#f4f1ff" : "white"
    const e = technologiesRows[i]

    svg.append("rect")
      .attr("x", 0).attr("y", i * rowHeight)
      .attr("width", cellWidth).attr("height", rowHeight)
      .style("fill", fillColor)
      .style("stroke", "black") // color of the border
      .style("stroke-width", 0); // width of the border

    svg.append("text")
      .style("font-size", "16px")
      .attr("x", 8) // center of the rect
      .attr("y", i * rowHeight + Math.floor((rowHeight * 0.6))) // center of the rect
      .attr("dominant-baseline", "middle") // vertically center text
      .text(e.name)
      .style("fill", "black")


    let currentWidth = cellWidth
    for(let j = 0; j < years.length; j++){
      const year = years[j]
      const width = 2 * rem

      svg.append("rect")
        .attr("x", currentWidth).attr("y", i * rowHeight)
        .attr("width", width).attr("height", rowHeight)
        .style("fill", fillColor)
        .style("stroke", "black") // color of the border
        .style("stroke-width", 0); // width of the border

      const yearPoint = e.years?.find(x => x[0] === year)
      if(yearPoint){
        let height = 0
        height = (yearPoint[1] - 1) * 2
        if(height < 3){ height = 3 } 
        if(height > 18){ height = 18 } 
        
        svg.append("rect")
          .attr("x", currentWidth)
          .attr("y", i * rowHeight)
          .attr("width", width).attr("height", height)
          .style("fill", "black")
      }

      if(e.isYear){
        svg.append("text")
          .style("font-size", "14px")
          .attr("x", currentWidth) // center of the rect
          .attr("y", i * rowHeight + Math.floor((rowHeight * 0.6))) // center of the rect
          // .attr("text-anchor", "middle") // center the text
          .attr("dominant-baseline", "middle") // vertically center text
          .text(String(year))
          .style("fill", "black")
      }        
      currentWidth += width
    }
  }
  // get the svg code as string
  const svgCode = (container as HTMLDivElement).innerHTML
  return svgCode
}