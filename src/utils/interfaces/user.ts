export default interface User {
    id: number;
    email: string;
    name: string;
    last_name: string;
    phone?: string;
    country?: string;
    image?: string;
    org_id?: number;
    role_id: number;
    status?: boolean;
    verification_code?: string;
    verified?: boolean;
    password?: string;
}