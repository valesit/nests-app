// Database types for NESTS

export type UserRole = 'client' | 'vendor';
export type VerificationStatus = 'pending' | 'approved' | 'rejected';
export type ProjectStatus = 'seeking_quotes' | 'in_progress' | 'completed' | 'cancelled';
export type QuoteStatus = 'pending' | 'submitted' | 'accepted' | 'rejected';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClientProfile {
  id: string;
  user_id: string;
  current_residence: string | null;
  target_city: string | null;
  created_at: string;
  updated_at: string;
}

export interface VendorProfile {
  id: string;
  user_id: string;
  business_name: string;
  bio: string | null;
  service_areas: string[];
  verification_status: VerificationStatus;
  created_at: string;
  updated_at: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  icon_url: string | null;
  created_at: string;
}

export interface VendorCategory {
  vendor_id: string;
  category_id: string;
}

export interface Portfolio {
  id: string;
  vendor_id: string;
  project_name: string;
  description: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

export interface PortfolioImage {
  id: string;
  portfolio_id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
  created_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  vendor_id: string | null;
  project_name: string;
  location: string | null;
  description: string | null;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface QuoteLineItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Quote {
  id: string;
  project_id: string;
  vendor_id: string;
  line_items: QuoteLineItem[];
  total_amount: number | null;
  timeline_days: number | null;
  notes: string | null;
  status: QuoteStatus;
  created_at: string;
  updated_at: string;
}

// Extended types with relations
export interface VendorProfileWithDetails extends VendorProfile {
  profiles?: Profile;
  vendor_categories?: (VendorCategory & { service_categories?: ServiceCategory })[];
  portfolios?: (Portfolio & { portfolio_images?: PortfolioImage[] })[];
}

export interface ProjectWithDetails extends Project {
  client_profiles?: ClientProfile & { profiles?: Profile };
  vendor_profiles?: VendorProfile & { profiles?: Profile };
  quotes?: (Quote & { vendor_profiles?: VendorProfile & { profiles?: Profile } })[];
}

export interface QuoteWithDetails extends Quote {
  projects?: Project;
  vendor_profiles?: VendorProfile & { profiles?: Profile };
}

// Database schema type for Supabase
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      client_profiles: {
        Row: ClientProfile;
        Insert: Omit<ClientProfile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ClientProfile, 'id' | 'created_at'>>;
      };
      vendor_profiles: {
        Row: VendorProfile;
        Insert: Omit<VendorProfile, 'id' | 'created_at' | 'updated_at' | 'verification_status'>;
        Update: Partial<Omit<VendorProfile, 'id' | 'created_at'>>;
      };
      service_categories: {
        Row: ServiceCategory;
        Insert: Omit<ServiceCategory, 'id' | 'created_at'>;
        Update: Partial<Omit<ServiceCategory, 'id' | 'created_at'>>;
      };
      vendor_categories: {
        Row: VendorCategory;
        Insert: VendorCategory;
        Update: Partial<VendorCategory>;
      };
      portfolios: {
        Row: Portfolio;
        Insert: Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Portfolio, 'id' | 'created_at'>>;
      };
      portfolio_images: {
        Row: PortfolioImage;
        Insert: Omit<PortfolioImage, 'id' | 'created_at'>;
        Update: Partial<Omit<PortfolioImage, 'id' | 'created_at'>>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'status'>;
        Update: Partial<Omit<Project, 'id' | 'created_at'>>;
      };
      quotes: {
        Row: Quote;
        Insert: Omit<Quote, 'id' | 'created_at' | 'updated_at' | 'status'>;
        Update: Partial<Omit<Quote, 'id' | 'created_at'>>;
      };
    };
  };
}
