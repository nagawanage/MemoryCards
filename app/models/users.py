from sqlalchemy import Boolean, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, ModelBaseMixin


class User(ModelBaseMixin, Base):
    __tablename__ = "users"
    mysql_charset = ("utf8mb4",)
    mysql_collate = "utf8mb4_unicode_ci"

    name: Mapped[str] = mapped_column(
        String(255),
        index=True
    )
    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )
    email_verified: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        server_default="0",
    )
    hashed_password: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )
    scopes: Mapped[str] = mapped_column(
        Text,
        nullable=True
    )
    is_superuser: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )
