import datetime
from enum import Enum

from fastapi import Query

from app import schemas
from app.schemas.core import BaseSchema, PagingMeta


class CategoryBase(BaseSchema):
    user_id: str
    name: str


class CategoryResponse(CategoryBase):
    id: str
    # tags: list[TagResponse] | None
    created_at: datetime.datetime | None
    updated_at: datetime.datetime | None
    # deleted_at: Optional[datetime.datetime]

    class Config:
        orm_mode = True


class CategoryCreate(CategoryBase):
    # id: str
    # name: str
    pass


class CategoryUpdate(CategoryBase):
    pass


class CategoriesPagedResponse(BaseSchema):
    data: list[CategoryResponse] | None
    meta: PagingMeta | None


class CategorySortFieldEnum(Enum):
    created_at = "created_at"
    name = "name"


class CategorySortQueryIn(schemas.SortQueryIn):
    sort_field: CategorySortFieldEnum | None = Query(CategorySortFieldEnum.created_at)
