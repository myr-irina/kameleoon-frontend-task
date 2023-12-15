enum Type {
  CLASSIC = 'CLASSIC',
  SERVER_SIDE = 'SERVER_SIDE',
  MVT = 'MVT',
}

enum Status {
  DRAFT = 'DRAFT',
  ONLINE = 'ONLINE',
  PAUSED = 'PAUSED',
  STOPPED = 'STOPPED',
}

export interface ISite {
  id: number;
  url: string;
}

export interface ITest {
  id: number;
  name: string;
  type: Type;
  status: Status;
  siteId: number;
}


