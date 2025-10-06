const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

export class FastAPIClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = FASTAPI_URL;
  }

  async getFiscalInfo(userId: string, token?: string) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}/api/fiscal/${userId}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch fiscal info');
    }

    return response.json();
  }

  async processDocument(file: File, userId: string, token?: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId);

    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}/api/documents/process`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to process document');
    }

    return response.json();
  }
}

export const fastAPIClient = new FastAPIClient();
