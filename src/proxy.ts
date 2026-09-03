import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { secretKeyJwt } from "./lib/auth/jwt";


export function proxy(request: NextRequest) {

    const requestHeaders = new Headers(request.headers)
    requestHeaders.delete('x-user-id')
    requestHeaders.delete('x-user-role')
    

    try {
        const {pathname} = request.nextUrl

        const token = request.cookies.get('token')?.value

        if(!token) {
            return NextResponse.json({error: 'Token não encontrado!'}, { status: 404 })
        }

        
        const decoded = jwt.verify(token, secretKeyJwt)
        const {userId, userRole} = (decoded as {userId: string, userRole: string})
        requestHeaders.set('x-user-id', userId)
        requestHeaders.set('x-user-role', userRole)
        

        const isAuthRoute = authRequiredRoutes.some(route => pathname.startsWith(route))
        const isOwnerRoute = ownerRequiredRoutes.some(route => pathname.startsWith(route))
        const responseUserNotAuthorized = NextResponse.json('Usuário não autorizado! (middleware)', { status: 401 })

        if(isAuthRoute && !token) {
            return responseUserNotAuthorized
        }

        if(isOwnerRoute) {
            if(!token || userRole !== 'admin') {
                return responseUserNotAuthorized
            }
        }

    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 404})
    }    

    return NextResponse.next({headers: requestHeaders}) 
}


const ownerRequiredRoutes = [
    '/api/filaments/create',
    '/api/filaments/update/:path*',
    '/api/filaments/delete/:path*'
]
const authRequiredRoutes = [
    '/api/auth/logout',
    '/api/auth/update'
]

export const config = {
    matcher: [
        '/api/auth/logout',
        '/api/auth/update',
        '/api/filaments/create',
        '/api/filaments/update',
        '/api/filaments/delete'
    ],
}