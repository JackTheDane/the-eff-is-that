import { openDB } from "idb";
import { Quiz } from "./types";
import { getDbActions } from "../storage/utils/getDbActions";
import { QUIZ_STORE_NAME } from "./constants";
import { INDEXED_DB_NAME } from "../storage/constants";

const dbPromise = openDB(INDEXED_DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(QUIZ_STORE_NAME);
  },
});

export const quizStorage = getDbActions<Quiz["id"], Quiz>(
  dbPromise,
  QUIZ_STORE_NAME
);
