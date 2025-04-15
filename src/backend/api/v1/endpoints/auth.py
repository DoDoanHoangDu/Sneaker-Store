from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from backend.api import deps
from backend.models.account import Account
from backend.schemas.account import Account as AccountSchema
from backend.crud.crud_account import account
from backend.schemas.account import AccountInDB , AccountCreate
from backend.core.auth import (authenticate, create_access_token)

router = APIRouter()

@router.post("/signup", response_model=AccountSchema)
def create_account_signup(
        *,
        db: Session = Depends(deps.get_db),
        account_in: AccountCreate,
) -> AccountSchema : 
    """
    Create new account.
    """
    created_account = account.get_by_email(db, email=account_in.email)
    if created_account:
        raise HTTPException(
            status_code=400,
            detail="The account with this email already exists in the system.",
        )
    try: 
        created_account = account.create(db=db, obj_in=account_in)
    except RequestValidationError :
        raise HTTPException(
            status_code=500,
            detail="Error creating account",
        )
    return created_account

@router.post("/login")
def login(
    db: Session = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    account = authenticate(db= db, username=form_data.username, password=form_data.password)
    if not account:
        raise HTTPException(
            status_code=400,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(sub=account.account_id)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "account": {
            "email": account.email,
            "phone_number": account.phone_number,
        }
    }


@router.get("/me", response_model=AccountSchema)
def get_me(
    db : Session = Depends(deps.get_db),
    current_account: AccountSchema = Depends(deps.get_current_user),
) -> AccountSchema:
    """
    Get current account.
    """
    return current_account