export interface IDateProvider {
    getCurrentDate(): Date;
    
    getCurrentDateAsString(): string;
    getCurrentDateOnlyAsString(): string;

    format(input: Date, format: string): string;
}