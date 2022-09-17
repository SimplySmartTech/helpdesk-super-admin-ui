export interface Complaint {
    aasm_state: string;
    backend_worker_id: string;
    department_id: string;
    description: string;
    escalated: boolean;
    escalated_at: string;
    field_worker_id: string;
    number: number;
    of_type: string;
    origin: string;
    priority: string;
    unit_info: string;
    resident_name: string;
    department_name: string;
    state_action: string;
    registered_at: string;
    resolved_at: string;
    unit_name: string;
    ward?: any;
    location?: any;
    created_by_name?: any;
    id: string;
}

export interface StateCounts {
    unverified: number;
    open: number;
    assigned: number;
    inprogress: number;
    blocked: number;
    resolved: number;
    closed: number;
    rejected: number;
}

export interface Data {
    total: number;
    complaints: Complaint[];
    state_counts: StateCounts;
    complaint_types: string[];
}

export interface RootObject {
    data: Data;
}