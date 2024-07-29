import { Mds } from 'mds.persian.datetime'
import PersianDateTime = Mds.PersianDateTime;

export class DateTime {
    day: number
    month: number
    year: number
    second: number
    minute: number
    hour: number

    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number) {
        this.year = year
        this.month = month
        this.day = day
        this.hour = hour
        this.minute = minute
        this.second = second
    }

    toPersianDate(): PersianDateTime {
        const days = PersianDateTime.fromPersianDate(this.year, this.month, 1).getMonthDays
        if (this.day > days) {
            this.day = days
        }
        return PersianDateTime.fromPersianDateTime(
            this.year,
            this.month,
            this.day,
            this.hour,
            this.minute,
            this.second,
            0
        )
    }

    static from(date: PersianDateTime): DateTime {
        return new DateTime(date.year, date.month, date.day, date.hour, date.minute, date.second)
    }

    static parse(value: string): DateTime {
        try {
            return this.from(PersianDateTime.parse(value))
        } catch {
            return this.from(PersianDateTime.now)
        }
    }

    toString(): string {
        return `${this.year}/${this.month}/${this.day}`
    }
}
