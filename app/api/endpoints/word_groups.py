
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


@router.get("/{id}", operation_id="get_word_group_by_id")
async def get_word_group(
    id: str, include_deleted: bool = False, db: AsyncSession = Depends(get_async_db),
) -> schemas.WordGroupResponse:
    word_group = await crud_v2.word_group.get_db_obj_by_id(
        db, id=id, include_deleted=include_deleted,
    )
    print(word_group)
    if not word_group:
        raise APIException(ErrorMessage.ID_NOT_FOUND)
    return word_group


@router.get("", operation_id="get_paged_word_groups")
async def get_paged_word_groups(
    q: str | None = None,
    paging_query_in: PagingQueryIn = Depends(),
    # sort_query_in: schemas.WordGroupSortQueryIn = Depends(),
    include_deleted: bool = False,
    db: AsyncSession = Depends(get_async_db),
) -> schemas.WordGroupsPagedResponse:
    return await crud_v2.word_group.get_paged_list(
        db,
        q=q,
        paging_query_in=paging_query_in,
        # sort_query_in=sort_query_in,
        include_deleted=include_deleted,
    )


@router.post("", operation_id="create_word_group")
async def create_word_group(
    data_in: schemas.WordGroupCreate, db: AsyncSession = Depends(get_async_db),
) -> schemas.WordGroupResponse:
    return await crud_v2.word_group.create(db, data_in)


@router.patch("/{id}", operation_id="update_word_group")
async def update_word_group(
    id: str,
    data_in: schemas.WordGroupUpdate,
    db: AsyncSession = Depends(get_async_db),
) -> schemas.WordGroupResponse:
    word_group = await crud_v2.word_group.get_db_obj_by_id(db, id=id)
    if not word_group:
        raise APIException(ErrorMessage.ID_NOT_FOUND)

    return await crud_v2.word_group.update(db, db_obj=word_group, update_schema=data_in)


@router.delete(
    "/{id}", status_code=status.HTTP_204_NO_CONTENT, operation_id="delete_word_group",
)
async def delete_word_group(
    id: str,
    db: AsyncSession = Depends(get_async_db),
) -> None:
    word_group = await crud_v2.word_group.get_db_obj_by_id(db, id=id)
    if not word_group:
        raise APIException(ErrorMessage.ID_NOT_FOUND)
    await crud_v2.word_group.delete(db, db_obj=word_group)
