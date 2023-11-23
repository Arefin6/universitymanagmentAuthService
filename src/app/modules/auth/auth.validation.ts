import { z } from "zod";

const loginUserZodSchema = z.object({
    body:z.object({
      id:z.string({
        required_error: 'Id is required',
      }),
      password:z.string({
        required_error: 'Password is required',
      })
    })
})

const refreshTokenZodSchema = z.object({
  cookies:z.object({
    refreshToken:z.string({
      required_error: 'Refresh Token is required',
    })
  })
})

const changePasswordZodSchema = z.object({
    body:z.object({
    oldPassword:z.string({
      required_error: 'Old Password is required',
    }),
    newPassword:z.string({
      required_error: 'Old Password is required',
    })
  })
})


export const AuthValidation ={
    loginUserZodSchema,
    refreshTokenZodSchema,
    changePasswordZodSchema
}