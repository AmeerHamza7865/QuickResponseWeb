export interface User {
  id: number;
  userName: string;
  email: string;
  fullName?: string;
}

export interface City {
  id: number;
  name: string;
}

export interface Booking {
  id?: number;
  customerId?: number;
  customer?: any;
  serviceId: number;
  customerName: string;
  phoneNo: string;
  scheduledDate: string;
  address: string;
  cityId: number;
  status: string; // Pending, Confirmed, Completed, Cancelled
  service?: any;
}
