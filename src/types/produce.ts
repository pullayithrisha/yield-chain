export interface Transaction {
  timestamp: number;
  from: string | null;
  to: string;
  details: string;
}

export interface Produce {
  id: number;
  farmer: string;
  produceType: string;
  origin: string;
  quality: string;
  price: number;
  currentOwner: string;
  registeredTime: number;
  history: Transaction[];
}