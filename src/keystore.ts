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

    this.refreshExpired();
    return this.keys.size;

  }

  public saveKey(key: string, value: any, expiredAfter?: Date | number): boolean {

    this.refreshExpired();
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

  public get(key: string): Key | null {

    this.refreshExpired();
    return this.keys.get(key) || null;

  }

  private refreshExpired(): void {

    const now: number = new Date().getTime();

    const entries = this.keys.values();
    for(let entry of entries) {
      if(!entry || !entry.expiredAfter) continue;
      if(entry.expiredAfter.getTime() < now) {
        this.keys.delete(entry.key);
      }
    }

  }

}

export { KeyStore };
