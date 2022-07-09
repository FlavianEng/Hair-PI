export class Store {
  private _fr_words: string[] = [];

  public get fr_words(): string[] {
    return this._fr_words;
  }

  public set fr_words(value: string[]) {
    this._fr_words = value;
  }

  // TASK Create a function to shuffle an array of words
  getOne(collection: string[]): string {
    // TASK Shuffle the collection
    const [first] = collection;
    return first;
  }
}
