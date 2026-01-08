import { apiUrl } from '../config';

type Options = RequestInit & { raw?: boolean; headers?: HeadersInit };

async function safeReadError(response: Response): Promise<any> {
  const contentType = response.headers.get('content-type') || '';
  try {
    // Ako server kaže da je JSON, probaj json()
    if (contentType.includes('application/json')) {
      return await response.json();
    }
    // Inače pročitaj tekst (može biti prazno)
    const text = await response.text();
    if (!text) return null;

    // Ako tekst izgleda kao JSON, probaj parsirati
    const trimmed = text.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return { message: trimmed };
      }
    }

    return { message: trimmed };
  } catch {
    return null;
  }
}

function api<T>(url: string, options: Options): Promise<T> {
  return fetch(url, { headers: authHeader(false), ...options }).then(async (response) => {
    if (!response.ok) {
      const errBody = await safeReadError(response);
      throw new Error(
        JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          body: errBody
        })
      );
    }

    if (options?.raw) return response as unknown as Promise<T>;

    // Za uspješne odgovore: neki endpointi mogu vratiti prazno tijelo
    const text = await response.text();
    if (!text) return null as unknown as T;

    try {
      return JSON.parse(text) as T;
    } catch {
      // Ako ipak nije JSON, vrati kao string (ovisno što očekujete)
      return text as unknown as T;
    }
  });
}

function get<T>(url, options?: Options) {
  return api<T>(apiUrl + url, options);
}

function post<T>(url, data, options?: Options, isNotJson?: boolean) {
  return api<T>(apiUrl + url, {
    ...options,
    method: 'POST',
    body: isNotJson ? data : JSON.stringify(data)
  });
}

function patch<T>(url, data, options?: Options) {
  return api<T>(apiUrl + url, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}

function deletes<T>(url, options?: Options) {
  return api<T>(apiUrl + url, { ...options, method: 'DELETE' });
}

export function authHeader(publicRoute: boolean): HeadersInit {
  let accessToken = localStorage.getItem('accessToken');

  if (!publicRoute && accessToken) {
    return {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
  } else {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
  }
}

export default { get, patch, post, deletes };
