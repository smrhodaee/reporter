export class Property {
    title: string
    value: string
    type: string
    constructor(title: string, value: string, type: string) {
        this.title = title
        this.value = value
        this.type = type
    }
}

export class Log {
    id?: string
    created_at?: Date
    title: string
    category: string
    props: Array<Property>

    constructor(title: string, category: string, props: Array<Property>) {
        this.title = title;
        this.category = category;
        this.props = props
    }
}

export interface APIResponse<T> {
    error: string
    data?: T
}

export interface LogResponse {
    logs: Array<Log>
    count: number
}