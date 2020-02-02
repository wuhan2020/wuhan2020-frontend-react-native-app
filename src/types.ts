type CreatorType = {
  username: string;
  emailVerified: boolean;
  mobilePhoneNumber: string;
  mobilePhoneVerified: boolean;
  objectId: string;
  createdAt: string;
  updatedAt: string;
};

type ContectType = {
  phone: string;
  name: string;
};
type CoordsType = {
  latitude: number;
  longitude: number;
};

type SupplyType = {
  name: string;
  type: string;
  remark: string;
  count: string;
};

type HospitalType = {
  objectId: string;
  hospital: string;
  address: string;
  remark: string;
  creator: CreatorType;
  contacts: ContectType[];
  coords: CoordsType;
  city: string;
  url: string;
  province: string;
  district: string;
  createdAt: string;
  updatedAt: string;
  supplies: SupplyType[];
};
