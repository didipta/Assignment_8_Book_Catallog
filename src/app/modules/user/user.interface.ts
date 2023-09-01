export type Iuser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  contactNo: string;
  address: string;
  profileImg: string;
  reviews: {
    syncId: string;
  };
  orders: {
    syncId: string;
  };
};
