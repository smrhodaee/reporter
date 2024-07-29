from prisma import Prisma
from prisma.models import Log
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException, Request
from typing import Any, List
import uvicorn
from pydantic import BaseModel
from contextlib import asynccontextmanager

prisma = Prisma(auto_register=True)


class ListLogResponse(BaseModel):
    logs: List[Log]
    count: int


class GlobalResponse(BaseModel):
    message: str | None = None
    data: Any = None


class PropertyRequest(BaseModel):
    title: str
    value: Any
    type: str

    def json(self):
        return {"title": self.title, "value": str(self.value), "type": self.type}


class LogRequest(BaseModel):
    id: str | None = None
    title: str
    category: str
    props: List[PropertyRequest]

    def data(self) -> Log:
        return {
            "title": self.title,
            "category": self.category,
            "props": {"create": [prop.json() for prop in self.props]},
        }


@asynccontextmanager
async def lifespan(app: FastAPI):
    await prisma.connect()
    yield
    if prisma.is_connected():
        await prisma.disconnect()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(HTTPException)
async def http_exception_handler(req: Request, exc: HTTPException):
    return GlobalResponse(message=exc.detail)


@app.get("/logs")
async def list_logs(
    take: int = 10, skip: int = 0, title="", category="", prop_title="", prop_value=""
) -> GlobalResponse:
    where = {
        "OR": [
            {
                "title": {"contains": title},
            },
            {
                "category": {"contains": category},
            },
            {
                "props": {
                    "some": {
                        "title": {
                            "contains": prop_title,
                        }
                    }
                }
            },
            {
                "props": {
                    "some": {
                        "value": {
                            "contains": prop_value,
                        }
                    }
                }
            },
        ]
    }
    logs = await Log.prisma().find_many(
        take=take,
        skip=skip,
        where=where,
        include={
            "props": True,
        },
        order={
            "created_at": "asc",
        },
    )
    count = await Log.prisma().count(where=where)
    return GlobalResponse(data=ListLogResponse(logs=logs, count=count))


@app.post("/logs")
async def create_log(log: LogRequest) -> GlobalResponse:
    return GlobalResponse(
        data=await Log.prisma().create(
            log.data(),
            include={
                "props": True,
            },
        ),
    )


@app.put("/logs")
async def update_log(log: LogRequest) -> GlobalResponse:
    created_at = (
        await Log.prisma().delete(
            where={
                "id": log.id,
            }
        )
    ).created_at
    return GlobalResponse(
        data=await Log.prisma().create(
            data={**log.data(), "created_at": created_at},
            include={
                "props": True,
            },
        )
    )


@app.delete("/logs/{log_id}")
async def delete_log(log_id: str) -> GlobalResponse:
    return GlobalResponse(
        data=await Log.prisma().delete(
            where={"id": log_id},
            include={
                "props": True,
            },
        ),
    )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port="8888")
