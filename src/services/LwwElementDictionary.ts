import { Item } from "../models/item.model";

/**
 * @description LWW (Last-Writer-Wins) Element Dictionary
 * This class implements a Last-Writer-Wins (LWW) element dictionary.
 * It allows adding, removing, and updating key-value pairs,
 * while ensuring that the most recent value is always retained.
 * It also handles tombstones for deleted keys.
 * @example
 * const dict = new LwwElementDictionary();
 * dict.add('key1', 'value1');
 * dict.add('key2', 'value2');
 * dict.remove('key1');
 * dict.update('key2', 'newValue');
 * const value = dict.lookup('key2');
 * const mergedDict = dict.merge(otherDict);
 */
export class LwwElementDictionary {
  private store: Map<string, Item>;
  private tombstones: Set<string>;

  constructor() {
    this.store = new Map();
    this.tombstones = new Set();
  }

  /**
   * @description Looks up a key in the dictionary.
   * @param key - The key to look up
   * @returns Item | undefined
   */
  public lookup(key: string): Item | undefined {
    if (this.tombstones.has(key)) {
      return undefined;
    }
    return this.store.get(key);
  }

  /**
   * @description Adds a key-value pair to the dictionary.
   * If the key already exists, it updates the value and timestamp.
   * If the key is marked as deleted (tombstone), it will be restored.
   * @param key string - The key to add
   * @param value string - The value to add
   * @returns LwwElementDictionary - The updated dictionary
   * @example add('key1', 'value1');
   */
  public add(key: string, value: string): LwwElementDictionary {
    const timestamp = Date.now();
    const item: Item = { value, timestamp };

    if (this.tombstones.has(key)) {
      this.tombstones.delete(key);
    }

    this.store.set(key, item);

    return this;
  }

  /**
   * @description Removes a key from the dictionary.
   * @param key string - The key to remove
   * @returns LwwElementDictionary - The updated dictionary
   * @example remove('key1');
   */
  public remove(key: string): LwwElementDictionary {
    if (this.store.has(key)) {
      this.tombstones.add(key);
      this.store.delete(key);
    }

    return this;
  }

  /**
   * @description Updates a key-value pair in the dictionary.
   * If the key is marked as deleted (tombstone), it will be restored.
   * @param key string - The key to update
   * @param value string - The new value
   * @returns LwwElementDictionary - The updated dictionary
   * @example update('key1', 'newValue');
   */
  public update(key: string, value: string): LwwElementDictionary {
    const timestamp = Date.now();
    const item: Item = { value, timestamp };

    if (this.tombstones.has(key)) {
      this.tombstones.delete(key);
    }

    this.store.set(key, item);

    return this;
  }

  /**
   * @description Merges another LwwElementDictionary into this one.
   * @param other LwwElementDictionary - The dictionary to merge
   * @returns LwwElementDictionary - The merged dictionary
   * @example merge(otherDictionary);
   */
  public merge(other: LwwElementDictionary): LwwElementDictionary {
    other.store.forEach((value, key) => {
      if (!this.tombstones.has(key)) {
        const current = this.store.get(key);
        if (!current || value.timestamp > current.timestamp) {
          this.store.set(key, value);
        }
      }
    });
    this.tombstones = new Set([...this.tombstones, ...other.tombstones]);

    return this;
  }

  /**
   * @description Returns the internal state of the dictionary as objects of key value pairs.
   * @returns { store: { [key: string]: string; timestamp: number }[]; tombstones: { [key: string]: string }[]; }
   * @example getAll();
   */
  public getAll(): { store: { [key: string]: string | number; }[]; tombstones: string[]; } {
    return {
      store: Array.from(this.store.entries()).map(([key, item]) => ({ [key]: item.value, timestamp: item.timestamp })),
      tombstones: Array.from(this.tombstones).map((key) => key),
    };
  }
}
