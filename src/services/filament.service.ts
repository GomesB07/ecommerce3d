import { db } from "@/db";
import { FilamentTable } from "@/db/schemas";
import { CreateFilamentInput, UpdateFilamentInput } from "@/lib/validations/filament.schema";
import { eq } from "drizzle-orm";


export async function createFilament(input: CreateFilamentInput) {

    const filament = await db.insert(FilamentTable).values(input)
    .returning({id: FilamentTable.id, name: FilamentTable.name, description: FilamentTable.description, active: FilamentTable.active})

    if(filament.length === 0) {
        throw new Error('Filamento já adicionado!')
    }

    return filament
}

export async function updateFilament(filamentsId: string, input: UpdateFilamentInput) {

    const filament = await db.update(FilamentTable).set(input).where(eq(FilamentTable.id, filamentsId))
    .returning().catch(() => {
        throw new Error('Erro ao atualizar filamento')
    })

    return filament
}

export async function deleteFilament(filamentId: string) {

    const [deleted] = await db.delete(FilamentTable).where(eq(FilamentTable.id, filamentId))
    .returning({filamentName: FilamentTable.name}).catch(() => {
        throw new Error('Erro ao excluir filamento')
    })

    return deleted.filamentName
}

export async function getFilament(filamentId: string) {

    try {
        const filament = await db.query.FilamentTable.findFirst({
            where: eq(FilamentTable.id, filamentId),
            with: {
                filamentColor: true,
                product: true
            }
        })
        return filament
    } catch(error) {
        console.warn((error as Error).message)
        throw new Error('Erro ao buscar filamento')
    }   
}

export async function getAllFilaments() {
    try {
        const allFilaments = await db.query.FilamentTable.findMany({
            with: {
                filamentColor: true,
                product: true
            }
        })
        return allFilaments
    } catch(error) {
        throw error
    }
}