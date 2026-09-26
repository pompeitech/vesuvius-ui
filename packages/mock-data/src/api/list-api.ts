export type SortDirection = 'asc' | 'desc'

export type ListParams<TData> = {
  page?: number
  pageSize?: number
  /** Case-insensitive substring match across `searchableFields`. */
  search?: string
  sortBy?: keyof TData
  sortDirection?: SortDirection
  /** Simulated network latency in ms. @default 300 */
  delayMs?: number
}

export type ListResult<TData> = {
  data: TData[]
  total: number
  page: number
  pageSize: number
  pageCount: number
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * A tiny in-memory "server" for one entity array: search + sort +
 * paginate, behind an artificial delay — enough to exercise loading
 * states / server-side DataTable pagination without a real backend.
 */
export function createListApi<TData extends Record<string, unknown>>(
  data: TData[],
  searchableFields: (keyof TData)[]
) {
  return async function list(params: ListParams<TData> = {}): Promise<ListResult<TData>> {
    const { page = 1, pageSize = 10, search, sortBy, sortDirection = 'asc', delayMs = 300 } = params

    await delay(delayMs)

    let rows = data

    if (search && search.trim().length > 0) {
      const needle = search.trim().toLowerCase()
      rows = rows.filter(row =>
        searchableFields.some(field =>
          String(row[field] ?? '')
            .toLowerCase()
            .includes(needle)
        )
      )
    }

    if (sortBy) {
      const direction = sortDirection === 'desc' ? -1 : 1
      rows = [...rows].sort((a, b) => {
        const av = a[sortBy]
        const bv = b[sortBy]
        if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * direction
        return String(av).localeCompare(String(bv)) * direction
      })
    }

    const total = rows.length
    const pageCount = Math.max(1, Math.ceil(total / pageSize))
    const start = (page - 1) * pageSize

    return {
      data: rows.slice(start, start + pageSize),
      total,
      page,
      pageSize,
      pageCount
    }
  }
}
