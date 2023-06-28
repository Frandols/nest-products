import { IsString, IsNumber } from 'class-validator'

export default class CreateUserDto {
  @IsString()
  name: string

  @IsNumber()
  price: number
}
