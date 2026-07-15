export interface IPaginationMeta {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: IPaginationMeta;
}

/**
 * Factory for an empty paginated response, used when there are no results
 * or when the API is unreachable and a fallback response is needed.
 */
export function emptyPaginatedResponse<T>(
  page: number = 1,
  limit: number = 20,
): IPaginatedResponse<T> {
  return {
    data: [],
    meta: {
      currentPage: page,
      itemsPerPage: limit,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };
}
