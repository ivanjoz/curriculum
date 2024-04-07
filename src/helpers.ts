export const parseSVG = (svgContent: string)=> {
  /*
  if(typeof process !== 'undefined' && process.env.NEXT_RUNTIME === 'nodejs'){
    return ""
  }
  
  console.log(svgContent)

  const decoded = unescape(encodeURIComponent(svgContent))
  const base64String = btoa(decoded)
  */

  // return `data:image/svg+xml;base64,${base64String}`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`
}

export const replaceSVGColor = (svgContent: string, colors: string[]) => {

  const colorsMap: Map<string, [number, string, string]> = new Map()

  let lastIdx = 0
  while(lastIdx <= 0){
    const idx = svgContent.indexOf('fill="', lastIdx)
    if(idx === -1){ break }
    const idx2 = svgContent.indexOf('"', idx + 6)
    const color = svgContent.substring(idx + 6, idx2)
    colorsMap.set(`c-${color}`, [idx, color, `fill="$"`]) // como atributo
    lastIdx = idx2 + 1
  }

  while(lastIdx <= 0){
    const idx = svgContent.indexOf('fill:', lastIdx)
    if(idx === -1){ break }
    const idx2 = svgContent.indexOf(';', idx + 5)
    const color = svgContent.substring(idx + 5, idx2)
    colorsMap.set(`s-${color}`, [idx, color, `fill:$`]) // como style
    lastIdx = idx2 + 1
  }

  const svgColors = Array.from(colorsMap.values()).sort((a,b) => a[0] - b[0])
  
  for(let i = 0; i < svgColors.length; i++){
    const newColor = colors[i]
    if(!newColor){ break }
    const [_, color, f] = svgColors[i]
    svgContent = svgContent.replaceAll(f.replace("$",color), f.replace("$",newColor))
  }

  return svgContent
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


export const parseYear = (yearMon: number) =>{
  if(yearMon === -1){ return "Present" }
  const year = String(yearMon).substring(0,4)
  const month = months[String(parseInt(String(yearMon).substring(4,6)))]

  return `${getContent(month||"")} ${year}`
}

export const getContent = (content: IContent): string => {
  if(typeof content === 'string'){
    return content
  } else {
    return (content.es||content.en) as string
  }
}

export type IContent = string | { en?: string, es?: string }

export const replaceSVGHeight = (svgContent: string, heights: number[]) => {

  const heightsMap: Map<string, [number, number, string]> = new Map()

  let lastIdx = svgContent.indexOf('>',svgContent.indexOf('<svg') + 1) + 1

  while(lastIdx > -1){
    const tag = `height="`
    const idx = svgContent.indexOf(tag, lastIdx)
    if(idx === -1){ break }
    lastIdx = svgContent.indexOf('"', idx + tag.length)
    const heightStr = svgContent.substring(idx + tag.length, lastIdx)
    const height = parseInt(heightStr)
    if(isNaN(height)){ 
      console.log("isNaN", heightStr, idx, lastIdx)
      continue
    }
    heightsMap.set(`h-${height}`, [idx, height, `height="$"`]) // como atributo
  }
  /*
  lastIdx = 0
  while(lastIdx <= 0){
    const idx = svgContent.indexOf('fill:', lastIdx)
    if(idx === -1){ break }
    const idx2 = svgContent.indexOf(';', idx + 5)
    const color = svgContent.substring(idx + 5, idx2)
    colorsMap.set(`s-${color}`, [idx, color, `fill:$`]) // como style
    lastIdx = idx2 + 1
  }
  */

  console.log("heightsMap", heightsMap)

  const svgHeights = Array.from(heightsMap.values()).sort((a,b) => a[0] - b[0])
  
  for(let i = 0; i < svgHeights.length; i++){
    let newHeight = heights[i]
    if(!newHeight){ break }
    const [_, prevHeight, f] = svgHeights[i]
    if(newHeight <= 1){
      newHeight = Math.floor(prevHeight * newHeight * 100)/100
    }
    svgContent = svgContent.replaceAll(
      f.replace("$",String(prevHeight)), 
      f.replace("$",String(newHeight)))
  }

  console.log("svgContent", svgContent, heights)

  return svgContent
}