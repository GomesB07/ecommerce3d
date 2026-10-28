import { db } from "@/db";
import { UserTable } from "@/db/schemas";
import { updateUserInput } from "@/lib/auth/validations/auth.schema";
import { eq } from "drizzle-orm";

export async function getUser(userId: string) {
    const user = await db.select({
        id: UserTable.id,
        name: UserTable.name,
        email: UserTable.email
    }).from(UserTable).where(eq(UserTable.id, userId))
    return user
}

export async function updateUser(input: updateUserInput, userId: string) {

    const user = await db.query.UserTable.findFirst({where: eq(UserTable.id, userId)})

    if(!user) {
        throw new Error('Usuário não encontrado!')
    }

    const update = db.update(UserTable).set(input).where(eq(UserTable.id, userId)).returning({id: UserTable.id, name: UserTable.name, email: UserTable.email})

    return update
}

export async function deleteUser(userId: string) {
    const deleteUser = await db.delete(UserTable).where(eq(UserTable.id, userId)).returning({name: UserTable.name})
    return deleteUser
}