interface Key {
  key: string;
  value: any;
  expiredAfter: Date | null;
}

class KeyStore {

  private keys: Map<string, Key>;

  constructor() {

    this.keys = new Map<string, Key>();

  }

  get length(): number {

    return this.getLength();

  }

  private getLength(): number {

    return this.keys.size;

  }

  public saveKey(key: string, value: any, expiredAfter?: Date | number): boolean {

    if(this.keys.has(key)) return false;

    if(typeof expiredAfter === 'number') {
      const now: number = new Date().getTime();
      const expiredTime: number = now + ( expiredAfter * 60000 );
      expiredAfter = new Date(expiredTime);
    }

    if(expiredAfter instanceof Date) {
      if(expiredAfter.getTime() < new Date().getTime()) return false;
    }

    this.keys.set(key, {
      key: key,
      value: value,
      expiredAfter: expiredAfter || null
    });

    return true;

  }

}

export { KeyStore };
