import pdf from 'pdfmake/build/pdfmake'
import { Column, TDocumentDefinitions } from 'pdfmake/interfaces'
import * as d3 from "d3";
import { ITechnologies, experienciaAdicional, socialNetworks, technologies, workExperience } from '~/content';
import cabecera_svg from '../images/cabecera_pdf_opt.svg?raw'
import fondo1_svg from '../images/fondo_3.svg?raw'
import icon_location from '../../public/images/icon-location.svg?raw'
import icon_email from '../../public/images/email-icon.svg?raw'

export const generateSVGChart = async (): Promise<string> => {

  const container = document.getElementById("svg-container")
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
      // .attr("text-anchor", "middle") // center the text
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
  console.log(svgCode)
  return svgCode
}

export const downloadPdf = async () => {

  pdf.fonts = {
    Roboto: {
      normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.3.0-beta.1/fonts/Roboto/Roboto-Regular.ttf',
      bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.3.0-beta.1/fonts/Roboto/Roboto-Medium.ttf',
      italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.3.0-beta.1/fonts/Roboto/Roboto-Italic.ttf',
      bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.3.0-beta.1/fonts/Roboto/Roboto-MediumItalic.ttf'
    },
  }

  console.log("icon location::", icon_location)
  console.log("icon email::", icon_email)
  
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
      width: 266,
      unbreakable: true,
      fontSize: 10,
      marginLeft: 8,
      marginRight: 8,
      marginBottom: 30,
      stack: [
        { svg: fondo1_svg, fit: [276,320],
          marginBottom: -192,
          marginLeft: -16,
        },
        { 
          marginLeft: 8,
          marginRight: 8,
          columns: [
            { width: 90, fit: [80,50],  svg: we.logo },
            { width: "*", 
              stack: [
                { text: we.company,
                },
                { text: we.role as string }
              ]
            },
          ]
        },
        ...(we.description.map(e => {
          return {
            text: "- " + e,
          }
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
                marginTop: 158,
                marginLeft: 36,
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
                        marginTop: 1,
                        width: 12,
                        svg: icon_email,
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
                        marginTop: 1,
                        svg: icon_location,
                        height: 12,
                      },
                      { 
                        width: 70,
                        text: 'Trujillo, Perú.',
                        fontSize: 12,
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
        marginTop: 22,
        marginBottom: 4,
        text: "Tecnologías & Años de Experiencia",
        fontSize: 13,
      },
      {
        columns: [
          {
            svg: await generateSVGChart(),
            width: 300,
            // absolutePosition: { x: 0, y: 0 }
          },
          { width: "*",
            stack: [
              { text: "Conocimiento adicional en:", 
                fontSize: 14,
                marginBottom: 4,
              },
              ...(experienciaAdicional.map(e => {
                return {
                  text: "● " + e.es,
                  fontSize: 10,
                  marginBottom: 4,
                  marginLeft: 0,
                }
              }))
            ]
          }
        ]
      },
      { 
        marginTop: 14,
        marginBottom: 4,
        text: "Experiencia Laboral",
        fontSize: 14,
      },
      ...(workExperienceCardGroupd.map(columns => {
        return {          
          columns,
          marginBottom: 12,
        }
      }))
    ],
  }

  const pdfDoc = pdf.createPdf(docDefinition)
  console.log(pdfDoc)
  pdfDoc.download("example.pdf")
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

  console.log(profilePhotoB64)

  console.log(cabecera_svg)

  // extrae la image
  const idx1 = cabecera_svg.indexOf('data:image/')
  const idx2 = cabecera_svg.indexOf('"', idx1 + 1)
  const img = cabecera_svg.substring(idx1, idx2)
  const cabecera_svg_new = cabecera_svg.replace(img, profilePhotoB64)

  return cabecera_svg_new
}