import path from 'path'
import fs from 'fs'
const __dirname = new URL('.', import.meta.url).pathname;

const buildFolder = path.join(__dirname, '.output', 'public')
const staticFolder = path.join(__dirname, 'docs')

// Reemplaza los css
try {
  // Read all items in the input directory
  const files = fs.readdirSync(buildFolder)
  console.log(`Found ${files.length} items in "${buildFolder}".`);

  // Process each file
  for (const file of files) {
    const filePath = path.join(buildFolder, file)
    const fileStats = fs.statSync(filePath);

    // Only process HTML files
    if (fileStats.isFile() && path.extname(file).toLowerCase() === '.html') {
      console.log(`Processing HTML file: ${file}`);
      let htmlContent = fs.readFileSync(filePath, 'utf8');

      // Regex to find <link rel="stylesheet" href="path/to/style.css">
      // It captures the href value in group 1
      const cssLinkRegex = /<link\s+(?=[^>]*?rel=["']stylesheet["'])(?=[^>]*?href=["']([^"']+)["'])[^>]*?\/?>/gi;
      let match;
      let modifiedHtmlContent = htmlContent;
      let cssFilesEmbeddedCount = 0;

      // Use a loop to find all matches and replace them
      while ((match = cssLinkRegex.exec(htmlContent)) !== null) {
        console.log("CSS Match::", match[0],match[1])

        const fullLinkTag = match[0]; // The entire <link> tag
        const cssRelativePath = match[1]; // The value of the href attribute

        // Construct the absolute path to the CSS file
        // Assuming CSS files are relative to the HTML file's directory
        const cssFilePath = path.join(buildFolder, cssRelativePath)
        console.log("Embbeding CSS:", cssFilePath)

        try {
          // Read the content of the CSS file
          const cssContent = fs.readFileSync(cssFilePath, 'utf8');
          console.log(`  - Found and read CSS file: ${cssFilePath}`);

          // Replace the <link> tag with a <style> tag containing the CSS content
          const styleTag = `<style>\n${cssContent}\n</style>`;
          modifiedHtmlContent = modifiedHtmlContent.replace(fullLinkTag, styleTag);
          cssFilesEmbeddedCount++;
        } catch (cssError) {
          console.warn(`  - Warning: Could not read CSS file "${path.resolve(buildFolder, cssFilePath)}" linked in "${file}". Error: ${cssError.message}`);
        }
      }

      if (cssFilesEmbeddedCount > 0) {
        // Write the modified HTML content back to the file
        fs.writeFileSync(path.join(buildFolder, file), modifiedHtmlContent, 'utf8');
        console.log(`  - Embedded ${cssFilesEmbeddedCount} CSS files. Saved modified HTML to: ${path.join(buildFolder, file)}`);
      } else {
        console.log(`  - No CSS links found or embedded in "${file}".`);
      }
    }
  }
  console.log('CSS embedding process completed.');
} catch (error) {
  console.error('An error occurred during the CSS embedding process:', error);
}

const buildSubFolder = [
  "", "images", "pdf", "assets", "libs", "_build", path.join("_build", "assets")
]

for (const folder of buildSubFolder) {
  // console.log("Copiando folder:",folder)
  const buildPath = folder ? path.join(buildFolder, folder) : buildFolder
  const staticPath = folder ? path.join(staticFolder, folder) : staticFolder

  console.log("Copiando al folder destino: ", staticPath)
  if (folder) {
    if (fs.existsSync(staticPath)) {
      fs.rmSync(staticPath, { recursive: true, force: true })
    }
    fs.mkdirSync(staticPath)
  }

  try {
    const files = fs.readdirSync(buildPath)

    for (const file of files) {
      const filePath = path.join(buildPath, file)
      if (fs.lstatSync(filePath).isDirectory()) { continue }
  
      const fileArray = file.split(".")
      const ext = fileArray[fileArray.length - 1]
      if (ext === "gz" || ext === "br") { continue }
      console.log("Moviendo: ", path.join(staticPath, file))
      fs.copyFileSync(filePath, path.join(staticPath, file))
    } 
  } catch (error) {
    console.log(error)
  }
}

