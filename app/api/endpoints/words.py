
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


@router.get("/{id}", operation_id="get_word_by_id")
async def get_word(
    id: str, include_deleted: bool = False, db: AsyncSession = Depends(get_async_db),
) -> schemas.WordResponse:
    """GET /words/{id}"""
    word = await crud_v2.word.get_db_obj_by_id(
        db, id=id, include_deleted=include_deleted,
    )
    print(f"{word=}")
    if not word:
        raise APIException(ErrorMessage.ID_NOT_FOUND)

    return word


@router.get("", operation_id="get_paged_words")
async def get_paged_words(
    q: str | None = None,
    paging_query_in: PagingQueryIn = Depends(),
    # sort_query_in: schemas.WordSortQueryIn = Depends(),
    include_deleted: bool = False,
    db: AsyncSession = Depends(get_async_db),
) -> schemas.WordsPagedResponse:
    """GET /words?page=1&perPage=30"""
    return await crud_v2.word.get_paged_list(
        db,
        q=q,
        paging_query_in=paging_query_in,
        # sort_query_in=sort_query_in,
        include_deleted=include_deleted,
    )


@router.post("", operation_id="create_word")
async def create_word(
    data_in: schemas.WordCreate, db: AsyncSession = Depends(get_async_db),
) -> schemas.WordResponse:
    return await crud_v2.word.create(db, data_in)


@router.patch("/{id}", operation_id="update_word")
async def update_word(
    id: str,
    data_in: schemas.WordUpdate,
    db: AsyncSession = Depends(get_async_db),
) -> schemas.WordResponse:
    """PATCH /words/{id}"""
    word = await crud_v2.word.get_db_obj_by_id(db, id=id)
    if not word:
        raise APIException(ErrorMessage.ID_NOT_FOUND)

    return await crud_v2.word.update(db, db_obj=word, update_schema=data_in)


# @router.post("/{id}/tags", operation_id="add_tags_to_word")
# async def add_tags_to_word(
#     id: str,
#     tags_in: list[schemas.TagCreate],
#     db: AsyncSession = Depends(get_async_db),
# ) -> schemas.WordResponse:
#     word = await crud_v2.word.get_db_obj_by_id(db, id=id)
#     if not word:
#         raise APIException(ErrorMessage.ID_NOT_FOUND)
#     return await crud_v2.word.add_tags_to_word(db, word=word, tags_in=tags_in)


@router.delete(
    "/{id}", status_code=status.HTTP_204_NO_CONTENT, operation_id="delete_word",
)
async def delete_word(
    id: str,
    db: AsyncSession = Depends(get_async_db),
) -> None:
    word = await crud_v2.word.get_db_obj_by_id(db, id=id)
    if not word:
        raise APIException(ErrorMessage.ID_NOT_FOUND)
    # await crud_v2.word.delete(db, db_obj=word)
    await crud_v2.word.real_delete(db, db_obj=word)
