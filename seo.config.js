module.exports = {
  baseUrl: 'https://mana-mes.com',
  siteName: 'Mana MES',
  defaultOgImage: '/mana_logo.webp',
  pages: [
    {
      file: 'index.html',
      canonical: '/',
      title: 'Mana MES – Manufacturing Execution System Software Thailand',
      descriptionEN: 'Mana MES is a cloud-based manufacturing execution system for Thai factories. Track OEE, production, downtime, and WIP in real time.',
      descriptionTH: 'Mana MES ระบบ MES สำหรับโรงงานในไทย ติดตาม OEE การผลิต ดาวน์ไทม์ และ WIP แบบเรียลไทม์',
      keywords: [
        'MES software Thailand', 'ซอฟต์แวร์ MES ไทย',
        'manufacturing execution system', 'ระบบ MES โรงงาน',
        'OEE dashboard', 'ระบบ OEE',
        'production tracking software', 'ระบบติดตามการผลิต',
        'downtime management', 'WIP tracking'
      ],
      jsonLd: 'Organization',
    },
    {
      file: 'user-manual.html',
      canonical: '/user-manual.html',
      title: 'Mana MES User Manual – Complete Guide for Operators',
      descriptionEN: 'Complete user manual for Mana MES. Step-by-step guides for setup, production, monitoring, and data management.',
      descriptionTH: 'คู่มือการใช้งาน Mana MES ฉบับสมบูรณ์ คู่มือทีละขั้นตอนสำหรับการตั้งค่า การผลิต การติดตาม และการจัดการข้อมูล',
      keywords: [
        'Mana MES manual', 'คู่มือ Mana MES',
        'MES user guide', 'คู่มือระบบ MES',
        'manufacturing software tutorial'
      ],
      jsonLd: 'SoftwareApplication',
    },
    {
      file: 'manuals/01-setup-master-data.html',
      canonical: '/manuals/01-setup-master-data.html',
      title: 'Setting Up Master Data – Mana MES Setup Guide',
      descriptionEN: 'Learn how to configure master data in Mana MES including machines, products, and production routes.',
      descriptionTH: 'เรียนรู้วิธีการตั้งค่าข้อมูลหลักใน Mana MES รวมถึงเครื่องจักร สินค้า และเส้นทางการผลิต',
      keywords: [
        'MES setup', 'ตั้งค่าข้อมูลหลัก',
        'master data configuration', 'การตั้งค่า MES',
        'production routes setup', 'machine configuration MES'
      ],
      jsonLd: 'SoftwareApplication',
    },
    {
      file: 'manuals/02-running-production.html',
      canonical: '/manuals/02-running-production.html',
      title: 'Running Production – Work Orders & Production Tracking | Mana MES',
      descriptionEN: 'How to create and manage work orders, track production progress, and log operator activities in Mana MES.',
      descriptionTH: 'วิธีสร้างและจัดการใบสั่งผลิต ติดตามความคืบหน้าการผลิต และบันทึกกิจกรรมของพนักงานใน Mana MES',
      keywords: [
        'production tracking', 'ติดตามการผลิต',
        'work order management', 'ใบสั่งผลิต',
        'MES production', 'การผลิตโรงงาน',
        'WIP tracking', 'production log'
      ],
      jsonLd: 'SoftwareApplication',
    },
    {
      file: 'manuals/03-monitoring.html',
      canonical: '/manuals/03-monitoring.html',
      title: 'Monitoring OEE & Downtime – Real-Time Dashboard | Mana MES',
      descriptionEN: 'Monitor OEE, WIP, and downtime in real time with Mana MES dashboards. Identify bottlenecks and improve efficiency.',
      descriptionTH: 'ติดตาม OEE WIP และดาวน์ไทม์แบบเรียลไทม์ด้วยแดชบอร์ด Mana MES ระบุคอขวดและปรับปรุงประสิทธิภาพ',
      keywords: [
        'OEE dashboard', 'ระบบ OEE',
        'downtime management', 'ดาวน์ไทม์โรงงาน',
        'WIP monitoring', 'ติดตาม WIP',
        'real-time production monitoring', 'manufacturing KPI'
      ],
      jsonLd: 'SoftwareApplication',
    },
    {
      file: 'manuals/04-editing-data.html',
      canonical: '/manuals/04-editing-data.html',
      title: 'Editing Production Data – Data Management | Mana MES',
      descriptionEN: 'How to edit and correct production data, activity logs, and work order records in Mana MES.',
      descriptionTH: 'วิธีแก้ไขและแก้ไขข้อมูลการผลิต บันทึกกิจกรรม และบันทึกใบสั่งผลิตใน Mana MES',
      keywords: [
        'MES data management', 'แก้ไขข้อมูลการผลิต',
        'edit production records', 'activity log MES',
        'data correction manufacturing'
      ],
      jsonLd: 'SoftwareApplication',
    },
    {
      file: 'manuals/05-system-overview.html',
      canonical: '/manuals/05-system-overview.html',
      title: 'Mana MES System Overview – Features & Architecture',
      descriptionEN: 'Overview of the Mana MES system architecture, key features, and how the modules connect for end-to-end manufacturing visibility.',
      descriptionTH: 'ภาพรวมของสถาปัตยกรรมระบบ Mana MES คุณสมบัติหลัก และวิธีที่โมดูลเชื่อมต่อกันเพื่อการมองเห็นการผลิตแบบครบวงจร',
      keywords: [
        'MES overview', 'ภาพรวมระบบ MES',
        'manufacturing software features', 'MES architecture',
        'Mana MES modules', 'ระบบการผลิตไทย'
      ],
      jsonLd: 'SoftwareApplication',
    },
  ]
}
