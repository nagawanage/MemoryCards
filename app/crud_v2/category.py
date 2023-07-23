
from sqlalchemy import or_
from sqlalchemy.dialects.mysql import insert
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session, contains_eager
from sqlalchemy.sql import select

from app import crud_v2, models, schemas

from .base import CRUDV2Base


class CRUDCategory(
    CRUDV2Base[
        models.Category,
        schemas.CategoryResponse,
        schemas.CategoryCreate,
        schemas.CategoryUpdate,
        schemas.CategoriesPagedResponse,
    ],
):
    async def get_paged_list(  # type: ignore[override]
        self,
        db: AsyncSession,
        paging_query_in: schemas.PagingQueryIn,
        q: str | None = None,
        sort_query_in: schemas.SortQueryIn | None = None,
        include_deleted: bool = False,
    ) -> schemas.CategoriesPagedResponse:
        where_clause = (
            [
                or_(
                    # ilike: 大文字小文字を区別しないlike
                    models.Category.name.ilike(f"%{q}%"),
                    # models.Category.meaning.ilike(f"%{q}%"),
                ),
            ]
            if q
            else []
        )
        return await super().get_paged_list(
            db,
            paging_query_in=paging_query_in,
            where_clause=where_clause,
            sort_query_in=sort_query_in,
            include_deleted=include_deleted,
        )


category = CRUDCategory(
    models.Category,
    response_schema_class=schemas.CategoryResponse,
    list_response_class=schemas.CategoriesPagedResponse,
)
