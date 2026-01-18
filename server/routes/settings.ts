import forge from '../forge'
import schemas from '../schema'

export const get = forge
  .query()
  .description('Get invoice maker settings')
  .input({})
  .callback(async ({ pb }) => {
    // Try to get existing settings (there should only be one)
    const existing = await pb.getFullList.collection('settings').execute()

    if (existing.length > 0) {
      return existing[0]
    }

    // Create default settings if none exist
    return await pb.create
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
  })

export const update = forge
  .mutation()
  .description('Update invoice maker settings')
  .input({
    body: schemas.settings.partial().omit({
      created: true,
      updated: true,
      default_logo: true
    })
  })
  .media({
    default_logo: {
      optional: true
    }
  })
  .callback(
    async ({
      pb,
      body,
      media: { default_logo },
      core: {
        media: { retrieveMedia }
      }
    }) => {
      // Get existing settings
      const existing = await pb.getFullList.collection('settings').execute()

      if (existing.length === 0) {
        // Create new settings
        return await pb.create
          .collection('settings')
          .data({
            ...body,
            ...(await retrieveMedia('default_logo', default_logo))
          })
          .execute()
      }

      // Update existing settings
      return await pb.update
        .collection('settings')
        .id(existing[0].id)
        .data({
          ...body,
          ...(await retrieveMedia('default_logo', default_logo))
        })
        .execute()
    }
  )
