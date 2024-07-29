import { APIResponse, Log as Log, LogResponse } from "./models";

const API_URL = "http://localhost:8888"

async function getResponse<T>(resp: Response): Promise<APIResponse<T>> {
    if (resp.status == 200) {
        const json = await resp.json()
        return {
            error: "",
            data: json["data"],
        }
    } else {
        return {
            error: await resp.text()
        }
    }
}

export async function listLogs(value: string, take: number, skip: number): Promise<APIResponse<LogResponse>> {
    return await getResponse(await fetch(`${API_URL}/logs?title=${value}&category=${value}&prop_title=${value}&prop_value=${value}&take=${take}&skip=${skip}`, {
        method: "get",
    }))
}

export async function createLog(log: Log): Promise<APIResponse<Log>> {
    return await getResponse(await fetch(`${API_URL}/logs`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(log)
    }))
}

export async function updateLog(log: Log): Promise<APIResponse<Log>> {
    return await getResponse(await fetch(`${API_URL}/logs`, {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(log)
    }))
}

export async function deleteLog(log: Log): Promise<APIResponse<Log>> {
    return await getResponse(await fetch(`${API_URL}/logs/${log.id}`, {
        method: "delete",
    }))
}