import { ClientError } from '@lifeforge/server-utils'
import z from 'zod'

import forge from '../forge'
import schemas from '../schema'

export const list = forge
  .query()
  .description('List all clients')
  .input({})
  .callback(async ({ pb }) =>
    pb.getFullList.collection('clients').sort(['-created']).execute()
  )

export const getById = forge
  .query()
  .description('Get client by ID')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'clients'
  })
  .callback(({ pb, query: { id } }) =>
    pb.getOne.collection('clients').id(id).execute()
  )

export const create = forge
  .mutation()
  .description('Create a new client')
  .input({
    body: schemas.clients.omit({
      created: true,
      updated: true
    })
  })
  .statusCode(201)
  .callback(async ({ pb, body }) =>
    pb.create.collection('clients').data(body).execute()
  )

export const update = forge
  .mutation()
  .description('Update an existing client')
  .input({
    query: z.object({
      id: z.string()
    }),
    body: schemas.clients.partial().omit({
      created: true,
      updated: true
    })
  })
  .existenceCheck('query', {
    id: 'clients'
  })
  .callback(async ({ pb, query: { id }, body }) =>
    pb.update.collection('clients').id(id).data(body).execute()
  )

export const remove = forge
  .mutation()
  .description('Delete a client')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'clients'
  })
  .statusCode(204)
  .callback(async ({ pb, query: { id } }) => {
    // Check if client has any invoices
    const invoices = await pb.getFullList
      .collection('invoices')
      .filter([{ field: 'bill_to', operator: '=', value: id }])
      .execute()

    if (invoices.length > 0) {
      throw new ClientError(
        'Cannot delete client with existing invoices. Delete the invoices first.'
      )
    }

    return pb.delete.collection('clients').id(id).execute()
  })
