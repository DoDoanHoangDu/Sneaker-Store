from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from backend.api import deps
from backend.models.account import Account
from backend.schemas.account import Account as AccountSchema
from backend.crud.crud_account import account
from backend.schemas.account import AccountInDB , AccountCreate, AccountUpdateMe, AccountUpdateAdmin
from backend.core.auth import (authenticate, create_access_token)

router = APIRouter(prefix="/auth")

@router.post("/signup", response_model=AccountSchema)
def create_account_signup(
        *,
        db: Session = Depends(deps.get_db),
        account_in: AccountCreate,
) -> AccountSchema : 
    """
    Create new account.
    """
    print(f"Creating account: {account_in.model_dump()}")
    
    created_account = account.get_by_username(db, username=account_in.username)
    if created_account:
        print(f"Account already exists: {account_in.username}")
        raise HTTPException(
            status_code=400,
            detail="The account with this username already exists in the system.",
        )
    try: 
        created_account = account.create(db=db, obj_in=account_in)
        print(f"Successfully created account: {created_account.username}, ID: {created_account.account_id}")
    except Exception as e:
        print(f"Error creating account: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error creating account: {str(e)}",
        )
    return created_account

@router.post("/login")
def login(
    db: Session = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    account = authenticate(db=db, username=form_data.username, password=form_data.password)
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
            "username": account.username,
            "role": account.role,
            "full_name": account.full_name
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

@router.put("/me/update", response_model=AccountSchema)
def update_me(
    account_in: AccountUpdateMe,
    db: Session = Depends(deps.get_db),
    current_account: AccountSchema = Depends(deps.get_current_user),
) -> AccountSchema:
    """
    Update current account.
    """
    updated_account = account.update(db=db, obj_in=account_in, current_account=current_account)
    return updated_account

@router.get("/all", response_model=list[AccountSchema])
def get_all_accounts(
    db: Session = Depends(deps.get_db),
    current_account: AccountSchema = Depends(deps.get_current_active_Admin_user),
) -> list[AccountSchema]:
    """
    Get all accounts.
    """
    accounts = db.query(Account).all()
    return accounts

@router.put("/admin/update/{username}", response_model=AccountSchema)
def admin_update_user(
    username: str,
    account_in: AccountUpdateAdmin,
    db: Session = Depends(deps.get_db),
    current_account: AccountSchema = Depends(deps.get_current_active_Admin_user),
) -> AccountSchema:
    """
    Admin endpoint to update any user account.
    """
    # Get the account to update
    user_to_update = account.get_by_username(db, username=username)
    if not user_to_update:
        raise HTTPException(status_code=404, detail="Account not found")
    
    # Update the account
    updated_account = account.update(db=db, obj_in=account_in, current_account=user_to_update)
    return updated_account

@router.delete("/delete/{username}")
def delete_account(
    username: str,
    db: Session = Depends(deps.get_db),
    current_account: AccountSchema = Depends(deps.get_current_active_Admin_user),
) -> Any:
    """
    Delete account.
    """
    account_to_delete = account.get_by_username(db, username=username)
    if not account_to_delete:
        raise HTTPException(status_code=404, detail="Account not found")
    
    account.remove(db=db, id=account_to_delete.account_id)
    return {"message": "Account deleted successfully"}