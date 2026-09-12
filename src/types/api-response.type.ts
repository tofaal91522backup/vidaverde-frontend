/**
 * Backend er common response shape.
 *
 * Shob write ar error `{ "success": true|false, ... }` envelope-e ashe.
 * Error gulo `administrator.serializers.custom_exception_handler` diye flatten
 * hoye `{ "success": false, "message": "(field) explanation" }` hoy.
 */
export type ApiResponse = {
  success: boolean;
};

/** Pagination chhara list — `{ success, results: [...] }` */
export type ListResponse<T> = ApiResponse & {
  results: T[];
};

/**
 * `StandardResultsSetPagination` wala list. Query param: `p` ar `page_size`.
 */
export type PaginatedResponse<T> = ApiResponse & {
  count: number;
  page_size: number;
  next: string | null;
  previous: string | null;
  num_pages: number;
  current_page: number;
  results: T[];
};

/** Error body — axios error er `response.data` ei shape-e ashe */
export type ApiErrorResponse = {
  success: false;
  message: string;
};
