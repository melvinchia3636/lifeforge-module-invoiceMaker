import z from 'zod'

import forge from '../forge'
import schemas from '../schema'

export const list = forge
  .query({
    description: 'List all clients',
    output: {
      OK: z.array(schemas.clients)
    }
  })
  .callback(async ({ pb, response }) =>
    response.ok(
      await pb.getFullList.collection('clients').sort(['-created']).execute()
    )
  )

export const getById = forge
  .query({
    description: 'Get client by ID',
    input: {
      query: z.object({
        id: z.string()
      })
    },
    existenceCheck: {
      query: { id: 'clients' }
    },
    output: {
      OK: schemas.clients,
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, response }) =>
    response.ok(await pb.getOne.collection('clients').id(id).execute())
  )

export const create = forge
  .mutation({
    description: 'Create a new client',
    input: {
      body: schemas.clients.omit({
        created: true,
        updated: true
      })
    },
    output: {
      CREATED: schemas.clients
    }
  })
  .callback(async ({ pb, body, response }) =>
    response.created(await pb.create.collection('clients').data(body).execute())
  )

export const update = forge
  .mutation({
    description: 'Update an existing client',
    input: {
      query: z.object({
        id: z.string()
      }),
      body: schemas.clients.partial().omit({
        created: true,
        updated: true
      })
    },
    existenceCheck: {
      query: { id: 'clients' }
    },
    output: {
      OK: schemas.clients,
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, body, response }) =>
    response.ok(
      await pb.update.collection('clients').id(id).data(body).execute()
    )
  )

export const remove = forge
  .mutation({
    description: 'Delete a client',
    input: {
      query: z.object({
        id: z.string()
      })
    },
    existenceCheck: {
      query: { id: 'clients' }
    },
    output: {
      NO_CONTENT: true,
      CONFLICT: true,
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, response }) => {
    const invoices = await pb.getFullList
      .collection('invoices')
      .filter([{ field: 'bill_to', operator: '=', value: id }])
      .execute()

    if (invoices.length > 0) {
      return response.conflict()
    }

    await pb.delete.collection('clients').id(id).execute()

    return response.noContent()
  })
