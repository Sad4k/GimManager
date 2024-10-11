import { toast } from 'react-toastify';

class ErrorHandler {
  handleError(error: Error) {
    console.error('An error occurred:', error);
    toast.error('An unexpected error occurred. Please try again later.');
  }

  handleAPIError(error: Error) {
    console.error('API error:', error);
    toast.error('There was a problem communicating with the server. Please try again later.');
  }

  handleValidationError(message: string) {
    toast.warning(message);
  }
}

export const errorHandler = new ErrorHandler();