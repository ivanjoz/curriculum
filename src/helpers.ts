export const parseSVG = (svgContent: string)=> {
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

export const makeCardShadow = (proportion?: number) => {


  const heights = [322.52, 316.32, 310.11, 303.91, 300.19]

  proportion = proportion || 1
  for(let i = 0; i < heights.length; i++){
    heights[i] = Math.floor(heights[i] * proportion)
  }

  return `
  <?xml version="1.0" encoding="UTF-8"?>
  <!-- Created with Inkscape (http://www.inkscape.org/) -->
  <svg width="476" height="${heights[0]}" version="1.1" viewBox="0 0 476 ${heights[0]}" xmlns="http://www.w3.org/2000/svg">
   <g transform="translate(-24.443 -41.668)">
    <g fill="#222f6d">
     <rect x="24.443" y="41.668" width="476" height="${heights[0]}" rx="20.826" ry="19.798" fill-opacity=".02" stroke-width=".88065"/>
     <rect x="28.443" y="44.769" width="468" height="${heights[1]}" rx="21.419" ry="19.579" fill-opacity=".03" stroke-width=".86478"/>
     <rect x="31.443" y="47.87" width="462" height="${heights[2]}" rx="18.437" ry="17.767" fill-opacity=".04" stroke-width=".85075"/>
     <rect x="34.443" y="50.971" width="456" height="${heights[3]}" rx="15.785" ry="16.207" fill-opacity=".05" stroke-width=".83672"/>
    </g>
    <rect x="36.443" y="52.832" width="452" height="${heights[4]}" rx="13.663" ry="14.922" fill="#f7f8fd" stroke-width=".82792"/>
   </g>
  </svg> 
  `
} 