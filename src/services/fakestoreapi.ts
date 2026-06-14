export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

const BASE_URL = "https://fakestoreapi.com";

/**
 * Helper to handle fetch responses and error states
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

/**
 * Fetch all products, with optional limiting and sorting parameters
 */
export async function getProducts(options?: {
  limit?: number;
  sort?: "asc" | "desc";
}): Promise<Product[]> {
  const url = new URL(`${BASE_URL}/products`);
  if (options?.limit) {
    url.searchParams.append("limit", options.limit.toString());
  }
  if (options?.sort) {
    url.searchParams.append("sort", options.sort);
  }
  const response = await fetch(url.toString());
  return handleResponse<Product[]>(response);
}

/**
 * Fetch a single product by its ID
 */
export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return handleResponse<Product>(response);
}

/**
 * Fetch all available product categories
 */
export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/products/categories`);
  return handleResponse<string[]>(response);
}

/**
 * Fetch products inside a specific category, with optional limiting and sorting
 */
export async function getProductsByCategory(
  category: string,
  options?: {
    limit?: number;
    sort?: "asc" | "desc";
  }
): Promise<Product[]> {
  // Category names can contain spaces/special chars, so we encode the URI segment
  const encodedCategory = encodeURIComponent(category);
  const url = new URL(`${BASE_URL}/products/category/${encodedCategory}`);
  if (options?.limit) {
    url.searchParams.append("limit", options.limit.toString());
  }
  if (options?.sort) {
    url.searchParams.append("sort", options.sort);
  }
  const response = await fetch(url.toString());
  return handleResponse<Product[]>(response);
}
