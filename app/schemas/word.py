import datetime
from enum import Enum

from fastapi import Query

from app import schemas
from app.schemas.core import BaseSchema, PagingMeta
from app.schemas.tag import TagResponse


class WordBase(BaseSchema):
    user_id: str
    category_id: list | None = None
    group_id: list
    word: str
    meaning: str
    hint: str | None = None
    note: dict | None = None
    check1_updated_at: datetime.datetime | None
    check2_updated_at: datetime.datetime | None
    check3_updated_at: datetime.datetime | None


class WordResponse(WordBase):
    id: str
    # tags: list[TagResponse] | None
    created_at: datetime.datetime | None
    updated_at: datetime.datetime | None
    # deleted_at: Optional[datetime.datetime]

    class Config:
        orm_mode = True


class WordCreate(WordBase):
    word: str


class WordUpdate(WordBase):
    pass


class WordsPagedResponse(BaseSchema):
    data: list[WordResponse] | None
    meta: PagingMeta | None


class WordSortFieldEnum(Enum):
    created_at = "created_at"
    word = "word"


class WordSortQueryIn(schemas.SortQueryIn):
    sort_field: WordSortFieldEnum | None = Query(WordSortFieldEnum.created_at)
