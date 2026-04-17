const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const distDir = path.resolve(__dirname, '../dist')

function findImages(dir) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...findImages(fullPath))
    } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
      results.push(fullPath)
    }
  }
  return results
}

function findHtmlFiles(dir) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...findHtmlFiles(fullPath))
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath)
    }
  }
  return results
}

async function convertToWebP(imagePath) {
  const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp')
  const before = fs.statSync(imagePath).size
  await sharp(imagePath).webp({ lossless: true }).toFile(webpPath)
  const after = fs.statSync(webpPath).size
  const rel = path.relative(distDir, imagePath)

  if (after < before) {
    fs.unlinkSync(imagePath)
    const saved = Math.round((1 - after / before) * 100)
    console.log(`  ✓ ${rel} → .webp (${saved}% smaller)`)
    return imagePath
  } else {
    fs.unlinkSync(webpPath)
    console.log(`  = ${rel} kept (original is smaller)`)
    return null
  }
}

function updateHtmlRefs(htmlPath, convertedPaths) {
  let html = fs.readFileSync(htmlPath, 'utf-8')
  const htmlDir = path.dirname(htmlPath)

  function replaceIfConverted(urlPath, ext) {
    let absPath
    const decoded = decodeURIComponent(urlPath)
    if (decoded.startsWith('http')) {
      const url = new URL(decoded + '.' + ext)
      absPath = path.join(distDir, url.pathname.slice(1))
    } else if (decoded.startsWith('/')) {
      absPath = path.join(distDir, decoded.slice(1)) + '.' + ext
    } else {
      absPath = path.resolve(htmlDir, decoded) + '.' + ext
    }
    return convertedPaths.has(absPath) ? urlPath + '.webp' : urlPath + '.' + ext
  }

  // Update src attributes
  html = html.replace(/src="([^"]*)\.(png|jpg|jpeg)"/gi, (m, p, ext) => `src="${replaceIfConverted(p, ext)}"`)
  html = html.replace(/src='([^']*)\.(png|jpg|jpeg)'/gi, (m, p, ext) => `src='${replaceIfConverted(p, ext)}'`)

  // Update CSS url() references
  html = html.replace(/url\('([^']*)\.(png|jpg|jpeg)'\)/gi, (m, p, ext) => `url('${replaceIfConverted(p, ext)}')`)
  html = html.replace(/url\("([^"]*)\.(png|jpg|jpeg)"\)/gi, (m, p, ext) => `url("${replaceIfConverted(p, ext)}")`)

  // Update content= attributes (og:image, JSON-LD logo URLs)
  html = html.replace(/content="([^"]*)\.(png|jpg|jpeg)"/gi, (m, p, ext) => `content="${replaceIfConverted(p, ext)}"`)

  // Update JS string literals (e.g. featureImages object, dynamic src assignments)
  html = html.replace(/'([^'\n]*)\.(png|jpg|jpeg)'/gi, (m, p, ext) => `'${replaceIfConverted(p, ext)}'`)

  // Add loading="lazy" to img tags — skip if already has loading= or is mana_logo
  html = html.replace(/<img ([^>]+)>/gi, (match, attrs) => {
    if (/loading=/i.test(attrs)) return match
    if (/mana_logo/i.test(attrs)) return match
    return `<img ${attrs} loading="lazy">`
  })

  fs.writeFileSync(htmlPath, html, 'utf-8')
}

async function main() {
  console.log('Converting images to WebP...')
  const images = findImages(distDir)
  console.log(`  Found ${images.length} images`)
  const results = await Promise.all(images.map(convertToWebP))
  const convertedPaths = new Set(results.filter(Boolean))

  console.log('Updating HTML references...')
  const htmlFiles = findHtmlFiles(distDir)
  for (const htmlPath of htmlFiles) {
    updateHtmlRefs(htmlPath, convertedPaths)
    console.log(`  ✓ ${path.relative(distDir, htmlPath)}`)
  }

  console.log('Image optimization complete.')
}

main().catch(err => {
  console.error('Image optimization failed:', err)
  process.exit(1)
})
