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
  fs.unlinkSync(imagePath)
  const saved = Math.round((1 - after / before) * 100)
  const rel = path.relative(distDir, imagePath)
  console.log(`  ✓ ${rel} → .webp (${saved}% smaller)`)
}

function updateHtmlRefs(htmlPath) {
  let html = fs.readFileSync(htmlPath, 'utf-8')

  // Update src attributes (double and single quotes)
  html = html.replace(/src="([^"]*)\.(png|jpg|jpeg)"/gi, 'src="$1.webp"')
  html = html.replace(/src='([^']*)\.(png|jpg|jpeg)'/gi, "src='$1.webp'")

  // Update CSS url() references (both quote styles)
  html = html.replace(/url\('([^']*)\.(png|jpg|jpeg)'\)/gi, "url('$1.webp')")
  html = html.replace(/url\("([^"]*)\.(png|jpg|jpeg)"\)/gi, 'url("$1.webp")')

  // Update content= attributes (og:image, JSON-LD logo URLs)
  html = html.replace(/content="([^"]*)\.(png|jpg|jpeg)"/gi, 'content="$1.webp"')

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
  await Promise.all(images.map(convertToWebP))

  console.log('Updating HTML references...')
  const htmlFiles = findHtmlFiles(distDir)
  for (const htmlPath of htmlFiles) {
    updateHtmlRefs(htmlPath)
    console.log(`  ✓ ${path.relative(distDir, htmlPath)}`)
  }

  console.log('Image optimization complete.')
}

main().catch(err => {
  console.error('Image optimization failed:', err)
  process.exit(1)
})
