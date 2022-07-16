import { Engine } from "../../engine/engine.ts";
import { fr_paths } from "../../engine/engineSettings/fr.engineSettings.ts";

type StoreCollection = {
  fr: {
    words: string[];
  };
};

export enum StoreCollectionType {
  words = "words",
}

export enum Language {
  FR = "fr",
}

export class Store {
  private store: StoreCollection = { fr: { words: [] } };

  constructor(engine: Engine) {
    // Registering every collections
    this.store.fr.words = engine.generateOneWordPuns(fr_paths.fr_words_txt);

    // Shuffling collections
    this.shuffleCollection(this.store.fr.words);
  }

  public getOne(
    language: Language,
    collectionType: StoreCollectionType,
  ): string {
    const collection = this.store[language][collectionType];
    return collection[collection.length * Math.random() | 0];
  }

  private shuffleCollection(collection: string[]): void {
    collection.sort(() => Math.random() - 0.5);
  }
}
