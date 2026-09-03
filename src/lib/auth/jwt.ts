import jwt from 'jsonwebtoken'

export const secretKeyJwt = process.env.SECRET_KEY_JWT!

export function generateToken(userId: string, userRole: string): string {

    const token = jwt.sign({userId, userRole}, secretKeyJwt, {expiresIn: '1d'})

    return token
}