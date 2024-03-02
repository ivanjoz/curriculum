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
  { icon: github_icon_svg

  },
  { icon: linkedin_icon_svg

  },
  { icon: medium_icon_svg

  }
]

export interface ISkills {
  desc: string
  icon: string
}

export const skills: ISkills[] = [
  { desc: "Experiencia como Scrum Master en proyectos Agile",
    icon: skill_agile_svg,
  },
  { desc: "Inglés avanzado y español nativo",
    icon: skill_languaje_svg,
  },
  { desc: "Experiencia en arquitectura cloud, AWS y DevOps",
    icon: skill_cloud_svg,

  },
  { desc: "Habilidades comunicativas y de coordinación",
    icon: skill_comunicacion_svg,
  },
  { desc: "Desarrollo enfocado en escabilidad y mantenibilidad en sistemas complejos",
    icon: skill_coding_svg
  },
]

export const experienciaAdicional = [
  { es: "Git, Python, Kotlin y Flutter + Dart",
    en: ""
  },
  { es: "AWS: Cloudformation, IAM, API-Gateway, CloudFront",
    en: ""
  },
  { es: "Vite.js, Next.js, Service Workers, PWA, WebSockets",
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
  { name: "Mongo DB / ArangoDB",
    years: [[18,7],[19,7]],
  },
  { name: "JavaScript & WebAPIs",
    years:    [[17,8],[18,7],[19,7],[20,7],[21,6],[22,6],[23,6],[24,6]], 
  },
  { name: "Linux / Bash / Nginx / VPS",
    years:    [[16,3],[17,3],[18,2],[19,1],[20,3],[21,2],[22,2],[23,2],[24,2]],
  },
  { name: "PHP / Wordpress",
    years: [[16,5],[17,4],[18,4]],
  },
  { name: "AWS Lambda, EC2, ECS, S3",
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
  { name: "AWS Athena / Glue / ETLs",
    years: [[22,2],[23,3],[24,2]],
  },
]

export interface IWordExperience {
  company: string
  years?: number[]
  role?: string
  description: string[]
  logo?: string
  logoImg?: string
}

export const workExperience: IWordExperience[] = [
  { company: "Hortifrut SA",
  description: [
    "Desarrollo de software empresarial para áreas de producción, sanidad y mejora contínua con React.js, Go, Node.js, PostgreSQL y DynamoDB",
    "Desarrollo sobre servicios AWS como Lambda, S3, ECS, CloudFront, Athena, API-Gateway mediante SDK y CLI",
    "Coordinación con múltiples áreas para el levantamiento técnico-funcional de los proyectos de software" 
  ],
    role: "Full Stack Developer",
    logo: hortifrutLogoSVG
  },
  { company: "Yawi Solutions",
    role: "Senior Software Developer",
    logo: logoYawiSVG,
  description: [
    "Desarrollo de software empresarial con Angular, React.js + Vite.js, C# / .NET Core, Node.js y Go.",
    "Modelado de base de datos Sql-Server y PostgreSQL",
    "Manejo de librerías gráficas (web), estadísticas y geo-espaciales",
    "Diseño de arquitectura cloud en AWS con CloudFormation y en Azure.",
    "Lider técnico del equipo de Software Factory y rol como Scrum Master"
  ]
  },
  { company: "Upwork",
    logo: upworkLogoSVG,
    description: [
      "Desarrollo de un sistemas web con React, Node y MongoDB: Catálogo de cursos para institución educativa",
      "Desarrollo de un gestor de contenidos para páginas web con JavaScript",
      "Desarrollo de un sistema de búsqueda de empleo y scraping con React, Node.js y PostgreSQL"
    ],
    role: "Freelance Software Developer"
  },
  { company: "Unicore",
    logo: logoUnicoreSVG,
    role: "Software Developer & Founder",
    description: [
      "Desarrollo de un sistema empresarial con módulos de ventas, finanzas, logística, productos y facturación electrónica usando PostgreSQL, DynamoDB, Node.js, React.js y WebSockets",
      "Desarrollo de un páginas webs con CMS e integración con plataformas de pago.",
      "Uso de AWS Lambda, S3, EC2 y Linux VPCs y Bash",
    ]
  },
  { company: "Permex International",
    logoImg: "images/permex4.webp",
    role: "Jefe de Operaciones",
    description: [
      "Planificación y control de la producción y el abastecimiento para la producción de chips de carnaza",
      "Gestión de la logística internacional y trámites para la exportación de contenedores a USA",
      "Elaboración de presupuestos, reportes de gastos y gestión financiera.",
    ]
  },
  { company: "EQUOM SAC",
    logo: equomLogoSVG,
  description: [
    "Participación en desarrollo de CompuBox: Mini-PC Linux con procesador ARM",
    "Coordinación con proveedores internacionales, gestión del proceso de importación y manejo financiero",
  ],
    role: "Jefe de Operaciones"
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
  description?: string
  content: string[]
  logo: string
}

export const studies: IStudy[] = [
  { name: 'Platzi',
    logo: platzi_logo_svg,
    content: []
  },
  { name: 'Uni. Privada Antenor Orrego',
    logo: universidad_upao_svg,
    content: []
  },
  { name: 'Uni. Privada del Norte',
    logo: universidad_upn_svg,
    content: []
  },
]