import { faker } from '@faker-js/faker'
import { AI_TOPICS, matchAiResponse } from './ai-responses'
import type { Absence, AbsenceStatus, AbsenceType, DayPart } from '../schemas/absence'
import type { AiChatMessage } from '../schemas/ai-chat-message'
import type { AiConversation } from '../schemas/ai-conversation'
import type { Candidate, CandidateStage } from '../schemas/candidate'
import type { ChatMessage } from '../schemas/chat-message'
import type { Company } from '../schemas/company'
import type { Conversation } from '../schemas/conversation'
import type { Customer } from '../schemas/customer'
import type { Department } from '../schemas/department'
import type { DocumentType, EmployeeDocument } from '../schemas/document'
import type { Employee, EmployeeStatus, EmploymentType } from '../schemas/employee'
import type { Event, EventColor } from '../schemas/event'
import type {
  EngagementType,
  ExternalProfessional,
  ExternalProfessionalStatus
} from '../schemas/external-professional'
import type { ExpenseCategory, ExpenseReport, ExpenseStatus } from '../schemas/expense-report'
import type { Issue, IssuePriority, IssueStatus, IssueType } from '../schemas/issue'
import type { JobOpening, JobOpeningStatus } from '../schemas/job-opening'
import type { Member } from '../schemas/member'
import type { Message } from '../schemas/message'
import type { Office } from '../schemas/office'
import type {
  Address,
  Order,
  OrderChannel,
  OrderLineItem,
  OrderStatus,
  PaymentMethod,
  PaymentStatus
} from '../schemas/order'
import type { Payslip, SalaryType } from '../schemas/payslip'
import type { Product, ProductChannel, ProductStatus } from '../schemas/product'
import type {
  Project,
  ProjectHealth,
  ProjectMember,
  ProjectMemberStatus,
  ProjectPriority,
  ProjectStatus
} from '../schemas/project'
import type {
  Shipment,
  ShipmentActivityEvent,
  ShipmentPackageType,
  ShipmentServiceTier,
  ShipmentStatus
} from '../schemas/shipment'
import type { Shift, ShiftStatus } from '../schemas/shift'
import type { Team } from '../schemas/team'
import type { ClockLocation, TimeEntry, TimeEntryStatus } from '../schemas/time-entry'
import type { TimesheetEntry, TimesheetStatus } from '../schemas/timesheet-entry'

/**
 * Everything here is generated ONCE, at module load, from a fixed seed —
 * so every consumer (admin-kit loaders, Storybook stories, docs demos)
 * sees the same reproducible dataset instead of re-rolling random data on
 * every import. Foreign keys (customerId, ownerId, projectId, ...) are
 * drawn from the arrays generated earlier in this file, in dependency
 * order, so every reference actually resolves.
 */
faker.seed(4210)

function weighted<T extends string>(weights: [T, number][]): T {
  return faker.helpers.weightedArrayElement(weights.map(([value, weight]) => ({ value, weight })))
}

// ---------------------------------------------------------------------------
// Teams + members (Project Management domain, generated first — orders and
// issues both reference members as customers/assignees).
// ---------------------------------------------------------------------------

const TEAM_NAMES = ['Platform', 'Growth', 'Design Systems', 'Mobile', 'Data & Infra']

export const TEAMS: Team[] = TEAM_NAMES.map(name => ({
  id: faker.string.uuid(),
  name,
  description: faker.company.catchPhrase(),
  memberIds: []
}))

export const MEMBERS: Member[] = Array.from({ length: 24 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const team = faker.helpers.arrayElement(TEAMS)
  const member: Member = {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    avatarUrl: faker.image.avatarGitHub(),
    role: faker.helpers.arrayElement([
      'Engineer',
      'Senior Engineer',
      'Staff Engineer',
      'Product Designer',
      'Product Manager',
      'Engineering Manager',
      'QA Engineer'
    ]),
    teamId: team.id
  }
  team.memberIds.push(member.id)
  return member
})

// ---------------------------------------------------------------------------
// Ecommerce domain
// ---------------------------------------------------------------------------

export const CUSTOMERS: Customer[] = Array.from({ length: 120 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const totalOrders = faker.number.int({ min: 0, max: 40 })
  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    avatarUrl: faker.image.avatarGitHub(),
    location: `${faker.location.city()}, ${faker.location.countryCode()}`,
    totalOrders,
    totalSpent: Number(
      (totalOrders * faker.number.float({ min: 20, max: 220, fractionDigits: 2 })).toFixed(2)
    ),
    joinedAt: faker.date.past({ years: 3 }).toISOString()
  }
})

const PRODUCT_CATEGORIES = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Beauty', 'Toys']
const PRODUCT_TAGS = [
  'Bestseller',
  'New Arrival',
  'Limited',
  'Subscription',
  'Dropship',
  'Inventory',
  'Bundle',
  'Premium',
  'Eco',
  'Seasonal'
]

export const PRODUCTS: Product[] = Array.from({ length: 60 }, () => {
  const status = weighted<ProductStatus>([
    ['active', 8],
    ['draft', 2],
    ['archived', 1]
  ])
  const price = Number(faker.commerce.price({ min: 8, max: 480 }))
  const channels = faker.helpers.arrayElements<ProductChannel>(['retail', 'wholesale'], {
    min: 1,
    max: 2
  })
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    sku: faker.string.alphanumeric({ length: 8, casing: 'upper' }),
    barcode: faker.string.numeric(12),
    category: faker.helpers.arrayElement(PRODUCT_CATEGORIES),
    vendor: faker.company.name(),
    description: faker.commerce.productDescription(),
    price,
    wholesalePrice: Number(
      (price * faker.number.float({ min: 0.55, max: 0.75, fractionDigits: 2 })).toFixed(2)
    ),
    cost: Number(
      (price * faker.number.float({ min: 0.3, max: 0.5, fractionDigits: 2 })).toFixed(2)
    ),
    stock: faker.number.int({ min: 0, max: 500 }),
    status,
    imageUrl: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    rating: faker.number.float({ min: 2.5, max: 5, fractionDigits: 1 }),
    tags: faker.helpers.arrayElements(PRODUCT_TAGS, { min: 1, max: 3 }),
    variantCount: faker.number.int({ min: 0, max: 9 }),
    channels: channels.length > 0 ? channels : ['retail'],
    weight: faker.number.float({ min: 0.1, max: 12, fractionDigits: 2 }),
    createdAt: faker.date.past({ years: 2 }).toISOString()
  }
})

function orderAddress(name: string): Address {
  return {
    name,
    line1: faker.location.streetAddress(),
    line2: faker.datatype.boolean(0.25) ? faker.location.secondaryAddress() : undefined,
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    postalCode: faker.location.zipCode(),
    country: faker.location.countryCode(),
    phone: faker.datatype.boolean(0.7) ? faker.phone.number() : undefined
  }
}

// Spans ~2 years so the "Total Revenue: this year vs. prev year" dashboard
// chart has 12 real months of data on both sides, not a synthesized second
// series.
export const ORDERS: Order[] = Array.from({ length: 900 }, () => {
  const customer = faker.helpers.arrayElement(CUSTOMERS)
  const status = weighted<OrderStatus>([
    ['pending', 2],
    ['processing', 3],
    ['shipped', 3],
    ['delivered', 8],
    ['cancelled', 1]
  ])
  const paymentStatus = weighted<PaymentStatus>([
    ['paid', 9],
    ['pending', 2],
    ['refunded', 1],
    ['failed', 1]
  ])
  const channel = weighted<OrderChannel>([
    ['online', 6],
    ['wholesale', 2],
    ['in_store', 1.5],
    ['marketplace', 1.5]
  ])
  const paymentMethod = weighted<PaymentMethod>([
    ['credit_card', 5],
    ['paypal', 3],
    ['debit_card', 2],
    ['bank_transfer', 1]
  ])

  const lineProducts = faker.helpers.arrayElements(PRODUCTS, { min: 1, max: 5 })
  const items: OrderLineItem[] = lineProducts.map(product => {
    const quantity = faker.number.int({ min: 1, max: 4 })
    const unitPrice = channel === 'wholesale' ? product.wholesalePrice : product.price
    return {
      productId: product.id,
      name: product.name,
      sku: product.sku,
      imageUrl: product.imageUrl,
      quantity,
      unitPrice,
      lineTotal: Number((unitPrice * quantity).toFixed(2))
    }
  })
  const subtotal = Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2))
  const shippingCost =
    channel === 'wholesale' ? 0 : faker.number.float({ min: 0, max: 25, fractionDigits: 2 })
  const tax = Number((subtotal * 0.08).toFixed(2))
  const discount = faker.datatype.boolean(0.15)
    ? Number((subtotal * faker.number.float({ min: 0.05, max: 0.2, fractionDigits: 2 })).toFixed(2))
    : 0
  const total = Number((subtotal + shippingCost + tax - discount).toFixed(2))

  const shippingAddress = orderAddress(customer.name)
  const billingAddress = faker.datatype.boolean(0.8) ? shippingAddress : orderAddress(customer.name)

  return {
    id: faker.string.uuid(),
    orderNumber: `#${faker.number.int({ min: 10000, max: 99999 })}`,
    customerId: customer.id,
    customerName: customer.name,
    customerAvatarUrl: customer.avatarUrl,
    itemCount: items.length,
    items,
    subtotal,
    shippingCost,
    tax,
    discount,
    total,
    status,
    paymentStatus,
    channel,
    paymentMethod,
    shippingAddress,
    billingAddress,
    notes: faker.datatype.boolean(0.2) ? faker.lorem.sentence() : undefined,
    createdAt: faker.date.past({ years: 2 }).toISOString()
  }
})

// ---------------------------------------------------------------------------
// Project Management domain
// ---------------------------------------------------------------------------

export const PROJECTS: Project[] = Array.from({ length: 12 }, () => {
  const owner = faker.helpers.arrayElement(MEMBERS)
  const otherMembers = faker.helpers.arrayElements(
    MEMBERS.filter(m => m.id !== owner.id),
    { min: 2, max: 6 }
  )
  // The owner is always "active" from day one; everyone else is mostly
  // active with a realistic minority still "invited" (hasn't joined yet) —
  // this is the concrete data behind the Team card's per-member status.
  const members: ProjectMember[] = [
    { memberId: owner.id, status: 'active' },
    ...otherMembers.map(member => ({
      memberId: member.id,
      status: weighted<ProjectMemberStatus>([
        ['active', 85],
        ['invited', 15]
      ])
    }))
  ]
  return {
    id: faker.string.uuid(),
    name: faker.company.catchPhrase(),
    description: faker.lorem.sentence(),
    status: weighted<ProjectStatus>([
      ['planning', 2],
      ['active', 6],
      ['on_hold', 1],
      ['completed', 2]
    ]),
    health: weighted<ProjectHealth>([
      ['on_track', 5],
      ['at_risk', 2],
      ['blocked', 1],
      ['dependency', 2]
    ]),
    priority: weighted<ProjectPriority>([
      ['low', 2],
      ['medium', 4],
      ['high', 3]
    ]),
    progress: faker.number.int({ min: 5, max: 100 }),
    ownerId: owner.id,
    members,
    dueDate: faker.date.soon({ days: 90 }).toISOString()
  }
})

const ISSUE_PREFIXES = ['API', 'WEB', 'APP', 'INFRA']
const ISSUE_LABEL_POOL = [
  'frontend',
  'backend',
  'design',
  'urgent',
  'tech-debt',
  'customer-reported',
  'needs-qa',
  'blocked-external'
]

/** A short rich-text write-up — plain enough to look hand-written, structured enough to show off the task editor's formatting. */
function buildIssueDescriptionHtml(): string {
  const intro = faker.lorem.paragraph()
  const bullets = faker.lorem.sentences(3).split('. ').filter(Boolean)
  return [
    `<p>${intro}</p>`,
    '<p><strong>Acceptance criteria:</strong></p>',
    '<ul>',
    ...bullets.map(bullet => `<li>${bullet.replace(/\.$/, '')}.</li>`),
    '</ul>'
  ].join('')
}

/**
 * Built per-project (not as one flat 180-issue pool) so that epics,
 * "Principale" references, and "Ticket collegati" links never cross a
 * `projectId` boundary — every relational field here is only ever drawn
 * from this project's own issue list, by construction.
 */
export const ISSUES: Issue[] = PROJECTS.flatMap(project => {
  const activeMemberIds = new Set(
    project.members.filter(member => member.status === 'active').map(member => member.memberId)
  )
  const projectMembers = MEMBERS.filter(member => activeMemberIds.has(member.id))

  function buildIssue(type: IssueType): Issue {
    const createdAt = faker.date.past({ years: 1 })
    // ~30% forced into the last 7 days so the Overview dashboard's
    // "updated/completed this week" stats aren't near-empty on a fresh seed.
    const updatedAt = faker.datatype.boolean(0.3)
      ? faker.date.recent({ days: 7 })
      : faker.date.between({ from: createdAt, to: new Date() })
    const hasDueDate = faker.datatype.boolean(0.6)
    const dueDate = hasDueDate ? faker.date.soon({ days: 45 }) : undefined
    // A start date only makes sense alongside a due date (it's the span a
    // Gantt bar needs) — a few days to a few weeks before it.
    const startDate = dueDate
      ? new Date(dueDate.getTime() - faker.number.int({ min: 3, max: 20 }) * 86_400_000)
      : undefined
    const assignee = faker.helpers.arrayElement(projectMembers)

    return {
      id: faker.string.uuid(),
      key: `${faker.helpers.arrayElement(ISSUE_PREFIXES)}-${faker.number.int({ min: 100, max: 999 })}`,
      title: faker.hacker.phrase(),
      description: faker.datatype.boolean(0.7) ? buildIssueDescriptionHtml() : undefined,
      projectId: project.id,
      assigneeId: assignee?.id,
      status: weighted<IssueStatus>([
        ['backlog', 3],
        ['todo', 3],
        ['in_progress', 3],
        ['in_review', 2],
        ['done', 5]
      ]),
      priority: weighted<IssuePriority>([
        ['low', 3],
        ['medium', 4],
        ['high', 2],
        ['urgent', 1]
      ]),
      type,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      startDate: startDate?.toISOString(),
      dueDate: dueDate?.toISOString(),
      labels: faker.datatype.boolean(0.4)
        ? faker.helpers.arrayElements(ISSUE_LABEL_POOL, { min: 1, max: 2 })
        : undefined
    }
  }

  // Every project gets a small handful of real epics first...
  const epicCount = faker.number.int({ min: 1, max: 3 })
  const epics = Array.from({ length: epicCount }, () => buildIssue('epic'))

  // ...then its regular issues, ~40% of which hang off one of those epics
  // as "Principale" — guaranteed same-project by construction.
  const targetCount = faker.number.int({ min: 13, max: 17 })
  const nonEpics = Array.from({ length: Math.max(0, targetCount - epicCount) }, () => {
    const issue = buildIssue(
      weighted<IssueType>([
        ['bug', 3],
        ['feature', 3],
        ['task', 3],
        ['chore', 1]
      ])
    )
    if (epics.length > 0 && faker.datatype.boolean(0.4)) {
      issue.parentId = faker.helpers.arrayElement(epics).id
    }
    return issue
  })

  const projectIssues = [...epics, ...nonEpics]

  // A second pass for "Ticket collegati" — needs the full sibling list to
  // already exist, so it can't happen inside buildIssue() itself.
  for (const issue of projectIssues) {
    if (!faker.datatype.boolean(0.15)) continue
    const candidates = projectIssues.filter(other => other.id !== issue.id)
    if (candidates.length > 0) {
      issue.linkedIssueIds = [faker.helpers.arrayElement(candidates).id]
    }
  }

  return projectIssues
})

// ---------------------------------------------------------------------------
// Company profile & offices — a single company record plus its real
// locations, configured on the Company Settings pages; generated once here
// as realistic starting content, same as everything else in this file.
// ---------------------------------------------------------------------------

export const COMPANY: Company = {
  name: 'Vesuvio',
  legalName: 'Vesuvio Technologies S.p.A.',
  taxId: 'IT01234567890',
  industry: 'Software',
  size: '51-200',
  foundedYear: 2018,
  website: 'https://vesuvio.example.com',
  email: 'hello@vesuvius.dev',
  phone: '+39 02 1234 5678',
  description:
    'Vesuvio builds the design system and admin tooling behind Vesuvio UI, the kit powering this whole demo.'
}

const OFFICE_DEFS: Omit<Office, 'id'>[] = [
  {
    name: 'Milan HQ',
    city: 'Milan',
    country: 'IT',
    address: 'Via Monte Napoleone 8, 20121 Milano',
    lat: 45.4642,
    lng: 9.19,
    isHeadquarters: true
  },
  {
    name: 'Rome Office',
    city: 'Rome',
    country: 'IT',
    address: 'Via del Corso 100, 00186 Roma',
    lat: 41.9028,
    lng: 12.4964,
    isHeadquarters: false
  },
  {
    name: 'London Office',
    city: 'London',
    country: 'UK',
    address: '20 Fenchurch St, London EC3M 3BY',
    lat: 51.5072,
    lng: -0.1276,
    isHeadquarters: false
  },
  {
    name: 'Berlin Office',
    city: 'Berlin',
    country: 'DE',
    address: 'Torstraße 140, 10119 Berlin',
    lat: 52.52,
    lng: 13.405,
    isHeadquarters: false
  }
]

export const OFFICES: Office[] = OFFICE_DEFS.map(office => ({ id: faker.string.uuid(), ...office }))

/** The exact "City, Country" string `Employee.location`/`Shift.location` use for this office. */
export function officeLocationLabel(office: Office): string {
  return `${office.city}, ${office.country}`
}

// Real office coordinates keyed by that same location string — "Remote"
// has none, on purpose, since a remote hire's check-in should never
// resolve to a fixed office point. Derived from `OFFICES` (not a separate
// hardcoded table) so the Time Clock page's geofencing and this dataset's
// own historical `TIME_ENTRIES` agree on where each office actually is.
export const OFFICE_COORDINATES: Record<string, { lat: number; lng: number }> = Object.fromEntries(
  OFFICES.map(office => [officeLocationLabel(office), { lat: office.lat, lng: office.lng }])
)

// ---------------------------------------------------------------------------
// Shipments — one per shipped/delivered Order. The origin is a real
// `Office` (reused, not invented); the destination is whatever city
// `Order.shippingAddress` already has, which this dataset generates via
// `faker.location.city()`/`countryCode()` — not real, geocodable places —
// so its map coordinates are simulated too (via `faker`, itself seeded
// at the top of this file, so still perfectly reproducible run to run,
// just not a real geocode).
// ---------------------------------------------------------------------------

const CARRIERS = ['UPS', 'FedEx', 'DHL', 'USPS', 'ParcelFlow']
const SHIPMENT_SERVICE_TIERS: ShipmentServiceTier[] = [
  'standard',
  'express',
  'priority_air',
  'economy',
  'signature'
]
const SHIPMENT_PACKAGE_TYPES: ShipmentPackageType[] = ['box', 'envelope', 'pallet', 'tube', 'crate']
const PACKAGE_NAMES = [
  'Retail carton',
  'Poly mailer',
  'Padded envelope',
  'Bulk pallet',
  'Gift box',
  'Document tube'
]
const HUB_NAMES = [
  'Mercer Hub',
  'Salt Lake City Hub',
  'Chicago Sort Facility',
  'Newark Gateway',
  'Dallas Cross-Dock',
  'Denver Regional Hub',
  'Atlanta Sort Center',
  'Phoenix Gateway'
]

/** A stable pin for a city this dataset has no real coordinates for — plausible, not a real geocode. */
function pseudoCoordinates(): { lat: number; lng: number } {
  return {
    lat: Math.round(faker.number.float({ min: -55, max: 65 }) * 1000) / 1000,
    lng: Math.round(faker.number.float({ min: -170, max: 170 }) * 1000) / 1000
  }
}

function buildShipmentActivity(
  status: ShipmentStatus,
  orderCreatedAt: string,
  originCity: string,
  destinationCity: string
) {
  const start = new Date(orderCreatedAt)
  const hoursAfter = (hours: number) => new Date(start.getTime() + hours * 3_600_000).toISOString()

  const events: ShipmentActivityEvent[] = [
    {
      title: 'Order placed',
      description: 'Shipment record was generated from the customer order in the online store.',
      location: originCity,
      timestamp: start.toISOString()
    },
    {
      title: 'Preparing to ship',
      description: 'Warehouse team packed the order and generated a shipping label.',
      location: originCity,
      timestamp: hoursAfter(6)
    }
  ]
  if (status === 'label_created') return events

  events.push({
    title: 'Picked up by carrier',
    description: 'Package was scanned and picked up from the origin facility.',
    location: originCity,
    timestamp: hoursAfter(20)
  })
  if (status === 'exception') {
    events.push({
      title: 'Delivery exception',
      description: "The carrier reported an issue with this shipment — it's being investigated.",
      location: destinationCity,
      timestamp: hoursAfter(48)
    })
    return events
  }

  events.push({
    title: 'In transit',
    description: 'Package is on its way to the destination facility.',
    timestamp: hoursAfter(30)
  })
  if (status === 'in_transit') return events

  events.push({
    title: 'Out for delivery',
    description: `Package left the local facility for final delivery in ${destinationCity}.`,
    location: destinationCity,
    timestamp: hoursAfter(72)
  })
  if (status === 'out_for_delivery') return events

  events.push({
    title: 'Delivered',
    description: 'Package was delivered and signed for.',
    location: destinationCity,
    timestamp: hoursAfter(76)
  })
  return events
}

export const SHIPMENTS: Shipment[] = ORDERS.filter(order =>
  ['shipped', 'delivered'].includes(order.status)
).map(order => {
  const status: ShipmentStatus =
    order.status === 'delivered'
      ? 'delivered'
      : weighted<ShipmentStatus>([
          ['label_created', 1],
          ['in_transit', 4],
          ['out_for_delivery', 2],
          ['exception', 1]
        ])

  const origin = faker.helpers.arrayElement(OFFICES)
  const destination = order.shippingAddress
  const destinationCoords = pseudoCoordinates()

  const routeHubs = faker.helpers.arrayElements(HUB_NAMES, { min: 2, max: 3 })
  const currentHub =
    status === 'label_created'
      ? `${origin.city} Origin Facility`
      : status === 'delivered'
        ? `${destination.city} Delivery Facility`
        : faker.helpers.arrayElement(routeHubs)

  const delayed =
    status === 'exception' || (status !== 'label_created' && faker.datatype.boolean(0.15))
  const itemWeightKg = faker.number.float({ min: 0.2, max: 8, fractionDigits: 1 })

  return {
    id: faker.string.uuid(),
    orderId: order.id,
    orderNumber: order.orderNumber,
    carrier: faker.helpers.arrayElement(CARRIERS),
    trackingNumber: faker.string.alphanumeric({ length: 12, casing: 'upper' }),
    status,
    estimatedDelivery: faker.date.soon({ days: 10 }).toISOString(),

    serviceTier: faker.helpers.arrayElement(SHIPMENT_SERVICE_TIERS),
    originCity: origin.city,
    originCountry: origin.country,
    originLat: origin.lat,
    originLng: origin.lng,
    destinationCity: destination.city,
    destinationCountry: destination.country,
    destinationLat: destinationCoords.lat,
    destinationLng: destinationCoords.lng,
    currentHub,
    routeHubs,
    lastScanAt: daysFromNow(-faker.number.int({ min: 0, max: 2 })).toISOString(),
    delayed,

    packageName: faker.helpers.arrayElement(PACKAGE_NAMES),
    packageType: faker.helpers.arrayElement(SHIPMENT_PACKAGE_TYPES),
    itemWeightKg,
    totalWeightKg: Number(
      (itemWeightKg + faker.number.float({ min: 0.1, max: 0.6, fractionDigits: 1 })).toFixed(1)
    ),
    lengthCm: faker.number.int({ min: 15, max: 60 }),
    widthCm: faker.number.int({ min: 10, max: 45 }),
    heightCm: faker.number.int({ min: 5, max: 30 }),
    notes: faker.datatype.boolean(0.25) ? faker.lorem.sentence() : undefined,

    activity: buildShipmentActivity(status, order.createdAt, origin.city, destination.city)
  }
})

// ---------------------------------------------------------------------------
// HR domain — a separate roster from Project Management's TEAMS/MEMBERS
// (an org's whole workforce vs. just the people staffed on projects), same
// as ecommerce's CUSTOMERS is kept separate from both.
// ---------------------------------------------------------------------------

const JOB_TITLES = [
  'Software Engineer',
  'Senior Software Engineer',
  'Product Designer',
  'Product Manager',
  'Marketing Specialist',
  'Sales Representative',
  'Customer Success Manager',
  'Financial Analyst',
  'HR Business Partner',
  'Office Manager'
]
const OFFICE_LOCATIONS = [...OFFICES.map(officeLocationLabel), 'Remote']

// A broad, cross-department pool rather than one list per job title — a
// real employee profile mixes a couple of role-core skills with general
// ones (languages, tools), and this dataset only needs to feel plausible.
const SKILL_POOL = [
  'TypeScript',
  'React',
  'Node.js',
  'Figma',
  'User Research',
  'Product Strategy',
  'SQL',
  'Data Analysis',
  'Project Management',
  'Public Speaking',
  'Salesforce',
  'Negotiation',
  'SEO',
  'Content Strategy',
  'Financial Modeling',
  'Excel',
  'Recruiting',
  'Employee Relations',
  'Italian',
  'English',
  'German',
  'Spanish'
]

let employeeCodeCounter = 1
function nextEmployeeCode(): string {
  const code = `EMP-${String(employeeCodeCounter).padStart(4, '0')}`
  employeeCodeCounter += 1
  return code
}

const DEPARTMENT_DEFS: { name: string; description: string }[] = [
  { name: 'Executive', description: 'Company leadership and overall strategy.' },
  { name: 'Engineering', description: 'Builds and operates the product.' },
  { name: 'Design', description: 'Product design, research, and brand.' },
  { name: 'Product', description: 'Product strategy and roadmap.' },
  { name: 'Marketing', description: 'Brand, growth, and demand generation.' },
  { name: 'Sales', description: 'New business and account management.' },
  { name: 'Finance', description: 'Accounting, payroll, and financial planning.' },
  { name: 'People', description: 'Hiring, HR operations, and culture.' },
  { name: 'Operations', description: 'Logistics, fulfillment, and support.' }
]

// `headEmployeeId` is filled in below, once EMPLOYEES exists — a department
// needs its head's id, and a head is just an employee, so this can't be
// resolved in one pass without a placeholder.
export const DEPARTMENTS: Department[] = DEPARTMENT_DEFS.map(({ name, description }) => ({
  id: faker.string.uuid(),
  name,
  description
}))

function departmentByName(name: string): Department {
  const department = DEPARTMENTS.find(d => d.name === name)
  if (!department) throw new Error(`Unknown department "${name}" in generator setup.`)
  return department
}

function buildEmployee(
  overrides: Partial<Employee> & Pick<Employee, 'jobTitle' | 'departmentId'>
): Employee {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const vacationDaysTotal = 26
  const rolHoursTotal = 88
  const employmentType = overrides.employmentType ?? 'full_time'
  const employee: Employee = {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    personalEmail: faker.datatype.boolean(0.5)
      ? faker.internet.email({ firstName, lastName, provider: 'gmail.com' }).toLowerCase()
      : undefined,
    phone: faker.phone.number({ style: 'international' }),
    avatarUrl: faker.image.avatarGitHub(),
    employmentType,
    status: 'active',
    location: faker.helpers.arrayElement(OFFICE_LOCATIONS),
    address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
    hireDate: faker.date.past({ years: 6 }).toISOString(),
    birthDate: faker.date.birthdate({ min: 23, max: 62, mode: 'age' }).toISOString(),
    employeeCode: nextEmployeeCode(),
    contractEndDate:
      employmentType === 'contractor' ? faker.date.soon({ days: 180 }).toISOString() : undefined,
    skills: faker.helpers.arrayElements(SKILL_POOL, { min: 3, max: 6 }),
    emergencyContactName: faker.person.fullName(),
    emergencyContactPhone: faker.phone.number({ style: 'international' }),
    vacationDaysTotal,
    vacationDaysUsed: faker.number.int({ min: 0, max: vacationDaysTotal }),
    rolHoursTotal,
    rolHoursUsed: faker.number.int({ min: 0, max: rolHoursTotal }),
    ...overrides
  }
  return employee
}

// A realistic 3-level reporting line, not just a flat list with a
// department label: one CEO at the root, one head per department reporting
// to the CEO, and everyone else reporting to their own department's head —
// this is what makes both the Departments page (a head + its members) and
// the Org Chart (an actual tree, not a pile of disconnected nodes) mean
// something.
const executiveDept = departmentByName('Executive')
const lineDepartments = DEPARTMENTS.filter(d => d.id !== executiveDept.id)

const ceo = buildEmployee({
  jobTitle: 'Chief Executive Officer',
  departmentId: executiveDept.id,
  hireDate: faker.date.past({ years: 8 }).toISOString()
})

const heads = lineDepartments.map(department =>
  buildEmployee({
    jobTitle: `Head of ${department.name}`,
    departmentId: department.id,
    managerId: ceo.id,
    hireDate: faker.date.past({ years: 6 }).toISOString()
  })
)

const individualContributors = Array.from({ length: 15 }, () => {
  const department = faker.helpers.arrayElement(lineDepartments)
  const head = heads.find(h => h.departmentId === department.id)
  return buildEmployee({
    jobTitle: faker.helpers.arrayElement(JOB_TITLES),
    departmentId: department.id,
    managerId: head?.id,
    employmentType: weighted<EmploymentType>([
      ['full_time', 8],
      ['part_time', 1.5],
      ['contractor', 1]
    ]),
    status: weighted<EmployeeStatus>([
      ['active', 10],
      ['on_leave', 1],
      ['terminated', 0.5]
    ])
  })
})

export const EMPLOYEES: Employee[] = [ceo, ...heads, ...individualContributors]

// Second pass: now that every employee exists, point each department at its
// head (the Executive department's "head" is the CEO — there's no one else
// in it).
executiveDept.headEmployeeId = ceo.id
for (const department of lineDepartments) {
  department.headEmployeeId = heads.find(h => h.departmentId === department.id)?.id
}

// A window straddling "today" so the Attendance Calendar always has
// something to show on both sides of whichever month it opens on.
const ABSENCE_WINDOW_START = daysFromNow(-60)
const ABSENCE_WINDOW_END = daysFromNow(60)

function daysFromNow(days: number): Date {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function randomAbsenceStatus(): AbsenceStatus {
  return weighted<AbsenceStatus>([
    ['approved', 7],
    ['pending', 2],
    ['rejected', 1]
  ])
}

const REJECTION_REASONS = [
  'Team coverage is too thin on these dates — can we look at the following week instead?',
  'This overlaps the release freeze; please resubmit for after launch.',
  "We're already at capacity for approved leave that week.",
  'Please resubmit with more advance notice next time.'
]
const APPROVAL_NOTES = [
  'Enjoy the time off!',
  'Approved — please hand off any open tickets first.',
  'All set, thanks for the heads-up.'
]

/** The employee's manager if they have one, else a generic HR fallback — who reviewed a non-pending request. */
function reviewerNameFor(employee: Employee): string {
  const manager = EMPLOYEES.find(e => e.id === employee.managerId)
  return manager?.name ?? 'HR Team'
}

/** The reviewer trio (note/name/timestamp) for a request that's past "pending" — `undefined` for one that's still pending. */
function reviewFieldsFor(
  status: AbsenceStatus,
  employee: Employee,
  requestedAt: string
): Pick<Absence, 'reviewNote' | 'reviewedBy' | 'reviewedAt'> {
  if (status === 'pending') return {}
  return {
    // A rejection always carries a reason; an approval sometimes does — a
    // silent approval is normal, a silent rejection isn't.
    reviewNote:
      status === 'rejected'
        ? faker.helpers.arrayElement(REJECTION_REASONS)
        : faker.datatype.boolean(0.25)
          ? faker.helpers.arrayElement(APPROVAL_NOTES)
          : undefined,
    reviewedBy: reviewerNameFor(employee),
    reviewedAt: faker.date.soon({ days: 3, refDate: requestedAt }).toISOString()
  }
}

export const ABSENCES: Absence[] = EMPLOYEES.flatMap(employee =>
  Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => {
    const type = weighted<AbsenceType>([
      ['vacation', 4],
      ['permit', 3],
      ['smart_working', 3],
      ['sick_leave', 1.5],
      ['public_holiday', 0.5]
    ])
    const start = faker.date.between({ from: ABSENCE_WINDOW_START, to: ABSENCE_WINDOW_END })
    // Vacation/smart-working can span a few days; permits/sick days are
    // usually just the one; public holidays are always a single day.
    const spanDays =
      type === 'vacation'
        ? faker.number.int({ min: 1, max: 7 })
        : type === 'smart_working'
          ? faker.number.int({ min: 1, max: 3 })
          : type === 'sick_leave'
            ? faker.number.int({ min: 1, max: 2 })
            : 1
    const end = new Date(start)
    end.setDate(end.getDate() + spanDays - 1)

    const isHourly = type === 'permit'
    const startHour = faker.number.int({ min: 9, max: 15 })
    // Only a single-day permit/smart-working can be a half day — a
    // multi-day span (or a whole-day-only type like vacation) is always full.
    const canBeHalfDay = spanDays === 1 && (type === 'permit' || type === 'smart_working')
    const isHalfDay = canBeHalfDay && faker.datatype.boolean(0.3)
    // A permit's dayPart follows its actual clock time (so a 15:00 permit is
    // never mislabeled "morning"); smart-working has no clock time to derive
    // it from, so it's picked freely.
    const dayPart: DayPart = !isHalfDay
      ? 'full'
      : isHourly
        ? startHour < 13
          ? 'morning'
          : 'afternoon'
        : faker.helpers.arrayElement(['morning', 'afternoon'] as const)
    const status = randomAbsenceStatus()
    const requestedAt = faker.date.recent({ days: 30, refDate: start }).toISOString()

    return {
      id: faker.string.uuid(),
      employeeId: employee.id,
      type,
      startDate: isoDate(start),
      endDate: isoDate(end),
      startTime: isHourly ? `${String(startHour).padStart(2, '0')}:00` : undefined,
      endTime: isHourly
        ? `${String(startHour + faker.number.int({ min: 1, max: 3 })).padStart(2, '0')}:00`
        : undefined,
      dayPart,
      status,
      note: faker.datatype.boolean(0.2) ? faker.lorem.sentence() : undefined,
      requestedAt,
      ...reviewFieldsFor(status, employee, requestedAt)
    }
  })
)

// A handful of explicit "half smart working + half permit, same day" pairs
// — the exact scenario a single cell needs to show two complementary
// half-day segments, guaranteed to exist instead of left to chance.
const HALF_DAY_PAIR_COUNT = 6
for (const employee of faker.helpers.arrayElements(EMPLOYEES, HALF_DAY_PAIR_COUNT)) {
  const day = isoDate(faker.date.between({ from: ABSENCE_WINDOW_START, to: ABSENCE_WINDOW_END }))
  const morningIsSmartWorking = faker.datatype.boolean()
  const morningRequestedAt = faker.date.recent({ days: 14, refDate: new Date(day) }).toISOString()
  const morningStatus = randomAbsenceStatus()
  const afternoonRequestedAt = faker.date.recent({ days: 14, refDate: new Date(day) }).toISOString()
  const afternoonStatus = randomAbsenceStatus()
  ABSENCES.push(
    {
      id: faker.string.uuid(),
      employeeId: employee.id,
      type: morningIsSmartWorking ? 'smart_working' : 'permit',
      startDate: day,
      endDate: day,
      startTime: morningIsSmartWorking ? undefined : '09:00',
      endTime: morningIsSmartWorking ? undefined : '13:00',
      dayPart: 'morning',
      status: morningStatus,
      requestedAt: morningRequestedAt,
      ...reviewFieldsFor(morningStatus, employee, morningRequestedAt)
    },
    {
      id: faker.string.uuid(),
      employeeId: employee.id,
      type: morningIsSmartWorking ? 'permit' : 'smart_working',
      startDate: day,
      endDate: day,
      startTime: morningIsSmartWorking ? '13:00' : undefined,
      endTime: morningIsSmartWorking ? '17:00' : undefined,
      dayPart: 'afternoon',
      status: afternoonStatus,
      requestedAt: afternoonRequestedAt,
      ...reviewFieldsFor(afternoonStatus, employee, afternoonRequestedAt)
    }
  )
}

const EXPENSE_DESCRIPTIONS: Record<ExpenseCategory, string[]> = {
  travel: ['Client visit flight', 'Train ticket', 'Airport taxi', 'Hotel stay'],
  meals: ['Team lunch', 'Client dinner', 'Coffee with candidate'],
  software: ['Design tool subscription', 'IDE license', 'SaaS renewal'],
  office_supplies: ['Monitor stand', 'Desk chair', 'Notebooks and pens'],
  training: ['Conference ticket', 'Online course', 'Certification exam'],
  other: ['Miscellaneous reimbursement']
}

export const EXPENSE_REPORTS: ExpenseReport[] = EMPLOYEES.flatMap(employee =>
  Array.from({ length: faker.number.int({ min: 0, max: 4 }) }, () => {
    const category = faker.helpers.arrayElement(
      Object.keys(EXPENSE_DESCRIPTIONS) as ExpenseCategory[]
    )
    return {
      id: faker.string.uuid(),
      employeeId: employee.id,
      description: faker.helpers.arrayElement(EXPENSE_DESCRIPTIONS[category]),
      category,
      amount: faker.number.float({ min: 12, max: 480, fractionDigits: 2 }),
      date: faker.date.recent({ days: 90 }).toISOString(),
      status: weighted<ExpenseStatus>([
        ['reimbursed', 5],
        ['approved', 2],
        ['pending', 2],
        ['rejected', 0.5]
      ])
    }
  })
)

/** The last 6 payroll runs, "YYYY-MM", oldest first — matches how many months of payslips each employee has. */
const PAYROLL_PERIODS = Array.from({ length: 6 }, (_, i) => {
  const date = daysFromNow(0)
  date.setMonth(date.getMonth() - (5 - i))
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
})

export const PAYSLIPS: Payslip[] = EMPLOYEES.filter(e => e.status !== 'terminated').flatMap(
  employee => {
    const salaryType = weighted<SalaryType>([
      ['annual', 7],
      ['monthly', 3]
    ])
    const grossSalary =
      salaryType === 'annual'
        ? faker.number.int({ min: 30000, max: 78000 })
        : faker.number.int({ min: 1100, max: 3200 })
    const monthlyGross = salaryType === 'annual' ? grossSalary / 12 : grossSalary

    let previousNetPay: number | undefined
    return PAYROLL_PERIODS.map(period => {
      const expenseReimbursement = faker.datatype.boolean(0.35)
        ? faker.number.float({ min: 20, max: 300, fractionDigits: 2 })
        : 0
      const extraItems = faker.datatype.boolean(0.2)
        ? faker.number.float({ min: 50, max: 400, fractionDigits: 2 })
        : 0
      const netPay = Number(
        (
          monthlyGross * faker.number.float({ min: 0.58, max: 0.68, fractionDigits: 3 }) +
          expenseReimbursement +
          extraItems
        ).toFixed(2)
      )
      const payslip: Payslip = {
        id: faker.string.uuid(),
        employeeId: employee.id,
        period,
        grossSalary,
        salaryType,
        daysWorked: faker.number.int({ min: 18, max: 26 }),
        expenseReimbursement,
        extraItems,
        netPay,
        previousNetPay
      }
      previousNetPay = netPay
      return payslip
    })
  }
)

const DOCUMENT_NAMES: Record<DocumentType, string[]> = {
  contract: ['Employment Contract', 'Contract Amendment'],
  payslip: ['Payslip PDF'],
  id_document: ['ID Card Copy', 'Passport Copy'],
  certificate: ['Degree Certificate', 'Training Certificate'],
  other: ['Signed NDA', 'Reference Letter']
}

export const EMPLOYEE_DOCUMENTS: EmployeeDocument[] = EMPLOYEES.flatMap(employee =>
  Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => {
    const type = faker.helpers.arrayElement(Object.keys(DOCUMENT_NAMES) as DocumentType[])
    return {
      id: faker.string.uuid(),
      employeeId: employee.id,
      name: faker.helpers.arrayElement(DOCUMENT_NAMES[type]),
      type,
      uploadedAt: faker.date.past({ years: 2 }).toISOString()
    }
  })
)

// ---------------------------------------------------------------------------
// Recruiting — job openings + their candidate pipeline (Kanban board).
// ---------------------------------------------------------------------------

export const JOB_OPENINGS: JobOpening[] = Array.from({ length: 10 }, () => {
  const department = faker.helpers.arrayElement(lineDepartments)
  return {
    id: faker.string.uuid(),
    title:
      `${faker.helpers.arrayElement(['Senior', 'Staff', 'Lead', 'Junior', ''])} ${faker.helpers.arrayElement(JOB_TITLES)}`.trim(),
    departmentId: department.id,
    location: faker.helpers.arrayElement(OFFICE_LOCATIONS),
    employmentType: weighted<EmploymentType>([
      ['full_time', 8],
      ['part_time', 1],
      ['contractor', 1]
    ]),
    status: weighted<JobOpeningStatus>([
      ['open', 6],
      ['on_hold', 2],
      ['closed', 2]
    ]),
    openedAt: faker.date.past({ years: 1 }).toISOString(),
    targetHires: faker.number.int({ min: 1, max: 3 })
  }
})

const CANDIDATE_SOURCES = ['LinkedIn', 'Referral', 'Job Board', 'Agency', 'Career Site']

export const CANDIDATES: Candidate[] = JOB_OPENINGS.flatMap(jobOpening =>
  Array.from({ length: faker.number.int({ min: 3, max: 9 }) }, () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const stage = weighted<CandidateStage>([
      ['applied', 5],
      ['phone_screen', 3],
      ['interview', 2.5],
      ['offer', 1],
      ['hired', 0.8],
      ['rejected', 3]
    ])
    return {
      id: faker.string.uuid(),
      jobOpeningId: jobOpening.id,
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      avatarUrl: faker.image.avatarGitHub(),
      stage,
      appliedAt: faker.date.past({ years: 1 }).toISOString(),
      source: faker.helpers.arrayElement(CANDIDATE_SOURCES),
      rating: stage === 'applied' ? undefined : faker.number.int({ min: 1, max: 5 })
    }
  })
)

// ---------------------------------------------------------------------------
// External professionals — freelancers/agencies/consultancies, tracked
// separately from EMPLOYEES since they're not on payroll.
// ---------------------------------------------------------------------------

const EXTERNAL_ROLES = [
  'Brand Consultant',
  'Legal Counsel',
  'Recruiter',
  'DevOps Contractor',
  'Copywriter',
  'Data Analyst'
]

export const EXTERNAL_PROFESSIONALS: ExternalProfessional[] = Array.from({ length: 9 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const status = weighted<ExternalProfessionalStatus>([
    ['active', 3],
    ['inactive', 1]
  ])
  const contractStart = faker.date.past({ years: 2 })
  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    avatarUrl: faker.image.avatarGitHub(),
    company: faker.company.name(),
    role: faker.helpers.arrayElement(EXTERNAL_ROLES),
    engagementType: weighted<EngagementType>([
      ['freelance', 4],
      ['agency', 2],
      ['consultancy', 2]
    ]),
    hourlyRate: faker.datatype.boolean(0.7) ? faker.number.int({ min: 40, max: 180 }) : undefined,
    contractStart: contractStart.toISOString(),
    contractEnd: status === 'inactive' ? faker.date.recent({ days: 60 }).toISOString() : undefined,
    status
  }
})

// ---------------------------------------------------------------------------
// Shifts + time tracking — a 4-week window straddling today, so the Shifts
// grid (past = completed, future = scheduled) always has both to show.
// ---------------------------------------------------------------------------

const SHIFT_TEMPLATES: { startTime: string; endTime: string }[] = [
  { startTime: '09:00', endTime: '17:00' },
  { startTime: '14:00', endTime: '22:00' },
  { startTime: '07:00', endTime: '15:00' }
]

const shiftedEmployees = EMPLOYEES.filter(e => e.status === 'active')

export const SHIFTS: Shift[] = shiftedEmployees.flatMap(employee => {
  const workDays = faker.helpers.arrayElements(
    Array.from({ length: 28 }, (_, i) => i - 14),
    { min: 12, max: 18 }
  )
  const template = faker.helpers.arrayElement(SHIFT_TEMPLATES)
  return workDays.map(dayOffset => {
    const date = isoDate(daysFromNow(dayOffset))
    const isPast = dayOffset < 0
    return {
      id: faker.string.uuid(),
      employeeId: employee.id,
      date,
      startTime: template.startTime,
      endTime: template.endTime,
      location: employee.location,
      status: isPast
        ? weighted<ShiftStatus>([
            ['completed', 9],
            ['cancelled', 1]
          ])
        : 'scheduled'
    }
  })
})

/** Small lat/lng jitter so repeated check-ins "from the same office" don't all land on the exact same point. */
function jitterCoordinate(coordinate: { lat: number; lng: number }, spreadDegrees: number) {
  return {
    lat:
      coordinate.lat +
      faker.number.float({ min: -spreadDegrees, max: spreadDegrees, fractionDigits: 5 }),
    lng:
      coordinate.lng +
      faker.number.float({ min: -spreadDegrees, max: spreadDegrees, fractionDigits: 5 })
  }
}

/**
 * Where a clock-in/out was geolocated from — the employee's assigned office
 * most of the time (tight jitter = "on the premises"), occasionally
 * somewhere else entirely (wide jitter around a random city = working from
 * home/a client site that day), always off-site for a fully remote hire.
 */
function buildClockLocation(employee: Employee): ClockLocation {
  const worksOffSite = employee.location === 'Remote' || faker.datatype.boolean(0.12)
  const office = OFFICE_COORDINATES[employee.location]
  if (!worksOffSite && office) {
    return {
      ...jitterCoordinate(office, 0.003),
      label: `${employee.location} Office`,
      onSite: true,
      accuracyMeters: faker.number.int({ min: 8, max: 35 })
    }
  }
  const anyCity = faker.helpers.arrayElement(Object.values(OFFICE_COORDINATES))
  return {
    ...jitterCoordinate(anyCity, 0.08),
    label: 'Remote',
    onSite: false,
    accuracyMeters: faker.number.int({ min: 15, max: 65 })
  }
}

export const TIME_ENTRIES: TimeEntry[] = SHIFTS.filter(shift => shift.status === 'completed').map(
  shift => {
    const employee = EMPLOYEES.find(e => e.id === shift.employeeId)
    if (!employee) throw new Error(`Shift references unknown employee "${shift.employeeId}".`)

    const status = weighted<TimeEntryStatus>([
      ['on_time', 7],
      ['late', 2],
      ['missing', 1]
    ])
    if (status === 'missing') {
      return { id: faker.string.uuid(), employeeId: shift.employeeId, date: shift.date, status }
    }
    const lateMinutes = status === 'late' ? faker.number.int({ min: 5, max: 45 }) : 0
    const [startHour, startMinute] = shift.startTime.split(':').map(Number)
    const [endHour, endMinute] = shift.endTime.split(':').map(Number)
    const clockInMinutes = (startHour ?? 9) * 60 + (startMinute ?? 0) + lateMinutes
    const clockOutMinutes =
      (endHour ?? 17) * 60 + (endMinute ?? 0) + faker.number.int({ min: -10, max: 20 })
    const format = (totalMinutes: number) =>
      `${String(Math.floor(totalMinutes / 60) % 24).padStart(2, '0')}:${String(totalMinutes % 60).padStart(2, '0')}`
    return {
      id: faker.string.uuid(),
      employeeId: shift.employeeId,
      date: shift.date,
      clockIn: format(clockInMinutes),
      clockOut: format(clockOutMinutes),
      totalHours: Number(((clockOutMinutes - clockInMinutes) / 60).toFixed(1)),
      status,
      clockInLocation: buildClockLocation(employee),
      clockOutLocation: buildClockLocation(employee)
    }
  }
)

// ---------------------------------------------------------------------------
// Calendar events — independent of any `Issue`'s `dueDate`; created
// directly on the Calendar (a meeting, a reminder), the way a real
// Google-Calendar-style calendar isn't only a view onto a task tracker.
// ---------------------------------------------------------------------------

const EVENT_TITLES = [
  'Sprint planning',
  'Design review',
  '1:1',
  'Client sync',
  'Team standup',
  'Roadmap review',
  'Retro',
  'Onboarding session',
  'Architecture review',
  'All-hands'
]

const EVENT_LOCATIONS = ['Meeting Room A', 'Meeting Room B', 'Google Meet', 'Zoom']
const EVENT_COLORS: EventColor[] = ['default', 'success', 'warning', 'info', 'highlight']

export const EVENTS: Event[] = Array.from({ length: 25 }, () => {
  const day = daysFromNow(faker.number.int({ min: -14, max: 42 }))
  const start = new Date(day)
  start.setHours(faker.number.int({ min: 8, max: 17 }), faker.helpers.arrayElement([0, 30]), 0, 0)
  const end = new Date(start.getTime() + faker.helpers.arrayElement([30, 60, 90]) * 60_000)

  return {
    id: faker.string.uuid(),
    title: faker.helpers.arrayElement(EVENT_TITLES),
    description: faker.datatype.boolean(0.4) ? faker.lorem.sentence() : undefined,
    start: start.toISOString(),
    end: end.toISOString(),
    location: faker.datatype.boolean(0.5) ? faker.helpers.arrayElement(EVENT_LOCATIONS) : undefined,
    attendeeIds: faker.helpers.arrayElements(MEMBERS, { min: 1, max: 4 }).map(m => m.id),
    color: faker.helpers.arrayElement(EVENT_COLORS),
    createdAt: daysFromNow(-faker.number.int({ min: 1, max: 30 })).toISOString()
  }
})

// ---------------------------------------------------------------------------
// Inbox messages — a real Gmail-style mailbox. "Maya Torres" is this kit's
// fixed signed-in persona everywhere else (`apps/admin-kit/src/lib/current-user.ts`)
// even though mock-data itself has no notion of a logged-in user, so she's
// the to/from anchor here too. A `relatedIssueId` (only ever set on the
// system-sender messages below) keeps the previous ticket-feed's useful
// signal alive as one message type among genuine person-to-person ones,
// rather than losing it outright.
// ---------------------------------------------------------------------------

const CURRENT_USER_NAME = 'Maya Torres'
const CURRENT_USER_EMAIL = 'maya@vesuvius.dev'
const SYSTEM_SENDER_NAME = 'Vesuvius Notifications'
const SYSTEM_SENDER_EMAIL = 'notifications@vesuvius.dev'

const MESSAGE_SUBJECTS = [
  'Quick question about the API contract',
  'Can you review my PR?',
  "Notes from yesterday's call",
  'Follow up on the client feedback',
  'Heads up on the deploy window',
  'Draft for your review',
  'Re: timeline for next sprint',
  'Access request',
  "Let's sync this week"
]

function buildMessageSnippet(bodyHtml: string): string {
  return bodyHtml
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120)
}

function buildMessageBodyHtml(): string {
  return `<p>${faker.lorem.paragraph()}</p><p>${faker.lorem.sentence()}</p>`
}

const genuineInboxMessages: Message[] = Array.from({ length: 20 }, () => {
  const sender = faker.helpers.arrayElement(MEMBERS)
  const body = buildMessageBodyHtml()
  return {
    id: faker.string.uuid(),
    folder: 'inbox',
    fromName: sender.name,
    fromEmail: sender.email,
    toName: CURRENT_USER_NAME,
    toEmail: CURRENT_USER_EMAIL,
    subject: faker.helpers.arrayElement(MESSAGE_SUBJECTS),
    body,
    snippet: buildMessageSnippet(body),
    read: faker.datatype.boolean(0.55),
    starred: faker.datatype.boolean(0.15),
    createdAt: daysFromNow(-faker.number.int({ min: 0, max: 14 })).toISOString()
  }
})

const systemInboxMessages: Message[] = faker.helpers
  .arrayElements(ISSUES, { min: 15, max: 15 })
  .map(issue => {
    const body = `<p>${issue.key} — <strong>${issue.title}</strong></p><p>Status: ${issue.status.replace('_', ' ')}.</p>`
    return {
      id: faker.string.uuid(),
      folder: 'inbox',
      fromName: SYSTEM_SENDER_NAME,
      fromEmail: SYSTEM_SENDER_EMAIL,
      toName: CURRENT_USER_NAME,
      toEmail: CURRENT_USER_EMAIL,
      subject: `${issue.key} was updated`,
      body,
      snippet: buildMessageSnippet(body),
      read: faker.datatype.boolean(0.4),
      starred: false,
      createdAt: issue.updatedAt ?? issue.createdAt,
      relatedIssueId: issue.id
    }
  })

const sentMessages: Message[] = Array.from({ length: 10 }, () => {
  const recipient = faker.helpers.arrayElement(MEMBERS)
  const body = buildMessageBodyHtml()
  return {
    id: faker.string.uuid(),
    folder: 'sent',
    fromName: CURRENT_USER_NAME,
    fromEmail: CURRENT_USER_EMAIL,
    toName: recipient.name,
    toEmail: recipient.email,
    subject: faker.helpers.arrayElement(MESSAGE_SUBJECTS),
    body,
    snippet: buildMessageSnippet(body),
    read: true,
    starred: false,
    createdAt: daysFromNow(-faker.number.int({ min: 0, max: 20 })).toISOString()
  }
})

const draftMessages: Message[] = Array.from({ length: 2 }, () => {
  const body = `<p>${faker.lorem.sentence()}</p>`
  return {
    id: faker.string.uuid(),
    folder: 'drafts',
    fromName: CURRENT_USER_NAME,
    fromEmail: CURRENT_USER_EMAIL,
    toName: '',
    toEmail: '',
    subject: faker.datatype.boolean() ? faker.helpers.arrayElement(MESSAGE_SUBJECTS) : '',
    body,
    snippet: buildMessageSnippet(body),
    read: true,
    starred: false,
    createdAt: daysFromNow(-faker.number.int({ min: 0, max: 3 })).toISOString()
  }
})

export const MESSAGES: Message[] = [
  ...genuineInboxMessages,
  ...systemInboxMessages,
  ...sentMessages,
  ...draftMessages
].sort((a, b) => b.createdAt.localeCompare(a.createdAt))

// ---------------------------------------------------------------------------
// Chats — 1:1 direct messages, independent of Message/Inbox the same way
// Event is independent of Issue. Plain-text bubbles, not HTML documents,
// so a small hand-written pool of short office-chat lines stands in for
// `faker.lorem` here (a lorem ipsum paragraph doesn't read like a DM).
// ---------------------------------------------------------------------------

const CHAT_MESSAGE_POOL = [
  // Greetings
  'Hey, got a sec?',
  'Morning! 👋',
  'Hi there!',
  'Yo, quick one for you',
  'Hey hey, you around?',
  // Questions
  'Did you see my comment on the ticket?',
  'Any update on this?',
  'Can you take a look when you get a chance?',
  'Are we still on for the call later?',
  'Do you have the latest numbers handy?',
  'What time works for you tomorrow?',
  'Mind hopping on a quick call?',
  // Updates
  'Just pushed the fix, should be live now.',
  'Wrapping up the review, almost done.',
  'Pulled in the changes, looks good so far.',
  'Still working through it, will update you by EOD.',
  'Deploy went smoothly, no issues on my end.',
  'Pushed the deck, let me know what you think.',
  // Confirmations
  'Sounds good!',
  'Perfect, thanks!',
  'Got it, on it.',
  "Makes sense, I'll handle it.",
  '👍',
  'Yep, all set.',
  'Confirmed on my end.',
  'Will do.',
  'Sure thing.',
  // Casual
  'Ha, classic.',
  'Coffee run in 10?',
  'Happy Friday!',
  'Long week, huh?',
  'Nice work on that, seriously.',
  'Lunch later?',
  'Haha fair enough',
  '😅'
]

// A little over half the roster gets a conversation thread, leaving real
// candidates for "New chat" to pick from.
const CHAT_MEMBERS = faker.helpers.arrayElements(MEMBERS, 14)

export const CONVERSATIONS: Conversation[] = CHAT_MEMBERS.map(member => ({
  id: faker.string.uuid(),
  memberId: member.id,
  createdAt: daysFromNow(-faker.number.int({ min: 20, max: 90 })).toISOString()
}))

const UNREAD_CONVERSATION_IDS = new Set(
  faker.helpers.arrayElements(CONVERSATIONS, 5).map(c => c.id)
)

export const CHAT_MESSAGES: ChatMessage[] = CONVERSATIONS.flatMap(conversation => {
  const messageCount = faker.number.int({ min: 4, max: 35 })
  const messages: ChatMessage[] = []

  // Built backward from a recent anchor (so nothing ever lands in the
  // future), then reversed into chronological order — "bursts" of 1-3
  // messages from the same sender with a short gap between them, a
  // longer gap before the thread turns to the other person.
  let cursor = daysFromNow(-faker.number.int({ min: 0, max: 6 }))
  let sender: 'me' | 'them' = faker.datatype.boolean() ? 'me' : 'them'
  let remaining = messageCount

  while (remaining > 0) {
    const burstSize = Math.min(remaining, faker.number.int({ min: 1, max: 3 }))
    for (let i = 0; i < burstSize; i++) {
      messages.push({
        id: faker.string.uuid(),
        conversationId: conversation.id,
        senderId: sender === 'me' ? 'me' : conversation.memberId,
        body: faker.helpers.arrayElement(CHAT_MESSAGE_POOL),
        createdAt: cursor.toISOString(),
        read: true
      })
      cursor = new Date(cursor.getTime() - faker.number.int({ min: 1, max: 45 }) * 60_000)
      remaining -= 1
    }
    cursor = new Date(cursor.getTime() - faker.number.int({ min: 30, max: 600 }) * 60_000)
    sender = sender === 'me' ? 'them' : 'me'
  }

  messages.reverse()

  if (UNREAD_CONVERSATION_IDS.has(conversation.id) && messages.length > 0) {
    const last = messages[messages.length - 1]!
    // Make sure an "unread" conversation actually ends on a message from
    // them — otherwise a badge next to a thread you technically spoke
    // last in would look wrong.
    last.senderId = conversation.memberId
    last.read = false
    const secondLast = messages[messages.length - 2]
    if (secondLast && secondLast.senderId === conversation.memberId && faker.datatype.boolean()) {
      secondLast.read = false
    }
  }

  return messages
}).sort((a, b) => a.createdAt.localeCompare(b.createdAt))

// ---------------------------------------------------------------------------
// AI Chatbot — a simulated assistant, independent of Chats' person-to-
// person Conversation/ChatMessage above. Seeded history calls the exact
// same `matchAiResponse` (./ai-responses.ts) the live page uses, so the
// history and a brand-new reply are never inconsistent with each other.
// ---------------------------------------------------------------------------

const AI_FOLLOWUP_PROMPTS = [
  'Can you say more about that?',
  "Thanks, that's helpful.",
  'What about last week?',
  'Got it, appreciate it.',
  'Can you break that down further?'
]

// Spread across today / yesterday / earlier so the sidebar's Today /
// Yesterday / Previous grouping has real content in every bucket.
const AI_CONVERSATION_DAY_OFFSETS = [0, 0, 0, -1, -1, -3, -5, -8, -12]

export const AI_CONVERSATIONS: AiConversation[] = AI_CONVERSATION_DAY_OFFSETS.map(
  (dayOffset, index) => {
    const topic = AI_TOPICS[index % AI_TOPICS.length]!
    return {
      id: faker.string.uuid(),
      title: topic.prompt,
      createdAt: daysFromNow(dayOffset).toISOString()
    }
  }
)

export const AI_CHAT_MESSAGES: AiChatMessage[] = AI_CONVERSATIONS.flatMap((conversation, index) => {
  const topic = AI_TOPICS[index % AI_TOPICS.length]!
  const extraTurns = faker.number.int({ min: 0, max: 2 })
  let cursor = new Date(conversation.createdAt)

  const messages: AiChatMessage[] = [
    {
      id: faker.string.uuid(),
      conversationId: conversation.id,
      role: 'user',
      body: topic.prompt,
      createdAt: cursor.toISOString()
    }
  ]
  cursor = new Date(cursor.getTime() + faker.number.int({ min: 5, max: 40 }) * 1_000)
  messages.push({
    id: faker.string.uuid(),
    conversationId: conversation.id,
    role: 'assistant',
    body: topic.response,
    createdAt: cursor.toISOString()
  })

  for (let i = 0; i < extraTurns; i++) {
    const followup = faker.helpers.arrayElement(AI_FOLLOWUP_PROMPTS)
    cursor = new Date(cursor.getTime() + faker.number.int({ min: 30, max: 300 }) * 1_000)
    messages.push({
      id: faker.string.uuid(),
      conversationId: conversation.id,
      role: 'user',
      body: followup,
      createdAt: cursor.toISOString()
    })
    cursor = new Date(cursor.getTime() + faker.number.int({ min: 5, max: 40 }) * 1_000)
    messages.push({
      id: faker.string.uuid(),
      conversationId: conversation.id,
      role: 'assistant',
      body: matchAiResponse(followup),
      createdAt: cursor.toISOString()
    })
  }

  return messages
})

// ---------------------------------------------------------------------------
// Weekly timesheets — the one place HR's EMPLOYEES roster and Project
// Management's PROJECTS actually connect. Any active employee can log
// hours against any project, not just its formally assigned
// `Project.members` (that field is about who's staffed on a project;
// this is about who's billing time to it, a related but separate fact in
// most real tools).
// ---------------------------------------------------------------------------

const TIMESHEET_PROJECT_COUNT = 3
const TIMESHEET_WEEKS_BACK = 4

function mondayOf(date: Date): Date {
  const result = new Date(date)
  const day = result.getDay()
  const diff = (day + 6) % 7 // days since Monday (Mon=0 ... Sun=6)
  result.setDate(result.getDate() - diff)
  return result
}

export const TIMESHEET_ENTRIES: TimesheetEntry[] = EMPLOYEES.filter(
  e => e.status === 'active'
).flatMap(employee => {
  const projects = faker.helpers.arrayElements(PROJECTS, { min: 1, max: TIMESHEET_PROJECT_COUNT })
  const thisMonday = mondayOf(daysFromNow(0))

  return Array.from({ length: TIMESHEET_WEEKS_BACK }, (_, weekIndex) => {
    const weekOffset = -(TIMESHEET_WEEKS_BACK - 1 - weekIndex) // oldest week first, 0 = this week
    const weekStart = new Date(thisMonday)
    weekStart.setDate(weekStart.getDate() + weekOffset * 7)
    const isCurrentWeek = weekOffset === 0

    return Array.from({ length: 5 }, (_, dayIndex) => {
      const date = new Date(weekStart)
      date.setDate(date.getDate() + dayIndex)
      // Don't log hours for a weekday that hasn't happened yet this week.
      if (isCurrentWeek && date.getTime() > daysFromNow(0).getTime()) return []

      return projects
        .filter(() => faker.datatype.boolean(0.75)) // not every project touched every day
        .map(project => ({
          id: faker.string.uuid(),
          employeeId: employee.id,
          projectId: project.id,
          date: isoDate(date),
          hours: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8]),
          note: faker.datatype.boolean(0.2) ? faker.lorem.sentence() : undefined,
          status: isCurrentWeek
            ? weighted<TimesheetStatus>([
                ['draft', 5],
                ['submitted', 2]
              ])
            : weighted<TimesheetStatus>([
                ['approved', 8],
                ['submitted', 1],
                ['rejected', 1]
              ])
        }))
    }).flat()
  }).flat()
})
