export interface Package {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[];
  date: string;
  links: {
    npm: string;
    homepage?: string;
    repository?: string;
  };
  publisher: {
    username: string;
    email: string;
  };
  maintainers: {
    username: string;
    email: string;
  }[];
}

export interface Flags {
  insercure: number;
}

export interface Score {
  final: number;
  detail: {
    quality: number;
    popularity: number;
    maintenance: number;
  };
}

export interface SearchData {
  package: Package;
  flags: Flags;
  score: Score;
  searchScore: number;
}
