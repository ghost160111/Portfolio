export interface TreeObjectPoint {
  id: string;
  image_url: string[];
  height: number;
  width: number;
  diameter: number;
  address: string;
  coords: string;
  date_update: string;
  color: string;
  ru: {
    name: string;
    type: string;
    volunteer: string;
    holder: string;
  },
  oz: {
    name: string;
    type: string;
    volunteer: string;
    holder: string;
  },
  uz: {
    name: string;
    type: string;
    volunteer: string;
    holder: string;
  },
}

export interface TreeList {
  total_count: number;
  last_added: number;
  updated: string;
  trees: TreeObjectPoint[];
}

export interface Volunteer {
  id: number;
  ru: {
    name: string;
  };
  oz: {
    name: string;
  };
  uz: {
    name: string;
  }
  photo: string;
  count: number;
  rating: number;
  date_active: string;
  status: boolean;
  link: string;
}
