import { Response } from 'express';

export class ErrorHandler {
  static handleError(res: Response, error: unknown): Response {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }

  static handleNotFound(res: Response, message: string): Response {
    return res.status(404).json({ error: message });
  }

  static handleBadRequest(res: Response, message: string): Response {
    return res.status(400).json({ error: message });
  }
}
