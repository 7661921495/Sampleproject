export interface ApiResponse<T> {
    approved_data: any;
    filter(arg0: (item: any) => boolean): any;
    // pageNumber: number;
    // pageSize: number;
    // succeeded: boolean;
    // message: null;
    response: number;
    data: T[];
}