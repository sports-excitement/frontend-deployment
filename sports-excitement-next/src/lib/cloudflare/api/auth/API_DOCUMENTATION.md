# Authentication API Documentation

## 1. Authentication Endpoints

- **POST /auth/signup**  
  - **Description**: Registers a new user with Firebase Authentication.  
  - **Request Body**:  
    ```json  
    {  
      "email": "user@example.com",  
      "password": "user_password"  
    }  
    ```  
  - **Responses**:  
    - **201 Created**: User registered successfully.  
    - **400 Bad Request**: Invalid input data.

- **POST /auth/login**  
  - **Description**: Logs in a user and returns an authentication token.  
  - **Request Body**:  
    ```json  
    {  
      "email": "user@example.com",  
      "password": "user_password"  
    }  
    ```  
  - **Responses**:  
    - **200 OK**: User logged in successfully, returns token.  
    - **401 Unauthorized**: Invalid credentials.

- **POST /auth/logout**  
  - **Description**: Logs out the user by invalidating their token.  
  - **Request Body**: None.  
  - **Responses**:  
    - **200 OK**: User logged out successfully.  
    - **401 Unauthorized**: Invalid token.

- **POST /auth/oauth/google**  
  - **Description**: Allows users to log in using Google OAuth.  
  - **Request Body**: None.  
  - **Responses**:  
    - **200 OK**: User logged in successfully via Google.  
    - **400 Bad Request**: Google login failed.

- **POST /auth/oauth/apple**  
  - **Description**: Allows users to log in using Apple OAuth.  
  - **Request Body**: None.  
  - **Responses**:  
    - **200 OK**: User logged in successfully via Apple.  
    - **400 Bad Request**: Apple login failed.

## 2. Token Management

- **POST /auth/token/refresh**  
  - **Description**: Refreshes an access token using a valid refresh token.  
  - **Request Body**:  
    ```json  
    {  
      "refreshToken": "your_refresh_token"  
    }  
    ```  
  - **Responses**:  
    - **200 OK**: Token refreshed successfully.  
    - **401 Unauthorized**: Invalid refresh token.

- **POST /auth/token/revoke**  
  - **Description**: Revokes the current refresh token, forcing a re-login.  
  - **Request Body**: None.  
  - **Responses**:  
    - **200 OK**: Token revoked successfully.  
    - **401 Unauthorized**: Invalid token.

## 3. Password Management

- **POST /auth/password/reset-request**  
  - **Description**: Sends a password reset email via Firebase.  
  - **Request Body**:  
    ```json  
    {  
      "email": "user@example.com"  
    }  
    ```  
  - **Responses**:  
    - **200 OK**: Password reset email sent.  
    - **404 Not Found**: Email not found.

- **POST /auth/password/reset**  
  - **Description**: Resets the password using a secure token from the email link.  
  - **Request Body**:  
    ```json  
    {  
      "token": "reset_token",  
      "newPassword": "new_user_password"  
    }  
    ```  
  - **Responses**:  
    - **200 OK**: Password reset successfully.  
    - **400 Bad Request**: Invalid token or password.

- **POST /auth/password/change**  
  - **Description**: Changes the user's password while logged in.  
  - **Request Body**:  
    ```json  
    {  
      "currentPassword": "current_user_password",  
      "newPassword": "new_user_password"  
    }  
    ```  
  - **Responses**:  
    - **200 OK**: Password changed successfully.  
    - **401 Unauthorized**: Invalid current password.

## 4. Password Verification & Security

- **POST /auth/email/verify-request**  
  - **Description**: Sends an email verification request via Firebase.  
  - **Request Body**:  
    ```json  
    {  
      "email": "user@example.com"  
    }  
    ```  
  - **Responses**:  
    - **200 OK**: Verification email sent.  
    - **404 Not Found**: Email not found.

- **POST /auth/email/verify**  
  - **Description**: Verifies the user's email from the provided link.  
  - **Request Body**:  
    ```json  
    {  
      "verificationCode": "code_from_email"  
    }  
    ```  
  - **Responses**:  
    - **200 OK**: Email verified successfully.  
    - **400 Bad Request**: Invalid verification code.

- **GET /auth/security-logs**  
  - **Description**: Retrieves recent login attempts and security-related events.  
  - **Request Body**: None.  
  - **Responses**:  
    - **200 OK**: Returns security logs.  
    - **401 Unauthorized**: Invalid token.

- **POST /auth/account/lock**  
  - **Description**: Temporarily locks an account after multiple failed login attempts.  
  - **Request Body**: None.  
  - **Responses**:  
    - **200 OK**: Account locked successfully.  
    - **400 Bad Request**: Account already locked.

- **POST /auth/account/unlock**  
  - **Description**: Unlocks an account after verification.  
  - **Request Body**:  
    ```json  
    {  
      "verificationCode": "code_for_unlock"  
    }  
    ```  
  - **Responses**:  
    - **200 OK**: Account unlocked successfully.  
    - **400 Bad Request**: Invalid verification code.
