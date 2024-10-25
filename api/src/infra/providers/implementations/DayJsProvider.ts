import dayjs from 'dayjs'
import { IDateProvider } from "../IDateProvider";

export class DayJsProvider implements IDateProvider {
    
    getCurrentDate(): Date {
        return dayjs(new Date()).toDate()
    }

    getCurrentDateAsString(): string {
        return dayjs().format('YYYY-MM-DDTHH:mm:ss')
    }

    getCurrentDateOnlyAsString(): string {
        return dayjs().format('YYYY-MM-DD')
    }

    format(input: Date, format: string): string {
        return dayjs(input).format(format)
    }
    
}