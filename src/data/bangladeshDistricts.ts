export interface DistrictInfo {
  name: string;
  division: string;
  deliveryFee: number;
  deliveryDays: string;
}

export const BANGLADESH_DISTRICTS: DistrictInfo[] = [
  // Dhaka Division
  { name: 'Dhaka', division: 'Dhaka', deliveryFee: 60, deliveryDays: '24 - 48 Hours' },
  { name: 'Gazipur', division: 'Dhaka', deliveryFee: 80, deliveryDays: '1 - 2 Days' },
  { name: 'Narayanganj', division: 'Dhaka', deliveryFee: 80, deliveryDays: '1 - 2 Days' },
  { name: 'Tangail', division: 'Dhaka', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Narsingdi', division: 'Dhaka', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Manikganj', division: 'Dhaka', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Munshiganj', division: 'Dhaka', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Faridpur', division: 'Dhaka', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Gopalganj', division: 'Dhaka', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Madaripur', division: 'Dhaka', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Rajbari', division: 'Dhaka', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Shariatpur', division: 'Dhaka', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Kishoreganj', division: 'Dhaka', deliveryFee: 120, deliveryDays: '2 - 3 Days' },

  // Chattogram Division
  { name: 'Chattogram', division: 'Chattogram', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: "Cox's Bazar", division: 'Chattogram', deliveryFee: 120, deliveryDays: '2 - 4 Days' },
  { name: 'Cumilla', division: 'Chattogram', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Feni', division: 'Chattogram', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Noakhali', division: 'Chattogram', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Brahmanbaria', division: 'Chattogram', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Chandpur', division: 'Chattogram', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Lakshmipur', division: 'Chattogram', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Bandarban', division: 'Chattogram', deliveryFee: 140, deliveryDays: '3 - 5 Days' },
  { name: 'Rangamati', division: 'Chattogram', deliveryFee: 140, deliveryDays: '3 - 5 Days' },
  { name: 'Khagrachhari', division: 'Chattogram', deliveryFee: 140, deliveryDays: '3 - 5 Days' },

  // Sylhet Division
  { name: 'Sylhet', division: 'Sylhet', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Moulvibazar', division: 'Sylhet', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Habiganj', division: 'Sylhet', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Sunamganj', division: 'Sylhet', deliveryFee: 120, deliveryDays: '3 - 4 Days' },

  // Rajshahi Division
  { name: 'Rajshahi', division: 'Rajshahi', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Bogura', division: 'Rajshahi', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Pabna', division: 'Rajshahi', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Sirajganj', division: 'Rajshahi', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Naogaon', division: 'Rajshahi', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Natore', division: 'Rajshahi', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Chapai Nawabganj', division: 'Rajshahi', deliveryFee: 120, deliveryDays: '2 - 4 Days' },
  { name: 'Joypurhat', division: 'Rajshahi', deliveryFee: 120, deliveryDays: '2 - 4 Days' },

  // Khulna Division
  { name: 'Khulna', division: 'Khulna', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Jashore', division: 'Khulna', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Kushtia', division: 'Khulna', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Satkhira', division: 'Khulna', deliveryFee: 120, deliveryDays: '2 - 4 Days' },
  { name: 'Bagerhat', division: 'Khulna', deliveryFee: 120, deliveryDays: '2 - 4 Days' },
  { name: 'Jhenaidah', division: 'Khulna', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Chuadanga', division: 'Khulna', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Magura', division: 'Khulna', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Narail', division: 'Khulna', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Meherpur', division: 'Khulna', deliveryFee: 120, deliveryDays: '2 - 4 Days' },

  // Barishal Division
  { name: 'Barishal', division: 'Barishal', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Bhola', division: 'Barishal', deliveryFee: 130, deliveryDays: '3 - 4 Days' },
  { name: 'Patuakhali', division: 'Barishal', deliveryFee: 130, deliveryDays: '3 - 4 Days' },
  { name: 'Pirojpur', division: 'Barishal', deliveryFee: 120, deliveryDays: '2 - 4 Days' },
  { name: 'Jhalokati', division: 'Barishal', deliveryFee: 120, deliveryDays: '2 - 4 Days' },
  { name: 'Barguna', division: 'Barishal', deliveryFee: 130, deliveryDays: '3 - 4 Days' },

  // Rangpur Division
  { name: 'Rangpur', division: 'Rangpur', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Dinajpur', division: 'Rangpur', deliveryFee: 120, deliveryDays: '2 - 4 Days' },
  { name: 'Gaibandha', division: 'Rangpur', deliveryFee: 120, deliveryDays: '2 - 4 Days' },
  { name: 'Kurigram', division: 'Rangpur', deliveryFee: 130, deliveryDays: '3 - 4 Days' },
  { name: 'Lalmonirhat', division: 'Rangpur', deliveryFee: 130, deliveryDays: '3 - 4 Days' },
  { name: 'Nilphamari', division: 'Rangpur', deliveryFee: 120, deliveryDays: '2 - 4 Days' },
  { name: 'Panchagarh', division: 'Rangpur', deliveryFee: 130, deliveryDays: '3 - 5 Days' },
  { name: 'Thakurgaon', division: 'Rangpur', deliveryFee: 130, deliveryDays: '3 - 5 Days' },

  // Mymensingh Division
  { name: 'Mymensingh', division: 'Mymensingh', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Jamalpur', division: 'Mymensingh', deliveryFee: 120, deliveryDays: '2 - 3 Days' },
  { name: 'Netrokona', division: 'Mymensingh', deliveryFee: 120, deliveryDays: '2 - 4 Days' },
  { name: 'Sherpur', division: 'Mymensingh', deliveryFee: 120, deliveryDays: '2 - 4 Days' }
];

export function getDeliveryFee(districtName: string, subtotal: number): number {
  if (subtotal >= 5000) return 0; // Free delivery over ৳5000 in Bangladesh
  const match = BANGLADESH_DISTRICTS.find(d => d.name.toLowerCase() === districtName.toLowerCase());
  return match ? match.deliveryFee : 120;
}
