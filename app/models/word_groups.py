from datetime import datetime

from sqlalchemy import DateTime, String, Text, TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, ModelBaseMixin


class WordGroup(ModelBaseMixin, Base):
    __tablename__ = "word_groups"
    mysql_charset = ("utf8mb4",)
    mysql_collate = "utf8mb4_unicode_ci"

    user_id: Mapped[str] = mapped_column(
        String(32), nullable=False, comment='ユーザーID'
    )
    name: Mapped[str] = mapped_column(
        String(255), nullable=False, comment='単語帳グループ名'
    )
