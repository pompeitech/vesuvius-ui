import {
  ABSENCES,
  AI_CHAT_MESSAGES,
  AI_CONVERSATIONS,
  CANDIDATES,
  CHAT_MESSAGES,
  CONVERSATIONS,
  CUSTOMERS,
  DEPARTMENTS,
  EMPLOYEE_DOCUMENTS,
  EMPLOYEES,
  EVENTS,
  EXPENSE_REPORTS,
  EXTERNAL_PROFESSIONALS,
  ISSUES,
  JOB_OPENINGS,
  MEMBERS,
  MESSAGES,
  OFFICES,
  ORDERS,
  PAYSLIPS,
  PRODUCTS,
  PROJECTS,
  SHIFTS,
  SHIPMENTS,
  TEAMS,
  TIME_ENTRIES,
  TIMESHEET_ENTRIES
} from '../generators/dataset'
import type { AiChatMessage } from '../schemas/ai-chat-message'
import type { AiConversation } from '../schemas/ai-conversation'
import type { ChatMessage } from '../schemas/chat-message'
import type { Conversation } from '../schemas/conversation'
import type { Event } from '../schemas/event'
import type { Issue } from '../schemas/issue'
import type { Message } from '../schemas/message'
import type { Order } from '../schemas/order'
import type { Project } from '../schemas/project'
import type { Shipment } from '../schemas/shipment'
import { createListApi } from './list-api'

export const getCustomers = createListApi(CUSTOMERS, ['name', 'email', 'location'])
export const getProducts = createListApi(PRODUCTS, ['name', 'sku', 'category'])
export const getOrders = createListApi(ORDERS, ['orderNumber', 'customerName'])
export const getShipments = createListApi(SHIPMENTS, ['orderNumber', 'trackingNumber', 'carrier'])
export const getProjects = createListApi(PROJECTS, ['name', 'description'])
export const getIssues = createListApi(ISSUES, ['key', 'title'])
export const getTeams = createListApi(TEAMS, ['name', 'description'])
export const getMembers = createListApi(MEMBERS, ['name', 'email', 'role'])
export const getEmployees = createListApi(EMPLOYEES, ['name', 'email', 'jobTitle'])
export const getDepartments = createListApi(DEPARTMENTS, ['name', 'description'])
export const getAbsences = createListApi(ABSENCES, ['employeeId'])
export const getExpenseReports = createListApi(EXPENSE_REPORTS, ['description'])
export const getPayslips = createListApi(PAYSLIPS, ['period'])
export const getEmployeeDocuments = createListApi(EMPLOYEE_DOCUMENTS, ['name'])
export const getJobOpenings = createListApi(JOB_OPENINGS, ['title', 'location'])
export const getCandidates = createListApi(CANDIDATES, ['name', 'email'])
export const getExternalProfessionals = createListApi(EXTERNAL_PROFESSIONALS, [
  'name',
  'company',
  'role'
])
export const getShifts = createListApi(SHIFTS, ['employeeId', 'location'])
export const getTimeEntries = createListApi(TIME_ENTRIES, ['employeeId'])
export const getOffices = createListApi(OFFICES, ['name', 'city', 'country'])
export const getTimesheetEntries = createListApi(TIMESHEET_ENTRIES, ['employeeId', 'projectId'])
export const getEvents = createListApi(EVENTS, ['title', 'location'])
export const getMessages = createListApi(MESSAGES, ['subject', 'fromName', 'toName', 'snippet'])
export const getConversations = createListApi(CONVERSATIONS, ['memberId'])
export const getChatMessages = createListApi(CHAT_MESSAGES, ['body'])
export const getAiConversations = createListApi(AI_CONVERSATIONS, ['title'])
export const getAiMessages = createListApi(AI_CHAT_MESSAGES, ['body'])

/**
 * `ISSUES`/`PROJECTS` are plain module-level arrays (same as every other
 * mock-data collection — see `ORDERS.find(...)` used directly in
 * `ecommerce/order-detail-1`), so these mutate them in place. This kit has
 * no real backend, but Project Management's issue detail now lives on its
 * own route (separate from the Board/Issues list it was opened from) —
 * without writing through to the shared array, saving a ticket and
 * navigating back would silently lose the edit. Callers still keep their
 * own local `useState` copy for the current page's immediate re-render;
 * this is only the bridge that makes *other* pages see the change too.
 */
export function updateIssue(id: string, changes: Partial<Issue>): Issue | undefined {
  const index = ISSUES.findIndex(issue => issue.id === id)
  if (index === -1) return undefined
  const current = ISSUES[index]
  if (!current) return undefined
  const updated = { ...current, ...changes }
  ISSUES[index] = updated
  return updated
}

export function addIssue(issue: Issue): void {
  ISSUES.unshift(issue)
}

export function updateProject(id: string, changes: Partial<Project>): Project | undefined {
  const index = PROJECTS.findIndex(project => project.id === id)
  if (index === -1) return undefined
  const current = PROJECTS[index]
  if (!current) return undefined
  const updated = { ...current, ...changes }
  PROJECTS[index] = updated
  return updated
}

export function addProject(project: Project): void {
  PROJECTS.unshift(project)
}

export function addEvent(event: Event): void {
  EVENTS.unshift(event)
}

export function updateEvent(id: string, changes: Partial<Event>): Event | undefined {
  const index = EVENTS.findIndex(event => event.id === id)
  if (index === -1) return undefined
  const current = EVENTS[index]
  if (!current) return undefined
  const updated = { ...current, ...changes }
  EVENTS[index] = updated
  return updated
}

export function deleteEvent(id: string): void {
  const index = EVENTS.findIndex(event => event.id === id)
  if (index !== -1) EVENTS.splice(index, 1)
}

export function addMessage(message: Message): void {
  MESSAGES.unshift(message)
}

export function updateMessage(id: string, changes: Partial<Message>): Message | undefined {
  const index = MESSAGES.findIndex(message => message.id === id)
  if (index === -1) return undefined
  const current = MESSAGES[index]
  if (!current) return undefined
  const updated = { ...current, ...changes }
  MESSAGES[index] = updated
  return updated
}

export function deleteMessage(id: string): void {
  const index = MESSAGES.findIndex(message => message.id === id)
  if (index !== -1) MESSAGES.splice(index, 1)
}

export function addConversation(conversation: Conversation): void {
  CONVERSATIONS.unshift(conversation)
}

/** No page wrote to `ORDERS` before this — `add-order`/`edit-order` explicitly just simulate a save. First real write, added for the POS App's checkout (a POS ringing up a sale is the one place in this kit that plausibly creates an order live rather than editing a form). */
export function addOrder(order: Order): void {
  ORDERS.unshift(order)
}

export function addChatMessage(message: ChatMessage): void {
  CHAT_MESSAGES.push(message)
}

/** Marks every message from the other participant in a conversation as read — the chat equivalent of `updateMessage(id, {read: true})`, just bulk since a thread can have many unread bubbles at once. */
export function markConversationRead(conversationId: string): void {
  for (let i = 0; i < CHAT_MESSAGES.length; i++) {
    const message = CHAT_MESSAGES[i]
    if (
      message &&
      message.conversationId === conversationId &&
      message.senderId !== 'me' &&
      !message.read
    ) {
      CHAT_MESSAGES[i] = { ...message, read: true }
    }
  }
}

export function addAiConversation(conversation: AiConversation): void {
  AI_CONVERSATIONS.unshift(conversation)
}

export function addAiMessage(message: AiChatMessage): void {
  AI_CHAT_MESSAGES.push(message)
}

export function addShipment(shipment: Shipment): void {
  SHIPMENTS.unshift(shipment)
}

export function updateShipment(id: string, changes: Partial<Shipment>): Shipment | undefined {
  const index = SHIPMENTS.findIndex(shipment => shipment.id === id)
  if (index === -1) return undefined
  const current = SHIPMENTS[index]
  if (!current) return undefined
  const updated = { ...current, ...changes }
  SHIPMENTS[index] = updated
  return updated
}
