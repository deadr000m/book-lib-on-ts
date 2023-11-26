import { v4 as uuidv4 } from 'uuid';
import { IBookAPI } from '../models/IBooksAPI';

export function createBookWithID(book: IBookAPI, source: string) {
  return { ...book, isFaforite: false, id: uuidv4(), source: source };
}
