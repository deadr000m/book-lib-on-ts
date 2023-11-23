import { v4 as uuidv4 } from 'uuid';
import { IBook } from '../models/IBooks';

export function createBookWithID(book: any, source: any) {
  return { ...book, isFaforite: false, id: uuidv4(), source: source };
}
