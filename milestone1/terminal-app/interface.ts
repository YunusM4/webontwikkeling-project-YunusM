export interface Team {
    id: number;
    name: string;
    country: string;
    isActive: boolean;
    imageUrl: string;
    drivers?: string[]; 
}

export type DriverStatus = "Active" | "Reserve" | "Retired";

export interface Driver {
    id: number;
    name: string;           
    description: string;    
    driverNumber: number;   
    isActive: boolean;      
    birthDate: string;      
    imageUrl: string;       
    status: DriverStatus;   
    skills: string[];       
    team: Team;             
}