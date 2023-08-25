import httpStatus from 'http-status'
import ApiError from '../../../erros/ApiError'
import User from '../users/user.model'
import { ILoginUser } from './auth.interface'
import { jwtHelper } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload

  // check User Exits
  const userExists = await User.isUserExits(id)

  if (!userExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does Not Exists!')
  }

  if (
    userExists.password &&
    !(await User.isPasswordMatched(password, userExists.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is InCorrect!')
  }

  // create access And Refresh Token

  const { id: userId, role, needsPasswordChange } = userExists
  const accessToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.refresh_screct as Secret,
    config.jwt.refresh_expires_in as string
  )

   return{
    accessToken,
    refreshToken,
    needsPasswordChange
   };
}

export const AuthService = {
  loginUser,
}
