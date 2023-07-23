
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app import crud_v2, schemas
from app.core.database import get_async_db
from app.core.logger import get_logger
from app.exceptions.core import APIException
from app.exceptions.error_messages import ErrorMessage
from app.schemas.core import PagingQueryIn

logger = get_logger(__name__)

router = APIRouter()


@router.get("/{id}", operation_id="get_category_by_id")
async def get_category(
    id: str, include_deleted: bool = False, db: AsyncSession = Depends(get_async_db),
) -> schemas.CategoryResponse:
    """GET /categories/{id}"""
    category = await crud_v2.category.get_db_obj_by_id(
        db, id=id, include_deleted=include_deleted,
    )
    print(f"{category=}")
    if not category:
        raise APIException(ErrorMessage.ID_NOT_FOUND)

    return category


@router.get("", operation_id="get_paged_categories")
async def get_paged_categories(
    q: str | None = None,
    paging_query_in: PagingQueryIn = Depends(),
    # sort_query_in: schemas.CategorySortQueryIn = Depends(),
    include_deleted: bool = False,
    db: AsyncSession = Depends(get_async_db),
) -> schemas.CategoriesPagedResponse:
    """GET /categories?page=1&perPage=30"""
    return await crud_v2.category.get_paged_list(
        db,
        q=q,
        paging_query_in=paging_query_in,
        # sort_query_in=sort_query_in,
        include_deleted=include_deleted,
    )


@router.post("", operation_id="create_category")
async def create_category(
    data_in: schemas.CategoryCreate, db: AsyncSession = Depends(get_async_db),
) -> schemas.CategoryResponse:
    return await crud_v2.category.create(db, data_in)


@router.patch("/{id}", operation_id="update_category")
async def update_category(
    id: str,
    data_in: schemas.CategoryUpdate,
    db: AsyncSession = Depends(get_async_db),
) -> schemas.CategoryResponse:
    """PATCH /categories/{id}"""
    category = await crud_v2.category.get_db_obj_by_id(db, id=id)
    if not category:
        raise APIException(ErrorMessage.ID_NOT_FOUND)

    return await crud_v2.category.update(db, db_obj=category, update_schema=data_in)


@router.delete(
    "/{id}", status_code=status.HTTP_204_NO_CONTENT, operation_id="delete_category",
)
async def delete_category(
    id: str,
    db: AsyncSession = Depends(get_async_db),
) -> None:
    category = await crud_v2.category.get_db_obj_by_id(db, id=id)
    if not category:
        raise APIException(ErrorMessage.ID_NOT_FOUND)
    # await crud_v2.category.delete(db, db_obj=category)
    await crud_v2.category.real_delete(db, db_obj=category)
