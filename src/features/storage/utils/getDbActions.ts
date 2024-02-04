import type { IDBPDatabase } from "idb";

export const getDbActions = <TKey extends IDBValidKey, TValue>(
  dbPromise: Promise<IDBPDatabase<unknown>>,
  storeName: string
) => ({
  async get(key: TKey) {
    return (await dbPromise).get(storeName, key) as Promise<TValue>;
  },
  async getAll() {
    const keys = await this.keys();

    console.log(keys);

    return await Promise.all(keys.map(this.get));
  },
  async set(key: TKey, value: TValue) {
    return this.get(
      (await (await dbPromise).put(storeName, value, key)) as TKey
    );
  },
  async remove(key: TKey) {
    console.log(this);

    const affectedItem = await this.get(key);

    (await dbPromise).delete(storeName, key);

    return affectedItem;
  },
  async clear() {
    return (await dbPromise).clear(storeName);
  },
  async keys() {
    return (await dbPromise).getAllKeys(storeName) as Promise<TKey[]>;
  },
});
