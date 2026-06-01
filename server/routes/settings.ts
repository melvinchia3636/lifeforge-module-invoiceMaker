import forge from '../forge'
import schemas from '../schema'

export const get = forge
  .query({
    description: 'Get invoice maker settings',
    output: {
      OK: schemas.settings
    }
  })
  .callback(async ({ pb, response }) => {
    const existing = await pb.getFullList.collection('settings').execute()

    if (existing.length > 0) {
      return response.ok(existing[0])
    }

    return response.ok(
      await pb.create
        .collection('settings')
        .data({
          company_name: '',
          company_additional_info: '',
          default_payment_terms: 'Net 30',
          default_notes: '',
          default_tax_rate: 0,
          bank_name: '',
          bank_account: '',
          currency: 'MYR',
          currency_symbol: 'RM',
          invoice_prefix: '',
          next_invoice_number: 1
        })
        .execute()
    )
  })

export const update = forge
  .mutation({
    description: 'Update invoice maker settings',
    input: {
      body: schemas.settings.partial().omit({
        created: true,
        updated: true,
        default_logo: true
      })
    },
    media: {
      default_logo: {
        optional: true
      }
    },
    output: {
      OK: schemas.settings
    }
  })
  .callback(
    async ({
      pb,
      body,
      media: { default_logo },
      core: {
        media: { retrieveMedia }
      },
      response
    }) => {
      const existing = await pb.getFullList.collection('settings').execute()

      if (existing.length === 0) {
        return response.ok(
          await pb.create
            .collection('settings')
            .data({
              ...body,
              ...(await retrieveMedia('default_logo', default_logo))
            })
            .execute()
        )
      }

      return response.ok(
        await pb.update
          .collection('settings')
          .id(existing[0].id)
          .data({
            ...body,
            ...(await retrieveMedia('default_logo', default_logo))
          })
          .execute()
      )
    }
  )
