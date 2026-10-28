import { createHash } from 'crypto'
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { accessTokenSchema } from './validations/jwt.schema'

export const secretKeyJwt = process.env.SECRET_KEY_JWT!
const ALGORITHM = "HS256"

interface TokenPayload {
    userId: string,
    userRole: string
}

type VerifyToken = {status: 'valid', userId: string, userRole: string} | {status: 'expired'} | {status: 'invalid'}

export function generateAccessToken({userId, userRole}: TokenPayload): string {
    const token = jwt.sign({userId, userRole}, secretKeyJwt, {expiresIn: '15m', algorithm: ALGORITHM})
    return token
}

export default function verifyAccessToken(token: string): VerifyToken {
    try {
        const decoded = jwt.verify(token, secretKeyJwt, {algorithms: [ALGORITHM]})
        const parsed = accessTokenSchema.safeParse(decoded)
        if(!parsed.success) {
            console.warn('payload do token com formato inesperado')
            return {status: 'invalid'}
        }
        const {userId, userRole} = parsed.data
        return {status: 'valid', userId: userId, userRole: userRole}
    } catch(error) {
        if(error instanceof TokenExpiredError) {
            return {status: 'expired'}
        } else if(error instanceof JsonWebTokenError) {
            console.warn(error.message)
            return {status: 'invalid'}
        }
        throw error
    }
}

export function generateRefreshTokenId() {
    return crypto.randomUUID()
}

export function generateRefreshTokenHash(refreshTokenId: string) {
    return createHash('sha256').update(refreshTokenId).digest('hex')
}