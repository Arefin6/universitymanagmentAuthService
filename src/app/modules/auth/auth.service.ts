import httpStatus from 'http-status'
import ApiError from '../../../erros/ApiError'
import User from '../users/user.model'
import { IChangePassword, ILoginUser, IRefreshTokenResponse } from './auth.interface'
import { jwtHelper } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { JwtPayload, Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt';

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


const refreshToken = async (token: string):Promise<IRefreshTokenResponse> => {

  //verify token
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelper.verifyToken(token,config.jwt.refresh_screct as Secret);    
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const {userId} = verifiedToken 

  // check User Exits
  const userExists = await User.isUserExits(userId)

  if (!userExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does Not Exists!')
  }

  // create new access Token

  const { id, role } = userExists
  const newAccessToken = jwtHelper.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )
   return{
    accessToken:newAccessToken,
   };
}


// change Password
const changePassword = async (user: JwtPayload|null,payload:IChangePassword):Promise<void> => {
  try {
     const {newPassword,oldPassword} = payload;
     
     // check if user exists
     const userExists = await User.isUserExits(user?.userId)

    if (!userExists) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User Does Not Exists!')
    }

    // check old password is correct

    if (
      userExists.password &&
      !(await User.isPasswordMatched(oldPassword, userExists.password))
    ) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is InCorrect!')
    }

    // hash new password
     const hashedPassword = await bcrypt.hash(newPassword,Number(config.bcryptSaltRound))


     // update User
      
     const updatedData ={
         password:hashedPassword,
         needsPasswordChange:false,
         passwordChangedAt:new Date()
     }

     await User.findByIdAndUpdate({id:user?.userID},updatedData,{new:true})


  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

}

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword
}
