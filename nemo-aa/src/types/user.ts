"use strict"

export type User = {
  sub: string
  email?: string
  emailVerified?: boolean
  name: string
  gender?: string
  birthday?: string
  profilePicture?: string
}

export type Userish = User | string
