
from sqlalchemy import or_
from sqlalchemy.dialects.mysql import insert
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session, contains_eager
from sqlalchemy.sql import select

from app import crud_v2, models, schemas

from .base import CRUDV2Base


class CRUDWord(
    CRUDV2Base[
        models.Word,
        schemas.WordResponse,
        schemas.WordCreate,
        schemas.WordUpdate,
        schemas.WordsPagedResponse,
    ],
):
    async def get_paged_list(  # type: ignore[override]
        self,
        db: AsyncSession,
        paging_query_in: schemas.PagingQueryIn,
        q: str | None = None,
        sort_query_in: schemas.SortQueryIn | None = None,
        include_deleted: bool = False,
    ) -> schemas.WordsPagedResponse:
        where_clause = (
            [
                or_(
                    models.Word.title.ilike(f"%{q}%"),
                    models.Word.description.ilike(f"%{q}%"),
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

    # def add_tags_to_word(
    #     self, db: Session, word: models.Word, tags_in: list[schemas.TagCreate],
    # ) -> models.Word:
    #     tags = crud_v2.tag.upsert_tags(db, tags_in=tags_in)
    #     words_tags_data = [{"word_id": word.id, "tag_id": tag.id} for tag in tags]

    #     # WordとTagを紐づけ
    #     stmt = insert(models.WordTag).values(words_tags_data)
    #     stmt = stmt.on_duplicate_key_update(tag_id=stmt.inserted.tag_id)
    #     db.execute(stmt)

    #     stmt = (
    #         select(models.Word)
    #         .outerjoin(models.Word.tags)
    #         .options(contains_eager(models.Word.tags))
    #         .where(models.Word.id == word.id)
    #     )
    #     word = db.execute(stmt).scalars().unique().first()

    #     return word


word = CRUDWord(
    models.Word,
    response_schema_class=schemas.WordResponse,
    list_response_class=schemas.WordsPagedResponse,
)
