import { db } from "@/db";
import { FilamentsTable } from "@/db/schemas";
import { CreateFilamentInput, UpdateFilamentInput } from "@/lib/auth/validations/filaments.schema";
import { eq } from "drizzle-orm";


export async function createFilament(input: CreateFilamentInput) {

    const filament = await db.insert(FilamentsTable).values(input).returning().onConflictDoNothing({target: FilamentsTable.name})

    if(filament.length === 0) {
        throw new Error('Filamento já adicionado!')
    }

    return filament
}

export async function updateFilament(filamentsId: string, input: UpdateFilamentInput) {

    const filament = await db.update(FilamentsTable).set(input).where(eq(FilamentsTable.id, filamentsId))
    .returning().catch(() => {
        throw new Error('Erro ao atualizar filamento')
    })

    return filament
}

export async function deleteFilament(filamentId: string) {

    const [deleted] = await db.delete(FilamentsTable).where(eq(FilamentsTable.id, filamentId))
    .returning({filamentName: FilamentsTable.name}).catch(() => {
        throw new Error('Erro ao excluir filamento')
    })

    return deleted.filamentName
}

export async function getFilament(filamentId: string) {

    const filament = await db.query.FilamentsTable.findFirst({
        where: eq(FilamentsTable.id, filamentId)
    }).catch(() => {
        throw new Error('Erro ao buscar filamento')
    })

    return filament
}

export async function getAllFilaments() {

    const allFilaments = await db.select().from(FilamentsTable).catch(() => {
        throw new Error('Erro ao buscar todos filamentos')
    })

    return allFilaments
}