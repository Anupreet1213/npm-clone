export interface DetailPackage {
  _id: string;
  _rev: string;
  name: string;
  distTags: {
    latest: string;
    next: string;
    alpha: string;
    rc: string;
  };

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
  versions: Versions[];
  maintainers: Maintainer[];
  time: string[];
  readme?: string;
  readmeFilename?: string;
  homepage?: string;
  repository?: {
    type?: string;
    url: string;
  };
  bugs?: {
    url?: string;
  };
  license?: string;
}

export interface Versions {
  name: string;
  author: {
    name: string;
    email: string;
  };
  version: string;
  description?: string;
  license?: string;
  homepage?: string;
  repository?: {
    type?: string;
    url: string;
  };
  bugs?: {
    url?: string;
  };
  keywords?: string[];
  authors?: string[];
  main?: string;
  module?: string;
  types?: string;
  _id?: string;
}

export interface Maintainer {
  name: string;
  email: string;
}
