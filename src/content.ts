import hortifrutLogoSVG from '../public/images/logo-hortifrut.svg?raw'
import logoYawiSVG from '../public/images/logo-yawi.svg?raw'
import upworkLogoSVG from '../public/images/upwork-logo.svg?raw'
import logoUnicoreSVG from '../public/images/logo-unicore.svg?raw'
import equomLogoSVG from '../public/images/equom-logo.svg?raw'

import skill_comunicacion_svg from '../public/images/skill-comunicacion.svg?raw'
import skill_cloud_svg from '../public/images/skill-cloud.svg?raw'
import skill_coding_svg from '../public/images/skill-coding.svg?raw'
import skill_agile_svg from '../public/images/skill-agile.svg?raw'
import skill_languaje_svg from '../public/images/skill-languaje.svg?raw'

import platzi_logo_svg from '../public/images/platzi-logo2.svg?raw'
import universidad_upao_svg from '../public/images/universidad_upao.svg?raw'
import universidad_upn_svg from '../public/images/universidad_upn.svg?raw'

import linkedin_icon_svg from '../public/images/linkedin-icon.svg?raw'
import github_icon_svg from '../public/images/github-icon.svg?raw'
import medium_icon_svg from '../public/images/medium-icon.svg?raw'

export const mainContent = {
  tecnologias: {
    es: "Tecnologías / Años de Experiencia",
  },
  descripcion: {
    es: "5+ años de experiencia desarrollando sistemas cloud con Node.Js, Go y C# y AWS, Linux, frontend con React y bases de datos SQL."
  },
  sub1: {
    es: "Experiencia adicional en:",
  },
  sub2: {
    es: "Día de trabajo habitual:",
  },
  sub3: {
    es: "Skills:",
  },
  sub4: {
    es: "Experiencia Laboral:",
  },
  sub5: {
    es: "Últimos Proyectos:",
  },
  sub6: {
    es: "F.O.D.A",
  },
  sub7: {
    es: "Estudios",
  }
}

export const diaHabitual = [
  { percent: 72, 
    content: { 
      es: "Desarrollo (código)",
      en: "Desarrollo (código)"
    }
  },
  { percent: 16, 
    content: { 
      es: "Levantamiento de definiciones funcionales, investigación, documentación y arquitectura",
      en: "Levantamiento de definiciones funcionales, investigación, documentación y arquitectura"
    }
  },
  { percent: 12, 
    content: { 
      es: "Reuniones de coordinación, daylis y mentoría",
      en: "Reuniones de coordinación, daylis y mentoría"
    }
  }
]

export const socialNetworks = [
  { icon: github_icon_svg,
    url: "https://github.com/ivanjoz/",
    name: "Github",
    user: "/ivanjoz"
  },
  { icon: linkedin_icon_svg,
    url: "https://www.linkedin.com/in/anguloivan/",
    name: "LinkedIn",
    user: "/anguloivan"
  },
  { icon: medium_icon_svg,
    url: "https://medium.com/@angivan",
    name: "Medium",
    user: "@angivan"
  }
]

export interface ISkills {
  desc: string
  icon: string
  order1?: number
  marginTop?: number
}

export const skills: ISkills[] = [
  { desc: "Experiencia como Scrum Master en proyectos Agile",
    icon: skill_agile_svg,
    order1: 2,
  },
  { desc: "Inglés avanzado y español nativo",
    icon: skill_languaje_svg,
    order1: 1, 
  },
  { desc: "Experiencia en arquitectura cloud, AWS y DevOps",
    icon: skill_cloud_svg,
    order1: 3, marginTop: -10,
  },
  { desc: "Habilidades comunicativas y de coordinación",
    icon: skill_comunicacion_svg,
    order1: 5, marginTop: -16,
  },
  { desc: "Desarrollo enfocado en escabilidad y mantenibilidad en sistemas complejos",
    icon: skill_coding_svg,
    order1: 4,
  },
]

export const experienciaAdicional = [
  { es: "Git, Python, Kotlin y Flutter + Dart",
    en: ""
  },
  { es: "AWS: Cloudformation, IAM, API-Gateway, CloudFront",
    en: ""
  },
  { es: "Web APIs, Service Workers, PWA, WebSockets, Vite.js, Next.js",
    en: ""
  },
  { es: "Cálculos geo-espaciales y renderización de mapas",
    en: ""
  }
]

export interface ITechnologies {
  name: string
  years: number[][]
  priority?: number[]
  isYear?: boolean
}

export const technologies: ITechnologies[] = [
  { name: "Go Programming",
    years: [[22,6],[23,8],[24,8]],
  },
  { name: "C# & .NET Core",
    years: [[20,6],[21,4],[22,3]],
  },
  { name: "Solid.js",
    years: [[22,3],[23,4],[23,6]],
  },
  { name: "ScyllaDB / Cassandra",
    years: [[23,3],[24,4]],
  },
  { name: "Node.js",
    years: [[19,8],[20,8],[21,6],[22,5],[23,4]],
  },
  { name: "React.js",
    years: [[19,3],[20,5],[21,6],[22,8],[23,6],[23,4]],
  },
  { name: "Angular",
    years: [[20,8],[21,4]],
  },
  { name: "PostgreSQL",
    years: [[20,4],[21,5],[22,8],[23,7]]
  },
  { name: "SQL Server",
    years: [[17,4],[20,8],[21,4]],
  },
  { name: "Mongo DB, ArangoDB",
    years: [[18,7],[19,7]],
  },
  { name: "JavaScript / TypeScript",
    years:    [[17,8],[18,7],[19,7],[20,7],[21,6],[22,6],[23,6],[24,6]], 
  },
  { name: "Linux, Bash, Nginx, VPS",
    years:    [[16,3],[17,3],[18,2],[19,1],[20,3],[21,2],[22,2],[23,2],[24,2]],
  },
  { name: "PHP, Wordpress",
    years: [[16,5],[17,4],[18,4]],
  },
  { name: "AWS Lambda, EC2, S3...",
    years: [[20,4],[21,4],[22,5],[23,6],[24,6]],
  },
  { name: "Docker / Podman",
    years: [[22,3],[23,6],[24,5]],
  },
  { name: "Rust",
    years: [[21,2],[23,4],[24,5]],
  },
  { name: "Google Cloud / Firebase",
    years: [[21,3],[22,4]],
  },
  { name: "DynamoDB",
    years: [[21,2],[22,2],[22,3],[24,4]],
  },
  { name: "Infra & CI/CD Tools",
    years: [[22,3],[23,3],[24,3]],
  },
  { name: "AWS Athena, Glue, ETLs",
    years: [[22,2],[23,3],[24,2]],
  },
]

export interface IWordExperience {
  company: string
  years: number[]
  role?: string
  description: string[]
  logo?: string
  logoImg?: string
  pdfCardHeight?: number
}

export const workExperience: IWordExperience[] = [
  { company: "Hortifrut SA",
    years: [202211, -1],
  description: [
    "Desarrollo de software empresarial para áreas de producción, sanidad y mejora contínua con React.js, Go, Node.js, PostgreSQL y DynamoDB",
    "Desarrollo sobre servicios AWS como Lambda, S3, ECS, CloudFront, Athena, API-Gateway mediante SDK y CLI",
    "Coordinación con múltiples áreas para el levantamiento técnico-funcional de los proyectos de software" 
  ],
    role: "Full Stack Developer",
    logo: hortifrutLogoSVG,
    pdfCardHeight: 1.1
  },
  { company: "Yawi Solutions",
    role: "Senior Software Developer",
    years: [202003, 202211],
    logo: logoYawiSVG,
    pdfCardHeight:  1.1,
  description: [
    "Desarrollo de software empresarial con Angular, React.js + Vite.js, C# / .NET Core, Node.js y Go.",
    "Modelado de base de datos Sql-Server y PostgreSQL",
    "Manejo de librerías gráficas (web), estadísticas y geo-espaciales",
    "Diseño de arquitectura cloud en AWS con CloudFormation y en Azure.",
    "Lider técnico del equipo de Software Factory y rol como Scrum Master"
  ]
  },
  { company: "Upwork",
    years: [201906, 202003],
    logo: upworkLogoSVG,
    pdfCardHeight: 0.9,
    description: [
      "Desarrollo de sistemas web con React, Node y MongoDB: Catálogo de cursos para institución educativa",
      "Desarrollo de gestor de contenidos para páginas web con JavaScript",
      "Desarrollo de sistema de búsqueda de empleo y scraping con React, Node.js y PostgreSQL"
    ],
    role: "Freelance Software Developer"
  },
  { company: "Unicore",
    logo: logoUnicoreSVG,
    years: [201804, 201906],
    role: "Software Developer & Founder",
    pdfCardHeight: 0.95,
    description: [
      "Desarrollo de sistema empresarial con módulos de ventas, finanzas, logística, productos y facturación electrónica usando PostgreSQL, DynamoDB, Node.js, React.js y WebSockets",
      "Desarrollo de páginas webs con CMS e integración con plataformas de pago.",
      "Uso de AWS Lambda, S3, EC2 y Linux VPCs y Bash",
    ]
  },
  { company: "Permex International",
    logoImg: "images/permex4.webp",
    years: [201604, 201802],
    role: "Jefe de Operaciones",
    pdfCardHeight: 0.9,
    description: [
      "Planificación y control de la producción y el abastecimiento para la producción de chips de carnaza",
      "Gestión de la logística internacional y trámites para la exportación de contenedores a USA",
      "Elaboración de presupuestos, reportes de gastos y gestión financiera.",
    ]
  },
  { company: "EQUOM SAC",
    years: [201501, 201603],
    logo: equomLogoSVG,
    pdfCardHeight: 0.8,
  description: [
    "Participación en desarrollo de CompuBox: Mini-PC Linux con procesador ARM",
    "Coordinación con proveedores internacionales, gestión del proceso de importación y manejo financiero",
  ],
    role: "Jefe de Operaciones"
  },
]

export const ultimosProyectos = [
  { es: "Genix: Sistema de gestión para Mypes (Logística, Comercial, Finanzas)",
  },
  { es: "Librería de conversación de imagen .webp y .avif en Go con binarios precompilados hechos en Rust",
  },
  { es: "ORM para ScyllaDB / Cassandra hecho en Go",
  },
  { es: "SmartBerry. Sistema de gestión de producción agrícola de Hortifrut",
  },
  { es: "Jobfinder. Sistema de búsqueda de empleos y scraping",
  },
  { es: "Páginas web y CSM con React + Next.js",
  },
]

export interface IFoda {
  name: string
  list: string[]
}

export const foda: IFoda[] = [
  { name: 'FORTALEZAS',
    list: [
      'Balance entre habilidades técnicas y blandas',
      'Experiencia en varios lenguajes y framework permite adoptar nuevas herramientas rápido',
      'Experiencia en arquitectura cloud / AWS',
      'Background en negocios, finanzas y operaciones en empresas industriales',
      'Experiencia desarrollando sobre bases de código grandes con equipos multidiciplinarios',
    ]
  },
  { name: 'DEBILIDADES',
    list: [
      'Poca experiencia en kubernetes, MS-Windows y apps móviles',
      'Poca experiencia en Python, AI y ciencia de datos',
      'Tendencia de asumir el riesgo de incorporar nuevas tecnologías',
    ]
  },
  { name: 'OPORTUNIDADES',
    list: [
      'Tecnologías actuales',
    ]
  },
  { name: 'AMENAZAS',
    list: [
      'TBD',
    ]
  }
]

export interface IStudy {
  name: string
  carrer: string
  description?: string
  content: string[]
  logo: string
  years: string
}

export const studies: IStudy[] = [
  { name: 'Platzi',
    carrer: 'Desarrollo de Software',
    logo: platzi_logo_svg,
    years: '2019-2022',
    content: [`Cursos: JavaScript, TypeScript, ReactJS, Golang, Frontend Development,
    Back-end con NodeJs y ExpressJs. SCRUM. Arquitectura cloud con AWS.`]
  },
  { name: 'Uni. Privada Antenor Orrego',
    carrer: 'Maestría en Administración con Mención en Finanzas',
    logo: universidad_upao_svg,
    years: '2018-2019',
    content: []
  },
  { name: 'Uni. Privada del Norte',
    carrer: 'Carrera de Administración y negocios internacionales',
    logo: universidad_upn_svg,
    years: '2009-2014',
    content: ["Licenciado","Rendimiento: 5to Superior","Tesis: Reducción del precio CIF mediante el apalancamiento operativo-financiero."]
  },
]