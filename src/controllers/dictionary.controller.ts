import { Request, Response } from 'express';
import { LwwElementDictionary } from '../services/LwwElementDictionary';

const dictionary = new LwwElementDictionary();

/**
 * @description Lookup a value by key
 * @param key string - The key to look up 
 * @returns {Object} - The value associated with the key
 */
export const lookup = (req: Request, res: Response) => {
  const { key } = req.params;

  const value = dictionary.lookup(key);

  if (!value) {
    res.status(404).json({ message: 'Key not found' });
  } else {
    res.json({ key, value });
  }
};

/**
 * @description Add a new key-value pair to the dictionary
 * @param key string - The key to add
 * @param value string - The value to add
 * @returns {Object} - The added key-value pair
 */
export const add = (req: Request, res: Response) => {
  const { key, value } = req.body;

  dictionary.add(key, value);

  res.status(201).json({ message: 'Added successfully', key, value });
};

/**
 * @description Remove a key-value pair from the dictionary
 * @param key string - The key to remove
 * @returns {Object} - Confirmation of removal
 */
export const remove = (req: Request, res: Response) => {
  const { key } = req.params;

  dictionary.remove(key);

  res.json({ message: 'Removed successfully', key });
};

/**
 * @description Update a value by key
 * @param key string - The key to update
 * @param value string - The new value
 * @returns {Object} - The updated key-value pair
 */
export const update = (req: Request, res: Response) => {
  const { key, value } = req.body;

  dictionary.update(key, value);

  res.json({ message: 'Updated successfully', key, value });
};

/**
 * @description Merge another dictionary into this one
 * @param otherDict LwwElementDictionary - The other dictionary to merge
 * @returns {Object} - Confirmation of merge
 */
export const merge = (req: Request, res: Response) => {
  const otherDict: { key: string, value: string }[] = req.body.dictionary; // Expecting a serialized dictionary
  const other = new LwwElementDictionary();

  otherDict.forEach(({ key, value }) => {
    other.add(key, value);
  });

  dictionary.merge(other);

  res.json({ message: 'Merged successfully' });
};

/**
 * @description Get all key-value pairs in the dictionary
 * @returns {Object} - All key-value pairs
 */
export const getAll = (req: Request, res: Response) => {
  const allEntries = dictionary.getAll();

  res.json(allEntries);
}