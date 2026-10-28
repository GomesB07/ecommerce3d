import { db } from "@/db";
import { FilamentColorTable } from "@/db/schemas";
import { CreateFilamentColorInput, UpdateFilamentColorInput } from "@/lib/validations/filament-color.schema";
import { eq } from "drizzle-orm";
import postgres from "postgres";


export async function createFilamentColorService(input: CreateFilamentColorInput) {
    const filamentColor = await db.insert(FilamentColorTable).values(input).returning()
    return filamentColor
}

export async function deleteFilamentColorService(id: string) {
    const deleteFilament = await db.delete(FilamentColorTable).where(eq(FilamentColorTable.id, id))
    return deleteFilament
}

export async function getFilamentColorService(id: string) {
    const filamentColor = await db.query.FilamentColorTable.findFirst({
        where: eq(FilamentColorTable.id, id)
    }).catch(error => {
        const errorCode = error instanceof Error && error.cause instanceof postgres.PostgresError && error.cause.code
        throw errorCode
    })
    return filamentColor
}

export async function getAllFilamentColorsService() {
    const filamentColors = await db.select().from(FilamentColorTable).catch(error => {
        throw error
    })
    return filamentColors    
}

export async function updateFilamentColorService(id: string, input: UpdateFilamentColorInput) {
    const updateFilament = await db.update(FilamentColorTable).set(input).where(eq(FilamentColorTable.id, id)).returning()
    return updateFilament
}