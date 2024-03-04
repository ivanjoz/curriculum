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