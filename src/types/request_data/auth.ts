export interface ILoginData {
  email: string
  password: string
}
export interface IForgotPassword {
  email: string
}
export interface IResetPassword {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}
export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}