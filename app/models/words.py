from datetime import datetime

from sqlalchemy import DateTime, String, Text, Integer, TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.mysql import JSON

from app.models.base import Base, ModelBaseMixin


class Word(ModelBaseMixin, Base):
    __tablename__ = "words"
    mysql_charset = ("utf8mb4",)
    mysql_collate = "utf8mb4_unicode_ci"

    user_id: Mapped[str] = mapped_column(
        String(32), nullable=False, comment='ユーザーID'
    )
    category_id: Mapped[JSON] = mapped_column(
        JSON, comment='カテゴリID'
    )
    group_id: Mapped[JSON] = mapped_column(
        JSON(), comment='単語帳グループID'
    )
    word: Mapped[str] = mapped_column(
        String(255), nullable=False, comment='単語名'
    )
    meaning: Mapped[str] = mapped_column(
        String(255), nullable=False, comment='意味'
    )
    hint: Mapped[str] = mapped_column(
        String(255), comment='ヒント'
    )
    note: Mapped[JSON] = mapped_column(
        JSON, comment='メモ'
    )
    miss_count: Mapped[int] = mapped_column(
        Integer(), server_default="0", comment='間違えた回数')
    check1_updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, nullable=True, comment='チェックマーク1更新日時'
    )
    check2_updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, nullable=True, comment='チェックマーク2更新日時'
    )
    check3_updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, nullable=True, comment='チェックマーク3更新日時'
    )
