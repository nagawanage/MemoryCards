import datetime
from enum import Enum

from fastapi import Query

from app import schemas
from app.schemas.core import BaseSchema, PagingMeta


class WordGroupBase(BaseSchema):
    user_id: str
    name: str


class WordGroupResponse(WordGroupBase):
    id: str
    # tags: list[TagResponse] | None
    created_at: datetime.datetime | None
    updated_at: datetime.datetime | None
    # deleted_at: Optional[datetime.datetime]

    class Config:
        orm_mode = True


class WordGroupCreate(WordGroupBase):
    # id: str
    # name: str
    pass


class WordGroupUpdate(WordGroupBase):
    pass


class WordGroupsPagedResponse(BaseSchema):
    data: list[WordGroupResponse] | None
    meta: PagingMeta | None


class WordGroupSortFieldEnum(Enum):
    created_at = "created_at"
    name = "name"


class WordGroupSortQueryIn(schemas.SortQueryIn):
    sort_field: WordGroupSortFieldEnum | None = Query(WordGroupSortFieldEnum.created_at)
