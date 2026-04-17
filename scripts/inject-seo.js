const fs = require('fs')
const path = require('path')

const config = require('../seo.config.js')
const distDir = path.resolve(__dirname, '../dist')
const today = new Date().toISOString().split('T')[0]

function buildJsonLd(page, cfg) {
  if (page.jsonLd === 'Organization') {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: cfg.siteName,
      url: cfg.baseUrl,
      logo: `${cfg.baseUrl}${cfg.defaultOgImage}`,
      description: 'Cloud-based MES software for Thai manufacturers'
    })
  }
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: cfg.siteName,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: cfg.baseUrl
  })
}

function buildTags(page, cfg) {
  const canonicalUrl = `${cfg.baseUrl}${page.canonical}`
  const ogImage = `${cfg.baseUrl}${cfg.defaultOgImage}`
  const jsonLd = buildJsonLd(page, cfg)

  return [
    `  <link rel="icon" type="image/png" href="/favicon.png">`,
    `  <meta name="description" content="${page.descriptionEN}">`,
    `  <meta name="keywords" content="${page.keywords.join(', ')}">`,
    `  <meta property="og:title" content="${page.title}">`,
    `  <meta property="og:description" content="${page.descriptionEN}">`,
    `  <meta property="og:url" content="${canonicalUrl}">`,
    `  <meta property="og:image" content="${ogImage}">`,
    `  <meta property="og:type" content="website">`,
    `  <link rel="canonical" href="${canonicalUrl}">`,
    `  <link rel="alternate" hreflang="en" href="${canonicalUrl}">`,
    `  <link rel="alternate" hreflang="th" href="${canonicalUrl}">`,
    `  <script type="application/ld+json">${jsonLd}</script>`,
  ].join('\n')
}

function injectPage(page, cfg) {
  const filePath = path.join(distDir, page.file)

  if (!fs.existsSync(filePath)) {
    console.warn(`  SKIP: ${page.file} not found in dist/`)
    return
  }

  let html = fs.readFileSync(filePath, 'utf-8')

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
  html = html.replace('</head>', `${buildTags(page, cfg)}\n</head>`)

  fs.writeFileSync(filePath, html, 'utf-8')
  console.log(`  ✓ ${page.file}`)
}

function generateSitemap(pages, cfg) {
  const urls = pages.map(page => {
    const priority = page.canonical === '/' ? '1.0' : '0.8'
    return [
      '  <url>',
      `    <loc>${cfg.baseUrl}${page.canonical}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>monthly</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n')
  }).join('\n')

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
  ].join('\n')

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8')
  console.log('  ✓ sitemap.xml')
}

console.log('Injecting SEO tags...')
config.pages.forEach(page => injectPage(page, config))
generateSitemap(config.pages, config)
console.log('Done.')
